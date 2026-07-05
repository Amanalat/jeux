# Product

## Register

product

## Users

Élèves de collège et lycée (11-18 ans), en classe, lors de séances d'éducation aux médias et à l'information (EMI) animées par un intervenant. Trois sets de difficulté (6e-5e, Niveau 1-2-3 lycée).

Contexte matériel réel : PC, tablettes, écrans tactiles ET vidéoprojecteur (l'écran est souvent lu à plusieurs mètres). Tout doit être jouable au clavier ET au doigt, et lisible à distance.

L'intervenant choisit la série de questions au hub (`index.html`), les élèves jouent. Sessions courtes, en classe, parfois en groupe devant le projecteur.

## Product Purpose

Faire travailler l'esprit critique face aux fake news et à la désinformation via des mini-jeux d'arcade (Snake, casse-briques, defender, whac-a-mole, blaster, QCM classique) qui partagent un même réservoir de questions (`qcm-store.js`).

Le cœur pédagogique : chaque question porte une explication (`expl`). Succès = l'élève apprend que la mécanique du jeu récompense le vrai ; erreur = occasion d'apprentissage (afficher la bonne réponse + l'explication). Si l'élève s'amuse mais n'apprend rien, c'est raté.

## Brand Personality

**Néon, ludique, bienveillant.** Salle d'arcade des années 80-90 revisitée : fonds très sombres, accents néon lumineux (cyan, magenta, vert), glow maîtrisé. L'identité passe d'abord par le néon (couleurs, lueurs) plus que par le pixel-art.

Les typographies rétro (Press Start 2P, Orbitron) sont des éléments de décor : titres courts, HUD, étiquettes. Tout ce qui se lit (questions, réponses, explications, règles) est en typo moderne très lisible (Nunito / Exo 2). Fun à l'écran, sérieux dans le contenu.

## Anti-references

- **Appli scolaire austère** (ENT, Pronote) : gris administratif, formulaires, tableaux tristes. Le jeu doit donner envie, pas rappeler le contrôle.
- **Kahoot et quiz colorés génériques** : déjà sur-vus en classe ; pas de grilles de boutons primaires violet/rose standard, identité propre obligatoire.
- Surenchère type jeu mobile publicitaire : pop-ups, récompenses clinquantes, effets criards qui parasitent la lecture.

## Design Principles

1. **Lisible à 5 mètres** : tout texte porteur d'information ≥ 13-14px, contraste fort sur fond sombre ; les polices décoratives ne portent jamais le contenu.
2. **L'erreur enseigne** : toute mauvaise réponse débouche sur la bonne réponse + son explication, jamais sur une simple punition.
3. **Doigt et clavier à égalité** : chaque interaction de jeu a un équivalent tactile ; cibles tactiles ≥ 44px.
4. **Le néon décore, il ne crie pas** : glow et couleurs vives au service de la hiérarchie (état, feedback), pas du bruit.
5. **Un seul réservoir de questions** : la série choisie au hub s'applique partout ; aucun jeu ne redéfinit sa propre logique de contenu.

## Accessibility & Inclusion

- Lisibilité à distance (vidéoprojecteur) : tailles minimales 13-14px pour le corps, plus pour les éléments lus en groupe.
- Jouabilité tactile complète (tablettes, écrans tactiles) en plus du clavier.
- **Format adapté en option** : prévoir un mode/bascule pour élèves à besoins particuliers (dys, malvoyants) — police plus lisible, tailles augmentées, animations réduites. À proposer sans stigmatiser (réglage visible, pas caché).
- Pas de norme WCAG formelle visée, mais contrastes confortables exigés sur fond sombre.
