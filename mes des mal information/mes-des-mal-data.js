/* ============================================================
   Données : chaque scénario a une bonne réponse + une explication.
   c = catégorie correcte : "mes" | "des" | "mal"
   ============================================================ */
const SCENARIOS = [
  {
    tag: "Groupe de la classe",
    fmt: "post", icon: "🧑", user: "Lucas", handle: "@lucas · Groupe 3e B",
    body: "🚨 DEMAIN PAS DE COURS !! Le collège est fermé à cause de la neige ❄️ Passez le mot !",
    context: "En réalité, les cours ont bien lieu.",
    c: "mes",
    why: "L'info est <b>fausse</b>, mais Lucas <b>ne cherche pas à nuire</b> : il croit dire vrai et veut juste prévenir ses camarades. Erreur partagée de bonne foi → <b>mésinformation</b>."
  },
  {
    tag: "Compte anonyme",
    fmt: "news", kicker: "🔴 Exclusivité", outlet: "Capture attribuée à « Le Quotidien »… en réalité truquée",
    headline: "Le candidat M. aurait été condamné par la justice à quelques jours du scrutin",
    c: "des",
    why: "L'info est <b>fausse</b> ET <b>fabriquée exprès pour tromper et nuire</b> à un candidat. Création volontaire de faux → <b>désinformation</b>."
  },
  {
    tag: "En privé avec une copine",
    fmt: "chat",
    chat: [
      { s: "them", who: "Maya", t: "T'as vu ?? Inès a publié une photo de moi en soirée sur le groupe de la classe 😩" },
      { s: "me", who: "Toi", t: "Ah non… mais pourquoi elle ferait ça ?" },
      { s: "them", who: "Maya", t: "Elle m'a avoué que c'était pour se venger de moi 😤" }
    ],
    ask: "Ce qu'a fait Inès, c'est…",
    c: "mal",
    why: "La photo est <b>vraie</b>, mais elle est sortie de son cadre privé et diffusée <b>dans le but de nuire</b> à Maya. Vrai utilisé pour faire du mal → <b>malinformation</b>."
  },
  {
    tag: "Message de ta grand-mère",
    fmt: "forward", fwd: "Transféré de nombreuses fois",
    body: "🍋 BUVEZ DE L'EAU CHAUDE AU CITRON chaque matin : ça nettoie le corps et GUÉRIT LE CANCER ! 🙏 Faites suivre à ceux que vous aimez ❤️",
    img: "images/exemple-mesinformation.jpg",
    context: "Ce conseil est médicalement faux.",
    c: "mes",
    why: "Faux conseil santé, mais partagé <b>par bienveillance, sans intention de nuire</b>. Erreur de bonne foi → <b>mésinformation</b>."
  },
  {
    tag: "Notification reçue",
    fmt: "notif", icon: "🎁", app: "Boîte mail",
    title: "🎉 Vous avez gagné un iPhone 15 !",
    body: "Cliquez vite pour réclamer votre cadeau avant 24 h ▶ recompense-cadeau.link",
    c: "des",
    why: "Contenu <b>faux</b>, créé <b>délibérément pour tromper et arnaquer</b>. Intention de nuire évidente → <b>désinformation</b>."
  },
  {
    tag: "Données piratées",
    fmt: "mail", leak: "📂 FUITE — 2 000 e-mails internes mis en ligne",
    meta: "De : direction@entreprise.fr — À : comité@entreprise.fr",
    subject: "RE : dossier interne (confidentiel)",
    body: "« …on garde ça entre nous pour l'instant, surtout ne pas diffuser… »",
    context: "Ces e-mails sont authentiques (non truqués).",
    c: "mal",
    why: "Les e-mails sont <b>authentiques (vrais)</b>, mais leur fuite est organisée <b>pour nuire</b>. Vrai détourné pour faire du tort → <b>malinformation</b>."
  },
  {
    tag: "Sur un fil d'actu",
    fmt: "post", icon: "😱", user: "Karim", handle: "@karim_77 · à l'instant",
    body: "😱 C'est CHEZ NOUS en ce moment !! Regardez ces inondations, faites attention à vous 🙏",
    img: "images/exemple-inondation.jpg", // à déposer ; s'affiche automatiquement quand le fichier existe
    context: "En réalité, cette photo date d'une autre inondation, il y a 10 ans.",
    c: "mes",
    why: "L'image est trompeuse (mauvaise date), mais la personne <b>ne sait pas</b> et ne veut pas nuire. Erreur involontaire → <b>mésinformation</b>."
  },
  {
    tag: "Vague de comptes identiques",
    fmt: "post", icon: "🤖", user: "Compte n°47", handle: "@reveil_2026", badge: "1 des 60 faux comptes",
    body: "💉⚠️ Le vaccin contient une PUCE pour vous CONTRÔLER ! Partagez avant la censure !! 🔁",
    img: "images/exemple-desinformation.jpg",
    context: "Cette affirmation est fausse (rumeur inventée).",
    c: "des",
    why: "Affirmation <b>fausse</b>, diffusée <b>massivement et volontairement pour manipuler</b>. Fabrication organisée → <b>désinformation</b>."
  },
  {
    tag: "Publié sur son profil",
    fmt: "post", icon: "😏", user: "Théo", handle: "@theo · il y a 2 min",
    body: "MDR regardez ce qu'un camarade m'a confié en privé 😂😂 [capture d'écran]",
    img: "images/exemple-malinformation.jpg",
    context: "La conversation est authentique et privée.",
    c: "mal",
    why: "Le message est <b>réel</b>, mais sa diffusion hors de son cadre privé vise <b>à humilier</b>. Vrai utilisé pour nuire → <b>malinformation</b>."
  },
  {
    tag: "Vidéo qui tourne",
    fmt: "post", icon: "🎬", user: "BuzzActu", handle: "@buzzactu · virale",
    body: "🎥 Il a OSÉ dire ÇA en plein discours 😱 (extrait de 5 secondes)",
    context: "La phrase a vraiment été prononcée, mais l'extrait est coupé de son contexte.",
    c: "mal",
    why: "La phrase a <b>vraiment été dite</b>, mais elle est isolée de son contexte <b>pour nuire</b> à la personne. Vrai détourné → <b>malinformation</b>."
  },
  {
    tag: "Article d'un journal sérieux",
    fmt: "news", kicker: "📰 Information", outlet: "La Gazette régionale",
    headline: "Le chômage aurait bondi de 30 % en un mois (chiffre erroné)",
    erratum: "Correction : chiffre faux publié par erreur. L'article a été rectifié et le journal s'est excusé.",
    c: "mes",
    why: "Information <b>erronée</b> mais publiée <b>sans intention de tromper</b> (et corrigée). Erreur de bonne foi → <b>mésinformation</b>."
  },
  {
    tag: "Vidéo « choc »",
    fmt: "post", icon: "🎥", user: "Fuites & Scoops", handle: "@leaks_off",
    body: "🎥 INCROYABLE : le ministre avoue tout face caméra ! (vidéo générée par IA)",
    context: "Cette vidéo est truquée (générée par IA) : le ministre n'a jamais tenu ces propos.",
    c: "des",
    why: "La vidéo est <b>fausse (truquée)</b> et conçue <b>exprès pour nuire</b>. Fabrication trompeuse intentionnelle → <b>désinformation</b>."
  },
  {
    tag: "Interview télévisée",
    fmt: "post", icon: "🎙️", user: "Le député", handle: "Plateau TV · en direct",
    body: "« Je n'ai JAMAIS été climatosceptique. J'ai toujours reconnu l'origine humaine du réchauffement climatique. »",
    imgs: ["images/exemple-climat-2022.jpg", "images/exemple-climat-2025.jpg"], // à déposer ; s'affichent dès que les fichiers existent
    context: "Deux ans plus tôt, ce même responsable déclarait douter de l'origine humaine du réchauffement climatique.",
    c: "des",
    why: "Son affirmation est <b>fausse</b> (ses propos d'il y a deux ans le contredisent) et il la tient <b>volontairement pour réécrire son image</b> et tromper le public → <b>désinformation</b>. Attention au piège : le vrai (sa déclaration passée) n'est pas ce qu'il diffuse — au contraire, il le <b>dissimule</b>."
  }
];

/* ============================================================
   NIVEAU DIFFICILE — cas ambigus, faux contexte, pièges d'intention.
   On y trouve une PAIRE clé : le même contenu vrai bascule de
   més- à mal-information selon l'intention.
   ============================================================ */
const HARD = [
  {
    tag: "🔀 Faux contexte — épisode 1",
    fmt: "post", icon: "🌧️", user: "Maël", handle: "@mael · à l'instant",
    body: "🌊 Notre ville CE MATIN… c'est catastrophique 😨 Restez prudents !",
    img: "images/exemple-inondation.jpg", // à déposer ; s'affiche automatiquement quand le fichier existe
    context: "La photo est <b>authentique</b> mais date en réalité d'<b>il y a 4 ans</b> — et Maël <b>l'ignore complètement</b>, il croit bien faire en alertant ses voisins.",
    c: "mes",
    why: "La photo est <b>authentique</b> mais <b>mal contextualisée</b> (mauvaise date). Comme Maël <b>l'ignore et ne veut pas nuire</b>, c'est une erreur de bonne foi → <b>mésinformation</b>. <i>Retiens cet exemple : la suite te montre le même contenu… avec une autre intention.</i>"
  },
  {
    tag: "🔀 Faux contexte — épisode 2",
    fmt: "post", icon: "😏", user: "Léa", handle: "@lea_actu · militante",
    body: "🌊 La ville SOUS L'EAU aujourd'hui 👉 le maire n'a RIEN fait depuis des années ! #démission",
    img: "images/exemple-faux-contexte.jpg",
    context: "Léa <b>sait</b> que cette même photo date d'il y a 4 ans, mais elle la date d'aujourd'hui <b>exprès</b> pour exagérer et accuser le maire.",
    c: "mal",
    why: "Contenu <b>identique et vrai</b>, mais Léa <b>sait</b> que le contexte est faux et l'utilise <b>volontairement pour nuire</b> au maire → <b>malinformation</b>. 👉 Même image que l'épisode 1 : <b>seule l'intention change la catégorie</b>."
  },
  {
    tag: "Déclaration officielle",
    fmt: "post", icon: "🏛️", user: "Le responsable", handle: "Conférence de presse",
    body: "« Le chômage est au plus bas : seulement X % ! La situation n'a JAMAIS été aussi bonne. »",
    context: "Le chiffre est <b>vrai et exact</b>, mais il <b>cache volontairement</b> qu'il ne compte pas les personnes en formation, pour faire croire que tout va mieux.",
    c: "mal",
    why: "Le chiffre est <b>vrai</b>, mais <b>présenté de façon trompeuse par omission</b>, exprès → <b>malinformation</b> (tromper avec du vrai). Ce n'est pas de la désinformation : aucun chiffre faux n'a été inventé."
  },
  {
    tag: "Repartagé par un ami",
    fmt: "forward", fwd: "Transféré",
    body: "😱 Le gouvernement vient d'INTERDIRE LES DEVOIRS à la maison !! C'est officiel 🎉",
    context: "À l'origine, c'était un <b>article parodique assumé (pour rire)</b>. L'ami n'a pas vu la blague et le repartage <b>comme une vraie info</b>.",
    c: "mes",
    why: "L'info est <b>fausse</b>, mais l'internaute <b>ne cherche pas à tromper</b> : il s'est lui-même fait avoir → <b>mésinformation</b>. Piège : la satire d'origine n'était pas de la désinformation (humour assumé, pas d'intention de nuire)."
  },
  {
    tag: "Photo « scandale »",
    fmt: "post", icon: "📸", user: "PotinsStars", handle: "@potins · sponsorisé",
    body: "😲 LA photo qui accuse l'actrice ! (image en réalité RETOUCHÉE)",
    context: "La photo de départ était vraie, mais elle a été <b>truquée</b> (objet ajouté) puis diffusée comme authentique <b>pour la salir</b>.",
    c: "des",
    why: "Piège : la photo de départ était vraie, mais elle a été <b>truquée</b> — le contenu diffusé est donc <b>devenu faux</b>, et fabriqué <b>pour nuire</b> → <b>désinformation</b>. Clé : on a <b>modifié le contenu</b> (≠ malinfo, où le contenu reste intact)."
  },
  {
    tag: "Capture d'un vieux tweet",
    fmt: "post", icon: "🕰️", user: "@anti_campagne", handle: "ressort un tweet de 2018",
    body: "Regardez ce que ce candidat a écrit il y a 8 ans 👇 (tweet authentique, non modifié)",
    context: "Le tweet est <b>réel et inchangé</b>, mais ressorti au pire moment <b>pour faire échouer sa campagne</b>.",
    c: "mal",
    why: "Le tweet est <b>authentique et non modifié</b>, mais ressorti et ciblé <b>pour nuire</b> au candidat → <b>malinformation</b>. <i>Nuance : selon le sujet, divulguer du vrai peut relever de l'intérêt public — l'intention et le contexte font débat.</i>"
  },
  {
    tag: "Graphique partagé",
    fmt: "post", icon: "📈", user: "Militant", handle: "@stop_prix",
    body: "📈 EXPLOSION des prix !! C'est la catastrophe !!",
    img: "images/exemple-graphique.jpg", // à déposer ; s'affiche automatiquement quand le fichier existe
    context: "Les <b>données sont vraies</b>, mais la <b>présentation visuelle est truquée</b> pour affoler. Aucun chiffre n'est faux.",
    c: "mal",
    why: "Les <b>données sont vraies</b>, mais la <b>présentation est truquée</b> volontairement → <b>malinformation</b> (faux cadrage). Comme aucun chiffre n'est inventé, ce n'est pas de la désinformation au sens strict."
  },
  {
    tag: "Bouche-à-oreille à la récré",
    fmt: "chat",
    chat: [
      { s: "them", who: "Un élève", t: "Il paraît que la cantine rend malade, faut plus y manger !" },
      { s: "me", who: "Toi", t: "Ah bon ? qui l'a dit ?" },
      { s: "them", who: "Un élève", t: "Jsais pas, tout le monde le répète… je préviens au cas où !" }
    ],
    context: "La rumeur est <b>fausse</b>, mais répétée <b>de bonne foi</b>, sans intention de tromper.",
    c: "mes",
    why: "Rumeur <b>fausse</b> propagée <b>sans intention de nuire</b>, juste répétée naïvement → <b>mésinformation</b>. Piège classique : beaucoup la classent « désinfo » alors qu'il manque l'intention de tromper."
  },
  {
    tag: "Repartagé par un blogueur",
    fmt: "post", icon: "😮", user: "Blog Santé+", handle: "@blogsante",
    body: "😮 Un scientifique affirme que « le sport est inutile » !! (citation en fait tronquée)",
    context: "La citation est <b>sortie de son contexte</b>, mais le blogueur <b>l'ignore</b> et la croit exacte : aucune intention de nuire.",
    c: "mes",
    why: "La citation est <b>mal contextualisée</b> (donc trompeuse), mais le blogueur <b>ne le sait pas et ne veut pas nuire</b> → <b>mésinformation</b>. Le même contenu deviendrait de la <b>malinformation</b> s'il le faisait <b>sciemment pour nuire</b>."
  },
  {
    tag: "Publié « pour prévenir »",
    fmt: "post", icon: "📍", user: "Voisins Vigilants", handle: "@quartier",
    body: "⚠️ Voici le nom, l'adresse et la photo du commerçant 👉 venez le « rappeler à l'ordre » !",
    context: "Les infos sont <b>vraies et privées</b>, divulguées <b>pour exposer et nuire</b> (doxing).",
    c: "mal",
    why: "Les informations sont <b>vraies et privées</b>, divulguées <b>pour exposer et nuire</b> (doxing) → <b>malinformation</b>. Aucune déformation : c'est la <b>divulgation</b> elle-même qui est l'arme."
  },
  {
    tag: "Témoignage en ligne",
    fmt: "post", icon: "🛸", user: "Tom", handle: "@tom · hier soir",
    body: "🛸 J'ai vu de mes propres yeux un OVNI au-dessus du stade !! Je vous jure, c'était réel !",
    context: "C'était en fait un <b>drone</b>. Tom <b>y croit sincèrement</b> et partage sans aucune mauvaise intention.",
    c: "mes",
    why: "Affirmation <b>fausse</b> mais sincère, <b>sans intention de tromper</b> → <b>mésinformation</b>. Croire fort à quelque chose de faux et le partager de bonne foi reste de la mésinformation."
  },
  {
    tag: "Soi-disant « fuite »",
    fmt: "mail", leak: "📂 « DOCUMENTS SECRETS »… en réalité inventés",
    meta: "Prétendue fuite interne — source : compte anonyme",
    subject: "Plan secret de l'entreprise (faux document)",
    body: "« …documents fabriqués de toutes pièces pour faire chuter l'action en bourse… »",
    img: "images/exemple-desinformation.jpg",
    context: "Ça <b>ressemble</b> à une fuite (qui serait du vrai), mais les documents sont <b>entièrement inventés</b> pour nuire.",
    c: "des",
    why: "Piège « malinfo » : ça ressemble à une fuite, mais les documents sont <b>entièrement inventés</b> → contenu <b>faux</b>, fabriqué <b>pour nuire</b> → <b>désinformation</b>. Une vraie fuite serait de la malinformation ; une fausse fuite reste de la désinformation."
  }
];

/* ---------- Libellés ---------- */
const LABELS = {
  mes: { name: "Mésinformation", color: "var(--mes)" },
  des: { name: "Désinformation", color: "var(--des)" },
  mal: { name: "Malinformation", color: "var(--mal)" }
};

/* ---------- État ---------- */
