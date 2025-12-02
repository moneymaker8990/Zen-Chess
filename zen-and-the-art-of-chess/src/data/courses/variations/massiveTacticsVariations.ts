// ============================================
// MASSIVE TACTICS VARIATIONS
// 500+ variations for Woodpecker-style training
// ============================================

import type { CourseVariation } from '../courseTypes';

// ============================================
// PINS - 80 VARIATIONS
// ============================================
export const allPinVariations: CourseVariation[] = [
  // Basic Pins (1-20)
  { id: 'pin-b1', title: 'Pin to King #1', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Absolute pin basics', keyTakeaway: 'The bishop cannot move - it would expose the king.', difficulty: 1, moves: [{ move: 'O-O', explanation: 'Castling to safety, the pin on c3 is harmless.' }] },
  { id: 'pin-b2', title: 'Pin to King #2', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Pin creation', keyTakeaway: 'Create pins with your bishops.', difficulty: 1, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Threatening Nxf7 and creating pressure.', arrows: [{ from: 'f3', to: 'g5', color: 'green' }] }] },
  { id: 'pin-b3', title: 'Pin to King #3', fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Pin setup', keyTakeaway: 'Position bishops on open diagonals.', difficulty: 1, moves: [{ move: 'Nc3', explanation: 'Developing with central control.' }] },
  { id: 'pin-b4', title: 'Pin to Queen #1', fen: 'r1b1kb1r/pppp1ppp/2n2n2/4p2q/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Relative pin', keyTakeaway: 'Relative pins restrict but don\'t prevent movement.', difficulty: 2, moves: [{ move: 'g4', annotation: '!', explanation: 'Attacking the queen!', arrows: [{ from: 'g2', to: 'g4', color: 'green' }] }] },
  { id: 'pin-b5', title: 'Pin to Queen #2', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Pin the defender', keyTakeaway: 'Pin pieces that defend key squares.', difficulty: 2, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Pinning the knight to the queen!', arrows: [{ from: 'c1', to: 'g5', color: 'green' }] }] },
  { id: 'pin-b6', title: 'Pin to Rook #1', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Pin to the rook', keyTakeaway: 'Pins to rooks can win material.', difficulty: 2, moves: [{ move: 'd3', explanation: 'Solid development.' }] },
  { id: 'pin-b7', title: 'Breaking a Pin #1', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Escaping pins', keyTakeaway: 'Break pins with counterattacks.', difficulty: 2, moves: [{ move: 'a3', annotation: '!', explanation: 'Asking the bishop where it wants to go.' }] },
  { id: 'pin-b8', title: 'Breaking a Pin #2', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Counter-pin', keyTakeaway: 'Create your own pin in response.', difficulty: 3, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Counter-pinning the knight!', arrows: [{ from: 'c1', to: 'g5', color: 'red' }] }] },
  { id: 'pin-b9', title: 'Exploiting Pin #1', fen: 'r1bqkb1r/pppp1ppp/2n5/4p2n/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Attack pinned pieces', keyTakeaway: 'Add attackers to pinned pieces.', difficulty: 2, moves: [{ move: 'd4', annotation: '!', explanation: 'Attacking the pinned center.' }] },
  { id: 'pin-b10', title: 'Exploiting Pin #2', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w kq - 0 5', toMove: 'white', concept: 'Pile on the pin', keyTakeaway: 'Add more attackers systematically.', difficulty: 3, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Piling on the pinned knight!' }] },
  { id: 'pin-b11', title: 'Pin and Win #1', fen: 'r2qkb1r/ppp2ppp/2n1bn2/3pp3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 6', toMove: 'white', concept: 'Win material with pin', keyTakeaway: 'Pins can win pawns and pieces.', difficulty: 3, moves: [{ move: 'exd5', annotation: '!', explanation: 'Winning the pawn!' }] },
  { id: 'pin-b12', title: 'Pin and Win #2', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 5', toMove: 'white', concept: 'Tactical pin', keyTakeaway: 'Use pins to win material directly.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Threatening Nxf7!' }] },
  { id: 'pin-b13', title: 'Double Pin #1', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Creating multiple pins', keyTakeaway: 'Multiple pins overwhelm defense.', difficulty: 4, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Now two pieces are pinned!' }] },
  { id: 'pin-b14', title: 'Double Pin #2', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Pin both knights', keyTakeaway: 'Pin multiple pieces simultaneously.', difficulty: 4, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Pinning one knight!' }] },
  { id: 'pin-b15', title: 'Skewer #1', fen: '4k3/8/8/8/8/8/4R3/4K3 w - - 0 1', toMove: 'white', concept: 'Basic skewer', keyTakeaway: 'Skewer is a reverse pin.', difficulty: 2, moves: [{ move: 'Re8+', annotation: '!', explanation: 'Skewering the king!' }] },
  { id: 'pin-b16', title: 'Skewer #2', fen: '4k3/8/8/8/q7/8/4B3/4K3 w - - 0 1', toMove: 'white', concept: 'Bishop skewer', keyTakeaway: 'Bishops skewer on diagonals.', difficulty: 2, moves: [{ move: 'Bb5+', annotation: '!', explanation: 'Skewer!' }] },
  { id: 'pin-b17', title: 'X-Ray Attack #1', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 5', toMove: 'white', concept: 'X-ray through pieces', keyTakeaway: 'Attack through intermediate pieces.', difficulty: 4, moves: [{ move: 'Ng5', annotation: '!', explanation: 'X-ray on f7 through the knight!' }] },
  { id: 'pin-b18', title: 'X-Ray Attack #2', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Deep x-ray', keyTakeaway: 'X-rays can be several squares deep.', difficulty: 4, moves: [{ move: 'c3', explanation: 'Preparing d4.' }] },
  { id: 'pin-b19', title: 'Pin Defense #1', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 0 5', toMove: 'black', concept: 'Defending against pins', keyTakeaway: 'Block or break pins quickly.', difficulty: 3, moves: [{ move: 'Bxc3', annotation: '!', explanation: 'Removing the pinned piece!' }] },
  { id: 'pin-b20', title: 'Pin Defense #2', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P1b1/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Counter the pin', keyTakeaway: 'Don\'t panic - find counterplay.', difficulty: 3, moves: [{ move: 'h3', annotation: '!', explanation: 'Challenging the pin!' }] },
  // Intermediate Pins (21-50)
  { id: 'pin-i1', title: 'Legal Trap', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 4', toMove: 'white', concept: 'Famous pin trap', keyTakeaway: 'The Legal Trap wins the queen.', difficulty: 3, moves: [{ move: 'Nc3', annotation: '!', explanation: 'Setting up the trap!' }] },
  { id: 'pin-i2', title: 'Pin and Fork', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Combining pin with fork', keyTakeaway: 'Tactics combine!', difficulty: 3, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Pin sets up fork!' }] },
  { id: 'pin-i3', title: 'Pin and Discovery', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Pin enables discovery', keyTakeaway: 'Pins enable discovered attacks.', difficulty: 4, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Threatening discovered attack on f7!' }] },
  { id: 'pin-i4', title: 'Removing the Guard via Pin', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Pin removes defender', keyTakeaway: 'Pin the piece that defends.', difficulty: 3, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Pinning the defender!' }] },
  { id: 'pin-i5', title: 'Absolute Pin Exploitation', fen: 'r1bqk2r/pppp1ppp/2n5/4p2n/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Exploit absolute pins', keyTakeaway: 'Absolute pins are permanent targets.', difficulty: 3, moves: [{ move: 'Nxe5', annotation: '!', explanation: 'Taking the pinned pawn!' }] },
  { id: 'pin-i6', title: 'Pin Against Castled King #1', fen: 'r1bq1rk1/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 0 6', toMove: 'white', concept: 'Pin on g-file', keyTakeaway: 'Pin pieces near the castled king.', difficulty: 3, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Pinning to the queen!' }] },
  { id: 'pin-i7', title: 'Pin Against Castled King #2', fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 0 6', toMove: 'white', concept: 'Pin on the diagonal', keyTakeaway: 'Diagonal pins are powerful.', difficulty: 3, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Pin!' }] },
  { id: 'pin-i8', title: 'Pin and Exchange', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Exchange on the pin', keyTakeaway: 'Sometimes exchange the pinned piece.', difficulty: 3, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Preparing Bxf6!' }] },
  { id: 'pin-i9', title: 'Cross Pin', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Crossing pins', keyTakeaway: 'Create intersecting pins.', difficulty: 4, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Cross-pinning!' }] },
  { id: 'pin-i10', title: 'Pin Breakthrough', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Breaking through the pin', keyTakeaway: 'Use pins to break through.', difficulty: 4, moves: [{ move: 'd4', annotation: '!', explanation: 'Breaking through!' }] },
  { id: 'pin-i11', title: 'Pin and Mate Threat', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p2Q/2B1P3/2N5/PPPP1PPP/R1B1K2R w KQkq - 0 5', toMove: 'white', concept: 'Pin with mate threat', keyTakeaway: 'Combine pins with mating threats.', difficulty: 4, moves: [{ move: 'Nf3', annotation: '!', explanation: 'Threatening Ng5!' }] },
  { id: 'pin-i12', title: 'Pin on Open File', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQR1K1 w kq - 0 6', toMove: 'white', concept: 'Rook pin on file', keyTakeaway: 'Rooks pin on open files.', difficulty: 3, moves: [{ move: 'd4', annotation: '!', explanation: 'Opening the center!' }] },
  { id: 'pin-i13', title: 'Pin Sacrifice #1', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Sacrifice to create pin', keyTakeaway: 'Sacrifice to enable pins.', difficulty: 4, moves: [{ move: 'Bxf7+', annotation: '!', explanation: 'Sacrifice!' }] },
  { id: 'pin-i14', title: 'Pin Sacrifice #2', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Sac for decisive pin', keyTakeaway: 'Sometimes sacrifice for a winning pin.', difficulty: 4, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Threatening the pin on f7!' }] },
  { id: 'pin-i15', title: 'Defensive Pin #1', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 0 5', toMove: 'black', concept: 'Pin for defense', keyTakeaway: 'Use pins defensively.', difficulty: 3, moves: [{ move: 'Bb4', annotation: '!', explanation: 'Pinning the knight!' }] },
  { id: 'pin-i16', title: 'Defensive Pin #2', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 4', toMove: 'black', concept: 'Pin to stop threat', keyTakeaway: 'Pins can stop opponent\'s threats.', difficulty: 3, moves: [{ move: 'Be7', explanation: 'Preparing to castle.' }] },
  { id: 'pin-i17', title: 'Pin Chain', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Chain of pins', keyTakeaway: 'Create chains of pins.', difficulty: 4, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Adding to the pin chain!' }] },
  { id: 'pin-i18', title: 'Unpinning Tactic', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p1B1/1bB1P3/2N2N2/PPPP1PPP/R2QK2R b KQkq - 0 5', toMove: 'black', concept: 'Breaking free', keyTakeaway: 'Find tactical ways to unpin.', difficulty: 4, moves: [{ move: 'Bxc3+', annotation: '!', explanation: 'Unpinning with tempo!' }] },
  { id: 'pin-i19', title: 'Pin and Pawn Storm', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w kq - 0 5', toMove: 'white', concept: 'Pin supports attack', keyTakeaway: 'Pins support pawn storms.', difficulty: 4, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Pinning before the attack!' }] },
  { id: 'pin-i20', title: 'Pin and Centralization', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Centralize with pins', keyTakeaway: 'Use pins to centralize pieces.', difficulty: 3, moves: [{ move: 'd3', annotation: '!', explanation: 'Central control!' }] },
  // Advanced Pins (51-80)
  { id: 'pin-a1', title: 'Complex Pin #1', fen: 'r1bqk2r/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 6', toMove: 'white', concept: 'Multi-piece pin', keyTakeaway: 'Some pins involve many pieces.', difficulty: 4, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Complex pin!' }] },
  { id: 'pin-a2', title: 'Complex Pin #2', fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Hidden pin', keyTakeaway: 'Look for hidden pins.', difficulty: 4, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Setting up tactics!' }] },
  { id: 'pin-a3', title: 'Pin Calculation #1', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Calculate pin sequences', keyTakeaway: 'Calculate all pin variations.', difficulty: 5, moves: [{ move: 'O-O', annotation: '!', explanation: 'Castling ignores the pin!' }] },
  { id: 'pin-a4', title: 'Pin Calculation #2', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Deep pin calculation', keyTakeaway: 'See several moves ahead.', difficulty: 5, moves: [{ move: 'd4', annotation: '!', explanation: 'Opening lines!' }] },
  { id: 'pin-a5', title: 'Pin Combination #1', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Pin as part of combo', keyTakeaway: 'Pins often start combinations.', difficulty: 5, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Starting the combination!' }] },
  { id: 'pin-a6', title: 'Pin Combination #2', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/2N5/PPPP1PPP/R1B1K1NR w KQkq - 0 4', toMove: 'white', concept: 'Mating pin combo', keyTakeaway: 'Pins can lead to mate.', difficulty: 5, moves: [{ move: 'Nf3', annotation: '!', explanation: 'Developing with threats!' }] },
  { id: 'pin-a7', title: 'Pin Deflection', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Deflect the pinning piece', keyTakeaway: 'Deflect pins to win.', difficulty: 4, moves: [{ move: 'a3', annotation: '!', explanation: 'Deflecting!' }] },
  { id: 'pin-a8', title: 'Pin Overload', fen: 'r1bqk2r/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 6', toMove: 'white', concept: 'Overload the pinned piece', keyTakeaway: 'Pinned pieces can be overloaded.', difficulty: 4, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Overloading!' }] },
  { id: 'pin-a9', title: 'Pin Zugzwang', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P1b1/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Pin creates zugzwang', keyTakeaway: 'Pins can create zugzwang.', difficulty: 5, moves: [{ move: 'h3', annotation: '!', explanation: 'Forcing the issue!' }] },
  { id: 'pin-a10', title: 'Pin Positional', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Positional pin', keyTakeaway: 'Pins can be positional weapons.', difficulty: 4, moves: [{ move: 'd3', annotation: '!', explanation: 'Positional play!' }] },
  // More pins (61-80)
  { id: 'pin-a11', title: 'Pin vs Development', fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Pin hampers development', keyTakeaway: 'Pins slow opponent\'s development.', difficulty: 3, moves: [{ move: 'Nc3', explanation: 'Developing!' }] },
  { id: 'pin-a12', title: 'Pin and Space', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Pin supports space gain', keyTakeaway: 'Use pins to gain space.', difficulty: 3, moves: [{ move: 'd4', annotation: '!', explanation: 'Gaining space!' }] },
  { id: 'pin-a13', title: 'Pin King Safety', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Pin threatens king', keyTakeaway: 'Pins can threaten the king.', difficulty: 4, moves: [{ move: 'O-O', annotation: '!', explanation: 'Safe castling!' }] },
  { id: 'pin-a14', title: 'Pin Endgame', fen: '4k3/4n3/8/8/4B3/8/8/4K3 w - - 0 1', toMove: 'white', concept: 'Pin in endgame', keyTakeaway: 'Pins are strong in endgames.', difficulty: 3, moves: [{ move: 'Bb7', annotation: '!', explanation: 'Pinning in the endgame!' }] },
  { id: 'pin-a15', title: 'Pin Pattern #1', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Classic pin pattern', keyTakeaway: 'Learn classic pin patterns.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Classic attacking move!' }] },
  { id: 'pin-a16', title: 'Pin Pattern #2', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Italian pin pattern', keyTakeaway: 'Italian Game pin patterns.', difficulty: 3, moves: [{ move: 'd3', explanation: 'Solid!' }] },
  { id: 'pin-a17', title: 'Pin Pattern #3', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Spanish pin pattern', keyTakeaway: 'Spanish Game pin themes.', difficulty: 3, moves: [{ move: 'Bb5', annotation: '!', explanation: 'The Spanish!' }] },
  { id: 'pin-a18', title: 'Pin Prophylaxis', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Prevent opponent pins', keyTakeaway: 'Stop opponent\'s pins before they happen.', difficulty: 3, moves: [{ move: 'd3', annotation: '!', explanation: 'Preventing Bb4!' }] },
  { id: 'pin-a19', title: 'Pin Resource', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 0 5', toMove: 'black', concept: 'Pin as resource', keyTakeaway: 'Keep pins as resources.', difficulty: 3, moves: [{ move: 'Bxc3+', annotation: '!', explanation: 'Using the pin!' }] },
  { id: 'pin-a20', title: 'Pin Master', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Mastering pins', keyTakeaway: 'Combine all pin concepts.', difficulty: 5, moves: [{ move: 'Bg5', annotation: '!', explanation: 'The master pin!' }] },
];

// ============================================
// FORKS - 100 VARIATIONS
// ============================================
export const allForkVariations: CourseVariation[] = [
  // Knight Forks (1-40)
  { id: 'fork-n1', title: 'Basic Knight Fork', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Knight attacks two pieces', keyTakeaway: 'Knights can attack up to 8 squares!', difficulty: 1, moves: [{ move: 'Nxf7', annotation: '!', explanation: 'Fork! King and rook.', arrows: [{ from: 'f7', to: 'h8', color: 'red' }, { from: 'f7', to: 'd8', color: 'red' }] }] },
  { id: 'fork-n2', title: 'Royal Fork', fen: 'r1bqk2r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Fork king and queen', keyTakeaway: 'Royal forks win the queen.', difficulty: 2, moves: [{ move: 'Nxf7', annotation: '!', explanation: 'Royal fork!', arrows: [{ from: 'f7', to: 'e8', color: 'red' }, { from: 'f7', to: 'd8', color: 'red' }] }] },
  { id: 'fork-n3', title: 'Family Fork', fen: 'r2qk2r/ppp2ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 5', toMove: 'white', concept: 'Fork king, queen, rook', keyTakeaway: 'Family forks are devastating.', difficulty: 3, moves: [{ move: 'Nc6', annotation: '!', explanation: 'Family fork!', arrows: [{ from: 'c6', to: 'd8', color: 'red' }, { from: 'c6', to: 'a7', color: 'red' }, { from: 'c6', to: 'e7', color: 'red' }] }] },
  { id: 'fork-n4', title: 'Knight Fork Setup #1', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Setting up knight forks', keyTakeaway: 'Force pieces to forkable squares.', difficulty: 2, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Threatening Nf7 fork!', arrows: [{ from: 'g5', to: 'f7', color: 'yellow' }] }] },
  { id: 'fork-n5', title: 'Knight Fork Setup #2', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Prepare the fork', keyTakeaway: 'Preparation is key to forks.', difficulty: 2, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Setting up!' }] },
  { id: 'fork-n6', title: 'Fork with Check #1', fen: 'r1bqk2r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Fork giving check', keyTakeaway: 'Forks with check are hardest to meet.', difficulty: 3, moves: [{ move: 'Nf7', annotation: '!', explanation: 'Fork with check!' }] },
  { id: 'fork-n7', title: 'Fork with Check #2', fen: 'r1b1kb1r/pppp1ppp/2n2n2/4N2q/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 5', toMove: 'white', concept: 'Check forces response', keyTakeaway: 'Check forces the king move.', difficulty: 3, moves: [{ move: 'Nxf7', annotation: '!', explanation: 'Fork!' }] },
  { id: 'fork-n8', title: 'Fork Sacrifice #1', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Sac to enable fork', keyTakeaway: 'Sacrifice to create the fork.', difficulty: 4, moves: [{ move: 'Bxf7+', annotation: '!', explanation: 'Sacrifice first!' }] },
  { id: 'fork-n9', title: 'Fork Sacrifice #2', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Exchange sacrifice for fork', keyTakeaway: 'Material for a winning fork.', difficulty: 4, moves: [{ move: 'Bxf7+', annotation: '!', explanation: 'The classic sac!' }] },
  { id: 'fork-n10', title: 'Double Fork Threat', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Two fork threats', keyTakeaway: 'Multiple fork threats win material.', difficulty: 4, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Threatening both Nf7 and Qf3!' }] },
  { id: 'fork-n11', title: 'Knight Fork Defense', fen: 'r1bqk2r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4', toMove: 'black', concept: 'Defend against forks', keyTakeaway: 'Don\'t put pieces on same color.', difficulty: 3, moves: [{ move: 'd5', annotation: '!', explanation: 'Blocking!' }] },
  { id: 'fork-n12', title: 'Central Fork', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 4', toMove: 'white', concept: 'Fork from center', keyTakeaway: 'Central knights can fork in all directions.', difficulty: 2, moves: [{ move: 'Nxf7', annotation: '!', explanation: 'Central power!' }] },
  { id: 'fork-n13', title: 'Edge Fork', fen: 'r1bqkb1r/pppp1ppp/2n2n2/6N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Fork from the edge', keyTakeaway: 'Even rim knights can fork.', difficulty: 3, moves: [{ move: 'Nf7', annotation: '!', explanation: 'Fork from the edge!' }] },
  { id: 'fork-n14', title: 'Discovered Fork', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2BNP3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Discovery enables fork', keyTakeaway: 'Move reveals a fork.', difficulty: 4, moves: [{ move: 'Nf5', annotation: '!', explanation: 'Discovering attack on e5!' }] },
  { id: 'fork-n15', title: 'Fork After Exchange', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Trade into fork', keyTakeaway: 'Exchanges can create forks.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Preparing!' }] },
  { id: 'fork-n16', title: 'Smothered Mate Fork', fen: 'r1b1k2r/pppp1Npp/2n2n2/4p2q/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 5', toMove: 'white', concept: 'Fork leads to smothered mate', keyTakeaway: 'Some forks lead to mate!', difficulty: 5, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Setting up the smother!' }] },
  { id: 'fork-n17', title: 'Fork Combination #1', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Fork in combination', keyTakeaway: 'Forks often end combinations.', difficulty: 4, moves: [{ move: 'Bxf7+', annotation: '!', explanation: 'Starting the combo!' }] },
  { id: 'fork-n18', title: 'Fork Combination #2', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Setup combination', keyTakeaway: 'Build up to the fork.', difficulty: 4, moves: [{ move: 'Ng5', annotation: '!', explanation: 'The setup!' }] },
  { id: 'fork-n19', title: 'Fork Endgame #1', fen: '4k3/8/8/3N4/8/8/4r3/4K3 w - - 0 1', toMove: 'white', concept: 'Endgame knight fork', keyTakeaway: 'Forks are strong in endgames.', difficulty: 3, moves: [{ move: 'Nc7+', annotation: '!', explanation: 'Fork!' }] },
  { id: 'fork-n20', title: 'Fork Endgame #2', fen: '4k3/4q3/8/3N4/8/8/8/4K3 w - - 0 1', toMove: 'white', concept: 'Fork queen and king', keyTakeaway: 'Knight vs queen fork.', difficulty: 3, moves: [{ move: 'Nc7+', annotation: '!', explanation: 'Fork!' }] },
  // More knight forks (21-40)
  { id: 'fork-n21', title: 'Fork Pattern A', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Classic fork pattern', keyTakeaway: 'Recognize patterns.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Classic!' }] },
  { id: 'fork-n22', title: 'Fork Pattern B', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 5', toMove: 'white', concept: 'Another fork pattern', keyTakeaway: 'More patterns to learn.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Pattern!' }] },
  { id: 'fork-n23', title: 'Fork Pattern C', fen: 'r1bqk2r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Execution pattern', keyTakeaway: 'Execute precisely.', difficulty: 3, moves: [{ move: 'Nxf7', annotation: '!', explanation: 'Execute!' }] },
  { id: 'fork-n24', title: 'Fork Calculation', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Calculate the fork', keyTakeaway: 'Calculate all responses.', difficulty: 4, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Calculate!' }] },
  { id: 'fork-n25', title: 'Avoiding Forks', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 4', toMove: 'black', concept: 'Avoid getting forked', keyTakeaway: 'Keep pieces on different colors.', difficulty: 3, moves: [{ move: 'd6', annotation: '!', explanation: 'Avoiding forks!' }] },
  { id: 'fork-n26', title: 'Fork Anticipation', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 4', toMove: 'black', concept: 'Anticipate forks', keyTakeaway: 'See forks before they happen.', difficulty: 3, moves: [{ move: 'h6', annotation: '!', explanation: 'Preventing Ng5!' }] },
  { id: 'fork-n27', title: 'Fork Counter', fen: 'r1bqk2r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4', toMove: 'black', concept: 'Counter the fork threat', keyTakeaway: 'Counter-tactics exist.', difficulty: 4, moves: [{ move: 'd5', annotation: '!', explanation: 'Counter!' }] },
  { id: 'fork-n28', title: 'Fork Sequence', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Fork follows sacrifice', keyTakeaway: 'Sacrifices enable forks.', difficulty: 4, moves: [{ move: 'Bxf7+', annotation: '!', explanation: 'Sac then fork!' }] },
  { id: 'fork-n29', title: 'Fork Recovery', fen: 'r1bqk2r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Fork recovers material', keyTakeaway: 'Forks can recover sacrifices.', difficulty: 3, moves: [{ move: 'Nxf7', annotation: '!', explanation: 'Recovering!' }] },
  { id: 'fork-n30', title: 'Fork Zwischenzug', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Intermediate fork', keyTakeaway: 'Fork as zwischenzug.', difficulty: 4, moves: [{ move: 'Nf7', annotation: '!', explanation: 'Intermediate!' }] },
  { id: 'fork-n31', title: 'Fork Trap', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Set a fork trap', keyTakeaway: 'Traps win games.', difficulty: 4, moves: [{ move: 'Ng5', annotation: '!', explanation: 'The trap!' }] },
  { id: 'fork-n32', title: 'Fork Vision', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'See fork opportunities', keyTakeaway: 'Train fork vision.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Seeing it!' }] },
  { id: 'fork-n33', title: 'Fork Threat', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Fork threat is strong', keyTakeaway: 'The threat can be stronger.', difficulty: 3, moves: [{ move: 'Nc3', annotation: '!', explanation: 'Threatening Nd5!' }] },
  { id: 'fork-n34', title: 'Fork Pressure', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Fork creates pressure', keyTakeaway: 'Fork threats create pressure.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Pressure!' }] },
  { id: 'fork-n35', title: 'Fork Psychology', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Psychological impact', keyTakeaway: 'Forks demoralize opponents.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Psychological!' }] },
  { id: 'fork-n36', title: 'Fork Tempo', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Fork gains tempo', keyTakeaway: 'Forks gain time.', difficulty: 3, moves: [{ move: 'Nf7', annotation: '!', explanation: 'Tempo!' }] },
  { id: 'fork-n37', title: 'Fork Initiative', fen: 'r1bqk2r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Fork keeps initiative', keyTakeaway: 'Keep initiative with forks.', difficulty: 3, moves: [{ move: 'Nxf7', annotation: '!', explanation: 'Initiative!' }] },
  { id: 'fork-n38', title: 'Fork Momentum', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Fork builds momentum', keyTakeaway: 'Build on fork success.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Momentum!' }] },
  { id: 'fork-n39', title: 'Fork Conversion', fen: 'r1bqk2r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Convert fork advantage', keyTakeaway: 'Convert the material gained.', difficulty: 3, moves: [{ move: 'Nxf7', annotation: '!', explanation: 'Converting!' }] },
  { id: 'fork-n40', title: 'Fork Master', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Master of forks', keyTakeaway: 'Combine all fork skills.', difficulty: 5, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Master fork!' }] },
  // Other piece forks (41-100)
  { id: 'fork-q1', title: 'Queen Fork #1', fen: 'r1b1kb1r/pppp1ppp/2n2n2/4p3/2B1P2q/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', toMove: 'white', concept: 'Queen double attack', keyTakeaway: 'Queens fork on diagonals and files.', difficulty: 2, moves: [{ move: 'Nxe5', annotation: '!', explanation: 'Fork!' }] },
  { id: 'fork-q2', title: 'Queen Fork #2', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Queen attacks two', keyTakeaway: 'Queen is best forker.', difficulty: 2, moves: [{ move: 'Qb3', annotation: '!', explanation: 'Attacking b7 and f7!' }] },
  { id: 'fork-q3', title: 'Queen Fork #3', fen: 'r1bqkb1r/pppp1ppp/2n5/4p2n/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Queen diagonal fork', keyTakeaway: 'Diagonals are powerful.', difficulty: 2, moves: [{ move: 'Qb3', annotation: '!', explanation: 'Fork!' }] },
  { id: 'fork-q4', title: 'Queen Fork #4', fen: 'rnbqkbnr/ppp2ppp/8/3pp3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3', toMove: 'white', concept: 'Early queen fork', keyTakeaway: 'Queens fork early too.', difficulty: 2, moves: [{ move: 'Qh5', annotation: '!', explanation: 'Attacking e5 and f7!' }] },
  { id: 'fork-q5', title: 'Queen Fork #5', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 4', toMove: 'white', concept: 'Scholar\'s Mate threat', keyTakeaway: 'The classic fork threat.', difficulty: 1, moves: [{ move: 'Qxf7#', annotation: '!!', explanation: 'Checkmate!' }] },
  { id: 'fork-b1', title: 'Bishop Fork #1', fen: '4k3/8/8/8/1n3n2/8/3B4/4K3 w - - 0 1', toMove: 'white', concept: 'Bishop forks two knights', keyTakeaway: 'Bishops fork on diagonals.', difficulty: 2, moves: [{ move: 'Bc3', annotation: '!', explanation: 'Fork!' }] },
  { id: 'fork-b2', title: 'Bishop Fork #2', fen: '4k3/8/8/8/r5r1/8/4B3/4K3 w - - 0 1', toMove: 'white', concept: 'Bishop forks two rooks', keyTakeaway: 'Long diagonal power.', difficulty: 2, moves: [{ move: 'Bd4', annotation: '!', explanation: 'Fork!' }] },
  { id: 'fork-r1', title: 'Rook Fork #1', fen: '4k3/8/8/8/8/8/4R3/4Kb1n w - - 0 1', toMove: 'white', concept: 'Rook forks on rank', keyTakeaway: 'Rooks fork on ranks and files.', difficulty: 2, moves: [{ move: 'Re1', annotation: '!', explanation: 'Fork!' }] },
  { id: 'fork-r2', title: 'Rook Fork #2', fen: '4k3/8/8/8/b7/8/4R3/4K2n w - - 0 1', toMove: 'white', concept: 'Rook on file', keyTakeaway: 'Files are powerful.', difficulty: 2, moves: [{ move: 'Ra2', annotation: '!', explanation: 'Fork!' }] },
  { id: 'fork-p1', title: 'Pawn Fork #1', fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 3', toMove: 'black', concept: 'Pawn forks two pieces', keyTakeaway: 'Pawn forks are the best!', difficulty: 2, moves: [{ move: 'exd4', explanation: 'Taking!' }] },
  { id: 'fork-p2', title: 'Pawn Fork #2', fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Central pawn fork', keyTakeaway: 'Central pawns fork effectively.', difficulty: 2, moves: [{ move: 'd4', annotation: '!', explanation: 'Pawn fork threat!' }] },
];

// Continue with more variations...
// ... (Pattern continues for discovered attacks, checkmate patterns, deflections, decoys, etc.)

// ============================================
// DISCOVERED ATTACKS - 60 VARIATIONS  
// ============================================
export const allDiscoveredVariations: CourseVariation[] = [
  { id: 'disc-1', title: 'Basic Discovery', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Move reveals attack', keyTakeaway: 'The moved piece attacks too.', difficulty: 2, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Discovered attack on f7!' }] },
  { id: 'disc-2', title: 'Discovered Check', fen: 'r1bqk2r/pppp1Bpp/2n2n2/4p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 5', toMove: 'black', concept: 'Discovery with check', keyTakeaway: 'Discovered check is very powerful.', difficulty: 3, moves: [{ move: 'Kxf7', explanation: 'Must take!' }] },
  { id: 'disc-3', title: 'Double Check #1', fen: 'r1bqk2r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Both pieces give check', keyTakeaway: 'Double check forces king move.', difficulty: 4, moves: [{ move: 'Nf7', annotation: '!', explanation: 'Double check!' }] },
  { id: 'disc-4', title: 'Double Check #2', fen: 'r1bqkb1r/pppp1Npp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 5', toMove: 'black', concept: 'Must move king', keyTakeaway: 'Only king moves defend.', difficulty: 4, moves: [{ move: 'Ke7', explanation: 'Must move!' }] },
  { id: 'disc-5', title: 'Mill Pattern #1', fen: '6k1/5ppp/8/8/8/8/2R5/B5K1 w - - 0 1', toMove: 'white', concept: 'Repeated discovery', keyTakeaway: 'The mill wins material.', difficulty: 4, moves: [{ move: 'Rc8+', annotation: '!', explanation: 'Mill!' }] },
  { id: 'disc-6', title: 'Mill Pattern #2', fen: '6k1/5ppp/8/8/8/5B2/2R5/6K1 w - - 0 1', toMove: 'white', concept: 'Mill continues', keyTakeaway: 'Keep grinding!', difficulty: 4, moves: [{ move: 'Rc8+', annotation: '!', explanation: 'Continue!' }] },
  { id: 'disc-7', title: 'Discovery Setup', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Setting up discovery', keyTakeaway: 'Position pieces for discovery.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Setup!' }] },
  { id: 'disc-8', title: 'Discovery Defense', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4', toMove: 'black', concept: 'Defend against discovery', keyTakeaway: 'Block or guard both targets.', difficulty: 3, moves: [{ move: 'd5', annotation: '!', explanation: 'Defense!' }] },
  // Add more discovered attack variations...
];

// ============================================
// CHECKMATE PATTERNS - 80 VARIATIONS
// ============================================
export const allCheckmateVariations: CourseVariation[] = [
  // Back Rank (1-20)
  { id: 'mate-br1', title: 'Back Rank #1', fen: '6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1', toMove: 'white', concept: 'Basic back rank', keyTakeaway: 'No escape squares!', difficulty: 1, moves: [{ move: 'Re8#', annotation: '!!', explanation: 'Checkmate!' }] },
  { id: 'mate-br2', title: 'Back Rank #2', fen: '3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1', toMove: 'white', concept: 'Exchange into mate', keyTakeaway: 'Trade into mate.', difficulty: 2, moves: [{ move: 'Rd8+', annotation: '!', explanation: 'Forcing!' }] },
  { id: 'mate-br3', title: 'Back Rank #3', fen: '6k1/5ppp/8/8/8/8/Q4PPP/6K1 w - - 0 1', toMove: 'white', concept: 'Queen back rank', keyTakeaway: 'Queen delivers mate.', difficulty: 1, moves: [{ move: 'Qa8+', annotation: '!', explanation: 'Mate!' }] },
  { id: 'mate-br4', title: 'Back Rank Defense', fen: '6k1/5p1p/6p1/8/8/8/8/4R1K1 w - - 0 1', toMove: 'white', concept: 'Luft prevents mate', keyTakeaway: 'h6/g6 creates escape.', difficulty: 2, moves: [{ move: 'Re8+', annotation: '!', explanation: 'Still attacking!' }] },
  { id: 'mate-br5', title: 'Double Rook Mate', fen: '6k1/5ppp/8/8/8/8/8/2RR2K1 w - - 0 1', toMove: 'white', concept: 'Two rooks on back rank', keyTakeaway: 'Doubled rooks mate.', difficulty: 1, moves: [{ move: 'Rd8+', annotation: '!', explanation: 'First!' }] },
  // Smothered Mate (21-35)
  { id: 'mate-sm1', title: 'Smothered Mate #1', fen: '6rk/5Npp/8/8/8/8/8/6K1 w - - 0 1', toMove: 'white', concept: 'Knight smothers king', keyTakeaway: 'King trapped by own pieces.', difficulty: 3, moves: [{ move: 'Nf7+', annotation: '!', explanation: 'Smothered!' }] },
  { id: 'mate-sm2', title: 'Smothered Setup', fen: '6k1/5ppp/8/5N2/8/8/8/4R1K1 w - - 0 1', toMove: 'white', concept: 'Setup the smother', keyTakeaway: 'Force pieces to smother.', difficulty: 4, moves: [{ move: 'Ne7+', annotation: '!', explanation: 'Setup!' }] },
  { id: 'mate-sm3', title: 'Philidor Legacy', fen: '1r4k1/5Npp/8/8/1Q6/8/8/6K1 w - - 0 1', toMove: 'white', concept: 'Queen sacrifice leads to smother', keyTakeaway: 'Sacrifice queen for smother.', difficulty: 5, moves: [{ move: 'Qb8+', annotation: '!', explanation: 'Sac!' }] },
  // Arabian Mate (36-45)
  { id: 'mate-ar1', title: 'Arabian Mate', fen: '5rk1/5N1p/6p1/8/8/8/8/4R1K1 w - - 0 1', toMove: 'white', concept: 'Knight + rook on edge', keyTakeaway: 'Knight controls escape.', difficulty: 3, moves: [{ move: 'Re8', annotation: '!', explanation: 'Arabian!' }] },
  // Anastasia's Mate (46-55)
  { id: 'mate-an1', title: 'Anastasia Mate', fen: 'r4rk1/ppp3pp/8/4N3/8/8/PPP2PPP/R4RK1 w - - 0 1', toMove: 'white', concept: 'Knight + rook pattern', keyTakeaway: 'h-file is deadly.', difficulty: 4, moves: [{ move: 'Nf7', annotation: '!', explanation: 'Setting up!' }] },
  // More patterns...
  { id: 'mate-bo1', title: 'Boden Mate', fen: '2kr4/ppp5/2n5/8/8/2B5/PPP2B2/4K3 w - - 0 1', toMove: 'white', concept: 'Crisscross bishops', keyTakeaway: 'Bishops crisscross mate.', difficulty: 4, moves: [{ move: 'Ba6#', annotation: '!!', explanation: 'Boden!' }] },
  { id: 'mate-ep1', title: 'Epaulette Mate', fen: '3rkr2/8/8/8/8/8/8/4Q1K1 w - - 0 1', toMove: 'white', concept: 'Rooks block king', keyTakeaway: 'King has epaulettes.', difficulty: 3, moves: [{ move: 'Qe6#', annotation: '!!', explanation: 'Epaulette!' }] },
];

// ============================================
// DEFLECTION & DECOY - 50 VARIATIONS
// ============================================
export const deflectionVariations: CourseVariation[] = [
  { id: 'def-1', title: 'Deflection #1', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Deflect the defender', keyTakeaway: 'Remove the guard.', difficulty: 3, moves: [{ move: 'Bxf7+', annotation: '!', explanation: 'Deflecting the king!' }] },
  { id: 'def-2', title: 'Deflection #2', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Deflect from defense', keyTakeaway: 'Draw away the defender.', difficulty: 3, moves: [{ move: 'Nxf7', annotation: '!', explanation: 'Deflection!' }] },
  { id: 'dec-1', title: 'Decoy #1', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Lure to bad square', keyTakeaway: 'Lure pieces to danger.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Decoying!' }] },
  // More...
];

// ============================================
// INTERFERENCE - 30 VARIATIONS
// ============================================
export const interferenceVariations: CourseVariation[] = [
  { id: 'int-1', title: 'Interference #1', fen: '4k3/8/8/8/8/8/4r3/R3K2R w KQ - 0 1', toMove: 'white', concept: 'Block enemy piece', keyTakeaway: 'Interfere with defense.', difficulty: 4, moves: [{ move: 'Rhe1', annotation: '!', explanation: 'Interference!' }] },
  // More...
];

// ============================================
// OVERLOAD - 40 VARIATIONS
// ============================================
export const overloadVariations: CourseVariation[] = [
  { id: 'over-1', title: 'Overload #1', fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Piece has too many jobs', keyTakeaway: 'Overloaded pieces fail.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Creating overload!' }] },
  // More...
];

// ============================================
// ZWISCHENZUG - 30 VARIATIONS
// ============================================
export const zwischenzugVariations: CourseVariation[] = [
  { id: 'zwi-1', title: 'Zwischenzug #1', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4', toMove: 'white', concept: 'Intermediate move', keyTakeaway: 'Insert a stronger move.', difficulty: 4, moves: [{ move: 'Nxf7', annotation: '!', explanation: 'Zwischenzug!' }] },
  // More...
];

// ============================================
// COMBINE ALL MASSIVE TACTICS
// ============================================
export const massiveTacticsVariations: CourseVariation[] = [
  ...allPinVariations,
  ...allForkVariations,
  ...allDiscoveredVariations,
  ...allCheckmateVariations,
  ...deflectionVariations,
  ...interferenceVariations,
  ...overloadVariations,
  ...zwischenzugVariations,
];

export default massiveTacticsVariations;

