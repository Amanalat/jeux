# Plan de travail — Amélioration de "L'Arène Rhétorique ⚔️"

## Contexte

Jeu web (FR/EN) éducatif sur la rhétorique et les sophismes.
Fichiers concernés :
- `index.html` — structure, styles, i18n (FR/EN pour l'UI statique)
- `app.js` — logique + contenu FR (le jeu appelle ce fichier si langue = FR)
- `app-en.js` — logique + contenu EN (dupliqué, doit rester en miroir de `app.js`)

⚠️ **Point d'architecture important** : `app.js` et `app-en.js` sont deux fichiers quasi-identiques (même logique, contenu traduit en dur). Toute modification de logique doit être répercutée **dans les deux fichiers**, sinon les deux langues divergent. Envisager, si le temps le permet, de factoriser en un seul `app.js` + un objet de traduction séparé (`content.fr.js` / `content.en.js`) — voir tâche 6 optionnelle.

---

## 1. Corrections de bugs (priorité haute — à faire en premier)

### 1.1 Options EPL jamais mélangées
Dans `renderTurn()`, pour les questions `type:"epl"` :
```js
choices=EPL.map(o=>({...o}));
```
→ Corriger en :
```js
choices=shuffle(EPL.map(o=>({...o})));
```
À appliquer dans `app.js` **et** `app-en.js`.

### 1.2 Détection de bonne réponse fragile
Dans `answer()` et `renderTurn()`, la comparaison se fait via `b.innerHTML.startsWith(goodLabel)` — fragile et couplé au HTML.
→ Stocker l'id directement sur le bouton :
```js
choices.forEach(c=>{
  const b=document.createElement("button");
  b.className="abtn";
  b.dataset.id=c.id;                     // ← ajouté
  b.innerHTML=`${c.l}<span class="asub">${c.s}</span>`;
  b.onclick=()=>answer(line,c.id,b);
  ansDiv.appendChild(b);
});
```
Puis dans `answer()`, remplacer la recherche par innerHTML par :
```js
all.forEach(b=>{ if(b.dataset.id===line.a){b.classList.remove("dim");b.classList.add("good");} });
```

### 1.3 Pas de "retenter le combat" après une défaite
Actuellement seul `location.reload()` (repart de l'adversaire 1) est proposé après une défaite.
→ Ajouter un deuxième bouton sur l'écran de défaite : "🔁 Retenter cet adversaire" qui appelle `startMatch(foeIdx)` sans tout réinitialiser.

### 1.4 `nextbtn` hors du conteneur `#battle`
Nettoyage structurel : déplacer le `<button id="nextbtn">` à l'intérieur de `<div id="battle">` dans `index.html` pour que le DOM reflète la logique d'affichage (pas de changement de comportement visible, juste propreté du code).

---

## 2. Améliorations UX/UI

### 2.1 Indicateurs de progression
- Ajouter un compteur "Réplique X / N" (N = `foe.lines.length`) visible pendant le combat, par ex. sous la barre `#vs`.
- Ajouter un fil d'Ariane des 5 adversaires en haut de l'écran de combat (emoji de chaque adversaire, celui en cours surligné, les suivants en gris/verrouillés). Utile surtout maintenant qu'il y aura **5 adversaires** au total (voir section 4).

### 2.2 Focus clavier après réponse
Dans `answer()`, à la fin de la fonction, déplacer le focus vers le bouton "suivant" :
```js
$("nextbtn").focus();
```
(en plus du `scrollIntoView` déjà présent).

### 2.3 Confirmation avant de quitter un combat en cours
Sur le lien `.back-hub` (`← Retour aux jeux`), ajouter une confirmation si `#battle` est visible :
```js
document.querySelector(".back-hub").addEventListener("click", e=>{
  if(getComputedStyle($("battle")).display!=="none"){
    if(!confirm("Quitter l'arène ? Ta progression dans ce combat sera perdue.")) e.preventDefault();
  }
});
```

### 2.4 Récapitulatif de score en fin de partie
Suivre le nombre de bonnes/mauvaises réponses (nouvelle variable `let correctCount=0, totalCount=0;`, incrémentées dans `answer()`), puis afficher dans `victory()` et `lose()` un résumé, ex. :
> "Score final : 14 bonnes réponses sur 17 (82%)"

### 2.5 Bouton retenter un combat précis (lien avec 1.3)
Prévoir aussi qu'à l'écran de fin de victoire totale, on puisse choisir de rejouer un adversaire précis plutôt que tout reprendre depuis zéro (optionnel, si le temps le permet).

### 2.6 Petite animation d'apparition de la réplique adverse
Actuellement la bulle a déjà `animation:pop .3s ease` — s'assurer qu'elle se rejoue bien à chaque `renderTurn()` (retirer/rajouter la classe ou forcer un reflow si besoin), pour un effet plus vivant à chaque nouvelle réplique.

---

## 3. Accessibilité

### 3.1 Annonces dynamiques pour lecteurs d'écran
Sur `#riposte`, ajouter :
```html
<div id="riposte" aria-live="polite">
```

### 3.2 Barres de vie sémantiques
Sur `#hp-you` et `#hp-foe`, ajouter les attributs ARIA et les mettre à jour dans `updateHP()` :
```html
<div class="hpbar" id="hp-you" role="progressbar" aria-valuemin="0" aria-valuemax="6" aria-valuenow="6" aria-label="Conviction restante">
```
```js
$("hp-you").setAttribute("aria-valuenow", youHP);
$("hp-you").setAttribute("aria-valuemax", YOUMAX);
$("hp-foe").setAttribute("aria-valuenow", foeHP);
$("hp-foe").setAttribute("aria-valuemax", foe.hp);
```

### 3.3 Vérifier les contrastes
Vérifier `--mu:#b08891` sur fond `--bg:#1b0d11` (actuellement utilisé pour les sous-textes) avec un outil comme le contrast checker WebAIM — viser au moins AA (4.5:1) pour le texte informatif, ou l'assombrir légèrement si besoin.

### 3.4 Emojis décoratifs
Ajouter `aria-hidden="true"` sur les emojis purement décoratifs (`.femoji`, icônes dans les labels de réponse) pour éviter que le lecteur d'écran les épelle inutilement, et laisser le texte porter l'information.

---

## 4. Nouveau contenu pédagogique

### 4.1 Nouveaux sophismes à ajouter au tableau `FALLACIES`

**FR (`app.js`)** :
```js
{id:"circulaire", l:"🔄 Raisonnement circulaire", s:"la conclusion sert de preuve à elle-même"},
{id:"hareng",     l:"🐟 Hareng rouge",            s:"changer de sujet pour éviter de répondre"},
{id:"cherry",     l:"🍒 Cueillette des faits",     s:"ne montrer que les données qui arrangent"},
{id:"whatabout",  l:"🪞 Et toi alors ?",           s:"pointer l'hypocrisie de l'autre sans répondre sur le fond"},
```

**EN (`app-en.js`)** :
```js
{id:"circulaire", l:"🔄 Circular reasoning",  s:"the conclusion is used as its own proof"},
{id:"hareng",     l:"🐟 Red herring",         s:"changing the subject to dodge the question"},
{id:"cherry",     l:"🍒 Cherry-picking",       s:"only showing the data that fits"},
{id:"whatabout",  l:"🪞 Whataboutism",         s:"pointing at the other's hypocrisy instead of answering"},
```

⚠️ Garder les mêmes `id` dans les deux fichiers (seuls `l` et `s` sont traduits) — c'est la convention déjà en place dans le fichier existant.

### 4.2 Deux nouveaux adversaires

Ajouter au tableau `FOES`, après "Sénateur Brutus" :

#### 🕵️ Le Complotiste

- `name:"Le Complotiste"` (FR) / `"The Conspiracy Uncle"` (EN)
- `emoji:"🕵️"`, `desc:"a fait ses propres recherches"` (FR) / `"has done his own research"` (EN)
- `hp: 6` (7 répliques)
- **Intro (FR)** : *"Derrière son mur de post-its et d'articles imprimés, il pointe un doigt vers toi : « Ah, toi aussi tu crois ce qu'on te dit à la télé… Laisse-moi t'ouvrir les yeux. »"*
- **Intro (EN)** : *"Behind his wall of sticky notes and printed articles, he points a finger at you: 'Ah, you too believe what they tell you on TV… Let me open your eyes.'"*
- **Sophismes/ressorts à couvrir dans ses 7 répliques** (mélanger types) :
  1. `fall` → `cherry` (ne cite que les études qui l'arrangent, ignore le consensus scientifique)
  2. `fall` → `circulaire` (« c'est vrai parce que c'est écrit sur le site qui le prouve »)
  3. `fall` → `posthoc` (déjà existant — un événement suit un autre, donc causalité)
  4. `epl` → `pathos` (peur, sentiment de trahison, "ils nous cachent la vérité")
  5. `fall` → `preuve` (charge de la preuve inversée — déjà existant, "prouve-moi que ce n'est PAS un complot")
  6. `fall` → `nature` (déjà existant, méfiance envers "les produits chimiques" opposés au "naturel")
  7. `epl` → `ethos` (se présente comme le seul à "avoir fait ses recherches", légitimité auto-proclamée)

#### 👔 La Direction Greenwashing (PDG)

- `name:"La Directrice Greenwashing"` ou `"Le PDG Greenwashing"` (à choisir selon préférence, garder cohérence avec les autres noms) / EN: `"The Greenwashing CEO"`
- `emoji:"👔"` (ou `🏢`), `desc:"communicant⋅e corporate hors pair"` (FR) / `"master of corporate spin"` (EN)
- `hp: 6` (7 répliques)
- **Intro (FR)** : *"Sous les projecteurs d'une conférence de presse, iel ajuste son micro-cravate : « Chez nous, la planète est notre priorité n°1. Laissez-moi vous expliquer pourquoi vous avez tort de vous inquiéter. »"*
- **Intro (EN)** : *"Under the press conference lights, they adjust their lapel mic: 'Here, the planet is our #1 priority. Let me explain why you're wrong to worry.'"*
- **Sophismes/ressorts à couvrir dans ses 7 répliques** :
  1. `fall` → `hareng` (question sur les émissions de CO2 → répond en parlant de son programme de recyclage des gobelets)
  2. `fall` → `whatabout` ("et nos concurrents, ils font bien pire !")
  3. `fall` → `popu` (déjà existant, "10 millions de clients nous font confiance")
  4. `fall` → `halo` (déjà existant, une célébrité/expert hors-sujet vante l'entreprise)
  5. `epl` → `logos` (chiffres soigneusement choisis, cf. lien avec cherry-picking à évoquer dans l'explication)
  6. `epl` → `ethos` (valeurs affichées : "engagement", "responsabilité", sans preuve concrète)
  7. `fall` → `cherry` (un seul chiffre positif isolé, ex. "-5% d'émissions sur UNE usine" en passant sous silence le reste)

**Format attendu pour chaque réplique** (identique à l'existant) :
```js
{type:"fall", t:"« ... citation du personnage ... »",
 a:"id_bonne_reponse", opts:["id_distracteur1","id_distracteur2","id_distracteur3"],
 e:"Explication pédagogique avec <b>concept clé</b> en gras, 2-3 phrases, ton bienveillant et clair."}
```
Pour les distracteurs, choisir des sophismes déjà rencontrés dans le jeu (mélanger anciens et nouveaux) pour que le joueur ne devine pas la bonne réponse par élimination trop facile.

**Rédaction complète des 7+7 répliques FR + traduction EN** : à écrire en suivant scrupuleusement le ton pédagogique existant (voir les 3 adversaires actuels comme modèle de style — phrases courtes, exemples concrets, jamais moralisateur). C'est la tâche de contenu la plus longue : prévoir un passage de relecture pour vérifier que chaque explication est claire pour un public ado/jeune adulte.

### 4.3 Mise à jour de l'écran d'intro
Dans `index.html`, les textes `brief1/brief2/brief3` mentionnent "Trois adversaires" / "Bats les 3 adversaires" → mettre à jour en "5 adversaires" (FR et EN, dans le bloc `I18N.register`).

### 4.4 Vérifier l'équilibrage
Avec 5 adversaires, le total de `hp` cumulé et le rythme de régénération (`youHP=Math.min(YOUMAX,youHP+2)` entre chaque combat) doivent être retestés : est-ce que le joueur peut réalistement finir les 5 combats sans que le dernier soit trivial ou impossible ? Ajuster `YOUMAX`, la régénération inter-combats, ou le `hp` des nouveaux adversaires si besoin après quelques parties test.

---

## 5. Récapitulatif des fichiers à modifier

| Fichier | Modifications |
|---|---|
| `index.html` | Structure `nextbtn` (1.4), ARIA (3.1/3.2), confirmation quitter (2.3), textes intro "5 adversaires" (4.3), indicateur progression/fil d'Ariane (2.1) |
| `app.js` | Bugs 1.1/1.2/1.3, nouveaux `FALLACIES` FR (4.1), nouveaux `FOES` FR (4.2), score (2.4), focus clavier (2.2) |
| `app-en.js` | Idem en miroir, contenu EN |

---

## 6. (Optionnel) Refactor architecture i18n

Si le temps le permet : extraire le contenu (FOES, FALLACIES, EPL, tous les textes traduits) dans deux fichiers de données purs (`content.fr.js`, `content.en.js`), et garder un seul `app.js` avec la logique de jeu qui importe le contenu selon la langue. Bénéfice : plus aucun risque de divergence de logique entre FR/EN, et ajout de contenu futur facilité. **Ne pas faire cela avant d'avoir terminé les sections 1 à 4** — c'est un chantier séparé, à ne tenter que si tout le reste est stable et testé.

---

## 7. Plan de tests / QA avant de livrer

- [ ] Jouer une partie complète en FR, du début à la victoire finale sur les 5 adversaires
- [ ] Jouer une partie complète en EN, idem
- [ ] Vérifier qu'une défaite en cours de combat affiche bien le nouveau bouton "retenter" et qu'il fonctionne
- [ ] Vérifier au clavier (Tab + Entrée uniquement, sans souris) qu'on peut jouer une partie complète
- [ ] Vérifier avec un lecteur d'écran (VoiceOver ou NVDA) qu'au moins l'annonce de l'explication et de la vie restante sont perçues
- [ ] Tester sur mobile étroit (< 380px) que le nouvel indicateur de progression / fil d'Ariane ne casse pas la mise en page
- [ ] Vérifier que les options EPL apparaissent bien dans un ordre différent à chaque réplique (bug 1.1 corrigé)
- [ ] Relire toutes les nouvelles explications pédagogiques (FR + EN) pour clarté et cohérence de ton avec l'existant

---

## 8. Ordre d'implémentation recommandé

1. Bugs (section 1) — rapide, sans risque, base saine pour la suite
2. Accessibilité de base (section 3) — peu coûteux, gros impact
3. Nouveau contenu (section 4) — le plus long, à faire en FR d'abord puis traduire en EN
4. UX/UI (section 2) — vient ensuite, en particulier le fil d'Ariane qui dépend du nombre final d'adversaires
5. QA complet (section 7)
6. Refactor optionnel (section 6), seulement si tout le reste est validé
