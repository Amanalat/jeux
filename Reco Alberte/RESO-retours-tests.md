# RÉSO — Ligne clandestine avec Alberte B. — Retours de test à intégrer

Contexte : jeu de dialogue pédagogique (`reso-alberte.html`) pour le projet **CCN Self Data**,
destiné à des classes de collège. Alberte Bourde est une résistante lyonnaise de 1942 (inspirée
d'une vraie résistante), à qui les élèves apprennent à se servir d'un téléphone tombé du futur et
à protéger ses données. Ci-dessous, les retours du premier test, formalisés et priorisés pour
implémentation.

---

## 1. Bugs de logique à corriger

### 1.1 Faux positif du détecteur de mots-clés (scénario `phishing`)
Testé en conditions réelles : un joueur a répondu **« trop tard non ? »** (remarque hors-sujet,
pas un vrai refus argumenté) au scénario où un inconnu demande les noms du réseau. Le jeu l'a
validée comme bonne réponse, uniquement parce que le mot **« non »** est présent dans la phrase.
→ **À corriger** : renforcer la détection pour ce scénario (et vérifier les autres scénarios pour
le même risque) afin d'éviter les faux positifs sur des réponses qui contiennent un mot-clé
« bon réflexe » de façon incidente, sans réel sens de refus/prudence.

### 1.2 Alberte donne la réponse mais le jeu exige quand même de la retaper
Dans certains cas, quand le joueur se trompe, la réplique d'Alberte (`bad.reply`) contient déjà
implicitement la bonne conduite à tenir — pourtant le joueur doit retrouver/retaper un mot-clé
pour valider l'étape, alors qu'Alberte vient de le dire.
→ **À corriger** : après un mauvais réflexe, soit faciliter la validation en reprenant des
éléments de la réplique d'Alberte comme mots-clés valides pour la relance, soit ajuster le texte
d'Alberte pour qu'il ne « spoile » pas une réponse que le joueur doit encore trouver seul.

---

## 2. Écriture & personnalité d'Alberte

### 2.1 Alberte est trop « plan-plan » : varier les réponses
Le message d'incompréhension (`reactUnknown` / `retry`) est identique à chaque fois
(« Je ne suis pas sûre de comprendre… Dis-moi plus clairement ce que je dois faire. »).
→ Prévoir **plusieurs variantes** tirées aléatoirement, pour cette réplique et plus généralement
pour les relances, afin qu'Alberte semble plus vivante.

### 2.2 Remplacer le message d'incompréhension par défaut
Remplacer (ou ajouter en variante) par un ton plus chaleureux, par exemple :
> « Je ne suis pas encore très à l'aise, on peut revoir tout ça ensemble ? »

### 2.3 Jouer sur le décalage de sens des mots entre 1942 et aujourd'hui
Direction d'écriture générale : exploiter les mots dont le sens a changé ou qui n'existaient pas
en 1942 (« application », « portable », « réseau »...) pour créer des quiproquos savoureux.

- **Exemple déjà validé** (scénario `allumer`, le bouton pour allumer l'écran) : Alberte pourrait
  réagir en prenant en photo un bouton de couture d'archive, par méprise sur le mot « bouton »,
  avant de comprendre le bon sens.
- **Mots anglais/modernes qui doivent la perturber** : notamment **« selfie »**. Réplique-type
  fournie et validée :
  > « Pardon, même si le Général de Gaulle est allé à Londres, je n'ai pas encore assez de
  > connaissances en anglais pour te répondre. »
  À généraliser à d'autres anglicismes qui apparaîtraient dans le jeu (« slide », etc.) : Alberte
  doit marquer une perplexité explicite avant qu'on lui explique, plutôt que de comprendre tout
  de suite.

### 2.4 Réactions aux références historiques qu'Alberte connaît
Alberte est censée connaître des réalités de 1942/la Résistance (Gestapo, étoile jaune, Milice,
marché noir, etc.). **Si l'élève emploie ces termes dans sa réponse, Alberte doit réagir en
connaissance de cause** (les reconnaître, y faire écho), et pas rester neutre comme si c'était un
mot-clé générique. Cela renforce à la fois le réalisme du personnage et l'ancrage historique
(Lyon, 1942, guerre mondiale) qui, actuellement, n'est pas assez rappelé dans le jeu.

### 2.5 Mots trop complexes (rappel)
Des mots comme « paramètres » ou « slide » sont trop complexes/anachroniques pour Alberte : elle
doit marquer sa perplexité (cf. 2.3) plutôt que de les utiliser ou de les comprendre sans réagir.

> ⚠️ **Point encore flou, à trancher** : la remarque originale mentionnait aussi « Logo et
> mégaphone ? » à côté de « Selfie », sans que ce soit éclairci avec l'équipe — je ne sais pas
> s'il s'agit d'autres mots/icônes qui doivent perturber Alberte, ou d'une idée de visuel
> (logo, icône mégaphone) à ajouter dans l'interface. À reclarifier avant implémentation.

---

## 3. Structure & rythme du jeu

### 3.1 Rééquilibrer usage technique vs self-data
Actuellement, sur 9 scénarios, 4 portent sur la prise en main technique du téléphone
(`allumer`, `luminosite`, `silence`, `recharge`) et 5 sur le self-data/vie privée (`verrou`,
`photo`, `phishing`, `contacts`, `wifi`). Le retour de test juge cela trop orienté « usage
technique » par rapport à l'objectif pédagogique (self-data).
→ **Réduire le nombre d'étapes techniques** (les fusionner ou les raccourcir) au profit des
scénarios self-data, qui sont le vrai cœur pédagogique du projet.

### 3.2 Réordonnancer : technique d'abord, self-data ensuite
Actuellement les scénarios techniques et self-data sont entremêlés dans le tableau `SCENARIOS`.
→ **Réordonner** pour que tous les scénarios techniques (`allumer`, `luminosite`, `silence`,
`recharge`) passent **avant** tous les scénarios self-data (`verrou`, `photo`, `phishing`,
`contacts`, `wifi`), afin de d'abord installer la prise en main de l'outil puis d'aborder les
enjeux de données.

---

## 4. Nouveau mécanisme de fin : la photo de profil d'Alberte

Nouvelle idée de gameplay validée pour conclure le jeu :

1. Les élèves doivent aller chercher la **vraie photo d'Alberte Bourde** (résistante réelle) sur
   la fiche : https://www.francaislibres.net/liste/fiche.php?&index=57413&1783951494
2. Cette photo est utilisée comme **photo de profil** d'Alberte dans le chat.
3. **Nouvelle question finale** : Alberte demande aux élèves s'il y a autre chose dans sa façon
   d'avoir configuré/utilisé le chat qui pourrait poser problème.
4. **Les élèves doivent trouver seuls** que le problème est justement d'avoir mis sa **véritable
   photo** en photo de profil (son visage réel, identifiable, expose une résistante clandestine).

→ Nécessite un nouveau scénario/étape de fin avec sa propre logique de détection de bonne/mauvaise
réponse (l'élève doit identifier le risque lié à la photo de profil réelle), à ajouter après le
scénario `wifi` (dernier scénario self-data) et avant l'écran de victoire.

---

## 5. Intro et outro à réécrire

**Intro** (à ajouter, en plus ou en remplacement du texte d'intro actuel) — Alberte doit
introduire l'idée qu'elle veut re-vérifier ce qu'elle sait, utile aussi pour la rejouabilité :
> « Même si vous m'avez déjà appris tout cela, j'aimerais revoir tout ça avec vous, pour être
> certaine que je comprends bien. »

**Outro** (écran de victoire actuel jugé trop abrupt) — remplacer/compléter le texte de l'écran
`win` par :
> « Vous m'avez aidée, et vous avez aidé la Résistance, bravo ! Maintenant, il faudrait que vous
> puissiez aider toutes les générations qui viennent, en créant des outils pour leur apprendre à
> être plus vigilants sur leurs données personnelles. »

(Cette formule fait aussi le lien avec le mécanisme de fin décrit en section 4, qui doit se
dérouler juste avant cet écran de victoire.)

---

## 6. Sécurité / cadre scolaire

Le public est constitué de collégiens et écoliers, en contexte scolaire. Deux points de vigilance
identifiés lors des tests :

- **Réponses violentes ou choquantes tapées par les élèves** (exemple rencontré : « prend une et
  tue les tous ! »). → Prévoir une détection de ce type de réponse et une réaction d'Alberte qui
  soit **critique de cette approche** (plutôt qu'un simple message d'incompréhension générique),
  sans pour autant être moralisatrice ou punitive.
- **Idéations suicidaires potentiellement évoquées** dans les réponses tapées par les élèves. →
  Le niveau de langage et les mécanismes de réaction du jeu doivent tenir compte du fait que ce
  sont des mineurs en cadre scolaire : prévoir une gestion adaptée et prudente si ce type de
  contenu apparaît dans les saisies libres (ne pas l'ignorer silencieusement, ne pas non plus le
  traiter comme une simple mauvaise réponse de jeu).

---

## 7. Fonctionnalités à ajouter

### 7.1 Export / journal des échanges
Ajouter un moyen de récupérer la retranscription des échanges d'une partie (ex. export texte/JSON
téléchargeable, ou log consultable), pour permettre à l'équipe pédagogique d'analyser les parties
jouées et d'affiner les mots-clés de détection après coup.

### 7.2 Indicateur de dangerosité
Ajouter un indicateur visuel du niveau de risque pris par Alberte au fil de la partie.
> ⚠️ **Question ouverte pour Claude Code** : forme exacte à trancher — jauge de risque cumulée,
> voyant/feu tricolore, compteur d'alertes, etc. Pas de préférence exprimée à ce stade par
> l'équipe : à proposer et discuter avec eux avant implémentation.

### 7.3 Intégration de vraies photos
Réfléchir à intégrer de vraies photos dans le jeu (au-delà des émojis actuels), en cohérence avec
le mécanisme de la section 4 (photo de profil d'Alberte).

---

## 8. Points restés ouverts (à ne pas trancher seul, à reconfirmer avec l'équipe)

- Section 2.5 : signification exacte de « Logo et mégaphone » (autres mots à ajouter à la liste
  des perplexités d'Alberte, ou idée de visuel d'interface ?).
- Section 7.2 : forme précise de l'indicateur de dangerosité.

---

## 9. UX / UI

### 9.1 UX — parcours et blocages

- **Indices progressifs** : après 2 échecs sur la même étape, Alberte doit donner un indice plus
  explicite. Actuellement, `retry()` relance juste par « Alors… qu'est-ce que je fais,
  finalement ? » sans jamais aider davantage, quel que soit le nombre de tentatives.
- **Garde-fou anti-blocage en classe** : après un nombre de tentatives ratées sur une même étape
  (ex. 4-5), débloquer automatiquement l'étape avec un message du type « on retient la leçon, on
  continue », pour éviter qu'un groupe reste bloqué pendant que les autres avancent — contrainte
  importante en usage salle de classe, en temps limité.
- **Barre de progression permanente** plutôt qu'un message ponctuel « Étape validée X/10 » qui
  défile puis disparaît dans le fil de discussion : un repère fixe (en haut ou en bas de l'écran)
  aiderait l'élève à se situer dans la partie à tout moment.
- **Sauvegarde d'état / reprise** : aujourd'hui, un rechargement de page fait tout perdre (aucune
  persistance de `idx`/progression). À prévoir une sauvegarde légère (stockage local ou autre),
  utile en contexte scolaire où une session peut être interrompue (sonnerie, coupure wifi/tablette).

### 9.2 UI — aspect graphique

- **Décalage esthétique à retravailler** : l'interface reprend un mockup de messagerie très
  actuel (bulles type WhatsApp, emoji 👩‍🦱, police système), ce qui dessert un peu le concept de
  contraste 1942/futur qu'incarne Alberte. Pistes :
  - une légère texture « papier »/sépia en fond ou sur le header, en plus du tag « LYON · 1942 »
    déjà présent mais discret ;
  - remplacer les émojis très datés visuellement (👩‍🦱, 🕊️, 📱) par des pictos simples et neutres
    (SVG traits fins) ;
  - exploiter davantage le style machine à écrire déjà utilisé pour les bulles d'Alberte
    (Courier New), par exemple sur l'en-tête ou les écrans de victoire/défaite.
- **Contraste et lisibilité en salle de classe** : le vert accent sur fond très sombre est
  élégant sur écran personnel, mais à vérifier sur vidéoprojecteur/TBI ou tablette en luminosité
  basse — risque de mauvaise lisibilité en conditions réelles de cours.
- **Différenciation visuelle des 2 modes** (Normal / Avancé) : actuellement un bouton plein et un
  bouton « ghost », peu parlant visuellement. Un habillage plus contrasté (icône, couleur, badge
  « avec aide »/« sans aide ») aiderait des collégiens à choisir plus rapidement et clairement.
- **Logo RÉSO** : pour l'instant un simple texte espacé (`R É S O`) ; un petit habillage
  graphique (mini-logo, style tampon/estampille clandestine) renforcerait l'identité visuelle du
  projet.
