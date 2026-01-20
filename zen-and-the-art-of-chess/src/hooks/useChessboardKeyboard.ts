/**
 * Keyboard navigation hook for chessboards.
 * Enables accessible keyboard-based piece selection and movement.
 *
 * Usage:
 * const { focusedSquare, handlers, announceMove } = useChessboardKeyboard({
 *   game,
 *   onMove: (from, to) => handleMove(from, to),
 *   orientation: 'white',
 *   disabled: false,
 * });
 *
 * // Apply handlers to board container:
 * <div {...handlers} tabIndex={0}>
 *   <Chessboard ... />
 * </div>
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { Chess, Square, Color } from 'chess.js';

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
const RANKS = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;

type File = typeof FILES[number];
type Rank = typeof RANKS[number];

interface UseChessboardKeyboardOptions {
  /** The chess.js game instance */
  game: Chess;
  /** Callback when a move is made */
  onMove?: (from: Square, to: Square) => boolean | void;
  /** Board orientation */
  orientation?: 'white' | 'black';
  /** Whether keyboard navigation is disabled */
  disabled?: boolean;
  /** Callback when square is clicked/selected */
  onSquareSelect?: (square: Square) => void;
}

interface UseChessboardKeyboardResult {
  /** Currently focused square (for visual highlight) */
  focusedSquare: Square | null;
  /** Currently selected piece square (for move source) */
  selectedSquare: Square | null;
  /** Event handlers to attach to the board container */
  handlers: {
    onKeyDown: (e: React.KeyboardEvent) => void;
    onFocus: () => void;
    onBlur: () => void;
  };
  /** Announce a move for screen readers */
  announceMove: (move: string) => void;
  /** Get focus indicator styles for a square */
  getFocusStyles: (square: Square) => React.CSSProperties | undefined;
  /** Ref to the live region element for announcements */
  liveRegionRef: React.RefObject<HTMLDivElement>;
}

/**
 * Convert file index (0-7) to file letter (a-h)
 */
function indexToFile(index: number): File {
  return FILES[Math.max(0, Math.min(7, index))];
}

/**
 * Convert rank index (0-7) to rank number (1-8)
 */
function indexToRank(index: number): Rank {
  return RANKS[Math.max(0, Math.min(7, index))];
}

/**
 * Convert file letter to index
 */
function fileToIndex(file: string): number {
  return FILES.indexOf(file as File);
}

/**
 * Convert rank number to index
 */
function rankToIndex(rank: string): number {
  return RANKS.indexOf(rank as Rank);
}

/**
 * Parse a square string into file and rank indices
 */
function parseSquare(square: Square): { fileIndex: number; rankIndex: number } {
  return {
    fileIndex: fileToIndex(square[0]),
    rankIndex: rankToIndex(square[1]),
  };
}

/**
 * Build a square string from file and rank indices
 */
function buildSquare(fileIndex: number, rankIndex: number): Square {
  return `${indexToFile(fileIndex)}${indexToRank(rankIndex)}` as Square;
}

export function useChessboardKeyboard({
  game,
  onMove,
  orientation = 'white',
  disabled = false,
  onSquareSelect,
}: UseChessboardKeyboardOptions): UseChessboardKeyboardResult {
  const [focusedSquare, setFocusedSquare] = useState<Square | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [hasFocus, setHasFocus] = useState(false);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  // Reset selection when game position changes
  useEffect(() => {
    setSelectedSquare(null);
  }, [game.fen()]);

  /**
   * Announce a message to screen readers via aria-live region
   */
  const announceMove = useCallback((message: string) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = message;
      // Clear after a delay to allow re-announcement of same message
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);

  /**
   * Get the piece description at a square for announcements
   */
  const describePiece = useCallback((square: Square): string => {
    const piece = game.get(square);
    if (!piece) return 'empty';

    const colorName = piece.color === 'w' ? 'white' : 'black';
    const pieceNames: Record<string, string> = {
      p: 'pawn',
      n: 'knight',
      b: 'bishop',
      r: 'rook',
      q: 'queen',
      k: 'king',
    };
    return `${colorName} ${pieceNames[piece.type]}`;
  }, [game]);

  /**
   * Move focus to a new square
   */
  const moveFocus = useCallback((fileIndex: number, rankIndex: number) => {
    // Clamp to valid range
    const clampedFile = Math.max(0, Math.min(7, fileIndex));
    const clampedRank = Math.max(0, Math.min(7, rankIndex));
    const newSquare = buildSquare(clampedFile, clampedRank);
    setFocusedSquare(newSquare);

    // Announce the square and piece
    const pieceDesc = describePiece(newSquare);
    announceMove(`${newSquare}, ${pieceDesc}`);
  }, [describePiece, announceMove]);

  /**
   * Handle arrow key navigation
   * Arrow keys move in the direction appropriate for the board orientation
   */
  const handleArrowKey = useCallback((key: string) => {
    if (!focusedSquare) {
      // Start from a sensible default (e4 or e5 based on orientation)
      const startSquare = orientation === 'white' ? 'e4' : 'e5';
      setFocusedSquare(startSquare as Square);
      announceMove(`${startSquare}, ${describePiece(startSquare as Square)}`);
      return;
    }

    const { fileIndex, rankIndex } = parseSquare(focusedSquare);

    // Adjust direction based on board orientation
    const isWhite = orientation === 'white';
    let newFileIndex = fileIndex;
    let newRankIndex = rankIndex;

    switch (key) {
      case 'ArrowUp':
        newRankIndex = isWhite ? rankIndex + 1 : rankIndex - 1;
        break;
      case 'ArrowDown':
        newRankIndex = isWhite ? rankIndex - 1 : rankIndex + 1;
        break;
      case 'ArrowLeft':
        newFileIndex = isWhite ? fileIndex - 1 : fileIndex + 1;
        break;
      case 'ArrowRight':
        newFileIndex = isWhite ? fileIndex + 1 : fileIndex - 1;
        break;
    }

    moveFocus(newFileIndex, newRankIndex);
  }, [focusedSquare, orientation, moveFocus, describePiece, announceMove]);

  /**
   * Handle Enter/Space to select or move a piece
   */
  const handleSelect = useCallback(() => {
    if (!focusedSquare) return;

    if (!selectedSquare) {
      // No piece selected yet - try to select the piece on this square
      const piece = game.get(focusedSquare);
      const turn = game.turn();

      if (piece && piece.color === turn) {
        setSelectedSquare(focusedSquare);
        const moves = game.moves({ square: focusedSquare, verbose: true });
        announceMove(`${describePiece(focusedSquare)} selected. ${moves.length} legal moves.`);
        onSquareSelect?.(focusedSquare);
      } else if (piece) {
        announceMove(`Cannot select ${describePiece(focusedSquare)}. It's ${turn === 'w' ? "white's" : "black's"} turn.`);
      } else {
        announceMove('Empty square. Select a piece first.');
      }
    } else {
      // A piece is already selected - try to move to this square
      if (focusedSquare === selectedSquare) {
        // Deselect
        setSelectedSquare(null);
        announceMove('Selection cancelled.');
        return;
      }

      // Try to make the move
      const result = onMove?.(selectedSquare, focusedSquare);

      if (result !== false) {
        // Move was successful
        announceMove(`Moved ${describePiece(selectedSquare)} from ${selectedSquare} to ${focusedSquare}`);
        setSelectedSquare(null);
      } else {
        announceMove('Illegal move. Try a different square.');
      }
    }
  }, [focusedSquare, selectedSquare, game, onMove, onSquareSelect, describePiece, announceMove]);

  /**
   * Handle Escape to cancel selection
   */
  const handleEscape = useCallback(() => {
    if (selectedSquare) {
      setSelectedSquare(null);
      announceMove('Selection cancelled.');
    }
  }, [selectedSquare, announceMove]);

  /**
   * Handle Tab to cycle through pieces of the current turn
   */
  const handleTab = useCallback((shiftKey: boolean) => {
    const turn = game.turn();
    const board = game.board();
    const pieces: Square[] = [];

    // Collect all squares with pieces of the current turn
    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const cell = board[r][f];
        if (cell && cell.color === turn) {
          // Convert to square notation (board is [rank][file] with rank 0 = rank 8)
          const square = buildSquare(f, 7 - r);
          pieces.push(square);
        }
      }
    }

    if (pieces.length === 0) return;

    // Find current index and move to next/prev
    const currentIndex = focusedSquare ? pieces.indexOf(focusedSquare) : -1;
    let nextIndex: number;

    if (shiftKey) {
      nextIndex = currentIndex <= 0 ? pieces.length - 1 : currentIndex - 1;
    } else {
      nextIndex = currentIndex >= pieces.length - 1 ? 0 : currentIndex + 1;
    }

    const nextSquare = pieces[nextIndex];
    setFocusedSquare(nextSquare);
    announceMove(`${nextSquare}, ${describePiece(nextSquare)}`);
  }, [game, focusedSquare, describePiece, announceMove]);

  /**
   * Main keyboard event handler
   */
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        e.preventDefault();
        handleArrowKey(e.key);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleSelect();
        break;
      case 'Escape':
        e.preventDefault();
        handleEscape();
        break;
      case 'Tab':
        e.preventDefault();
        handleTab(e.shiftKey);
        break;
    }
  }, [disabled, handleArrowKey, handleSelect, handleEscape, handleTab]);

  const onFocus = useCallback(() => {
    setHasFocus(true);
    if (!focusedSquare) {
      // Initialize focus to center of board
      const startSquare = orientation === 'white' ? 'e4' : 'e5';
      setFocusedSquare(startSquare as Square);
    }
  }, [focusedSquare, orientation]);

  const onBlur = useCallback(() => {
    setHasFocus(false);
  }, []);

  /**
   * Get focus indicator styles for a square
   */
  const getFocusStyles = useCallback((square: Square): React.CSSProperties | undefined => {
    if (!hasFocus) return undefined;

    if (square === focusedSquare) {
      return {
        boxShadow: 'inset 0 0 0 3px rgba(59, 130, 246, 0.8)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
      };
    }

    if (square === selectedSquare) {
      return {
        boxShadow: 'inset 0 0 0 3px rgba(34, 197, 94, 0.8)',
        backgroundColor: 'rgba(34, 197, 94, 0.3)',
      };
    }

    return undefined;
  }, [hasFocus, focusedSquare, selectedSquare]);

  return {
    focusedSquare: hasFocus ? focusedSquare : null,
    selectedSquare,
    handlers: {
      onKeyDown,
      onFocus,
      onBlur,
    },
    announceMove,
    getFocusStyles,
    liveRegionRef,
  };
}

export default useChessboardKeyboard;
