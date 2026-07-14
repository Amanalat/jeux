# RÉSO — Modifications apportées le 2026-07-13

Récapitulatif des changements faits aujourd'hui sur le jeu (`reso-alberte.html` /
`reso-alberte-app.js` / `reso-alberte-data.js`), en réponse aux retours de test listés dans
`RESO-retours-tests.md`. Les sections ci-dessous reprennent la numérotation de ce document.

---

## 1. Bugs de logique

- **1.1 Faux positifs sur mot-clé isolé** — ajout de `FILLER_PATTERNS` (« trop tard », « peu
  importe », « je sais pas »…) et de `isOffTopic()`, vérifié **avant** la détection bon/mauvais
  réflexe dans `handleSend()`. Une phrase comme « trop tard non ? » relance désormais la question
  au lieu d'être validée à tort sur le seul mot « non ».
- **1.2 Alberte spoile la réponse** — ajout de `good.retryKw` sur la plupart des scénarios
  (`verrou`, `photo`, `phishing`, `contacts`, `wifi`, `permissions`, `profil`) : après un premier
  échec, ces mots-clés élargis (souvent repris du texte d'Alberte elle-même) sont acceptés en plus
  des mots-clés d'origine.

## 2. Écriture & personnalité d'Alberte

- **2.1 / 2.2 Variantes de relance** — `UNKNOWN_VARIANTS` et `RETRY_VARIANTS` + `pickVariant()`
  (tirage aléatoire sans répétition immédiate) pour ne plus avoir le même message d'incompréhension
  à chaque fois. Le ton chaleureux suggéré (« Je ne suis pas encore très à l'aise… ») est intégré.
- **2.3 Quiproquos 1942 / aujourd'hui** :
  - Gag du **bouton de radio** (scénario `allumer`) : mécanique dédiée (`sc.gag`), déclenchée une
    seule fois si le joueur dit « bouton » sans préciser « côté ». *Corrigé aujourd'hui* : l'intro
    du scénario ne mentionnait plus le sens réel avant même que le joueur en parle — la référence
    au poste de radio n'apparaît maintenant que dans la réplique du gag, pas dans l'intro.
  - `ANACHRONISMS` : selfie, slide, logo, mégaphone, story, hashtag — chacun avec une réplique de
    perplexité dédiée, déclenchée avant toute détection bon/mauvais réflexe.
- **2.4 Échos historiques** — `HIST_ECHO` (Gestapo, Milice, étoile jaune, marché noir, Occupation,
  Vichy) : si l'un de ces mots apparaît dans la réponse du joueur, une réplique d'Alberte dédiée
  s'affiche avant la réplique de validation, pour ancrer le contexte 1942.
- **2.5 Mots trop complexes** — couvert via la liste `ANACHRONISMS` (perplexité plutôt que
  compréhension silencieuse). *Point resté ouvert* : la clarification « Logo et mégaphone » comme
  éventuel élément d'interface (vs. mot-liste) n'a pas été retranchée avec l'équipe.

## 3. Structure & rythme

- **3.1 Réduction des étapes techniques** — fusion des anciens scénarios `luminosite` et
  `silence` en un seul scénario `discretion`, désormais **en deux parties** (voir plus bas) : 3
  scénarios techniques au lieu de 4 (`allumer`, `discretion`, `recharge`).
- **3.2 Réordonnancement** — l'ordre dans `SCENARIOS` est maintenant : technique d'abord
  (`allumer`, `discretion`, `recharge`), puis self-data (`verrou`, `photo`, `phishing`,
  `contacts`, `wifi`, `permissions`), puis la finale (`profil`).

## 4. Nouveau mécanisme de fin — photo de profil

- Scénario `profil` (`type: "finale"`) ajouté après les scénarios self-data : lien vers la fiche
  réelle d'Alberte Bourde (francaislibres.net), question ouverte finale, et détection dédiée pour
  que l'élève identifie seul le risque de la vraie photo de profil (`setAvatarAnon()` bascule sur
  des initiales une fois la bonne réponse trouvée).

## 5. Intro / outro

- `INTRO_ALBERTE` réécrite pour introduire l'idée d'une re-vérification collective.
- Écran de victoire (`#win`) mis à jour avec le texte validé (« Vous m'avez aidée, et vous avez
  aidé la Résistance… »).

## 6. Sécurité / cadre scolaire

- `checkSafety()` avec deux listes dédiées : `SUICIDE_KW` (réponse avec le numéro national
  **3114**, ton d'écoute, pas de traitement comme une simple mauvaise réponse) et `VIOLENT_KW`
  (réponse d'Alberte qui recadre sans être punitive). Vérifiées en priorité absolue, avant toute
  autre logique de jeu.

## 7. Fonctionnalités ajoutées

- **7.1 Export/journal** — `transcriptText()` / `exportTranscript()` (téléchargement `.txt`), plus
  envoi automatique de la conversation complète en fin de partie via Web3Forms
  (`sendCompletedConversation()`), et un formulaire de commentaire joueur (`sendFeedback()`).
- **7.2 Indicateur de dangerosité** — jauge de risque cumulée (`riskScore`, 0-100,
  `updateRisk()`), barre colorée (vert/orange/rouge selon le seuil), affichée en continu.
- **7.3 Vraies photos** — intégration de `alberte-bourde-reelle.png` et `bouton-radio.png`.

## 9. UX / UI

- **9.1 UX** :
  - Indice progressif après 2 échecs (`HINT_AFTER`), garde-fou anti-blocage après 5 échecs
    (`AUTO_ADVANCE_AFTER`) avec déblocage automatique et message dédié.
  - Barre de progression permanente (`#progFill`), plus la barre de risque (`#riskFill`).
  - Sauvegarde/reprise de partie via `localStorage` (`saveState`, `loadSavedState`,
    `resumeGame`) : un rechargement de page ne fait plus tout perdre.
- **9.2 UI graphique** : police Courier New conservée pour l'ambiance, tag « LYON · 1942 » en
  en-tête, deux boutons de mode différenciés (plein / ghost). *Non traité aujourd'hui* : texture
  papier/sépia, remplacement des émojis par des pictos sobres — reste à faire (cf. section 9.2 de
  `RESO-retours-tests.md`).

---

## Corrections de fin de journée (retours de playtest supplémentaires)

- **Scénario `discretion`** : la réponse était validée en entier dès qu'un seul aspect
  (luminosité *ou* son) était traité, alors qu'Alberte demande les deux. Ajout d'un mécanisme
  générique de **consignes multiples** (`good.parts` + `handleParts()`) : chaque partie traitée
  est reconnue individuellement, la partie manquante est redemandée explicitement, et la partie
  n'est validée (avec passage à l'étape suivante) que lorsque les deux ont été couvertes.
- **Scénario `verrou`** : incohérence quand le joueur insiste sur un mot de passe déjà signalé
  comme faible (« vas-y, garde 1900 ») — le mot « non » présent dans la phrase faisait basculer à
  tort sur une réponse positive d'Alberte, alors que le joueur maintenait le mauvais choix. Ajout
  d'un mécanisme d'**insistance** (`bad.insistKw`) : après un premier mauvais réflexe, si le joueur
  persiste, le risque augmente encore et un message système (pas une réplique d'Alberte) signale le
  danger, sans qu'Alberte ne se déjuge de façon incohérente.
- **Scénario `photo`** : l'intro proposait déjà un lieu précis (« devant la porte »), ce qui
  orientait la question vers un choix d'emplacement plutôt que vers la question de fond (faut-il
  prendre une photo du tout ?). Reformulée en question technique neutre (« comment je m'y prends
  pour la prendre, cette image ? ») : les élèves doivent désormais comprendre d'eux-mêmes qu'il ne
  faut prendre aucune photo, plutôt que de choisir un meilleur endroit où la prendre. Mots-clés
  bon/mauvais réflexe et puces de suggestion mis à jour en conséquence.
- **Lien « Retour »** : le lien fixe en haut à gauche pointait vers `../index.html` (le hub des
  autres jeux du dossier `Jeux`). Ce jeu n'étant pas connecté à ce hub, le lien pointe maintenant
  vers `reso-alberte.html` (rechargement → retour au menu du jeu lui-même) et le texte est devenu
  « ← Retour au menu ».
- **Scénario `recharge` : choix de la prise électrique** — nouvelle mécanique en deux temps, à
  partir de 4 photos fournies (une prise femelle d'époque + 3 prises mâles, une seule correcte,
  la française à broches rondes) :
  - Quand le joueur dit qu'il faut charger le téléphone, Alberte accepte le principe puis demande
    *laquelle* des 3 prises utiliser (elle affiche les 3 photos), en prévenant que se tromper
    « fera tout sauter » — d'où l'importance d'être vigilant.
  - Mauvaise réponse (prise américaine ou prise plate) → message de refus dédié, sans validation.
  - Si le joueur demande à quoi ressemble la prise du mur, Alberte montre la photo de la **prise
    femelle** murale pour comparaison (indice, sans pénalité).
  - Bonne réponse (prise ronde) → validation et passage à l'étape suivante.
  - Généralisation du mécanisme de relance « pourquoi » existant (`good.followKw`/`followReply`,
    déjà utilisé par `photo`) avec deux nouveaux champs réutilisables : `good.hintKw`/`hintReply`
    (indice à la demande) et `good.followRetry` (message d'échec propre à chaque scénario, au lieu
    du texte générique auparavant codé en dur dans `handleFollow()`).
  - Images ajoutées : `prise-femelle-epoque.jpg`, `prise-male-ronde-correcte.jpg`,
    `prise-electrique-male-americaine.jpg`, `prise-male-plate.jpg` (compressées et renommées).
  - Testé de bout en bout en conditions réelles (Playwright) : affichage des 3 photos, mauvaise
    réponse, indice, bonne réponse — aucun lien d'image cassé, aucune erreur console.

---

## Corrections du 2026-07-14

- **Scénario `allumer`** : l'intro décrivait une découverte de l'appareil (« sans le moindre
  bouton », « Extraordinaire, et pas la moindre ampoule »), incohérente avec `INTRO_ALBERTE` qui
  précise qu'Alberte s'en sert déjà depuis des mois. Reformulée en rappel/vérification (« je m'en
  sers chaque jour à présent… rappelez-moi comment »).
- **Scénario `recharge`** :
  - Un mauvais choix de prise (après l'indice) augmente désormais le risque (`good.followRetryRisk`,
    +10) et le message explique qu'« on n'a pas le droit à la moindre erreur », au lieu de ne
    rien coûter au joueur.
  - Demander à voir la prise murale déclenche une nouvelle sous-étape (`good.photoParts` +
    `handlePhotoHint()`) : Alberte doit d'abord se faire expliquer comment prendre une photo, puis
    comment l'envoyer, avant de révéler l'image de la prise femelle.
- **Scénario `photo`** : le message système « Mauvais réflexe » est maintenant personnalisable par
  scénario (`bad.alertText`) ; pour ce scénario il précise explicitement qu'il ne faut pas
  expliquer *comment* prendre la photo, mais conseiller de ne pas photographier la planque du tout.
- **Bug corrigé — faux positif sur mot-clé court** : dans le scénario `verrou`, taper « très
  mauvaise idée » était compris comme une validation du mauvais code (1900), le mot-clé `"va"` de
  `bad.kw` matchant par erreur dans « mauvaise ». Mot-clé retiré (couvert par « vas y ») et `norm()`
  normalise maintenant aussi les tirets (« vas-y » → « vas y »).
- **Scénario `profil` (finale)** :
  - Le lien hypertexte vers la fiche réelle d'Alberte Bourde est retiré (mention en texte simple,
    sans lien cliquable).
  - La réponse au « non, rien à signaler » reste ouverte (« Vous êtes certains ? Aucune autre
    information… ») au lieu de pointer directement vers la photo de profil, pour laisser les
    joueurs y penser d'eux-mêmes.
  - Une fois le risque de la vraie photo identifié, l'avatar est remplacé par un émoji 😎
    (`setAvatarAnon()`) au lieu d'initiales « A.B. ».
- **Fin de partie pilotée par le joueur** : après la dernière étape (`type: "finale"`), un chip
  « Fin de la conversation » apparaît au lieu d'un enchaînement automatique vers l'écran de
  victoire (`showEndChip()`), pour laisser le joueur choisir le moment de refermer la conversation.
- **Bouton de retour créateur** : un grand bouton « 💬 Faire un retour au créateur » a été ajouté
  sur l'écran d'accueil et sur l'écran de victoire (`.btn.big`), en plus de l'icône 💬 déjà présente
  dans l'en-tête.
