// ============================================
// COMPREHENSIVE CHESS CURRICULUM
// 80+ lessons with deep instructional content
// Every step has a FEN position!
// ============================================

export interface LessonStep {
  title: string;
  content: string;
  fen: string; // Chess position to show - REQUIRED
  highlights?: string[]; // Squares to highlight
  arrows?: [string, string][]; // Arrows to draw [from, to]
}

export interface Lesson {
  id: string;
  sectionId: string;
  title: string;
  subtitle: string;
  icon: string;
  duration: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  objectives: string[];
  steps: LessonStep[];
  keyPoints: string[];
}

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  bgColor: string;
  icon: string;
  requiredXP: number;
  lessons: Lesson[];
}

// ============================================
// SECTION 1: THE BASICS - 10 COMPLETE LESSONS
// ============================================
const basicsLessons: Lesson[] = [
  // LESSON 1: THE CHESSBOARD
  {
    id: 'basics-1',
    sectionId: 'basics',
    title: 'The Chessboard',
    subtitle: 'Understanding your battlefield',
    icon: '♜',
    duration: '5 min',
    difficulty: 1,
    objectives: [
      'Identify ranks, files, and diagonals',
      'Name any square using algebraic notation',
      'Understand light and dark square patterns',
    ],
    steps: [
      {
        title: 'The 64 Squares',
        content: `The chessboard is an 8×8 grid of 64 alternating light and dark squares. This checkered pattern isn't just decorative—it's essential for understanding piece movement, especially for bishops.

**Fun fact:** The bottom-right square should always be a light square when setting up the board. Remember: "White on right!"`,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      },
      {
        title: 'Files (Columns)',
        content: `**Files** are the vertical columns, labeled a through h from left to right (from White's perspective).

- The **a-file** and **h-file** are called "rook files"
- The **d-file** and **e-file** are "central files" (most important!)
- The **b-file** and **g-file** are "knight files"
- The **c-file** and **f-file** are "bishop files"

Opening the central files (d and e) often leads to exciting attacking chess!`,
        fen: '8/8/8/8/8/8/8/8 w - - 0 1',
        highlights: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'],
      },
      {
        title: 'Ranks (Rows)',
        content: `**Ranks** are the horizontal rows, numbered 1 through 8 from White's side.

- **1st rank** and **8th rank**: The home ranks where pieces start
- **2nd rank** and **7th rank**: The pawn starting positions
- **4th rank** and **5th rank**: The central ranks (key battlefield!)
- **3rd rank** and **6th rank**: Development squares for minor pieces

Most tactical battles happen on ranks 4, 5, 6, and 7.`,
        fen: '8/8/8/8/8/8/8/8 w - - 0 1',
        highlights: ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4', 'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
      },
      {
        title: 'Diagonals',
        content: `**Diagonals** run at 45-degree angles across the board. They're crucial for bishops and queens.

- The **a1-h8 diagonal** is the longest light-square diagonal
- The **a8-h1 diagonal** is the longest dark-square diagonal

Each diagonal contains only one color of squares. This is why we have "light-squared bishops" and "dark-squared bishops"—they can never switch!`,
        fen: '8/8/8/8/8/8/8/8 w - - 0 1',
        arrows: [['a1', 'h8'], ['a8', 'h1']],
      },
      {
        title: 'Algebraic Notation',
        content: `Every square has a unique name combining its file letter and rank number.

**Examples:**
- **e4**: The most popular first move in chess
- **d4**: The second most popular first move  
- **g1**: Where White's knight starts
- **f7**: A weak point in Black's opening position

To name a square: find the file (letter) first, then the rank (number).`,
        fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
        highlights: ['e4', 'd4', 'g1', 'f7', 'e1'],
      },
      {
        title: 'The Center',
        content: `The four central squares—**d4, d5, e4, e5**—are the most valuable real estate on the board.

**Why the center matters:**
1. Pieces in the center control more squares
2. A knight on e4 attacks 8 squares; on a1 only 2
3. Central pawns restrict enemy pieces
4. Control of the center enables attacks on both flanks

The battle for central control is the foundation of all chess strategy.`,
        fen: '8/8/8/3pp3/3PP3/8/8/8 w - - 0 1',
        highlights: ['d4', 'd5', 'e4', 'e5'],
      },
    ],
    keyPoints: [
      'Files are columns (a-h), ranks are rows (1-8)',
      'Every square has a unique name: file letter + rank number',
      'The center (d4, d5, e4, e5) is the most important area',
      'Diagonals contain only one color of squares',
      'White on right when setting up the board',
    ],
  },

  // LESSON 2: THE KING
  {
    id: 'basics-2',
    sectionId: 'basics',
    title: 'The King',
    subtitle: 'Your most important piece',
    icon: '♚',
    duration: '6 min',
    difficulty: 1,
    objectives: [
      'Understand how the king moves',
      'Know what check means',
      'Learn when you cannot move your king',
    ],
    steps: [
      {
        title: 'King Movement',
        content: `The king can move **one square in any direction**—horizontally, vertically, or diagonally.

Despite being the most important piece, the king is one of the weakest in terms of mobility. He can only move to the 8 squares immediately surrounding him.

**However:** The king becomes a powerful piece in the endgame when there are fewer attackers on the board!`,
        fen: '8/8/8/4K3/8/8/8/8 w - - 0 1',
        highlights: ['d6', 'e6', 'f6', 'd5', 'f5', 'd4', 'e4', 'f4'],
        arrows: [['e5', 'd6'], ['e5', 'e6'], ['e5', 'f6'], ['e5', 'd4'], ['e5', 'f4']],
      },
      {
        title: 'The Goal of Chess',
        content: `Chess is won by **checkmating** the enemy king—trapping it so it cannot escape capture.

You never actually capture the king. Instead, when the king is:
- **Attacked**: This is called "check"
- **Attacked with no escape**: This is "checkmate" (game over!)
- **Not attacked but no legal moves**: This is "stalemate" (draw)

The entire game revolves around king safety and threatening the enemy king.`,
        fen: '6k1/5ppp/8/8/8/8/5PPP/6K1 w - - 0 1',
      },
      {
        title: 'What is Check?',
        content: `**Check** occurs when your king is attacked by an enemy piece.

When in check, you MUST respond immediately. You have exactly three options:
1. **Move** the king to a safe square
2. **Block** the check with another piece
3. **Capture** the attacking piece

If none of these are possible, it's checkmate!`,
        fen: '4k3/8/8/8/8/8/4R3/4K3 w - - 0 1',
        arrows: [['e2', 'e8']],
        highlights: ['e8'],
      },
      {
        title: 'Escaping Check',
        content: `Here White's king is in check from the black rook. White has three ways to escape:

1. **Move**: King can go to d1, f1, d2, or f2
2. **Block**: A piece could block on e2, e3, e4, e5, e6, or e7
3. **Capture**: If White had a piece attacking the rook

In this position, the simplest solution is to move the king.`,
        fen: '4r3/8/8/8/8/8/8/4K3 w - - 0 1',
        arrows: [['e8', 'e1']],
        highlights: ['d1', 'f1', 'd2', 'f2'],
      },
      {
        title: 'Illegal King Moves',
        content: `The king has strict rules about where he **cannot** go:

1. **Cannot move into check**: You can't walk into an attack
2. **Cannot stay in check**: If checked, you must escape
3. **Cannot capture a protected piece**: This would put you in check

In this position, the white king cannot move to c3, c4, or c5 because the black rook attacks those squares.`,
        fen: '8/8/8/2r5/8/8/2K5/8 w - - 0 1',
        highlights: ['c3', 'c4', 'c5'],
        arrows: [['c5', 'c3']],
      },
      {
        title: 'King Safety',
        content: `**King safety** is one of the most important strategic concepts.

**Early/Middle game rules:**
- Castle early to hide your king
- Keep pawns in front of your castled king
- Don't advance the pawns in front of your king
- Keep pieces defending your king

**An exposed king is a losing king!** Even with extra material, a vulnerable king can lead to checkmate.`,
        fen: 'r4rk1/ppp2ppp/8/8/8/8/PPP2PPP/R4RK1 w - - 0 1',
        highlights: ['g1', 'f2', 'g2', 'h2'],
      },
    ],
    keyPoints: [
      'The king moves one square in any direction',
      'Check = king is under attack, must respond',
      'Checkmate = no way to escape check (game over)',
      'The king cannot move into check',
      'Keep your king safe—castle early!',
    ],
  },

  // LESSON 3: THE QUEEN
  {
    id: 'basics-3',
    sectionId: 'basics',
    title: 'The Queen',
    subtitle: 'The most powerful piece',
    icon: '♛',
    duration: '5 min',
    difficulty: 1,
    objectives: [
      'Master queen movement patterns',
      'Understand the queen\'s value',
      'Learn when to develop the queen',
    ],
    steps: [
      {
        title: 'Queen Movement',
        content: `The queen combines the powers of the rook AND the bishop!

She can move:
- Any number of squares **horizontally** (like a rook)
- Any number of squares **vertically** (like a rook)
- Any number of squares **diagonally** (like a bishop)

This makes her the most powerful piece on the board, controlling up to 27 squares from the center!`,
        fen: '8/8/8/3Q4/8/8/8/8 w - - 0 1',
        highlights: ['d1', 'd2', 'd3', 'd4', 'd6', 'd7', 'd8', 'a5', 'b5', 'c5', 'e5', 'f5', 'g5', 'h5', 'a8', 'b7', 'c6', 'e4', 'f3', 'g2', 'h1', 'a2', 'b3', 'c4', 'e6', 'f7', 'g8'],
      },
      {
        title: 'Queen Value',
        content: `The queen is worth approximately **9 points**—almost as much as two rooks!

**Relative piece values:**
- Pawn = 1 point
- Knight = 3 points
- Bishop = 3 points  
- Rook = 5 points
- **Queen = 9 points**
- King = Infinite (can't be captured)

Losing your queen early usually means losing the game. Protect her!`,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        highlights: ['d1', 'd8'],
      },
      {
        title: 'Queen Attacks',
        content: `The queen is devastating in attacks because she combines long-range power in all directions.

In this position, the white queen attacks SEVEN different pieces and squares simultaneously! The queen can attack the king, rook, bishop, and multiple pawns.

**Common queen attack patterns:**
- Queen + Bishop battery on diagonals
- Queen + Rook on files/ranks
- Queen raids on weak pawns`,
        fen: 'r1bqk2r/ppp2ppp/2n1pn2/3p4/2PP4/2N1PQ2/PP3PPP/R1B1KB1R w KQkq - 0 1',
        arrows: [['f3', 'f6'], ['f3', 'a8'], ['f3', 'f7'], ['f3', 'b3']],
      },
      {
        title: 'Don\'t Develop Queen Early',
        content: `**Don't bring your queen out too early!**

This is one of the most common beginner mistakes. In this position, Black's queen on h4 will be chased by White's pieces, wasting Black's time.

**Why early queen development is bad:**
1. The queen is a big target—pieces will attack her
2. Moving the queen early wastes time (tempo)
3. Minor pieces develop while chasing your queen`,
        fen: 'rnb1kbnr/pppp1ppp/8/4p3/4P2q/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1',
        arrows: [['g2', 'g3'], ['f1', 'e2']],
        highlights: ['h4'],
      },
      {
        title: 'Queen in the Endgame',
        content: `Queen vs King is a forced checkmate, but technique matters!

**The Box Method:**
1. Use your queen to create a "box" around the enemy king
2. Gradually shrink the box
3. Bring your king closer to help
4. Deliver checkmate on the edge

A queen alone cannot checkmate—you always need your king's help!`,
        fen: '8/8/8/8/3k4/8/8/4QK2 w - - 0 1',
        arrows: [['e1', 'e4'], ['f1', 'd3']],
      },
    ],
    keyPoints: [
      'Queen = Rook + Bishop combined',
      'Worth 9 points—the most valuable piece',
      'Don\'t develop the queen too early',
      'Queen needs support for checkmate',
      'Queen is great but can\'t win alone',
    ],
  },

  // LESSON 4: THE ROOK
  {
    id: 'basics-4',
    sectionId: 'basics',
    title: 'The Rook',
    subtitle: 'Master of ranks and files',
    icon: '♜',
    duration: '5 min',
    difficulty: 1,
    objectives: [
      'Understand rook movement',
      'Learn about open files',
      'Discover rook pair power',
    ],
    steps: [
      {
        title: 'Rook Movement',
        content: `The rook moves in straight lines—**horizontally or vertically**—any number of squares.

Unlike bishops, rooks can reach every square on the board! They're equally effective on light and dark squares.

Rooks are worth **5 points**, making them "major pieces" along with the queen.`,
        fen: '8/8/8/3R4/8/8/8/8 w - - 0 1',
        highlights: ['d1', 'd2', 'd3', 'd4', 'd6', 'd7', 'd8', 'a5', 'b5', 'c5', 'e5', 'f5', 'g5', 'h5'],
      },
      {
        title: 'Open Files',
        content: `An **open file** is a vertical column with no pawns. Rooks LOVE open files!

In this position, the d-file is completely open. White's rook can penetrate to d7 or d8, creating havoc in Black's position.

**Goal:** Place your rooks on open files before your opponent does!`,
        fen: 'r4rk1/ppp2ppp/8/4p3/4P3/8/PPP2PPP/3R1RK1 w - - 0 1',
        highlights: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'],
        arrows: [['d1', 'd7']],
      },
      {
        title: 'The Seventh Rank',
        content: `A rook on the **7th rank** (2nd rank for Black) is extremely powerful!

On the 7th rank, your rook:
- Attacks enemy pawns from behind
- Traps the enemy king on the back rank
- Can create mating threats
- Cuts off the enemy king

**"A rook on the 7th is worth a pawn!"** - Classic chess wisdom`,
        fen: '6k1/1R3ppp/8/8/8/8/5PPP/6K1 w - - 0 1',
        arrows: [['b7', 'g7'], ['b7', 'f7']],
        highlights: ['b7'],
      },
      {
        title: 'Connected Rooks',
        content: `Two rooks protecting each other are called **connected rooks** or "doubled rooks."

Connected rooks are incredibly powerful because:
- They defend each other
- They can double on files or ranks
- Two rooks = 10 points (more than a queen!)

**Strategy:** Connect your rooks by moving them to the same rank or file.`,
        fen: '8/8/8/8/8/8/8/R3R2K w - - 0 1',
        arrows: [['a1', 'e1']],
        highlights: ['a1', 'e1'],
      },
      {
        title: 'Rook Activation',
        content: `Rooks are often the last pieces to enter the game. Don't forget about them!

**How to activate rooks:**
1. Castle to get the king out of the way
2. Clear pawns to create open files
3. Move rooks to central or open files
4. Connect your rooks on the back rank

**Passive rooks lose games.** Always look for ways to improve their positions!`,
        fen: 'r4rk1/ppp2ppp/2n5/3pp3/3PP3/2N5/PPP2PPP/R4RK1 w - - 0 1',
        arrows: [['a1', 'd1'], ['f1', 'e1']],
      },
    ],
    keyPoints: [
      'Rooks move horizontally and vertically',
      'Worth 5 points—a major piece',
      'Place rooks on open files',
      'A rook on the 7th rank is very strong',
      'Connect your rooks for maximum power',
    ],
  },

  // LESSON 5: THE BISHOP
  {
    id: 'basics-5',
    sectionId: 'basics',
    title: 'The Bishop',
    subtitle: 'Diagonal dominance',
    icon: '♝',
    duration: '5 min',
    difficulty: 1,
    objectives: [
      'Master bishop movement',
      'Understand light vs dark squared bishops',
      'Learn the bishop pair advantage',
    ],
    steps: [
      {
        title: 'Bishop Movement',
        content: `The bishop moves **diagonally** any number of squares.

Key characteristics:
- Can only access squares of ONE color
- A light-squared bishop stays on light squares forever
- A dark-squared bishop stays on dark squares forever
- Worth approximately **3 points**

Each player starts with two bishops—one light, one dark.`,
        fen: '8/8/8/3B4/8/8/8/8 w - - 0 1',
        highlights: ['a2', 'b3', 'c4', 'e6', 'f7', 'g8', 'a8', 'b7', 'c6', 'e4', 'f3', 'g2', 'h1'],
      },
      {
        title: 'Long Diagonals',
        content: `The longest diagonals are a1-h8 and a8-h1, each with 8 squares.

A bishop on a long diagonal can be extremely powerful, especially when aimed at the enemy king. This position shows a **fianchettoed bishop** on g2, controlling the long diagonal.

**Fianchetto** (pronounced "fee-an-KET-oh") is Italian for "little flank."`,
        fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 1',
        arrows: [['b4', 'f8'], ['b4', 'e1']],
        highlights: ['b4'],
      },
      {
        title: 'Good vs Bad Bishops',
        content: `A **good bishop** is one whose path isn't blocked by its own pawns.
A **bad bishop** is trapped behind its own pawns.

In this position, White's bishop on c1 is "bad" because White's pawns on d4 and e3 block its diagonals. The bishop has no scope!

**Strategy:** Put pawns on opposite color squares to your remaining bishop!`,
        fen: '8/pp3ppp/4p3/3pP3/3P4/4P3/PP3PPP/2B5 w - - 0 1',
        highlights: ['c1', 'd4', 'e3'],
      },
      {
        title: 'The Bishop Pair',
        content: `Having BOTH bishops is called the **bishop pair**—a significant advantage!

**Why the bishop pair is powerful:**
- Together they control all 64 squares
- They work harmoniously in open positions
- Worth approximately +0.5 pawns extra
- They become stronger as pawns disappear

**Rule:** If you have the bishop pair, trade pawns, not pieces!`,
        fen: '8/8/8/4B3/8/2B5/8/8 w - - 0 1',
        highlights: ['c3', 'e5'],
        arrows: [['c3', 'h8'], ['c3', 'a1'], ['e5', 'a1'], ['e5', 'h8']],
      },
      {
        title: 'Bishop vs Knight',
        content: `Bishop vs Knight is chess's eternal debate!

**Bishop is better when:**
- Position is open with few pawns
- You need long-range attacks
- Both wings need attention simultaneously

**Knight is better when:**
- Position is closed with locked pawns
- There are outpost squares available
- All action is on one side

Generally, bishops are slightly better in open positions.`,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
        highlights: ['c4', 'f6'],
      },
    ],
    keyPoints: [
      'Bishops move diagonally only',
      'Each bishop is forever on one color',
      'Good bishop = not blocked by pawns',
      'The bishop pair is a powerful advantage',
      'Bishops prefer open positions',
    ],
  },

  // LESSON 6: THE KNIGHT
  {
    id: 'basics-6',
    sectionId: 'basics',
    title: 'The Knight',
    subtitle: 'The tricky piece',
    icon: '♞',
    duration: '6 min',
    difficulty: 1,
    objectives: [
      'Master the L-shaped movement',
      'Understand knight outposts',
      'Learn knight vs bishop differences',
    ],
    steps: [
      {
        title: 'Knight Movement',
        content: `The knight moves in an **L-shape**: two squares in one direction, then one square perpendicular.

**Unique abilities:**
- The knight is the ONLY piece that can jump over other pieces
- It always lands on the opposite color square
- It controls up to 8 squares from the center
- Worth approximately **3 points**

Knights are tricky—even experienced players miscalculate their moves!`,
        fen: '8/8/8/4N3/8/8/8/8 w - - 0 1',
        highlights: ['d7', 'f7', 'g6', 'g4', 'f3', 'd3', 'c4', 'c6'],
      },
      {
        title: 'Knights on the Rim',
        content: `**"A knight on the rim is dim!"** - Famous chess saying

A knight in the corner controls only 2 squares.
A knight on the edge controls only 3-4 squares.
A knight in the center controls 8 squares!

**Lesson:** Keep knights centralized! e4, d4, e5, d5 are ideal squares.`,
        fen: 'N7/8/8/8/3N4/8/8/8 w - - 0 1',
        highlights: ['b3', 'c2'],
        arrows: [['a8', 'b6'], ['a8', 'c7'], ['d4', 'b3'], ['d4', 'c2'], ['d4', 'e2'], ['d4', 'f3'], ['d4', 'f5'], ['d4', 'e6'], ['d4', 'c6'], ['d4', 'b5']],
      },
      {
        title: 'Knight Outposts',
        content: `An **outpost** is a square where your knight cannot be attacked by enemy pawns.

In this position, the knight on e5 is a perfect outpost:
- Protected by the d4 pawn
- Cannot be attacked by Black's pawns
- Deep in enemy territory
- Controls important squares

An outpost knight can be worth more than a bishop!`,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/3P4/8/PPP1PPPP/RNBQKB1R w KQkq - 0 1',
        highlights: ['e5'],
        arrows: [['d4', 'e5']],
      },
      {
        title: 'Knight Forks',
        content: `Because the knight moves uniquely, it's the best piece for **forks**—attacking two pieces at once!

In this position, the knight on c7 attacks BOTH the king and the rook! This is called a "royal fork" and wins the rook.

**Common fork targets:**
- King + Queen (devastating!)
- King + Rook
- Queen + Rook`,
        fen: 'r3k3/2N5/8/8/8/8/8/4K3 w - - 0 1',
        arrows: [['c7', 'e8'], ['c7', 'a8']],
        highlights: ['c7', 'e8', 'a8'],
      },
      {
        title: 'Knights in Closed Positions',
        content: `When the position is **closed** (many locked pawns), knights shine!

**Why knights excel in closed positions:**
- They can jump over pawn chains
- Bishops get blocked by pawns
- They can find outposts behind enemy pawns
- Short-range maneuvering is valuable

In this blocked position, the knight is clearly superior to the bishop.`,
        fen: 'r1bqk2r/pp1nbppp/2p1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQK2R w KQkq - 0 1',
        highlights: ['d3', 'f3', 'f6', 'd7'],
      },
    ],
    keyPoints: [
      'Knights move in an L-shape (2+1)',
      'Knights can jump over other pieces',
      'Knights on the rim are weak',
      'Knights excel at forking',
      'Knights prefer closed positions',
    ],
  },

  // LESSON 7: THE PAWN
  {
    id: 'basics-7',
    sectionId: 'basics',
    title: 'The Pawn',
    subtitle: 'Soul of chess',
    icon: '♙',
    duration: '7 min',
    difficulty: 1,
    objectives: [
      'Master pawn movement rules',
      'Understand en passant',
      'Learn pawn promotion',
    ],
    steps: [
      {
        title: 'Pawn Movement',
        content: `Pawns are unique—they move forward but capture diagonally!

**Movement rules:**
- Move one square forward (if unblocked)
- On first move, can choose to move two squares
- Can NEVER move backward
- Cannot capture pieces directly in front

Pawns are worth only **1 point** but they're essential for controlling space.`,
        fen: '8/8/8/8/8/8/4P3/8 w - - 0 1',
        highlights: ['e3', 'e4'],
        arrows: [['e2', 'e3'], ['e2', 'e4']],
      },
      {
        title: 'Pawn Captures',
        content: `Pawns capture **diagonally forward**, not straight ahead.

In this position, the white pawn on d4 can capture the black knight on e5 or the black bishop on c5. It cannot move forward because there's a pawn blocking on d5.

The diagonal capture is why pawns control different squares than they can move to!`,
        fen: '8/8/8/2bPn3/3P4/8/8/8 w - - 0 1',
        arrows: [['d4', 'e5'], ['d4', 'c5']],
        highlights: ['c5', 'e5'],
      },
      {
        title: 'En Passant',
        content: `**En passant** ("in passing") is chess's special capture rule.

**How it works:**
1. Your pawn is on the 5th rank (4th for Black)
2. Enemy pawn moves TWO squares, landing beside you
3. You can capture it as if it had moved only one square
4. You MUST capture immediately or lose the right

This rule prevents pawns from "sneaking by" using the two-square move!`,
        fen: '8/8/8/3Pp3/8/8/8/8 w - e6 0 1',
        arrows: [['d5', 'e6']],
        highlights: ['e5', 'e6'],
      },
      {
        title: 'Pawn Promotion',
        content: `When a pawn reaches the opposite end of the board, it **promotes** to any piece!

**Promotion rules:**
- You MUST promote (can't stay a pawn)
- Usually promote to Queen (most powerful)
- Sometimes promote to Knight (for checkmate)
- Rarely promote to Rook/Bishop (to avoid stalemate)

In this position, the pawn will promote to a queen next move!`,
        fen: '8/3P4/8/8/8/8/8/4K2k w - - 0 1',
        arrows: [['d7', 'd8']],
        highlights: ['d7', 'd8'],
      },
      {
        title: 'Passed Pawns',
        content: `A **passed pawn** has no enemy pawns blocking or attacking its path to promotion.

**Passed pawns are powerful because:**
- They threaten to become queens
- They tie down enemy pieces
- Two connected passed pawns can win games

In this position, White's d-pawn is passed and very dangerous!`,
        fen: '8/8/3P4/8/8/5p2/8/4K2k w - - 0 1',
        highlights: ['d6', 'd7', 'd8'],
        arrows: [['d6', 'd8']],
      },
      {
        title: 'Pawn Structure',
        content: `**"Pawns are the soul of chess."** - François-André Philidor

Pawn structure determines the character of the game. Common structures include:

- **Doubled pawns**: Two pawns on the same file (usually weak)
- **Isolated pawn**: No friendly pawns on adjacent files
- **Pawn chain**: Diagonal line of pawns supporting each other
- **Passed pawn**: No enemy pawns can stop it

Understanding pawn structure is key to strategic chess!`,
        fen: 'rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 1',
        highlights: ['d4', 'd5', 'e5', 'e6'],
      },
    ],
    keyPoints: [
      'Pawns move forward, capture diagonally',
      'First move can be one or two squares',
      'En passant: capture "in passing"',
      'Promotion: pawn becomes any piece',
      'Passed pawns are very valuable',
    ],
  },

  // LESSON 8: CASTLING
  {
    id: 'basics-8',
    sectionId: 'basics',
    title: 'Castling',
    subtitle: 'Protect your king',
    icon: '🏰',
    duration: '5 min',
    difficulty: 1,
    objectives: [
      'Learn kingside and queenside castling',
      'Know all castling requirements',
      'Understand when to castle',
    ],
    steps: [
      {
        title: 'What is Castling?',
        content: `Castling is a special move involving the king AND a rook simultaneously.

**The move:**
- The king moves TWO squares toward the rook
- The rook jumps over to the other side of the king
- It's the only move where two pieces move at once!

**Notation:** 
- O-O = Kingside castling (short castle)
- O-O-O = Queenside castling (long castle)`,
        fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1',
        arrows: [['e1', 'g1'], ['h1', 'f1']],
      },
      {
        title: 'Kingside Castling',
        content: `**Kingside castling (O-O)** moves the king to g1/g8 and the rook to f1/f8.

This is the most common form of castling because:
- Requires only 2 pieces to move (knight and bishop)
- King ends up behind more pawns
- Faster to complete in development

After castling kingside, your king is usually safe behind the f, g, and h pawns.`,
        fen: '5rk1/ppppp1pp/8/8/8/8/PPPPP1PP/5RK1 w - - 0 1',
        highlights: ['g1', 'f1', 'g8', 'f8'],
      },
      {
        title: 'Queenside Castling',
        content: `**Queenside castling (O-O-O)** moves the king to c1/c8 and the rook to d1/d8.

Queenside castling:
- Requires 3 pieces to move (queen, bishop, knight)
- Places the rook on an often-open file (d-file)
- King is slightly less protected (a-pawn is farther)
- Can lead to opposite-side castling attacks!`,
        fen: '2kr4/pppppppp/8/8/8/8/PPPPPPPP/2KR4 w - - 0 1',
        highlights: ['c1', 'd1', 'c8', 'd8'],
      },
      {
        title: 'Castling Requirements',
        content: `You can only castle if ALL these conditions are met:

1. King has never moved
2. Rook (that side) has never moved  
3. No pieces between king and rook
4. King is NOT currently in check
5. King does NOT pass through check
6. King does NOT land in check

**Note:** The ROOK can pass through an attacked square—just not the king!`,
        fen: 'r3k2r/pppp1ppp/4p3/8/1b6/4PN2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
        highlights: ['e1', 'f1', 'g1'],
      },
      {
        title: 'When to Castle',
        content: `**Castle early!** This is one of chess's golden rules.

**Why castle early?**
- Gets your king to safety before attacks begin
- Activates your rook (brings it toward center)
- Completes your development
- Prepares for middlegame action

**When to delay castling:**
- If castled side is under immediate attack
- To keep opponent guessing which side
- In some sharp opening lines (rare)`,
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
        arrows: [['e1', 'g1']],
      },
    ],
    keyPoints: [
      'Castling moves king 2 squares + rook jumps over',
      'Kingside (O-O) is most common',
      'King cannot move through or into check',
      'Both king and rook must not have moved',
      'Castle early for king safety!',
    ],
  },

  // LESSON 9: CHECK & CHECKMATE
  {
    id: 'basics-9',
    sectionId: 'basics',
    title: 'Check & Checkmate',
    subtitle: 'The goal of chess',
    icon: '👑',
    duration: '6 min',
    difficulty: 1,
    objectives: [
      'Understand check, checkmate, and stalemate',
      'Know how to get out of check',
      'Recognize basic checkmate patterns',
    ],
    steps: [
      {
        title: 'Check',
        content: `**Check** occurs when a piece attacks the enemy king.

In this position, the white queen checks the black king. Black MUST respond to the check.

**Three ways to escape check:**
1. **Move** the king to a safe square
2. **Block** the check with another piece
3. **Capture** the attacking piece`,
        fen: 'rnbqkbnr/ppppp2p/5p2/6pQ/4P3/8/PPPP1PPP/RNB1KBNR b KQkq - 0 1',
        arrows: [['h5', 'e8']],
        highlights: ['e8'],
      },
      {
        title: 'Checkmate',
        content: `**Checkmate** = Check with no escape. The game is over!

This is the "Fool's Mate" - the fastest possible checkmate (just 2 moves). The queen delivers checkmate because:
- The king cannot move (h5 and f3 attacked)
- Nothing can block
- Nothing can capture the queen

**Goal of chess:** Deliver checkmate!`,
        fen: 'rnb1kbnr/pppp1ppp/4p3/8/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 0 1',
        highlights: ['h4', 'e1'],
        arrows: [['h4', 'e1']],
      },
      {
        title: 'Stalemate',
        content: `**Stalemate** = No legal moves, but NOT in check. It's a DRAW!

In this position, Black's king is not in check, but has no legal moves! This is stalemate - the game is drawn.

**Warning:** Don't accidentally stalemate when you're winning! Many games are thrown away this way.`,
        fen: '7k/5Q2/6K1/8/8/8/8/8 b - - 0 1',
        highlights: ['h8', 'g8', 'h7'],
      },
      {
        title: 'Back Rank Mate',
        content: `The **back rank mate** is one of the most common checkmate patterns.

The king is trapped on the back rank by its own pawns, and a rook or queen delivers checkmate. Always watch for this pattern!

**Prevention:** Create "luft" (breathing room) by moving a pawn like h3.`,
        fen: '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1',
        arrows: [['e1', 'e8']],
        highlights: ['g8', 'f7', 'g7', 'h7'],
      },
      {
        title: 'Smothered Mate',
        content: `The **smothered mate** is a beautiful pattern where a knight checkmates a king trapped by its own pieces.

In this position, the knight on f7 delivers checkmate! The king cannot escape because its own pieces (rook on g8, pawns on g7/h7) block all escape squares.

This is one of chess's most elegant patterns.`,
        fen: '5Nk1/5ppp/8/8/8/8/8/4K3 w - - 0 1',
        arrows: [['f8', 'g8'], ['f8', 'h7']],
        highlights: ['g8', 'f8'],
      },
    ],
    keyPoints: [
      'Check = king is under attack',
      'Checkmate = check with no escape (you win!)',
      'Stalemate = no moves but not in check (draw)',
      'Three ways to escape check: move, block, capture',
      'Learn checkmate patterns to win more games',
    ],
  },

  // LESSON 10: BASIC CHECKMATES
  {
    id: 'basics-10',
    sectionId: 'basics',
    title: 'Basic Checkmates',
    subtitle: 'Winning the endgame',
    icon: '🏆',
    duration: '10 min',
    difficulty: 2,
    objectives: [
      'Master King + Queen vs King',
      'Learn King + Rook vs King',
      'Understand the box method',
    ],
    steps: [
      {
        title: 'Why Learn Basic Mates?',
        content: `Knowing basic checkmates is ESSENTIAL. If you can't checkmate with extra material, you can't win!

**Must-know endgames:**
1. King + Queen vs King
2. King + Rook vs King
3. King + 2 Bishops vs King
4. King + Bishop + Knight vs King (hardest)

Today we'll master the first two—they happen constantly!`,
        fen: '8/8/8/4k3/8/8/8/4QK2 w - - 0 1',
      },
      {
        title: 'Queen + King: The Box Method',
        content: `**Step 1:** Create a "box" that traps the enemy king.

Use your queen to limit the king's movement, pushing it toward the edge. In this position, the queen on d5 creates a box - the black king cannot escape past the 5th rank or d-file.

**Key principle:** Don't let the king escape toward the center!`,
        fen: '8/8/8/3Qk3/8/8/8/4K3 w - - 0 1',
        highlights: ['d5', 'd6', 'd7', 'd8', 'e5', 'f5', 'g5', 'h5'],
      },
      {
        title: 'Queen + King: Shrink the Box',
        content: `**Step 2:** Gradually shrink the box while bringing your king closer.

Now the queen moves to e6, making the box smaller. The black king is pushed to the edge. Keep restricting the king's movement while your king approaches.

**Never give stalemate!** Always leave the enemy king at least one square.`,
        fen: '4k3/8/4Q3/8/8/8/8/4K3 w - - 0 1',
        arrows: [['e1', 'e2'], ['e6', 'e7']],
      },
      {
        title: 'Queen + King: Deliver Checkmate',
        content: `**Step 3:** With the king on the edge, deliver checkmate.

This is the classic queen + king checkmate position. The queen covers all escape squares while the king supports from a distance.

**Pattern to memorize:** Enemy king on edge, your king nearby, queen delivers mate.`,
        fen: '4k3/4Q3/4K3/8/8/8/8/8 w - - 0 1',
        arrows: [['e7', 'e8']],
        highlights: ['e8', 'd8', 'f8', 'd7', 'f7'],
      },
      {
        title: 'Rook + King: Cut Off',
        content: `King + Rook vs King is slower but follows similar principles.

**Step 1:** Use the rook to cut off the king.

In this position, the rook on e4 creates a wall - the enemy king cannot cross to the other side of the board. Think of the rook as creating a barrier.`,
        fen: '3k4/8/8/8/4R3/8/8/4K3 w - - 0 1',
        highlights: ['e4', 'e5', 'e6', 'e7', 'e8'],
      },
      {
        title: 'Rook + King: Opposition',
        content: `**Step 2:** Use your king to take opposition.

"Opposition" means the two kings face each other with one square between them. Whoever moves first must retreat! 

Here, White plays Ke6, gaining opposition. If Black moves, he must retreat to the edge.`,
        fen: '8/3k4/8/8/4R3/3K4/8/8 w - - 0 1',
        arrows: [['d3', 'd4'], ['d4', 'd5'], ['d5', 'd6']],
      },
      {
        title: 'Rook + King: Checkmate',
        content: `**Step 3:** Force the king to the edge and deliver checkmate.

This is the classic rook + king checkmate. The rook delivers mate on the 8th rank while the king controls the escape squares.

**Key technique:** Don't rush! Improve your position systematically.`,
        fen: '3Rk3/8/4K3/8/8/8/8/8 w - - 0 1',
        arrows: [['d8', 'e8']],
        highlights: ['e8', 'd7', 'f7'],
      },
      {
        title: 'Practice Makes Perfect',
        content: `These basic checkmates should become automatic—you should execute them without thinking!

**Practice tips:**
1. Set up K+Q vs K positions and practice
2. Then practice K+R vs K (trickier!)
3. Aim for checkmate in minimal moves
4. If you stalemate, review what went wrong

**These positions appear constantly.** Master them!`,
        fen: '8/8/8/8/3k4/8/8/4RK2 w - - 0 1',
      },
    ],
    keyPoints: [
      'Queen + King: Use the box method',
      'Rook + King: Cut off the king, then push',
      'Always bring your king to help',
      'Watch out for stalemate!',
      'Practice until automatic',
    ],
  },
];

// ============================================
// SECTION 2: TACTICS I - 10 COMPLETE LESSONS
// ============================================
const tactics1Lessons: Lesson[] = [
  {
    id: 'tactics1-1',
    sectionId: 'tactics1',
    title: 'What is a Tactic?',
    subtitle: 'Forcing moves explained',
    icon: '⚔️',
    duration: '5 min',
    difficulty: 1,
    objectives: ['Understand tactics vs strategy', 'Learn what makes moves forcing', 'Recognize tactical opportunities'],
    steps: [
      {
        title: 'Tactics vs Strategy',
        content: `**Tactics** are short-term, concrete sequences involving threats, checks, or captures.

**Strategy** is long-term planning—piece placement, pawn structure, coordination.

**Key difference:** 
- Tactics = "I attack your queen, you must respond"
- Strategy = "I'll control the open file over many moves"

Most amateur games are decided by tactics, not strategy!`,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
        arrows: [['h5', 'f7']],
      },
      {
        title: 'Forcing Moves',
        content: `**Forcing moves** limit your opponent's options. They MUST respond in a specific way.

**Types of forcing moves:**
1. **Checks** - King must escape
2. **Captures** - Often must recapture
3. **Threats** - Must defend or lose material

Always look for forcing moves first! They're easier to calculate.`,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
        arrows: [['f3', 'g5'], ['c4', 'f7']],
      },
      {
        title: 'Checks First',
        content: `**"Checks, captures, threats"** - Calculate in this order!

Checks are the most forcing because the opponent MUST respond. In this position, Qxf7+ is check AND captures material.

Always ask: "Do I have any checks?" before anything else.`,
        fen: 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 1',
        highlights: ['f7'],
        arrows: [['f7', 'e8'], ['f7', 'f8']],
      },
      {
        title: 'Pattern Recognition',
        content: `Chess masters don't calculate everything—they recognize patterns instantly.

**Building pattern recognition:**
1. Study classic tactical motifs (forks, pins, skewers)
2. Solve puzzles daily
3. Review your tactical errors
4. Play regularly and analyze

The patterns we'll learn are the building blocks of ALL chess tactics.`,
        fen: 'r2qkb1r/ppp2ppp/2n1bn2/3pp3/4P3/2N2N2/PPPPBPPP/R1BQK2R w KQkq - 0 1',
      },
    ],
    keyPoints: ['Tactics are concrete forcing sequences', 'Calculate checks, captures, threats in order', 'Pattern recognition beats calculation', 'Most amateur games are won/lost on tactics'],
  },
  {
    id: 'tactics1-2',
    sectionId: 'tactics1',
    title: 'The Fork',
    subtitle: 'Attack two pieces at once',
    icon: '🍴',
    duration: '8 min',
    difficulty: 2,
    objectives: ['Master fork patterns', 'Identify fork opportunities', 'Execute knight forks'],
    steps: [
      {
        title: 'What is a Fork?',
        content: `A **fork** is an attack on two or more pieces simultaneously with a single piece.

The attacker wins material because the defender can only save one piece!

**Any piece can fork**, but knights are the best at it because of their unique jumping ability.`,
        fen: '4k3/8/8/3N4/8/8/8/4K3 w - - 0 1',
        arrows: [['d5', 'e7'], ['d5', 'c7'], ['d5', 'b6'], ['d5', 'f6']],
      },
      {
        title: 'Knight Forks',
        content: `Knights are the forking champions! Their L-shaped move means pieces can't simply retreat to escape.

In this position, if White plays Nc7+, the knight attacks BOTH the king and the rook! This is called a **royal fork**.

After the king moves, White captures the rook for free.`,
        fen: 'r3k3/8/8/2N5/8/8/8/4K3 w - - 0 1',
        arrows: [['c5', 'c7']],
        highlights: ['c7'],
      },
      {
        title: 'The Royal Fork',
        content: `The **royal fork** attacks the king and queen simultaneously—the most devastating fork!

Here Nd6+ is check, attacking both king and queen. Black must move the king, and White wins the queen!

**Always check for knight forks.** Look for squares where your knight attacks multiple valuable pieces.`,
        fen: 'r1b1k3/1pppqppp/8/8/3N4/8/PPPPPPPP/R1BQKB1R w KQq - 0 1',
        arrows: [['d4', 'd6']],
        highlights: ['d6', 'e8', 'e7'],
      },
      {
        title: 'Pawn Forks',
        content: `Pawns can fork too! A pawn fork is especially powerful because:
- Pawns are worth only 1 point
- They attack pieces worth 3+ points
- Pieces can't safely capture the pawn (usually)

In this position, e5! forks the bishop and knight, winning material.`,
        fen: 'r1bqkbnr/pppp1ppp/8/4n3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 1',
        arrows: [['e4', 'e5']],
        highlights: ['e5', 'c4'],
      },
      {
        title: 'Queen Forks',
        content: `The queen is excellent at forking because she controls so many squares.

In this position, Qa4+ is check AND attacks the loose bishop on b4. Black must deal with the check, losing the bishop.

**Tip:** Look for queen forks that include check—they're the most forcing!`,
        fen: 'rnbqk2r/pppp1ppp/5n2/4p3/1b2P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1',
        arrows: [['d1', 'a4']],
        highlights: ['a4', 'e8', 'b4'],
      },
      {
        title: 'Setting Up Forks',
        content: `Sometimes you need to set up a fork with a preparatory move.

In this position, the knight can't fork immediately. But after Bxf7+ Kxf7, the knight can play Ne5+ forking king and queen!

**Think ahead:** "If I make this exchange, can I then fork?"`,
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
        arrows: [['c4', 'f7'], ['f3', 'e5']],
      },
    ],
    keyPoints: ['Forks attack two+ pieces at once', 'Knights are the best forking pieces', 'Royal fork = king + queen', 'Pawns can fork effectively too', 'Look for forks with check'],
  },
  {
    id: 'tactics1-3',
    sectionId: 'tactics1',
    title: 'The Pin',
    subtitle: 'Immobilize enemy pieces',
    icon: '📍',
    duration: '8 min',
    difficulty: 2,
    objectives: ['Understand absolute vs relative pins', 'Exploit pinned pieces', 'Create pins'],
    steps: [
      {
        title: 'What is a Pin?',
        content: `A **pin** occurs when a piece cannot move (or should not move) because a more valuable piece is behind it.

The pinned piece is stuck! It can't leave because the piece behind would be captured.

**Pins are created by:** Bishops, Rooks, and Queens (long-range pieces).`,
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1',
        arrows: [['c4', 'f7']],
      },
      {
        title: 'Absolute Pin',
        content: `An **absolute pin** pins a piece to the king. The pinned piece CANNOT legally move!

In this position, the knight on f6 is absolutely pinned by the bishop on g5. The knight cannot move because the king would be in check.

Absolute pins are the most powerful because the piece literally cannot move.`,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p1B1/4P3/5N2/PPPP1PPP/RN1QKB1R b KQkq - 0 1',
        arrows: [['g5', 'd8']],
        highlights: ['f6', 'g5'],
      },
      {
        title: 'Relative Pin',
        content: `A **relative pin** pins a piece to something other than the king. The piece CAN move, but should it?

Here the knight on c6 is pinned to the queen on d8. The knight can legally move, but doing so loses the queen!

**Relative pins:** The piece can move, but usually shouldn't.`,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1',
        arrows: [['b5', 'd8']],
        highlights: ['c6', 'b5', 'd8'],
      },
      {
        title: 'Exploiting Pins',
        content: `The key to exploiting pins is to **pile up on the pinned piece**!

In this position, White can play g4! attacking the pinned knight with a pawn. The knight cannot escape because it's pinned to the queen.

**Strategy:** Attack pinned pieces with less valuable pieces, especially pawns.`,
        fen: 'r1bq1rk1/pppp1ppp/2n2n2/1B2p1B1/4P3/5N2/PPPP1PPP/RN1QK2R w KQ - 0 1',
        arrows: [['g2', 'g4']],
        highlights: ['f6'],
      },
      {
        title: 'The Pin and Win',
        content: `Sometimes pins lead to immediate material gain.

Here, Bb5! pins the knight to the king. If the knight moves, the king is in check. If it doesn't move, White plays Bxc6, winning the knight!

**"Pin and win"** is a common tactical theme.`,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
        arrows: [['c4', 'b5']],
        highlights: ['c6'],
      },
    ],
    keyPoints: ['Pins immobilize pieces', 'Absolute pin = to the king (illegal to move)', 'Relative pin = to a valuable piece', 'Attack pinned pieces with pawns', 'Pin and win is a key pattern'],
  },
  {
    id: 'tactics1-4',
    sectionId: 'tactics1',
    title: 'The Skewer',
    subtitle: 'Attack through a piece',
    icon: '🎯',
    duration: '6 min',
    difficulty: 2,
    objectives: ['Understand skewers', 'Differentiate from pins', 'Execute skewer tactics'],
    steps: [
      {
        title: 'What is a Skewer?',
        content: `A **skewer** is like a reverse pin. A valuable piece is attacked, and when it moves, a piece behind it is captured.

**Pin:** Less valuable piece in front
**Skewer:** More valuable piece in front

In this position, Rb8+ is a skewer. The king must move, and White captures the queen!`,
        fen: '1k6/1q6/8/8/8/8/8/1R4K1 w - - 0 1',
        arrows: [['b1', 'b8']],
        highlights: ['b8', 'b7'],
      },
      {
        title: 'King and Queen Skewer',
        content: `The most common skewer targets king + queen.

Here, after Bb5+ the king must move, and the bishop captures the queen on d7.

**Always look for skewers** when the opponent's king and queen are on the same line!`,
        fen: 'r3kq1r/pppbpppp/2n5/1B6/8/8/PPPP1PPP/RNBQK2R w KQkq - 0 1',
        arrows: [['b5', 'e8']],
        highlights: ['e8', 'd7'],
      },
      {
        title: 'Rook Skewers',
        content: `Rooks are excellent at skewering pieces on files and ranks.

In this position, Re1+ skewers the king and the bishop on e7. The king moves, and White wins the bishop.

**Look for open lines** between the enemy king and other pieces.`,
        fen: '4k3/4b3/8/8/8/8/8/4RK2 w - - 0 1',
        arrows: [['e1', 'e8']],
        highlights: ['e8', 'e7'],
      },
      {
        title: 'Setting Up Skewers',
        content: `Sometimes you need to set up a skewer with a preparatory move.

Here, Qxg4+! forces Kxg4, and then Bxd1 wins the queen through the skewer line.

**Think creatively:** Sacrifices often set up devastating skewers.`,
        fen: 'r1b2rk1/ppppqppp/2n5/8/6Q1/2N5/PPPP1PPP/R1B2RK1 w - - 0 1',
        arrows: [['g4', 'g8']],
      },
    ],
    keyPoints: ['Skewer = reverse pin', 'More valuable piece in front', 'Most common: King + Queen skewer', 'Look for pieces on same line', 'Rooks skewer on ranks and files'],
  },
  {
    id: 'tactics1-5',
    sectionId: 'tactics1',
    title: 'Discovered Attack',
    subtitle: 'Unleash hidden threats',
    icon: '💥',
    duration: '8 min',
    difficulty: 2,
    objectives: ['Understand discovered attacks', 'Learn discovered checks', 'Recognize double attacks'],
    steps: [
      {
        title: 'What is a Discovered Attack?',
        content: `A **discovered attack** occurs when one piece moves, revealing an attack from a piece behind it.

The moving piece can attack something, while the revealed piece attacks something else—two threats at once!

This is one of the most powerful tactical weapons.`,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
      },
      {
        title: 'Discovered Attack Example',
        content: `In this position, if White moves the knight, the bishop on c4 will attack the queen on d8!

Any knight move creates a discovered attack on the queen. The best is Nxe5, which also captures a pawn.

**Two threats are better than one!**`,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1',
        arrows: [['f3', 'e5'], ['c4', 'd5']],
      },
      {
        title: 'Discovered Check',
        content: `A **discovered check** is even more powerful—the revealed attack is a check!

Here, moving the bishop with Bxf7+ reveals check from the queen, but also captures a pawn with the bishop. The king must deal with the check, and White keeps the extra pawn.

Discovered check = king must respond, other piece wins material.`,
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2BPP3/5N2/PPP2PPP/RNBQK2R w KQkq - 0 1',
        arrows: [['c4', 'f7'], ['d1', 'b3']],
      },
      {
        title: 'Double Check',
        content: `**Double check** is the deadliest—BOTH pieces give check!

The only way to escape double check is to move the king. You can't block or capture two attackers at once!

Double check often leads to checkmate because the king's options are so limited.`,
        fen: 'r1bqk2r/pppp1Bpp/2n2n2/2b1N3/4P3/8/PPP2PPP/RNBQK2R b KQkq - 0 1',
        arrows: [['f7', 'e8'], ['e5', 'g6']],
        highlights: ['e8'],
      },
      {
        title: 'Setting Up Discoveries',
        content: `Position your pieces to create discovery potential.

In this position, if the knight moves, the bishop will attack the queen. But where should the knight go?

Nf6+! is perfect—it's check AND discovers an attack on the queen. Black loses the queen!`,
        fen: 'r1bqk2r/ppppbppp/2n5/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 1',
        arrows: [['e5', 'f6'], ['c4', 'd5']],
      },
    ],
    keyPoints: ['Discovered attack reveals hidden threats', 'Moving piece + revealed piece = two threats', 'Discovered check is very powerful', 'Double check forces king to move', 'Position pieces to create discoveries'],
  },
  {
    id: 'tactics1-6',
    sectionId: 'tactics1',
    title: 'Double Attack',
    subtitle: 'Two threats at once',
    icon: '⚡',
    duration: '6 min',
    difficulty: 2,
    objectives: ['Recognize double attacks', 'Execute double attack tactics', 'Understand threat priority'],
    steps: [
      {
        title: 'What is a Double Attack?',
        content: `A **double attack** is any move that creates two threats simultaneously.

Forks, discoveries, and other tactics are all types of double attacks. The opponent can only stop one threat!

**Key insight:** One move, two problems for your opponent.`,
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
      },
      {
        title: 'Queen Double Attacks',
        content: `The queen excels at double attacks because she controls so many squares.

Here, Qa4+ attacks the king AND the rook on a8. Black must save the king, and White wins the rook!

**The queen's range makes her perfect for double attacks.**`,
        fen: 'r3kb1r/ppp2ppp/2n1bn2/3qp3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 1',
        arrows: [['d1', 'a4']],
        highlights: ['a4', 'e8', 'a8'],
      },
      {
        title: 'Rook Double Attacks',
        content: `Rooks can create double attacks along ranks and files.

In this position, Re1+ is check and attacks the loose bishop on e7. After the king moves, White takes the bishop.

**Look for rook moves that check AND attack a piece.**`,
        fen: '4k3/4b3/8/8/8/8/8/R3K3 w - - 0 1',
        arrows: [['a1', 'e1']],
        highlights: ['e1', 'e8', 'e7'],
      },
      {
        title: 'Minor Piece Double Attacks',
        content: `Bishops and knights can also create double attacks.

Here, Bg5 attacks the queen AND threatens Bxf6, damaging Black's pawn structure. Black can only deal with one problem!

**Think about what secondary threats your moves create.**`,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1',
        arrows: [['c1', 'g5']],
        highlights: ['d8', 'f6'],
      },
    ],
    keyPoints: ['Double attack = one move, two threats', 'Queens are double attack masters', 'Check + attack is very forcing', 'Opponent can only stop one threat', 'Always look for secondary threats'],
  },
  {
    id: 'tactics1-7',
    sectionId: 'tactics1',
    title: 'Removing the Defender',
    subtitle: 'Eliminate protection',
    icon: '🗡️',
    duration: '7 min',
    difficulty: 2,
    objectives: ['Identify key defenders', 'Execute removal tactics', 'Understand piece relationships'],
    steps: [
      {
        title: 'The Concept',
        content: `**Removing the defender** means capturing or distracting the piece that protects a target.

Once the defender is gone, the target becomes vulnerable!

**Steps:**
1. Identify what you want to attack
2. Find what's protecting it
3. Remove that defender`,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
      },
      {
        title: 'Capture the Defender',
        content: `The most direct method—simply capture the defending piece!

In this position, the knight on f6 protects the queen on d8. Bxf6! removes the defender, and Qxd8 follows.

**Ask yourself:** "What is protecting the piece I want to take?"`,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p1B1/4P3/5N2/PPPP1PPP/RN1QKB1R w KQkq - 0 1',
        arrows: [['g5', 'f6'], ['d1', 'd8']],
        highlights: ['f6', 'd8'],
      },
      {
        title: 'Distract the Defender',
        content: `Sometimes you can't capture the defender, but you can distract it!

Here, the rook on f8 protects the back rank. Rxf8+! forces Rxf8, and now White's other rook can invade with Re8#!

**Deflection** is a key removal tactic.`,
        fen: '5rk1/pp3ppp/8/8/8/8/PP3PPP/3RRK2 w - - 0 1',
        arrows: [['d1', 'd8'], ['e1', 'e8']],
      },
      {
        title: 'Overloaded Defender',
        content: `An **overloaded piece** has too many jobs. It can't defend everything!

In this position, the queen protects both the rook on a8 AND the knight on f6. Bxf6! exploits this—if Qxf6, Qxa8+ wins the rook.

**Look for pieces defending multiple things.**`,
        fen: 'r4rk1/1ppqbppp/2n2n2/p2pp1B1/4P3/2NP1N2/PPP1QPPP/R4RK1 w - - 0 1',
        arrows: [['g5', 'f6']],
        highlights: ['d7', 'f6', 'a8'],
      },
    ],
    keyPoints: ['Remove what protects your target', 'Capture, distract, or overload defenders', 'Ask: what is protecting this piece?', 'Overloaded pieces can\'t do everything', 'Deflection removes defenders too'],
  },
  {
    id: 'tactics1-8',
    sectionId: 'tactics1',
    title: 'Trapped Pieces',
    subtitle: 'Nowhere to run',
    icon: '🪤',
    duration: '6 min',
    difficulty: 2,
    objectives: ['Recognize trapped pieces', 'Create piece traps', 'Avoid getting trapped'],
    steps: [
      {
        title: 'What is a Trapped Piece?',
        content: `A **trapped piece** has no safe squares to escape to and can be captured.

Trapping pieces is one of the most satisfying tactics—the opponent watches helplessly as their piece is lost!

**Common victims:** Bishops on the rim, knights in the corner, adventurous queens.`,
        fen: '8/8/8/1p6/8/8/8/B7 w - - 0 1',
        highlights: ['a1', 'b5'],
      },
      {
        title: 'The Classic Bishop Trap',
        content: `In the opening, bishops can easily become trapped.

Here, Black's bishop on g4 has wandered too far. After h3, the bishop has no retreat! If Bh5, then g4 traps it.

**Lesson:** Don't send your bishops to enemy territory without an escape plan!`,
        fen: 'rn1qkbnr/ppp1pppp/8/3p4/4P1b1/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1',
        arrows: [['h2', 'h3'], ['g2', 'g4']],
        highlights: ['g4'],
      },
      {
        title: 'Knight Trap',
        content: `Knights in the corner or on the rim are especially vulnerable.

In this position, the knight on a4 is running out of squares. After b3!, the knight is trapped and will be captured.

**"A knight on the rim is dim"** applies to trapping too!`,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/n1B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
        arrows: [['b2', 'b3']],
        highlights: ['a4'],
      },
      {
        title: 'The Noah\'s Ark Trap',
        content: `The famous "Noah's Ark Trap" from the Ruy Lopez traps the bishop.

After a6, b5, and c4, White's bishop on b3 is completely trapped! It has nowhere to go.

This trap has caught countless players, even strong ones!`,
        fen: 'r1bqkbnr/1pp2ppp/p1p5/4p3/1B2P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1',
        arrows: [['c6', 'c5'], ['a6', 'b5']],
        highlights: ['b4'],
      },
    ],
    keyPoints: ['Trapped pieces have no escape', 'Bishops and knights on edges are vulnerable', 'Create escape routes for your pieces', 'Noah\'s Ark Trap is a classic', 'Don\'t venture too deep without an exit'],
  },
  {
    id: 'tactics1-9',
    sectionId: 'tactics1',
    title: 'Back Rank Tactics',
    subtitle: 'Exploit weak back ranks',
    icon: '💀',
    duration: '8 min',
    difficulty: 2,
    objectives: ['Recognize back rank weaknesses', 'Execute back rank mates', 'Prevent back rank disasters'],
    steps: [
      {
        title: 'The Weak Back Rank',
        content: `A **weak back rank** occurs when the king is trapped by its own pawns and a rook or queen can deliver checkmate.

In this position, White plays Re8#! The king cannot escape because its own pawns block g8, f8, and h8.

**Always watch for back rank weaknesses!**`,
        fen: '4r1k1/5ppp/8/8/8/8/5PPP/R5K1 w - - 0 1',
        arrows: [['a1', 'e1'], ['e1', 'e8']],
        highlights: ['e8', 'g8', 'f7', 'g7', 'h7'],
      },
      {
        title: 'Creating Luft',
        content: `**Luft** (German for "air") means giving your king an escape square.

Simply moving h3 (or g3) gives the king a flight square and prevents back rank mate.

**Good habit:** Create luft early, especially when queens and rooks are on the board.`,
        fen: '4r1k1/5ppp/8/8/8/7P/5PP1/R5K1 w - - 0 1',
        arrows: [['h2', 'h3']],
        highlights: ['h2', 'h3'],
      },
      {
        title: 'Back Rank Deflection',
        content: `Sometimes you need to deflect a defender to execute the back rank mate.

Here, Qxd8! removes the defender. If Rxd8, then Re8+ Rxe8, and Rxe8#!

**Sacrifices often set up back rank mates.**`,
        fen: 'r2qr1k1/5ppp/8/8/8/8/5PPP/R2QR1K1 w - - 0 1',
        arrows: [['d1', 'd8'], ['e1', 'e8']],
      },
      {
        title: 'Double Rook Mate',
        content: `Two rooks are deadly on the back rank.

In this position, Rxa8+! sacrifices a rook, but after Rxa8, Re8+ forces Rxe8, and Rxe8#!

The rooks support each other to deliver checkmate.`,
        fen: 'r3r1k1/5ppp/8/8/8/8/5PPP/RR4K1 w - - 0 1',
        arrows: [['a1', 'a8'], ['b1', 'e1']],
      },
    ],
    keyPoints: ['Back rank mate traps king behind pawns', 'Create luft (h3 or g3) for safety', 'Rooks and queens deliver back rank mates', 'Sacrifices often set up the mate', 'Always check for back rank threats'],
  },
  {
    id: 'tactics1-10',
    sectionId: 'tactics1',
    title: 'Tactical Review',
    subtitle: 'Putting it all together',
    icon: '🧩',
    duration: '10 min',
    difficulty: 2,
    objectives: ['Review all tactical patterns', 'Practice pattern recognition', 'Combine multiple tactics'],
    steps: [
      {
        title: 'Summary of Patterns',
        content: `Let's review the tactical patterns we've learned:

1. **Fork** - Attack two pieces at once
2. **Pin** - Immobilize a piece (absolute or relative)
3. **Skewer** - Attack through a piece
4. **Discovered Attack** - Reveal a hidden threat
5. **Double Attack** - Two threats with one move
6. **Removing Defender** - Eliminate protection
7. **Trapped Pieces** - No escape
8. **Back Rank** - Mate on the last rank`,
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
      },
      {
        title: 'Pattern Recognition',
        content: `The key to tactics is **seeing patterns instantly**.

When you look at any position, ask:
- Are there any pieces lined up? (Pin/Skewer/Discovery)
- Is any piece undefended? (Fork/Double Attack)
- Is the back rank weak? (Mate threats)
- Can I remove a defender?

**Practice:** Solve puzzles daily!`,
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
      },
      {
        title: 'Combining Tactics',
        content: `Strong tactics often combine multiple patterns.

In this position, Nxe5! combines several ideas:
- If Nxe5, Bxf7+ is check (fork king/rook after Kf8)
- If dxe5, Qxd8 wins the queen
- If Bxd1, Bxf7+ is check, then Nxd8

Multiple threats = tactical power!`,
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
        arrows: [['f3', 'e5'], ['c4', 'f7']],
      },
      {
        title: 'Daily Practice',
        content: `To improve at tactics:

1. **Solve puzzles every day** - Even 10-15 minutes helps
2. **Review your mistakes** - Learn from errors
3. **Play and analyze** - Find the tactics you missed
4. **Study master games** - See how pros use tactics
5. **Be patient** - Pattern recognition takes time

Tactics win games. Master them!`,
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
      },
    ],
    keyPoints: ['Review all 8 tactical patterns', 'Ask the right questions each position', 'Combine tactics for powerful attacks', 'Practice puzzles daily', 'Pattern recognition improves with time'],
  },
];

// ============================================
// ASSEMBLE ALL SECTIONS
// ============================================
export const CURRICULUM: Section[] = [
  {
    id: 'basics',
    title: 'The Basics',
    subtitle: 'Learn how the pieces move',
    description: 'Master the fundamentals of chess—pieces, moves, and basic rules.',
    color: 'from-emerald-400 to-green-500',
    bgColor: '#166534',
    icon: '♚',
    requiredXP: 0,
    lessons: basicsLessons,
  },
  {
    id: 'tactics1',
    title: 'Tactics I',
    subtitle: 'Win material with tactics',
    description: 'Learn the fundamental tactical patterns that win games.',
    color: 'from-teal-400 to-cyan-500',
    bgColor: '#0f766e',
    icon: '⚔️',
    requiredXP: 30,
    lessons: tactics1Lessons,
  },
  {
    id: 'openings',
    title: 'Opening Principles',
    subtitle: 'Start your games right',
    description: 'Learn the principles that guide strong opening play.',
    color: 'from-blue-400 to-indigo-500',
    bgColor: '#3730a3',
    icon: '📚',
    requiredXP: 80,
    lessons: [], // Coming soon
  },
  {
    id: 'tactics2',
    title: 'Tactics II',
    subtitle: 'Advanced combinations',
    description: 'Master complex tactical patterns used by masters.',
    color: 'from-orange-400 to-amber-500',
    bgColor: '#b45309',
    icon: '⚡',
    requiredXP: 130,
    lessons: [], // Coming soon
  },
  {
    id: 'positional',
    title: 'Positional Play',
    subtitle: 'Strategic chess thinking',
    description: 'Learn to evaluate and improve your position.',
    color: 'from-purple-400 to-violet-500',
    bgColor: '#6b21a8',
    icon: '🏔️',
    requiredXP: 180,
    lessons: [], // Coming soon
  },
  {
    id: 'endgames',
    title: 'Endgame Essentials',
    subtitle: 'Convert your advantages',
    description: 'Master the art of winning endgames.',
    color: 'from-rose-400 to-pink-500',
    bgColor: '#9f1239',
    icon: '🏆',
    requiredXP: 240,
    lessons: [], // Coming soon
  },
  {
    id: 'strategy',
    title: 'Advanced Strategy',
    subtitle: 'Think like a grandmaster',
    description: 'Deep strategic concepts for advanced players.',
    color: 'from-red-400 to-rose-600',
    bgColor: '#991b1b',
    icon: '🧠',
    requiredXP: 300,
    lessons: [], // Coming soon
  },
  {
    id: 'mastery',
    title: 'Path to Mastery',
    subtitle: 'The complete player',
    description: 'Final lessons on the journey to chess mastery.',
    color: 'from-yellow-400 to-amber-500',
    bgColor: '#854d0e',
    icon: '☯️',
    requiredXP: 365,
    lessons: [], // Coming soon
  },
];

export default CURRICULUM;
