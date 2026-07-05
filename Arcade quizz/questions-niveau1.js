// Niveau 1 — Fake News & Esprit Critique
// 30 questions

var QUESTIONS_NIVEAU1 = [

  // ── Définir l'info ────────────────────────────────────────────
  {
    cat: "🔍 Définir l'info",
    q: "Qu'est-ce qu'une fake news ?",
    options: [
      "Une rumeur partagée sur les réseaux",
      "Une information en contradiction avec l'état des connaissances",
      "Une opinion présentée comme un fait",
      "Une publicité mensongère"
    ],
    answer: 1,
    expl: "Une fake news est une information contraire à la réalité des connaissances — elle n'est pas définie par l'intention mais par son contenu."
  },
  {
    cat: "🔍 Définir l'info",
    q: "Une fake news parle de… ?",
    options: [
      "Opinions et ressentis",
      "Faits vérifiables",
      "Théories scientifiques",
      "Contenus satiriques"
    ],
    answer: 1,
    expl: "Une fake news porte sur des faits, pas sur des opinions ou des ressentis qui sont par nature subjectifs."
  },
  {
    cat: "🔍 Définir l'info",
    q: "Une fake news peut-elle être partagée de bonne foi ?",
    options: [
      "Non, c'est toujours intentionnel",
      "Non, les gens savent qu'elle est fausse",
      "Oui, par des personnes sincères",
      "Oui, mais seulement sur les réseaux"
    ],
    answer: 2,
    expl: "Beaucoup de personnes partagent des fake news en croyant sincèrement qu'elles sont vraies. L'intention ne définit pas la fake news."
  },
  {
    cat: "🔍 Définir l'info",
    q: "\"La schizophrénie = avoir plusieurs personnalités\" est un exemple de… ?",
    options: [
      "Biais de confirmation",
      "Fake news provenant de la fiction",
      "Heuristique médicale",
      "Effet de cadrage"
    ],
    answer: 1,
    expl: "Cette idée répandue vient de séries et films, pas de la réalité médicale. C'est une fake news diffusée par la fiction populaire."
  },

  // ── Cadrage & perception ──────────────────────────────────────
  {
    cat: "🖼️ Cadrage & perception",
    q: "Qu'est-ce que l'effet de cadrage ?",
    options: [
      "Inventer une information de toutes pièces",
      "Supprimer le contexte d'une vidéo",
      "Orienter la compréhension d'une info vraie",
      "Amplifier une rumeur sur les réseaux"
    ],
    answer: 2,
    expl: "L'effet de cadrage consiste à présenter une information vraie d'une façon qui oriente la perception — sans mentir, mais en influençant le jugement."
  },
  {
    cat: "🖼️ Cadrage & perception",
    q: "L'illusion d'optique d'Adelson (cases A et B identiques) montre que… ?",
    options: [
      "Nos yeux fonctionnent mal",
      "Notre cerveau interprète la réalité selon le contexte",
      "Les images sur internet sont souvent retouchées",
      "On ne peut pas faire confiance aux photos"
    ],
    answer: 1,
    expl: "Le cerveau juge la couleur d'une case en fonction de ce qui l'entoure. Il interprète la réalité plutôt qu'il ne la voit — ce qui peut induire en erreur."
  },

  // ── Systèmes de pensée ────────────────────────────────────────
  {
    cat: "🧠 Systèmes de pensée",
    q: "Notre cerveau fonctionne selon combien de modes de pensée ?",
    options: [
      "Un seul",
      "Deux",
      "Trois",
      "Quatre"
    ],
    answer: 1,
    expl: "Le cerveau fonctionne en mode intuitif (rapide, automatique) et en mode analytique (lent, réfléchi)."
  },
  {
    cat: "🧠 Systèmes de pensée",
    q: "Quel est le mode de pensée « par défaut » du cerveau ?",
    options: [
      "Analytique",
      "Critique",
      "Intuitif",
      "Rationnel"
    ],
    answer: 2,
    expl: "Le mode intuitif est activé par défaut : il est rapide et économe en énergie, mais sujet aux erreurs de raisonnement."
  },
  {
    cat: "🧠 Systèmes de pensée",
    q: "Quel est le problème du mode intuitif sur les réseaux ?",
    options: [
      "Il est trop lent",
      "Il consomme trop d'énergie",
      "Il nous fait croire des choses fausses",
      "Il bloque le partage d'informations"
    ],
    answer: 2,
    expl: "Sur les réseaux, on est souvent en mode intuitif : on réagit vite à un titre sans analyser, ce qui favorise la propagation des fake news."
  },
  {
    cat: "🧠 Systèmes de pensée",
    q: "Qu'est-ce que l'heuristique ?",
    options: [
      "Une méthode de vérification des sources",
      "La tendance à tirer des conclusions sans tous les éléments",
      "Un biais lié aux émotions",
      "Un outil de fact-checking"
    ],
    answer: 1,
    expl: "L'heuristique est le raccourci mental qui pousse le cerveau à conclure même avec des informations incomplètes — source fréquente d'erreurs."
  },
  {
    cat: "🧠 Systèmes de pensée",
    q: "Dans l'énigme raquette + balle = 1,10 € (la raquette coûte 1 € de plus), combien coûte la balle ?",
    options: [
      "10 centimes",
      "1 euro",
      "5 centimes",
      "50 centimes"
    ],
    answer: 2,
    expl: "5 centimes est la bonne réponse (0,05 + 1,05 = 1,10). L'intuition dit 10 centimes — c'est une erreur classique du système intuitif."
  },
  {
    cat: "🧠 Systèmes de pensée",
    q: "Que montre l'énigme de la raquette et de la balle ?",
    options: [
      "Que les maths sont difficiles",
      "Que l'intuition peut nous faire rater la bonne réponse",
      "Que le mode analytique est toujours faux",
      "Que les réseaux sociaux biaisent le raisonnement"
    ],
    answer: 1,
    expl: "Cette énigme illustre que le système intuitif produit une réponse rapide mais fausse. Prendre le temps d'analyser change tout."
  },
  {
    cat: "🧠 Systèmes de pensée",
    q: "L'exemple du drapeau américain sur la lune illustre quel concept ?",
    options: [
      "Le biais de confirmation",
      "Le biais émotionnel",
      "L'heuristique — conclusion trop rapide",
      "L'effet de cadrage"
    ],
    answer: 2,
    expl: "Raisonner \"drapeau qui flotte = vent, pas de vent sur la lune = on a menti\" est un raccourci heuristique. La réalité : une barre maintient le drapeau."
  },
  {
    cat: "🧠 Systèmes de pensée",
    q: "Quelle est la vraie raison pour laquelle le drapeau tient sur la lune ?",
    options: [
      "Il y a un peu de vent sur la lune",
      "Le drapeau est maintenu par une barre en métal",
      "Le drapeau est très léger",
      "La NASA a truqué la vidéo"
    ],
    answer: 1,
    expl: "Le drapeau est tenu par une barre horizontale. Il n'a pas besoin de vent pour tenir — l'argument complotiste repose sur une prémisse fausse."
  },

  // ── Biais cognitifs ───────────────────────────────────────────
  {
    cat: "🎭 Biais cognitifs",
    q: "Qu'est-ce qu'un biais cognitif ?",
    options: [
      "Une erreur de mémoire",
      "Une manipulation médiatique",
      "Une erreur de raisonnement automatique",
      "Un manque d'information"
    ],
    answer: 2,
    expl: "Un biais cognitif est un filtre inconscient qui déforme notre traitement de l'information. Il peut nous faire tenir quelque chose pour vrai sans raison valable."
  },
  {
    cat: "🎭 Biais cognitifs",
    q: "Qu'est-ce que le biais de popularité ?",
    options: [
      "Croire une info parce qu'elle est émouvante",
      "Croire une info parce qu'elle confirme nos idées",
      "Faire confiance à quelqu'un de populaire même hors de son domaine",
      "Partager une info sans la vérifier"
    ],
    answer: 2,
    expl: "Le biais de popularité nous pousse à suivre l'avis d'une personne populaire ou d'une majorité, même quand ils n'ont pas de légitimité sur le sujet."
  },
  {
    cat: "🎭 Biais cognitifs",
    q: "Qu'est-ce que le biais émotionnel ?",
    options: [
      "Rejeter les informations qui nous contrarient",
      "Favoriser les infos qui provoquent une émotion",
      "Croire les infos des personnes qu'on aime",
      "Partager les infos tristes plutôt que joyeuses"
    ],
    answer: 1,
    expl: "Le biais émotionnel nous pousse à croire et retenir les informations qui suscitent une émotion forte — colère, peur, indignation — même si elles sont fausses."
  },
  {
    cat: "🎭 Biais cognitifs",
    q: "Pourquoi les réseaux raffolent-ils d'informations émouvantes ?",
    options: [
      "Car elles sont plus faciles à vérifier",
      "Car elles créent de l'engagement",
      "Car elles sont généralement vraies",
      "Car elles plaisent aux algorithmes de censure"
    ],
    answer: 1,
    expl: "Vraies ou fausses, les informations émouvantes génèrent plus de likes, partages et commentaires. Les plateformes les favorisent donc algorithmiquement."
  },
  {
    cat: "🎭 Biais cognitifs",
    q: "Qu'est-ce que le biais de confirmation ?",
    options: [
      "Croire une info parce qu'elle est populaire",
      "Privilégier les infos qui confirment ce qu'on pense déjà",
      "Rejeter toutes les informations nouvelles",
      "Faire confiance aux experts de son domaine"
    ],
    answer: 1,
    expl: "Le biais de confirmation pousse à chercher, croire et retenir les informations qui valident nos croyances existantes — et à ignorer celles qui les contredisent."
  },
  {
    cat: "🎭 Biais cognitifs",
    q: "Qu'est-ce que l'effet de Halo ?",
    options: [
      "Croire une info parce qu'elle est répétée",
      "Transférer la compétence de quelqu'un à un autre domaine",
      "Ignorer les infos qui contredisent nos croyances",
      "Faire confiance aux titres sans lire les articles"
    ],
    answer: 1,
    expl: "L'effet de Halo : si quelqu'un est perçu comme expert ou populaire dans un domaine, on lui fait confiance dans tous les domaines — même hors de sa compétence."
  },

  // ── Attitude critique ─────────────────────────────────────────
  {
    cat: "💡 Attitude critique",
    q: "Quel conseil pratique donne la formation avant de partager une info ?",
    options: [
      "Vérifier sur Google",
      "Demander à un ami",
      "Compter jusqu'à 2",
      "Attendre 24 heures"
    ],
    answer: 2,
    expl: "2 secondes suffisent pour reconsidérer une info avant de la partager. Ce petit délai permet de passer du mode intuitif au mode analytique."
  },
  {
    cat: "💡 Attitude critique",
    q: "\"Si une information est trop belle pour être vraie…\"",
    options: [
      "Elle vient probablement d'un expert fiable",
      "Elle est probablement fausse",
      "Elle mérite d'être partagée immédiatement",
      "Elle est peut-être satirique"
    ],
    answer: 1,
    expl: "Un adage utile : les informations trop belles, trop scandaleuses ou trop parfaites pour être vraies méritent une vérification immédiate."
  },
  {
    cat: "💡 Attitude critique",
    q: "\"Solution trop simple à un problème complexe\"… c'est généralement… ?",
    options: [
      "Une piste à explorer sérieusement",
      "Faux",
      "Une découverte scientifique majeure",
      "Une technique de cadrage médiatique"
    ],
    answer: 1,
    expl: "Si un problème complexe (comme le SIDA) avait une solution simple (le jus de citron), on l'aurait trouvée. La simplicité trop grande doit alerter."
  },
  {
    cat: "💡 Attitude critique",
    q: "Quelle question essentielle faut-il se poser selon la formation ?",
    options: [
      "\"Cette information est-elle récente ?\"",
      "\"Qui a partagé cette information ?\"",
      "\"Pourquoi est-ce que je crois ce que je crois ?\"",
      "\"Combien de sources citent cette information ?\""
    ],
    answer: 2,
    expl: "Interroger l'origine de ses propres croyances est la base de l'esprit critique. D'où viennent mes certitudes ? Sont-elles fondées sur des sources fiables ?"
  },
  {
    cat: "💡 Attitude critique",
    q: "Qu'est-ce que le consensus scientifique ?",
    options: [
      "Un vote entre politiciens et scientifiques",
      "L'accord de l'immense majorité des scientifiques d'un domaine",
      "Un rapport publié par l'ONU",
      "L'opinion d'un seul expert reconnu"
    ],
    answer: 1,
    expl: "Le consensus scientifique représente l'accord de la grande majorité des experts d'un domaine. C'est l'une des sources de connaissance les plus fiables."
  },
  {
    cat: "💡 Attitude critique",
    q: "Sur le réchauffement climatique, quelle source est la plus fiable ?",
    options: [
      "Un documentaire grand public",
      "Un film catastrophe",
      "Un article de presse people",
      "La parole d'un expert du domaine"
    ],
    answer: 3,
    expl: "Toutes les sources ne se valent pas. Un expert du domaine est plus fiable qu'un film ou un article non spécialisé sur un sujet scientifique."
  },
  {
    cat: "💡 Attitude critique",
    q: "Quelle citation est attribuée à Stephen Hawking dans la formation ?",
    options: [
      "\"Le doute est le début de la connaissance\"",
      "\"L'ennemi de la connaissance c'est l'illusion de la connaissance\"",
      "\"La science progresse grâce à l'erreur\"",
      "\"Croire sans preuves est dangereux\""
    ],
    answer: 1,
    expl: "Stephen Hawking : \"L'ennemi de la connaissance n'est pas l'ignorance, mais l'illusion de la connaissance.\" Croire qu'on sait empêche d'apprendre."
  },
  {
    cat: "💡 Attitude critique",
    q: "Pourquoi admettre son ignorance est-il utile face aux fake news ?",
    options: [
      "Pour éviter de blesser les autres",
      "Car admettre qu'on ne sait pas permet d'écouter et d'apprendre",
      "Car les experts n'aiment pas les gens arrogants",
      "Pour paraître plus crédible en ligne"
    ],
    answer: 1,
    expl: "Admettre son ignorance, c'est la première étape pour se remettre en question, écouter les experts et progresser. L'orgueil est un terreau fertile pour les fake news."
  },
  {
    cat: "💡 Attitude critique",
    q: "Qu'est-ce que la métacognition ?",
    options: [
      "Une technique de mémorisation",
      "La capacité à apprendre rapidement",
      "Prendre du recul sur le fonctionnement de son propre cerveau",
      "Un biais cognitif lié à l'émotion"
    ],
    answer: 2,
    expl: "La métacognition, c'est penser à sa propre façon de penser. Prendre conscience de ses biais permet de mieux les contrôler face aux fake news."
  },
  {
    cat: "💡 Attitude critique",
    q: "Pourquoi le présentateur ne révèle-t-il pas au début qu'il est docteur en psychologie ?",
    options: [
      "Pour tester la mémoire des élèves",
      "Pour montrer qu'on fait confiance sans vraiment savoir pourquoi",
      "Pour rendre la formation plus ludique",
      "Car ce n'est pas important pour le sujet"
    ],
    answer: 1,
    expl: "Les élèves lui font confiance dès le début sans savoir pourquoi. C'est une expérience méta : on accorde souvent une légitimité sans la vérifier."
  }
];
