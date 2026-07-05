'use strict';

// ─── 4.1 Format d'une ouverture ───────────────────────────────────────────────
// {
//   id       : string  — identifiant unique
//   name     : string  — nom affiché
//   category : string  — groupe dans la liste
//   description : string — résumé pédagogique
//   pgn      : string  — séquence en notation PGN
//   comments : string[] — un commentaire par demi-coup (même ordre que les tokens PGN)
// }

// ─── 4.2 + 4.3 Ouvertures avec commentaires ──────────────────────────────────

const OPENINGS = [

  // ═══════════════════════════════════════════
  // 4.4 Catégorie : 1.e4 e5
  // ═══════════════════════════════════════════

  {
    id: 'italienne',
    name: 'Partie italienne',
    category: '1.e4 e5',
    description: "Une des ouvertures les plus classiques et les plus jouées. Les blancs développent rapidement leurs pièces et visent la case f7 avec le fou.",
    pgn: '1. e4 e5 2. Nf3 Nc6 3. Bc4',
    comments: [
      "e4 : contrôle du centre et libère les diagonales du fou f1 et de la dame.",
      "e5 : les noirs répondent symétriquement pour contester le centre.",
      "Cf3 : le cavalier attaque le pion e5 et se développe vers une case centrale idéale.",
      "Cc6 : le cavalier défend e5 et se développe naturellement.",
      "Fc4 : le 'fou des Italiens' vise la case f7, le point faible du roi noir avant le roque."
    ]
  },

  {
    id: 'espagnole',
    name: 'Ouverture espagnole (Ruy Lopez)',
    category: '1.e4 e5',
    description: "L'une des ouvertures les plus jouées au plus haut niveau depuis des siècles. Le fou en b5 crée une pression indirecte sur le centre noir.",
    pgn: '1. e4 e5 2. Nf3 Nc6 3. Bb5',
    comments: [
      "e4 : contrôle du centre, ouvre les lignes pour le développement.",
      "e5 : réponse symétrique classique pour contester le centre.",
      "Cf3 : attaque le pion e5 tout en développant une pièce vers le centre.",
      "Cc6 : défend e5 et développe le cavalier.",
      "Fb5 : le 'fou de Ruy Lopez' épingle indirectement le cavalier c6. Si Cc6 bouge, le pion e5 tombe !"
    ]
  },

  {
    id: 'ecossaise',
    name: 'Partie écossaise',
    category: '1.e4 e5',
    description: "Les blancs ouvrent le centre dès le 3e coup. Une ouverture directe et agressive, favorisée par Kasparov pour éviter les longues théories de la Ruy Lopez.",
    pgn: '1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4',
    comments: [
      "e4 : contrôle immédiat du centre.",
      "e5 : réponse symétrique classique.",
      "Cf3 : développement naturel, attaque e5.",
      "Cc6 : défend e5 et développe.",
      "d4 : coup caractéristique ! Les blancs ouvrent le centre sans attendre.",
      "exd4 : les noirs doivent capturer, sinon le pion e5 reste sous pression.",
      "Cxd4 : le cavalier se centralise en reprenant. Les blancs ont un centre ouvert et un développement rapide."
    ]
  },

  {
    id: 'petroff',
    name: 'Défense Petroff',
    category: '1.e4 e5',
    description: "Une défense solide et symétrique où les noirs contre-attaquent immédiatement. Très prisée en parties de haut niveau pour sa solidité.",
    pgn: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4',
    comments: [
      "e4 : contrôle du centre.",
      "e5 : réponse symétrique.",
      "Cf3 : attaque e5.",
      "Cf6 : contre-attaque ! Les noirs attaquent e4 au lieu de défendre e5.",
      "Cxe5 : les blancs prennent le pion e5 librement.",
      "d6 : attention au piège ! Il ne faut pas jouer Cxe4 tout de suite car après Dd4+ les noirs perdent.",
      "Cf3 : le cavalier recule. Maintenant...",
      "Cxe4 : les noirs récupèrent leur pion. La position est parfaitement symétrique !"
    ]
  },

  // ═══════════════════════════════════════════
  // 4.4 Catégorie : 1.e4 (autres réponses)
  // ═══════════════════════════════════════════

  {
    id: 'sicilienne',
    name: 'Défense sicilienne',
    category: '1.e4 autres',
    description: "La défense la plus populaire contre 1.e4 au plus haut niveau. Les noirs créent un déséquilibre immédiat avec c5 pour un jeu asymétrique.",
    pgn: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4',
    comments: [
      "e4 : contrôle du centre.",
      "c5 : la Sicilienne ! Les noirs contrôlent d4 sans jouer e5. Déséquilibre dès le départ.",
      "Cf3 : développement naturel, prépare d4.",
      "d6 : renforce le centre noir et prépare ...Cf6.",
      "d4 : les blancs ouvrent le centre pour libérer leurs pièces.",
      "cxd4 : les noirs prennent. Ils obtiennent la colonne c semi-ouverte — un atout pour la suite.",
      "Cxd4 : le cavalier se centralise. Les blancs ont de l'espace, les noirs une contre-jeu actif."
    ]
  },

  {
    id: 'francaise',
    name: 'Défense française',
    category: '1.e4 autres',
    description: "Les noirs construisent une forteresse solide. L'inconvénient : le fou c8 souvent enfermé derrière ses propres pions.",
    pgn: '1. e4 e6 2. d4 d5 3. Nc3 Nf6',
    comments: [
      "e4 : contrôle du centre.",
      "e6 : les noirs préparent ...d5 pour contester le centre. Le pion e6 protège d5.",
      "d4 : les blancs renforcent leur présence centrale.",
      "d5 : le contre-coup central typique de la Française ! Le pion d5 attaque e4.",
      "Cc3 : défend e4 et développe une pièce vers le centre.",
      "Cf6 : le cavalier attaque e4 et crée une pression supplémentaire sur le centre blanc."
    ]
  },

  {
    id: 'caro-kann',
    name: 'Défense Caro-Kann',
    category: '1.e4 autres',
    description: "Une défense solide et sans risque. Les noirs visent à jouer ...d5 avec un bon développement du fou c8, contrairement à la Française.",
    pgn: '1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4',
    comments: [
      "e4 : contrôle du centre.",
      "c6 : prépare ...d5 tout en gardant la diagonale du fou c8 ouverte — avantage sur la Française !",
      "d4 : les blancs occupent le centre.",
      "d5 : attaque le centre immédiatement.",
      "Cc3 : défend e4.",
      "dxe4 : les noirs capturent. La position s'ouvre.",
      "Cxe4 : le cavalier se centralise parfaitement. Les noirs vont jouer ...Ff5 ou ...Cf6 pour développer."
    ]
  },

  // ═══════════════════════════════════════════
  // 4.4 Catégorie : 1.d4
  // ═══════════════════════════════════════════

  {
    id: 'gambitedam',
    name: 'Gambit Dame',
    category: '1.d4',
    description: "Les blancs 'offrent' un pion pour contrôler le centre. Ce n'est pas vraiment un gambit car les noirs ne peuvent pas garder le pion longtemps.",
    pgn: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5',
    comments: [
      "d4 : contrôle du centre par le flanc dame.",
      "d5 : les noirs contestent le centre symétriquement.",
      "c4 : le Gambit Dame ! Les blancs offrent ce pion pour attirer d5 hors du centre.",
      "e6 : Gambit Dame refusé. Les noirs soutiennent d5 avec e6 — la variante la plus solide.",
      "Cc3 : développement naturel, maintient la pression sur d5.",
      "Cf6 : développement du cavalier vers sa meilleure case.",
      "Fg5 : épinglage ! Ce fou épingle le cavalier f6 qui défend d5. Les blancs augmentent la pression."
    ]
  },

  {
    id: 'indienneroi',
    name: 'Défense indienne du roi',
    category: '1.d4',
    description: "Ouverture hypermoderne : les noirs laissent les blancs construire un grand centre pour l'attaquer ensuite. Favori de Fischer, Kasparov et de nombreux champions.",
    pgn: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4',
    comments: [
      "d4 : contrôle du centre.",
      "Cf6 : approche hypermoderne ! Le cavalier contrôle e4 de loin sans occuper le centre immédiatement.",
      "c4 : les blancs élargissent leur contrôle central.",
      "g6 : prépare le fianchetto du fou en g7.",
      "Cc3 : développement solide du cavalier.",
      "Fg7 : le 'dragon' ! Ce fou sur g7 est extrêmement puissant sur la grande diagonale.",
      "e4 : les blancs ont un centre imposant. Les noirs vont contre-attaquer avec ...d6, ...e5 ou ...c5."
    ]
  },

  {
    id: 'indiendame',
    name: 'Défense indienne de la dame (Nimzo)',
    category: '1.d4',
    description: "La Nimzo-Indienne est l'une des défenses les plus respectées. Le fou en b4 épingle le cavalier et cède la paire de fous contre un contre-jeu solide.",
    pgn: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4',
    comments: [
      "d4 : contrôle du centre.",
      "Cf6 : développement actif, contrôle e4.",
      "c4 : les blancs renforcent leur emprise sur le centre.",
      "e6 : prépare ...d5 et libère le fou f8.",
      "Cc3 : développement naturel.",
      "Fb4 : la Nimzo-Indienne ! Le fou épingle le cavalier c3 qui soutenait e4. Les noirs visent à doubler les pions blancs après ...Fxc3."
    ]
  },

  // ═══════════════════════════════════════════
  // 4.4 Catégorie : Autres
  // ═══════════════════════════════════════════

  {
    id: 'anglaise',
    name: 'Ouverture anglaise',
    category: 'Autres',
    description: "Les blancs contrôlent le centre de façon hypermoderne en commençant par le flanc dame. Flexible et subtile.",
    pgn: '1. c4 e5 2. Nc3 Nf6 3. g3 d5',
    comments: [
      "c4 : contrôle hypermoderne de d5 depuis le flanc. La 'Ouverture anglaise'.",
      "e5 : les noirs occupent le centre. Réponse la plus directe.",
      "Cc3 : développement naturel, attaque e5 et prépare d4.",
      "Cf6 : développement actif du cavalier vers le centre.",
      "g3 : prépare le fianchetto du fou en g2 — le 'grand canon' sur la grande diagonale.",
      "d5 : les noirs jouent ...d5 pour contester le centre. La tension s'installe !"
    ]
  },

  {
    id: 'catalan',
    name: 'Ouverture catalane',
    category: 'Autres',
    description: "Un système sophistiqué combinant le Gambit Dame et le fianchetto. Le fou g2 exerce une pression durable sur le centre.",
    pgn: '1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2',
    comments: [
      "d4 : contrôle du centre.",
      "Cf6 : développement actif.",
      "c4 : Gambit Dame en perspective.",
      "e6 : solide, prépare ...d5.",
      "g3 : signal de la Catalane ! Les blancs préparent un fianchetto.",
      "d5 : les noirs contestent le centre.",
      "Fg2 : le fou sur g2 exercera une pression constante sur d5 et toute la grande diagonale."
    ]
  }

];

// ─── 4.5 Accesseurs ───────────────────────────────────────────────────────────

function getAllOpenings() {
  return OPENINGS;
}

function getOpeningById(id) {
  return OPENINGS.find(o => o.id === id) || null;
}

// Retourne [{ category, openings[] }, ...] dans l'ordre de première apparition
function getOpeningsByCategory() {
  const map = new Map();
  for (const o of OPENINGS) {
    if (!map.has(o.category)) map.set(o.category, []);
    map.get(o.category).push(o);
  }
  return Array.from(map.entries()).map(([category, openings]) => ({ category, openings }));
}

// Pré-calcule les coups et positions d'une ouverture (via echecs-logic.js)
// Retourne l'ouverture enrichie : { ...opening, moves, positions }
function parseOpening(opening) {
  const { moves, positions } = movesFromPGN(opening.pgn);
  return { ...opening, moves, positions };
}
