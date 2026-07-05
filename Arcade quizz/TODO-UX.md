# Chantier UX — QCM Arcade
*Critique complète du 2026-06-11 — score Nielsen : 22/40 (baseline). Relancer `/impeccable critique` après le chantier pour mesurer la progression.*

**Contexte matériel (validé)** : les élèves jouent sur PC, tablette, écran tactile ET vidéoprojecteur.
→ Tout texte à lire doit être lisible à distance (≥ 13–14 px), tout jeu doit être jouable clavier **et** doigt.

---

## 🔴 Chantier 1 — LISIBILITÉ (priorité n°1, toutes les pages)

**Règles globales :**
- Press Start 2P / Orbitron réservés aux **titres courts** uniquement
- Tout texte qu'on doit *lire* (questions, réponses, règles, boutons, feedback) → Exo 2 ou Nunito, **≥ 13–14 px**
- `letter-spacing` > 0.05em uniquement sur étiquettes courtes en MAJUSCULES (le détecteur a flaggé 0.07–0.15em sur du texte courant)

**Par fichier :** *(✅ fait le 2026-06-11 — boutons/labels en Nunito/Exo 2 ≥13-15px, Press Start/Orbitron gardés sur titres courts et HUD à ≥10-11px, gris foncés éclaircis en #9a9ad0/#99a3c4)*
- [x] `index.html` — `.set-chip` (.58rem), `.hub-step` (.52rem), `.card-title` (.62rem), `.play-btn` (.52rem), `.btn-edit` (.58rem), `.hub-status` (.52rem), `.blink` (.48rem)
- [x] `qcm-classique.html` — `.set-btn` (8px, 7px mobile), `.back-link` (7px), `.hud-item` (8px), `.letter` (7px), `.breakdown-title` (8px), `.next-btn` (9px), `.btn-restart`/`.btn-home` (9px)
- [x] `snake-fakenews.html` — `.legend h3` (7px), `.question-label` (7px), `.menu-link-side` (7px), `.hud` (9px), `#speedLabel` (8px), `.btn` (9px), `.btn-menu` (8px) + labels canvas (11px → 13px min)
- [x] `brick-breaker-quiz.html` — `#ui` (0.7rem), `#question-label` (0.6rem), `#font-label` (0.65rem), HUD canvas (10px), hint « ESPACE ou CLIC » (11px) + taille briques par défaut 12→14px
- [x] `fakenews_defender.html` — `#ui` (0.7rem), `#question-label` (0.6rem), `#speed-label` (0.65rem), HUD canvas (10px) + texte blocs réponses 11-12.5→13-14px
- [x] `whac-a-quiz.html` — `#ui` (0.7rem), `#question-label` (0.6rem), `#speed-label` (0.65rem), `--mole-font` défaut 11px → 13px
- [x] `fake-blaster.html` — **le pire** : `#qbar` (10px), bulles ennemies (9px), règles écran titre (7px), HUD (10px), hints contrôles (7–8px). En plus : une seule police partout (Press Start 2P) → ajouter Nunito/Exo 2 pour les bulles, règles et la barre de question
- Hors périmètre (non flaggé) : `editeur-questions.html` et `editeur-niveau*.html` gardent leurs petites tailles — à traiter si besoin (usage intervenant sur PC, pas projeté)

---

## 🔴 Chantier 2 — RÈGLES DU DEFENDER (contradiction + punition inévitable)

`fakenews_defender.html` :
- [ ] **Écran titre (~L163–168)** : « Ne tire pas sur la bonne réponse » + « Laisse la bonne réponse passer — elle ne doit pas s'échapper ! » se contredisent. Réécrire en 2 lignes max, ex. :
  *« Détruis toutes les FAUSSES réponses avant que la bonne n'atteigne le bas ! Ne tire jamais sur la bonne. »*
- [ ] **Code (~L554–560)** : quand la bonne réponse atteint le bas → actuellement `-1 vie` alors qu'on n'a pas le droit de la tirer = perte inévitable si on est lent. → Rendre **neutre** : 0 point, message « ⏱ Trop lent ! Détruis les fausses avant que la bonne ne passe », passage à la question suivante sans perte de vie.

---

## 🔴 Chantier 3 — PÉDAGOGIE SUR ERREUR (le cœur du projet)

Aujourd'hui l'explication (`expl`) ne s'affiche **qu'en cas de succès**. Sur erreur : « −1 vie » et rien d'autre — l'occasion d'apprendre est perdue.

- [ ] **Tous les jeux arcade** : sur erreur, afficher brièvement **la bonne réponse + l'explication** (pause courte ou overlay léger, comme le reveal vert/rouge de Snake qui est la bonne base)
- [ ] `snake-fakenews.html` — le reveal 2s existe déjà ; ajouter l'`expl` dans la feedback-box pendant le reveal
- [ ] `brick-breaker-quiz.html` — toucher la bonne brique → montrer l'`expl` en plus du « −1 vie »
- [ ] `fakenews_defender.html` — tirer sur la bonne / fausse échappée → montrer bonne réponse + `expl`
- [ ] `whac-a-quiz.html` — frapper la bonne / temps écoulé → montrer bonne réponse + `expl`
- [ ] `fake-blaster.html` — depuis la refonte du 2026-06-11, les questions viennent du store au format options/answer : `expl` est disponible → l'ajouter dans `buildSession()` et l'afficher quand on tire sur la bonne réponse (et à la fin d'une question réussie)
- [ ] `qcm-classique.html` — `.feedback.show { max-height:120px; overflow:hidden }` **tronque silencieusement les explications longues** → passer à une hauteur auto ou ≥ 240px

---

## 🔴 Chantier 4 — TACTILE (PC + tablette confirmés)

Aucun jeu n'est jouable clavier ET doigt aujourd'hui :
- [ ] `snake-fakenews.html` — clavier only → ajouter swipe sur le canvas (ou D-pad à l'écran) + bouton pause tactile
- [~] `fakenews_defender.html` — ✅ souris/tap ajoutés le 2026-06-11 (mousemove = bouger, clic = tirer) ; reste à vérifier le vrai tactile (touchmove)
- [ ] `fake-blaster.html` — le clic/tap tire vers la position visée (refonte 2026-06-11) mais déplacement/saut restent clavier only → zones tactiles bouger / sauter
- [ ] `brick-breaker-quiz.html` — `mousemove` only → ajouter `touchmove` pour la raquette (le tap lance déjà la balle via `click`)
- [ ] `whac-a-quiz.html` — déjà OK au doigt ✅ (mais souris/tactile only : pas de version clavier, acceptable)
- [ ] `qcm-classique.html` — déjà OK ✅

---

## 🟡 Chantier 5 — Cohérence & confort (après les 4 ci-dessus)

- [~] **Badge série active** — ✅ sélecteur redondant de `qcm-classique` retiré (2026-06-11), label série affiché dans qcm-classique + Fake Blaster ; reste : badge sur les écrans titre de Snake/Brick/Defender/Whac
- [x] **Sessions courtes** — fait le 2026-06-11 : sélecteur 5/10/30 au hub (`qcm-arcade.sessionCount`), `QCMStore.getSessionQuestions()` mélange + coupe, nouveau tirage à chaque partie dans les 6 jeux
- [ ] **Persistance des réglages** (vitesse, taille police, mute) en `localStorage` — actuellement reset à chaque page
- [ ] **Pause harmonisée** : P/Échap partout. Manque : Whac (aucune pause), Fake Blaster (aucune), qcm-classique (pas de Échap → menu)
- [~] **Convention inversée** : Snake = *mange la bonne*, tous les autres = *détruis les fausses* → rappel visuel fort au lancement. ✅ Snake (« Mange UNIQUEMENT la bonne réponse » en overlay + message permanent) et Brick (consigne pulsante + rappel à la 1re question) faits le 2026-06-11 ; reste Defender / Whac / Blaster (règles sur écran titre seulement)
- [ ] **Généraliser le mode 🟢 FACILE / 🔴 DIFFICILE** de Whac aux autres jeux (remplace avantageusement les sliders de vitesse)

## 🟢 Mineur (si le temps le permet)

- [ ] `index.html` — étape « — 1. Choisir une série — » sans étape 2 ; texte clignotant « Sélectionne un jeu » placé *sous* le bouton éditeur ; statut vide trop discret (un élève clique sur une carte verrouillée sans comprendre pourquoi rien ne se passe)
- [ ] `brick-breaker-quiz.html` — `BANNER_H = 80` fixe alors que la hauteur réelle du bandeau dépend de la question (3 lignes = chevauchement zone de jeu)
- [x] `fake-blaster.html` — refonte complète du gameplay (2026-06-11) : options flottantes dans le ciel, visée souris + tir libre, une question à la fois (numérotée dans la barre), avancée à droite pour passer à la suivante, décor qui change par question
- [ ] Letter-spacing larges résiduels sur texte courant (détecteur : 0.07–0.15em)

---

## Ordre d'exécution recommandé

1. ~~Lisibilité (`/impeccable typeset`)~~ ✅ fait le 2026-06-11
2. Règles Defender (`/impeccable clarify` + correctif logique)
3. Pédagogie sur erreur (correctif direct dans les 5 jeux + fix troncature qcm)
4. Tactile (`/impeccable adapt`) — Defender déjà souris/tap
5. Cohérence & confort, puis `/impeccable polish`
6. Générer `DESIGN.md` (`/impeccable document`) une fois le visuel stabilisé — PRODUCT.md existe depuis le 2026-06-11
7. `/impeccable critique` pour re-mesurer (baseline : 22/40)

## Vérifications en attente (changements du 2026-06-11 non testés en réel)

- [ ] Fake Blaster : refonte complète à tester de bout en bout (visée, avancée, fin de série)
- [ ] Whac : sortie échelonnée + boules persistantes, chrono selon vitesse
- [ ] Defender : blocs agrandis (largeur + hauteur selon texte), souris
- [ ] Sélecteur 5/10/30 du hub appliqué dans les 6 jeux
- [ ] Snake 546px : vérifier que tout tient sur les petits écrans (tablette)
