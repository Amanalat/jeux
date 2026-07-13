# Radar'naque — Audit UX/UI, corrections & nouveaux scénarios

Contexte : jeu d'entraînement anti-arnaques (`index.html`, `app.js`/`app-en.js`,
`scenarios.js`/`scenarios-en.js`, `styles.css`), conçu explicitement pour les seniors et
les personnes en difficulté avec le numérique (police Baloo 2, gros boutons, réglage de
taille de texte). Le joueur lit un message réaliste (SMS/e-mail/chat/appel/notif/image),
part en « enquête » pour cliquer sur les indices qui l'interpellent, puis tranche
fiable/arnaque, avant une correction détaillée. Déjà un très bon niveau d'accessibilité
de base (taille de texte, glossaire cliquable) — les corrections ci-dessous visent à
combler les trous plutôt qu'à tout refaire.

Logique JS quasi identique entre `app.js`/`app-en.js` et entre `scenarios.js`/
`scenarios-en.js` (juste le texte traduit et un style de guillemets différent) : les
corrections s'appliquent donc aux deux versions.

---

## 1. Bugs à corriger en priorité

### 1.1 [P0] Compteur d'indices trouvés se réinitialise faussement au retour en enquête
Le bouton « ↩ Revenir à l'enquête » (en phase décision) appelle `entrerSpotting()`, qui
reconstruit `#lower` avec le compteur **codé en dur à 0** :
```js
'<div class="spot-compteur" ...>Indices trouvés : <b>0</b> / ' + totalBon + '</div>'
```
Résultat : si le joueur a déjà trouvé 2 indices sur 3 puis revient à l'enquête, le
compteur affiche « 0 / 3 » alors que les indices restent visuellement surlignés en vert
dans le message. Le compteur ne se remet à jour que si le joueur retrouve un **nouvel**
indice — s'il avait déjà tout trouvé, le compteur reste bloqué à 0 en permanence pour
cette carte.
→ **Corriger** : à l'entrée dans `entrerSpotting()`, initialiser l'affichage du compteur
avec la valeur réelle de `foundBon` (pas `0` en dur), par exemple en appelant
`majCompteur()` juste après avoir injecté le HTML.

### 1.2 [P0] Le bouton de décision choisi n'est visuellement pas distingué
`repondre()` ajoute la classe `.choisi` au bouton cliqué (`arnaque` ou `fiable`), mais
**aucune règle CSS ne définit `.choisi`** dans `styles.css`. Une fois les deux boutons
désactivés (`opacity:.45`), rien ne permet de savoir lequel des deux a été cliqué — gênant
si le joueur remonte visuellement vérifier son choix après avoir lu la correction plus bas.
→ **Corriger** : ajouter un style `.choisi` (ex. bordure plus marquée, opacité pleine
contrairement à l'autre bouton grisé, ou une coche visible) pour que le choix reste lisible
après coup.

### 1.3 [P1] `celebrite-roses.jpg` ne contient pas la bonne image *(déjà signalé, à corriger avant livraison)*
Le fichier fourni sous ce nom est une capture d'écran WhatsApp/Mondial Relay, alors que le
code (`chat-celebrite`) l'utilise comme photo de profil du faux « Brad Pitt » romantique.
→ **Corriger** : obtenir la bonne image avant d'ajouter les assets dans `img/`.

### 1.4 [P1] `animerMessages()` écrite mais jamais appelée
La fonction qui affiche les messages un par un (délai de 620 ms, indicateur « en train
d'écrire » `.typing` déjà stylé en CSS) n'est appelée nulle part : les messages
s'affichent tous d'un coup. Comme convenu, je tranche moi-même sur ce point :
→ **Recommandation : réactiver cette fonctionnalité** (elle est déjà entièrement écrite et
renforce le réalisme du message reçu), en la conditionnant à
`window.matchMedia('(prefers-reduced-motion: reduce)')` pour rester accessible aux
personnes sensibles au mouvement (cf. 2.3).

### 1.5 [P2] Repères fragiles au moindre écart de texte
`activerReperes()` cherche le texte exact de `r.texte` dans les nœuds de texte via
`TreeWalker` + `range.surroundContents`, avec un `try/catch` qui **échoue silencieusement**
(`break`) si le texte n'est pas trouvé tel quel (apostrophe typographique différente,
texte à cheval sur un `<br>` dans un corps d'e-mail, etc.). Résultat : un indice peut
devenir invisible/non cliquable sans qu'aucune erreur ne remonte nulle part.
→ **Corriger** : logger un avertissement en console (`console.warn`) quand un repère n'est
pas trouvé dans le DOM, pour repérer facilement ce genre de désynchronisation entre
`scenarios.js` et `REPERES` lors de l'ajout de nouveaux scénarios (utile en particulier
pour les 3 scénarios proposés en section 4).

### 1.6 [P2] Styles FR/EN incohérents dans `scenarios.js`/`scenarios-en.js`
Les deux fichiers contiennent exactement les mêmes 28 scénarios, mais `scenarios.js` est
écrit en JS compact (guillemets simples, une ligne par objet) alors que
`scenarios-en.js` est en style JSON étalé (guillemets doubles, une clé par ligne). Pas un
bug fonctionnel, mais ça complique la maintenance en parallèle des deux fichiers.
→ **Suggestion** : harmoniser le style d'écriture entre les deux fichiers (pas urgent).

---

## 2. Accessibilité

### 2.1 [P0] Repères non accessibles au clavier
Les `span.repere` (et l'image cliquable en mode deepfake) ne sont accessibles qu'à la
souris : pas de `tabindex`, pas de gestion clavier (Entrée/Espace), pas de rôle explicite.
Un joueur au clavier ou avec lecteur d'écran ne peut pas atteindre la phase d'enquête —
particulièrement problématique pour un jeu qui affiche « Pensé pour l'accessibilité » en
en-tête de son propre CSS.
→ **Corriger** : ajouter `role="button"`, `tabindex="0"` et une gestion `keydown`
Entrée/Espace sur chaque `.repere`, à l'image de ce qui est déjà fait pour les mots du
glossaire (`.gloss`) — le code existe déjà comme modèle à suivre.

### 2.2 [P0] Contour de focus supprimé sur des champs de saisie, sans remplacement fort
`.sonde-why:focus{outline:none}` et `.fb-modal input:focus, textarea:focus{outline:none}`
suppriment le contour de focus par défaut du navigateur, remplacé seulement par un léger
changement de couleur de bordure (`border-color:var(--bleu)`). Pour un public senior/
malvoyant, c'est un repère de navigation essentiel à ne pas affaiblir.
→ **Corriger** : remplacer par un contour bien visible (`outline` épais + `outline-offset`,
ou `box-shadow` marqué) plutôt que de simplement retirer l'`outline` natif.

### 2.3 [P1] Aucune gestion de `prefers-reduced-motion`
Contrairement à « Répare la Une ! » (qui gère déjà cette préférence), Radar'naque n'a
aucune règle `@media (prefers-reduced-motion: reduce)`, alors que le jeu utilise plusieurs
animations (`pop`, `blink`, `hintPulse`, `hintPulseImg`) — et en utiliserait potentiellement
plus si `animerMessages()` est réactivée (1.4).
→ **Corriger** : ajouter une règle globale désactivant/réduisant ces animations quand la
préférence système le demande.

### 2.4 [P1] États dynamiques non annoncés aux lecteurs d'écran
Ni `aria-pressed` sur les boutons de décision (`.decide button`) une fois choisis, ni
`aria-live` sur les zones qui changent dynamiquement (`#feedback` de correction,
`#spot-compteur`, la petite fenêtre `.spot-pop`). Un lecteur d'écran ne signale donc pas
ces changements de contenu.
→ **Corriger** : ajouter `aria-pressed` sur les boutons de décision, et `aria-live="polite"`
sur les zones mises à jour dynamiquement.

### 2.5 [P2] Boîtes de dialogue natives incohérentes avec le design
`confirm()` (retour au menu) et `alert()` (validation du formulaire d'avis, erreurs
d'envoi) sont des dialogues natifs du navigateur, visuellement en rupture avec le reste de
l'interface très travaillée (police, couleurs, cartes). Pas un problème d'accessibilité en
soi, plutôt de cohérence visuelle.
→ **Suggestion** : remplacer par des modales internes cohérentes avec `.modal`/`.fb-overlay`
déjà existants dans le CSS.

### 2.6 [P2] Contraste à vérifier
`--texte-doux:#4a5b73` sur fond clair, utilisé pour des textes secondaires à des tailles
variées — à vérifier précisément avec un outil de contraste, vu le public visé
explicitement par ce jeu (WCAG AA/AAA à privilégier pour un public senior/malvoyant).

---

## 3. Plan de correction priorisé (résumé)

**P0 — à corriger en premier**
1. Corriger l'affichage du compteur d'indices au retour en enquête (1.1).
2. Styler `.choisi` pour distinguer le bouton de décision cliqué (1.2).
3. Rendre les repères accessibles au clavier (2.1).
4. Remplacer les `outline:none` par un contour de focus visible (2.2).

**P1 — important**
5. Corriger/remplacer l'image `celebrite-roses.jpg` (1.3).
6. Réactiver `animerMessages()` avec gestion `prefers-reduced-motion` (1.4 + 2.3).
7. Ajouter `aria-pressed`/`aria-live` sur les éléments dynamiques (2.4).

**P2 — amélioration**
8. Logger un avertissement si un repère n'est pas trouvé dans le DOM (1.5).
9. Harmoniser le style d'écriture FR/EN de `scenarios.js` (1.6).
10. Remplacer `confirm()`/`alert()` par des modales internes (2.5).
11. Vérifier le contraste des textes secondaires (2.6).

---

## 4. Nouveaux scénarios à ajouter (images fournies)

Les 3 scénarios ci-dessous utilisent les images non encore référencées
(`visage-ia-homme.jpg`, `visage-ia-femme.jpg`, `deepfake-manifestation.jpg`). Textes en
français uniquement pour l'instant — traduction vers `scenarios-en.js` à faire séparément
(à la charge de Claude Code ou de l'équipe, selon préférence).

⚠️ Conséquence sur l'équilibre du jeu : ces ajouts font passer le corpus à environ **22
scénarios "arnaque" pour 9 "fiables"**. Le tirage en début de partie s'équilibre déjà tout
seul à chaque partie (voir `demarrer()`), donc ce n'est pas un bug, mais si vous voulez
resserrer le ratio à terme, prévoir l'ajout de 1-2 nouveaux scénarios "fiables".

### 4.1 `image-deepfake-manifestation` (deepfake-manifestation.jpg)
Variante du deepfake politique déjà existant (`image-deepfake`, qui utilise
`deepfake-arrestation.jpg`), avec un contexte français différent, pour montrer que le
réflexe s'applique à n'importe quelle personnalité.

```js
{
  id: 'image-deepfake-manifestation',
  canal: 'image',
  image: 'img/deepfake-manifestation.jpg',
  legende: '« Le Président pris à partie par ses propres forces de l’ordre en pleine manif ! Ce qu’ils ne veulent pas que vous voyiez… » — Partagé 62 000 fois',
  verdict: 'arnaque',
  categorie: 'Image générée par IA (« deepfake ») / intox',
  indices: [
    'Détails incohérents : chiffres sans queue ni tête sur les casques/écussons, visages flous ou dédoublés dans la foule.',
    'Aucun média sérieux ne relaie cette scène.',
    'La légende joue sur le complot et l’émotion (« ce qu’ils ne veulent pas que vous voyiez »).',
    'Une image seule ne prouve rien : elle peut être fabriquée en quelques secondes.'
  ],
  reflexe: 'Avant de croire ou de partager une image choc, cherchez l’info sur plusieurs médias reconnus. Zoomez sur les détails (mains, inscriptions, visages en arrière-plan).',
  explication: 'Comme pour toute image choc, le sujet importe peu (une célébrité, un homme politique, un inconnu) : le réflexe est le même. Si l’événement n’est repris nulle part ailleurs, il n’a probablement pas eu lieu.'
}
```

Entrée `REPERES` correspondante :
```js
'image-deepfake-manifestation': [
  { texte:'__IMG__', bon:true, aide:'Regardez l’image de près : les visages dans la foule, les inscriptions sur les casques vous paraissent-ils cohérents ? Cliquez dessus.', note:'Zoomez : chiffres sans signification sur les casques, visages flous ou déformés en arrière-plan — signes d’une image générée par IA.' },
  { texte:'ce qu’ils ne veulent pas que vous voyiez', bon:true, aide:'Cherchez la formule qui joue sur le complot et l’émotion.', note:'Formule complotiste classique pour faire réagir sans vérifier.' },
  { texte:'Partagé 62 000 fois', bon:false, note:'Le nombre de partages ne prouve rien : le faux circule aussi vite, voire plus vite, que le vrai.' }
],
```

### 4.2 `chat-faux-profil-rencontre` (visage-ia-homme.jpg)
Complète `chat-celebrite` (qui enseigne « une célébrité ne vous drague pas en privé ») en
montrant qu'un profil parfaitement ordinaire et crédible peut aussi être entièrement
fabriqué.

```js
{
  id: 'chat-faux-profil-rencontre',
  canal: 'chat',
  plateforme: 'Appli de rencontre',
  contact: 'Philippe M. 😊',
  avatar: 'img/visage-ia-homme.jpg',
  messages: [
    { from:'eux', texte:'Bonjour ! Ton profil m’a tout de suite plu 😊' },
    { from:'eux', texte:'Je suis ingénieur, actuellement en mission sur une plateforme pétrolière offshore. On discute depuis 3 semaines, j’ai l’impression de te connaître depuis toujours.' },
    { from:'eux', texte:'J’ai un souci pour rentrer : la douane me réclame 400 € de frais que je n’ai pas sur moi ici. Tu pourrais m’avancer ça ? Je te rembourse dès mon retour, promis ❤️' }
  ],
  verdict: 'arnaque',
  categorie: 'Arnaque aux sentiments / faux profil',
  indices: [
    'Une relation qui devient intense en quelques semaines seulement, sans jamais s’être vus.',
    'Un métier qui justifie d’être loin et injoignable (plateforme offshore, mission à l’étranger…) : très classique.',
    { risque: 'La demande d’argent finit toujours par arriver — ici sous forme de « frais de douane ».' },
    'Le profil a l’air tout à fait normal, pas une célébrité : une photo crédible ne prouve rien, elle peut être générée par IA.'
  ],
  reflexe: 'Dès qu’une rencontre en ligne demande de l’argent, même une petite somme « à rembourser vite », c’est une arnaque. Aucune exception.',
  explication: 'Contrairement au faux « Brad Pitt », ce genre de profil ne cherche pas à impressionner par la célébrité, mais par la normalité et la proximité construite au fil des messages. La photo, générée par IA, est indétectable à l’œil nu : c’est le comportement (argent demandé) qui doit alerter, pas l’apparence.'
}
```

Entrée `REPERES` correspondante :
```js
'chat-faux-profil-rencontre': [
  { texte:'ingénieur, actuellement en mission sur une plateforme pétrolière offshore', bon:true, aide:'Pourquoi cette personne est-elle si difficile à joindre ou à rencontrer en vrai ? Cherchez le prétexte.', note:'Métier classique qui justifie d’être loin et indisponible.' },
  { texte:'On discute depuis 3 semaines', bon:true, aide:'Cette relation évolue-t-elle à une vitesse normale ?', note:'Relation qui progresse très vite en ligne : signal d’alerte.' },
  { texte:'400 € de frais', bon:true, aide:'Que finit-on toujours par vous demander dans ce genre d’échange ?', note:'Demande d’argent : le signe qui ne trompe jamais.' },
  { texte:'Ton profil m’a tout de suite plu', bon:false, note:'Compliment banal d’ouverture : agréable, mais pas un indice en soi.' }
],
```

### 4.3 `chat-fausse-vendeuse-acompte` (visage-ia-femme.jpg)
Fait pendant du scénario "fiable" déjà présent `chat-leboncoin-paiement-securise-ok` :
même contexte de petite annonce, mais ici la « vendeuse » pousse à sortir du paiement
sécurisé de la plateforme.

```js
{
  id: 'chat-fausse-vendeuse-acompte',
  canal: 'chat',
  plateforme: 'Leboncoin (contact WhatsApp)',
  contact: 'Camille D.',
  avatar: 'img/visage-ia-femme.jpg',
  messages: [
    { from:'eux', texte:'Bonjour ! Oui, l’article est toujours disponible 😊' },
    { from:'eux', texte:'Comme j’ai beaucoup de messages, je vous demande un acompte de 30 € par virement direct pour bloquer l’annonce, en dehors de Leboncoin (ça évite les frais de la plateforme).' },
    { from:'eux', texte:'Dès réception je retire l’annonce et on organise la remise en main propre.' }
  ],
  verdict: 'arnaque',
  categorie: 'Paiement hors plateforme (fausse vendeuse)',
  indices: [
    'On vous pousse à payer EN DEHORS du site/de l’appli, soi-disant pour « éviter les frais ».',
    'Demande d’un acompte avant même d’avoir vu l’objet ou fixé un rendez-vous.',
    { risque: 'Une fois le virement fait hors plateforme, il n’y a plus aucune protection : l’argent est perdu si l’objet n’existe pas.' },
    'Une photo de profil accueillante ne garantit rien : elle peut être fausse.'
  ],
  reflexe: 'Sur une plateforme d’annonces, le paiement doit toujours passer par le système sécurisé du site. Aucun « acompte » par virement direct, jamais.',
  explication: 'C’est l’inverse exact du scénario "vente Leboncoin sécurisée" : ici, dès qu’on vous fait sortir du système protégé, vous perdez toute garantie. Le prétexte (« éviter les frais ») est presque toujours signe d’arnaque.'
}
```

Entrée `REPERES` correspondante :
```js
'chat-fausse-vendeuse-acompte': [
  { texte:'en dehors de Leboncoin', bon:true, aide:'Où vous pousse-t-on à effectuer le paiement, par rapport à la plateforme ?', note:'On vous fait sortir du système sécurisé de la plateforme : signal classique.' },
  { texte:'acompte de 30 € par virement direct', bon:true, aide:'Vous demande-t-on de l’argent avant même d’avoir vu l’objet ?', note:'Demande de paiement direct avant tout contact réel : prudence.' },
  { texte:'ça évite les frais de la plateforme', bon:true, aide:'Quel prétexte utilise-t-on pour justifier de sortir du paiement sécurisé ?', note:'Prétexte classique pour vous faire sortir du paiement sécurisé.' },
  { texte:'toujours disponible', bon:false, note:'Réponse banale de vendeur : agréable, mais pas un indice en soi.' }
],
```

---

## 5. Points restés ouverts

- Section 1.3 : obtenir la bonne image pour `celebrite-roses.jpg` (le fichier actuel ne
  correspond pas à l'usage prévu dans le code).
- Section 4 : traduction anglaise des 3 nouveaux scénarios pour `scenarios-en.js`, à
  faire séparément.
- Section 4 : décision à prendre (pas urgente) sur l'ajout de nouveaux scénarios
  "fiables" pour rééquilibrer le corpus à terme.
