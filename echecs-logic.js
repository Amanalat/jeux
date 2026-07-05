'use strict';

// ─── Helpers coordonnées ──────────────────────────────────────────────────────
function fileIdx(f)      { return f.charCodeAt(0) - 97; }   // 'a'→0 … 'h'→7
function rankIdx(r)      { return parseInt(r) - 1; }         // '1'→0 … '8'→7
function toSq(fi, ri)    {
  if (fi < 0 || fi > 7 || ri < 0 || ri > 7) return null;
  return 'abcdefgh'[fi] + (ri + 1);
}
function pieceColor(p)   { return p ? p[0] : null; }         // 'w' | 'b' | null
function oppColor(c)     { return c === 'w' ? 'b' : 'w'; }

// Carrés intermédiaires sur une ligne droite/diagonale (exclut from, inclut to)
function _path(from, to) {
  const df = fileIdx(to[0]) - fileIdx(from[0]);
  const dr = rankIdx(to[1]) - rankIdx(from[1]);
  const steps = Math.max(Math.abs(df), Math.abs(dr));
  if (steps <= 1) return [];
  const sf = Math.sign(df), sr = Math.sign(dr);
  const path = [];
  for (let i = 1; i < steps; i++)
    path.push(toSq(fileIdx(from[0]) + i * sf, rankIdx(from[1]) + i * sr));
  return path;
}

function _pathClear(from, to, pos) {
  return _path(from, to).every(sq => !pos[sq]);
}

// ─── 3.2 Position initiale ────────────────────────────────────────────────────
function initialPosition() {
  const pos = {};
  const back = ['R','N','B','Q','K','B','N','R'];
  'abcdefgh'.split('').forEach((f, i) => {
    pos[f + '8'] = 'b' + back[i];
    pos[f + '7'] = 'bP';
    pos[f + '2'] = 'wP';
    pos[f + '1'] = 'w' + back[i];
  });
  return pos;
}

// ─── 3.3 canPieceMoveTo ───────────────────────────────────────────────────────
// Vérifie si la pièce sur `from` peut atteindre `to` (sans vérifier les échecs).
// epSq : case de prise en passant valide ce tour (ex: "e6"), ou null.
function canPieceMoveTo(from, to, pos, epSq) {
  const piece = pos[from];
  if (!piece) return false;
  const color = pieceColor(piece);
  const type  = piece[1];
  const fi = fileIdx(from[0]), ri = rankIdx(from[1]);
  const ti = fileIdx(to[0]),   tRi = rankIdx(to[1]);
  const df = ti - fi, dr = tRi - ri;
  const target = pos[to];

  if (target && pieceColor(target) === color) return false; // capture de sa propre pièce

  switch (type) {
    case 'P': {
      const dir = color === 'w' ? 1 : -1;
      const startRi = color === 'w' ? 1 : 6;
      if (df === 0 && dr === dir && !target) return true;
      if (df === 0 && dr === 2 * dir && ri === startRi && !target
          && !pos[toSq(fi, ri + dir)]) return true;
      if (Math.abs(df) === 1 && dr === dir)
        return !!target || to === epSq;
      return false;
    }
    case 'N':
      return (Math.abs(df) === 2 && Math.abs(dr) === 1)
          || (Math.abs(df) === 1 && Math.abs(dr) === 2);
    case 'B':
      return Math.abs(df) === Math.abs(dr) && df !== 0
          && _pathClear(from, to, pos);
    case 'R':
      return (df === 0 || dr === 0) && (df !== 0 || dr !== 0)
          && _pathClear(from, to, pos);
    case 'Q':
      if (df === 0 || dr === 0) return (df !== 0 || dr !== 0) && _pathClear(from, to, pos);
      if (Math.abs(df) === Math.abs(dr)) return _pathClear(from, to, pos);
      return false;
    case 'K':
      return Math.abs(df) <= 1 && Math.abs(dr) <= 1 && (df !== 0 || dr !== 0);
    default:
      return false;
  }
}

// ─── 3.4 applyMove ────────────────────────────────────────────────────────────
// Retourne une NOUVELLE position (immuable).
// move : { from, to, special?, promotion? }
function applyMove(move, pos) {
  const { from, to, special, promotion } = move;
  const p = Object.assign({}, pos);
  const piece = p[from];
  const color = pieceColor(piece);

  delete p[from];
  p[to] = promotion ? (color + promotion) : piece;

  // 3.7 Cas spéciaux ────────────────────────────────────────────────────────
  if (special === 'en-passant') {
    // La pièce capturée est sur la même colonne que `to`, même rangée que `from`
    delete p[to[0] + from[1]];
  }
  if (special === 'castling-k') {
    const rank = color === 'w' ? '1' : '8';
    delete p['h' + rank];
    p['f' + rank] = color + 'R';
  }
  if (special === 'castling-q') {
    const rank = color === 'w' ? '1' : '8';
    delete p['a' + rank];
    p['d' + rank] = color + 'R';
  }

  return p;
}

// ─── 3.6 algebraicToCoords ───────────────────────────────────────────────────
// Traduit une notation algébrique (SAN) en { from, to, special?, promotion? }.
// color : 'w' | 'b'   epSq : case en passant valide, ou null
function algebraicToCoords(san, pos, color, epSq) {
  let s = san.replace(/[+#!?]/g, '').trim();

  // Roques (3.7)
  if (s === 'O-O' || s === '0-0') {
    const rank = color === 'w' ? '1' : '8';
    return { from: 'e' + rank, to: 'g' + rank, special: 'castling-k' };
  }
  if (s === 'O-O-O' || s === '0-0-0') {
    const rank = color === 'w' ? '1' : '8';
    return { from: 'e' + rank, to: 'c' + rank, special: 'castling-q' };
  }

  let pieceType = 'P';
  let fromFile = null, fromRank = null;
  let promotion = null;

  // Type de pièce
  if ('KQRBN'.includes(s[0])) { pieceType = s[0]; s = s.slice(1); }

  // Promotion ex: "e8=Q"
  const promoM = s.match(/=([QRBN])$/);
  if (promoM) { promotion = promoM[1]; s = s.replace(/=[QRBN]$/, ''); }

  // Retirer 'x'
  s = s.replace('x', '');

  // s peut valoir : "e4", "de4" (fichier disambig), "1e4" (rang disambig), "d1e4"
  let toSquare;
  if (s.length === 2) {
    toSquare = s;
  } else if (s.length === 3) {
    if ('abcdefgh'.includes(s[0])) fromFile = s[0]; else fromRank = s[0];
    toSquare = s.slice(1);
  } else if (s.length === 4) {
    fromFile = s[0]; fromRank = s[1]; toSquare = s.slice(2);
  }

  const pieceCode = color + pieceType;
  const candidates = Object.entries(pos)
    .filter(([sq, p]) => {
      if (p !== pieceCode) return false;
      if (fromFile && sq[0] !== fromFile) return false;
      if (fromRank && sq[1] !== fromRank) return false;
      return canPieceMoveTo(sq, toSquare, pos, epSq);
    })
    .map(([sq]) => sq);

  if (candidates.length === 0) {
    console.warn(`[logic] pas de candidat pour "${san}" (${color})`);
    return null;
  }

  const from = candidates[0];

  // Détecter prise en passant
  let special = null;
  if (pos[from] && pos[from][1] === 'P' && toSquare === epSq) special = 'en-passant';

  return { from, to: toSquare, special, promotion };
}

// ─── 6.2 getLegalMoves ───────────────────────────────────────────────────────
// Retourne la liste des cases cibles valides pour la pièce sur `square`.
// epSq : case de prise en passant valide ce tour, ou null.
function getLegalMoves(square, pos, epSq) {
  const piece = pos[square];
  if (!piece) return [];
  const color = pieceColor(piece);
  const moves = [];

  for (const f of 'abcdefgh') {
    for (let r = 1; r <= 8; r++) {
      const to = f + r;
      if (to !== square && canPieceMoveTo(square, to, pos, epSq))
        moves.push(to);
    }
  }

  // Roque (simplified : vérifie roi + tour en place + chemin libre)
  if (piece[1] === 'K') {
    const rank = color === 'w' ? '1' : '8';
    if (square === 'e' + rank) {
      if (pos['h' + rank] === color + 'R' && !pos['f' + rank] && !pos['g' + rank])
        moves.push('g' + rank);
      if (pos['a' + rank] === color + 'R' && !pos['b' + rank] && !pos['c' + rank] && !pos['d' + rank])
        moves.push('c' + rank);
    }
  }

  return moves;
}

// Calcule la case en passant résultant d'un coup de pion double.
function computeEpSq(from, to, piece) {
  if (!piece || piece[1] !== 'P') return null;
  const ri1 = rankIdx(from[1]), ri2 = rankIdx(to[1]);
  if (Math.abs(ri2 - ri1) !== 2) return null;
  return from[0] + ((ri1 + ri2) / 2 + 1);
}

// ─── 3.5 movesFromPGN ────────────────────────────────────────────────────────
// Retourne { moves, positions }
//   moves     : [{from, to, san, color, special?, promotion?}, ...]
//   positions : [posInit, posAprèsCoup1, posAprèsCoup2, ...]
function movesFromPGN(pgn) {
  const tokens = pgn
    .replace(/\d+\./g, '')
    .replace(/1-0|0-1|1\/2-1\/2|\*/g, '')
    .trim()
    .split(/\s+/)
    .filter(t => t.length > 0);

  const positions = [initialPosition()];
  const moves = [];
  let pos   = positions[0];
  let color = 'w';
  let epSq  = null;

  for (const san of tokens) {
    const move = algebraicToCoords(san, pos, color, epSq);
    if (!move) break;

    // Calculer la case en passant pour le prochain coup
    epSq = null;
    const piece = pos[move.from];
    if (piece && piece[1] === 'P') {
      const ri1 = rankIdx(move.from[1]);
      const ri2 = rankIdx(move.to[1]);
      if (Math.abs(ri2 - ri1) === 2) {
        const epRiIdx = (ri1 + ri2) / 2;
        epSq = move.from[0] + (epRiIdx + 1);
      }
    }

    moves.push({ ...move, san, color });
    pos = applyMove(move, pos);
    positions.push(pos);
    color = oppColor(color);
  }

  return { moves, positions };
}
