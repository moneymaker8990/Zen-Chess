// ============================================
// PLAY THE GREATS - TYPE DEFINITIONS
// ============================================

export type LegendId = 
  | "fischer" 
  | "capablanca" 
  | "steinitz" 
  | "alekhine" 
  | "spassky"
  | "kasparov"
  | "karpov"
  | "tal"
  | "botvinnik"
  | "morphy"
  | "carlsen"
  | "lasker";

export type LegendBio = {
  fullName: string;
  born: string;
  died?: string;
  nationality: string;
  worldChampion?: string;  // Years held title
  peakRating?: number;
  titles: string[];
  biography: string;       // Rich paragraph about their life and legacy
  playingStyle: string;    // Detailed description of how they played
  whatMakesThemGreat: string[];  // Key points about their greatness
  famousGames: string[];   // Notable games to study
  famousQuotes?: string[];
  legacy: string;          // Their lasting impact on chess
};

export type LegendStyle = {
  name: string;
  description: string;
  tagline: string;
  styleTags: string[];
  aggressiveness: number;       // 0-1, higher = prefers sharp attacks
  simplifyBias: number;         // 0-1, higher = prefers exchanges, endgames
  kingSafetyBias: number;       // 0-1, how much it cares about king cover
  materialism: number;          // 0-1, lower = more willing to sacrifice
  bio: LegendBio;
};

export const LEGEND_STYLES: Record<LegendId, LegendStyle> = {
  fischer: {
    name: "Bobby Fischer",
    tagline: "Razor-sharp initiative, universal strength.",
    description: "Dynamic, principled, attacks built on sound prep.",
    styleTags: ["attacking", "dynamic", "opening prep", "king hunts"],
    aggressiveness: 0.8,
    simplifyBias: 0.3,
    kingSafetyBias: 0.7,
    materialism: 0.6,
    bio: {
      fullName: "Robert James Fischer",
      born: "March 9, 1943 – Chicago, Illinois",
      died: "January 17, 2008 – Reykjavik, Iceland",
      nationality: "American",
      worldChampion: "1972–1975",
      peakRating: 2785,
      titles: ["World Champion", "U.S. Champion (8×)", "Interzonal Winner", "Candidates Winner"],
      biography: "Bobby Fischer is widely considered the greatest chess prodigy in history. He became the youngest U.S. Champion at 14, the youngest Grandmaster at 15, and achieved the highest rating ever recorded at the time. His 1972 World Championship victory over Boris Spassky in Reykjavik became a Cold War symbol, drawing unprecedented global attention to chess. Fischer's perfectionism and singular focus on chess created both his brilliance and his troubled relationship with the chess world.",
      playingStyle: "Fischer combined deep opening preparation with crystal-clear positional understanding and razor-sharp tactical vision. He played principled chess, rarely making compromises, and his technique in converting advantages was legendary. He excelled in all phases of the game but was particularly devastating when seizing the initiative. His games feature clean logic, powerful piece activity, and relentless attacks on any weakness.",
      whatMakesThemGreat: [
        "Perfect preparation – he knew opening theory better than anyone of his era",
        "Universal strength – equally dangerous in open and closed positions",
        "Psychological dominance – opponents often collapsed under the pressure of his reputation",
        "Endgame technique that rivaled Capablanca's precision",
        "Uncompromising fighting spirit – he played every game to win"
      ],
      famousGames: [
        "Fischer vs Byrne, 1956 ('Game of the Century')",
        "Fischer vs Spassky, 1972 Game 6 (the Queen's Gambit masterpiece)",
        "Fischer vs Larsen, 1971 (Candidates final, 6-0 sweep)"
      ],
      famousQuotes: [
        "I don't believe in psychology. I believe in good moves.",
        "Chess is life.",
        "All I want to do, ever, is just play chess."
      ],
      legacy: "Fischer single-handedly elevated chess to mainstream consciousness in the West. His '60 Memorable Games' remains essential study material. He inspired generations of American players and proved that one individual could challenge Soviet chess hegemony through sheer talent and determination."
    }
  },
  capablanca: {
    name: "José Raúl Capablanca",
    tagline: "Endgame machine, crystal-clear simplicity.",
    description: "Simplicity, clarity, and endgame dominance.",
    styleTags: ["endgames", "clarity", "simplicity", "small advantages"],
    aggressiveness: 0.4,
    simplifyBias: 0.9,
    kingSafetyBias: 0.8,
    materialism: 0.9,
    bio: {
      fullName: "José Raúl Capablanca y Graupera",
      born: "November 19, 1888 – Havana, Cuba",
      died: "March 8, 1942 – New York City",
      nationality: "Cuban",
      worldChampion: "1921–1927",
      titles: ["World Champion", "Cuban Champion", "Grand Master"],
      biography: "Capablanca learned chess at age four by watching his father play, and by age twelve had defeated the Cuban champion. Known as 'The Chess Machine' for his seemingly effortless play, he lost only 34 serious games in his entire career. His natural talent was so immense that he rarely studied, relying instead on pure intuition and understanding. He was also renowned for his charm, good looks, and diplomatic career alongside chess.",
      playingStyle: "Capablanca's style was the epitome of simplicity and clarity. He avoided complications when possible, preferring to outplay opponents through superior technique. His piece coordination was sublime, his endgame play nearly flawless. He had an uncanny ability to simplify positions while maintaining small but decisive advantages. Every move seemed effortless, making the most complex positions appear simple.",
      whatMakesThemGreat: [
        "Virtually unbeatable in his prime – went 8 years without losing a serious game",
        "Supreme endgame technique that set the standard for generations",
        "Incredible natural intuition – he 'saw' the right moves instantly",
        "Masterful simplification – could win with tiny advantages others couldn't exploit",
        "Speed of thought that made him devastating in rapid play"
      ],
      famousGames: [
        "Capablanca vs Marshall, 1918 (Marshall Attack refutation)",
        "Capablanca vs Tartakower, 1924 (famous endgame with two bishops)",
        "Capablanca vs Spielmann, 1927 (beautiful attacking game)"
      ],
      famousQuotes: [
        "A good player is always lucky.",
        "Chess books should be used as we use glasses: to assist the sight, although some players make use of them as if they thought they conferred sight.",
        "You may learn much more from a game you lose than from a game you win."
      ],
      legacy: "Capablanca's endgame technique remains the gold standard. His games are studied for their clarity and efficiency. He showed that chess could be beautiful through simplicity rather than complications, influencing generations of technical players including Karpov and Carlsen."
    }
  },
  steinitz: {
    name: "Wilhelm Steinitz",
    tagline: "Positional foundations, defense then counterattack.",
    description: "Accumulate advantages, defend then counter.",
    styleTags: ["positional", "accumulating advantage", "defensive ideas"],
    aggressiveness: 0.5,
    simplifyBias: 0.7,
    kingSafetyBias: 0.9,
    materialism: 0.8,
    bio: {
      fullName: "Wilhelm Steinitz",
      born: "May 17, 1836 – Prague, Austrian Empire",
      died: "August 12, 1900 – New York City",
      nationality: "Austrian-American",
      worldChampion: "1886–1894",
      titles: ["First Official World Champion", "London Champion", "Chess Theorist"],
      biography: "Wilhelm Steinitz was the first official World Chess Champion and the father of modern chess theory. In an era of romantic, sacrificial chess, Steinitz revolutionized the game by developing positional principles that remain fundamental today. He proved that advantages must be accumulated gradually and that defense could be a powerful weapon. Despite facing ridicule for his 'boring' style, his methods were eventually vindicated and became the foundation of all modern chess.",
      playingStyle: "Steinitz pioneered the accumulation of small advantages – weak pawns, bad bishops, space disadvantages. Rather than seeking immediate attacks, he would methodically improve his position, restrict his opponent, then strike when the time was right. He was willing to accept cramped positions and defend stubbornly, trusting that correct play would eventually prevail. His king often remained in the center, defying conventional wisdom.",
      whatMakesThemGreat: [
        "Founded modern positional chess theory",
        "First to systematically study and teach chess principles",
        "Proved that sound defense could defeat wild attacks",
        "Developed the concept of accumulating small advantages",
        "His theoretical writings influenced every subsequent world champion"
      ],
      famousGames: [
        "Steinitz vs von Bardeleben, 1895 (immortal king walk)",
        "Steinitz vs Blackburne, 1876 (demonstrating the Steinitz Attack)",
        "Steinitz vs Zukertort, 1886 (first World Championship)"
      ],
      famousQuotes: [
        "Chess is not for timid souls.",
        "The King is a fighting piece. Use it!",
        "A sacrifice is best refuted by accepting it."
      ],
      legacy: "Every positional concept taught today traces back to Steinitz. He transformed chess from a gambling game of romantic attacks into a scientific discipline. His courage to defend his unpopular theories against the chess establishment showed that truth in chess, as in science, eventually prevails."
    }
  },
  alekhine: {
    name: "Alexander Alekhine",
    tagline: "Tactical brilliance, dynamic attacking genius.",
    description: "Creative, aggressive, master of complex positions and combinations.",
    styleTags: ["attacking", "tactical", "complex positions", "brilliant combinations"],
    aggressiveness: 0.9,
    simplifyBias: 0.3,
    kingSafetyBias: 0.5,
    materialism: 0.5,
    bio: {
      fullName: "Alexander Alexandrovich Alekhine",
      born: "October 31, 1892 – Moscow, Russian Empire",
      died: "March 24, 1946 – Estoril, Portugal",
      nationality: "Russian-French",
      worldChampion: "1927–1935, 1937–1946",
      titles: ["World Champion", "French Champion (multiple times)", "Grandmaster"],
      biography: "Alekhine was one of the most creative and aggressive world champions. Born into a wealthy Russian family, he fled the Revolution and eventually became a French citizen. He wrested the title from Capablanca in 1927 after epic preparation, lost it briefly to Euwe in 1935, then won it back two years later. He remains the only World Champion to die while holding the title. His combinations were legendary, and he was perhaps the greatest attacking player in classical chess history.",
      playingStyle: "Alekhine combined deep opening preparation with imaginative middlegame play and spectacular tactical vision. He loved complex positions where he could outmaneuver opponents. His attacks seemed to materialize out of quiet positions, building slowly before exploding with brilliant combinations. Unlike earlier attacking players, his aggression was backed by solid positional understanding.",
      whatMakesThemGreat: [
        "Perhaps the greatest combinative vision in chess history",
        "Pioneered deep opening preparation as a weapon",
        "Could create attacks in any type of position",
        "Legendary work ethic and analytical depth",
        "Only champion to regain the title after losing it"
      ],
      famousGames: [
        "Alekhine vs Réti, 1925 (stunning queen sacrifice)",
        "Alekhine vs Bogoljubov, 1922 (immortal combination)",
        "Alekhine vs Capablanca, 1927 Game 34 (winning the title)"
      ],
      famousQuotes: [
        "Chess for me is not a game, but an art.",
        "During a chess competition a chess master should be a combination of a beast of prey and a monk.",
        "I think, therefore I play chess."
      ],
      legacy: "Alekhine's games remain treasures of combinative brilliance. His four-volume 'My Best Games of Chess' is a masterclass in annotating your own games. He proved that deep preparation and creative vision could overcome pure natural talent, inspiring generations of fighting players."
    }
  },
  spassky: {
    name: "Boris Spassky",
    tagline: "Universal style, positional and tactical mastery.",
    description: "Versatile, adaptable, strong in all phases of the game.",
    styleTags: ["universal", "versatile", "positional", "tactical"],
    aggressiveness: 0.6,
    simplifyBias: 0.6,
    kingSafetyBias: 0.7,
    materialism: 0.7,
    bio: {
      fullName: "Boris Vasilyevich Spassky",
      born: "January 30, 1937 – Leningrad, USSR",
      nationality: "Russian-French",
      worldChampion: "1969–1972",
      peakRating: 2690,
      titles: ["World Champion", "USSR Champion (2×)", "World Junior Champion", "Grandmaster"],
      biography: "Boris Spassky survived the Siege of Leningrad as a child and became one of the most complete chess players ever. His journey to the World Championship was marked by heartbreaking failures before finally succeeding in 1969. Though remembered primarily for losing to Fischer in 1972, Spassky was a formidable champion with a universally respected playing style. He later moved to France and continued competing well into his 80s.",
      playingStyle: "Spassky's greatest strength was his universality – he had no weaknesses. Equally comfortable in sharp tactical battles or quiet positional maneuvering, he adapted his play to exploit each opponent's vulnerabilities. His calm demeanor at the board concealed a fierce competitive spirit. He excelled at the King's Gambit and other romantic openings while also being perfectly capable of grinding out technical victories.",
      whatMakesThemGreat: [
        "Complete universality – no exploitable weaknesses",
        "Exceptional attacking skills, especially in the King's Gambit",
        "Calm under pressure and sporting grace in victory and defeat",
        "Deep understanding of all phases of the game",
        "Longevity – competed at high level for over 50 years"
      ],
      famousGames: [
        "Spassky vs Bronstein, 1960 (King's Gambit brilliancy)",
        "Spassky vs Tal, 1958 (defeating the magician)",
        "Spassky vs Petrosian, 1969 Game 19 (clinching the title)"
      ],
      famousQuotes: [
        "The best indicator of a chess player's form is his ability to sense the critical moment.",
        "Chess is like life.",
        "I have always been interested not so much in moves as in the spirit of the position."
      ],
      legacy: "Spassky's sportsmanship during and after the 1972 match with Fischer earned him lasting respect. He demonstrated that one could be a fierce competitor while remaining a gentleman. His games showcase classical chess played at the highest level with remarkable balance and harmony."
    }
  },
  kasparov: {
    name: "Garry Kasparov",
    tagline: "Ferocious preparation, relentless pressure.",
    description: "Dominating attacks backed by legendary opening preparation and iron will.",
    styleTags: ["attacking", "preparation", "dynamic", "psychological pressure"],
    aggressiveness: 0.9,
    simplifyBias: 0.2,
    kingSafetyBias: 0.6,
    materialism: 0.5,
    bio: {
      fullName: "Garry Kimovich Kasparov",
      born: "April 13, 1963 – Baku, Azerbaijan SSR",
      nationality: "Russian",
      worldChampion: "1985–2000 (FIDE), 1993–2000 (Classical)",
      peakRating: 2851,
      titles: ["World Champion", "USSR Champion", "Russian Champion", "Highest Rating Ever (at retirement)"],
      biography: "Garry Kasparov dominated chess for two decades and is widely considered the greatest player of the 20th century. He became the youngest World Champion at 22 by defeating Karpov in a legendary match. His rivalry with Karpov produced 144 World Championship games – more than any other pairing in history. Kasparov revolutionized opening preparation and brought computers into chess training. After retiring from competitive chess in 2005, he became a political activist and author.",
      playingStyle: "Kasparov's chess was characterized by ferocious energy and relentless pressure. His opening preparation was unmatched – he would spend months preparing novelties that devastated opponents. In the middlegame, he specialized in dynamic positions where piece activity trumped material. His attacking prowess was legendary, and even when defending, he sought counterattacking chances. The psychological pressure of facing Kasparov was often as defeating as his moves.",
      whatMakesThemGreat: [
        "Revolutionary opening preparation that set new standards",
        "Unmatched fighting spirit – never gave up in any position",
        "Dominated the rating list for 20 consecutive years",
        "Pioneered the use of computers for chess preparation",
        "His presence at the board created immense psychological pressure"
      ],
      famousGames: [
        "Kasparov vs Topalov, 1999 (widely considered the greatest game ever played)",
        "Kasparov vs Karpov, 1985 Game 24 (winning the title)",
        "Kasparov vs Short, 1993 (elegant knight sacrifice)"
      ],
      famousQuotes: [
        "I am a fighter; I believe in that which lies behind me in history.",
        "Chess is mental torture.",
        "If you wish to succeed, you must brave the risk of failure."
      ],
      legacy: "Kasparov transformed chess into a more dynamic, computer-influenced game. His books and courses continue to educate players worldwide. He proved that combining natural talent with unprecedented preparation could achieve domination, and his games remain the benchmark for aggressive, dynamic play."
    }
  },
  karpov: {
    name: "Anatoly Karpov",
    tagline: "Boa constrictor, prophylaxis personified.",
    description: "Subtle positional pressure, slowly squeezing opponents into zugzwang.",
    styleTags: ["positional", "prophylaxis", "endgames", "technique"],
    aggressiveness: 0.3,
    simplifyBias: 0.7,
    kingSafetyBias: 0.9,
    materialism: 0.9,
    bio: {
      fullName: "Anatoly Yevgenyevich Karpov",
      born: "May 23, 1951 – Zlatoust, USSR",
      nationality: "Russian",
      worldChampion: "1975–1985 (Undisputed), 1993–1999 (FIDE)",
      peakRating: 2780,
      titles: ["World Champion", "USSR Champion (3×)", "Most tournament victories in history (160+)"],
      biography: "Anatoly Karpov became World Champion in 1975 when Fischer forfeited the title, but proved his worthiness by dominating chess for the next decade. His five World Championship matches against Kasparov are legendary battles between contrasting styles. Karpov has won more tournaments than any player in history, with over 160 first-place finishes. He combined chess with stamp collecting and political involvement, serving in the Russian Duma.",
      playingStyle: "Karpov's style is the embodiment of prophylaxis – preventing his opponent's plans while slowly improving his own position. He excels at restricting piece activity, creating small weaknesses, and squeezing positions until resistance becomes impossible. His technique has been compared to a boa constrictor – no sudden attacks, just gradual suffocation. His endgame play is flawless, and he can extract wins from positions most would consider drawn.",
      whatMakesThemGreat: [
        "Prophylactic thinking taken to its highest level",
        "Unmatched ability to restrict opponent's pieces",
        "Supreme technique – could win from minuscule advantages",
        "More tournament victories than any player in history",
        "Could outplay anyone in quiet, technical positions"
      ],
      famousGames: [
        "Karpov vs Kasparov, 1984 Game 27 (the marathon match)",
        "Karpov vs Unzicker, 1974 (positional masterpiece)",
        "Karpov vs Spassky, 1974 (en route to the championship)"
      ],
      famousQuotes: [
        "Chess is everything: art, science, and sport.",
        "Style? I have no style.",
        "The most important thing in chess is to find out what is happening."
      ],
      legacy: "Karpov represents the apex of positional chess. His games teach the art of restriction and prophylaxis better than any textbook. He proved that you don't need to attack to win – you can simply prevent your opponent from ever getting a real position. His influence on technical, strategic chess is immeasurable."
    }
  },
  tal: {
    name: "Mikhail Tal",
    tagline: "The Magician from Riga, sacrificial wizard.",
    description: "Dazzling sacrifices and complications that confuse even engines.",
    styleTags: ["tactical", "sacrifices", "complications", "attacking"],
    aggressiveness: 1.0,
    simplifyBias: 0.1,
    kingSafetyBias: 0.3,
    materialism: 0.2,
    bio: {
      fullName: "Mikhail Nekhemyevich Tal",
      born: "November 9, 1936 – Riga, Latvia",
      died: "June 28, 1992 – Moscow, Russia",
      nationality: "Latvian",
      worldChampion: "1960–1961",
      titles: ["World Champion", "USSR Champion (6×)", "Latvian Champion", "Grandmaster"],
      biography: "Mikhail Tal, 'The Magician from Riga,' was the most exciting player in chess history. His sacrificial style and hypnotic gaze at the board became legendary. He became the youngest World Champion at the time by defeating Botvinnik in 1960, though health problems contributed to losing the rematch. Despite chronic kidney problems that required multiple surgeries, Tal competed at the highest level for decades, beloved by fans for his creativity and charm.",
      playingStyle: "Tal's chess was a fireworks display. He would sacrifice pieces – sometimes unsoundly – to create complications where his tactical genius could outshine his opponents. His combinations were deep and imaginative, often defying computer analysis even today. He believed in the practical value of confusion, knowing that even if a sacrifice was objectively dubious, humans couldn't find the refutation over the board. His famous hypnotic stare added psychological terror.",
      whatMakesThemGreat: [
        "The most creative combinative genius in chess history",
        "Could see tactical possibilities invisible to everyone else",
        "Psychological mastery – opponents feared his sacrifices even when they were unsound",
        "Six-time USSR Champion despite constant health issues",
        "His games brought pure joy to millions of chess fans"
      ],
      famousGames: [
        "Tal vs Larsen, 1965 (the immortal sacrifice fest)",
        "Tal vs Botvinnik, 1960 Game 6 (winning the title)",
        "Tal vs Smyslov, 1959 (queen sacrifice masterpiece)"
      ],
      famousQuotes: [
        "There are two types of sacrifices: correct ones and mine.",
        "You must take your opponent into a deep dark forest where 2+2=5, and the path leading out is only wide enough for one.",
        "Later, I began to succeed in decisive games. Perhaps because I realized a very simple truth: not only was I worried, but also my opponent."
      ],
      legacy: "Tal showed that chess is about more than correct moves – it's about human creativity and the courage to take risks. His games are pure entertainment, inspiring millions to play boldly. He proved that brilliance and joy belong at the chessboard, and that impractical beauty has its own kind of truth."
    }
  },
  botvinnik: {
    name: "Mikhail Botvinnik",
    tagline: "The Patriarch, scientific chess mastery.",
    description: "Deep preparation, systematic analysis, and iron discipline.",
    styleTags: ["scientific", "preparation", "strategic", "disciplined"],
    aggressiveness: 0.5,
    simplifyBias: 0.5,
    kingSafetyBias: 0.8,
    materialism: 0.7,
    bio: {
      fullName: "Mikhail Moiseyevich Botvinnik",
      born: "August 17, 1911 – Kuokkala, Russian Empire",
      died: "May 5, 1995 – Moscow, Russia",
      nationality: "Russian",
      worldChampion: "1948–1957, 1958–1960, 1961–1963",
      titles: ["World Champion (three times)", "USSR Champion (7×)", "Grandmaster", "Electrical Engineer"],
      biography: "Mikhail Botvinnik, 'The Patriarch of Soviet Chess,' dominated the chess world for three decades while maintaining a career as an electrical engineer. He trained generations of Soviet players including Karpov and Kasparov through his famous school. Botvinnik was unique in being able to regain the World Championship twice after losing it. His scientific approach to chess study and preparation set standards that influence players to this day.",
      playingStyle: "Botvinnik brought scientific methodology to chess. He analyzed his games exhaustively, identifying weaknesses and working to eliminate them. His opening preparation was legendary, often revealing deep novelties at critical moments. His play was characterized by strategic depth, careful planning, and the ability to handle complex positions. He was particularly strong in the ending and in positions requiring long-term maneuvering.",
      whatMakesThemGreat: [
        "Pioneered scientific analysis and systematic preparation",
        "The only player to regain the World Championship twice",
        "Trained multiple World Champions (Karpov, Kasparov, Kramnik)",
        "Balanced elite chess with a successful engineering career",
        "His methods of preparation influenced all subsequent champions"
      ],
      famousGames: [
        "Botvinnik vs Capablanca, 1938 (defeating the legend)",
        "Botvinnik vs Smyslov, 1954 (deep strategic battle)",
        "Botvinnik vs Tal, 1961 (revenge in the rematch)"
      ],
      famousQuotes: [
        "Chess is the art which expresses the science of logic.",
        "The method I recommend to players is: trust only those games annotated by players who are stronger than yourself.",
        "Suddenly it was obvious to me in my analysis I had missed what Fischer had found with the greatest of ease."
      ],
      legacy: "Botvinnik created the Soviet chess school that dominated the world for decades. His training methods and scientific approach to the game became the blueprint for all serious players. Beyond his own achievements, his greatest legacy may be the champions he trained and the systematic methods he established."
    }
  },
  morphy: {
    name: "Paul Morphy",
    tagline: "Pride and sorrow of chess, romantic genius.",
    description: "Lightning development, open lines, and breathtaking attacks.",
    styleTags: ["romantic", "development", "open games", "attacking"],
    aggressiveness: 0.85,
    simplifyBias: 0.3,
    kingSafetyBias: 0.5,
    materialism: 0.4,
    bio: {
      fullName: "Paul Charles Morphy",
      born: "June 22, 1837 – New Orleans, Louisiana",
      died: "July 10, 1884 – New Orleans, Louisiana",
      nationality: "American",
      worldChampion: "Unofficial World Champion 1858–1859",
      titles: ["American Champion", "Defeated all top European players", "Chess prodigy"],
      biography: "Paul Morphy was a chess genius who burned brilliantly but briefly. At age 21, he traveled to Europe and systematically demolished every top player, often giving them odds. He played blindfold exhibitions, simultaneous games, and formal matches, dominating completely. Then, inexplicably, he retired from competitive chess at 22, never to return. The rest of his life was marked by mental instability and tragedy, earning him the epithet 'the pride and sorrow of chess.'",
      playingStyle: "Morphy's chess was a century ahead of his time. While his contemporaries focused on gambits and attacks from move one, Morphy understood that development and center control came first. He would patiently complete his development, then launch devastating attacks with his superior piece activity. His combinations were elegant and his execution flawless. He is considered the first 'modern' player despite playing in the Romantic era.",
      whatMakesThemGreat: [
        "So dominant that he gave odds and still won easily",
        "Understood principles of development decades before others",
        "His games remain perfect teaching material for rapid development",
        "Combined the best of romantic creativity with positional understanding",
        "Achieved everything in chess before age 22"
      ],
      famousGames: [
        "Morphy vs Duke of Brunswick and Count Isouard, 1858 ('The Opera Game')",
        "Morphy vs Paulsen, 1857 (American Congress brilliancy)",
        "Morphy vs Anderssen, 1858 (battle of titans)"
      ],
      famousQuotes: [
        "Help your pieces so they can help you.",
        "Chess never has been and never can be aught but a recreation.",
        "The ability to play chess is the sign of a gentleman."
      ],
      legacy: "Morphy's games are the first chess teachings given to students worldwide. 'The Opera Game' is perhaps the most famous chess game ever played. He demonstrated that development, activity, and open lines triumph over material – principles that remain fundamental. His tragic early retirement only adds to his mystique as chess's brightest shooting star."
    }
  },
  carlsen: {
    name: "Magnus Carlsen",
    tagline: "Universal perfection, endgame sorcerer.",
    description: "Unmatched versatility, grinding down any advantage to victory.",
    styleTags: ["universal", "endgames", "technique", "grinding"],
    aggressiveness: 0.5,
    simplifyBias: 0.6,
    kingSafetyBias: 0.8,
    materialism: 0.7,
    bio: {
      fullName: "Sven Magnus Øen Carlsen",
      born: "November 30, 1990 – Tønsberg, Norway",
      nationality: "Norwegian",
      worldChampion: "2013–2023 (Classical), 2019–present (World Blitz/Rapid Champion)",
      peakRating: 2882,
      titles: ["World Champion", "World Blitz Champion", "World Rapid Champion", "Highest rated player ever"],
      biography: "Magnus Carlsen is widely considered the greatest chess player of all time. He achieved the highest rating in history (2882), held the classical World Championship for ten years, and dominated rapid and blitz as well. A chess prodigy who became a Grandmaster at 13, Magnus learned by replaying games from chess history and developed an encyclopedic knowledge of positions. In 2023, he gave up defending his classical title, prioritizing faster time controls.",
      playingStyle: "Carlsen's genius lies in his universality and endgame prowess. He can play any type of position and often seems to 'outplay' opponents in drawn positions through sheer technique. His ability to create problems and exploit tiny inaccuracies is unmatched. Unlike Kasparov's dynamic fire, Carlsen's approach is more subtle – he grinds, probes, and eventually breaks down resistance. In faster time controls, his intuition and speed are terrifying.",
      whatMakesThemGreat: [
        "Highest chess rating ever achieved (2882)",
        "Can convert 'dead' drawn positions into wins",
        "No weaknesses – equally strong in all phases and openings",
        "Dominates classical, rapid, AND blitz formats",
        "Psychological resilience – never cracks under pressure"
      ],
      famousGames: [
        "Carlsen vs Anand, 2013 Game 5 (winning the title)",
        "Carlsen vs Karjakin, 2016 WCC tiebreaks (clutch performance)",
        "Carlsen vs Bu Xiangzhi, 2017 (the 100-move grind)"
      ],
      famousQuotes: [
        "I am trying to be the best player ever, not the best theoretician.",
        "Chess is a mixture of sport, psychology, science, art and luck.",
        "Some people think that if their opponent plays a beautiful game, it's okay to lose. I don't. You have to be merciless."
      ],
      legacy: "Carlsen proved that chess greatness can be achieved through sheer understanding rather than memorization. His dominance across all formats is unprecedented. He has brought chess to new audiences through his streaming and approachable personality, becoming the most famous player since Fischer."
    }
  },
  lasker: {
    name: "Emanuel Lasker",
    tagline: "27-year reign, psychological warrior.",
    description: "Pragmatic fighter who played the opponent, not just the board.",
    styleTags: ["psychological", "practical", "fighting", "endgames"],
    aggressiveness: 0.6,
    simplifyBias: 0.5,
    kingSafetyBias: 0.7,
    materialism: 0.6,
    bio: {
      fullName: "Emanuel Lasker",
      born: "December 24, 1868 – Berlinchen, Germany",
      died: "January 11, 1941 – New York City",
      nationality: "German-American",
      worldChampion: "1894–1921",
      titles: ["World Champion (27 years)", "Mathematician", "Philosopher", "Bridge Player"],
      biography: "Emanuel Lasker held the World Championship for 27 years – longer than anyone in history. Beyond chess, he was a mathematician, philosopher, and champion bridge player. He earned a doctorate in mathematics and wrote on philosophy and game theory. Lasker was forced to flee Nazi Germany and spent his final years in the United States. His approach to chess as psychological combat influenced how we understand the human side of the game.",
      playingStyle: "Lasker's unique genius was playing the opponent, not just the board. He would deliberately choose positions that his specific opponent found uncomfortable, even if they weren't objectively best. His practical approach prioritized winning over aesthetics or theoretical correctness. He was supremely confident in unclear positions and had exceptional defensive skills. His endgame technique was world-class, and he could grind out victories in positions others would have drawn.",
      whatMakesThemGreat: [
        "27-year reign – the longest in World Championship history",
        "Pioneered psychological approach to chess competition",
        "Exceptional defender who could hold 'lost' positions",
        "World-class mathematician and polymath",
        "Remained competitive at elite level until his 60s"
      ],
      famousGames: [
        "Lasker vs Capablanca, 1914 (the great rivalry)",
        "Lasker vs Bauer, 1889 (double bishop sacrifice)",
        "Lasker vs Steinitz, 1894 (winning the title)"
      ],
      famousQuotes: [
        "When you see a good move, look for a better one.",
        "On the chessboard, lies and hypocrisy do not survive long.",
        "In life, as in chess, forethought wins."
      ],
      legacy: "Lasker showed that chess is a human game, not just a logical exercise. His psychological approach and practical decision-making influence modern preparation against specific opponents. His longevity at the top proved that experience and wisdom can compensate for youthful energy. As a mathematician and philosopher, he elevated chess's intellectual reputation."
    }
  },
};

export type LegendGame = {
  id: string;
  legend: LegendId;
  event?: string;
  site?: string;
  date?: string;
  white: string;
  black: string;
  result: "1-0" | "0-1" | "1/2-1/2" | "*" | "?";
  eco?: string;
  round?: string;
  pgn: string;
};

export type OpeningBookNode = {
  fen: string;
  move: string;  // UCI
  count: number; // frequency in legend's games
};

export type LegendPosition = {
  fen: string;
  move: string;      // UCI - the move the legend actually played
  gameId: string;
  moveNumber: number;
  color: "w" | "b";
};

export type LegendPositionIndex = Record<string, LegendPosition[]>;

// ============================================
// GUESS THE MOVE TYPES
// ============================================

export type GuessMoveResult = {
  fen: string;
  userMove: string;
  legendMove: string;
  isExact: boolean;
  isTopEngineMatch: boolean;
  score: number;                // 0-100 for this move
  comment?: string;             // brief textual feedback
  tags: string[];               // "missed tactics", "too passive", etc.
};

export type GuessSessionSummary = {
  legend: LegendId;
  gameId: string;
  totalScore: number;           // aggregate
  movesGuessed: GuessMoveResult[];
  detectedWeaknessTags: string[];
};

export type StudyNote = {
  id: string;
  type: "guess-the-move";
  legend: LegendId;
  gameId: string;
  createdAt: string;
  summaryText: string;
  weaknessTags: string[];
  linkToSessionId: string;
};

