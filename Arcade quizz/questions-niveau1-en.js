// Level 1 — Fake News & Critical Thinking
// 30 questions

var QUESTIONS_NIVEAU1 = [

  // ── Defining information ────────────────────────────────────────────
  {
    cat: "🔍 Defining information",
    q: "What is fake news?",
    options: [
      "A rumour shared on social media",
      "information that contradicts current knowledge",
      "An opinion presented as a fact",
      "A misleading advertisement"
    ],
    answer: 1,
    expl: "A fake news is A information contraire to The reality Some connaissances — it is not definie by the intention mais by its contenu."
  },
  {
    cat: "🔍 Defining information",
    q: "Fake news is about…?",
    options: [
      "opinions and feelings",
      "Verifiable facts",
      "Scientific theories",
      "Satirical content"
    ],
    answer: 1,
    expl: "A fake news porte on Some facts, pas on Some opinions ou Some ressentis who are by nature subjectifs."
  },
  {
    cat: "🔍 Defining information",
    q: "Can fake news be shared in good faith?",
    options: [
      "No, it is always intentional",
      "No, people know it is false",
      "Yes, by sincere people",
      "Yes, but only on social media"
    ],
    answer: 2,
    expl: "many de people partagent Some fake news en croyant sincerement What they are vraies. The intention ne definit pas The fake news."
  },
  {
    cat: "🔍 Defining information",
    q: "\"The schizophrenie = avoir several personnalites\" is A example de…?",
    options: [
      "bias de confirmation",
      "Fake news provenant of the fiction",
      "Heuristique medicale",
      "Effet de framing"
    ],
    answer: 1,
    expl: "this idee repandue vient de series et films, pas of the reality medicale. It is A fake news spread by The fiction populaire."
  },

  // ── Framing & perception ──────────────────────────────────────
  {
    cat: "🖼️ Framing & perception",
    q: "What is the framing effect?",
    options: [
      "Making information up entirely",
      "Removing the context from a video",
      "Steering how true information is understood",
      "Amplifying a rumour on social media"
    ],
    answer: 2,
    expl: "The framing effect consiste to presenter A information true of A facon who oriente The perception — without mentir, mais en influencant The jugement."
  },
  {
    cat: "🖼️ Framing & perception",
    q: "The illusion of optique of Adelson (cases A et B identiques) montre that…?",
    options: [
      "Our eyes work badly",
      "Our brain interprete The reality according to The context",
      "images on the Internet are often edited",
      "photos cannot be trusted"
    ],
    answer: 1,
    expl: "The brain juge The couleur of A case en fonction de ce who the entoure. it interprete The reality plutot What it ne The voit — ce who can induire en error."
  },

  // ── Thinking systems ────────────────────────────────────────
  {
    cat: "🧠 Thinking systems",
    q: "Our brain fonctionne according to combien de modes de pensee?",
    options: [
      "One",
      "Two",
      "Three",
      "Four"
    ],
    answer: 1,
    expl: "The brain fonctionne en mode intuitif (fast, automatique) et en mode analytique (slow, reflechi)."
  },
  {
    cat: "🧠 Thinking systems",
    q: "Which is The mode de pensee « by defaut » of the brain?",
    options: [
      "Analytical",
      "Critical",
      "Intuitive",
      "Rational"
    ],
    answer: 2,
    expl: "The mode intuitif is active by defaut : it is fast et econome en energie, mais topic aux errors de reasoning."
  },
  {
    cat: "🧠 Thinking systems",
    q: "Which is The probleme of the mode intuitif on The networks?",
    options: [
      "It is too slow",
      "it consomme trop of energie",
      "it nous fact believe Some choses fausses",
      "it bloque The shares of information"
    ],
    answer: 2,
    expl: "on The networks, on is often en mode intuitif : on reagit vite to A titre without analyser, ce who favorise The propagation Some fake news."
  },
  {
    cat: "🧠 Thinking systems",
    q: "What is a heuristic?",
    options: [
      "A method for checking sources",
      "The tendency to draw conclusions without all the evidence",
      "A bias linked to emotions",
      "A fact-checking tool"
    ],
    answer: 1,
    expl: "The heuristique is The raccourci mental who pousse The brain to conclude same with Some information incompletes — source frequente of errors."
  },
  {
    cat: "🧠 Thinking systems",
    q: "in the enigme raquette + balle = 1,10 € (The raquette coûte 1 € de plus), combien coûte The balle?",
    options: [
      "10 cents",
      "1 euro",
      "5 cents",
      "50 cents"
    ],
    answer: 2,
    expl: "5 cents is The good answer (0,05 + 1,05 = 1,10). The intuition dit 10 cents — it is A error classique of the systeme intuitif."
  },
  {
    cat: "🧠 Thinking systems",
    q: "that montre the enigme of the raquette et of the balle?",
    options: [
      "that The maths are difficiles",
      "that the intuition can nous do rater The good answer",
      "that The mode analytique is always false",
      "that The social media biaisent The reasoning"
    ],
    answer: 1,
    expl: "this enigme illustre that The systeme intuitif produit A answer fast mais false. Prendre The temps of analyser change tout."
  },
  {
    cat: "🧠 Thinking systems",
    q: "The example of the drapeau americain on The lune illustre Which concept?",
    options: [
      "confirmation bias",
      "Emotional bias",
      "Heuristic — too-fast conclusion",
      "The framing effect"
    ],
    answer: 2,
    expl: "Raisonner \"drapeau who flotte = vent, pas de vent on The lune = on a menti\" is A raccourci heuristique. The reality : A barre maintient The drapeau."
  },
  {
    cat: "🧠 Thinking systems",
    q: "Which is The true raison for laquelle The drapeau tient on The lune?",
    options: [
      "There is a little wind on the Moon",
      "The flag is held up by a metal bar",
      "The flag is very light",
      "NASA faked the video"
    ],
    answer: 1,
    expl: "The drapeau is tenu by A barre horizontale. it n'a pas besoin de vent for tenir — the argument complotiste repose on A premisse false."
  },

  // ── Cognitive biases ───────────────────────────────────────────
  {
    cat: "🎭 Cognitive biases",
    q: "What is a cognitive bias?",
    options: [
      "A error de memoire",
      "Media manipulation",
      "An automatic reasoning error",
      "A lack of information"
    ],
    answer: 2,
    expl: "A bias cognitive is A filtre inconscient who deforme our traitement de the information. it can nous do tenir quelque chose for true without raison valable."
  },
  {
    cat: "🎭 Cognitive biases",
    q: "What is popularity bias?",
    options: [
      "Believing information because it is emotional",
      "Believing information because it confirms our ideas",
      "Trusting someone popular even outside their field",
      "Sharing information without checking it"
    ],
    answer: 2,
    expl: "Popularity bias nous pousse to suivre the avis of A personne populaire ou of A majorite, same quand they n'ont pas de legitimite on The topic."
  },
  {
    cat: "🎭 Cognitive biases",
    q: "What is emotional bias?",
    options: [
      "Rejecting information that upsets us",
      "Favouring information that triggers emotion",
      "Believing information from people we like",
      "Sharing sad information rather than happy information"
    ],
    answer: 1,
    expl: "Emotional bias nous pousse to believe et retenir The information who suscitent A emotion forte — anger, fear, indignation — same si they are fausses."
  },
  {
    cat: "🎭 Cognitive biases",
    q: "Why The networks raffolent-they of information emouvantes?",
    options: [
      "because they are plus faciles to check",
      "because they creent de the engagement",
      "because they are generally vraies",
      "because they plaisent aux algorithmes de censure"
    ],
    answer: 1,
    expl: "Vraies ou fausses, The information emouvantes generent plus de likes, partages et commentaires. The plateformes The favorisent donc algorithmiquement."
  },
  {
    cat: "🎭 Cognitive biases",
    q: "What is confirmation bias?",
    options: [
      "Believing information because it is popular",
      "Favouring information that confirms what we already think",
      "Rejecting all new information",
      "Trusting experts in their field"
    ],
    answer: 1,
    expl: "confirmation bias pousse to look for, believe et retenir The information who valident our croyances existantes — et to ignorer celles who The contredisent."
  },
  {
    cat: "🎭 Cognitive biases",
    q: "What is the halo effect?",
    options: [
      "believe A information parce What it is repetee",
      "Transferring someone's competence to another field",
      "Ignoring information that contradicts our beliefs",
      "Trusting headlines without reading articles"
    ],
    answer: 1,
    expl: "The effet de Halo : si quelthat A is percu as expert ou populaire in A field, on lui fact confiance in tous The domaines — same hors de its competence."
  },

  // ── Critical attitude ─────────────────────────────────────────
  {
    cat: "💡 Critical attitude",
    q: "Which conseil pratique donne The training before de share A information?",
    options: [
      "check on Google",
      "Ask a friend",
      "Count to 2",
      "Wait 24 hours"
    ],
    answer: 2,
    expl: "2 secondes suffisent for reconsiderer A information before of the share. Ce petit delai allows de passer of the mode intuitif au mode analytique."
  },
  {
    cat: "💡 Critical attitude",
    q: "\"If information is too good to be true…\"",
    options: [
      "it vient probably of A expert reliable",
      "It is probably false",
      "it merite of etre shared immediatement",
      "it is can-etre satirique"
    ],
    answer: 1,
    expl: "A adage utile : The information trop belles, trop scandaleuses ou trop parfaites for etre vraies meritent A verification immediate."
  },
  {
    cat: "💡 Critical attitude",
    q: "\"Solution trop simple to A probleme complexe\"… it is generally…?",
    options: [
      "A piste to explorer serieusement",
      "false",
      "A decouverte scientific majeure",
      "A technique de framing mediatique"
    ],
    answer: 1,
    expl: "Si A probleme complexe (as The SIDA) avait A solution simple (The jus de citron), on the aurait trouvee. The simplicite trop grande must alerter."
  },
  {
    cat: "💡 Critical attitude",
    q: "Which quision essentielle must-it se poser according to The training?",
    options: [
      "\"this information is-it recente?\"",
      "\"who a shared this information?\"",
      "\"Why is it that je crois ce that je crois?\"",
      "\"Combien de sources citent this information?\""
    ],
    answer: 2,
    expl: "Interroger the origine de its propres croyances is The base de the esprit critique. D'ou viennent mes certitudes? Sont-they fondees on Some sources fiables?"
  },
  {
    cat: "💡 Critical attitude",
    q: "What is it that The consensus scientific?",
    options: [
      "A vote between politiciens et scientists",
      "The accord de the immense majorite Some scientists of A field",
      "A rapport publie by the ONU",
      "The opinion of A seul expert reconnu"
    ],
    answer: 1,
    expl: "The consensus scientific represente the accord of the grande majorite Some experts of A field. It is the A Some sources de connaissance The plus fiables."
  },
  {
    cat: "💡 Critical attitude",
    q: "on The rechauffement climatique, Which source is The plus reliable?",
    options: [
      "A documentaire grand audience",
      "A film catastrophe",
      "A article de presse people",
      "The parole of A expert of the field"
    ],
    answer: 3,
    expl: "Toutes The sources ne se valent pas. A expert of the field is plus reliable What A film ou A article non specialise on A topic scientific."
  },
  {
    cat: "💡 Critical attitude",
    q: "Which citation is attribuee to Stephen Hawking in The training?",
    options: [
      "\"The doubt is The debut of the connaissance\"",
      "\"The ennemi of the connaissance it is the illusion of the connaissance\"",
      "\"The science progresse grâce to the error\"",
      "\"believe without evidence is dangerous\""
    ],
    answer: 1,
    expl: "Stephen Hawking : \"The ennemi of the connaissance is not the ignorance, mais the illusion of the connaissance.\" believe What on sait empeche of apprendre."
  },
  {
    cat: "💡 Critical attitude",
    q: "Why admettre its ignorance is-it utile face aux fake news?",
    options: [
      "for eviter de blesser The autres",
      "because admettre What on ne sait pas allows of ecouter et of apprendre",
      "because The experts n'aiment pas The people arrogants",
      "for paraitre plus credible en ligne"
    ],
    answer: 1,
    expl: "Admettre its ignorance, it is The premiere etape for se remettre en quision, ecouter The experts et progresser. The orgueil is A terreau fertile for The fake news."
  },
  {
    cat: "💡 Critical attitude",
    q: "What is it that The metacognition?",
    options: [
      "A technique de memorisation",
      "The capacite to apprendre rapidement",
      "Prendre of the recul on The fonctionnement de its propre brain",
      "A bias cognitive lie to the emotion"
    ],
    answer: 2,
    expl: "The metacognition, it is penser to its propre facon de penser. Prendre conscience de its bias allows de mieux The controler face aux fake news."
  },
  {
    cat: "💡 Critical attitude",
    q: "Why The presentateur ne revele-t-it pas au debut What it is docteur en psychologie?",
    options: [
      "for tiser The memoire Some eleves",
      "for montrer What on fact confiance without vraiment savoir Why",
      "for rendre The training plus ludique",
      "because ce is not important for The topic"
    ],
    answer: 1,
    expl: "The eleves lui font confiance des The debut without savoir Why. It is A experience meta : on accorde often A legitimite without The check."
  }
];
