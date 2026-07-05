// Niveau 2 — Désinformation, au-delà de la Fake News (lycée, 15-18 ans)
// Source : QCM - Désinformation au-delà de la Fake News.txt

var QUESTIONS_NIVEAU2 = [
  // ── Fake News & vérification ──────────────────────────────────
  {
    cat: "🔍 Fake News & vérification",
    q: "Qu'est-ce qu'une fake news ?",
    options: [
      "Une information contraire au réel",
      "Une opinion déguisée en fait",
      "Un canular humoristique",
      "Une information mal contextualisée"
    ],
    answer: 0,
    expl: "Une fake news est une information délibérément fausse, contraire au réel — à distinguer de l'opinion, du canular ou de l'information mal contextualisée."
  },
  {
    cat: "🔍 Fake News & vérification",
    q: "Qui a popularisé le terme \"fake news\" en 2016 ?",
    options: [
      "Barack Obama",
      "Hillary Clinton",
      "Donald Trump",
      "Mark Zuckerberg"
    ],
    answer: 2,
    expl: "Donald Trump a popularisé l'expression en 2016 pour qualifier des informations vraies qui le dérangeaient — retournant ainsi le concept contre la presse elle-même."
  },
  {
    cat: "🔍 Fake News & vérification",
    q: "Quelle information est VRAIE selon la formation ?",
    options: [
      "La méduse immortelle existe",
      "Les véganes veulent interdire les biscuits animaux",
      "Les deux informations sont vraies",
      "Les deux informations sont fausses"
    ],
    answer: 0,
    expl: "La méduse Turritopsis dohrnii est réellement biológiquement immortelle. En revanche, l'article sur les biscuits en forme d'animaux est satirique (Gorafi) — exemple parfait de canular pris au sérieux."
  },
  {
    cat: "🔍 Fake News & vérification",
    q: "Quel critère aide à vérifier une information ?",
    options: [
      "Le nombre de \"likes\"",
      "La longueur de l'article",
      "La multiplicité des sources",
      "La présence d'images"
    ],
    answer: 2,
    expl: "Croiser plusieurs sources indépendantes est la méthode de base du fact-checking. Likes, longueur et images ne sont pas des indicateurs de fiabilité."
  },
  {
    cat: "🔍 Fake News & vérification",
    q: "Les critères de vérification ne sont pas fiables à 100% car… ?",
    options: [
      "Ils sont trop compliqués",
      "Seuls les journalistes peuvent les utiliser",
      "Ils ne fonctionnent que sur internet",
      "Ce sont des indices, pas des preuves absolues"
    ],
    answer: 3,
    expl: "Aucun critère de vérification ne garantit la vérité absolue : ce sont des indices qui augmentent ou diminuent la probabilité qu'une information soit fiable."
  },

  // ── Désinformation & mésinformation ──────────────────────────
  {
    cat: "⚠️ Désinformation & mésinformation",
    q: "Qu'est-ce que la désinformation ?",
    options: [
      "Partager involontairement une fausse info",
      "Publier une opinion comme un fait",
      "Transmettre volontairement une fausse info",
      "Diffuser une info sans citer sa source"
    ],
    answer: 2,
    expl: "La désinformation est intentionnelle : on sait que l'info est fausse et on la diffuse quand même pour tromper. C'est ce qui la distingue de la mésinformation."
  },
  {
    cat: "⚠️ Désinformation & mésinformation",
    q: "Qu'est-ce que la mésinformation ?",
    options: [
      "Refuser de partager une info vraie",
      "Fabriquer de fausses preuves",
      "Transmettre volontairement une fausse info",
      "Partager involontairement une fausse info"
    ],
    answer: 3,
    expl: "La mésinformation est diffusée de bonne foi : on croit l'info vraie, mais elle est fausse. L'intention n'est pas malveillante, contrairement à la désinformation."
  },

  // ── Corrélation & causalité ───────────────────────────────────
  {
    cat: "🔗 Corrélation & causalité",
    q: "Quelle est la différence entre corrélation et causalité ?",
    options: [
      "La corrélation est plus forte",
      "Ce sont des synonymes",
      "La corrélation lie sans que l'un cause l'autre",
      "La causalité est un lien statistique"
    ],
    answer: 2,
    expl: "Corrélation = lien statistique entre deux variables. Causalité = l'une provoque l'autre. Confondre les deux est l'une des sources les plus fréquentes de désinformation."
  },
  {
    cat: "🔗 Corrélation & causalité",
    q: "Que désigne la \"concomitance\" ?",
    options: [
      "Un lien de cause à effet",
      "Une corrélation prouvée",
      "Deux événements simultanés par coïncidence",
      "Une technique de manipulation"
    ],
    answer: 2,
    expl: "La concomitance, c'est quand deux événements se produisent en même temps sans aucun lien entre eux. Exemple classique : corrélation entre les films de Nicolas Cage et les noyades en piscine."
  },

  // ── Techniques de désinformation ─────────────────────────────
  {
    cat: "🎭 Techniques de désinformation",
    q: "Désinformer en retirant le contexte d'une info vraie, c'est… ?",
    options: [
      "L'astroturfing",
      "La fabrique du doute",
      "La décontextualisation",
      "La mute news"
    ],
    answer: 2,
    expl: "La décontextualisation consiste à utiliser une information vraie mais en supprimant son contexte, ce qui en déforme radicalement le sens sans mentir directement."
  },
  {
    cat: "🎭 Techniques de désinformation",
    q: "La décontextualisation est dangereuse car elle…",
    options: [
      "Invente des faits inexistants",
      "Utilise des images de synthèse",
      "Déforme une info vraie sans mentir directement",
      "Supprime des archives en ligne"
    ],
    answer: 2,
    expl: "C'est sa force : on utilise un fait réel, ce qui la rend difficile à réfuter. Mais présentée hors contexte, une info vraie peut conduire à une conclusion totalement fausse."
  },
  {
    cat: "🎭 Techniques de désinformation",
    q: "Qu'est-ce que l'astroturfing ?",
    options: [
      "Diffuser de fausses infos en masse",
      "Supprimer des informations gênantes",
      "Simuler un mouvement populaire spontané",
      "Payer des journalistes corrompus"
    ],
    answer: 2,
    expl: "L'astroturfing consiste à créer l'illusion d'un mouvement citoyen spontané (faux comptes, faux commentaires, faux sondages) pour donner l'impression d'un soutien populaire artificiel."
  },
  {
    cat: "🎭 Techniques de désinformation",
    q: "Quel pays est cité pour ses \"trolls\" payés en exemple d'astroturfing ?",
    options: [
      "La Chine",
      "La Corée du Nord",
      "Les États-Unis",
      "La Russie"
    ],
    answer: 3,
    expl: "La Russie est l'exemple le plus documenté avec ses \"usines à trolls\" (Internet Research Agency) qui emploient des milliers de personnes pour simuler une opinion publique favorable."
  },
  {
    cat: "🎭 Techniques de désinformation",
    q: "Qu'est-ce que la \"fabrique du doute\" ?",
    options: [
      "Créer de fausses preuves scientifiques",
      "Effacer des informations d'internet",
      "Semer la confusion sur un sujet spécifique",
      "Multiplier les fake news"
    ],
    answer: 2,
    expl: "La fabrique du doute (agnotologie) consiste à semer délibérément la confusion sur un consensus scientifique établi pour paralyser toute décision ou régulation."
  },
  {
    cat: "🎭 Techniques de désinformation",
    q: "Quel secteur industriel est l'exemple le plus connu de la fabrique du doute ?",
    options: [
      "L'industrie pharmaceutique",
      "L'industrie pétrolière",
      "L'industrie alimentaire",
      "L'industrie du tabac"
    ],
    answer: 3,
    expl: "L'industrie du tabac a financé pendant des décennies des études pour \"semer le doute\" sur les effets du tabac, alors que ses propres chercheurs savaient dès les années 1950 qu'il causait le cancer."
  },
  {
    cat: "🎭 Techniques de désinformation",
    q: "Depuis quand sait-on que la cigarette est dangereuse ?",
    options: [
      "Les années 1970",
      "Les années 1990",
      "Les années 1950",
      "Les années 2000"
    ],
    answer: 2,
    expl: "Les scientifiques de l'industrie du tabac savaient dès les années 1950 que la cigarette était cancérigène. La \"fabrique du doute\" a permis de retarder toute régulation pendant des décennies."
  },
  {
    cat: "🎭 Techniques de désinformation",
    q: "Qu'est-ce que la \"mute news\" ?",
    options: [
      "Diffuser de fausses informations",
      "Utiliser des robots pour amplifier des messages",
      "Taire ou minimiser certaines informations",
      "Corriger tardivement une information"
    ],
    answer: 2,
    expl: "La mute news, c'est désinformer par omission : ne pas couvrir un événement important, lui accorder peu de temps ou le reléguer en bas de page est aussi une forme de manipulation de l'information."
  },
  {
    cat: "🎭 Techniques de désinformation",
    q: "Quel événement a éclipsé les révoltes en Iran (exemple de mute news) ?",
    options: [
      "L'affaire Benalla",
      "Les Gilets Jaunes",
      "L'accident de Pierre Palmade",
      "Le mouvement Me Too"
    ],
    answer: 2,
    expl: "L'accident de Pierre Palmade en février 2023 a capté toute l'attention médiatique française, éclipsant les révoltes en Iran — illustration parfaite de la mute news par saturation de l'espace médiatique."
  },

  // ── Biais cognitifs & cadrage ─────────────────────────────────
  {
    cat: "🧠 Biais & cadrage",
    q: "Qu'est-ce que le \"biais de cadrage\" ?",
    options: [
      "Inventer une fausse information",
      "Supprimer des informations vraies",
      "Diffuser massivement des rumeurs",
      "Orienter la perception d'une info vraie"
    ],
    answer: 3,
    expl: "Le biais de cadrage (framing) consiste à présenter une information vraie d'une façon qui oriente l'interprétation du lecteur — sans mentir, mais en sélectionnant les mots, l'angle ou les faits mis en avant."
  },
  {
    cat: "🧠 Biais & cadrage",
    q: "Quel biais pousse à croire une chose parce que beaucoup de gens y adhèrent ?",
    options: [
      "Le biais du survivant",
      "Le biais de cadrage",
      "Le biais de popularité",
      "Le biais de confirmation"
    ],
    answer: 2,
    expl: "Le biais de popularité (ou \"preuve sociale\") nous fait croire qu'une opinion partagée par beaucoup est forcément juste. C'est un mécanisme très exploité sur les réseaux sociaux."
  },
  {
    cat: "🧠 Biais & cadrage",
    q: "Quelle chaîne est citée pour son cadrage anti-vaccin sans fake news directe ?",
    options: [
      "CNN",
      "MSNBC",
      "Fox News",
      "ABC News"
    ],
    answer: 2,
    expl: "Fox News a souvent orienté son traitement des vaccins contre la Covid-19 en choisissant les experts, les angles et les faits mis en avant — sans diffuser de fake news au sens strict, mais avec un cadrage très orienté."
  },
  {
    cat: "🧠 Biais & cadrage",
    q: "Quelle est la bonne leçon du biais du survivant sur les avions de guerre ?",
    options: [
      "Renforcer les zones touchées",
      "Remplacer les avions endommagés",
      "Les avions les plus touchés sont les plus solides",
      "Renforcer les zones sans impacts de balle"
    ],
    answer: 3,
    expl: "Abraham Wald a compris que les avions revenus montraient les zones qu'on pouvait tolérer touchées. Les avions abattus, invisibles dans les données, avaient été touchés ailleurs — là où il fallait renforcer l'armure."
  },
  {
    cat: "🧠 Biais & cadrage",
    q: "Quel scientifique a mis en évidence le biais du survivant ?",
    options: [
      "Charles Darwin",
      "Albert Einstein",
      "Abraham Wald",
      "Isaac Newton"
    ],
    answer: 2,
    expl: "Abraham Wald, statisticien hongrois, a démontré le biais du survivant durant la Seconde Guerre mondiale en analysant les impacts de balles sur les avions de l'armée américaine."
  },

  // ── Médias, neutralité & théories ────────────────────────────
  {
    cat: "📡 Médias & neutralité",
    q: "Comment Trump a-t-il utilisé le terme \"fake news\" en 2016 ?",
    options: [
      "Pour dénoncer des mensonges sur lui",
      "Pour censurer des médias",
      "Pour qualifier une vraie info qui le dérangeait",
      "Pour promouvoir ses propres médias"
    ],
    answer: 2,
    expl: "Trump a retourné le terme contre la presse en qualifiant de \"fake news\" des informations vraies mais dérangeantes — transformant ainsi un outil critique en arme rhétorique contre les journalistes."
  },
  {
    cat: "📡 Médias & neutralité",
    q: "Un média peut-il être totalement neutre ?",
    options: [
      "Oui, en ne publiant que des faits",
      "Oui, avec des journalistes bien formés",
      "Non, car tous les médias ont des financeurs politiques",
      "Non, la neutralité dépend toujours du contexte"
    ],
    answer: 3,
    expl: "La neutralité absolue est impossible : choisir quels faits publier, dans quel ordre, avec quels mots, c'est déjà une prise de position. La neutralité est subjective et dépend toujours du contexte."
  },
  {
    cat: "📡 Médias & neutralité",
    q: "Quelle théorie du complot a contribué à l'attaque de Poutine sur l'Ukraine ?",
    options: [
      "Le grand remplacement",
      "Le Nouvel Ordre Mondial",
      "La théorie du \"milliard d'or\"",
      "Les chemtrails"
    ],
    answer: 2,
    expl: "La théorie russe du \"milliard d'or\" affirme que l'Occident veut réduire la population mondiale à un milliard de personnes (d'où l'hostilité envers la Russie). Elle a servi de justification idéologique à l'invasion de l'Ukraine."
  },

  // ── Fact-checking & limites ───────────────────────────────────
  {
    cat: "✅ Fact-checking & limites",
    q: "Quelle est la principale limite du fact-checking selon la formation ?",
    options: [
      "Il est trop lent",
      "Les fact-checkers sont mal formés",
      "La fake news n'est que l'arbre qui cache la forêt",
      "Il est trop coûteux"
    ],
    answer: 2,
    expl: "Se concentrer uniquement sur les fake news pures, c'est ignorer tout le continuum de la désinformation : décontextualisation, cadrage, mute news, astroturfing… La fake news n'est que la partie visible de l'iceberg."
  },
  {
    cat: "✅ Fact-checking & limites",
    q: "Lequel N'EST PAS une technique de désinformation vue en formation ?",
    options: [
      "L'astroturfing",
      "La mute news",
      "La fabrique du doute",
      "Le fact-checking"
    ],
    answer: 3,
    expl: "Le fact-checking est au contraire un outil de lutte contre la désinformation. Les trois autres (astroturfing, mute news, fabrique du doute) sont des techniques de manipulation de l'information."
  }
];
