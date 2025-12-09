import { useState, useEffect, useCallback, useRef } from 'react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { stockfish } from '@/engine/stockfish';
import { parseUciMove } from '@/lib/moveValidation';
import type { Tradition } from '@/lib/types';
import { useCoachStore } from '@/state/coachStore';

interface CalmPlayModeProps {
  onExit?: () => void;
}

type SessionPhase = 'WELCOME' | 'BREATHING' | 'INTENTION' | 'PLAYING' | 'REFLECTION';
type BreathState = 'inhale' | 'hold' | 'exhale' | 'rest';

// Wisdom that appears during gameplay
const CALM_WISDOM: Array<{ quote: string; tradition: Tradition }> = [
  { quote: "The position is not urgent. You are not urgent.", tradition: 'TAO' },
  { quote: "Before acting, return to stillness.", tradition: 'ZEN' },
  { quote: "The master responds; the amateur reacts.", tradition: 'ART_OF_WAR' },
  { quote: "There is no opponent. Only the position and your awareness of it.", tradition: 'ASHTAVAKRA' },
  { quote: "Let the move arise from silence, not from anxiety.", tradition: 'YOGA_SUTRAS' },
  { quote: "Your opponent's clock is not your concern. Your breath is.", tradition: 'VIJNANA' },
  { quote: "One who conquers himself is greater than one who conquers a thousand.", tradition: 'GITA' },
  { quote: "When you lose your temper, you lose the game.", tradition: 'STOIC' },
  { quote: "Empty your cup. See the position fresh.", tradition: 'ZEN' },
  { quote: "The pieces will wait. Presence cannot.", tradition: 'TAO' },
];

// Body awareness prompts
const BODY_PROMPTS = [
  "Notice your shoulders. Are they relaxed?",
  "Feel your feet on the floor. Ground yourself.",
  "Is your jaw clenched? Let it soften.",
  "Notice the quality of your breathing right now.",
  "Where is tension living in your body?",
  "Feel the weight of your hands. Rest them gently.",
  "Is your forehead tight? Let it smooth.",
  "Notice your posture. Sit tall but soft.",
];

// Pre-move intentions
const INTENTIONS = [
  "I will look at the whole board before moving.",
  "I will check what my opponent threatens first.",
  "I will not rush. The position will wait.",
  "I will breathe before I touch a piece.",
  "I will notice if I feel reactive, and pause.",
];

// Reflection questions
const REFLECTION_QUESTIONS = [
  "What did you notice about your mental state during the game?",
  "Did you feel any moments of reactivity? What triggered them?",
  "Were there moments where you felt truly present?",
  "How did your body feel throughout the session?",
  "What would you like to carry forward to your next practice?",
];

export function CalmPlayMode({ onExit }: CalmPlayModeProps) {
  // Coach integration
  const { recordEvent, recordMindfulness, recordReflection } = useCoachStore();
  const sessionStartTime = useRef<number>(Date.now());
  
  // Board settings
  const boardStyles = useBoardStyles();
  
  // Session state
  const [sessionPhase, setSessionPhase] = useState<SessionPhase>('WELCOME');
  const [selectedIntention, setSelectedIntention] = useState<string | null>(null);
  
  // Game state
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, { backgroundColor: string }>>({});
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [engineReady, setEngineReady] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(0);
  
  // Calm Play specific state
  const [currentWisdom, setCurrentWisdom] = useState(CALM_WISDOM[0]);
  const [showBodyPrompt, setShowBodyPrompt] = useState(false);
  const [currentBodyPrompt, setCurrentBodyPrompt] = useState('');
  const [breathState, setBreathState] = useState<BreathState>('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [breathTimer, setBreathTimer] = useState(4);
  const [showPreMoveBreath, setShowPreMoveBreath] = useState(false);
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [currentReflectionIndex, setCurrentReflectionIndex] = useState(0);
  const [presenceStreak, setPresenceStreak] = useState(0);
  const [bestPresenceStreak, setBestPresenceStreak] = useState(0);

  const engineInitialized = useRef(false);
  
  // Record session start when entering Calm Play
  useEffect(() => {
    sessionStartTime.current = Date.now();
    recordEvent('CALM_PLAY_START', { intention: selectedIntention });
    
    // Cleanup: record end when component unmounts
    return () => {
      recordEvent('CALM_PLAY_END', { 
        duration: Math.round((Date.now() - sessionStartTime.current) / 60000),
        moveCount 
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Initialize engine at very easy level
  useEffect(() => {
    if (!engineInitialized.current) {
      engineInitialized.current = true;
      stockfish.init().then((ready) => {
        setEngineReady(ready);
        if (ready) {
          stockfish.setStrength(0); // Easiest level - this is about presence, not competition
        }
      });
    }
  }, []);

  // Session timer
  useEffect(() => {
    if (sessionPhase !== 'PLAYING') return;
    const timer = setInterval(() => {
      setSessionDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionPhase]);

  // Breathing cycle during BREATHING phase
  useEffect(() => {
    if (sessionPhase !== 'BREATHING') return;
    
    const breathCycle = () => {
      // 4-4-4-4 box breathing
      const phases: { state: BreathState; duration: number }[] = [
        { state: 'inhale', duration: 4 },
        { state: 'hold', duration: 4 },
        { state: 'exhale', duration: 4 },
        { state: 'rest', duration: 4 },
      ];
      
      let currentPhase = 0;
      let timeInPhase = 0;
      
      const timer = setInterval(() => {
        timeInPhase++;
        setBreathTimer(phases[currentPhase].duration - timeInPhase);
        
        if (timeInPhase >= phases[currentPhase].duration) {
          currentPhase = (currentPhase + 1) % phases.length;
          timeInPhase = 0;
          setBreathState(phases[currentPhase].state);
          setBreathTimer(phases[currentPhase].duration);
          
          // Count full breath cycles
          if (currentPhase === 0) {
            setBreathCount(prev => prev + 1);
          }
        }
      }, 1000);
      
      return () => clearInterval(timer);
    };
    
    return breathCycle();
  }, [sessionPhase]);

  // Body awareness prompts every 3 moves
  useEffect(() => {
    if (moveCount > 0 && moveCount % 3 === 0) {
      const prompt = BODY_PROMPTS[Math.floor(Math.random() * BODY_PROMPTS.length)];
      setCurrentBodyPrompt(prompt);
      setShowBodyPrompt(true);
      setTimeout(() => setShowBodyPrompt(false), 5000);
    }
  }, [moveCount]);

  // Rotate wisdom every 5 moves
  useEffect(() => {
    if (moveCount > 0 && moveCount % 5 === 0) {
      const newWisdom = CALM_WISDOM[Math.floor(Math.random() * CALM_WISDOM.length)];
      setCurrentWisdom(newWisdom);
    }
  }, [moveCount]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathInstruction = () => {
    switch (breathState) {
      case 'inhale': return 'Breathe in...';
      case 'hold': return 'Hold gently...';
      case 'exhale': return 'Release...';
      case 'rest': return 'Rest empty...';
    }
  };

  // Make engine move with proper validation
  const makeEngineMove = useCallback((currentGame: Chess) => {
    if (!engineReady || currentGame.isGameOver()) return;

    setIsThinking(true);
    
    // Add a small delay for a more peaceful pace
    setTimeout(() => {
      stockfish.playMove(currentGame.fen(), (bestMove) => {
        try {
          // Validate UCI move format
          const parsed = parseUciMove(bestMove);
          if (!parsed) {
            console.error('Invalid move format from engine:', bestMove);
            setIsThinking(false);
            return;
          }
          
          const gameCopy = new Chess(currentGame.fen());
          const move = gameCopy.move({ 
            from: parsed.from, 
            to: parsed.to, 
            promotion: parsed.promotion 
          });
          
        if (move) {
          // Preserve scroll position
          const scrollY = window.scrollY;
          
          setGame(gameCopy);
          setLastMove({ from: parsed.from, to: parsed.to });
          
          // Restore scroll position
          requestAnimationFrame(() => window.scrollTo(0, scrollY));
        } else {
          console.error('Engine move was not legal:', bestMove, 'in position', currentGame.fen());
        }
      } catch (e) {
        console.error('Engine move error:', e);
      } finally {
        setIsThinking(false);
      }
      });
    }, 800); // Gentle delay
  }, [engineReady]);

  // Get possible moves
  const getMoveOptions = useCallback((square: Square) => {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, { backgroundColor: string }> = {};
    moves.forEach((move) => {
      // Softer, more meditative colors
      newSquares[move.to] = {
        backgroundColor: game.get(move.to) 
          ? 'rgba(147, 197, 253, 0.5)' // Soft blue for captures
          : 'rgba(167, 139, 250, 0.25)', // Soft purple for moves
      };
    });
    newSquares[square] = { backgroundColor: 'rgba(167, 139, 250, 0.35)' };
    setOptionSquares(newSquares);
    return true;
  }, [game]);

  // Handle square click
  const onSquareClick = useCallback((square: Square) => {
    if (isThinking) return;
    if (game.turn() !== 'w') return;
    if (showPreMoveBreath) return; // Wait for breath

    if (!moveFrom) {
      const piece = game.get(square);
      if (piece && piece.color === 'w') {
        setMoveFrom(square);
        getMoveOptions(square);
        // Show pre-move breath prompt occasionally
        if (Math.random() < 0.3) { // 30% chance
          setShowPreMoveBreath(true);
          setTimeout(() => setShowPreMoveBreath(false), 3000);
        }
      }
      return;
    }

    if (moveFrom === square) {
      setMoveFrom(null);
      setOptionSquares({});
      return;
    }

    const gameCopy = new Chess(game.fen());
    try {
      const move = gameCopy.move({
        from: moveFrom,
        to: square,
        promotion: 'q',
      });

      if (move) {
        // Preserve scroll position
        const scrollY = window.scrollY;
        
        setGame(gameCopy);
        setLastMove({ from: moveFrom, to: square });
        setMoveCount(prev => prev + 1);
        setPresenceStreak(prev => {
          const newStreak = prev + 1;
          if (newStreak > bestPresenceStreak) {
            setBestPresenceStreak(newStreak);
          }
          return newStreak;
        });
        
        // Restore scroll position
        requestAnimationFrame(() => window.scrollTo(0, scrollY));
        setMoveFrom(null);
        setOptionSquares({});
        
        if (!gameCopy.isGameOver()) {
          makeEngineMove(gameCopy);
        }
      }
    } catch {
      const piece = game.get(square);
      if (piece && piece.color === 'w') {
        setMoveFrom(square);
        getMoveOptions(square);
      } else {
        setMoveFrom(null);
        setOptionSquares({});
      }
    }
  }, [game, moveFrom, isThinking, getMoveOptions, makeEngineMove, showPreMoveBreath, bestPresenceStreak]);

  // Handle drop
  const onDrop = useCallback((sourceSquare: Square, targetSquare: Square) => {
    if (isThinking || game.turn() !== 'w') return false;
    if (showPreMoveBreath) return false;

    const gameCopy = new Chess(game.fen());
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move) {
        // Preserve scroll position
        const scrollY = window.scrollY;
        
        setGame(gameCopy);
        setLastMove({ from: sourceSquare, to: targetSquare });
        setMoveCount(prev => prev + 1);
        setPresenceStreak(prev => {
          const newStreak = prev + 1;
          if (newStreak > bestPresenceStreak) {
            setBestPresenceStreak(newStreak);
          }
          return newStreak;
        });
        setMoveFrom(null);
        setOptionSquares({});
        
        // Restore scroll position
        requestAnimationFrame(() => window.scrollTo(0, scrollY));
        
        if (!gameCopy.isGameOver()) {
          makeEngineMove(gameCopy);
        }
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }, [game, isThinking, makeEngineMove, showPreMoveBreath, bestPresenceStreak]);

  // Custom square styles - softer colors
  const customSquareStyles = {
    ...optionSquares,
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: 'rgba(167, 139, 250, 0.2)' },
      [lastMove.to]: { backgroundColor: 'rgba(167, 139, 250, 0.3)' },
    }),
  };

  // New game
  const handleNewGame = () => {
    setGame(new Chess());
    setMoveFrom(null);
    setOptionSquares({});
    setLastMove(null);
    setMoveCount(0);
    setPresenceStreak(0);
  };

  // End session and go to reflection
  const handleEndSession = () => {
    setSessionPhase('REFLECTION');
    setCurrentReflectionIndex(Math.floor(Math.random() * REFLECTION_QUESTIONS.length));
  };
  
  // Handle completing the reflection and finishing session
  const handleFinishWithReflection = () => {
    // Record reflection if provided
    if (reflectionAnswer.trim()) {
      recordReflection(reflectionAnswer);
    }
    
    // Record the breathing/mindfulness time (estimate based on breathing phase duration)
    const breathingMinutes = Math.max(1, Math.round(breathCount * 16 / 60)); // ~16 seconds per breath cycle
    if (breathingMinutes > 0) {
      recordMindfulness('breathing', breathingMinutes);
    }
  };

  // ============================================
  // WELCOME PHASE
  // ============================================
  if (sessionPhase === 'WELCOME') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6"
        style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
        <div className="max-w-xl text-center animate-fade-in">
          {/* Zen circle */}
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#calmGradient)"
                strokeWidth="1"
                strokeDasharray="8 4"
              />
              <defs>
                <linearGradient id="calmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">☯</span>
            </div>
          </div>

          <h1 className="text-3xl font-serif text-slate-100 mb-4">
            Calm Play
          </h1>
          
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            This is not about winning.<br />
            This is about presence.
          </p>

          <div className="space-y-4 text-left mb-10 p-6 rounded-2xl"
            style={{ background: 'rgba(30, 27, 75, 0.5)', border: '1px solid rgba(167, 139, 250, 0.1)' }}>
            <p className="text-slate-300 text-sm leading-relaxed">
              In Calm Play, you'll be guided through a brief breathing ritual before 
              beginning. The engine plays gently—your opponent is not here to defeat you, 
              but to give you a canvas for practice.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Throughout your session, you'll receive gentle prompts to notice your 
              body, your breath, and your mental state. There is no clock. There is 
              no rating. There is only this moment and this position.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setSessionPhase('BREATHING')}
              className="px-8 py-4 rounded-xl text-lg font-medium transition-all
                bg-gradient-to-r from-violet-600/80 to-indigo-600/80 
                hover:from-violet-500/80 hover:to-indigo-500/80
                text-white shadow-lg shadow-violet-500/20"
            >
              Begin with Breathing
            </button>
            <button
              onClick={onExit}
              className="text-slate-500 hover:text-slate-400 transition-colors text-sm"
            >
              Return to Play
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // BREATHING PHASE
  // ============================================
  if (sessionPhase === 'BREATHING') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6"
        style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
        <div className="max-w-md text-center animate-fade-in">
          <p className="text-slate-500 text-sm uppercase tracking-widest mb-8">
            Box Breathing • 4-4-4-4
          </p>

          {/* Breathing circle */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out
                ${breathState === 'inhale' ? 'scale-110' : 
                  breathState === 'exhale' ? 'scale-90' : 'scale-100'}`}
              style={{ 
                background: breathState === 'inhale' 
                  ? 'radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, transparent 70%)'
                  : breathState === 'exhale'
                  ? 'radial-gradient(circle, rgba(129, 140, 248, 0.2) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(147, 197, 253, 0.25) 0%, transparent 70%)'
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-6xl font-light text-violet-300 mb-2">
                {breathTimer}
              </div>
              <div className="text-lg font-serif text-slate-400 italic">
                {getBreathInstruction()}
              </div>
            </div>
            
            {/* Outer ring */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgba(167, 139, 250, 0.2)"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          <p className="text-slate-500 text-sm mb-8">
            {breathCount < 3 
              ? `Complete ${3 - breathCount} more breath${3 - breathCount === 1 ? '' : 's'} to continue`
              : 'You may continue when ready'}
          </p>

          {breathCount >= 3 && (
            <button
              onClick={() => setSessionPhase('INTENTION')}
              className="px-8 py-3 rounded-xl font-medium transition-all animate-fade-in
                bg-gradient-to-r from-violet-600/60 to-indigo-600/60 
                hover:from-violet-500/60 hover:to-indigo-500/60
                text-white"
            >
              Continue to Intention Setting
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============================================
  // INTENTION PHASE
  // ============================================
  if (sessionPhase === 'INTENTION') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6"
        style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
        <div className="max-w-lg text-center animate-fade-in">
          <p className="text-slate-500 text-sm uppercase tracking-widest mb-4">
            Set Your Intention
          </p>
          
          <h2 className="text-2xl font-serif text-slate-200 mb-8">
            What will you practice today?
          </h2>

          <div className="space-y-3 mb-10">
            {INTENTIONS.map((intention, index) => (
              <button
                key={index}
                onClick={() => setSelectedIntention(intention)}
                className={`w-full p-4 rounded-xl text-left transition-all text-sm
                  ${selectedIntention === intention 
                    ? 'bg-violet-600/30 border-violet-500/50 text-violet-200' 
                    : 'bg-slate-800/30 border-slate-700/30 text-slate-400 hover:bg-slate-800/50'}`}
                style={{ border: '1px solid' }}
              >
                {intention}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSessionPhase('PLAYING')}
            disabled={!selectedIntention}
            className="px-8 py-3 rounded-xl font-medium transition-all
              bg-gradient-to-r from-violet-600/80 to-indigo-600/80 
              hover:from-violet-500/80 hover:to-indigo-500/80
              text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Begin Practice
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // REFLECTION PHASE
  // ============================================
  if (sessionPhase === 'REFLECTION') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6"
        style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
        <div className="max-w-xl text-center animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(167, 139, 250, 0.2)' }}>
            <span className="text-2xl">🪷</span>
          </div>

          <p className="text-slate-500 text-sm uppercase tracking-widest mb-4">
            Session Complete
          </p>
          
          <h2 className="text-2xl font-serif text-slate-200 mb-8">
            Take a moment to reflect
          </h2>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 p-4 rounded-xl"
            style={{ background: 'rgba(30, 27, 75, 0.5)' }}>
            <div>
              <div className="text-2xl font-light text-violet-300">
                {formatDuration(sessionDuration)}
              </div>
              <div className="text-xs text-slate-500">Duration</div>
            </div>
            <div>
              <div className="text-2xl font-light text-violet-300">
                {moveCount}
              </div>
              <div className="text-xs text-slate-500">Moves</div>
            </div>
            <div>
              <div className="text-2xl font-light text-violet-300">
                {bestPresenceStreak}
              </div>
              <div className="text-xs text-slate-500">Best Streak</div>
            </div>
          </div>

          {/* Reflection question */}
          <div className="mb-6 p-6 rounded-xl text-left"
            style={{ background: 'rgba(30, 27, 75, 0.5)', border: '1px solid rgba(167, 139, 250, 0.1)' }}>
            <p className="text-slate-300 font-serif italic mb-4">
              {REFLECTION_QUESTIONS[currentReflectionIndex]}
            </p>
            <textarea
              value={reflectionAnswer}
              onChange={(e) => setReflectionAnswer(e.target.value)}
              placeholder="Write your thoughts... (optional)"
              className="w-full p-3 rounded-lg text-sm resize-none h-24
                bg-slate-900/50 text-slate-300 placeholder:text-slate-600
                border border-slate-700/50 focus:outline-none focus:border-violet-500/50"
            />
          </div>

          {/* Closing wisdom */}
          <div className="mb-8 text-sm">
            <p className="text-slate-400 italic">
              "{currentWisdom.quote}"
            </p>
            <p className="text-slate-600 text-xs mt-2">
              — {currentWisdom.tradition}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setSessionPhase('BREATHING');
                setBreathCount(0);
                setSessionDuration(0);
                handleNewGame();
              }}
              className="px-6 py-3 rounded-xl font-medium transition-all
                bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
            >
              Practice Again
            </button>
            <button
              onClick={() => {
                handleFinishWithReflection();
                onExit?.();
              }}
              className="px-6 py-3 rounded-xl font-medium transition-all
                bg-gradient-to-r from-violet-600/80 to-indigo-600/80 
                hover:from-violet-500/80 hover:to-indigo-500/80 text-white"
            >
              Finish Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // PLAYING PHASE
  // ============================================
  return (
    <div className="min-h-screen p-4 md:p-6"
      style={{ background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }}>
      
      {/* Body awareness prompt - floating */}
      {showBodyPrompt && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="px-6 py-3 rounded-full text-sm
            bg-indigo-900/90 text-indigo-200 border border-indigo-500/30 shadow-lg">
            ✨ {currentBodyPrompt}
          </div>
        </div>
      )}

      {/* Pre-move breath prompt - floating over board */}
      {showPreMoveBreath && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="px-8 py-4 rounded-2xl text-center animate-fade-in
            bg-slate-900/95 border border-violet-500/30 shadow-2xl">
            <p className="text-violet-300 font-serif text-lg">
              Take a breath before you move
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Let the position come to you
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(167, 139, 250, 0.15)' }}>
              <span className="text-lg">☯</span>
            </div>
            <div>
              <h1 className="text-xl font-serif text-slate-200">
                Calm Play
              </h1>
              <p className="text-slate-500 text-xs">
                {selectedIntention}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-slate-400 font-mono">
                {formatDuration(sessionDuration)}
              </div>
              <div className="text-xs text-slate-600">
                {moveCount} moves
              </div>
            </div>
            <button
              onClick={handleEndSession}
              className="px-4 py-2 rounded-lg text-sm transition-all
                bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300"
            >
              End Session
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-start justify-center">
        {/* Chess board */}
        <div className="relative flex flex-col items-center flex-shrink-0">
          {/* Engine loading */}
          {!engineReady && (
            <div className="absolute top-2 left-2 z-10 px-3 py-1 rounded-lg text-xs
              bg-slate-800/80 text-slate-500">
              Preparing peaceful opponent...
            </div>
          )}

          {/* Engine thinking - subtle */}
          {isThinking && (
            <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2 px-3 py-1 rounded-lg
              bg-slate-800/60 text-slate-500 text-xs">
              <div className="w-3 h-3 border border-violet-400/50 border-t-transparent rounded-full animate-spin" />
              Contemplating...
            </div>
          )}

          <div className="overflow-hidden shadow-2xl shadow-violet-500/10"
            style={{ border: '1px solid rgba(167, 139, 250, 0.1)', width: Math.min(480, typeof window !== 'undefined' ? window.innerWidth - 48 : 480), maxWidth: '100%' }}>
            <Chessboard
              position={game.fen()}
              onSquareClick={onSquareClick}
              onPieceDrop={onDrop}
              boardOrientation="white"
              customSquareStyles={customSquareStyles}
              customDarkSquareStyle={boardStyles.customDarkSquareStyle}
              customLightSquareStyle={boardStyles.customLightSquareStyle}
              animationDuration={300}
              arePiecesDraggable={!isThinking && game.turn() === 'w' && !showPreMoveBreath}
              boardWidth={Math.min(480, typeof window !== 'undefined' ? window.innerWidth - 48 : 480)}
            />
          </div>

          {/* Game over - very gentle */}
          {game.isGameOver() && (
            <div className="mt-4 px-6 py-3 rounded-xl text-center
              bg-slate-800/60 text-slate-300 text-sm">
              {game.isCheckmate() 
                ? "The game has ended. How did it feel?"
                : "A draw has been reached. Notice your response."}
              <button
                onClick={handleNewGame}
                className="block mx-auto mt-3 text-violet-400 hover:text-violet-300 text-xs"
              >
                Begin another practice →
              </button>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="w-full lg:w-80 space-y-4">
          {/* Current wisdom */}
          <div className="p-5 rounded-xl"
            style={{ background: 'rgba(30, 27, 75, 0.5)', border: '1px solid rgba(167, 139, 250, 0.1)' }}>
            <p className="text-slate-300 text-sm font-serif italic leading-relaxed">
              "{currentWisdom.quote}"
            </p>
            <p className="text-slate-600 text-xs mt-3">
              — {currentWisdom.tradition}
            </p>
          </div>

          {/* Presence tracker */}
          <div className="p-5 rounded-xl"
            style={{ background: 'rgba(30, 27, 75, 0.3)', border: '1px solid rgba(167, 139, 250, 0.05)' }}>
            <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3">
              Presence
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-light text-violet-300">
                  {presenceStreak}
                </div>
                <div className="text-xs text-slate-600">
                  moves present
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-light text-slate-400">
                  {bestPresenceStreak}
                </div>
                <div className="text-xs text-slate-600">
                  best streak
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="p-5 rounded-xl"
            style={{ background: 'rgba(30, 27, 75, 0.3)', border: '1px solid rgba(167, 139, 250, 0.05)' }}>
            <button
              onClick={handleNewGame}
              className="w-full py-2 rounded-lg text-sm transition-all mb-2
                bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300"
            >
              New Position
            </button>
            <button
              onClick={handleEndSession}
              className="w-full py-2 rounded-lg text-sm transition-all
                bg-violet-600/30 text-violet-300 hover:bg-violet-600/40"
            >
              End & Reflect
            </button>
          </div>

          {/* Reminders */}
          <div className="p-5 rounded-xl"
            style={{ background: 'rgba(30, 27, 75, 0.2)' }}>
            <h3 className="text-xs uppercase tracking-widest text-slate-600 mb-3">
              Remember
            </h3>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="flex items-start gap-2">
                <span className="text-violet-400/50 mt-0.5">○</span>
                <span>There is no clock.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400/50 mt-0.5">○</span>
                <span>The result does not matter.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-violet-400/50 mt-0.5">○</span>
                <span>Only this moment exists.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalmPlayMode;
