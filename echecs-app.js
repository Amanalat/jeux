'use strict';

// ═══════════════════════════════════════════════════════════════════════════════
// ÉTAT GLOBAL
// ═══════════════════════════════════════════════════════════════════════════════

let _currentPosition = null;
let _currentMode     = 'cours';

// Mode cours
let _coursOpening = null;
let _coursStep    = 0;
let _coursPlaying = false;
let _coursTimer   = null;

// Interaction plateau (étape 6)
let _selectedSquare  = null;
let _legalMoves      = [];
let _exoPosition     = null;
let _exoEpSq         = null;
let _exoActiveColor  = 'w';
let _animating       = false;
let _moveCallback    = null;
let _exoCanSelect    = null;

// Mode exercice (étapes 7-8)
let _exoOpening       = null;
let _exoStep          = 0;
let _exoErrors        = 0;
let _exoSubmode       = 'auto';
let _exoPlayerColor   = 'w';
let _exoActive        = false;
let _autoPlayPending  = false; // 12.1 empêche les double-timers
let _sessionSuccesses = 0;
let _sessionAttempts  = 0;

// ═══════════════════════════════════════════════════════════════════════════════
// ONGLETS
// ═══════════════════════════════════════════════════════════════════════════════

function _initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn =>
    btn.addEventListener('click', () => _switchMode(btn.dataset.mode))
  );
}

function _switchMode(mode) {
  // 12.1 : stopper la lecture automatique si on quitte le cours
  if (mode !== 'cours') _stopAutoPlay();

  _currentMode = mode;
  document.querySelectorAll('.tab-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.mode === mode)
  );
  document.getElementById('panel-cours').classList.toggle('hidden', mode !== 'cours');
  document.getElementById('panel-exercice').classList.toggle('hidden', mode !== 'exercice');

  // 11.1 : classe interactive sur les cases (hover uniquement en exercice)
  document.getElementById('board').classList.toggle('interactive-mode', mode === 'exercice');

  if (mode === 'cours') {
    if (_coursOpening) {
      _currentPosition = _coursOpening.positions[_coursStep];
      renderBoard(_currentPosition);
      if (_coursStep > 0) highlightLastMove(
        _coursOpening.moves[_coursStep - 1].from,
        _coursOpening.moves[_coursStep - 1].to
      );
    } else {
      _currentPosition = initialPosition();
      renderBoard(_currentPosition);
      clearHighlights();
    }
  } else {
    const pos = _exoActive ? _exoPosition : initialPosition();
    _currentPosition = pos;
    renderBoard(pos);
    if (!_exoActive) clearHighlights();
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// ÉTAPE 5 — MODE COURS
// ═══════════════════════════════════════════════════════════════════════════════

function _buildOpeningList() {
  const container = document.getElementById('opening-categories');
  container.innerHTML = '';
  const done = _getDoneOpenings();
  const categories = getOpeningsByCategory();

  categories.forEach(({ category, openings }, idx) => {
    const section = document.createElement('div');
    section.className = 'opening-category';
    section.dataset.cat = category;

    // En-tête cliquable (accordéon)
    const h4 = document.createElement('h4');
    h4.textContent = category;
    h4.addEventListener('click', () => {
      const isOpen = section.classList.contains('open');
      // Fermer toutes les autres catégories (one-at-a-time)
      container.querySelectorAll('.opening-category').forEach(s => s.classList.remove('open'));
      if (!isOpen) section.classList.add('open');
    });
    section.appendChild(h4);

    const list = document.createElement('div');
    list.className = 'opening-list';

    for (const o of openings) {
      const btn = document.createElement('button');
      btn.className = 'opening-btn';
      btn.dataset.id = o.id;
      btn.innerHTML = o.name + (done.includes(o.id) ? ' <span class="badge-done">✓</span>' : '');
      btn.addEventListener('click', () => _selectOpening(o.id));
      list.appendChild(btn);
    }

    section.appendChild(list);
    container.appendChild(section);

    // Ouvrir la première catégorie par défaut
    if (idx === 0) section.classList.add('open');
  });
}

// Ouvre la catégorie de l'ouverture actuellement sélectionnée
function _openCategoryOf(id) {
  const opening = getOpeningById(id);
  if (!opening) return;
  const container = document.getElementById('opening-categories');
  container.querySelectorAll('.opening-category').forEach(s => {
    s.classList.remove('open');
    if (s.dataset.cat === opening.category) s.classList.add('open');
  });
}

function _buildExerciceSelect() {
  const sel = document.getElementById('exo-opening-select');
  sel.innerHTML = '';
  for (const o of getAllOpenings()) {
    const opt = document.createElement('option');
    opt.value = o.id;
    opt.textContent = o.name;
    sel.appendChild(opt);
  }
}

function _selectOpening(id) {
  // 12.1 : stopper tout auto-play en cours avant de changer d'ouverture
  _stopAutoPlay();
  const opening = getOpeningById(id);
  if (!opening) return;

  _coursOpening = parseOpening(opening);
  _coursStep    = 0;

  document.querySelectorAll('.opening-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.id === id)
  );
  document.getElementById('cours-name').textContent  = opening.name;
  document.getElementById('cours-desc').textContent  = opening.description;
  document.getElementById('cours-info').classList.remove('hidden');
  _openCategoryOf(id);
  _updateCoursDisplay();
}

function _updateCoursDisplay() {
  if (!_coursOpening) return;
  const { moves, positions, comments } = _coursOpening;
  const total = moves.length;

  _currentPosition = positions[_coursStep];
  renderBoard(_currentPosition);

  if (_coursStep > 0) highlightLastMove(moves[_coursStep - 1].from, moves[_coursStep - 1].to);
  else clearHighlights();

  document.getElementById('cours-comment').textContent =
    _coursStep === 0
      ? '← Appuyez sur Suivant ou Lecture auto pour commencer.'
      : (comments[_coursStep - 1] || '');

  document.getElementById('cours-step').textContent  = `Coup ${_coursStep} / ${total}`;
  document.getElementById('btn-prev').disabled        = _coursStep === 0;
  document.getElementById('btn-next').disabled        = _coursStep >= total;
  document.getElementById('btn-play').disabled        = _coursStep >= total;
  document.getElementById('btn-play').textContent     = _coursPlaying ? '⏸ Pause' : '▶ Lecture auto';

  _updateMovesHistory(moves, _coursStep);
}

function _updateMovesHistory(moves, currentStep) {
  const list = document.getElementById('moves-list');
  list.innerHTML = '';
  let currentEl = null;

  for (let i = 0; i < moves.length; i += 2) {
    const num   = Math.floor(i / 2) + 1;
    const white = moves[i];
    const black  = moves[i + 1];
    const pair  = document.createElement('span');
    pair.className = 'move-pair';

    const wCls = i + 1 === currentStep ? ' current' : '';
    const bCls = i + 2 === currentStep ? ' current' : '';

    pair.innerHTML =
      `<span class="move-num">${num}.</span> ` +
      `<span class="move-san${wCls}">${white.san}</span>` +
      (black ? ` <span class="move-san${bCls}">${black.san}</span>` : '');

    if (wCls || bCls) currentEl = pair;
    list.appendChild(pair);
  }

  // 10.4 : faire défiler jusqu'au coup courant
  if (currentEl) currentEl.scrollIntoView({ block: 'nearest' });
}

function _goNext(onComplete) {
  if (!_coursOpening || _coursStep >= _coursOpening.moves.length) {
    if (onComplete) onComplete(); return;
  }
  const move = _coursOpening.moves[_coursStep];
  animateMove(move.from, move.to, () => {
    _coursStep++;
    _updateCoursDisplay();
    if (onComplete) onComplete();
  });
}

function _goPrev() {
  if (!_coursOpening || _coursStep === 0) return;
  _stopAutoPlay();
  _coursStep--;
  _updateCoursDisplay();
}

function _resetCours() {
  _stopAutoPlay();
  _coursStep = 0;
  _updateCoursDisplay();
}

function _toggleAutoPlay() { _coursPlaying ? _stopAutoPlay() : _startAutoPlay(); }

function _startAutoPlay() {
  if (!_coursOpening || _coursStep >= _coursOpening.moves.length) return;
  _coursPlaying = true;
  _updateCoursDisplay();
  _scheduleNextAutoMove();
}

function _scheduleNextAutoMove() {
  _coursTimer = setTimeout(() => {
    if (!_coursPlaying) return;
    _goNext(() => {
      if (_coursPlaying && _coursStep < _coursOpening.moves.length) _scheduleNextAutoMove();
      else _stopAutoPlay();
    });
  }, 1200);
}

function _stopAutoPlay() {
  _coursPlaying = false;
  clearTimeout(_coursTimer);
  _coursTimer = null;
  const btn = document.getElementById('btn-play');
  if (btn) {
    btn.textContent = '▶ Lecture auto';
    if (_coursOpening) btn.disabled = _coursStep >= _coursOpening.moves.length;
  }
}

function _initPracticeBtn() {
  document.getElementById('btn-practice').addEventListener('click', () => {
    if (!_coursOpening) return;
    _stopAutoPlay();
    document.getElementById('exo-opening-select').value = _coursOpening.id;
    _switchMode('exercice');
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// ÉTAPE 6 — INTERACTION SOURIS
// ═══════════════════════════════════════════════════════════════════════════════

function onSquareClick(square) {
  if (_currentMode === 'cours') return;
  if (_animating) return;
  _handleExoClick(square);
}

function _handleExoClick(square) {
  const pos   = _exoPosition;
  const piece = pos ? pos[square] : null;

  if (_selectedSquare === null) {
    if (!piece) return;
    if (typeof _exoCanSelect === 'function' && !_exoCanSelect(square)) return;
    _selectSquare(square);
  } else {
    if (square === _selectedSquare) {
      _deselectSquare();
    } else if (_legalMoves.includes(square)) {
      const from = _selectedSquare;
      if (typeof _moveCallback === 'function') {
        _moveCallback(from, square);
      } else {
        _deselectSquare();
        _applyInteractiveMove(from, square);
      }
    } else if (piece && pieceColor(piece) === pieceColor(pos[_selectedSquare])) {
      _selectSquare(square);
    } else {
      _deselectSquare();
    }
  }
}

function _selectSquare(square) {
  _selectedSquare = square;
  _legalMoves = getLegalMoves(square, _exoPosition, _exoEpSq);
  const h = { [square]: 'highlight-selected' };
  for (const sq of _legalMoves) h[sq] = 'highlight-legal';
  setHighlights(h);
}

function _deselectSquare() {
  _selectedSquare = null;
  _legalMoves     = [];
  clearHighlights();
}

function _detectSpecial(from, to, pos, epSq) {
  const piece = pos[from];
  if (!piece) return null;
  const color = pieceColor(piece);
  const rank  = color === 'w' ? '1' : '8';
  if (piece[1] === 'P' && to === epSq)                               return 'en-passant';
  if (piece[1] === 'K' && from === 'e' + rank && to === 'g' + rank)  return 'castling-k';
  if (piece[1] === 'K' && from === 'e' + rank && to === 'c' + rank)  return 'castling-q';
  return null;
}

function _applyInteractiveMove(from, to, onDone) {
  const piece   = _exoPosition[from];
  const special = _detectSpecial(from, to, _exoPosition, _exoEpSq);

  let promotion = null;
  if (piece && piece[1] === 'P') {
    if ((pieceColor(piece) === 'w' && to[1] === '8') ||
        (pieceColor(piece) === 'b' && to[1] === '1'))
      promotion = 'Q';
  }

  const move   = { from, to, special, promotion };
  const newPos = applyMove(move, _exoPosition);
  const newEp  = computeEpSq(from, to, piece);

  _animating = true;
  animateMove(from, to, () => {
    _exoPosition     = newPos;
    _currentPosition = newPos;
    _exoEpSq         = newEp;
    _exoActiveColor  = oppColor(_exoActiveColor);
    _animating       = false;
    renderBoard(_exoPosition);
    if (onDone) onDone(move, newPos);
  });
}

function _initExoPosition(pos, color) {
  _exoPosition     = pos || initialPosition();
  _exoEpSq         = null;
  _exoActiveColor  = color || 'w';
  _currentPosition = _exoPosition;
  _deselectSquare();
  renderBoard(_exoPosition);
  clearHighlights();
}

// ═══════════════════════════════════════════════════════════════════════════════
// ÉTAPE 7 — EXERCICE ADVERSAIRE AUTO  /  ÉTAPE 8 — TOUT MANUEL
// ═══════════════════════════════════════════════════════════════════════════════

function _startExo() {
  const id      = document.getElementById('exo-opening-select').value;
  const submode = document.querySelector('input[name="submode"]:checked').value;
  const opening = getOpeningById(id);
  if (!opening) return;

  // 12.1 : reset complet avant de commencer
  _autoPlayPending = false;
  _exoOpening     = parseOpening(opening);
  _exoStep        = 0;
  _exoErrors      = 0;
  _exoSubmode     = submode;
  _exoPlayerColor = isFlipped() ? 'b' : 'w'; // 9.3
  _exoActive      = true;

  _sessionAttempts++;
  _updateSessionScore();

  document.getElementById('exercice-setup').classList.add('hidden');
  document.getElementById('exercice-play').classList.remove('hidden');
  document.getElementById('exo-name').textContent = opening.name;

  _clearExoFeedback();
  _initExoPosition(initialPosition(), 'w');
  _updateExoDisplay();

  _exoCanSelect = _buildCanSelect();
  _moveCallback = _buildMoveCallback();

  // 9.3 : si le joueur est les noirs, auto-jouer les blancs d'abord
  if (_exoSubmode === 'auto') _autoPlayOpponent();
}

function _buildCanSelect() {
  return (square) => {
    const piece = _exoPosition[square];
    if (!piece) return false;
    const color = pieceColor(piece);
    if (_exoSubmode === 'auto') return color === _exoPlayerColor && _exoActiveColor === _exoPlayerColor;
    return color === _exoActiveColor; // manuel : couleur active
  };
}

function _buildMoveCallback() {
  return (from, to) => {
    const expected = _exoOpening.moves[_exoStep];
    if (expected.from === from && expected.to === to) {
      _deselectSquare();
      _showExoFeedback('correct', '✓ Correct !');
      _applyInteractiveMove(from, to, () => {
        _exoStep++;
        _updateExoDisplay();
        if (_exoSubmode === 'auto') _autoPlayOpponent();
        else _checkOpeningComplete();
      });
    } else {
      // 7.5 : coup incorrect — ne pas appliquer
      _deselectSquare();
      _exoErrors++;
      _showExoFeedback('wrong', '✗ Ce n\'est pas le bon coup. Réessayez !');
      _updateExoDisplay();
      setTimeout(_clearExoFeedback, 2000);
    }
  };
}

// ─── Auto-play adversaire (7.4) ──────────────────────────────────────────────
function _autoPlayOpponent() {
  if (!_exoActive || _autoPlayPending) return; // 12.1 guard

  if (_exoStep >= _exoOpening.moves.length) {
    _onOpeningComplete(); return;
  }

  const nextMove = _exoOpening.moves[_exoStep];
  if (nextMove.color !== _exoPlayerColor) {
    _autoPlayPending = true;
    setTimeout(() => {
      _autoPlayPending = false;
      if (!_exoActive) return;
      _applyInteractiveMove(nextMove.from, nextMove.to, () => {
        _exoStep++;
        _updateExoDisplay();
        _autoPlayOpponent(); // récursif si plusieurs coups adverses
      });
    }, 800);
  } else {
    _checkOpeningComplete();
  }
}

function _checkOpeningComplete() {
  if (_exoStep >= _exoOpening.moves.length) _onOpeningComplete();
}

// ─── 7.7 Fin de l'ouverture ──────────────────────────────────────────────────
function _onOpeningComplete() {
  _exoActive    = false;
  _moveCallback = null;
  _exoCanSelect = null;

  const msg = _exoErrors === 0
    ? '🎉 Parfait ! Ouverture réussie sans erreur !'
    : `✓ Terminé — ${_exoErrors} erreur${_exoErrors > 1 ? 's' : ''}.`;
  _showExoFeedback('correct', msg);

  _sessionSuccesses++;
  _updateSessionScore();
  _markOpeningDone(_exoOpening.id);
}

// ─── 7.6 Indice ───────────────────────────────────────────────────────────────
function _showHint() {
  if (!_exoActive || _exoStep >= _exoOpening.moves.length) return;
  const expected = _exoOpening.moves[_exoStep];
  _deselectSquare();
  setHighlights({ [expected.from]: 'highlight-selected' });
  _showExoFeedback('info', '💡 Déplacez la pièce surlignée.');
  _exoErrors++;
  _updateExoDisplay();
}

// ─── 7.8 Voir la solution ─────────────────────────────────────────────────────
function _showSolution() {
  if (!_exoActive || _exoStep >= _exoOpening.moves.length) return;
  const expected = _exoOpening.moves[_exoStep];
  _deselectSquare();
  setHighlights({ [expected.from]: 'highlight-last', [expected.to]: 'highlight-last' });
  _showExoFeedback('info', `Solution : ${expected.san}`);

  setTimeout(() => {
    if (!_exoActive) return;
    const savedCb = _moveCallback;
    _moveCallback = null;
    _applyInteractiveMove(expected.from, expected.to, () => {
      _exoStep++;
      _updateExoDisplay();
      _moveCallback = _buildMoveCallback();
      if (_exoSubmode === 'auto') _autoPlayOpponent();
      else _checkOpeningComplete();
    });
  }, 1500);
}

// ─── Reset / retour setup ─────────────────────────────────────────────────────
function _resetExo() {
  if (!_exoOpening) return;
  _autoPlayPending = false;
  _exoStep         = 0;
  _exoErrors       = 0;
  _exoActive       = true;
  _exoPlayerColor  = isFlipped() ? 'b' : 'w';
  _clearExoFeedback();
  _initExoPosition(initialPosition(), 'w');
  _updateExoDisplay();
  _exoCanSelect = _buildCanSelect();
  _moveCallback = _buildMoveCallback();
  if (_exoSubmode === 'auto') _autoPlayOpponent();
}

function _backToExoSetup() {
  _autoPlayPending = false;
  _exoActive    = false;
  _moveCallback = null;
  _exoCanSelect = null;
  document.getElementById('exercice-play').classList.add('hidden');
  document.getElementById('exercice-setup').classList.remove('hidden');
  _initExoPosition(initialPosition(), 'w');
}

// ─── 8.3 Affichage exercice ───────────────────────────────────────────────────
function _updateExoDisplay() {
  if (!_exoOpening) return;
  const total = _exoOpening.moves.length;

  document.getElementById('exo-step').textContent   = `Coup ${_exoStep} / ${total}`;
  document.getElementById('exo-errors').textContent  = `Erreurs : ${_exoErrors}`;

  const turnEl = document.getElementById('exo-turn-indicator');
  if (_exoSubmode === 'auto') {
    const isMyTurn = _exoActiveColor === _exoPlayerColor && _exoActive;
    turnEl.textContent = !_exoActive
      ? '✓ Terminé'
      : isMyTurn ? 'Votre tour' : 'Adversaire...';
    turnEl.className = _exoPlayerColor === 'w' ? 'turn-white' : 'turn-black';
  } else {
    turnEl.textContent = _exoActiveColor === 'w' ? '⬜ Trait aux blancs' : '⬛ Trait aux noirs';
    turnEl.className   = _exoActiveColor === 'w' ? 'turn-white' : 'turn-black';
  }

  const done = !_exoActive || _exoStep >= total;
  document.getElementById('btn-hint').disabled     = done;
  document.getElementById('btn-solution').disabled = done;

  _updateMovesHistory(_exoOpening.moves, _exoStep);
}

// ─── Feedback ─────────────────────────────────────────────────────────────────
function _showExoFeedback(type, msg) {
  const el = document.getElementById('exo-feedback');
  el.textContent = msg;
  el.className   = 'feedback-box feedback-' + type;
}

function _clearExoFeedback() {
  const el = document.getElementById('exo-feedback');
  if (el) { el.textContent = ''; el.className = 'feedback-box'; }
}

// ─── 8.5 Score de session ─────────────────────────────────────────────────────
function _updateSessionScore() {
  document.getElementById('score-label').textContent =
    `Session : ${_sessionSuccesses} / ${_sessionAttempts} ouvertures`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ÉTAPE 9 — RETOURNEMENT DU PLATEAU
// ═══════════════════════════════════════════════════════════════════════════════

// 9.1 Mettre à jour le bouton et l'indicateur de couleur
function _updateFlipUI() {
  const flipped = isFlipped();
  document.getElementById('btn-flip').textContent =
    flipped ? '⬜ Jouer avec les blancs' : '⬛ Jouer avec les noirs';

  const ind = document.getElementById('player-indicator');
  ind.textContent = flipped ? '⬛ Noirs' : '⬜ Blancs';
  ind.className   = 'player-indicator ' + (flipped ? 'player-black' : 'player-white');
}

// Hook appelé par echecs-board.js après chaque retournement
function onBoardFlipped() {
  // 9.2 : re-rendre la position courante dans le nouvel axe
  renderBoard(_currentPosition);

  if (_currentMode === 'cours' && _coursOpening && _coursStep > 0) {
    highlightLastMove(_coursOpening.moves[_coursStep - 1].from, _coursOpening.moves[_coursStep - 1].to);
  }
  if (_currentMode === 'exercice' && _selectedSquare) {
    _selectSquare(_selectedSquare);
  }

  // 9.3 : mettre à jour la couleur jouée en mode exercice auto
  if (_exoActive && _exoSubmode === 'auto') {
    _exoPlayerColor = isFlipped() ? 'b' : 'w';
    _exoCanSelect   = _buildCanSelect();
    _updateExoDisplay();
    // Si c'est maintenant le tour de l'adversaire, reprendre l'auto-play
    if (!_autoPlayPending && _exoStep < _exoOpening.moves.length) {
      const next = _exoOpening.moves[_exoStep];
      if (next.color !== _exoPlayerColor) _autoPlayOpponent();
    }
  }

  // 9.1 : rafraîchir le libellé du bouton et l'indicateur
  _updateFlipUI();
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOCALSTORAGE
// ═══════════════════════════════════════════════════════════════════════════════

function _getDoneOpenings() {
  try { return JSON.parse(localStorage.getItem('chess_done') || '[]'); }
  catch { return []; }
}

function _markOpeningDone(id) {
  const done = _getDoneOpenings();
  if (!done.includes(id)) {
    done.push(id);
    localStorage.setItem('chess_done', JSON.stringify(done));
    _buildOpeningList(); // 12.2 rafraîchit les badges ✓
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  initBoard();
  setBoardClickHandler(onSquareClick);

  _currentPosition = initialPosition();
  _exoPosition     = initialPosition();
  renderBoard(_currentPosition);

  _updateFlipUI();        // 9.1 : initialiser le libellé du bouton
  _updateSessionScore();  // 10.5 : afficher 0/0 dès le départ

  _initTabs();
  _buildOpeningList();
  _buildExerciceSelect();
  _initPracticeBtn();

  // Cours
  document.getElementById('btn-prev').addEventListener('click', _goPrev);
  document.getElementById('btn-next').addEventListener('click', () => _goNext());
  document.getElementById('btn-play').addEventListener('click', _toggleAutoPlay);
  document.getElementById('btn-reset-cours').addEventListener('click', _resetCours);

  // Exercice
  document.getElementById('btn-start-exo').addEventListener('click', _startExo);
  document.getElementById('btn-reset-exo').addEventListener('click', _resetExo);
  document.getElementById('btn-back-setup').addEventListener('click', _backToExoSetup);
  document.getElementById('btn-hint').addEventListener('click', _showHint);
  document.getElementById('btn-solution').addEventListener('click', _showSolution);
});
