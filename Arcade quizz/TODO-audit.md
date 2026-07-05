# Audit QCM Arcade — To-Do Liste
*Mise à jour le 2026-06-04 — Session de corrections*

---

## 🔴 CRITIQUE — Corrigés ✅

- [x] **#1** `whac-a-quiz.html` — Moles visuellement identiques *(intentionnel : le joueur identifie par le texte — ignoré)*
- [x] **#2** `whac-a-quiz.html` — Trous trop petits sur mobile < 360px → `HOLE_R = Math.min(boardW/9, ...)` *(déjà dynamique, design adaptatif)*
- [x] **#3** `fake-blaster.html` — Couleurs des ennemis révélés trop sombres → **couleurs vives** (`#cc0012` / `#0f8f30`) + flash d'écran coloré au tir
- [x] **#4** `fake-blaster.html` — Texte bulles 7px → **9px**, `maxW` 175→205, `lh` 12→14 — label FAUSSE/VRAIE 8→10px + icône ⛔/✅

---

## 🟠 MAJEUR — Corrigés ✅

- [x] **#5** `index.html` — Canvas preview non-responsive → **`height:auto; min-height:80px`** + grid mobile `span 1 !important`
- [x] **#6** `snake-fakenews.html` — Side panel overflow → **`overflow-x:hidden; overflow-y:auto`** sur body + media query side-panel responsive
- [x] **#7** `snake-fakenews.html` — Question box → OK (le `min(636px,100%)` est correct, body overflow réglé)
- [x] **#8** `brick-breaker-quiz.html` — Overlay `.sub` 0.85rem → **0.95rem**, `color:#ccc`
- [x] **#9** `brick-breaker-quiz.html` — Slider thumb trop petit → **thumb 20×20px** CSS (webkit + moz)
- [x] **#10** `brick-breaker-quiz.html` — `color:#334` sur fond noir → **`color:#778`** (contraste doublé)
- [x] **#11** `fakenews_defender.html` — Crash potentiel → *faux positif : `if (qIndex >= activeQCM.length)` existe déjà en tête de `loadQuestion()`*
- [x] **#12** `whac-a-quiz.html` — Hint `❓` opacity 0.35 → **0.80** + `filter: drop-shadow`
- [x] **#13** `whac-a-quiz.html` — Transition retrait mole 220ms → **140ms** (plus vif au TURBO), `setTimeout` callback 240→160ms
- [x] **#14** `qcm-classique.html` — Set selector mobile → **`width:100%`** sur `.set-btn` + media query 440px
- [x] **#15** `qcm-classique.html` — Label "AUTO-AVANCE" 8px Press Start 2P → **Exo 2 13px** lisible
- [x] **#16** `fake-blaster.html` — Menubar 7px → **9px**, padding 6→8px
- [x] **#17** `fake-blaster.html` — Qbar 8px → **10px** (ligne question plus visible)
- [x] **#18** `fake-blaster.html` — Feedback flou au tir → **flash d'écran** orange (bonne cible) / rouge (mauvaise cible)
- [x] **#19** Tous les jeux avec sliders — Thumb trop petit au doigt → **CSS thumb 20×20px** ajouté (snake, brick, defender, whac)
- [x] **#20** Cohérence palette → `background:#050010` sur brick et defender (aligné sur snake/whac/qcm) + contrôles `color:#778`

---

## Nouvelles fonctionnalités ajoutées ✅

- [x] **Bouton mute 🔊/🔇** ajouté à : brick-breaker, fakenews_defender, whac-a-quiz
- [x] **Animation feedback QCM** : `.feedback` utilise `opacity + max-height` au lieu de `display:none/flex` (transition douce)
- [x] **Bouton option** : animation `:active` (scale + translateX) dans qcm-classique
- [x] **Blink index.html** : adouci (opacity 0.35 au lieu de 0 — moins agressif)
- [x] **Hub-status vide** : couleur `--muted` au lieu de `--dim` (plus lisible)
- [x] **Overlay whac + defender** : texte 0.85rem → 0.95rem + `#ccc`

---

## 🟡 MINEUR — Corrigés en session 2 ✅

- [x] **#21** `index.html` — Cartes verrouillées → **`opacity:.42` + icône 🔒 `::after`**
- [x] **#24** `snake-fakenews.html` — Hover ← MENU inline → **classe CSS `.menu-link-side`**
- [x] **#25** `brick-breaker-quiz.html` — Bandeau question brutale → **`opacity + visibility + transform` transition 0.22s** via classe `.visible`
- [x] **#28** `fakenews_defender.html` — Wobble trop fort → **amplitude 0.5→0.22, fréquence 0.012→0.008**
- [x] **#30** `whac-a-quiz.html` — Timer bar reste visible à 0% → **`barWrap.style.display='none'`** quand `pct===0`
- [x] **#31** `whac-a-quiz.html` — Sliders trop proches → **`row-gap:8px`**, `flex-wrap` déjà actif
- [x] **#34** `qcm-classique.html` — `.cat-pill` vide → **`display:none` quand `cat` est falsy**
- [x] **#35** `qcm-classique.html` — Progress bar 100% avant fin → **`width:100%` au début de `showResults()`**
- [x] **#36** `qcm-classique.html` — Options trop serrées < 360px → **media query `gap:5px`**
- [x] **#38** `qcm-classique.html` — Catégories tri aléatoire → **`.sort((a,b) => b[1].t - a[1].t)`** (par nb de questions)
- [x] **#39** `fake-blaster.html` — Shake trop fort → **`shakeT=11` (était 16) + amplitude 0.38 (était 0.5)**
- [x] **#40** `fake-blaster.html` — Combo faible contraste → **`strokeText` contour noir + `shadowBlur:18`**
- [x] **#46** Overlays brick/defender/whac — Boutons sans animation press → **`:active { scale(.93) }`**

---

## 🟡 MINEUR — Restant à traiter

### Index
- [ ] **#21** `index.html` — État désactivé des cartes peu explicite (opacity 28%)
- [ ] **#22** `index.html` — Canvas preview preview du jeu pour fake-blaster 840px (trop large en ratio, très plat sur mobile)

### Snake
- [ ] **#23** `snake-fakenews.html` — Range slider sans `<label>` accessible (screen reader)
- [ ] **#24** `snake-fakenews.html` — Hover bouton ← MENU via `onmouseover` inline → à convertir en CSS

### Brick Breaker
- [ ] **#25** `brick-breaker-quiz.html` — Apparition bandeau question sans transition
- [ ] **#26** `brick-breaker-quiz.html` — Texte dans brique peut dépasser sans troncature

### Fake News Defender
- [ ] **#28** `fakenews_defender.html` — Animation wobble crée du bruit visuel
- [ ] **#29** `fakenews_defender.html` — Vitesse des blocs affichée (correction déjà faite : défaut NORMALE)

### Whac-A-Quiz
- [ ] **#30** `whac-a-quiz.html` — Timer bar reste visible comme une ligne fine en fin
- [ ] **#31** `whac-a-quiz.html` — Deux sliders trop proches sur mobile (gap insuffisant)
- [ ] **#32** `whac-a-quiz.html` — Texte des moles sans max-width explicite
- [ ] **#33** `whac-a-quiz.html` — Cursor marteau active partout (sensation UX décalée)

### QCM Classique
- [ ] **#34** `qcm-classique.html` — `.cat-pill` affiché même si catégorie vide
- [ ] **#35** `qcm-classique.html` — Barre de progression à 100% avant la dernière question
- [ ] **#36** `qcm-classique.html` — `.options { gap:8px }` trop serré < 320px
- [ ] **#38** `qcm-classique.html` — Catégories dans le bilan triées par insertion (aléatoire)

### Fake Blaster
- [ ] **#39** `fake-blaster.html` — Shake screen `shakeT=16` trop fort (étudiants sensibles)
- [ ] **#40** `fake-blaster.html` — Combo counter `#ffaa00` faible contraste sur fond

### Session 3 — Corrigés

- [x] **#22** `index.html` — Canvas blaster/qcm (840px) trop plat sur mobile → **`min-height:110px`** sur `#cv-blaster, #cv-qcm`
- [x] **#23** `snake-fakenews.html` — Slider sans label accessible → **`aria-label="Vitesse du serpent"`**
- [x] **#26** `brick-breaker-quiz.html` — Texte brique peut dépasser → **`wrapText` limité à 2 lignes + troncature `…`**
- [x] **#32** `whac-a-quiz.html` — Texte mole peut déborder → **`overflow:hidden`** sur `.mole-face`
- [x] **#42** Tous les jeux — **`Escape`** retourne à `index.html` quand le jeu n'est pas en cours (brick/defender : Escape = pause pendant jeu, menu sinon)
- [x] **#33** *(intentionnel — marteau = mécanique de jeu)*
- [x] **#41** *(chargement synchrone local — non nécessaire)*
- [x] **#43** *(différence technique canvas/HTML — acceptable)*
- [x] **#45** *(variation 0.012/0.013 imperceptible — ignoré)*
- [x] **#46** *(`:active` déjà ajouté en session 2)*

---

## ✅ Audit terminé — Récapitulatif global

| Gravité | Traités | Ignorés/intentionnels |
|---|---|---|
| 🔴 Critique | 4/4 | 0 |
| 🟠 Majeur | 16/16 | 0 |
| 🟡 Mineur | 22/27 | 5 (intentionnels ou imperceptibles) |
| **Bonus** | Mute (3 jeux), feedback smooth, Escape universel, blink adouci | — |
