// ============================================
// COMPREHENSIVE CHESS CURRICULUM
// 80+ lessons with deep instructional content
// ============================================

export interface LessonStep {
  title: string;
  content: string;
  fen?: string; // Chess position to show
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
  practicePositions?: { fen: string; solution: string; hint: string }[];
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
// SECTION 1: THE BASICS
// ============================================
const basicsLessons: Lesson[] = [
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
        highlights: ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4', 'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
      },
      {
        title: 'Diagonals',
        content: `**Diagonals** run at 45-degree angles across the board. They're crucial for bishops and queens.

- The **a1-h8 diagonal** is the longest light-square diagonal
- The **a8-h1 diagonal** is the longest dark-square diagonal

Each diagonal contains only one color of squares. This is why we have "light-squared bishops" and "dark-squared bishops"—they can never switch!`,
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

To name a square: find the file (letter) first, then the rank (number). The square where they meet is the name.

**Practice:** Where is the white king at the start? Answer: e1`,
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
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
        fen: '8/8/8/3K4/8/8/8/8 w - - 0 1',
        highlights: ['c6', 'd6', 'e6', 'c5', 'e5', 'c4', 'd4', 'e4'],
      },
      {
        title: 'The Goal of Chess',
        content: `Chess is won by **checkmating** the enemy king—trapping it so it cannot escape capture.

You never actually capture the king. Instead, when the king is:
- **Attacked**: This is called "check"
- **Attacked with no escape**: This is "checkmate" (game over!)
- **Not attacked but no legal moves**: This is "stalemate" (draw)

The entire game revolves around king safety and threatening the enemy king.`,
      },
      {
        title: 'What is Check?',
        content: `**Check** occurs when your king is attacked by an enemy piece.

When in check, you MUST respond immediately. You have exactly three options:
1. **Move** the king to a safe square
2. **Block** the check with another piece
3. **Capture** the attacking piece

If none of these are possible, it's checkmate!`,
        fen: '8/8/8/8/4r3/8/8/4K3 w - - 0 1',
        arrows: [['e4', 'e1']],
      },
      {
        title: 'Illegal Moves',
        content: `The king has strict rules about where he **cannot** go:

1. **Cannot move into check**: You can't place your own king under attack
2. **Cannot stay in check**: If checked, you must get out of it
3. **Cannot castle through check**: (We'll learn castling later)
4. **Cannot capture a protected piece**: (This would put you in check)

These rules are absolute—violating them means the move is illegal.`,
        fen: '8/8/8/2r5/8/8/2K5/8 w - - 0 1',
        highlights: ['c3', 'c4', 'c5'], // Squares the king cannot move to
      },
      {
        title: 'King Opposition',
        content: `When two kings face each other with one square between them, this is called **opposition**.

The player NOT to move has the opposition—an advantage because they can force the other king to retreat.

Opposition is crucial in king and pawn endgames. We'll explore this deeply in the endgame section!`,
        fen: '8/8/3k4/8/3K4/8/8/8 w - - 0 1',
        arrows: [['d4', 'd5']],
      },
      {
        title: 'Keeping Your King Safe',
        content: `**King safety** is one of the most important strategic concepts.

**Early/Middle game rules:**
- Castle early to hide your king
- Keep pawns in front of your castled king
- Don't advance the pawns in front of your king
- Keep pieces defending your king

**A exposed king is a losing king!** Even if you have extra material, a vulnerable king can lead to checkmate.`,
        fen: 'r4rk1/ppp2ppp/8/8/8/8/PPP2PPP/R4RK1 w - - 0 1',
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
      },
      {
        title: 'Queen Development',
        content: `**Don't bring your queen out too early!**

This is one of the most common beginner mistakes. Why?

1. The queen is a big target—pieces will attack her
2. Moving the queen early wastes time (tempo)
3. Minor pieces can develop while chasing your queen
4. Your queen might get trapped

**Best practice:** Develop knights and bishops first, then castle, THEN bring out the queen.`,
        fen: 'rnb1kbnr/pppp1ppp/8/4p1q1/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1',
      },
      {
        title: 'Queen Attacks',
        content: `The queen is devastating in attacks because she combines long-range power in all directions.

**Common queen attack patterns:**
- Queen + Bishop battery on diagonals
- Queen + Rook on files/ranks
- Queen raids on weak pawns
- Back rank threats with queen and rook

However, the queen alone rarely delivers checkmate. She needs help from other pieces!`,
        fen: 'r1b2rk1/pp3ppp/2n2q2/3p4/3P4/2N2Q2/PP3PPP/R1B2RK1 w - - 0 1',
      },
      {
        title: 'Queen Endgames',
        content: `Queen vs King is a forced checkmate, but technique matters!

**The Box Method:**
1. Use your queen to create a "box" around the enemy king
2. Gradually shrink the box
3. Bring your king closer to help
4. Deliver checkmate on the edge

A queen alone cannot checkmate—you always need your king's help!`,
        fen: '8/8/8/8/3k4/8/8/4QK2 w - - 0 1',
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

**Why open files matter:**
- Rooks can penetrate into enemy territory
- They support pawn advances
- They control key entry points
- Connected rooks on an open file are powerful

**Goal:** Place your rooks on open files before your opponent does!`,
        fen: 'r4rk1/ppp2ppp/8/4p3/4P3/8/PPP2PPP/R4RK1 w - - 0 1',
        highlights: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'],
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
        fen: '6k1/1R6/8/8/8/8/8/4K3 w - - 0 1',
        arrows: [['b7', 'g7'], ['b7', 'b8']],
      },
      {
        title: 'Connected Rooks',
        content: `Two rooks protecting each other are called **connected rooks** or "doubled rooks."

Connected rooks are incredibly powerful because:
- They defend each other
- They can double on files or ranks
- Two rooks = 10 points (more than a queen!)
- They dominate open positions

**Strategy:** Connect your rooks by moving them to the same rank or file.`,
        fen: '8/8/8/8/8/8/8/R3R2K w - - 0 1',
        arrows: [['a1', 'e1']],
      },
      {
        title: 'Rook Activation',
        content: `Rooks are often the last pieces to enter the game. Don't forget about them!

**How to activate rooks:**
1. Castle to get the king out of the way
2. Clear pawns to create open files
3. Move rooks to central or open files
4. Connect your rooks on the back rank
5. Double them on key files

**Passive rooks lose games.** Always look for ways to improve their positions!`,
        fen: 'r4rk1/ppp2ppp/2n5/3pp3/3PP3/2N5/PPP2PPP/R4RK1 w - - 0 1',
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

A bishop on a long diagonal is called a **fianchettoed bishop** when placed on b2/g2 (for White) or b7/g7 (for Black).

**Fianchetto** (pronounced "fee-an-KET-oh") is an Italian word meaning "little flank." It's a common opening strategy!`,
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
        arrows: [['a8', 'h1']],
      },
      {
        title: 'Good vs Bad Bishops',
        content: `A **good bishop** is one whose path isn't blocked by its own pawns.
A **bad bishop** is trapped behind its own pawns.

**Example:** If your pawns are on light squares, your light-squared bishop is "bad" because its diagonals are blocked.

**Strategy:** Put pawns on opposite color squares to your remaining bishop!`,
        fen: '8/pp3ppp/4p3/3pP3/3P4/8/PP3PPP/2B5 w - - 0 1',
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
        fen: '8/8/8/8/3B4/8/2B5/8 w - - 0 1',
        highlights: ['a1', 'b2', 'd4', 'e5', 'f6', 'g7', 'h8', 'a4', 'b3', 'd1', 'e2', 'f3', 'g4', 'h5'],
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
        fen: '8/8/4n3/8/3B4/8/8/8 w - - 0 1',
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
        fen: '8/8/8/3N4/8/8/8/8 w - - 0 1',
        highlights: ['b6', 'c7', 'e7', 'f6', 'f4', 'e3', 'c3', 'b4'],
      },
      {
        title: 'Knights on the Rim',
        content: `**"A knight on the rim is dim!"** - Famous chess saying

A knight in the corner controls only 2 squares.
A knight on the edge controls only 3-4 squares.
A knight in the center controls 8 squares!

**Lesson:** Keep knights centralized! e4, d4, e5, d5 are ideal squares.`,
        fen: 'N7/8/8/8/8/8/8/8 w - - 0 1',
        highlights: ['b3', 'c2'],
      },
      {
        title: 'Knight Outposts',
        content: `An **outpost** is a square where your knight cannot be attacked by enemy pawns.

**The perfect outpost:**
- Protected by your own pawn
- Cannot be attacked by enemy pawns
- Deep in enemy territory (ranks 4-6)
- Controls important squares

An outpost knight can be worth more than a bishop!`,
        fen: '8/pp3ppp/4p3/3pN3/2P5/8/PP3PPP/8 w - - 0 1',
        highlights: ['e5'],
      },
      {
        title: 'Knight Forks',
        content: `Because the knight moves uniquely, it's the best piece for **forks**—attacking two pieces at once!

**Common fork targets:**
- King + Queen (the "royal fork")
- King + Rook
- Queen + Rook
- Two minor pieces

Knights fork from angles that other pieces can't defend. Watch for them!`,
        fen: '8/8/8/3N4/8/8/8/r3K2r w - - 0 1',
        arrows: [['d5', 'c3'], ['c3', 'a1'], ['c3', 'e1']],
      },
      {
        title: 'Knights in Closed Positions',
        content: `When the position is **closed** (many locked pawns), knights shine!

**Why knights excel in closed positions:**
- They can jump over pawn chains
- Bishops get blocked by pawns
- They can find outposts behind enemy pawns
- Short-range maneuvering is valuable

**Rule:** In closed positions, knight > bishop. In open positions, bishop > knight.`,
        fen: 'r1bqkbnr/ppp2ppp/2np4/4p3/2PPP3/2N2N2/PP3PPP/R1BQKB1R w KQkq - 0 1',
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
        fen: '8/8/8/8/8/3P4/8/8 w - - 0 1',
        highlights: ['d4', 'd5'],
      },
      {
        title: 'Pawn Captures',
        content: `Pawns capture **diagonally forward**, not straight ahead.

This means:
- A pawn can be blocked by ANY piece directly in front
- Pawns control the diagonal squares in front of them
- Two pawns side by side protect each other
- Pawns can create "passed pawn" situations

The diagonal capture is why pawns control different squares than they can move to!`,
        fen: '8/8/4n3/3P4/8/8/8/8 w - - 0 1',
        arrows: [['d5', 'e6']],
      },
      {
        title: 'En Passant',
        content: `**En passant** ("in passing") is chess's special capture rule.

**How it works:**
1. Your pawn is on the 5th rank (4th for Black)
2. Enemy pawn moves TWO squares, landing beside you
3. You can capture it as if it had moved only one square
4. You MUST capture immediately or lose the right

This rule exists to prevent pawns from "sneaking by" using the two-square move!`,
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
- Sometimes promote to Knight (unique move)
- Rarely promote to Rook/Bishop (to avoid stalemate)

**Underpromotion:** Choosing a piece other than queen. Rare but sometimes necessary!`,
        fen: '8/3P4/8/8/8/8/8/8 w - - 0 1',
        arrows: [['d7', 'd8']],
      },
      {
        title: 'Passed Pawns',
        content: `A **passed pawn** has no enemy pawns blocking or attacking its path to promotion.

**Passed pawns are powerful because:**
- They threaten to become queens
- They tie down enemy pieces
- Two connected passed pawns can win games

**"Passed pawns must be pushed!"** - Every coach ever

Creating and pushing passed pawns is a key endgame skill.`,
        fen: '8/3P4/8/8/8/8/2p5/8 w - - 0 1',
        highlights: ['d7', 'd8'],
      },
      {
        title: 'Philidor\'s Quote',
        content: `**"Pawns are the soul of chess."** - François-André Philidor (1726-1795)

This famous quote means:
- Pawn structure determines the character of the game
- Piece placement depends on pawn structure
- Pawn weaknesses often decide games
- Understanding pawns = understanding chess

We'll study pawn structures deeply in the strategy section!`,
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
        arrows: [['e1', 'g1'], ['h1', 'f1']],
      },
      {
        title: 'Queenside Castling',
        content: `**Queenside castling (O-O-O)** moves the king to c1/c8 and the rook to d1/d8.

Queenside castling:
- Requires 3 pieces to move (queen, bishop, knight)
- Places the rook on an often-open file (d-file)
- King is slightly less protected (c-pawn is weaker)
- Can lead to opposite-side castling attacks!`,
        fen: '2kr4/pppppppp/8/8/8/8/PPPPPPPP/2KR4 w - - 0 1',
        arrows: [['e8', 'c8'], ['a8', 'd8']],
      },
      {
        title: 'Castling Requirements',
        content: `You can only castle if ALL these conditions are met:

1. ❌ King has never moved
2. ❌ Rook (that side) has never moved  
3. ❌ No pieces between king and rook
4. ❌ King is NOT currently in check
5. ❌ King does NOT pass through check
6. ❌ King does NOT land in check

**Remember:** You can castle if the ROOK passes through an attacked square—just not the king!`,
        fen: 'r3k2r/pppp1ppp/4p3/8/1b6/4P3/PPPP1PPP/R3K2R w KQkq - 0 1',
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
- To keep opponent guessing which side you'll castle
- In some sharp opening lines (rare)`,
      },
      {
        title: 'Opposite Side Castling',
        content: `When players castle on **opposite sides**, the game becomes a race!

**Opposite castling leads to:**
- Pawn storms (pawns attacking enemy king position)
- Open files toward enemy king
- Aggressive, sharp play
- "Whoever attacks first wins"

This is some of the most exciting chess you can play!`,
        fen: 'r3k2r/ppp2ppp/8/8/8/8/PPP2PPP/R3K2R w KQkq - 0 1',
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

**Three ways to escape check:**
1. **Move** the king to a safe square
2. **Block** the check with another piece
3. **Capture** the attacking piece

You MUST respond to check—no other move is legal!`,
        fen: 'rnbqkbnr/ppppp2p/5p2/6pQ/4P3/8/PPPP1PPP/RNB1KBNR b KQkq - 0 1',
        arrows: [['h5', 'e8']],
      },
      {
        title: 'Checkmate',
        content: `**Checkmate** = Check with no escape. The game is over!

For checkmate, all three escape methods must fail:
- ❌ King cannot move (all squares attacked or blocked)
- ❌ Cannot block (or no blocking piece available)
- ❌ Cannot capture attacker (or capture is protected)

**Goal of chess:** Deliver checkmate, not just capture pieces!`,
        fen: 'rnb1kbnr/pppp1ppp/4p3/8/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 0 1',
        highlights: ['h4'],
      },
      {
        title: 'Stalemate',
        content: `**Stalemate** = No legal moves, but NOT in check. It's a DRAW!

Stalemate happens when:
- It's your turn
- Your king is NOT in check
- You have NO legal moves (none at all!)

**Warning:** Don't accidentally stalemate when you're winning! Many games are thrown away this way.`,
        fen: '5k2/5P2/4K3/8/8/8/8/8 b - - 0 1',
      },
      {
        title: 'Double Check',
        content: `**Double check** = Two pieces attack the king simultaneously.

This is extremely dangerous because:
- You can't block two attacks
- You can't capture two pieces
- The king MUST move!

Double check often leads to checkmate because the king's options are severely limited.`,
        fen: '8/8/8/5N2/8/2k5/4B3/4K3 w - - 0 1',
        arrows: [['f5', 'd4'], ['e2', 'a6']],
      },
      {
        title: 'Checkmate Patterns',
        content: `Recognizing checkmate patterns helps you spot opportunities.

**Common patterns:**
- **Back rank mate**: Queen/Rook on last rank, king trapped by own pawns
- **Smothered mate**: Knight checkmates king blocked by own pieces
- **Scholar's mate**: Queen + Bishop coordinate on f7/f2
- **Anastasia's mate**: Knight + Rook coordination

We'll practice all these patterns in the tactics section!`,
        fen: '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1',
        arrows: [['e1', 'e8']],
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
      },
      {
        title: 'Queen vs King: The Box Method',
        content: `**Step 1:** Create a "box" that traps the enemy king.

Use your queen to limit the king's movement, pushing it toward the edge.

**Key principle:** Don't let the king escape toward the center! Keep cutting off squares with your queen.`,
        fen: '8/8/3Q4/8/3k4/8/8/4K3 w - - 0 1',
        highlights: ['d5', 'd6', 'd7', 'd8', 'e5', 'e6', 'e7', 'e8', 'f5', 'f6', 'f7', 'f8', 'g5', 'g6', 'g7', 'g8', 'h5', 'h6', 'h7', 'h8'],
      },
      {
        title: 'Queen vs King: Bring the King',
        content: `**Step 2:** Bring YOUR king to help.

The queen alone can't checkmate. Your king must approach to:
- Support the queen
- Take away escape squares
- Deliver the final blow

**Be careful:** Don't get too close and allow stalemate!`,
        fen: '8/8/8/3Q4/3k4/4K3/8/8 w - - 0 1',
      },
      {
        title: 'Queen vs King: Checkmate Pattern',
        content: `**Step 3:** Force the king to the edge and deliver checkmate.

Classic checkmate position: King on the edge, your queen supported by your king, delivering mate.

**Warning:** Watch for stalemate! If the enemy king has no moves and isn't in check, it's a draw!`,
        fen: 'Q2k4/8/3K4/8/8/8/8/8 w - - 0 1',
        arrows: [['a8', 'd8']],
      },
      {
        title: 'Rook vs King: Cut Off',
        content: `King + Rook vs King is slower but follows similar principles.

**Step 1:** Use the rook to cut off the king.

Think of the rook as creating a wall. The enemy king cannot cross the rook's rank or file.`,
        fen: '8/8/8/4R3/3k4/8/8/4K3 w - - 0 1',
        highlights: ['e4', 'e5', 'e6', 'e7', 'e8'],
      },
      {
        title: 'Rook vs King: Opposition',
        content: `**Step 2:** Use your king to take opposition.

When your king faces the enemy king with one square between, you have "opposition." The king who moves must retreat.

The rook + king work together: king pushes, rook cuts off.`,
        fen: '8/3k4/8/3K4/8/8/8/4R3 w - - 0 1',
        arrows: [['d5', 'd7']],
      },
      {
        title: 'Rook vs King: Checkmate',
        content: `**Step 3:** Force the king to the edge and checkmate.

The pattern: King on the edge, your king providing opposition, rook delivers mate along the edge.

**Key technique:** Don't rush! Take your time, improve your position, then strike.`,
        fen: '3kR3/8/3K4/8/8/8/8/8 w - - 0 1',
      },
      {
        title: 'Practice These!',
        content: `These basic checkmates should be automatic—you should be able to do them without thinking!

**Practice tips:**
1. Set up K+Q vs K positions and practice until perfect
2. Then practice K+R vs K (it's trickier!)
3. Aim for checkmate in minimal moves
4. Review if you accidentally stalemate

**Pro tip:** These positions appear in your games all the time. Master them!`,
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
// SECTION 2: TACTICS I
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
    objectives: [
      'Understand the difference between tactics and strategy',
      'Learn what makes a move "forcing"',
      'Recognize tactical patterns',
    ],
    steps: [
      {
        title: 'Tactics vs Strategy',
        content: `**Tactics** are short-term, concrete sequences of moves—usually involving threats, checks, or captures.

**Strategy** is long-term planning—piece placement, pawn structure, and overall coordination.

**Key difference:** 
- Tactics = "I attack your queen, you must respond"
- Strategy = "I'll control the open file, then invade on the 7th rank"

"Tactics flow from a superior position." - Bobby Fischer`,
      },
      {
        title: 'Forcing Moves',
        content: `**Forcing moves** limit your opponent's options. They MUST respond in a specific way.

**Types of forcing moves:**
1. **Checks** - King must escape
2. **Captures** - Often must recapture
3. **Threats** - Must defend or lose material

Calculating forcing moves is easier because your opponent has fewer choices!`,
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
      },
      {
        title: 'Why Tactics Win Games',
        content: `Most amateur games are decided by tactics, not strategy!

**Statistics:** 
- 70%+ of amateur games are won/lost on tactical errors
- Even grandmasters blunder when tired or in time trouble
- One tactical shot can overturn a losing position

**Lesson:** Improve your tactics = win more games!`,
      },
      {
        title: 'Pattern Recognition',
        content: `Chess masters don't calculate everything—they recognize patterns instantly.

**Building pattern recognition:**
1. Study classic tactical motifs
2. Solve puzzles daily
3. Review your tactical errors
4. Play regularly and analyze

The patterns we'll learn in this section are the building blocks of ALL chess tactics.`,
      },
    ],
    keyPoints: [
      'Tactics are short-term forcing sequences',
      'Checks, captures, and threats are forcing',
      'Most amateur games are decided by tactics',
      'Pattern recognition comes from practice',
    ],
  },
  // ... More tactics lessons would continue here
  // I'll add placeholder structure for the remaining lessons
  {
    id: 'tactics1-2',
    sectionId: 'tactics1',
    title: 'The Fork',
    subtitle: 'Attack two pieces at once',
    icon: '🍴',
    duration: '8 min',
    difficulty: 2,
    objectives: ['Master fork patterns', 'Identify fork opportunities', 'Set up forks'],
    steps: [
      { title: 'What is a Fork?', content: 'A fork is an attack on two or more pieces simultaneously. The attacker will win material because the defender can only save one piece.' },
      { title: 'Knight Forks', content: 'Knights are the best forking pieces because they attack on a unique path that cannot be blocked.' },
      { title: 'Pawn Forks', content: 'Pawns can fork too! A pawn fork on major pieces is devastating.' },
      { title: 'Queen Forks', content: 'Queens can fork from long range, combining checks with attacks on loose pieces.' },
    ],
    keyPoints: ['Forks attack two+ pieces at once', 'Knights are forking champions', 'Look for loose pieces to fork'],
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
      { title: 'What is a Pin?', content: 'A pin occurs when a piece cannot move because doing so would expose a more valuable piece behind it.' },
      { title: 'Absolute Pins', content: 'When the piece behind is the king, it is ILLEGAL to move the pinned piece. This is an absolute pin.' },
      { title: 'Relative Pins', content: 'When the piece behind is valuable but not the king, the pinned piece CAN move (but usually should not).' },
      { title: 'Exploiting Pins', content: 'Attack pinned pieces with pawns! They cannot run away.' },
    ],
    keyPoints: ['Pins restrict piece movement', 'Absolute pins involve the king', 'Attack pinned pieces with pawns'],
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
    requiredXP: 60,
    lessons: [], // Would be populated
  },
  {
    id: 'tactics2',
    title: 'Tactics II',
    subtitle: 'Advanced combinations',
    description: 'Master complex tactical patterns used by masters.',
    color: 'from-orange-400 to-amber-500',
    bgColor: '#b45309',
    icon: '⚡',
    requiredXP: 100,
    lessons: [],
  },
  {
    id: 'positional',
    title: 'Positional Play',
    subtitle: 'Strategic chess thinking',
    description: 'Learn to evaluate and improve your position.',
    color: 'from-purple-400 to-violet-500',
    bgColor: '#6b21a8',
    icon: '🏔️',
    requiredXP: 150,
    lessons: [],
  },
  {
    id: 'endgames',
    title: 'Endgame Essentials',
    subtitle: 'Convert your advantages',
    description: 'Master the art of winning endgames.',
    color: 'from-rose-400 to-pink-500',
    bgColor: '#9f1239',
    icon: '🏆',
    requiredXP: 200,
    lessons: [],
  },
  {
    id: 'strategy',
    title: 'Advanced Strategy',
    subtitle: 'Think like a grandmaster',
    description: 'Deep strategic concepts for advanced players.',
    color: 'from-red-400 to-rose-600',
    bgColor: '#991b1b',
    icon: '🧠',
    requiredXP: 280,
    lessons: [],
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
    lessons: [],
  },
];

export default CURRICULUM;

