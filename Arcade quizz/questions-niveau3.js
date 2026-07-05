// Niveau 3 — Rhétorique & Esprit Critique (lycée, 15-18 ans)
// Source : rhétorique.txt (transcription formation Antonin J.)

var QUESTIONS_NIVEAU3 = [
  // ── Influence & rhétorique ────────────────────────────────────
  {
    cat: "📣 Influence & rhétorique",
    q: "La rhétorique est définie comme :",
    options: [
      "L'art de mentir pour convaincre",
      "L'art de persuader, convaincre ou impressionner un public en utilisant les mots",
      "L'étude de la grammaire et du style des textes",
      "Une technique de mémorisation des discours"
    ],
    answer: 1,
    expl: "La rhétorique, c'est l'art d'influencer : convaincre ou impressionner par les mots (et les images). En avoir conscience permet de ne pas se laisser manipuler."
  },
  {
    cat: "📣 Influence & rhétorique",
    q: "Sommes-nous tous influençables ?",
    options: [
      "Non, seules les personnes peu éduquées le sont",
      "Non, l'esprit critique rend totalement imperméable à l'influence",
      "Oui, mais ce n'est pas forcément mauvais — cela dépend du contexte",
      "Oui, et c'est toujours négatif"
    ],
    answer: 2,
    expl: "Choisir un chargeur avec 2686 bonnes notes plutôt qu'un avec 3000 mauvaises notes, c'est de l'influence sociale utile. L'influençabilité n'est pas bonne ou mauvaise en soi — tout dépend du contexte."
  },
  {
    cat: "📣 Influence & rhétorique",
    q: "L'expérience de Asch (\"expérience des lignes\") démontre que :",
    options: [
      "Les gens ignorent les opinions des autres quand ils sont sûrs d'eux",
      "Les individus adaptent leurs réponses selon ce que disent les autres, même si c'est faux",
      "Les experts sont moins influençables que les novices",
      "L'influence sociale n'existe que dans les groupes de plus de 10 personnes"
    ],
    answer: 1,
    expl: "Dans cette expérience, des participants donnaient de mauvaises réponses sur la longueur de lignes simplement parce que les autres (complices) le faisaient. Nous adaptons nos réponses au groupe, même contre l'évidence."
  },
  {
    cat: "📣 Influence & rhétorique",
    q: "La rhétorique ne s'appuie que sur les mots. Vrai ou faux ?",
    options: [
      "Vrai — la rhétorique est exclusivement une discipline orale",
      "Faux — les images et les vidéos peuvent aussi convaincre, notamment en jouant sur l'émotion",
      "Vrai — les images n'ont aucun effet rhétorique démontré",
      "Faux — la rhétorique désigne uniquement les techniques de manipulation visuelles"
    ],
    answer: 1,
    expl: "\"On va aussi montrer comment les images, les vidéos peuvent convaincre en jouant notamment sur l'émotion.\" La rhétorique moderne dépasse largement le seul discours oral."
  },

  // ── Orateur, auditoire, interlocuteur ────────────────────────
  {
    cat: "🎙️ Orateur, auditoire, interlocuteur",
    q: "L'orateur est :",
    options: [
      "La personne que l'on cherche à convaincre",
      "La personne qui tente de convaincre",
      "L'arbitre ou le modérateur d'un débat",
      "Le public qui écoute sans intervenir"
    ],
    answer: 1,
    expl: "L'orateur tente de convaincre. Il s'adresse à un interlocuteur et/ou un auditoire — ces trois rôles sont distincts et pas toujours occupés par les mêmes personnes."
  },
  {
    cat: "🎙️ Orateur, auditoire, interlocuteur",
    q: "Quelle est la différence entre l'auditoire et l'interlocuteur ?",
    options: [
      "Aucune, ce sont des synonymes",
      "L'auditoire est la personne à qui on s'adresse directement ; l'interlocuteur est le public",
      "L'interlocuteur est la personne à qui on s'adresse directement ; l'auditoire est l'ensemble des personnes qui écoutent",
      "L'interlocuteur est toujours le même que l'auditoire"
    ],
    answer: 2,
    expl: "Dans un débat télévisé, chaque candidat s'adresse à son interlocuteur adverse — mais son vrai objectif est de convaincre l'auditoire (les téléspectateurs). Auditoire et interlocuteur ne sont pas forcément les mêmes."
  },
  {
    cat: "🎙️ Orateur, auditoire, interlocuteur",
    q: "Dans un débat politique télévisé, quel est le vrai public cible des candidats ?",
    options: [
      "Leur interlocuteur adverse",
      "Les journalistes qui modèrent",
      "Les téléspectateurs (l'auditoire)",
      "Les sondeurs qui évaluent le débat après"
    ],
    answer: 2,
    expl: "\"Le but n'est pas de convaincre ton opposant politique de venir dans ton camp, mais de convaincre ceux qui regardent le débat.\" L'interlocuteur est un faire-valoir, l'auditoire est la vraie cible."
  },

  // ── Types de rhétorique ───────────────────────────────────────
  {
    cat: "🎭 Types de rhétorique",
    q: "Dans un monologue, l'auditoire peut-il couper la parole à l'orateur ?",
    options: [
      "Oui, c'est l'essence même du monologue",
      "Non, l'orateur parle sans être interrompu",
      "Oui, mais uniquement pour poser des questions",
      "Non, sauf si l'orateur leur donne explicitement la parole"
    ],
    answer: 1,
    expl: "Un discours politique devant une foule est un monologue : l'orateur parle, le public écoute. Personne ne l'interrompt ni ne le contre-argumente en direct."
  },
  {
    cat: "🎭 Types de rhétorique",
    q: "La délibération est un mode rhétorique dans lequel :",
    options: [
      "On cherche à impressionner le public sans dialoguer",
      "Les deux parties dialoguent pour arriver à un consensus",
      "L'objectif est de battre l'adversaire devant le public",
      "Il n'y a aucune règle — tout est permis"
    ],
    answer: 1,
    expl: "Dans une délibération (ex : un couple qui décide quoi faire ce soir), les deux parties peuvent changer d'avis. L'objectif est d'arriver à un accord, pas de \"gagner\"."
  },
  {
    cat: "🎭 Types de rhétorique",
    q: "Un couple discute pour décider s'ils regardent une série ou sortent ce soir. C'est du mode :",
    options: [
      "Compétition",
      "Conflit",
      "Monologue",
      "Délibération"
    ],
    answer: 3,
    expl: "\"Un couple qui cherche quoi faire ce soir... c'est de la rhétorique au quotidien.\" Les deux parties s'influencent mutuellement pour arriver à un accord : c'est une délibération."
  },
  {
    cat: "🎭 Types de rhétorique",
    q: "Le conflit rhétorique se distingue des autres car :",
    options: [
      "Il cherche à convaincre le public plus que l'adversaire",
      "Il est encadré par des règles strictes de bienséance",
      "Son but n'est ni de convaincre ni d'arriver à un consensus : c'est une joute verbale",
      "Il aboutit toujours à un consensus"
    ],
    answer: 2,
    expl: "\"Le conflit, c'est juste qu'on aime le plaisir de la joute verbale.\" Un repas de famille qui dégénère, par exemple — personne ne cherche à convaincre, c'est juste la joute."
  },
  {
    cat: "🎭 Types de rhétorique",
    q: "Interpeller publiquement quelqu'un sur les réseaux sociaux pour convaincre ses propres abonnés qui lisent, c'est de la :",
    options: [
      "Délibération",
      "Compétition",
      "Conflit",
      "Monologue"
    ],
    answer: 1,
    expl: "La compétition : on s'adresse à un interlocuteur, mais le vrai objectif est de convaincre l'auditoire (les abonnés qui lisent). L'adversaire est un faire-valoir, pas la vraie cible."
  },

  // ── Endogroupe & Exogroupe ────────────────────────────────────
  {
    cat: "🏘️ Endogroupe & Exogroupe",
    q: "L'endogroupe désigne :",
    options: [
      "Le groupe qu'on cherche à convaincre mais qui est opposé à nous",
      "Le groupe auquel appartient l'orateur et avec lequel il partage des valeurs",
      "L'ensemble du public lors d'un débat",
      "Les personnes neutres dans un conflit"
    ],
    answer: 1,
    expl: "L'endogroupe = son propre groupe (ceux qui partagent déjà ses valeurs). L'exogroupe = les autres, ceux qu'on veut convaincre. La stratégie rhétorique est radicalement différente selon la cible."
  },
  {
    cat: "🏘️ Endogroupe & Exogroupe",
    q: "Selon la formation, quelle stratégie Biden a-t-il choisie pour les élections américaines ?",
    options: [
      "Convaincre uniquement son camp démocrate",
      "Ignorer les républicains pour mobiliser sa base",
      "Convaincre à la fois son endogroupe et une partie de l'exogroupe (républicains modérés)",
      "Viser uniquement les électeurs indépendants"
    ],
    answer: 2,
    expl: "Biden voulait séduire aussi les républicains modérés → stratégie endogroupe + exogroupe. Trump, lui, misait sur la mobilisation intensive de son seul camp républicain radical."
  },
  {
    cat: "🏘️ Endogroupe & Exogroupe",
    q: "Selon la formation, Trump visait principalement :",
    options: [
      "L'ensemble des Américains sans distinction",
      "Les Démocrates pour les convertir",
      "Les indépendants hésitants",
      "Son propre camp (endogroupe républicain) pour le mobiliser massivement"
    ],
    answer: 3,
    expl: "\"Trump veut convaincre uniquement son propre groupe (républicains assez radicaux) en espérant qu'il y en ait assez qui soient motivés pour aller voter.\" Il ne cherche pas à convertir l'exogroupe."
  },

  // ── Ethos, Pathos, Logos ──────────────────────────────────────
  {
    cat: "🏷️ Ethos, Pathos, Logos",
    q: "L'Ethos sert à convaincre par :",
    options: [
      "La logique et les chiffres",
      "Les émotions et la compassion",
      "La crédibilité, l'éthique et le statut de l'orateur",
      "La répétition et la force de la voix"
    ],
    answer: 2,
    expl: "Ethos = éthique et crédibilité. Se décline en Ethos universel (invoquer des grandes valeurs partagées) et Ethos contextuel (utiliser son statut ou sa réputation personnelle)."
  },
  {
    cat: "🏷️ Ethos, Pathos, Logos",
    q: "L'Ethos universel consiste à :",
    options: [
      "Utiliser son propre statut ou ses réussites pour convaincre",
      "Invoquer des grandes valeurs partagées (justice, liberté, fraternité…)",
      "Mentir sur son parcours pour paraître plus crédible",
      "Citer des experts reconnus dans son discours"
    ],
    answer: 1,
    expl: "\"Il est scandaleux que dans le pays des Lumières, des gens dorment encore dehors.\" Invoquer des valeurs communes (fraternité, solidarité) est un Ethos universel — on convoque des principes partagés."
  },
  {
    cat: "🏷️ Ethos, Pathos, Logos",
    q: "L'Ethos contextuel consiste à :",
    options: [
      "Invoquer des valeurs universelles partagées",
      "Jouer sur l'émotion de l'auditoire",
      "Se baser sur sa propre situation, réputation ou expérience pour convaincre",
      "Construire un syllogisme logique"
    ],
    answer: 2,
    expl: "\"J'ai étudié le réchauffement climatique pendant 20 ans, donc faites-moi confiance.\" Utiliser son statut d'expert est un Ethos contextuel — mais attention au biais d'autorité."
  },
  {
    cat: "🏷️ Ethos, Pathos, Logos",
    q: "Le Pathos consiste à convaincre par :",
    options: [
      "La logique et la démonstration rationnelle",
      "L'émotion et la sensibilité de l'auditoire",
      "Son statut ou son autorité personnelle",
      "Des valeurs morales partagées"
    ],
    answer: 1,
    expl: "Pathos = émotion. Toucher la sensibilité, provoquer l'empathie ou l'indignation est un outil rhétorique très puissant — mais il peut aussi être manipulatoire (fausses images tristes sur les réseaux)."
  },
  {
    cat: "🏷️ Ethos, Pathos, Logos",
    q: "Le Logos consiste à convaincre par :",
    options: [
      "L'émotion et l'empathie",
      "La réputation de l'orateur",
      "La logique et l'argumentation rationnelle",
      "Des valeurs universelles partagées"
    ],
    answer: 2,
    expl: "Logos = logique. \"Mon discours est pertinent parce qu'il est cohérent.\" Le syllogisme (Tous les hommes sont mortels → Socrate est mortel) en est l'exemple classique."
  },
  {
    cat: "🏷️ Ethos, Pathos, Logos",
    q: "\"Tous les hommes sont mortels. La reine Margot est mortelle. Donc la reine Margot est un homme.\" Ce raisonnement est :",
    options: [
      "Un syllogisme logique valide (Logos correct)",
      "Un Pathos réussi",
      "Un Ethos contextuel fort",
      "Un sophisme — un raisonnement en apparence logique mais faux"
    ],
    answer: 3,
    expl: "Attention aux faux syllogismes ! Ce raisonnement ressemble à du Logos mais la structure est fallacieuse : être mortel ne suffit pas à être un homme. C'est un sophisme classique."
  },
  {
    cat: "🏷️ Ethos, Pathos, Logos",
    q: "Harrison Ford fait un discours contre le changement climatique à Cannes, puis repart en jet privé. Quel effet rhétorique cela produit-il ?",
    options: [
      "Renforce son Ethos en montrant son engagement",
      "Affaiblit son Ethos en révélant une contradiction entre ses paroles et ses actes",
      "Renforce son Pathos en montrant qu'il souffre de la crise climatique",
      "N'a aucun effet rhétorique car les actes ne comptent pas dans un discours"
    ],
    answer: 1,
    expl: "\"La seule chose qu'on a retenue de son intervention, c'est cette hypocrisie.\" Attaquer l'Ethos (crédibilité) d'un orateur en montrant la contradiction entre ses actes et ses paroles peut ruiner tout un discours."
  },

  // ── Sophismes & bien débattre ─────────────────────────────────
  {
    cat: "🤝 Bien débattre",
    q: "L'homme de paille consiste à :",
    options: [
      "Reformuler fidèlement l'argument adverse avant de répondre",
      "Caricaturer ou extrémiser l'argument adverse pour mieux l'attaquer",
      "Chercher un point d'accord avant de débattre",
      "Utiliser des statistiques pour contredire l'adversaire"
    ],
    answer: 1,
    expl: "\"L'homme de paille, c'est caricaturer le propos de votre contradicteur et d'attaquer la caricature.\" Exemple : \"Vous les féministes, vous voulez tuer tous les hommes.\" Efficace émotionnellement, mais fallacieux."
  },
  {
    cat: "🤝 Bien débattre",
    q: "L'homme de fer est une technique qui consiste à :",
    options: [
      "Exagérer l'argument adverse pour mieux le réfuter",
      "Reformuler honnêtement l'argument de l'adversaire avant de répondre",
      "Attaquer la crédibilité de l'adversaire plutôt que ses arguments",
      "Utiliser la force émotionnelle pour écraser l'adversaire"
    ],
    answer: 1,
    expl: "L'homme de fer = l'exact contraire de l'homme de paille. On écoute, puis on résume fidèlement : \"Attends, je vais résumer ton argument et dis-moi si j'ai bien compris.\" Cela casse la dynamique conflictuelle et permet un débat sur le fond."
  },
  {
    cat: "🤝 Bien débattre",
    q: "Pourquoi reformuler l'argument de son adversaire (homme de fer) est-il bénéfique ?",
    options: [
      "Cela permet de perdre du temps pour réfléchir à sa réponse",
      "Cela montre qu'on respecte l'adversaire, casse la tension et permet de débattre sur le fond",
      "Cela oblige l'adversaire à changer d'argument",
      "C'est utile uniquement dans les débats formels et académiques"
    ],
    answer: 1,
    expl: "\"Ça casse le rythme et l'engrenage de la violence, ça montre qu'on ne considère pas son contradicteur comme un ennemi, et ça permet de débattre sur le fond.\""
  },
  {
    cat: "🤝 Bien débattre",
    q: "Selon la formation, pourquoi chercher un point d'accord avec son adversaire ?",
    options: [
      "Pour lui montrer qu'on a raison sur tous les sujets",
      "Pour éviter le débat en trouvant un compromis facile",
      "Pour rendre le débat plus serein et progresser sur les vrais points de désaccord",
      "Pour que l'adversaire abandonne ses idées plus vite"
    ],
    answer: 2,
    expl: "\"Le fait d'acter le point d'accord ne supprime pas les contradictions. Il y a toujours un pro-vaccin et un anti-vaccin. Mais ça rend le débat plus serein.\" On progresse mieux quand on part d'un terrain commun."
  },
  {
    cat: "🤝 Bien débattre",
    q: "Pro-vaccin et anti-vaccin : quel point d'accord la formation identifie-t-elle ?",
    options: [
      "Les deux sont d'accord sur l'efficacité des vaccins",
      "Les deux veulent protéger les gens, mais avec des méthodes différentes",
      "Les deux s'accordent pour limiter les médicaments non testés",
      "Il n'y a aucun point d'accord possible entre ces deux positions"
    ],
    answer: 1,
    expl: "\"Le point d'accord : on veut protéger les gens. On a juste une méthode différente.\" Partir de ce terrain commun permet un débat plus constructif que de s'opposer frontalement dès le départ."
  },
  {
    cat: "🤝 Bien débattre",
    q: "\"C'est à celui qui affirme de prouver.\" Cette règle signifie :",
    options: [
      "Tout argument doit être prouvé par les deux parties simultanément",
      "C'est à celui qui fait une affirmation d'apporter les preuves, pas à l'autre de prouver qu'il a tort",
      "Les preuves ne sont utiles que dans les débats scientifiques",
      "Seul l'orateur le plus expérimenté doit prouver ses affirmations"
    ],
    answer: 1,
    expl: "\"Si quelqu'un affirme que Biden est un reptilien, je ne peux pas lui prouver qu'il a tort.\" C'est à celui qui affirme de prouver — pas à l'autre de réfuter. Renverser cette règle crée des impasses dans le débat."
  },
  {
    cat: "🤝 Bien débattre",
    q: "Pour convaincre efficacement, il est recommandé d'adapter ses arguments :",
    options: [
      "Au plus grand nombre possible, sans distinction",
      "Uniquement à son propre endogroupe",
      "Aux valeurs et à la perspective de son interlocuteur",
      "Aux seuls experts qui maîtrisent le sujet"
    ],
    answer: 2,
    expl: "Exemple vaccins Covid : aux Démocrates on parlait de solidarité envers les plus vulnérables ; aux Républicains de fierté nationale (vaccin américain) et de relance économique. Se mettre dans la peau de l'autre, c'est de la rhétorique efficace."
  }
];
