// ============================================
// THE AMATEUR'S MIND - COMPREHENSIVE VARIATIONS
// Deep explanations for each concept
// ============================================

import type { CourseVariation } from '../courseTypes';

// CHAPTER 1: IMBALANCES
export const imbalancesVariations: CourseVariation[] = [
  {
    id: 'im-1',
    title: 'Material Imbalance: The Greek Gift',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Trading material for activity and king exposure',
    keyTakeaway: 'A piece sacrifice can be worth it if the enemy king becomes permanently exposed.',
    difficulty: 3,
    introduction: `This is the famous Italian Game position. Look at Black's position - the king is still on e8, defended only by the f7 pawn. This pawn is called the "weakest square" because it's only protected by the king itself.

**Why is f7 so weak?**
- It's only defended by the king (unlike f2 for White, which is also weak)
- The bishop on c4 is already attacking it
- If we sacrifice on f7, Black's king is FORCED to move

**The question you should ask:** "Can I use this weakness to get something MORE valuable than the piece I sacrifice?"

In chess, material (pieces) isn't everything. A king stuck in the center, unable to castle, facing an army of developed pieces - that's often worth more than a bishop.`,
    commonMistakes: [
      'Playing safe moves like d3 when a tactical opportunity exists',
      'Not checking if the king will be exposed enough after the sacrifice',
      'Forgetting to have a follow-up move ready (here it\'s Ng5+)',
    ],
    deeperPrinciple: 'In the opening and early middlegame, DEVELOPMENT and KING SAFETY are often worth more than material. A piece sacrifice that exposes the enemy king and gives you attacking chances is often objectively winning.',
    moves: [
      { 
        move: 'Bxf7+', 
        annotation: '!', 
        explanation: `**The Greek Gift Sacrifice!**

This famous sacrifice works because:

1. **Black MUST take** - If Black plays Ke7, White keeps the bishop AND has weakened Black's position. If Black ignores the check with a random move... they lose the bishop for nothing.

2. **The king is dragged out** - After Kxf7, the Black king stands on an open file, cannot castle, and blocks the f8 bishop from developing.

3. **We have a follow-up** - The knight on f3 is ready to jump to g5 with check, continuing the attack.

**What makes this sacrifice SOUND (not just a gamble)?**
- We have immediate threats (Ng5+)
- Black's pieces can't quickly come to defend
- The damage to Black's position is PERMANENT (can't un-expose the king)

This is different from a "hope chess" sacrifice where you give up material and just hope something works out.`,
      },
      { 
        move: 'Kxf7', 
        explanation: `Black has no choice. The alternatives are worse:

- **Ke7?** Loses the bishop for nothing, and White plays Ng5 anyway attacking f7 again
- **Kf8?** Similar - White keeps the bishop AND Black's position is terrible

So Black takes, but now the king is on a terrible square. Notice:
- The king blocks the f8 bishop
- The king is in the center of the board
- White has more pieces developed
- White controls the initiative (making threats)`,
      },
      { 
        move: 'Ng5+', 
        annotation: '!', 
        explanation: `**The crucial follow-up!**

A sacrifice is only as good as its follow-up. Here Ng5+ is perfect because:

1. **It's check** - Black must respond, giving White another free tempo
2. **The knight threatens to capture on e6** - Forking the queen
3. **The queen can join via Qf3+** in many lines
4. **Black's pieces are still undeveloped** while White attacks

**Where can the king go?**
- Kf6? Loses to Qf3+ then Qf7# checkmate
- Ke8? White plays Qf3 threatening Qf7# - the attack continues
- Kg8? White plays Qf3 with a devastating attack

This is the power of piece activity over material - Black has an extra bishop but is getting mated!`,
      },
    ]
  },
  {
    id: 'im-2',
    title: 'Space Imbalance: Controlling the Center',
    fen: 'r1bqkb1r/pp1ppppp/2n2n2/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    toMove: 'white',
    concept: 'More space means more squares for your pieces to move to',
    keyTakeaway: 'The side with more central space can maneuver pieces more freely and launch attacks from multiple directions.',
    difficulty: 2,
    introduction: `This is the Sicilian Defense, one of Black's most aggressive responses to 1.e4. Black has played ...c5, fighting for the d4 square.

**What is "space" in chess?**
Space refers to the territory you control - squares where your pieces can safely go. The side with more space has more OPTIONS. Their pieces have more squares to choose from, more plans to execute.

**Why does the center matter most?**
A piece in the center can reach both wings quickly. A knight on d4 influences squares on both the kingside AND queenside. A knight on a3? It's stuck on the edge.

**The key question:** Who will control the center? Right now it's contested - both sides are fighting for d4 and d5.`,
    commonMistakes: [
      'Moving the same piece twice in the opening instead of controlling center',
      'Allowing the opponent to build a massive pawn center unchallenged',
      'Not understanding that space is a TEMPORARY advantage if not used',
    ],
    deeperPrinciple: 'Central control is the foundation of chess strategy. Before launching wing attacks or piece maneuvers, establish your central presence. Whoever controls the center controls the game.',
    moves: [
      { 
        move: 'd4', 
        annotation: '!', 
        explanation: `**Striking at the center!**

This is the most principled move. White immediately challenges Black's grip on the d4 square.

**Why d4 and not d3?**
- d4 controls MORE squares (c5, e5, and supports the e4 pawn)
- d4 opens lines for the dark-squared bishop
- d4 challenges Black directly - they must respond

**Think about what each pawn controls:**
- e4 pawn: controls d5 and f5
- d4 pawn: controls c5 and e5

Together, these two pawns create a "wall" in the center. Black's pieces have fewer entry points into White's position.

This is called "classical development" - establish central pawns, THEN develop pieces behind them.`,
      },
      { 
        move: 'cxd4', 
        explanation: `Black almost always captures here. Why?

**If Black doesn't take:**
- White could play d5, gaining even MORE space
- Or dxc5, winning a pawn
- Black's c5 pawn would be under constant pressure

**By taking on d4, Black:**
- Eliminates White's powerful central pawn
- Opens the c-file for the rook (later)
- Creates an "asymmetrical" pawn structure (more complex positions)

But now Black has NO center pawns at all! White still has e4. This is the fundamental trade-off in the Sicilian: Black gives up central space for piece activity and counterplay on the c-file.`,
      },
      { 
        move: 'Nxd4', 
        annotation: '!', 
        explanation: `**Centralizing with tempo!**

The knight recaptures, landing on a dominant central square.

**Why is d4 such a good square for the knight?**
1. It's protected by the e4 pawn (cannot be easily kicked away)
2. From d4, the knight eyes c6 (can fork queen and rook), b5, e6, f5
3. It controls key squares in Black's half of the board

**Compare the positions:**
- White: Has a knight on the powerful d4 square, pawn on e4, can develop freely
- Black: Has no center pawns, needs to develop pieces to counterattack

This is the space imbalance in action. White has MORE central control. Black must play accurately to compensate with piece activity.`,
      },
    ]
  },
  {
    id: 'im-3',
    title: 'Development Imbalance: Time is Precious',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Getting your pieces into the game faster than your opponent',
    keyTakeaway: 'A development lead is a TEMPORARY advantage - you must use it before the opponent catches up!',
    difficulty: 2,
    introduction: `Both sides have developed one knight. The score is tied. But in chess, every move is a chance to get ahead.

**What is "development"?**
Development means getting your pieces from their starting squares to active squares where they can:
- Control important squares
- Attack enemy pieces or pawns
- Defend your own position
- Be ready for the middlegame battle

**Why is development so important?**
Imagine a battle where one army is ready and the other is still gathering. The ready army wins! In chess, the side with more developed pieces can:
- Attack the undeveloped opponent
- Control more of the board
- Castle to safety faster

**The critical insight:** A development lead is TEMPORARY. If you don't use it, the opponent will catch up. That's why we say development is a "dynamic" advantage, not a permanent one.`,
    commonMistakes: [
      'Moving the same piece twice before developing others',
      'Going pawn-grabbing when you\'re behind in development',
      'Not realizing that castling counts as development (it activates the rook!)',
      'Developing pieces to passive squares where they don\'t control anything',
    ],
    deeperPrinciple: 'In the opening, EVERY MOVE should either develop a piece, support development, or control the center. Wasting moves on pawn pushes or piece shuffling hands the initiative to your opponent.',
    moves: [
      { 
        move: 'Nc3', 
        annotation: '!', 
        explanation: `**Developing with purpose!**

This natural move accomplishes several things at once:

1. **Develops a new piece** - The knight was doing nothing on b1
2. **Controls the center** - The knight now eyes d5 and e4
3. **Prepares for the future** - The knight could later go to d5 or b5

**Why not move the knight to other squares?**
- Na3? The edge is a bad place for knights ("A knight on the rim is dim")
- Ne2? Blocks the bishop and doesn't control d5
- Nd2? Blocks the dark-squared bishop

Nc3 is the natural, developing move. It follows the principle: **develop knights before bishops** (knights have fewer good squares).

**Count the development:**
- White: 2 pieces developed (Nf3, Nc3)
- Black: 2 pieces developed (Nc6, Nf6)

We're even, but it's White's turn. Whoever develops their next piece first gains an advantage!`,
      },
      { 
        move: 'Bb4', 
        explanation: `Black develops the bishop to an active diagonal.

**Why Bb4 specifically?**
- It pins the knight! The Nc3 cannot move without exposing the queen
- It's an aggressive developing move (creating a threat)
- It prepares castling (bishop is out of the way)

This is the Ruy Lopez / Four Knights type of position. Black is saying: "I won't just develop passively - I'll create threats while developing!"

**Notice:** Black is fighting for the initiative even while behind. This is correct play - don't just develop, develop with purpose!`,
      },
      { 
        move: 'd3', 
        annotation: '!', 
        explanation: `**Solid development, preparing more!**

This humble pawn move does a lot:

1. **Opens a diagonal** - The c1 bishop can now develop to e3 or g5
2. **Supports e4** - The center pawn is now rock-solid
3. **Prepares castling** - One more piece to move (bishop), then O-O!

**Why not castle immediately?**
O-O is also good! But d3 is slightly more flexible. We might want to develop the bishop before committing the king.

**The development race:**
- White: 2 pieces + is about to castle
- Black: 2 pieces + is about to castle

The race is tight! Both sides must continue developing quickly. The player who wastes moves will fall behind and get attacked.`,
      },
    ]
  },
  {
    id: 'im-4',
    title: 'Pawn Structure: The Skeleton of Your Position',
    fen: 'r1bqkb1r/pp1p1ppp/2n1pn2/2p5/2P1P3/2N2N2/PP1P1PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Pawns determine what plans are available to you',
    keyTakeaway: 'Unlike pieces, pawns cannot move backward. Every pawn move creates permanent weaknesses or strengths.',
    difficulty: 3,
    introduction: `This is a Sicilian Defense structure. Look carefully at the pawn formations:

**White's pawns:** e4 and c4 (controlling d5 and supporting the center)
**Black's pawns:** e6 and c5 (controlling d5 from the other side)

**Why does pawn structure matter so much?**
Pawns are the soul of chess (as Philidor said). Here's why:
1. **Pawns cannot move backward** - Every pawn move is irreversible
2. **Pawns create weaknesses** - A square no longer defended by a pawn becomes a target
3. **Pawns define the plans** - Your pawn structure tells you WHERE to play

**In this position:**
- Both sides are fighting for control of d5
- White has more central space (pawns on 4th rank)
- Black has a "Hedgehog" setup - pieces behind pawns, waiting to strike

**The key insight:** Before making a pawn move, ask yourself: "What squares will I weaken? What squares will I strengthen?"`,
    commonMistakes: [
      'Moving pawns without considering the permanent weaknesses created',
      'Ignoring your pawn structure when choosing a plan',
      'Not understanding that pawn moves are the most permanent decisions in chess',
    ],
    deeperPrinciple: 'Every pawn move weakens some squares and strengthens others. Masters plan their pawn moves far in advance because these decisions shape the entire game.',
    moves: [
      { 
        move: 'd4', 
        annotation: '!', 
        explanation: `**Challenging Black's structure!**

This is the principled central break. White is saying: "I want to control more of the center."

**Why is this move important for the pawn structure?**

1. **If Black takes (cxd4):** White recaptures with the knight, and now White has a PERFECT pawn center (e4). Black has no center pawns at all!

2. **If Black doesn't take:** White might play d5, gaining even more space, or keep the tension.

**The fight for d5:**
Right now, both e6 and c5 are guarding d5. If White can eliminate one of these defenders, a piece could land on d5 permanently.

This is why pawn structure matters - it determines where pieces can safely sit!`,
      },
      { 
        move: 'cxd4', 
        explanation: `Black captures, which is the most common response.

**What has changed in the pawn structure?**

Before: Black had c5 and e6 pawns, controlling d4 and d5
After: Black only has the e6 pawn, controlling d5

**The trade-off:**
- Black: Gets the c-file for the rook (after ...Rc8), piece activity
- White: Gets a stronger center, more space

This is the fundamental exchange in the Sicilian Defense. Black gives up central space for piece play. It's a fair trade, but both sides must understand the implications!

**Notice:** Black no longer controls d4. This could become a weakness (an "outpost" for White's knight).`,
      },
      { 
        move: 'Nxd4', 
        annotation: '!', 
        explanation: `**The knight takes its throne!**

Now look at White's pawn structure: Just e4 and c4, but look at how dominant the knight is on d4!

**Why is d4 such a great square?**
1. The knight is supported by the c4 pawn (can't be kicked by ...e5 easily)
2. It attacks several important squares (c6, b5, e6, f5)
3. Black cannot challenge it easily

**The resulting structure:**
- White: Pawns on c4 and e4, knight on d4 = "Maroczy Bind"
- Black: Pawn on e6 = "Hedgehog" formation

**What this means for plans:**
- White: Will try to squeeze Black, maybe push e5 or play on the queenside
- Black: Will try to break out with ...d5 or ...b5

The pawn structure has determined the battle lines! This is why understanding structure is so important.`,
      },
    ]
  },
  {
    id: 'im-5',
    title: 'Piece Activity: Active Pieces Win Games',
    fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'A piece that controls key squares and creates threats is worth more than its nominal value',
    keyTakeaway: 'In many positions, piece activity matters more than material. An active knight can be worth more than a passive rook!',
    difficulty: 3,
    introduction: `This is a typical position from the Queen's Gambit. Both sides have developed, but White needs a PLAN.

**What is "piece activity"?**
An ACTIVE piece is one that:
- Controls important squares (especially in the center)
- Attacks enemy pieces or pawns
- Coordinates well with other pieces
- Has many possible moves (flexibility)

A PASSIVE piece is one that:
- Defends but doesn't attack
- Has few available squares
- Is blocked by its own pawns
- Doesn't contribute to the overall plan

**In this position:**
Look at White's pieces. The rooks are on a1 and f1, but are they doing anything? The knights are well-placed. The bishops... where should they go?

**The question for White:** "How can I make my pieces MORE active?"`,
    commonMistakes: [
      'Moving pieces to "safe" squares where they do nothing',
      'Not trading a passive piece for an active one',
      'Ignoring piece activity when counting material',
    ],
    deeperPrinciple: 'Before making a move, ask: "Is this making my pieces more active, or more passive?" Always strive to improve the activity of your least active piece.',
    moves: [
      { 
        move: 'e5', 
        annotation: '!', 
        explanation: `**Activating the position!**

This pawn push does several things:

1. **Drives away the knight** - The f6 knight must move, giving White a tempo
2. **Opens lines** - The e-file becomes clearer for the rook
3. **Restricts Black** - Black's pieces have fewer squares to go to

**How does this increase piece activity?**
- The rook on f1 now sees f6 (after the knight moves)
- A bishop might come to c4 attacking f7
- The knight on f3 might jump to g5 or e5

**One pawn move changed everything!**

This is why e5 in such positions is often powerful - it's not just a pawn move, it's a piece-activating move.`,
      },
      { 
        move: 'Ne4', 
        explanation: `Black's knight retreats to e4, an active central square.

**Why e4?**
The knight could go to:
- Nd7? Passive, blocks the c8 bishop
- Ne8? Very passive, going backward
- Ng8? Terrible, undeveloping
- Ne4! Central, attacks the c3 knight, stays active!

**Black understands piece activity too!**
Instead of passively retreating (Nd7), Black finds an ACTIVE square. The knight on e4 is a monster - it attacks c3 and supports ...f5 ideas.

This is the right defensive mindset: even when forced to retreat, find an ACTIVE square!`,
      },
      { 
        move: 'Nxe4', 
        explanation: `White trades the knight.

**Why trade?**
Sometimes trading pieces is the right way to increase activity:
- The e4 knight was very active (too active!)
- By trading, White removes Black's best piece
- White's position becomes simpler to play

**After dxe4, notice:**
- Black has doubled, isolated e-pawns (e4 and e5)
- These pawns are WEAK (can't be defended by other pawns)
- White can target them with pieces

Trading an active piece is a valid strategy - especially when it leaves the opponent with weaknesses!`,
      },
      { 
        move: 'dxe4', 
        explanation: `Black recaptures with the d-pawn.

**The resulting position:**
Black now has pawns on e4 and e6 (the e5 pawn is White's). Look at Black's structure:
- Doubled pawns on the e-file
- The e4 pawn is a "target" (White can attack it with Nd2, f3, etc.)

**But wait - is the e4 pawn really weak?**
It's advanced, central, and cramping White's position! Chess is complex.

**The lesson:** Piece activity and pawn structure are connected. White's active play (e5!) created these weaknesses, but Black's pieces are still okay.`,
      },
      { 
        move: 'Nd2', 
        annotation: '!', 
        explanation: `**Targeting the weakness!**

The knight moves to d2, aiming for e4 (or c4).

**Why Nd2?**
1. Attacks the e4 pawn (the weakness we created!)
2. Prepares Nc4 or Nf3, continuing the attack
3. The knight was doing nothing special on c3

**This is coordinated piece play:**
- White created a weakness (e4 pawn) with e5
- Now White attacks that weakness with the knight
- The pieces work together with a PURPOSE

This is what "piece activity" means in practice - not just having active pieces, but using them together to attack weaknesses!`,
      },
    ]
  },
  {
    id: 'im-6',
    title: 'King Safety: The Most Important Piece',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'A safe king allows your pieces to attack; an unsafe king forces them to defend',
    keyTakeaway: 'In the opening and middlegame, king safety is often more important than material or pawn structure.',
    difficulty: 3,
    introduction: `This is the Italian Game. Both kings are still in the center. Right now, they're relatively safe because the center is blocked. But this won't last forever!

**Why is king safety so important?**

1. **Checkmate ends the game** - No amount of material advantage matters if you get mated
2. **An unsafe king ties down your pieces** - They must defend instead of attack
3. **Tactics work better against exposed kings** - Checks and pins become deadly

**The two aspects of king safety:**
1. **Short-term:** Is the king under immediate attack?
2. **Long-term:** Is the king castled behind pawns? Are there open files toward the king?

**In this position:**
Both kings are unsafe (in the center). The race is on - who will castle first? Who will attack the uncastled king?`,
    commonMistakes: [
      'Delaying castling to "win a pawn" or attack prematurely',
      'Creating weaknesses in front of your castled king (h3/g3 pawn moves without reason)',
      'Not recognizing when an attack on your king is coming',
    ],
    deeperPrinciple: 'Castle early, castle often. A king tucked behind three pawns (after castling) is vastly safer than a king in the center.',
    moves: [
      { 
        move: 'O-O', 
        annotation: '!', 
        explanation: `**Castling: The most important move!**

This single move accomplishes THREE things:

1. **The king is safe** - Behind the f2, g2, h2 pawn wall
2. **The rook is active** - Now the f1 rook connects with the other rook
3. **Development is complete** - All minor pieces are out, king is safe

**Why not attack with Ng5 or Bxf7+ first?**

While those moves are tempting, they don't address OUR king's safety. What if Black plays ...Na5 threatening our bishop, and then attacks our center? Our king could become a target!

**The wise approach:** Secure your own king FIRST, then attack. From a position of safety, you can take risks.

This is a crucial lesson: King safety first, attack second!`,
      },
      { 
        move: 'O-O', 
        explanation: `Black wisely castles too.

**Now compare the positions:**
- Both kings are safe behind their pawns
- Both sides have completed development
- The game enters the middlegame on equal footing

**What if Black had NOT castled?**
Suppose Black played ...d6 instead. Then White could play:
1. Ng5 (threatening Nxf7)
2. Or d4 opening the center while Black's king is stuck

When the center opens, an uncastled king becomes a HUGE liability. Files open up, pieces attack, and suddenly checkmate threats appear everywhere.

**This is why castling is so important!** It removes the king from future danger and activates a rook simultaneously.`,
      },
      { 
        move: 'd3', 
        annotation: '!', 
        explanation: `**Solid, sensible development.**

With both kings safe, White continues improving the position:
- The bishop on c1 now has a path to g5 or e3
- The pawn on d3 supports e4
- White is ready for the middlegame battle

**The key point:**
Because both kings are safe, neither side needs to rush. White can calmly improve pieces, build up, and look for the right moment to strike.

**Compare to the scenario with an unsafe king:**
If Black's king was still on e8, White would be looking for ways to EXPLODE the position - sacrifices, pawn breaks, anything to attack!

King safety changes the entire character of the game.`,
      },
    ]
  },
  {
    id: 'im-7',
    title: 'Minor Piece Imbalance: Bishops vs Knights',
    fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Bishops and knights are worth the same, but shine in different positions',
    keyTakeaway: 'Bishops love open positions with diagonals; knights love closed positions with outpost squares.',
    difficulty: 3,
    introduction: `Bishops and knights are both worth approximately 3 points, but their VALUE depends on the position!

**When are BISHOPS better?**
- Open positions (few pawns blocking diagonals)
- When they control long diagonals
- When there are pawns on both sides of the board (bishops can "teleport")
- In the endgame with passed pawns (bishops cover more squares)

**When are KNIGHTS better?**
- Closed positions (locked pawn chains)
- When there are "outpost" squares (protected by pawns, can't be attacked by enemy pawns)
- When play is concentrated on one side of the board
- In tactical positions (knights can fork!)

**The "two bishops" advantage:**
Having both bishops is usually worth about half a pawn extra! They cover all 64 squares between them.

**In this position:**
Both sides have a bishop and two knights. The question is: what kind of position is this going to become?`,
    commonMistakes: [
      'Trading bishops for knights in open positions',
      'Keeping knights in open positions where bishops dominate',
      'Not creating outposts for your knights',
      'Blocking your own bishops with pawns',
    ],
    deeperPrinciple: 'The value of pieces is not fixed - it depends on the position. Learn to recognize which piece is "better" and try to trade the unfavorable one.',
    moves: [
      { 
        move: 'Bg5', 
        annotation: '!', 
        explanation: `**Activating the bishop with a purpose!**

This move does several things:

1. **Develops the bishop** - It was doing nothing on c1
2. **Pins the knight** - The f6 knight is now pinned to the queen
3. **Creates options** - White might trade on f6, damaging Black's pawn structure

**Why is this pin strong?**
The knight on f6 is an important defender. It:
- Protects the d5 pawn
- Controls e4 and g4
- Can jump to e4 or h5

By pinning it, White reduces its effectiveness. Black must decide: break the pin (with ...Be7-f6 or ...h6) or tolerate it?

**The bishop vs knight dynamic:**
Here, the bishop is MORE active than any knight because it's pinning, creating threats, and influencing the game from afar.`,
      },
      { 
        move: 'h6', 
        explanation: `Black asks the bishop: "What are you going to do?"

This is called "putting the question" to the bishop. Black is forcing White to make a decision.

**White's options:**
1. **Bh4** - Keep the pin, but the bishop might get trapped later (...g5)
2. **Bxf6** - Trade bishop for knight, giving Black doubled pawns but also the two bishops
3. **Be3** - Retreat, but lose the pin

**What's the right choice?**
It depends on the plan! If White wants to attack the kingside, Bh4 keeps pressure. If White wants a positional game, Bxf6 creates a weakness.

This is the essence of the bishop vs knight battle - it's about long-term planning, not just individual moves.`,
      },
      { 
        move: 'Bh4', 
        annotation: '!', 
        explanation: `**Maintaining the pin!**

White decides the pin is valuable enough to keep.

**Why not trade with Bxf6?**
After ...Bxf6, Black would have:
- The two bishops (strong in this relatively open position)
- No weak pawns (gxf6 would create doubled pawns, but Bxf6 is also possible)

**By keeping Bh4:**
- The pin remains annoying
- Black's knight can't move freely
- White keeps options (might trade later under better circumstances)

**The risk:**
Black might play ...g5, trapping the bishop! White must watch for this.

This is strategic chess - weighing options, making plans, understanding piece dynamics. The bishop is worth the same as a knight... but in THIS position, where is it more useful?`,
      },
    ]
  },
  {
    id: 'im-8',
    title: 'Control Imbalance: Dominating Key Squares',
    fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Controlling files, diagonals, and key squares gives your pieces purpose',
    keyTakeaway: 'Files (vertical lines) are highways for rooks; diagonals are highways for bishops. Control them!',
    difficulty: 3,
    introduction: `Chess is about control. Every piece fight is ultimately about WHO controls the key squares, files, and diagonals.

**What are "key" squares, files, and diagonals?**

**Key squares:** Typically in the center (d4, d5, e4, e5) or near the enemy king
**Key files:** Open files (no pawns) where rooks can penetrate
**Key diagonals:** Long diagonals that aim at the enemy king or key squares

**Why does control matter?**
- Rooks on open files can reach the 7th or 8th rank (devastating!)
- Bishops on long diagonals can attack from far away
- Knights on outposts can dominate central squares

**In this position:**
The e-file is potentially open (if dxe4). The d-file has the d4 and d5 pawns blocking it. Who will control these files?`,
    commonMistakes: [
      'Not doubling rooks on open files',
      'Not fighting for control of key squares',
      'Allowing opponent\'s pieces to dominate key lines',
    ],
    deeperPrinciple: 'Ask yourself: "What are the key squares and files in this position?" Then fight for control of them with your pieces.',
    moves: [
      { 
        move: 'Re1', 
        annotation: '!', 
        explanation: `**Taking control of the e-file!**

This prophylactic move prepares for the future:

1. **If dxe4 happens:** The rook is already on the e-file, controlling it
2. **The rook is active:** It now sees e7 (a potential target if things open up)
3. **The e4 pawn is supported:** It's harder for Black to challenge e4 now

**Why is the e-file important here?**
The e7 square is Black's weak point. If the e-file opens and White gets a rook to e7, it attacks:
- The f7 and b7 pawns (from the 7th rank!)
- Black's back rank (potential back-rank mate themes)

**This is proactive play:** White isn't waiting for things to happen. White is preparing for them!`,
      },
      { 
        move: 'c6', 
        explanation: `Black solidifies the center.

**Why ...c6?**
- Supports the d5 pawn (makes it harder for White to attack it)
- Prepares ...Qc7, connecting the queen to the c-file
- Creates a solid pawn chain (c6-d5)

**But notice:**
By playing ...c6, Black's pieces have fewer squares. The knight on c6 must find a new home (maybe d7 or a5). The c-file is now closed.

This is a common trade-off: solidity vs activity. Black is "buying time" by solidifying, but White's control of the e-file remains.`,
      },
      { 
        move: 'Bd3', 
        annotation: '!', 
        explanation: `**The bishop takes the long diagonal!**

Look at what this bishop does from d3:
- Aims at h7 (near the Black king!)
- Supports e4
- Works harmoniously with the Re1

**This is piece coordination:**
- Rook on e1: Controls the e-file
- Bishop on d3: Controls the b1-h7 diagonal
- Together: They create pressure on Black's kingside

**The control imbalance:**
White now controls:
- The e-file (Re1)
- The b1-h7 diagonal (Bd3)
- The center (pawns on d4 and e4)

Black must find ways to challenge this control or create counterplay elsewhere!`,
      },
    ]
  },
  {
    id: 'im-9',
    title: 'Initiative Imbalance: Making Threats',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'The side making threats controls the game; the side responding just survives',
    keyTakeaway: 'Initiative means making your opponent react to YOUR plans instead of executing theirs.',
    difficulty: 3,
    introduction: `**What is "initiative"?**

The player with initiative is making THREATS. The other player must REACT to those threats. This is a fundamental asymmetry in chess.

**Why is initiative so powerful?**
- The threatening side chooses WHERE to fight
- The defending side is one step behind, always responding
- Eventually, the defender makes a mistake (it's harder to defend perfectly!)

**Initiative vs Development:**
These are related but different!
- Development = Getting pieces out
- Initiative = Making threats

You can be well-developed but passive (no threats). Or you can have initiative despite being slightly behind in development (unlikely but possible).

**In this position:**
It's a quiet Italian Game. Who will seize the initiative? The player who makes the FIRST real threat!`,
    commonMistakes: [
      'Playing passive moves when you have initiative',
      'Not recognizing when opponent has initiative (and failing to neutralize it)',
      'Making threats that are easily ignored',
    ],
    deeperPrinciple: 'A game of chess is a battle for initiative. When you have it, press forward. When opponent has it, defend accurately and try to wrest it back.',
    moves: [
      { 
        move: 'Ng5', 
        annotation: '!', 
        explanation: `**Seizing the initiative!**

This aggressive move creates an immediate THREAT:

**The threat:** Nxf7 forking the queen and rook!

Now Black MUST respond. They can't just calmly develop - they must deal with this threat.

**Why is this good?**
1. Black wastes time defending (instead of improving their position)
2. White might get to continue making threats
3. Even if the attack doesn't work, White hasn't wasted time (the knight is active on g5)

**The psychological impact:**
When you're making threats, you feel in control. When you're defending, you're stressed and prone to errors.

This is the initiative in action!`,
      },
      { 
        move: 'd5', 
        explanation: `Black counter-attacks in the center!

**Why ...d5?**
Rather than passively defend (like ...d6 or ...h6), Black strikes back in the center.

This move:
- Attacks the bishop on c4
- Opens lines for Black's pieces
- Creates counter-initiative!

**This is the correct defensive approach:**
Don't just defend - counter-attack! Make YOUR threats while dealing with opponent's threats.

**The game becomes sharper:**
Both sides are now making threats. This is more dangerous for both, but also more dynamic. Black refused to be passive!`,
      },
      { 
        move: 'exd5', 
        annotation: '!', 
        explanation: `**Maintaining pressure!**

White takes the pawn, keeping the threats alive.

**Why take?**
After exd5:
- The f7 square is still weak
- The knight on g5 still threatens
- White has more central pawns

**If White had retreated (Bb3):**
Black would have ...dxe4, and White's initiative would be GONE. Black would be fine.

**The lesson:**
When you have initiative, DON'T give it up voluntarily! Keep making threats. Force your opponent to keep reacting.

After exd5, Black must again find the best defensive move. The pressure continues!`,
      },
    ]
  },
  {
    id: 'im-10',
    title: 'Multiple Imbalances: When Advantages Combine',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Real positions have multiple imbalances that must be evaluated together',
    keyTakeaway: 'Two or three small advantages often outweigh one bigger one. Combine your imbalances!',
    difficulty: 4,
    introduction: `This is a typical Sicilian Dragon position. Let's count the imbalances:

**White's advantages:**
1. More central space (e4 + d4)
2. Better pawn structure (no weaknesses)
3. Potential kingside attack (queenside castling coming)

**Black's advantages:**
1. The strong bishop on g7 (the "Dragon bishop")
2. Counterplay on the c-file (after ...Rc8)
3. The flexible knight on f6

**Neither side has a decisive advantage, but both have imbalances!**

The key skill in chess is weighing these imbalances. Which side's advantages are more important? Who should be playing for a win?

**The battle plan:**
- White: Wants to attack the Black king with h4-h5, g4, Bh6 exchanging the dragon bishop
- Black: Wants to use the c-file, attack on the queenside, and keep the dragon bishop alive

This is why chess is so fascinating - it's not about who has MORE imbalances, but who uses them better!`,
    commonMistakes: [
      'Focusing on only one imbalance and ignoring others',
      'Not having a plan that utilizes your advantages',
      'Trading off your advantages (like exchanging an active piece for no reason)',
    ],
    deeperPrinciple: 'In complex positions, identify ALL the imbalances on BOTH sides. Then create a plan that maximizes YOUR imbalances while minimizing your opponent\'s.',
    moves: [
      { 
        move: 'O-O-O', 
        annotation: '!', 
        explanation: `**The most important move in the Sicilian Dragon!**

This single move accomplishes multiple goals:

1. **King safety:** The king tucks away on the queenside
2. **Rook activation:** The d1 rook joins the d-file
3. **Attack preparation:** White can now storm with g4-h4-h5 or Bh6

**Why queenside castling?**
Because White wants to attack the kingside! With the king on c1/b1:
- White's g and h pawns can push forward
- There's no conflict between attacking and defending

**If White had castled kingside:**
The g4-h5 attack would endanger White's own king. Bad idea!

**This is strategic castling:** Not just for safety, but for ATTACK.`,
      },
      { 
        move: 'a6', 
        explanation: `Black prepares counterplay.

**Why ...a6?**
Black is preparing ...b5, attacking White's knight on c3 and starting queenside counterplay.

**The race is on:**
- White attacks on the kingside (where Black's king is)
- Black attacks on the queenside (where White's king is)

This is the Sicilian Dragon in a nutshell: OPPOSITE SIDE ATTACKS. Both sides castle differently and try to break through on the side where the enemy king is located.

**Who wins the race?**
Usually, kingside attacks are slightly faster because:
- White goes first
- The kingside has more firepower (the f3-e4-d4 pawn chain, the bishops and knights)

Black must play precisely to survive!`,
      },
      { 
        move: 'Kb1', 
        annotation: '!', 
        explanation: `**Prophylaxis before attack!**

This quiet move prepares for everything:

1. **The king is safer:** Away from the c-file (where Black's rook will come)
2. **The a2 pawn is protected:** If ...b5-b4 comes, the knight on c3 can move without hanging anything
3. **No rush:** White has a clear advantage and can take time

**Why not attack immediately with g4?**
Too hasty! After g4, Black plays ...Rc8 and ...b5 with counterplay. By playing Kb1 first, White removes all counterplay ideas AND then attacks.

**This is the grandmaster approach:**
Before launching an attack, make sure your position is SECURE. Eliminate weaknesses. Then attack with confidence.

Multiple imbalances (space, attack, structure) are being combined into one devastating assault!`,
      },
    ]
  },
];

// CHAPTER 2: PLAN MAKING
export const planMakingVariations: CourseVariation[] = [
  {
    id: 'pm-1',
    title: 'Creating a Plan: The Essential Skill',
    fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'A plan gives your moves meaning and direction',
    keyTakeaway: 'Every move should be part of a plan. Random moves lead to random (bad) results.',
    difficulty: 3,
    introduction: `"He who has a plan will beat he who has no plan" - old chess wisdom.

**What IS a plan?**
A plan is a series of connected ideas aimed at improving your position or exploiting opponent's weaknesses. It answers the question: "What am I trying to achieve?"

**How to form a plan:**
1. **Evaluate the position** - Who stands better? Why?
2. **Identify imbalances** - What are the key features?
3. **Find a target** - What can you attack or improve?
4. **Decide on moves** - What moves achieve your goal?

**In this position:**
Both sides have developed. There are no immediate tactics. White needs a PLAN.

**What are White's imbalances?**
- Central space (e4 and d4 are powerful)
- Well-placed knights
- The dark-squared bishop can become active

**A possible plan:**
Control the dark squares! Put a bishop on g5, pressure the knight on f6, maybe create weaknesses around Black's king.`,
    commonMistakes: [
      'Playing moves without a purpose ("I don\'t know, it looked good")',
      'Changing plans every move based on whim',
      'Not considering what the opponent wants to do',
    ],
    deeperPrinciple: 'Chess is about executing plans, not making pretty individual moves. Your moves should work together like a team, not as random individuals.',
    moves: [
      { 
        move: 'Bg5', 
        annotation: '!', 
        explanation: `**The first step of the plan!**

White's plan: Control the dark squares and create pressure on the kingside.

**Why Bg5?**
1. Develops the last minor piece
2. PINS the knight to the queen (pressure!)
3. Eyes the f6 knight (a key defender of the king)

**This move fits the plan:**
White wants dark-square control. The bishop on g5 dominates the h4-d8 diagonal and creates problems for Black's knights.

**What's the FOLLOW-UP?**
A plan without a follow-up is just a single move! After Bg5, White might:
- Double rooks on the d-file or e-file
- Play Qd2 (connecting to the Bg5, threatening Bh6)
- Prepare e5 to drive away defenders

This is thinking in PLANS, not moves!`,
      },
      { 
        move: 'h6', 
        explanation: `Black asks the bishop: commit or retreat?

**This is called "putting the question."**
Black forces White to decide: trade the bishop for the knight, or retreat?

**White's decision depends on the PLAN:**
- If the plan needs the bishop: retreat (Bh4 or Be3)
- If trading helps the plan: take (Bxf6)

**Notice:** Black is reacting to White's plan. This is what happens when you have a plan - opponent must respond to YOUR ideas!`,
      },
      { 
        move: 'Bh4', 
        annotation: '!', 
        explanation: `**Sticking to the plan!**

White decides the pin is too valuable to give up.

**Why keep the bishop?**
1. The pin is annoying - Black can't easily untangle
2. Trading would give Black the two bishops
3. White's plan (dark-square pressure) needs this bishop

**The continuation:**
Now White might threaten Nd5 (attacking the pinned knight), or Re1 + e5, or even Qd3 eyeing h7.

**ALL these ideas flow from the PLAN.**

Compare this to random play: "I'll put my bishop here... now I'll move this pawn... maybe attack over there?" That's how amateurs play. Masters have plans, and every move serves the plan.`,
      },
    ]
  },
  {
    id: 'pm-2',
    title: 'Short-Term vs Long-Term Plans',
    fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Balance immediate needs with future goals',
    keyTakeaway: 'Don\'t sacrifice your long-term position for short-term gains (like winning a pawn).',
    difficulty: 4,
    introduction: `Plans have different time horizons:

**Short-term plans (next 2-5 moves):**
- Win material with a tactic
- Develop a piece to a good square
- Castle to safety

**Long-term plans (10+ moves):**
- Create and advance a passed pawn
- Dominate a weak color complex
- Build up pressure on an isolated pawn

**The challenge:**
Sometimes short-term and long-term goals conflict! Winning a pawn NOW might damage your long-term position.

**Example:** You can win a pawn, but it requires trading your active knight for opponent's bad bishop. Is it worth it?

The answer depends on the position, but often: NO. Long-term positional advantages (like an active knight vs a bad bishop) outweigh short-term material gains.

**In this position:**
White could play for a quick pawn break (e5), but should consider the long-term consequences. What will the position look like AFTER the dust settles?`,
    commonMistakes: [
      'Grabbing pawns that compromise your position',
      'Trading active pieces for material',
      'Not thinking about what happens AFTER the immediate tactic',
    ],
    deeperPrinciple: 'Strong players think in terms of RESULTING positions, not just immediate gains. Ask: "If I do this, what will the position look like in 5 moves?"',
    moves: [
      { 
        move: 'Re1', 
        annotation: '!', 
        explanation: `**A long-term investment!**

This move doesn't win anything immediately. But look at what it does for the FUTURE:

1. **Rook activates** - The rook was doing nothing on f1
2. **E-file control** - If the center opens, this rook will dominate
3. **Supports e5** - The e4-e5 pawn break is now more powerful

**Short-term thinking:** "Re1 doesn't attack anything, so it's passive"
**Long-term thinking:** "Re1 prepares for when the position opens"

This is the difference between masters and amateurs. Masters invest in the FUTURE, not just the present.`,
      },
      { 
        move: 'Bg4', 
        explanation: `Black develops with a pin.

**Black's plan:**
Create counterplay by pinning the knight and eventually targeting the center.

**Notice:**
Both sides have plans! Chess is a dialogue of ideas. White plans one thing; Black plans something else. Who executes their plan better wins!`,
      },
      { 
        move: 'Be3', 
        annotation: '!', 
        explanation: `**Building the position calmly.**

White develops the last minor piece to a flexible square.

**Why Be3?**
1. The bishop supports d4 (solid center)
2. The bishop can later go to f4 or g5
3. White isn't rushing - the position is fine

**Long-term mindset:**
White doesn't need to DO anything dramatic. The position is slightly better. By continuing to develop and improve, White maintains pressure without taking risks.

**Short-term players:** Would be tempted to play e5 "to attack!" but that might be premature.

**Long-term players:** Improve all pieces first, THEN attack when everything is ready.`,
      },
    ]
  },
  // Continue with remaining variations...
  {
    id: 'pm-3',
    title: 'Flexible Planning',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Good plans adapt to changing circumstances',
    keyTakeaway: 'Be ready to change plans when the position demands it.',
    difficulty: 3,
    introduction: `A plan is not a prison - it's a guide!

**The problem with rigid thinking:**
If you stick to your plan even when it no longer makes sense, you'll blunder into traps.

**The solution:**
After EVERY opponent move, ask:
1. What did their move change?
2. Does my plan still work?
3. Should I adapt or switch plans entirely?

**Example:**
Your plan was to attack the kingside. But opponent played ...g6, creating weaknesses on the light squares. Maybe now a DIFFERENT attack (on light squares!) is better.

**Flexibility is strength.**
Weak players are stubborn. Strong players are flexible. They adjust to what the position needs, not what they "wanted" to do.`,
    commonMistakes: [
      'Stubbornly sticking to a plan that no longer works',
      'Not reconsidering after opponent\'s reply',
      'Getting "married" to an idea you fell in love with',
    ],
    deeperPrinciple: 'Your plan should be based on the CURRENT position, not the position you wished for. Evaluate afresh after each move.',
    moves: [
      { 
        move: 'd4', 
        annotation: '!', 
        explanation: `**Opening the center!**

White's initial plan might have been quiet development (d3, Be2, O-O). But Black's setup invites a different approach!

**Why change to d4?**
1. It challenges Black's center immediately
2. It opens lines for White's pieces
3. It creates concrete action

**The flexible mindset:**
"I was going to play d3, but actually d4 is more ambitious and this position allows it. Let me do THAT instead."

This is flexible planning - adapting to opportunities as they arise!`,
      },
      { 
        move: 'exd4', 
        explanation: `Black takes, and now the position has changed fundamentally.

**What changed?**
- The center is now open (was closed)
- White will get an active piece on d4
- New plans are required!

**Before d4:** White might have planned slow maneuvering.
**After exd4:** White now plays actively in the center!

The plan has EVOLVED based on how the game went.`,
      },
      { 
        move: 'Nxd4', 
        annotation: '!', 
        explanation: `**New plan: Dominate the center!**

Look at this position now. The knight on d4 is fantastic!

**White's NEW plan:**
1. Control the center with the knight
2. Develop pieces to active squares (Bc4, O-O, Re1)
3. Maybe push e5 later to gain space

**Notice:**
This plan didn't exist 2 moves ago! It emerged from the changing position. This is how strong players think - always adapting, always re-evaluating.

**Flexibility in action:** White didn't stubbornly play d3 because "that was my plan." White saw d4 was better and CHANGED.`,
      },
    ]
  },
  {
    id: 'pm-4',
    title: 'Planning with Pieces: Where Should They Go?',
    fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Each piece should have an ideal square - find it!',
    keyTakeaway: 'Ask yourself: "Where would each of my pieces be happiest?" Then work toward that setup.',
    difficulty: 3,
    introduction: `A key part of planning is piece placement.

**For each piece, ask:**
- Where is its IDEAL square?
- What path does it take to get there?
- What pieces need to move out of the way?

**Example:**
Your knight is on c3. Its ideal square might be d5 (controlling the center). But there's no path yet! You need to support d5 with pieces or pawns first.

**Piece placement principles:**
- **Knights:** Want outposts (squares protected by pawns, not attackable by enemy pawns)
- **Bishops:** Want open diagonals aiming at weaknesses
- **Rooks:** Want open files or to support passed pawns
- **Queen:** Want flexibility, not too early commitment

**In this position:**
White's pieces are reasonably placed, but can they be IMPROVED?`,
    commonMistakes: [
      'Moving pieces without knowing where they ultimately belong',
      'Putting pieces on squares that block other pieces',
      'Not coordinating pieces toward a common goal',
    ],
    deeperPrinciple: 'Think of piece placement like solving a puzzle. Each piece has an ideal square, and your job is to get them all there harmoniously.',
    moves: [
      { 
        move: 'Bd3', 
        annotation: '!', 
        explanation: `**The bishop finds its ideal diagonal!**

From d3, the bishop:
1. Aims at the kingside (b1-h7 diagonal!)
2. Supports e4 (solid center)
3. Can later relocate to c2 if needed

**Why is b1-h7 the ideal diagonal?**
It points TOWARD BLACK'S KING! The bishop is now part of a potential kingside attack.

**Compare to Bc4:**
Also good (aims at f7), but Bd3 is more flexible. From c4, the bishop might get kicked by ...d5 or ...b5.

**This is piece placement planning:** Finding the best long-term home for each piece.`,
      },
      { 
        move: 'dxe4', 
        explanation: `Black takes, changing the structure.

**What changed?**
The pawn structure shifted! White must decide how to recapture.

**Piece placement question:**
Which recapture puts the pieces on better squares?`,
      },
      { 
        move: 'Nxe4', 
        annotation: '!', 
        explanation: `**The knight takes its throne!**

Recapturing with the knight puts it on a DOMINANT central square.

**Why not Bxe4?**
That would be fine too, but the knight on e4 is MORE imposing. It:
- Attacks f6 knight
- Controls d6, f6, d2, c5
- Is a monster in the center!

**Piece placement achieved:**
- Bishop on d3: Aims at h7
- Knight on e4: Dominates the center
- Everything is coordinated!

This is how plans and piece placement work together.`,
      },
    ]
  },
  {
    id: 'pm-5',
    title: 'Planning an Attack: Concentrated Force',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Successful attacks require concentration of force on one area',
    keyTakeaway: 'Attack where you have more pieces than opponent has defenders. Don\'t scatter your forces.',
    difficulty: 4,
    introduction: `**The Golden Rule of Attack:**
Never attack until you have more force in the attacking zone than opponent has in defense.

**How to attack effectively:**
1. **Choose a target:** Usually where opponent is weakest (often the king!)
2. **Concentrate forces:** Move pieces toward that zone
3. **Remove defenders:** Trade off pieces that defend the target
4. **Strike!:** Only when ready, launch the final assault

**In this position (Sicilian Dragon):**
White has a natural plan - castle queenside and attack the kingside!

**Why this plan?**
- White's king will be safe on the queenside
- The g2-g4-h4-h5 push threatens the kingside
- The bishop on e3 can go to h6 to trade the dragon bishop

This is a CLASSIC attacking plan. All of White's pieces will work together toward one goal: attacking Black's king.`,
    commonMistakes: [
      'Attacking too early before pieces are coordinated',
      'Attacking where opponent is STRONG (not weak)',
      'Scattering pieces across the board instead of concentrating',
    ],
    deeperPrinciple: 'Chess attacks are like military operations - you need overwhelming force at the point of attack. Consolidate, concentrate, then strike.',
    moves: [
      { 
        move: 'O-O-O', 
        annotation: '!', 
        explanation: `**The attack begins!**

This is not just castling - it's the START of an attacking plan.

**What does O-O-O accomplish?**
1. King is now safe on the queenside
2. The d1 rook enters the battle (can support d-file or kingside)
3. White can now push g4-h4 without worrying about king safety

**The plan after O-O-O:**
- h4-h5: Open the h-file against Black's king
- g4: Support the attack and create threats
- Bh6: Trade off the powerful dragon bishop

All pieces work toward ONE goal: attacking the kingside!`,
      },
      { 
        move: 'e5', 
        explanation: `Black counter-attacks in the center!

**Why ...e5?**
Black sees the attack coming and tries to counter in the center. This is correct defensive strategy - counter-attack!

**White must decide:**
Continue the attack or deal with the counter-attack?`,
      },
      { 
        move: 'Nf5', 
        annotation: '!', 
        explanation: `**The attack continues!**

White doesn't get distracted. The knight JOINS the kingside attack from f5!

**What does Nf5 threaten?**
1. Nxg7! (sac to destroy Black's kingside)
2. Nxe7+ (forking king and something)
3. The knight is a monster on f5

**Notice:**
White didn't panic about ...e5. Instead, White used it to IMPROVE the attack! The knight was on d4 (good) but now it's on f5 (GREAT for attacking).

This is concentrated attacking: every move brings another piece closer to the enemy king.`,
      },
    ]
  },
  // I'll add a few more key variations but the pattern is established...
  {
    id: 'pm-6',
    title: 'Defensive Planning: Creating a Fortress',
    fen: 'r1bq1rk1/ppp1bppp/2n2n2/3pp3/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Defense requires a plan too - not just reacting move by move',
    keyTakeaway: 'The best defense is an ACTIVE defense - counter-attacking while defending.',
    difficulty: 4,
    introduction: `Defense is not about being passive!

**Principles of good defense:**
1. **Identify the threats:** What is opponent planning?
2. **Prioritize:** Which threats are most dangerous?
3. **Defend economically:** Use as few pieces as possible to defend
4. **Counter-attack:** Create YOUR OWN threats while defending

**Bad defense:** Moving pieces randomly, hoping things work out
**Good defense:** Having a clear plan to neutralize threats AND create counterplay

**In this position:**
Black has struck with ...e5! This challenges White's center. White must defend carefully.`,
    commonMistakes: [
      'Becoming too passive when defending',
      'Reacting to every threat instead of having a plan',
      'Forgetting to create counter-threats',
    ],
    deeperPrinciple: 'The best defensive technique is to stay active. A cramped but active position is better than a passive one with no counterplay.',
    moves: [
      { 
        move: 'dxe5', 
        annotation: '!', 
        explanation: `**Simplifying the position!**

When under pressure, simplification often helps. By trading pawns, White:
1. Reduces the tension in the center
2. Opens the d-file for potential counterplay
3. Avoids a cramped position

**Is this "defensive"?**
Yes, but ACTIVELY so. White is not just retreating - White is changing the position to reduce Black's attacking potential.`,
      },
      { 
        move: 'Nxe5', 
        explanation: `Black recaptures, centralizing the knight.

**The position now:**
Black has a centralized knight, but so does White (on c3). The position is roughly equal.

**White's defensive plan worked:**
By trading pawns, White neutralized Black's central push.`,
      },
      { 
        move: 'Nxe5', 
        annotation: '!', 
        explanation: `**Trading pieces to ease the defense!**

More simplification! When defending, trading pieces often helps because:
1. Fewer pieces = fewer attacking possibilities
2. The position becomes clearer
3. Mistakes are less punishing

**After dxe5:**
The position is completely equal. Black has no attack. White's defensive plan SUCCEEDED.

**Lesson:** Defense doesn't mean suffering. Good defensive play leads to equality or even advantage!`,
      },
    ]
  },
];

// CHAPTER 3: EVALUATION (keeping shorter for now - can be expanded)
export const evaluationVariations: CourseVariation[] = [
  {
    id: 'ev-1',
    title: 'Material Count: The Foundation',
    fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Start evaluation by counting material',
    keyTakeaway: 'Material is the most CONCRETE factor. Count it first, then look at other factors.',
    difficulty: 2,
    introduction: `Position evaluation is a crucial skill. Masters can look at a position and instantly sense who stands better. How do they do it?

**They follow a checklist:**
1. **Material:** Who has more pieces/pawns?
2. **King safety:** Is either king in danger?
3. **Piece activity:** Whose pieces are more active?
4. **Pawn structure:** Who has better pawns?
5. **Space:** Who controls more squares?

Material is the starting point because it's OBJECTIVE. You can count it!

**Standard piece values:**
- Pawn = 1
- Knight = 3
- Bishop = 3
- Rook = 5
- Queen = 9

In this position, let's count...`,
    moves: [
      { 
        move: 'Bg5', 
        annotation: '!', 
        explanation: `**Material is equal - look deeper!**

Count the pieces:
- White: 8 pawns, 2 knights, 2 bishops, 2 rooks, 1 queen
- Black: 8 pawns, 2 knights, 2 bishops, 2 rooks, 1 queen

Equal! So we need to look at OTHER factors to evaluate.

**Since material is equal, what matters?**
- Piece activity (whose pieces are more active?)
- King safety (both kings are castled - good)
- Pawn structure (looks healthy for both)
- Space (White has e4 and d4 - slight space advantage)

Bg5 IMPROVES White's position by activating a piece. This is how you improve when material is equal!`,
      },
    ]
  },
  // Additional evaluation variations would follow the same deep pattern...
];

// CHAPTER 4: CANDIDATE MOVES
export const candidateMovesVariations: CourseVariation[] = [
  {
    id: 'cm-1',
    title: 'Finding Candidates: Don\'t Move Until You\'ve Looked!',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Always consider at least 3 candidate moves before deciding',
    keyTakeaway: 'The first move you see is rarely the best. Look for alternatives!',
    difficulty: 2,
    introduction: `**The biggest amateur mistake:**
Seeing a "good" move and playing it immediately.

**The master approach:**
1. Generate 3-5 candidate moves
2. Evaluate each one
3. Compare the consequences
4. THEN choose

**Why is this so important?**
Because the first move you see is often obvious, but not best! By forcing yourself to consider alternatives, you find better moves.

**In this position:**
You might immediately see Nc3 (develops a piece). Good! But wait - are there BETTER moves? Let's find candidates...`,
    commonMistakes: [
      'Playing the first move that comes to mind',
      'Not considering forcing moves (checks, captures, threats)',
      'Rushing because of time pressure',
    ],
    deeperPrinciple: 'Discipline yourself to ALWAYS find at least 3 candidates. This habit alone can improve your rating 100-200 points!',
    moves: [
      { 
        move: 'd3', 
        annotation: '!', 
        explanation: `**One candidate: Solid development.**

d3 is a solid, good move. But is it the BEST? Let's think of alternatives:

**Candidate 1: d3**
- Prepares to develop the bishop
- Supports e4
- Solid but not aggressive

**Candidate 2: Nc3**
- Develops a piece
- Controls d5 and e4
- Natural but not threatening

**Candidate 3: Ng5!**
- Attacks f7!
- Creates immediate threats
- Aggressive and forcing

**Candidate 4: c3**
- Prepares d4
- Solid but slow

By generating candidates, we see that Ng5 is the most FORCING move. Should we play it?

The answer depends on calculation, but at least we FOUND the aggressive option by looking for candidates!`,
      },
    ]
  },
  {
    id: 'cm-2',
    title: 'Forcing Moves First: Checks, Captures, Threats',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Always consider forcing moves before quiet moves',
    keyTakeaway: 'Forcing moves limit opponent\'s options. Calculate them first!',
    difficulty: 3,
    introduction: `**The order of candidate moves matters!**

When generating candidates, check FORCING moves first:
1. **Checks:** King must respond
2. **Captures:** Opponent usually must recapture
3. **Threats:** Must be addressed

**Why?**
Forcing moves limit what opponent can do. If you have check, opponent has maybe 2-3 legal moves. If you have a quiet move, opponent has 20+ options!

**The calculation benefit:**
Forcing moves are EASIER to calculate because there are fewer responses to consider.

**Example:**
In this position, is there a forcing move? Yes! Ng5 threatens Nxf7, forking queen and rook!`,
    moves: [
      { 
        move: 'Ng5', 
        annotation: '!', 
        explanation: `**The forcing move!**

This is the first candidate to calculate because it's FORCING.

**What does Ng5 threaten?**
Nxf7! Forking the queen on d8 and the rook on h8.

**Black MUST respond.** Options are limited:
- d5? (attacks the bishop, but allows the fork?)
- h6? (kicks the knight)
- O-O? (gets the rook to safety)

Because Ng5 is forcing, we can calculate the consequences more easily than for a quiet move like d3.

**Always check forcing moves first!**`,
      },
    ]
  },
];

// CHAPTER 5: THINKING TECHNIQUE
export const thinkingTechniqueVariations: CourseVariation[] = [
  {
    id: 'tt-1',
    title: 'Blunder Check: The Safety Habit',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Before every move, ask: "Is this safe?"',
    keyTakeaway: 'The number one cause of losing games is BLUNDERS. Checking for safety prevents most of them.',
    difficulty: 2,
    introduction: `**The Brutal Truth:**
Most games between amateur players aren't decided by brilliant strategies or deep calculations. They're decided by BLUNDERS.

One side makes a terrible mistake, and the game is over.

**The Simple Solution:**
Before EVERY move you make, ask yourself ONE question:
"Is my move safe? Does it leave anything hanging?"

This 5-second check will eliminate 90% of your blunders!

**What to check:**
1. After I move, can opponent capture something for free?
2. Does my move leave a piece undefended?
3. Is there a tactic I'm walking into (fork, pin, skewer)?

**In this position:**
Let's practice the blunder check on a simple move.`,
    commonMistakes: [
      'Getting excited about an idea and forgetting to check safety',
      'Playing too fast and missing simple tactics',
      'Not checking if opponent has a threat BEFORE making your move',
    ],
    deeperPrinciple: 'Chess is 99% tactics and 1% strategy (at amateur level). The blunder check is the most important habit you can develop.',
    moves: [
      { 
        move: 'd3', 
        annotation: '!', 
        explanation: `**Before playing d3, blunder check!**

Ask yourself:
1. Does d3 leave anything hanging? NO - all pieces are protected
2. Does d3 create a weakness? NO - it supports e4, opens bishop
3. Can opponent capture anything after d3? NO - material is safe

**The move is SAFE.**

Only AFTER confirming safety should you consider if the move is GOOD.

**Why d3 is good:**
- Opens diagonal for c1 bishop
- Supports the e4 pawn solidly
- Prepares to castle

But the key is: we checked for BLUNDERS first! This habit will save you countless games.`,
      },
    ]
  },
  {
    id: 'tt-2',
    title: 'What Does Opponent Want?',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Before planning your move, identify opponent\'s threats and plans',
    keyTakeaway: 'Chess is a two-player game! Consider what opponent wants before deciding your move.',
    difficulty: 3,
    introduction: `**The Amateur Trap:**
Only thinking about YOUR plans while ignoring opponent's ideas.

**The Master Approach:**
Before making your move, ask:
1. What is opponent threatening?
2. What is opponent's plan?
3. Can I continue my plan while addressing their threats?

**Why is this so important?**
If you ignore opponent's threats, you'll walk into them! Even if your move is "good" for your plan, it might be LOSING if it ignores a threat.

**How to practice:**
After every opponent move, PAUSE. Ask: "What did that move do? What does opponent want?"

This habit alone separates improving players from stagnant ones.`,
    moves: [
      { 
        move: 'Nc3', 
        annotation: '!', 
        explanation: `**Before Nc3, consider Black's threats:**

What is Black threatening?
- ...Nxe4? Not yet - nothing attacks e4
- ...d5? Attacks the bishop - YES, this is a threat!

**So before moving, we should check:**
If we play Nc3, can Black play ...d5?
After Nc3 d5, the bishop is attacked. We'd have to move (Bb3 or Bd5).

Is that okay? Yes! After Bb3 dxe4 Nxe4, we're fine.

**The thinking process:**
1. See opponent's threat (...d5)
2. Check if our move (Nc3) allows it
3. Calculate the consequence
4. Decide it's okay
5. Play the move!

This is how to think in chess - considering BOTH sides.`,
      },
    ]
  },
];

export default {
  imbalancesVariations,
  planMakingVariations,
  evaluationVariations,
  candidateMovesVariations,
  thinkingTechniqueVariations,
};
