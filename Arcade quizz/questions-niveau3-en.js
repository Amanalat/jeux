// Level 3 — Rhetoric & Critical Thinking (high school, 15-18 ans)
// Source : rhétorique.txt (transcription formation Antonin J.)

var QUESTIONS_NIVEAU3 = [
  // ── Influence & rhetoric ────────────────────────────────────
  {
    cat: "📣 Influence & rhetoric",
    q: "Rhetoric is defined as:",
    options: [
      "The art of lying to persuade",
      "The art of persuading, convincing or impressing an audience using words",
      "The study of grammar and textual style",
      "A speech memorization technique"
    ],
    answer: 1,
    expl: "The rhetoric, it is the art of influencer : persuade ou impressionner by The mots (et The images). En avoir conscience allows de ne pas se laisser manipuler."
  },
  {
    cat: "📣 Influence & rhetoric",
    q: "Are we all influenceable?",
    options: [
      "No, only poorly educated people are",
      "Non, the esprit critique rend totalement impermeable to the influence",
      "Yes, but it is not necessarily bad — it depends on context",
      "Yes, and it is always negative"
    ],
    answer: 2,
    expl: "Choisir A chargeur with 2686 bonnes notes plutot What A with 3000 mauvaises notes, it is de the influence sociale utile. The influencabilite is not good ou bad en soi — tout depend of the context."
  },
  {
    cat: "📣 Influence & rhetoric",
    q: "The experience de Asch (\"experience Some lignes\") demontre that :",
    options: [
      "The people ignorent The opinions Some autres quand they are sûrs of eux",
      "The individus adaptent their answers according to ce that disent The autres, same si it is false",
      "The experts are moins influencables that The novices",
      "The influence sociale n'existe that in The groupes de plus de 10 people"
    ],
    answer: 1,
    expl: "in this experience, Some participants donnaient de mauvaises answers on The longueur de lignes simplement parce that The autres (complices) The faisaient. Nous adaptons our answers au groupe, same against the evidence."
  },
  {
    cat: "📣 Influence & rhetoric",
    q: "The rhetoric ne s'appuie that on The mots. true ou false?",
    options: [
      "true — The rhetoric is exclusivement A discipline orale",
      "false — The images et The videos can aussi persuade, notamment en jouant on the emotion",
      "true — The images n'ont aucun effet rhetoric demontre",
      "false — The rhetoric designe uniquement The techniques de manipulation visuelles"
    ],
    answer: 1,
    expl: "\"On va aussi montrer How The images, The videos can persuade en jouant notamment on the emotion.\" The rhetoric moderne depasse largement The seul discours oral."
  },

  // ── Speaker, audience, interlocutor ────────────────────────
  {
    cat: "🎙️ Speaker, audience, interlocutor",
    q: "The speaker is:",
    options: [
      "The person being persuaded",
      "The person trying to persuade",
      "The referee or moderator of a debate",
      "The audience listening without intervening"
    ],
    answer: 1,
    expl: "The orateur tente de persuade. it s'adresse to A interlocuteur et/ou A audience — these trois roles are distincts et pas always occupes by The same people."
  },
  {
    cat: "🎙️ Speaker, audience, interlocutor",
    q: "Which is The difference between the audience et the interlocuteur?",
    options: [
      "Aucune, ce are Some synonymes",
      "The audience is The personne to who on s'adresse directement; the interlocuteur is The audience",
      "The interlocuteur is The personne to who on s'adresse directement; the audience is the ensemble Some people who ecoutent",
      "The interlocuteur is always The same that the audience"
    ],
    answer: 2,
    expl: "in A debat televise, chaque candidat s'adresse to its interlocuteur adverse — mais its true objectif is de persuade the audience (The telespectateurs). audience et interlocuteur are not forcement The same."
  },
  {
    cat: "🎙️ Speaker, audience, interlocutor",
    q: "in A debat politique televise, Which is The true audience cible Some candidats?",
    options: [
      "their interlocuteur adverse",
      "The journalists who moderent",
      "The telespectateurs (the audience)",
      "The sondeurs who evaluent The debat after"
    ],
    answer: 2,
    expl: "\"The but is not de persuade ton opposant politique de venir in ton camp, mais de persuade ceux who regardent The debat.\" The interlocuteur is A do-valoir, the audience is The true cible."
  },

  // ── Types of rhetoric ───────────────────────────────────────
  {
    cat: "🎭 Types of rhetoric",
    q: "in A monologue, the audience can-it couper The parole to the orateur?",
    options: [
      "Oui, it is the essence same of the monologue",
      "Non, the orateur parle without etre interrompu",
      "Oui, mais uniquement for poser Some quisions",
      "Non, sauf si the orateur their donne explicitement The parole"
    ],
    answer: 1,
    expl: "A discours politique devant A foule is A monologue : the orateur parle, The audience ecoute. Personne ne the interrompt ni ne The against-argumente en direct."
  },
  {
    cat: "🎭 Types of rhetoric",
    q: "The deliberation is A mode rhetoric in lequel :",
    options: [
      "On cherche to impressionner The audience without dialoguer",
      "The deux parties dialoguent for arriver to A consensus",
      "The objectif is de battre the adversaire devant The audience",
      "it n'y a aucune regle — tout is permis"
    ],
    answer: 1,
    expl: "in A deliberation (ex : A couple who decide what do ce soir), The deux parties can changer of avis. The objectif is of arriver to A accord, pas de \"gagner\"."
  },
  {
    cat: "🎭 Types of rhetoric",
    q: "A couple discute for decider s'they regardent A serie ou sortent ce soir. It is of the mode :",
    options: [
      "Competition",
      "Conflit",
      "Monologue",
      "Deliberation"
    ],
    answer: 3,
    expl: "\"A couple who cherche what do ce soir... it is of the rhetoric au quotidien.\" The deux parties s'influencent mutuellement for arriver to A accord : it is A deliberation."
  },
  {
    cat: "🎭 Types of rhetoric",
    q: "The conflit rhetoric se distingue Some autres because :",
    options: [
      "it cherche to persuade The audience plus that the adversaire",
      "it is encadre by Some regles strictes de bienseance",
      "its but n'is ni de persuade ni of arriver to A consensus : it is A joute verbale",
      "it aboutit always to A consensus"
    ],
    answer: 2,
    expl: "\"The conflit, it is juste What on aime The plaisir of the joute verbale.\" A repas de famille who degenere, by example — personne ne cherche to persuade, it is juste The joute."
  },
  {
    cat: "🎭 Types of rhetoric",
    q: "Interpeller publiquement quelthat A on The social media for persuade its propres abonnes who lisent, it is of the :",
    options: [
      "Deliberation",
      "Competition",
      "Conflit",
      "Monologue"
    ],
    answer: 1,
    expl: "The competition : on s'adresse to A interlocuteur, mais The true objectif is de persuade the audience (The abonnes who lisent). The adversaire is A do-valoir, pas The true cible."
  },

  // ── Ingroup & outgroup ────────────────────────────────────
  {
    cat: "🏘️ Ingroup & outgroup",
    q: "The endogroupe designe :",
    options: [
      "The groupe What on cherche to persuade mais who is oppose to nous",
      "The groupe auquel appartient the orateur et with lequel it shares Some valeurs",
      "The ensemble of the audience lors of A debat",
      "The people neutres in A conflit"
    ],
    answer: 1,
    expl: "The endogroupe = its propre groupe (ceux who partagent dejto its valeurs). The exogroupe = The autres, ceux What on veut persuade. The strategie rhetoric is radicalement differente according to The cible."
  },
  {
    cat: "🏘️ Ingroup & outgroup",
    q: "according to The training, Which strategie Biden a-t-it choisie for The elections americaines?",
    options: [
      "persuade uniquement its camp democrate",
      "Ignorer The republicains for mobiliser its base",
      "persuade to The fois its endogroupe et A partie de the exogroupe (republicains moderes)",
      "Viser uniquement The electeurs independants"
    ],
    answer: 2,
    expl: "Biden voulait seduire aussi The republicains moderes → strategie endogroupe + exogroupe. Trump, lui, misait on The mobilisation intensive de its seul camp republicain radical."
  },
  {
    cat: "🏘️ Ingroup & outgroup",
    q: "according to The training, Trump visait principalement :",
    options: [
      "The ensemble Some Americains without distinction",
      "The Democrates for The convertir",
      "The independants hesitants",
      "its propre camp (endogroupe republicain) for The mobiliser massivement"
    ],
    answer: 3,
    expl: "\"Trump veut persuade uniquement its propre groupe (republicains assez radicaux) en esperant What it y en ait assez who soient motives for aller voter.\" it ne cherche pas to convertir the exogroupe."
  },

  // ── Ethos, Pathos, Logos ──────────────────────────────────────
  {
    cat: "🏷️ ethos, pathos, logos",
    q: "ethos persuades through:",
    options: [
      "Logic and numbers",
      "Emotions and compassion",
      "The speaker's credibility, ethics and status",
      "Repetition and the strength of the voice"
    ],
    answer: 2,
    expl: "ethos = ethique et credibilite. Se decline en ethos universel (invoquer Some grandes valeurs partagees) et ethos contextuel (use its statut ou its reputation personal)."
  },
  {
    cat: "🏷️ ethos, pathos, logos",
    q: "The ethos universel consiste to :",
    options: [
      "use its propre statut ou its reussites for persuade",
      "Invoquer Some grandes valeurs partagees (justice, liberte, fraternite…)",
      "Mentir on its parcours for paraitre plus credible",
      "Citer Some experts reconnus in its discours"
    ],
    answer: 1,
    expl: "\"it is scandaleux that in The pays Some Lumieres, Some people dorment encore dehors.\" Invoquer Some valeurs communes (fraternite, solidarite) is A ethos universel — on convoque Some principes partages."
  },
  {
    cat: "🏷️ ethos, pathos, logos",
    q: "The ethos contextuel consiste to :",
    options: [
      "Invoquer Some valeurs universelles partagees",
      "Jouer on the emotion de the audience",
      "Se baser on its propre situation, reputation ou experience for persuade",
      "Construire A syllogisme logique"
    ],
    answer: 2,
    expl: "\"J'ai etudie The rechauffement climatique pendant 20 ans, donc faites-moi confiance.\" use its statut of expert is A ethos contextuel — mais attention au bias of autorite."
  },
  {
    cat: "🏷️ ethos, pathos, logos",
    q: "pathos persuades through:",
    options: [
      "The logique et The demonstration rationnelle",
      "The audience's emotions and sensitivity",
      "Personal status or authority",
      "Shared moral values"
    ],
    answer: 1,
    expl: "pathos = emotion. Toucher The sensibilite, provoquer the empathie ou the indignation is A outil rhetoric tres puissant — mais it can aussi etre manipulatoire (fausses images tristes on The networks)."
  },
  {
    cat: "🏷️ ethos, pathos, logos",
    q: "logos persuades through:",
    options: [
      "The emotion et the empathie",
      "The speaker's reputation",
      "Logic and rational argumentation",
      "Some valeurs universelles partagees"
    ],
    answer: 2,
    expl: "logos = logique. \"Mon discours is pertinent parce What it is coherent.\" The syllogisme (Tous The hommes are mortels → Socrate is mortel) en is the example classique."
  },
  {
    cat: "🏷️ ethos, pathos, logos",
    q: "\"Tous The hommes are mortels. The reine Margot is mortelle. Donc The reine Margot is A homme.\" Ce reasoning is :",
    options: [
      "A syllogisme logique valide (logos correct)",
      "A pathos reussi",
      "A ethos contextuel fort",
      "A sophisme — A reasoning en apparence logique mais false"
    ],
    answer: 3,
    expl: "Attention aux false syllogismes! Ce reasoning ressemble to of the logos mais The structure is fallacieuse : etre mortel ne suffit pas to etre A homme. It is A sophisme classique."
  },
  {
    cat: "🏷️ ethos, pathos, logos",
    q: "Harrison Ford fact A discours against The changement climatique to Cannes, puis repart en jet prive. Which effet rhetoric this produit-it?",
    options: [
      "Renforce its ethos en montrant its engagement",
      "Affaiblit its ethos en revelant A contradiction between its paroles et its actes",
      "Renforce its pathos en montrant What it souffre of the crise climatique",
      "N'a aucun effet rhetoric because The actes ne comptent pas in A discours"
    ],
    answer: 1,
    expl: "\"The seule chose What on a retenue de its intervention, it is this hypocrisie.\" Attaquer the ethos (credibilite) of A orateur en montrant The contradiction between its actes et its paroles can ruiner tout A discours."
  },

  // ── Sophismes & bien débattre ─────────────────────────────────
  {
    cat: "🤝 Debating well",
    q: "A straw man consists of:",
    options: [
      "Faithfully risating the opposing argument before responding",
      "Caricaturing or exaggerating an opponent's argument to attack it more easily",
      "Looking for a point of agreement before debating",
      "Using statistics to contradict the opponent"
    ],
    answer: 1,
    expl: "\"The homme de paille, it is caricaturer The propos de your contradicteur et of attaquer The caricature.\" example : \"Vous The feministes, vous voulez tuer tous The hommes.\" Efficace emotionnellement, mais fallacieux."
  },
  {
    cat: "🤝 Debating well",
    q: "The steel man is a technique that consists of:",
    options: [
      "Exagerer the argument adverse for mieux The refuter",
      "Honisly risating the opponent's argument before responding",
      "Attacking the opponent's credibility rather than their arguments",
      "Using emotional force to crush the opponent"
    ],
    answer: 1,
    expl: "The homme de fer = the exact contraire de the homme de paille. On ecoute, puis on resume fidelement : \"Attends, je vais resumer ton argument et dis-moi si j'ai bien compris.\" this casse The dynamique conflictuelle et allows A debat on The fond."
  },
  {
    cat: "🤝 Debating well",
    q: "Why reformuler the argument de its adversaire (homme de fer) is-it benefique?",
    options: [
      "this allows de perdre of the temps for reflechir to its answer",
      "this montre What on respecte the adversaire, casse The tension et allows de debattre on The fond",
      "this oblige the adversaire to changer of argument",
      "It is utile uniquement in The debats formels et academiques"
    ],
    answer: 1,
    expl: "\"this casse The rythme et the engrenage of the violence, this montre What on ne considere pas its contradicteur as A ennemi, et this allows de debattre on The fond.\""
  },
  {
    cat: "🤝 Debating well",
    q: "according to The training, Why look for A point of accord with its adversaire?",
    options: [
      "for lui montrer What on a raison on tous The sujets",
      "for eviter The debat en trouvant A compromis facile",
      "for rendre The debat plus serein et progresser on The vrais points de desaccord",
      "for that the adversaire abandonne its idees plus vite"
    ],
    answer: 2,
    expl: "\"The fact of acter The point of accord ne supprime pas The contradictions. it y a always A pro-vaccin et A anti-vaccin. Mais this rend The debat plus serein.\" On progresse mieux quand on part of A terrain commun."
  },
  {
    cat: "🤝 Debating well",
    q: "Pro-vaccin et anti-vaccin : Which point of accord The training identifie-t-it?",
    options: [
      "The deux are of accord on the efficacite Some vaccins",
      "The deux veulent proteger The people, mais with Some methodes differentes",
      "The deux s'accordent for limiter The medicaments non tises",
      "it n'y a aucun point of accord possible between these deux positions"
    ],
    answer: 1,
    expl: "\"The point of accord : on veut proteger The people. On a juste A method differente.\" Partir de ce terrain commun allows A debat plus constructif that de s'opposer frontalement des The depart."
  },
  {
    cat: "🤝 Debating well",
    q: "\"It is to celui who affirme de prouver.\" this regle signifie :",
    options: [
      "Tout argument must etre prouve by The deux parties simultanement",
      "It is to celui who fact A affirmation of apporter The evidence, pas to the autre de prouver What it a tort",
      "The evidence ne are utiles that in The debats scientists",
      "Seul the orateur The plus experimente must prouver its affirmations"
    ],
    answer: 1,
    expl: "\"Si quelthat A affirme that Biden is A reptilien, je ne peux pas lui prouver What it a tort.\" It is to celui who affirme de prouver — pas to the autre de refuter. Renverser this regle cree Some impasses in The debat."
  },
  {
    cat: "🤝 Debating well",
    q: "for persuade efficacement, it is recommande of adapter its arguments :",
    options: [
      "Au plus grand nombre possible, without distinction",
      "Uniquement to its propre endogroupe",
      "Aux valeurs et to The perspective de its interlocuteur",
      "Aux seuls experts who maitrisent The topic"
    ],
    answer: 2,
    expl: "example vaccins Covid : aux Democrates on parlait de solidarite envers The plus vulnerables; aux Republicains de fierte nationale (vaccin americain) et de relance economique. Se mettre in The peau de the autre, it is of the rhetoric efficace."
  }
];
