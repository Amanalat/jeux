'use strict';

// ─── 2.4 Pièces Unicode ──────────────────────────────────────────────────────
// On utilise les glyphes remplis (♟♜…) pour les deux couleurs ;
// la couleur réelle (blanc vs noir) est gérée par CSS via la classe piece-w / piece-b.
const PIECES_UNICODE = {
  wK: '♚', wQ: '♛', wR: '♜', wB: '♝', wN: '♞', wP: '♟',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟'
};

// État interne du module
let _flipped = false;
let _squareClickHandler = null;

// ─── Helpers orientation ─────────────────────────────────────────────────────
function _files() {
  return _flipped
    ? ['h','g','f','e','d','c','b','a']
    : ['a','b','c','d','e','f','g','h'];
}

function _ranks() {
  return _flipped
    ? [1,2,3,4,5,6,7,8]
    : [8,7,6,5,4,3,2,1];
}

// a1 est foncée → (index_fichier + rang) pair = foncé
function _isLight(file, rank) {
  return (file.charCodeAt(0) - 97 + rank) % 2 === 1;
}

// ─── 2.1 + 2.2 : Construction de la grille ───────────────────────────────────
function _buildBoard() {
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = '';

  for (const rank of _ranks()) {
    for (const file of _files()) {
      const sq = document.createElement('div');
      sq.className = 'square ' + (_isLight(file, rank) ? 'light' : 'dark');
      sq.dataset.square = file + rank;

      const pieceEl = document.createElement('span');
      pieceEl.className = 'piece';
      sq.appendChild(pieceEl);

      // Le handler sera positionné par l'app (étapes 6+)
      sq.addEventListener('click', () => {
        if (typeof _squareClickHandler === 'function') {
          _squareClickHandler(file + rank);
        }
      });

      boardEl.appendChild(sq);
    }
  }
}

// ─── 2.3 : Coordonnées ───────────────────────────────────────────────────────
function _updateCoords() {
  const files = _files();
  const ranks = _ranks();

  ['coords-top', 'coords-bottom'].forEach(id => {
    document.getElementById(id).innerHTML =
      files.map(f => `<span>${f}</span>`).join('');
  });

  ['coords-left', 'coords-right'].forEach(id => {
    document.getElementById(id).innerHTML =
      ranks.map(r => `<span>${r}</span>`).join('');
  });
}

// ─── 2.5 : renderBoard(position) ─────────────────────────────────────────────
// position : { "e2": "wP", "e1": "wK", ... } — null/undefined = plateau vide
function renderBoard(position) {
  document.querySelectorAll('#board .square').forEach(sq => {
    const pieceEl = sq.querySelector('.piece');
    const piece   = position ? position[sq.dataset.square] : null;
    pieceEl.textContent = piece ? PIECES_UNICODE[piece] : '';
    pieceEl.classList.remove('piece-w', 'piece-b');
    if (piece) pieceEl.classList.add(piece[0] === 'w' ? 'piece-w' : 'piece-b');
    sq.classList.toggle('occupied', !!piece);
  });
}

// ─── 2.7 : Highlights ────────────────────────────────────────────────────────
const _HIGHLIGHT_CLASSES = [
  'highlight-last', 'highlight-selected',
  'highlight-legal', 'highlight-correct', 'highlight-wrong'
];

// map : { "e2": "highlight-selected", "f3": "highlight-legal", ... }
function setHighlights(map) {
  document.querySelectorAll('#board .square').forEach(sq => {
    _HIGHLIGHT_CLASSES.forEach(c => sq.classList.remove(c));
    const cls = map[sq.dataset.square];
    if (cls) sq.classList.add(cls);
  });
}

function clearHighlights() {
  setHighlights({});
}

function highlightLastMove(from, to) {
  setHighlights({ [from]: 'highlight-last', [to]: 'highlight-last' });
}

// ─── 2.8 : Animation de déplacement ─────────────────────────────────────────
// Traduit la pièce visuellement de `from` vers `to`, PUIS appelle callback.
// La position doit être mise à jour (renderBoard) dans le callback.
function animateMove(from, to, callback) {
  const fromEl = document.querySelector(`#board [data-square="${from}"]`);
  const toEl   = document.querySelector(`#board [data-square="${to}"]`);

  if (!fromEl || !toEl) {
    if (callback) callback();
    return;
  }

  const fromRect = fromEl.getBoundingClientRect();
  const toRect   = toEl.getBoundingClientRect();
  const dx = toRect.left - fromRect.left;
  const dy = toRect.top  - fromRect.top;

  const pieceEl = fromEl.querySelector('.piece');

  // Départ immédiat sans transition pour positionner à (0,0)
  pieceEl.style.transition = 'none';
  pieceEl.style.transform  = 'translate(0,0)';
  pieceEl.offsetHeight; // force reflow

  // Déplacement animé
  pieceEl.style.transition = 'transform 0.18s ease';
  pieceEl.style.transform  = `translate(${dx}px, ${dy}px)`;

  pieceEl.addEventListener('transitionend', function handler() {
    pieceEl.removeEventListener('transitionend', handler);
    pieceEl.style.transition = '';
    pieceEl.style.transform  = '';
    if (callback) callback();
  }, { once: true });
}

// ─── 2.6 : flipBoard ─────────────────────────────────────────────────────────
function flipBoard(flipped) {
  _flipped = !!flipped;
  _buildBoard();
  _updateCoords();
}

function isFlipped() { return _flipped; }

// ─── Init ─────────────────────────────────────────────────────────────────────
// À appeler une seule fois au chargement de la page.
function setBoardClickHandler(fn) {
  _squareClickHandler = fn;
}

function initBoard() {
  _buildBoard();
  _updateCoords();

  document.getElementById('btn-flip').addEventListener('click', () => {
    flipBoard(!_flipped);
    // L'app peut réagir au retournement via ce hook global
    if (typeof onBoardFlipped === 'function') onBoardFlipped(_flipped);
  });
}
