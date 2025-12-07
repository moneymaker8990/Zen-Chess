// ============================================
// MULTIPLAYER GAME ENGINE
// Real-time game synchronization with Supabase
// ============================================

import { Chess, Move } from 'chess.js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';
import type { 
  MultiplayerGame, 
  GameMove, 
  GameStatus, 
  GameResult, 
  GameTermination,
  PlayerColor 
} from './types';

// ============================================
// GAME ENGINE CLASS
// ============================================

export class MultiplayerGameEngine {
  private gameId: string;
  private chess: Chess;
  private channel: RealtimeChannel | null = null;
  private playerId: string;
  private playerColor: PlayerColor | null = null;
  private onGameUpdate: ((game: MultiplayerGame) => void) | null = null;
  private onTimeUpdate: ((white: number, black: number) => void) | null = null;
  private onGameEnd: ((result: GameResult, termination: GameTermination) => void) | null = null;
  private onError: ((error: Error) => void) | null = null;
  private clockInterval: number | null = null;
  private lastMoveTime: number = Date.now();
  private whiteTimeMs: number = 0;
  private blackTimeMs: number = 0;
  private isActivePlayer: boolean = false;
  private incrementMs: number = 0;

  constructor(gameId: string, playerId: string) {
    this.gameId = gameId;
    this.playerId = playerId;
    this.chess = new Chess();
  }

  // ============================================
  // LIFECYCLE
  // ============================================

  async initialize(): Promise<MultiplayerGame | null> {
    if (!isSupabaseConfigured) {
      this.onError?.(new Error('Supabase not configured'));
      return null;
    }

    try {
      // Fetch game data
      const { data: game, error } = await supabase
        .from('games')
        .select(`
          *,
          white_player:profiles!games_white_player_id_fkey(id, username, display_name, avatar_url, rating),
          black_player:profiles!games_black_player_id_fkey(id, username, display_name, avatar_url, rating)
        `)
        .eq('id', this.gameId)
        .single();

      if (error || !game) {
        throw new Error('Game not found');
      }

      // Set player color
      if (game.white_player_id === this.playerId) {
        this.playerColor = 'w';
      } else if (game.black_player_id === this.playerId) {
        this.playerColor = 'b';
      }

      // Load position
      this.chess = new Chess(game.fen);
      
      // Initialize time
      this.whiteTimeMs = game.white_time_remaining_ms || 0;
      this.blackTimeMs = game.black_time_remaining_ms || 0;
      this.incrementMs = (game.increment_seconds || 0) * 1000;
      this.lastMoveTime = game.last_move_at ? new Date(game.last_move_at).getTime() : Date.now();
      this.isActivePlayer = this.playerColor === game.turn;

      // Subscribe to realtime updates
      this.subscribeToGame();

      // Start clock if game is active
      if (game.status === 'active') {
        this.startClock();
      }

      return this.mapGameFromDb(game);
    } catch (error) {
      this.onError?.(error as Error);
      return null;
    }
  }

  private subscribeToGame() {
    // Create a unique channel name
    const channelName = `game:${this.gameId}`;
    
    this.channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'games',
          filter: `id=eq.${this.gameId}`
        },
        (payload) => {
          this.handleGameUpdate(payload.new);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Subscribed to game updates');
        }
      });
  }

  private handleGameUpdate(gameData: any) {
    // Update local state
    this.chess = new Chess(gameData.fen);
    this.whiteTimeMs = gameData.white_time_remaining_ms || 0;
    this.blackTimeMs = gameData.black_time_remaining_ms || 0;
    this.lastMoveTime = gameData.last_move_at ? new Date(gameData.last_move_at).getTime() : Date.now();
    this.isActivePlayer = this.playerColor === gameData.turn;

    // Handle game end
    if (gameData.status === 'completed' || gameData.status === 'abandoned') {
      this.stopClock();
      this.onGameEnd?.(gameData.result, gameData.termination);
    }

    // Notify listeners
    this.onGameUpdate?.(this.mapGameFromDb(gameData));
  }

  async disconnect() {
    this.stopClock();
    if (this.channel) {
      await supabase.removeChannel(this.channel);
      this.channel = null;
    }
  }

  // ============================================
  // CLOCK MANAGEMENT
  // ============================================

  private startClock() {
    if (this.clockInterval) return;

    this.clockInterval = window.setInterval(() => {
      const now = Date.now();
      const elapsed = now - this.lastMoveTime;
      
      // Deduct from active player's time
      const turn = this.chess.turn();
      if (turn === 'w') {
        const newWhiteTime = Math.max(0, this.whiteTimeMs - elapsed);
        this.onTimeUpdate?.(newWhiteTime, this.blackTimeMs);
        
        // Check for timeout
        if (newWhiteTime <= 0 && this.playerColor === 'w') {
          this.handleTimeout();
        }
      } else {
        const newBlackTime = Math.max(0, this.blackTimeMs - elapsed);
        this.onTimeUpdate?.(this.whiteTimeMs, newBlackTime);
        
        // Check for timeout
        if (newBlackTime <= 0 && this.playerColor === 'b') {
          this.handleTimeout();
        }
      }
    }, 100); // Update every 100ms for smooth display
  }

  private stopClock() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
      this.clockInterval = null;
    }
  }

  private async handleTimeout() {
    this.stopClock();
    
    // The player who ran out of time loses
    const result: GameResult = this.playerColor === 'w' ? 'black_wins' : 'white_wins';
    const winnerId = this.playerColor === 'w' 
      ? await this.getOpponentId() 
      : this.playerId;
    
    await this.endGame(result, 'timeout', winnerId);
  }

  private async getOpponentId(): Promise<string | null> {
    const { data } = await supabase
      .from('games')
      .select('white_player_id, black_player_id')
      .eq('id', this.gameId)
      .single();
    
    if (!data) return null;
    return this.playerColor === 'w' ? data.black_player_id : data.white_player_id;
  }

  // ============================================
  // MOVE MAKING
  // ============================================

  async makeMove(from: string, to: string, promotion?: string): Promise<{ success: boolean; error?: string }> {
    // Validate it's our turn
    if (!this.isActivePlayer) {
      return { success: false, error: 'Not your turn' };
    }

    // Validate move locally first
    try {
      const move = this.chess.move({ from, to, promotion });
      if (!move) {
        return { success: false, error: 'Invalid move' };
      }

      // Calculate time
      const now = Date.now();
      const elapsed = now - this.lastMoveTime;
      
      let newWhiteTime = this.whiteTimeMs;
      let newBlackTime = this.blackTimeMs;
      
      if (this.playerColor === 'w') {
        newWhiteTime = Math.max(0, this.whiteTimeMs - elapsed + this.incrementMs);
      } else {
        newBlackTime = Math.max(0, this.blackTimeMs - elapsed + this.incrementMs);
      }

      // Create move record
      const gameMove: GameMove = {
        from,
        to,
        san: move.san,
        promotion,
        timestamp: now,
        timeRemainingMs: this.playerColor === 'w' ? newWhiteTime : newBlackTime
      };

      // Update database
      const { error } = await supabase
        .from('games')
        .update({
          fen: this.chess.fen(),
          pgn: this.chess.pgn(),
          moves: supabase.rpc('array_append', { arr: 'moves', val: gameMove }),
          move_count: this.chess.history().length,
          turn: this.chess.turn(),
          white_time_remaining_ms: newWhiteTime,
          black_time_remaining_ms: newBlackTime,
          last_move_at: new Date(now).toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', this.gameId);

      if (error) {
        // Rollback local move
        this.chess.undo();
        return { success: false, error: error.message };
      }

      // Update local time
      this.whiteTimeMs = newWhiteTime;
      this.blackTimeMs = newBlackTime;
      this.lastMoveTime = now;
      this.isActivePlayer = false;

      // Check for game end conditions
      await this.checkGameEnd();

      return { success: true };
    } catch (e) {
      return { success: false, error: 'Invalid move' };
    }
  }

  private async checkGameEnd() {
    if (this.chess.isCheckmate()) {
      const winner = this.chess.turn() === 'w' ? 'b' : 'w';
      const result: GameResult = winner === 'w' ? 'white_wins' : 'black_wins';
      const winnerId = await this.getPlayerIdByColor(winner);
      await this.endGame(result, 'checkmate', winnerId);
    } else if (this.chess.isStalemate()) {
      await this.endGame('draw', 'stalemate', null);
    } else if (this.chess.isDraw()) {
      // Check specific draw type
      if (this.chess.isThreefoldRepetition()) {
        await this.endGame('draw', 'threefold_repetition', null);
      } else if (this.chess.isInsufficientMaterial()) {
        await this.endGame('draw', 'insufficient_material', null);
      } else {
        await this.endGame('draw', 'fifty_move_rule', null);
      }
    }
  }

  private async getPlayerIdByColor(color: PlayerColor): Promise<string | null> {
    const { data } = await supabase
      .from('games')
      .select('white_player_id, black_player_id')
      .eq('id', this.gameId)
      .single();
    
    if (!data) return null;
    return color === 'w' ? data.white_player_id : data.black_player_id;
  }

  // ============================================
  // GAME ACTIONS
  // ============================================

  async resign(): Promise<boolean> {
    if (!this.playerColor) return false;

    const result: GameResult = this.playerColor === 'w' ? 'black_wins' : 'white_wins';
    const winnerId = await this.getOpponentId();
    
    return this.endGame(result, 'resignation', winnerId);
  }

  async offerDraw(): Promise<boolean> {
    const { error } = await supabase
      .from('games')
      .update({
        draw_offer_from: this.playerId,
        updated_at: new Date().toISOString()
      })
      .eq('id', this.gameId);

    return !error;
  }

  async acceptDraw(): Promise<boolean> {
    return this.endGame('draw', 'agreement', null);
  }

  async declineDraw(): Promise<boolean> {
    const { error } = await supabase
      .from('games')
      .update({
        draw_offer_from: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', this.gameId);

    return !error;
  }

  async offerRematch(): Promise<boolean> {
    const { error } = await supabase
      .from('games')
      .update({
        rematch_offered_by: this.playerId,
        updated_at: new Date().toISOString()
      })
      .eq('id', this.gameId);

    return !error;
  }

  async acceptRematch(): Promise<string | null> {
    // Get current game details
    const { data: currentGame } = await supabase
      .from('games')
      .select('*')
      .eq('id', this.gameId)
      .single();

    if (!currentGame) return null;

    // Swap colors for rematch
    const newWhiteId = currentGame.black_player_id;
    const newBlackId = currentGame.white_player_id;

    // Create new game
    const { data: newGame, error } = await supabase
      .from('games')
      .insert({
        white_player_id: newWhiteId,
        black_player_id: newBlackId,
        status: 'active',
        time_control_type: currentGame.time_control_type,
        initial_time_seconds: currentGame.initial_time_seconds,
        increment_seconds: currentGame.increment_seconds,
        white_time_remaining_ms: currentGame.initial_time_seconds * 1000,
        black_time_remaining_ms: currentGame.initial_time_seconds * 1000,
        is_rated: currentGame.is_rated,
        started_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error || !newGame) return null;

    // Update old game with rematch link
    await supabase
      .from('games')
      .update({ rematch_game_id: newGame.id })
      .eq('id', this.gameId);

    return newGame.id;
  }

  private async endGame(result: GameResult, termination: GameTermination, winnerId: string | null): Promise<boolean> {
    this.stopClock();

    const { error } = await supabase
      .from('games')
      .update({
        status: 'completed',
        result,
        termination,
        winner_id: winnerId,
        ended_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', this.gameId);

    if (!error) {
      // Update ratings
      await supabase.rpc('update_ratings_after_game', { p_game_id: this.gameId });
      this.onGameEnd?.(result, termination);
    }

    return !error;
  }

  // ============================================
  // EVENT HANDLERS
  // ============================================

  onUpdate(callback: (game: MultiplayerGame) => void) {
    this.onGameUpdate = callback;
  }

  onTimeChange(callback: (white: number, black: number) => void) {
    this.onTimeUpdate = callback;
  }

  onEnd(callback: (result: GameResult, termination: GameTermination) => void) {
    this.onGameEnd = callback;
  }

  onErrorOccurred(callback: (error: Error) => void) {
    this.onError = callback;
  }

  // ============================================
  // GETTERS
  // ============================================

  get position(): string {
    return this.chess.fen();
  }

  get moves(): Move[] {
    return this.chess.history({ verbose: true });
  }

  get pgn(): string {
    return this.chess.pgn();
  }

  get isMyTurn(): boolean {
    return this.isActivePlayer;
  }

  get myColor(): PlayerColor | null {
    return this.playerColor;
  }

  get currentTurn(): PlayerColor {
    return this.chess.turn() as PlayerColor;
  }

  get isGameOver(): boolean {
    return this.chess.isGameOver();
  }

  get isCheck(): boolean {
    return this.chess.isCheck();
  }

  get legalMoves(): string[] {
    return this.chess.moves();
  }

  getLegalMovesForSquare(square: string): string[] {
    return this.chess.moves({ square: square as any, verbose: true }).map(m => m.to);
  }

  // ============================================
  // UTILITIES
  // ============================================

  private mapGameFromDb(data: any): MultiplayerGame {
    return {
      id: data.id,
      whitePlayerId: data.white_player_id,
      blackPlayerId: data.black_player_id,
      whitePlayer: data.white_player ? {
        id: data.white_player.id,
        username: data.white_player.username,
        displayName: data.white_player.display_name,
        avatarUrl: data.white_player.avatar_url,
        rating: data.white_player.rating
      } : undefined,
      blackPlayer: data.black_player ? {
        id: data.black_player.id,
        username: data.black_player.username,
        displayName: data.black_player.display_name,
        avatarUrl: data.black_player.avatar_url,
        rating: data.black_player.rating
      } : undefined,
      status: data.status,
      result: data.result,
      termination: data.termination,
      winnerId: data.winner_id,
      fen: data.fen,
      pgn: data.pgn,
      moves: data.moves || [],
      moveCount: data.move_count,
      turn: data.turn,
      timeControlType: data.time_control_type,
      initialTimeSeconds: data.initial_time_seconds,
      incrementSeconds: data.increment_seconds,
      whiteTimeRemainingMs: data.white_time_remaining_ms,
      blackTimeRemainingMs: data.black_time_remaining_ms,
      lastMoveAt: data.last_move_at,
      drawOfferFrom: data.draw_offer_from,
      rematchGameId: data.rematch_game_id,
      rematchOfferedBy: data.rematch_offered_by,
      isRated: data.is_rated,
      whiteRatingBefore: data.white_rating_before,
      blackRatingBefore: data.black_rating_before,
      whiteRatingAfter: data.white_rating_after,
      blackRatingAfter: data.black_rating_after,
      inviteCode: data.invite_code,
      createdAt: data.created_at,
      startedAt: data.started_at,
      endedAt: data.ended_at
    };
  }
}

// ============================================
// GAME CREATION FUNCTIONS
// ============================================

export async function createGame(
  userId: string,
  options: {
    timeControlType: string;
    initialTimeSeconds: number;
    incrementSeconds: number;
    isRated: boolean;
    color: 'w' | 'b' | 'r';
  }
): Promise<{ gameId: string; inviteCode: string } | null> {
  if (!isSupabaseConfigured) return null;

  // Generate invite code
  const inviteCode = generateInviteCode();

  // Determine player assignment
  let whitePlayerId: string | null = null;
  let blackPlayerId: string | null = null;

  if (options.color === 'w') {
    whitePlayerId = userId;
  } else if (options.color === 'b') {
    blackPlayerId = userId;
  } else {
    // Random - will be determined when opponent joins
    whitePlayerId = userId;
  }

  const { data, error } = await supabase
    .from('games')
    .insert({
      white_player_id: whitePlayerId,
      black_player_id: blackPlayerId,
      status: 'waiting',
      time_control_type: options.timeControlType,
      initial_time_seconds: options.initialTimeSeconds,
      increment_seconds: options.incrementSeconds,
      white_time_remaining_ms: options.initialTimeSeconds * 1000,
      black_time_remaining_ms: options.initialTimeSeconds * 1000,
      is_rated: options.isRated,
      invite_code: inviteCode
    })
    .select()
    .single();

  if (error || !data) return null;

  return { gameId: data.id, inviteCode };
}

export async function joinGame(gameId: string, userId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  // Get game
  const { data: game } = await supabase
    .from('games')
    .select('*')
    .eq('id', gameId)
    .single();

  if (!game || game.status !== 'waiting') return false;

  // Don't allow joining own game
  if (game.white_player_id === userId || game.black_player_id === userId) {
    return false;
  }

  // Assign to empty slot
  let update: any = {
    status: 'active',
    started_at: new Date().toISOString(),
    last_move_at: new Date().toISOString()
  };

  if (!game.white_player_id) {
    update.white_player_id = userId;
  } else if (!game.black_player_id) {
    update.black_player_id = userId;
  } else {
    return false; // Game is full
  }

  const { error } = await supabase
    .from('games')
    .update(update)
    .eq('id', gameId);

  return !error;
}

export async function joinGameByCode(inviteCode: string, userId: string): Promise<string | null> {
  if (!isSupabaseConfigured) return null;

  // Find game by invite code
  const { data: game } = await supabase
    .from('games')
    .select('id')
    .eq('invite_code', inviteCode)
    .eq('status', 'waiting')
    .single();

  if (!game) return null;

  const success = await joinGame(game.id, userId);
  return success ? game.id : null;
}

export async function getActiveGames(userId: string): Promise<MultiplayerGame[]> {
  if (!isSupabaseConfigured) return [];

  const { data } = await supabase
    .from('games')
    .select(`
      *,
      white_player:profiles!games_white_player_id_fkey(id, username, display_name, avatar_url, rating),
      black_player:profiles!games_black_player_id_fkey(id, username, display_name, avatar_url, rating)
    `)
    .or(`white_player_id.eq.${userId},black_player_id.eq.${userId}`)
    .in('status', ['waiting', 'active'])
    .order('created_at', { ascending: false });

  return data?.map(mapGameFromDb) || [];
}

export async function getGameHistory(userId: string, limit = 20): Promise<MultiplayerGame[]> {
  if (!isSupabaseConfigured) return [];

  const { data } = await supabase
    .from('games')
    .select(`
      *,
      white_player:profiles!games_white_player_id_fkey(id, username, display_name, avatar_url, rating),
      black_player:profiles!games_black_player_id_fkey(id, username, display_name, avatar_url, rating)
    `)
    .or(`white_player_id.eq.${userId},black_player_id.eq.${userId}`)
    .eq('status', 'completed')
    .order('ended_at', { ascending: false })
    .limit(limit);

  return data?.map(mapGameFromDb) || [];
}

function mapGameFromDb(data: any): MultiplayerGame {
  return {
    id: data.id,
    whitePlayerId: data.white_player_id,
    blackPlayerId: data.black_player_id,
    whitePlayer: data.white_player ? {
      id: data.white_player.id,
      username: data.white_player.username,
      displayName: data.white_player.display_name,
      avatarUrl: data.white_player.avatar_url,
      rating: data.white_player.rating
    } : undefined,
    blackPlayer: data.black_player ? {
      id: data.black_player.id,
      username: data.black_player.username,
      displayName: data.black_player.display_name,
      avatarUrl: data.black_player.avatar_url,
      rating: data.black_player.rating
    } : undefined,
    status: data.status,
    result: data.result,
    termination: data.termination,
    winnerId: data.winner_id,
    fen: data.fen,
    pgn: data.pgn,
    moves: data.moves || [],
    moveCount: data.move_count,
    turn: data.turn,
    timeControlType: data.time_control_type,
    initialTimeSeconds: data.initial_time_seconds,
    incrementSeconds: data.increment_seconds,
    whiteTimeRemainingMs: data.white_time_remaining_ms,
    blackTimeRemainingMs: data.black_time_remaining_ms,
    lastMoveAt: data.last_move_at,
    drawOfferFrom: data.draw_offer_from,
    rematchGameId: data.rematch_game_id,
    rematchOfferedBy: data.rematch_offered_by,
    isRated: data.is_rated,
    whiteRatingBefore: data.white_rating_before,
    blackRatingBefore: data.black_rating_before,
    whiteRatingAfter: data.white_rating_after,
    blackRatingAfter: data.black_rating_after,
    inviteCode: data.invite_code,
    createdAt: data.created_at,
    startedAt: data.started_at,
    endedAt: data.ended_at
  };
}

function generateInviteCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}




