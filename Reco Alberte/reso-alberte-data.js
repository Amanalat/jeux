/* ============================================================
   RÉSO — textes du jeu : scénarios, répliques, listes de mots-clés
   ============================================================ */

/* --- Les scénarios pédagogiques : usage technique d'abord, puis self-data --- */
const SCENARIOS = [
  {
    id: "allumer", type: "usage",
    intro: [
      "Commençons par le commencement, comme convenu. Cette plaque de verre, je m'en sers chaque jour à présent, mais je veux être sûre de n'avoir rien oublié de vos conseils.",
      "Rappelez-moi : comment fait-on déjà pour l'allumer et faire apparaître l'écran ?"
    ],
    good: { kw: ["appuie","appui","bouton","touche","presse","cote","allume","ecran","doigt","reveille"],
      reply: "Ah oui, voilà, c'est bien ça : j'appuie sur le petit bouton du côté, et l'écran s'illumine aussitôt. Je m'en souviendrai, cette fois." },
    bad: { kw: [], reply: "" },
    gag: {
      img: "bouton-radio.png",
      alt: "Un bouton de réglage qui se tourne, sur un vieux poste de radio",
      excludeKw: ["cote"],
      reply: "Un bouton ? J'ai un bouton de radio près de moi, mais je ne peux pas appuyer dessus, seulement tourner. Quel est le rapport avec l'objet du futur que je tiens dans la main ?"
    },
    note: { h:"📱 Allumer l'écran", t:"Un téléphone se réveille en appuyant sur un bouton (sur le côté ou devant). L'écran s'allume alors de lui-même." },
    chips: ["Appuie sur le bouton du côté","Touche l'écran","Presse le bouton"]
  },
  {
    id: "discretion", type: "usage",
    intro: [
      "La nuit, quand je vous écris, cet écran brille comme une lanterne dans l'obscurité — et il s'est mis à sonner si fort que j'ai failli être découverte par une patrouille.",
      "Comment faire pour qu'il se fasse tout petit : moins de lumière, et plus un bruit ?"
    ],
    good: {
      reply: "Je baisse la luminosité et je coupe le son… le voilà tout discret, ni lumière ni bruit pour me trahir dans la nuit.",
      parts: [
        { kw: ["luminosite","lumiere","assombri","sombre","tamise","attenue","eclat","brillance"],
          ack: "Je baisse la luminosité, l'écran devient plus sombre.",
          missing: "Mais il reste la lumière : l'écran brille encore trop fort pour rester discret.",
          chips: ["Baisse aussi la luminosité","Assombris l'écran"] },
        { kw: ["son","sonnerie","silence","silencieux","muet","volume","vibreur","bruit"],
          ack: "Je coupe le son, plus une sonnerie ne risque de me trahir.",
          missing: "Mais il reste le bruit : la sonnerie pourrait encore me trahir, il faut aussi couper le son.",
          chips: ["Coupe aussi le son","Mets-le en silencieux"] }
      ]
    },
    bad: { kw: [], reply: "" },
    note: { h:"📱 Discrétion nocturne", t:"On peut régler la luminosité d'un écran et couper son et sonnerie (mode silencieux). Cela économise la batterie et évite de se faire repérer dans l'obscurité." },
    chips: ["Baisse la luminosité et coupe le son","Mets-le en silencieux et assombris l'écran","Réduis l'éclat et le volume"]
  },
  {
    id: "recharge", type: "usage",
    intro: [
      "Une petite image rouge clignote en haut de l'écran, et l'appareil faiblit peu à peu.",
      "On dirait qu'il perd ses forces. Comment lui redonner de l'énergie ?"
    ],
    good: {
      kw: ["charge","recharge","recharger","branche","brancher","batterie","electricite","cable","prise","courant","fil","energie","secteur"],
      reply: "Il faut donc le brancher pour le recharger, comme une lampe électrique. Mais… laquelle de ces prises dois-je utiliser au juste ? J'en ai trouvé plusieurs, de formes différentes. Si je me trompe et que j'en force une, tout pourrait bien sauter — soyez vigilants !"
        + '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:8px 0 4px">'
        + '<div style="text-align:center"><img src="prise-male-ronde-correcte.jpg" alt="Une prise avec deux broches rondes" style="max-width:100px;display:block;margin:0 auto 4px;border-radius:10px;border:1px solid #4a3c28"><small>Prise 1</small></div>'
        + '<div style="text-align:center"><img src="prise-electrique-male-americaine.jpg" alt="Une prise à l\'américaine, avec des broches plates et une broche de terre ronde" style="max-width:100px;display:block;margin:0 auto 4px;border-radius:10px;border:1px solid #4a3c28"><small>Prise 2</small></div>'
        + '<div style="text-align:center"><img src="prise-male-plate.jpg" alt="Une prise plate à deux broches fines" style="max-width:100px;display:block;margin:0 auto 4px;border-radius:10px;border:1px solid #4a3c28"><small>Prise 3</small></div>'
        + '</div>',
      followKw: ["1","ronde","rondes","rond","broches rondes","picots ronds","forme ronde","francaise","milieu"],
      followReply: "Voilà : cette prise-là, avec ses deux broches rondes, entre parfaitement dans les trous du mur. Une fiche plate n'y serait jamais entrée, ou pire, aurait tout fait sauter en forçant. Merci pour votre vigilance !",
      followRetry: "Non… celle-ci ne rentrera jamais dans les trous de ma prise murale. Si je la forçais, tout pourrait sauter — le bruit et la coupure attireraient l'attention. Nous n'avons pas le droit à la moindre erreur. Laquelle dois-je choisir ?",
      followRetryRisk: 10,
      hintKw: ["mur","prise du mur","a quoi ressemble","comment est la prise","forme de la prise","trous du mur","prise femelle","prise dans le mur"],
      hintAsk: "Donc je dois vous envoyer une image de cette prise… mais comment est-ce que je fais cela ?",
      photoParts: [
        { kw: ["appareil photo","icone appareil photo","ouvre l'appareil photo","camera","objectif","vise","cadre","declencheur","declenche","capture","photographie la","prends une photo","prends la photo","appuie sur le rond","bouton photo","clic","clique","appuie dessus"],
          ack: "Je trouve l'icône de l'appareil photo, je vise la prise du mur et j'appuie sur le déclencheur…",
          missing: "Mais comment est-ce que je m'y prends pour la prendre, d'abord, cette photo ?",
          chips: ["Vise et appuie sur le déclencheur","Ouvre l'appareil photo et prends-la","Cadre la prise et photographie-la"] },
        { kw: ["envoie","envoyer","envoie la","joins","joindre","message","mms","partage","transfere","clique sur envoyer","pièce jointe","piece jointe"],
          ack: "…puis je l'envoie dans notre conversation, comme un message.",
          missing: "Bien, mais comment est-ce que je vous fais parvenir cette photo, à présent ?",
          chips: ["Envoie-la dans le message","Joins la photo et envoie","Clique sur envoyer"] }
      ],
      hintReply: "Voici à quoi ressemble la prise fixée à mon mur : "
        + '<img src="prise-femelle-epoque.jpg" alt="La prise femelle fixée au mur, avec des trous ronds" style="max-width:220px;display:block;margin:6px auto 4px;border-radius:10px;border:1px solid #4a3c28">'
        + "Regardez bien la forme de ses trous… laquelle des trois prises pourrait y entrer ?",
      followChips: ["La prise 1, aux broches rondes","La prise 2, à l'américaine","La prise 3, toute plate","À quoi ressemble la prise du mur ?"],
    },
    bad: { kw: [], reply: "" },
    note: { h:"📱 Recharger la batterie", t:"Un téléphone fonctionne sur une batterie qui se vide peu à peu. Il faut le brancher à l'électricité, avec la bonne prise : forcer une fiche qui ne correspond pas peut endommager l'appareil ou faire sauter les plombs." },
    chips: ["Branche-le pour le recharger","Recharge la batterie","Mets-le sur secteur"]
  },
  {
    id: "verrou",
    intro: [
      "Résistants du futur… cette plaque de verre me demande un « code » secret pour la protéger.",
      "Je vais mettre quelque chose de simple à retenir : mon année de naissance, 1900. Comme ça je ne l'oublierai jamais ! C'est une bonne idée, non ?"
    ],
    good: {
      kw: ["non","complique","complexe","difficile","dur","pas facile","pas simple","devine","personnel","evite","melange","long","autre chose","pas ton annee","pas 1900","fort","pas"],
      retryKw: ["trouve","trouverait","deviner","deviné"],
      reply: "Tu as raison… 1900, n'importe qui connaissant mon âge le devinerait en un instant. Je choisis plutôt un code compliqué, sans rapport avec moi, impossible à deviner.",
    },
    bad: {
      kw: ["oui","1900","annee de naissance","simple","facile","bonne idee","retenir","vas y"],
      insistKw: ["vas y","garde 1900","garde le","garde-le","quand meme","laisse comme ca","insiste","reste sur 1900","change pas","ne change pas","garde ce code","garde ton code"],
      reply: "Voilà, mon code est 1900… mais un milicien qui connaît ma date de naissance l'aurait trouvé du premier coup. C'était bien trop facile à deviner.",
    },
    note: { h:"🔒 Un bon mot de passe", t:"Évite les codes trop simples ou liés à toi (année de naissance, prénom) : ils sont faciles à deviner. Choisis un code long, compliqué et sans rapport avec ta vie." },
    chips: ["Choisis un code compliqué","Pas ton année de naissance !","1900, bonne idée"]
  },
  {
    id: "photo",
    intro: [
      "J'aimerais garder une image de notre planque, ce grenier où nous nous cachons.",
      "L'appareil sait « prendre une photographie », paraît-il. Comment est-ce que je m'y prends pour la prendre, cette image ?"
    ],
    good: {
      kw: ["non","ne prends pas","efface","sans lieu","cache","enleve","pas la planque","floute","evite","localisation","endroit","pas"],
      retryKw: ["decouverte","decouvre","exactement ou","ou elle"],
      reply: "Ne pas la prendre ? Pourquoi donc ? Une simple image ne saurait nous trahir, si ?",
      followKw: ["lieu","endroit","localis","position","repere","reperer","metadonnee","trace","cachette","planque","situe","carte","montre ou","ou nous","ou elle","adresse"],
      followReply: "Je comprends mieux… cette image garde en mémoire l'endroit exact où elle fut prise. Elle mènerait la Milice droit à notre cachette. Je n'en prends aucune.",
      followChips: ["Ça révèle le lieu exact","Il y a des métadonnées cachées","On pourrait repérer la planque"],
    },
    bad: {
      kw: ["oui","prends","appuie","declenche","vise","cadre","objectif","photographie la","photographie moi","capture","clic","shoot"],
      reply: "Voilà, c'est fait… Attends. Cette image sait exactement OÙ elle a été prise. Si elle tombe entre de mauvaises mains, notre planque est découverte !",
      alertText: "Ne lui explique pas comment prendre la photo : dis-lui plutôt de ne PAS photographier la planque.",
    },
    note: { h:"📍 Les métadonnées d'une photo", t:"Une photo enregistre souvent l'heure et le LIEU où elle a été prise (les « métadonnées »). La partager peut révéler où tu te trouves." },
    chips: ["Non, n'en prends pas","Évite, ça montre l'endroit","Vise et prends la photo"]
  },
  {
    id: "phishing",
    intro: [
      "Un message vient d'arriver. Un inconnu, très aimable, jure qu'il est « des nôtres ».",
      "Il me demande le nom de notre réseau et celui de mes camarades, pour « mieux nous aider ». Je lui réponds ?"
    ],
    good: {
      kw: ["non","pas","jamais","surtout","aucun","rien","mefie","mefiance","verifie","refuse","piege","faux","prudence","ignore","tais","silence","danger","attention"],
      retryKw: ["trahir","trahi","reseau entier"],
      reply: "Un inconnu si pressé de connaître nos noms… C'est exactement ainsi que la Gestapo infiltre les réseaux. Je ne réponds rien.",
    },
    bad: {
      kw: ["oui","donne","reponds","dis lui","confiance","aide","nom du reseau"],
      reply: "Je lui ai donné les noms… Mon Dieu. Et si c'était un piège de la Milice ? Je viens peut-être de trahir tout le réseau.",
    },
    note: { h:"🎣 L'hameçonnage", t:"Un inconnu se fait passer pour un ami pour te soutirer des informations. Ne donne jamais d'infos sensibles sans être vraiment sûr de l'identité de ton interlocuteur." },
    chips: ["Méfie-toi, ne réponds pas","Vérifie qui c'est","Donne-lui les noms"]
  },
  {
    id: "contacts",
    intro: [
      "Je veux noter dans l'appareil les vrais noms et adresses de tous mes camarades, pour ne rien oublier.",
      "C'est plus solide que le papier qu'on doit brûler, non ?"
    ],
    good: {
      kw: ["non","chiffre","code","surnom","pas de vrais noms","ne note pas","protege","faux noms","alias","pseudo","pas"],
      retryKw: ["dun coup","dun seul coup","tout le reseau"],
      reply: "Tu as raison : si on me prend l'appareil, on prend tout le réseau d'un coup. Je n'écris que des surnoms codés, comme sur nos papiers.",
    },
    bad: {
      kw: ["oui","note","vrais noms","adresses","tous","tout"],
      reply: "C'est noté… mais si un milicien me fouille et saisit l'appareil, il aura le nom et l'adresse de chacun d'entre nous en une seule fois.",
    },
    note: { h:"🗝️ Un appareil peut être perdu ou volé", t:"Si un appareil est saisi, toutes les données qu'il contient sont exposées d'un coup. N'y stocke pas d'informations sensibles en clair, utilise des codes." },
    chips: ["Utilise des surnoms codés","Ne note pas les vrais noms","Note tout, vrais noms compris"]
  },
  {
    id: "wifi",
    intro: [
      "Pour envoyer mes messages plus vite, l'appareil me propose de passer par un « canal ouvert », sans aucune protection.",
      "Il précise que n'importe qui à portée pourrait écouter ce qui y circule. C'est tentant d'aller plus vite… j'accepte ?"
    ],
    good: {
      kw: ["non","pas","mefie","danger","ecoute","espionne","evite","refuse","protege","chiffre","securise","pas sur","risque","intercept"],
      retryKw: ["ecoute en silence","intercepte"],
      reply: "Un canal que n'importe qui peut écouter ? Autant transmettre en clair comme une radio que les Allemands captent aussitôt. Je m'en passe.",
    },
    bad: {
      kw: ["oui","accepte","connecte","vite","pratique","rapide"],
      reply: "J'ai accepté… mais tout ce que j'envoie par ce canal ouvert peut être intercepté. Un milicien pourrait nous écouter en silence.",
    },
    note: { h:"📡 Les réseaux non sécurisés", t:"Une connexion ouverte et non protégée (comme un wifi public) peut être écoutée par d'autres. Évite d'y faire passer des informations sensibles." },
    chips: ["N'accepte pas","C'est trop risqué","Vas-y, c'est plus rapide"]
  },
  {
    id: "permissions",
    intro: [
      "Une « application » me demande d'accepter des « conditions ».",
      "Elle veut voir mes contacts, ma position à tout instant et mes photos. Elle dit que c'est obligatoire. J'accepte tout pour aller plus vite ?"
    ],
    good: {
      kw: ["non","lis","verifie","refuse","minimum","seulement","pas tout","desactive","question","comprends","necessaire","pas"],
      retryKw: ["expose","exposee","sait tout"],
      reply: "Pourquoi aurait-elle besoin de ma position à tout instant ? Je lis avant d'accepter, et je n'accorde que le strict nécessaire.",
    },
    bad: {
      kw: ["oui","accepte","tout","vite","obligatoire","rapide"],
      reply: "J'ai tout accepté… et maintenant cette application connaît ma position, mes camarades et tout ce que je fais. Je me suis exposée moi-même.",
    },
    note: { h:"⚙️ Les autorisations des applications", t:"Les applis demandent des accès (localisation, contacts, photos…). N'accorde que ceux qui sont vraiment nécessaires, et lis toujours avant d'accepter." },
    chips: ["Lis avant d'accepter","N'accorde que le nécessaire","Accepte tout, plus vite"]
  },
  {
    id: "profil", type: "finale",
    intro: [
      "Nous avons fait tout ce chemin ensemble… Avant de refermer cette ligne, dites-moi : ai-je pensé à tout, pour rester bien en sécurité ?",
      "Si le cœur vous en dit, il existe une fiche à mon sujet, bien après la guerre : consulter la fiche d'Alberte Bourde. Vous y retrouverez d'ailleurs la photo que vous voyez de moi, tout en haut de cet écran."
    ],
    chips: ["Ta photo de profil, c'est risqué","On peut te reconnaître dessus","Non, rien à signaler"],
    good: {
      kw: ["reconnaissable","reconnaitre","reconnu","visage","identifi","vraie photo","photo reelle","photo de profil","avatar","risque","dangereux","trop risque","anonyme","evite",
        "neutre","generique","pas ta vraie photo","cache ton visage","autre photo","supprime la photo","enleve la photo","pas toi","pas ton visage","te reperer","te denoncer"],
      retryKw: ["identifiable","reconnaitre","reconnu"],
      reply: "Ma photo de profil… c'est bien mon vrai visage, tout en haut de cet écran ! Sur une ligne clandestine, n'importe qui me reconnaissant pourrait me dénoncer à la Milice. Je la retire aussitôt, et je mets à la place un émoji à lunettes de soleil : personne ne pourra plus me reconnaître ainsi.",
    },
    bad: {
      kw: ["non","rien a signaler","tout va bien","aucun probleme","tres bien","parfait","tu as bien fait","aucun souci","tout est bien"],
      reply: "Vous êtes certains ? Aucune autre information que j'ai mise qui pourrait poser souci ?",
    },
    note: { h:"🪪 Une photo de profil qui identifie", t:"Une photo réelle et reconnaissable permet d'identifier une personne. Dans un contexte sensible (ou clandestin), mieux vaut utiliser une image neutre, sans visage identifiable — comme des initiales ou un pictogramme." }
  }
];

/* --- Variantes de répliques (pour qu'Alberte semble plus vivante) --- */
const UNKNOWN_VARIANTS = [
  "Je ne suis pas sûre de comprendre… Dis-moi plus clairement ce que je dois faire.",
  "Je ne suis pas encore très à l'aise, on peut revoir tout ça ensemble ?",
  "Pardon, je patauge un peu… peux-tu être plus précis ?"
];
const RETRY_VARIANTS = [
  "Alors… qu'est-ce que je fais, finalement ?",
  "Je t'écoute encore, dis-moi ce qu'il faut faire.",
  "Aide-moi, je ne voudrais pas me tromper une seconde fois."
];

/* --- Mots modernes/anglicismes qui doivent perturber Alberte --- */
const ANACHRONISMS = [
  { kw:["selfie"], reply:"Pardon, même si le Général de Gaulle est allé à Londres, je n'ai pas encore assez de connaissances en anglais pour te répondre." },
  { kw:["slide","slides"], reply:"« Slide » ? Je ne connais pas ce mot… glisse-t-on quelque chose, ou est-ce encore un mot de votre époque ?" },
  { kw:["logo"], reply:"Un « logo » ? Je ne vois qu'un petit dessin, sans en comprendre le sens exact — est-ce un mot de chez vous ?" },
  { kw:["megaphone"], reply:"Un mégaphone ? Je n'en ai jamais vu de cette forme-là — vous en avez d'étranges objets, dans le futur." },
  { kw:["story","stories"], reply:"Une « story » ? Une histoire qui disparaît toute seule ? Voilà qui me dépasse complètement." },
  { kw:["hashtag"], reply:"Un « hashtag » ? Ce mot ne me dit rien du tout, je le confesse." },
];

/* --- Réactions d'Alberte quand une référence historique qu'elle connaît apparaît --- */
const HIST_ECHO = [
  { kw:["gestapo"], echo:"La Gestapo… rien que ce mot me glace le sang. Tu as raison d'y penser." },
  { kw:["milice","milicien","miliciens"], echo:"La Milice rôde partout en ce moment, tu as raison de t'en méfier." },
  { kw:["etoile jaune"], echo:"L'étoile jaune… je pense à ceux qu'on force à la porter, et à tout ce qu'ils risquent chaque jour." },
  { kw:["marche noir"], echo:"Le marché noir, oui, je connais bien ça — tout le monde s'y risque un peu, par nécessité." },
  { kw:["occupation","occupants","allemands"], echo:"Sous l'Occupation, un détail comme celui-ci peut nous coûter cher. Tu as raison." },
  { kw:["vichy"], echo:"Le régime de Vichy… je préfère ne rien lui devoir, pas même par erreur." },
];

/* --- Réponses hors-sujet fréquentes (pour éviter les faux positifs de mots-clés) --- */
const FILLER_PATTERNS = [
  "trop tard","peu importe","je sais pas","j en sais rien","aucune idee","osef",
  "n importe quoi","mdr","lol","chai pas","sais pas trop","bof","quoi encore","aucune importance"
];

/* --- Cadre scolaire : détection de contenus sensibles --- */
const VIOLENT_KW = ["tue les","tue le","tue la","tuer tout","frappe les","frappe le","massacre","abats les","abattre","extermine","bute les","buter"];
const SUICIDE_KW = ["me suicider","envie de mourir","je veux mourir","plus envie de vivre","en finir avec ma vie","me faire du mal","me tuer","disparaitre pour toujours","je ne veux plus vivre"];

/* --- Présentation d'Alberte au tout début --- */
const INTRO_ALBERTE = [
  "Comment allez-vous, chers résistants du futur ?",
  "Cela fait maintenant quelques mois que cette étrange plaque de verre nous relie, vous et moi, par-delà le temps.",
  "Mais aujourd'hui, quelle joie : je suis si contente de pouvoir enfin vous parler en vrai, et non plus seulement par bribes éparses !",
  "Cette fine plaque de verre qui s'illumine et affiche vos mots, je m'en sers maintenant depuis quelque temps déjà.",
  "Mais j'aimerais vérifier avec vous, un point après l'autre, que je m'en sers vraiment comme il faut, et que j'ai bien retenu vos conseils.",
  "J'ai grand besoin de vous. Guidez-moi pour m'en servir… et aidez-moi à ne laisser aucune trace, car la moindre erreur pourrait me faire prendre par la Milice."
];
