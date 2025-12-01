import type { ZenChessDay } from '@/lib/types';

// ============================================
// PHASE 1: CALM MIND & BLUNDER PREVENTION
// Days 1-60
// Deep spiritual + chess integration
// ============================================

// Puzzle positions with solutions for Phase 1 (defined before use)
const puzzleBank = [
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['Ng5', 'd5', 'exd5'],
    instructions: 'White to move. Attack the weak f7 square.',
    difficulty: 1 as const,
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    solution: ['O-O'],
    instructions: 'White to move. Safety first—what\'s the best move?',
    difficulty: 1 as const,
  },
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['Qxf7#'],
    instructions: 'White to move. Find the checkmate in one.',
    difficulty: 1 as const,
  },
  {
    fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    solution: ['Bc5', 'c3', 'd6'],
    instructions: 'Black to move. Develop with purpose.',
    difficulty: 1 as const,
  },
  {
    fen: 'r1bqk2r/ppppbppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 5',
    solution: ['d3', 'O-O', 'O-O'],
    instructions: 'White to move. Prepare to castle.',
    difficulty: 1 as const,
  },
  {
    fen: 'r2qkb1r/ppp2ppp/2n2n2/3pp1B1/2B1P3/3P1N2/PPP2PPP/RN1QK2R b KQkq - 0 6',
    solution: ['Be7', 'Bxf6', 'Bxf6'],
    instructions: 'Black to move. Break the pin.',
    difficulty: 2 as const,
  },
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    solution: ['Bb5', 'a6', 'Ba4'],
    instructions: 'White to move. Enter the Ruy Lopez.',
    difficulty: 1 as const,
  },
  {
    fen: 'r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    solution: ['O-O', 'Be7', 'Re1'],
    instructions: 'White to move. Complete development.',
    difficulty: 1 as const,
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['c3', 'd6', 'd4'],
    instructions: 'White to move. Prepare the central push.',
    difficulty: 2 as const,
  },
  {
    fen: 'rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['d3', 'O-O', 'O-O'],
    instructions: 'White to move. Solid development.',
    difficulty: 1 as const,
  },
];

export const phase1Days: ZenChessDay[] = [
  // ==================== DAY 1 ====================
  {
    dayNumber: 1,
    title: 'The Field That Holds All Things',
    theme: 'Beginning with stillness',
    phase: 'CALM_MIND',

    sacredTexts: [
      {
        tradition: 'VIJNANA',
        quote: '"Beloved, the awareness that permeates all things is the root of all experience. Rest in that which witnesses."',
        commentary: 'This opening verse from the Vijnana Bhairava Tantra invites you to recognize that awareness is not something you have—it is what you are. Every thought, sensation, and emotion appears within this awareness, like waves appearing in the ocean. The wave is not separate from the ocean; experience is not separate from you.',
        context: 'A medieval Kashmiri text offering 112 gateways into presence through breath, sensation, and the immediacy of experience.',
        whyThisMatters: 'This teaching interrupts the habit of identifying with mental content and points you back to the awareness that is always already present.',
      },
      {
        tradition: 'TAO',
        quote: '"The Tao that can be spoken is not the eternal Tao; the name that can be named is not the eternal name."',
        commentary: 'What we are exploring cannot be fully captured in language. Hold these teachings lightly—they are fingers pointing at the moon, not the moon itself. The Tao reminds us that direct experience precedes all description.',
        context: 'An ancient Chinese classic pointing to effortless harmony and the wisdom of yielding.',
        whyThisMatters: 'The Tao reminds us that the deepest truths slip away when we try to cage them in concepts—relaxing the grip of the conceptual mind opens direct experience.',
      },
      {
        tradition: 'ART_OF_WAR',
        quote: '"To know yourself is to be invincible."',
        commentary: 'Sun Tzu understood that self-knowledge is the foundation of all wisdom. When you truly know yourself—not your stories about yourself, but the awareness that you are—no external circumstance can fundamentally destabilize you.',
        context: 'A classical treatise where outer strategy mirrors inner clarity and self-knowledge.',
        whyThisMatters: 'Self-knowledge calms the nervous system; you stop fighting what is and respond from clarity.',
      },
      {
        tradition: 'UPANISHADS',
        quote: '"By whom is the mind directed? That which is the hearing of the ear, the seeing of the eye."',
        commentary: 'The Kena Upanishad asks the essential question: what is behind your senses, your thoughts, your experiences? There is something that hears through your ears and sees through your eyes. That is what we are discovering together.',
        context: 'Nondual dialogues exploring the source behind seeing, hearing, and thought.',
        whyThisMatters: 'Recognizing the seer behind seeing dissolves the sense of being a separate observer trapped in a body.',
      },
    ],

    integratedReflection: {
      title: 'Resting as the Field',
      body: `All sensations, emotions, impulses, and cravings arise within the vast space of awareness. You are not the movements—you are the field that holds them.

Think of the moment just before falling asleep—when thoughts slow and the usual sense of "me" softens. That spaciousness is not a special state; it is what you are when you stop adding anything to experience.

The chessboard, too, is a field. Pieces move, tensions rise and fall, but the board itself remains unmoved. Today you begin learning to be the board, not the pieces. To see clearly, not from within the drama of the position, but from the stillness that holds it.

This is your first day of a 365-day journey. Return again and again to the quiet center that requires no explanation.`,
    },

    meditation: {
      title: 'Resting in the Field',
      steps: [
        'Sit upright, relaxed. Let your spine be straight but not rigid.',
        'Feel the breath rise and fall naturally. Do not control it.',
        'Become aware of the space within and around you—the space in which sounds, sensations, and thoughts appear.',
        'Whisper internally: "This appears in me. I remain."',
        'Rest here for as long as feels natural, returning gently when the mind wanders.',
      ],
      suggestedMinutes: 7,
      context: 'This foundational practice establishes the orientation for the entire journey: you are learning to recognize yourself as the aware space in which experience unfolds, rather than identifying solely with the contents of experience.',
    },

    prayer: 'Let me move through today with gentleness and spaciousness. May I act from clarity and return to awareness when I forget.',

    dailyAction: {
      instruction: 'When irritation or tension arises, pause and recognize it as a wave passing through awareness.',
      context: 'Try this during a minor frustration—perhaps in traffic, or when something doesn\'t go as planned. The goal is not to suppress the feeling but to notice: "Ah, irritation is here. I am the awareness that notices this."',
    },

    chessConcept: 'The Pre-Move Pause',
    chessApplication: 'Before every move today, take three conscious breaths. This is not meditation—it is practical prevention. Your brain needs time to shift from reactive mode to perceptive mode. The pause creates space for pattern recognition to function.',
    chessWisdom: 'Just as awareness holds all experience, the chessboard holds all positions. Learn to see from stillness, not from the anxiety of the moment. The player who can pause, even for three seconds, before every move will eliminate half their blunders within a week.',

    exerciseType: 'CALM_PLAY',
    exerciseInstructions: 'Play a single game against the engine at the lowest level. Before every move, take three breaths. Do not try to win. Try only to see.',
    exerciseContext: 'This first exercise is not about chess skill. It is about building the habit of pause. Win or lose is irrelevant today. What matters is: can you remain present?',
    difficulty: 1,

    tiltSignal: 'Urge to move immediately without pausing',
    tiltReframe: 'The pause is not delay—it is the move before the move. Clarity is speed. The clearest mind sees fastest.',

    breathingExercise: {
      name: 'Box Breathing',
      pattern: { inhale: 4, hold: 4, exhale: 4, holdEmpty: 4 },
      cycles: 4,
      purpose: 'Activates the parasympathetic nervous system, reducing impulsivity and creating the physiological conditions for clear seeing.',
    },
  },

  // ==================== DAY 2 ====================
  {
    dayNumber: 2,
    title: 'The Brightness in the Pause',
    theme: 'Discovering power in stillness',
    phase: 'CALM_MIND',

    sacredTexts: [
      {
        tradition: 'VIJNANA',
        quote: '"Between the inhalation and exhalation shines the light of consciousness."',
        commentary: 'The breath is always moving between two poles. In the tiny pause between them, the mind has a chance to rest. This verse points you to that pause as a doorway into presence—a gap where the usual mental momentum stops.',
        context: 'The Vijnana Bhairava uses the natural rhythm of breath as a direct path to presence.',
        whyThisMatters: 'The pause interrupts habitual mental momentum. In that gap, the nervous system downshifts and awareness shines unobstructed.',
      },
      {
        tradition: 'TAO',
        quote: '"Being and non-being create each other. Difficult and easy complete each other."',
        commentary: 'Opposites define and complete each other. The pause needs the breath; the breath needs the pause. In chess, attack needs defense; offense needs patience. Understanding this interdependence softens rigid thinking.',
        context: 'Taoist wisdom sees complementary opposites as the dance of reality itself.',
        whyThisMatters: 'Recognizing interdependence softens rigid thinking and opens you to flow.',
      },
      {
        tradition: 'ART_OF_WAR',
        quote: '"When you are still, be like a mountain; when you move, be like a swift river."',
        commentary: 'Master both stillness and movement. The pause teaches stillness; the breath teaches flow. On the chessboard, knowing when to wait and when to strike is everything.',
        context: 'Strategic wisdom recognizes that timing—knowing when to move and when to be still—is everything.',
        whyThisMatters: 'Reactivity happens when we skip the pause. Learning to wait transforms impulsiveness into responsiveness.',
      },
    ],

    integratedReflection: {
      title: 'The Sacred Gap',
      body: `The pause between breaths is a doorway into clarity. In stillness, the mud settles; in the gap, awareness brightens.

You know this feeling—that brief moment after a sneeze, or when you step outside into cold air. The mind stops. Something opens. The usual narrative falls away.

In chess, the same principle applies. Between seeing the position and making your move, there is a gap. Most players rush through it. The master dwells there. In that pause, the position reveals itself.

Your strength today is timing—pausing when it is time to pause, and moving only when the movement is true.`,
    },

    meditation: {
      title: 'The Sacred Gap',
      steps: [
        'Inhale gently through the nose for 4 counts.',
        'Pause for 2–3 soft seconds at the top of the breath. Rest there.',
        'Exhale slowly for 6 counts.',
        'Pause again at the bottom before the next inhale. Notice the stillness.',
        'Let each pause become a moment of quiet brightness.',
      ],
      suggestedMinutes: 7,
      context: 'This practice trains you to find stillness within movement. The gaps between breaths are natural meditation spaces that require no effort to create—only attention to notice.',
    },

    prayer: 'May I discover strength in stillness. May clarity arise in the pauses between breaths and between moves.',

    dailyAction: {
      instruction: 'When you feel reactive, insert one full breath—inhale, pause, exhale, pause—before responding.',
      context: 'Let the gap choose your response. Notice if even this small pause changes what you say or do. The gap is where wisdom lives.',
    },

    chessConcept: 'Candidate Moves',
    chessApplication: 'Before moving, identify at least two candidate moves. Sit with each one in the pause. The first impulse is often not the best move—it is just the loudest.',
    chessWisdom: 'The impulsive player sees one move and plays it. The wise player sees the gap between seeing and moving, and uses it to consider alternatives.',

    exerciseType: 'PUZZLE',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['Ng5', 'd5', 'exd5', 'Na5', 'Bb5+'],
    exerciseInstructions: 'White to move. Before choosing, identify two candidate moves. Sit with each for a breath. Then decide.',
    exerciseContext: 'This is the Italian Game. The position looks calm, but White has a sharp option. Can you find it by pausing rather than rushing?',
    difficulty: 2,

    tiltSignal: 'Physical restlessness, leg bouncing, clock-watching',
    tiltReframe: 'The clock is a tool, not a judge. Use your time fully—it is why you have it. The pause is not wasted time; it is the time that matters most.',
  },

  // ==================== DAY 3 ====================
  {
    dayNumber: 3,
    title: 'The Anatomy of Blunders',
    theme: 'Understanding the roots of error',
    phase: 'CALM_MIND',

    sacredTexts: [
      {
        tradition: 'STOIC',
        quote: '"It is not things that disturb us, but our judgments about things."',
        commentary: 'Epictetus understood that suffering comes not from events themselves, but from our interpretations. A blunder is not a catastrophe—it is information. It reveals where attention was absent, nothing more.',
        context: 'Stoic philosophy teaches equanimity through understanding what is and is not within our control.',
        whyThisMatters: 'When you stop judging blunders as failures of character, you can learn from them without emotional disturbance.',
      },
      {
        tradition: 'ZEN',
        quote: '"The obstacle is the path."',
        commentary: 'In Zen, every difficulty is an opportunity for awakening. Your blunders are not deviations from the path of mastery—they are the path itself. Each one teaches you something no victory could.',
        context: 'Zen Buddhism emphasizes direct experience and finding enlightenment in ordinary moments.',
        whyThisMatters: 'Reframing blunders as teachers transforms frustration into curiosity.',
      },
      {
        tradition: 'VIJNANA',
        quote: '"In moments of terror or wonder, enter fully. There, discover presence."',
        commentary: 'Strong emotion—including the shock of a blunder—can be a doorway. Instead of contracting, expand. Meet the feeling fully. In that meeting, you find something unchanged by the error.',
        context: 'Tantra embraces all experience as gateway to awareness.',
        whyThisMatters: 'The moment after a blunder is a powerful opportunity for presence—if you can meet it without resistance.',
      },
    ],

    integratedReflection: {
      title: 'The Three Parents of Every Blunder',
      body: `Every blunder has three parents: speed, emotion, and blind spots.

Speed creates blunders because the brain has not completed its pattern recognition scan. Emotion creates blunders because anxiety narrows vision. Blind spots create blunders because we see what we expect rather than what is there.

Today we examine not just what we miss, but why we miss it. This is not self-criticism—it is investigation. A detective does not blame themselves for a mystery; they solve it.

Your blunders are not failures of character. They are signals pointing to where practice is needed. When you understand this, frustration transforms into fuel.`,
    },

    meditation: {
      title: 'Observing Thoughts',
      steps: [
        'Sit comfortably. Let thoughts come and go like clouds.',
        'When a thought arises, notice it without following it.',
        'Label it silently: "thinking" or "planning" or "worrying."',
        'Return attention to the breath or the space between thoughts.',
        'Notice: you are not your thoughts. You are the awareness of them.',
      ],
      suggestedMinutes: 7,
      context: 'This practice develops the observer perspective that allows catching mistakes before they happen. You learn to see your mental patterns without being caught in them.',
    },

    prayer: 'May I meet my errors with curiosity, not condemnation. May each blunder become a teacher, each mistake a map.',

    dailyAction: {
      instruction: 'After any mistake today—in chess or life—pause and ask: "Was this speed, emotion, or a blind spot?"',
      context: 'This is diagnosis, not judgment. The answer guides your practice. Speed requires slowing. Emotion requires presence. Blind spots require new perspectives.',
    },

    chessConcept: 'The Blunder Check',
    chessApplication: 'Before pressing the clock, always ask: "What does my opponent want to do now?" This single question, applied consistently, will eliminate most tactical blunders.',
    chessWisdom: 'See threats before you see opportunities. Defense creates the platform for attack. The player who checks for opponent threats before executing their own plan will rarely be surprised.',

    exerciseType: 'PUZZLE',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 5 4',
    solution: ['Qe7'],
    exerciseInstructions: 'Black to move. White threatens Scholar\'s Mate on f7. Find the move that blocks the threat while developing.',
    exerciseContext: 'Blunder prevention starts with seeing opponent threats. This is a single-move puzzle—find the best defense.',
    difficulty: 1,

    tiltSignal: 'Shame or self-criticism after noticing a blunder',
    tiltReframe: 'Every master was once a disaster. Blunders are the tuition for mastery. The fee has been paid—now collect the lesson.',
  },

  // Generate Days 4-60 with rich content
  ...generateRichPhase1Days(4, 60),
];

// Helper function to generate remaining Phase 1 days with rich content
function generateRichPhase1Days(start: number, end: number): ZenChessDay[] {
  const themes = [
    { 
      title: 'The Weight of Impatience', 
      theme: 'Rushing as the root of suffering',
      concept: 'Prophylaxis',
      vijnanaQuote: '"Focus on the fire rising through the body, becoming lighter until consumed by the flames of awareness."',
      taoQuote: '"Those who rush arrive last. Nature does not hurry, yet everything is accomplished."',
    },
    { 
      title: 'The Check Reflex', 
      theme: 'Transcending the obvious',
      concept: 'Zwischenzug',
      vijnanaQuote: '"When desires arise, do not cling—observe them dissolving back into emptiness."',
      taoQuote: '"The wise leader acts without forcing. When work is done, people say: we did it ourselves."',
    },
    { 
      title: 'Counting Tempo', 
      theme: 'The currency of initiative',
      concept: 'Development',
      vijnanaQuote: '"Each moment of awareness is a lifetime. Waste nothing."',
      stoicQuote: '"Think of yourself as dead. You have lived your life. Now take what remains and live properly."',
    },
    { 
      title: 'The Weekly Rest', 
      theme: 'Integration through stillness',
      concept: 'Strategic Patience',
      vijnanaQuote: '"Between two thoughts, experience the interval. There, infinity awaits."',
      taoQuote: '"In the pursuit of learning, every day something is acquired. In the pursuit of Tao, every day something is dropped."',
    },
    { 
      title: 'Seeing Threats First', 
      theme: 'Defense before attack',
      concept: 'Threat Detection',
      artOfWarQuote: '"Know your enemy and know yourself; in a hundred battles you will never be in peril."',
      stoicQuote: '"Begin each day by telling yourself: today I shall meet people who are meddling, ungrateful, violent. I will not be surprised."',
    },
    { 
      title: 'The Hanging Piece', 
      theme: 'Material awareness',
      concept: 'Piece Safety',
      zenQuote: '"Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water."',
      taoQuote: '"The softest thing in the world overcomes the hardest thing in the world."',
    },
  ];

  const days: ZenChessDay[] = [];

  for (let i = start; i <= end; i++) {
    const themeIndex = (i - start) % themes.length;
    const t = themes[themeIndex];
    
    // Determine exercise type based on day pattern
    // Days 4, 7, 10... = PUZZLE, Days 5, 8, 11... = CALM_PLAY, Days 6, 9, 12... = CALM_PLAY
    const exerciseType = i % 3 === 1 ? 'PUZZLE' : 'CALM_PLAY';
    
    // Get puzzle from bank for puzzle days
    const puzzleIndex = (i - start) % puzzleBank.length;
    const puzzle = exerciseType === 'PUZZLE' ? puzzleBank[puzzleIndex] : null;

    days.push({
      dayNumber: i,
      title: t.title,
      theme: t.theme,
      phase: 'CALM_MIND',

      sacredTexts: [
        {
          tradition: 'VIJNANA',
          quote: t.vijnanaQuote || '"Rest in the space between thoughts. There you will find what you seek."',
          commentary: 'The Vijnana Bhairava offers direct methods for touching presence through ordinary experience.',
          whyThisMatters: 'This practice interrupts the habitual flow of mind and reveals the awareness underneath.',
        },
        {
          tradition: 'TAO',
          quote: t.taoQuote || '"The Tao does nothing, yet nothing is left undone."',
          commentary: 'Effortless action arises when we stop forcing and start flowing.',
          whyThisMatters: 'Forcing creates resistance. Flowing creates results.',
        },
      ],

      integratedReflection: {
        title: `Day ${i}: ${t.title}`,
        body: `Today's practice deepens your understanding of ${t.theme.toLowerCase()}. In chess as in life, this principle reveals itself moment by moment.

The teachings weave together: awareness from Tantra, flow from Tao, and practical wisdom from the masters. Your task is not to memorize but to embody.

Return to the breath when lost. Return to the pause before moving. Return to awareness when caught in thought.`,
      },

      meditation: {
        title: 'Focused Awareness',
        steps: [
          'Sit quietly. Establish your breath.',
          `Contemplate today's theme: ${t.theme}`,
          'Notice how this applies to your chess and your life.',
          'Rest in understanding without grasping.',
          'Carry the insight forward into your day.',
        ],
        suggestedMinutes: 7,
        context: `This meditation internalizes the lesson of ${t.title.toLowerCase()}.`,
      },

      prayer: `May I embody ${t.theme.toLowerCase()} today. May my moves and my life reflect this understanding.`,

      dailyAction: {
        instruction: `Notice moments when ${t.theme.toLowerCase()} appears in your day. Pause and observe.`,
        context: 'Awareness of the pattern is the first step to transformation.',
      },

      chessConcept: t.concept,
      chessApplication: `Apply the concept of ${t.concept.toLowerCase()} to your games today. Focus on this single element.`,
      chessWisdom: `${t.concept} is not just technique—it is the chess expression of today's spiritual teaching.`,

      exerciseType: exerciseType as 'PUZZLE' | 'CALM_PLAY',
      fen: puzzle?.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      solution: puzzle?.solution,
      exerciseInstructions: puzzle?.instructions || `Play a calm game against the engine. Before each move, take three breaths. Focus on ${t.concept.toLowerCase()}.`,
      exerciseContext: exerciseType === 'PUZZLE' 
        ? 'Find the best moves in this position.' 
        : `Building the habit of ${t.theme.toLowerCase()} through mindful play.`,
      difficulty: puzzle?.difficulty || (1 as 1 | 2 | 3 | 4 | 5),
    });
  }

  return days;
}

export default phase1Days;
