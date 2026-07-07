// Level 2 — Disinformation, Beyond Fake News (high school, 15-18 ans)
// Source : QCM - Désinformation au-delà de la Fake News.txt

var QUESTIONS_NIVEAU2 = [
  // ── Fake News & verification ──────────────────────────────────
  {
    cat: "🔍 Fake News & verification",
    q: "What is fake news?",
    options: [
      "information contrary to reality",
      "An opinion disguised as a fact",
      "A humorous hoax",
      "information placed in the wrong context"
    ],
    answer: 0,
    expl: "A fake news is A information deliberement false, contraire au real — to distinguer de the opinion, of the canular ou de the information mal contextualisee."
  },
  {
    cat: "🔍 Fake News & verification",
    q: "Who popularized the term “fake news” in 2016?",
    options: [
      "Barack Obama",
      "Hillary Clinton",
      "Donald Trump",
      "Mark Zuckerberg"
    ],
    answer: 2,
    expl: "Donald Trump a popularise the expression en 2016 for qualifier Some information vraies who The derangeaient — retournant ainsi The concept against The presse it-same."
  },
  {
    cat: "🔍 Fake News & verification",
    q: "Which information is true according to The training?",
    options: [
      "The immortal jellyfish exists",
      "The veganes veulent interdire The biscuits animaux",
      "The deux information are vraies",
      "The deux information are fausses"
    ],
    answer: 0,
    expl: "The meduse Turritopsis dohrnii is reellement biológiquement immortelle. En revanche, the article on The biscuits en forme of animaux is satirique (Gorafi) — example parfait de canular pris au serieux."
  },
  {
    cat: "🔍 Fake News & verification",
    q: "Which criterion helps check information?",
    options: [
      "The number of “likes”",
      "The length of the article",
      "Multiple sources",
      "The presence of images"
    ],
    answer: 2,
    expl: "Croiser several sources independantes is The method de base of the fact-checking. Likes, longueur et images are not Some indicateurs de reliability."
  },
  {
    cat: "🔍 Fake News & verification",
    q: "Why are verification criteria not 100% reliable?",
    options: [
      "They are too complicated",
      "Only journalists can use them",
      "They only work on the Internet",
      "They are clues, not absolute proof"
    ],
    answer: 3,
    expl: "Aucun critere de verification ne garantit The verite absolue : ce are Some indices who augmentent ou diminuent The probabilite What A information soit reliable."
  },

  // ── Disinformation & misinformation ──────────────────────────
  {
    cat: "⚠️ Disinformation & misinformation",
    q: "What is disinformation?",
    options: [
      "Unintentionally sharing false information",
      "Publishing an opinion as a fact",
      "Deliberately transmitting false information",
      "Spreading information without citing its source"
    ],
    answer: 2,
    expl: "The disinformation is intentionnelle : on sait that the information is false et on The diffuse quand same for tromper. It is ce who The distingue of the misinformation."
  },
  {
    cat: "⚠️ Disinformation & misinformation",
    q: "What is misinformation?",
    options: [
      "Refusing to share true information",
      "Creating false evidence",
      "Deliberately transmitting false information",
      "Unintentionally sharing false information"
    ],
    answer: 3,
    expl: "The misinformation is spread de good foi : on believes the information true, mais it is false. The intention is not malveillante, contrairement to The disinformation."
  },

  // ── Correlation & causation ───────────────────────────────────
  {
    cat: "🔗 Correlation & causation",
    q: "What is the difference between correlation and causation?",
    options: [
      "Correlation is stronger",
      "They are synonyms",
      "Correlation links things without one causing the other",
      "Causation is a statistical link"
    ],
    answer: 2,
    expl: "correlation = lien statistique between deux variables. causation = the A provoque the autre. Confondre The deux is the A Some sources The plus frequentes de disinformation."
  },
  {
    cat: "🔗 Correlation & causation",
    q: "What does “concomitance” mean?",
    options: [
      "A cause-and-effect link",
      "A proven correlation",
      "Two simultaneous events by coincidence",
      "A manipulation technique"
    ],
    answer: 2,
    expl: "The concomitance, it is quand deux evenements se produisent en same temps without aucun lien between eux. example classique : correlation between The films de Nicolas Cage et The noyades en piscine."
  },

  // ── Disinformation techniques ─────────────────────────────
  {
    cat: "🎭 Disinformation techniques",
    q: "Disinforming by removing the context from true information is…?",
    options: [
      "Astroturfing",
      "The manufacture of doubt",
      "Decontextualization",
      "Mute news"
    ],
    answer: 2,
    expl: "Decontextualization consiste to use A information true mais en supprimant its context, ce who en deforme radicalement The sens without mentir directement."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "Decontextualization is dangerous because it…",
    options: [
      "Invents non-existent facts",
      "Uses computer-generated images",
      "Distorts true information without directly lying",
      "Deletes online archives"
    ],
    answer: 2,
    expl: "It is its force : on uses A fact real, ce who The rend difficile to refuter. Mais presentee hors context, A information true can conduire to A conclusion totalement false."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "What is astroturfing?",
    options: [
      "Spreading false information on a large scale",
      "Suppressing embarrassing information",
      "Simulating a spontaneous grassroots movement",
      "Paying corrupt journalists"
    ],
    answer: 2,
    expl: "Astroturfing consiste to creer the illusion of A mouvement citoyen spontane (false comptes, false commentaires, false sondages) for donner the impression of A soutien populaire artificiel."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "Which country is cited for its paid “trolls” as an example of astroturfing?",
    options: [
      "China",
      "North Korea",
      "The United States",
      "Russia"
    ],
    answer: 3,
    expl: "Russia is the example The plus documente with its \"usines to trolls\" (Internet Research Agency) who emploient Some milliers de people for simuler A opinion publique favorable."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "What is the “manufacture of doubt”?",
    options: [
      "Creating false scientific evidence",
      "Deleting information from the Internet",
      "Deliberately spreading confusion on a specific topic",
      "Multiplying fake news"
    ],
    answer: 2,
    expl: "The manufacture of doubt (agnotologie) consiste to semer deliberement The confusion on A consensus scientific etabli for paralyser toute decision ou regulation."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "Which industry is the best-known example of the manufacture of doubt?",
    options: [
      "The pharmaceutical industry",
      "The oil industry",
      "The food industry",
      "The tobacco industry"
    ],
    answer: 3,
    expl: "The tobacco industry a finance pendant Some decennies Some etudes for \"semer The doubt\" on The effets of the tabac, alors that its propres chercheurs savaient des The annees 1950 What it causait The cancer."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "Since when have we known cigarettes are dangerous?",
    options: [
      "The 1970s",
      "The 1990s",
      "The 1950s",
      "The 2000s"
    ],
    answer: 2,
    expl: "The scientists de the industrie of the tabac savaient des The annees 1950 that The cigarette etait cancerigene. The \"fabrique of the doubt\" a permis de retarder toute regulation pendant Some decennies."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "What is “mute news”?",
    options: [
      "spread de fausses information",
      "Using bots to amplify messages",
      "Silencing or minimizing certain information",
      "Correcting information late"
    ],
    answer: 2,
    expl: "Mute news, it is desinformer by omission : ne pas couvrir A evenement important, lui accorder peu de temps ou The releguer en bas de page is aussi A forme de manipulation de the information."
  },
  {
    cat: "🎭 Disinformation techniques",
    q: "Which evenement a eclipse The revoltes en Iran (example de mute news)?",
    options: [
      "The affaire Benalla",
      "The Gilets Jaunes",
      "The accident de Pierre Palmade",
      "The mouvement Me Too"
    ],
    answer: 2,
    expl: "The accident de Pierre Palmade en fevrier 2023 a capte toute the attention mediatique francaise, eclipsant The revoltes en Iran — illustration parfaite of the mute news by saturation de the espace mediatique."
  },

  // ── Cognitive biases & cadrage ─────────────────────────────────
  {
    cat: "🧠 Bias & framing",
    q: "What is “framing bias”?",
    options: [
      "Inventer A false information",
      "Suppressing true information",
      "Spreading rumours massively",
      "Steering the perception of true information"
    ],
    answer: 3,
    expl: "Framing bias (framing) consiste to presenter A information true of A facon who oriente the interpretation of the lecteur — without mentir, mais en selectionnant The mots, the angle ou The facts mis en before."
  },
  {
    cat: "🧠 Bias & framing",
    q: "Which bias makes people believe something because many others believe it?",
    options: [
      "Survivorship bias",
      "Framing bias",
      "Popularity bias",
      "confirmation bias"
    ],
    answer: 2,
    expl: "Popularity bias (ou \"evidence sociale\") nous fact believe What A opinion shared by many is forcement juste. It is A mecanisme tres exploite on The social media."
  },
  {
    cat: "🧠 Bias & framing",
    q: "Which channel is cited for anti-vaccine framing without direct fake news?",
    options: [
      "CNN",
      "MSNBC",
      "Fox News",
      "ABC News"
    ],
    answer: 2,
    expl: "Fox News a often oriente its traitement Some vaccins against The Covid-19 en choisissant The experts, The angles et The facts mis en before — without spread de fake news au sens strict, mais with A framing tres oriente."
  },
  {
    cat: "🧠 Bias & framing",
    q: "What is the correct lesson from survivorship bias about war planes?",
    options: [
      "Reinforce the hit areas",
      "Replace damaged planes",
      "The most-hit planes are the strongis",
      "Reinforce the areas without bullet impacts"
    ],
    answer: 3,
    expl: "Abraham Wald a compris that The avions revenus montraient The zones What on pouvait tolerer touchees. The avions abattus, invisibles in The data, avaient ete touches ailleurs — lto ou it fallait renforcer the armure."
  },
  {
    cat: "🧠 Bias & framing",
    q: "Which scientist highlighted survivorship bias?",
    options: [
      "Charles Darwin",
      "Albert Einstein",
      "Abraham Wald",
      "Isaac Newton"
    ],
    answer: 2,
    expl: "Abraham Wald, statisticien hongrois, a demontre The bias of the survivant durant The Seconde Guerre mondiale en analysant The impacts de balles on The avions de the armee americaine."
  },

  // ── Médias, neutralité & théories ────────────────────────────
  {
    cat: "📡 Media & neutrality",
    q: "How did Trump use the term “fake news” in 2016?",
    options: [
      "To denounce lies about him",
      "To censor media outlets",
      "To describe true information that bothered him",
      "To promote his own media"
    ],
    answer: 2,
    expl: "Trump a retourne The terme against The presse en qualifiant de \"fake news\" Some information vraies mais derangeantes — transformant ainsi A outil critique en arme rhetoric against The journalists."
  },
  {
    cat: "📡 Media & neutrality",
    q: "Can a media outlet be totally neutral?",
    options: [
      "Yes, by publishing only facts",
      "Yes, with well-trained journalists",
      "No, because all media have political funders",
      "No, neutrality always depends on context"
    ],
    answer: 3,
    expl: "The neutralite absolue is impossible : choisir Which facts publier, in Which ordre, with Which mots, it is dejto A prise de position. The neutralite is subjective et depend always of the context."
  },
  {
    cat: "📡 Media & neutrality",
    q: "Which conspiracy theory contributed to Putin’s attack on Ukraine?",
    options: [
      "The great replacement",
      "The New World Order",
      "The “golden billion” theory",
      "Chemtrails"
    ],
    answer: 2,
    expl: "The theorie russe of the \"milliard of or\" affirme that the Occident veut reduire The population mondiale to A milliard de people (of ou the hostilite envers The Russie). it a servi de justification ideologique to the invasion de the Ukraine."
  },

  // ── Fact-checking & limits ───────────────────────────────────
  {
    cat: "✅ Fact-checking & limits",
    q: "According to the training, what is the main limit of fact-checking?",
    options: [
      "It is too slow",
      "Fact-checkers are poorly trained",
      "Fake news is only the tree hiding the foris",
      "It is too expensive"
    ],
    answer: 2,
    expl: "Se concentrer uniquement on The fake news pures, it is ignorer tout The continuum of the disinformation : decontextualisation, framing, mute news, astroturfing… The fake news n'is that The partie visible de the iceberg."
  },
  {
    cat: "✅ Fact-checking & limits",
    q: "Which one is NOT a disinformation technique seen in the training?",
    options: [
      "Astroturfing",
      "Mute news",
      "The manufacture of doubt",
      "Fact-checking"
    ],
    answer: 3,
    expl: "Fact-checking is au contraire A outil de lutte against The disinformation. The trois autres (astroturfing, mute news, fabrique of the doubt) are Some techniques de manipulation de the information."
  }
];
