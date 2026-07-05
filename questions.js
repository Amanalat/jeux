// ── QUESTIONS PAR DÉFAUT ─────────────────────────────────────
// Modifiez ce fichier pour personnaliser les questions utilisées
// par brick-breaker-quiz.html et whac-a-quiz.html.
//
// Format de chaque question :
//   q       — texte de la question / affirmation
//   options — tableau de 2 à 4 réponses
//   answer  — index (0-based) de la bonne réponse dans options
//   expl    — explication affichée après la bonne réponse (optionnel)

var DEFAULT_QCM = [
  {
    q: "Qu'est-ce qu'une Fake News ?",
    options: ["Une information fausse", "Un fait prouvé", "Une très vieille info", "Un article de presse"],
    answer: 0,
    expl: "✅ Une Fake News, c'est une information fausse ou inventée !"
  },
  {
    q: "Que faut-il vérifier en premier pour juger une info ?",
    options: ["Le nombre de likes", "La source de l'information", "La longueur du texte", "La couleur du site"],
    answer: 1,
    expl: "✅ Vérifier la source est essentiel pour juger une info !"
  },
  {
    q: "Quelle est la différence entre un fait et une opinion ?",
    options: ["Un fait est plus intéressant", "Un fait vient d'internet", "Un fait est prouvé, une opinion est un avis", "Une opinion est toujours vraie"],
    answer: 2,
    expl: "✅ Un fait est vérifiable, une opinion varie selon les personnes."
  },
  {
    q: "Les paréidolies, c'est quoi ?",
    options: ["Des raisonnements faux", "Des biais émotionnels", "Notre cerveau qui voit des choses inexistantes", "Des algorithmes cachés"],
    answer: 2,
    expl: "✅ Notre cerveau perçoit des formes là où il n'y en a pas !"
  },
  {
    q: "Comment fonctionne le système intuitif du cerveau ?",
    options: ["Lentement et précisément", "Vite, peu d'énergie, mais peut se tromper", "Lentement avec beaucoup d'énergie", "Il ne se trompe jamais"],
    answer: 1,
    expl: "✅ Rapide et économe, mais sujet aux erreurs !"
  },
  {
    q: "Qu'est-ce qu'un biais de popularité ?",
    options: ["Croire car c'est dit par un expert", "Croire car beaucoup de gens le partagent", "Vérifier sur plusieurs sites", "Partager les infos très vues"],
    answer: 1,
    expl: "✅ La popularité ne garantit pas la vérité !"
  },
  {
    q: "Le biais de confirmation, c'est quoi ?",
    options: ["Croire car c'est très partagé", "Accepter ce qui confirme nos croyances", "Vérifier auprès de plusieurs sources", "Lire uniquement des journaux fiables"],
    answer: 1,
    expl: "✅ On a tendance à croire ce qui conforte nos idées déjà établies."
  },
  {
    q: "Pourquoi les réseaux favorisent-ils les Fake News ?",
    options: ["Ils suppriment les vraies infos", "Leur algo pousse les contenus émotionnels", "Les journalistes n'y ont pas accès", "Ils bloquent les experts"],
    answer: 1,
    expl: "✅ Les contenus émotionnels se partagent davantage sur les réseaux !"
  },
  {
    q: "Bonne attitude face à une info incroyable ?",
    options: ["La partager immédiatement", "La croire si ça vient d'un ami", "Vérifier avant de croire ou partager", "L'ignorer complètement"],
    answer: 2,
    expl: "✅ Toujours vérifier et croiser les sources avant de partager !"
  },
  {
    q: "Quelle attitude résume l'esprit critique ?",
    options: ["Ne jamais faire confiance à personne", "Croire uniquement les vidéos", "Vérifier, accepter de se tromper, rester modeste", "Tout partager pour que les autres décident"],
    answer: 2,
    expl: "✅ L'esprit critique = vérifier, douter, rester humble !"
  },
];
