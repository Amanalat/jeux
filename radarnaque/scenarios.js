/* =========================================================================
   RADAR ANTI-ARNAQUES — Banque de scénarios
   Chaque carte reproduit un message réaliste (SMS, e-mail, message, appel,
   notification, image). Le joueur décide : FIABLE ou MÉFIANCE (arnaque).
   Corpus inspiré de cas réels 2024-2026 (colis, faux conseiller bancaire,
   faux proche, deepfakes, boîte-mystère, panneaux solaires, faux support…).

   Champs communs :
     id         identifiant unique
     canal      'sms' | 'email' | 'chat' | 'appel' | 'notif' | 'image'
     entete     petit libellé au-dessus de la carte (contexte)
     verdict    'arnaque' | 'fiable'
     categorie  type d'arnaque (ou "Message légitime")
     indices    signaux à repérer (drapeaux rouges) OU rassurants (si fiable)
     reflexe    le bon réflexe en une phrase
     explication court paragraphe pédagogique
   Champs de contenu selon le canal (voir renderCarte dans app.js).
   ========================================================================= */

const SCENARIOS = [

  /* ---------- 1. SMS colis (smishing) — ARNAQUE ------------------------ */
  {
    id: 'sms-colis',
    canal: 'sms',
    entete: 'SMS reçu ce matin d’un numéro inconnu',
    expediteur: '+33 7 45 13 81 31',
    messages: [
      'Bonjour, votre colis ne rentrait pas dans la boîte aux lettres. Réagissez avant le 09/01, sinon il sera renvoyé : https://mon-relay-suivi.com',
      '3e095272b3fe4c7996b'
    ],
    verdict: 'arnaque',
    categorie: 'Hameçonnage par SMS (« smishing ») — faux colis',
    indices: [
      'Numéro de portable personnel (+33 7…) : un vrai transporteur n’écrit pas depuis un 06/07.',
      'Lien bizarre « mon-relay-suivi.com » : ce n’est pas le vrai site de Mondial Relay / La Poste.',
      'On vous met la pression avec une date limite (« avant le 09/01, sinon renvoyé »).',
      'Suite de caractères sans signification pour faire « officiel ».'
    ],
    reflexe: 'N’attendez aucun colis ? N’en attendez pas non plus le lien. On ne clique pas : on vérifie sur l’appli ou le site officiel du transporteur.',
    explication: 'C’est l’arnaque n°1 en France. Le lien mène à un faux site qui réclame « 2 € de frais » pour voler votre carte bancaire, puis vous appelle en se faisant passer pour votre banque. Signalez le SMS en le transférant gratuitement au 33700.'
  },

  /* ---------- 2. E-mail réinitialisation mot de passe — ARNAQUE -------- */
  {
    id: 'email-motdepasse',
    canal: 'email',
    entete: 'E-mail arrivé dans votre boîte de réception',
    de: 'Microsoft Security Team',
    deAdresse: 'ne-pas-repondre@chronopost.fr',
    objet: 'Alerte de sécurité : nouvelle demande de mot de passe',
    date: 'Aujourd’hui, 09:14',
    corps: 'Salut, antoninatger :<br><br>Nous avons reçu une demande de définition d’un nouveau mot de passe pour votre compte à partir d’un appareil ou d’un emplacement que vous n’avez pas Utiliser habituellement. C’est vous ?<br><br>Confirmez votre identité sous 24h pour éviter la suspension de votre compte.',
    bouton: 'Oui, c’est moi — confirmer',
    verdict: 'arnaque',
    categorie: 'Hameçonnage par e-mail — usurpation « sécurité du compte »',
    indices: [
      'L’expéditeur dit « Microsoft » mais l’adresse finit par @chronopost.fr : ça ne colle pas.',
      'Fautes et tournures maladroites (« que vous n’avez pas Utiliser habituellement »).',
      'On crée la peur (« suspension du compte ») et l’urgence (« sous 24h »).',
      'Le bouton mène à une fausse page qui vole votre identifiant et votre mot de passe.'
    ],
    reflexe: 'Regardez toujours l’adresse complète de l’expéditeur, pas seulement le nom affiché. Nom ≠ adresse.',
    explication: 'Les escrocs affichent un nom rassurant (« Microsoft Security Team ») mais l’adresse réelle les trahit. En cas de doute sur un compte, n’utilisez jamais le bouton du mail : ouvrez vous-même le site officiel dans votre navigateur.'
  },

  /* ---------- 3. E-mail boîte-mystère TEMU — ARNAQUE ------------------- */
  {
    id: 'email-boite-mystere',
    canal: 'email',
    entete: 'E-mail avec une pièce jointe',
    de: 'CONFIRMATION_D’EXPEDITION#',
    deAdresse: 'noreply.LE.04@b8.9a.21.eb',
    objet: '_VousAvez-Gagné Une Boîte-mystère de--TEMU',
    date: 'Dim. 02/02, 17:59',
    corps: 'Félicitations !<br><br>-VeuiLLez.ConFirmer La-Reception!!-<br><br>Ouvrez la pièce jointe pour récupérer votre cadeau avant expiration.',
    piecesJointes: ['NQLRF.pdf'],
    verdict: 'arnaque',
    categorie: 'Faux gain / cadeau — pièce jointe piégée',
    indices: [
      'Adresse d’expéditeur incompréhensible (noreply.LE.04@b8.9a.21.eb).',
      'Texte truffé de majuscules, tirets et fautes bizarres pour tromper les filtres anti-spam.',
      'Un « cadeau » que vous n’avez jamais demandé : personne ne donne rien gratuitement.',
      'Pièce jointe PDF inconnue : ne jamais ouvrir, elle peut installer un virus.'
    ],
    reflexe: 'Un gain que vous n’avez pas joué est toujours un piège. On n’ouvre pas la pièce jointe, on supprime.',
    explication: 'La mise en forme « cassée » (VeuiLLez.ConFirmer) n’est pas de la maladresse : elle sert à passer les filtres anti-spam. La pièce jointe peut installer un logateur espion ou vous conduire vers une page qui réclame vos coordonnées bancaires « pour les frais de livraison ».'
  },

  /* ---------- 4. E-mail panneaux solaires / aides — ARNAQUE ----------- */
  {
    id: 'email-panneaux',
    canal: 'email',
    entete: 'E-mail à propos d’aides de l’État',
    de: 'Charlotte Robert',
    deAdresse: 'charlotte.robert@shikisc.com',
    objet: 'Dernière chance : aides panneaux solaires dans votre région',
    date: 'Lun. 03/02, 10:58',
    corps: 'Des spécialistes en <b>installations de panneaux solaires</b> seront présents dans votre région du 14 février au 14 mars.<br><br>Leur objectif : vous fournir des devis personnalisés et des informations sur les aides gouvernementales, en vigueur jusqu’au 01-01-2025.<br><br>Nos équipes ne pourront pas faire face à toutes les demandes, il est donc conseillé de <u>s’inscrire dès aujourd’hui</u> pour ne pas perdre l’opportunité.',
    bouton: 'Profitez des aides',
    verdict: 'arnaque',
    categorie: 'Faux démarchage « rénovation énergétique / aides de l’État »',
    indices: [
      'Adresse d’entreprise fantaisiste (@shikisc.com), sans lien avec un organisme public.',
      'Une « date limite d’aide » déjà dépassée (01-01-2025) : incohérence.',
      'Rareté artificielle : « nos équipes ne pourront pas faire face », « dernière chance ».',
      'L’État ne démarche jamais par e-mail pour des travaux chez vous.'
    ],
    reflexe: 'Aucune aide publique ne se réclame en cliquant sur un e-mail non sollicité. Renseignez-vous sur France Rénov’ (site officiel) ou au 0 808 800 700.',
    explication: 'Les escrocs surfent sur des sujets sensibles (isolation, pompe à chaleur, panneaux solaires) pour récupérer vos informations, obtenir un rendez-vous et vous faire signer des travaux surfacturés ou inexistants. Une vraie aide passe par des démarches que VOUS engagez.'
  },

  /* ---------- 5. Message "célébrité" amoureuse — ARNAQUE --------------- */
  {
    id: 'chat-celebrite',
    canal: 'chat',
    plateforme: 'Messenger',
    contact: 'Brad Pitt (Officiel) ✔',
    avatar: 'img/celebrite-roses.jpg',
    messages: [
      { from: 'eux', texte: 'Bonjour ma chérie ❤️ Je pense à toi chaque jour. Tu es la seule qui me comprend vraiment.' },
      { from: 'eux', texte: 'Mon équipe garde notre relation secrète à cause des médias. Je viendrai bientôt en France pour toi.' },
      { from: 'eux', texte: 'J’ai un petit souci : mes comptes sont bloqués par ma production. Peux-tu m’avancer 850 € en cartes cadeaux ? Je te rembourse dès mon arrivée. 🌹' }
    ],
    verdict: 'arnaque',
    categorie: 'Arnaque aux sentiments / fausse célébrité',
    indices: [
      'Une célébrité qui vous écrit en privé et tombe amoureuse en quelques messages : impossible.',
      'Le secret imposé (« ne le dis à personne ») isole la victime.',
      'La demande d’argent finit toujours par arriver — souvent en cartes cadeaux, intraçables.',
      'La photo peut être vraie (célébrité) ou générée par IA : une image ne prouve rien.'
    ],
    reflexe: 'Dès qu’un « amour » rencontré en ligne demande de l’argent, c’est une arnaque. Aucune exception.',
    explication: 'Des victimes ont perdu des dizaines de milliers d’euros avec de faux « Brad Pitt ». Les escrocs jouent longtemps la carte de l’affection avant de demander de l’argent « pour un imprévu ». Une vraie relation ne commence jamais par un virement ou des cartes cadeaux.'
  },

  /* ---------- 6. Appel faux conseiller bancaire — ARNAQUE ------------- */
  {
    id: 'appel-banque',
    canal: 'appel',
    afficheur: 'Votre banque',
    numero: 'appel affiché : 01 40 XX XX XX (n° de votre agence)',
    transcript: [
      { qui: 'lui', texte: 'Bonjour, service anti-fraude de votre banque. Nous voyons un virement suspect de 1 290 € en cours vers l’étranger. C’est bien vous ?' },
      { qui: 'vous', texte: 'Non, pas du tout !' },
      { qui: 'lui', texte: 'Pas d’inquiétude, je bloque tout de suite. Pour annuler, je vous envoie un code par SMS : donnez-le-moi, et confirmez votre mot de passe d’accès à l’appli.' }
    ],
    verdict: 'arnaque',
    categorie: 'Faux conseiller bancaire (« spoofing » du numéro)',
    indices: [
      'Le numéro affiché est celui de votre banque : il peut être falsifié (spoofing). L’afficheur ne prouve rien.',
      'On invente une urgence (« virement suspect en cours ») pour vous faire paniquer.',
      'On vous demande un code reçu par SMS ou votre mot de passe : une banque ne le fait JAMAIS.',
      'Donner ce code valide en réalité LE virement des escrocs, pas son annulation.'
    ],
    reflexe: 'Un vrai conseiller ne demande jamais vos codes ni vos mots de passe. Raccrochez, puis rappelez le numéro au dos de votre carte.',
    explication: 'C’est l’arnaque qui coûte le plus cher (3 000 € en moyenne). L’escroc affiche le numéro de votre banque et connaît parfois votre nom ou vos dernières opérations. Ne validez rien, ne dictez aucun code. En cas de doute, raccrochez et rappelez vous-même votre banque.'
  },

  /* ---------- 7. WhatsApp faux proche — ARNAQUE ----------------------- */
  {
    id: 'chat-faux-proche',
    canal: 'chat',
    plateforme: 'WhatsApp',
    contact: '+33 6 51 20 84 77',
    avatar: '',
    messages: [
      { from: 'eux', texte: 'Coucou maman c’est moi 😊 j’ai cassé mon téléphone, voici mon nouveau numéro. Enregistre-le.' },
      { from: 'eux', texte: 'Du coup je n’ai plus accès à mon appli bancaire jusqu’à demain…' },
      { from: 'eux', texte: 'Tu peux me dépanner d’un virement de 680 € pour une facture urgente ? Je te rends ça dès que mon compte remarche. Merci maman ❤️' }
    ],
    verdict: 'arnaque',
    categorie: 'Arnaque au faux proche (« Bonjour maman »)',
    indices: [
      'Nouveau numéro inconnu qui prétend être votre enfant.',
      'Excuse classique : téléphone cassé + appli bancaire bloquée « jusqu’à demain ».',
      'Demande d’argent urgente pour une facture à régler tout de suite.',
      'Il évite le contact vocal (« je ne peux pas appeler ») pour ne pas se faire démasquer.'
    ],
    reflexe: 'Appelez votre proche sur SON ancien numéro pour vérifier. Ne virez jamais d’argent sur la foi d’un simple message.',
    explication: 'L’escroc se fait passer pour un enfant ou un petit-enfant en détresse. Le meilleur test : posez une question dont seul votre vrai proche connaît la réponse, ou appelez-le directement. Un imposteur trouvera toujours une raison de ne pas répondre au téléphone.'
  },

  /* ---------- 8. Image deepfake (info ou intox) — ARNAQUE ------------- */
  {
    id: 'image-deepfake',
    canal: 'image',
    image: 'img/deepfake-arrestation.jpg',
    legende: '« Regardez ce qu’on nous cache ! Arrestation d’un dirigeant en pleine rue. » — Partagé 48 000 fois',
    verdict: 'arnaque',
    categorie: 'Image générée par IA (« deepfake ») / intox',
    indices: [
      'Détails anormaux : mains déformées, doigts en trop, visages « lisses » ou flous à l’arrière-plan.',
      'Aucun média sérieux ne reprend l’information : seulement des pages qui cherchent le clic.',
      'La légende joue sur l’émotion et le sensationnel (« ce qu’on nous cache »).',
      'Une image seule ne prouve rien : elle peut être fabriquée en quelques secondes.'
    ],
    reflexe: 'Avant de croire ou de partager une image choc, cherchez l’info sur des sources connues. Zoomez sur les mains et les détails.',
    explication: 'Les images IA servent à manipuler l’opinion, faire le buzz ou attirer vers des sites frauduleux. Réflexe : chercher le même événement sur plusieurs médias reconnus. S’il n’existe nulle part ailleurs, c’est très probablement faux.'
  },

  /* ---------- 9. SMS Assurance Maladie — ARNAQUE --------------------- */
  {
    id: 'sms-ameli',
    canal: 'sms',
    entete: 'SMS reçu cet après-midi',
    expediteur: 'AMELI-INFO',
    messages: [
      'Assurance Maladie : votre carte Vitale expire le 15/07. Sans mise à jour, vos remboursements seront suspendus. Régularisez ici : http://ameli-mise-a-jour.info-fr.net'
    ],
    verdict: 'arnaque',
    categorie: 'Usurpation d’organisme public (Assurance Maladie)',
    indices: [
      'La carte Vitale n’a pas de date d’expiration qui « suspend » les remboursements.',
      'Adresse du lien trompeuse : le vrai site est ameli.fr, pas « ameli-mise-a-jour.info-fr.net ».',
      'Menace + urgence : « suspension des remboursements ».',
      'Un organisme public ne réclame jamais vos coordonnées bancaires par SMS.'
    ],
    reflexe: 'Un vrai site officiel finit par .gouv.fr ou .fr connu (ameli.fr, impots.gouv.fr). Dans le doute, tapez l’adresse vous-même.',
    explication: 'CAF, Assurance Maladie, impôts, ANTAI (amendes)… les escrocs usurpent tous les organismes. Ils veulent votre numéro de sécurité sociale et votre carte bancaire. Les remboursements officiels sont automatiques : on ne vous les « débloque » jamais contre un paiement.'
  },

  /* ---------- 10. Faux support technique (pop-up) — ARNAQUE ----------- */
  {
    id: 'popup-support',
    canal: 'notif',
    app: 'Alerte de sécurité',
    appIcon: '⚠️',
    fond: 'alerte',
    titre: 'VOTRE ORDINATEUR EST INFECTÉ (5 virus détectés)',
    texte: 'Vos mots de passe et vos données bancaires sont en danger. N’éteignez pas l’ordinateur. Appelez immédiatement le support Microsoft : 01 84 88 XX XX.',
    verdict: 'arnaque',
    categorie: 'Faux support technique (« votre PC est infecté »)',
    indices: [
      'Une vraie alerte antivirus ne vous demande jamais de téléphoner à un numéro.',
      'Panique + interdiction d’éteindre : pour vous empêcher de réfléchir.',
      'Le « support Microsoft » ne surveille pas votre écran et ne vous appelle pas.',
      'Objectif : prendre la main sur votre ordinateur à distance et vous soutirer de l’argent.'
    ],
    reflexe: 'Ne composez jamais le numéro affiché. Fermez la fenêtre (ou éteignez), et faites vérifier l’ordinateur par un proche de confiance.',
    explication: 'Ces pop-ups bloquants apparaissent en surfant. Si vous appelez, un faux technicien vous fait installer un logiciel de prise en main à distance, puis « répare » un faux problème contre plusieurs centaines d’euros — ou vide vos comptes. On ferme, on n’appelle pas.'
  },

  /* ---------- 11. Offre d’emploi WhatsApp — ARNAQUE ------------------ */
  {
    id: 'chat-emploi',
    canal: 'chat',
    plateforme: 'WhatsApp',
    contact: 'Recrutement Amazon (RH)',
    avatar: '',
    messages: [
      { from: 'eux', texte: 'Bonjour ! Nous recrutons des opérateurs à domicile. 30 min/jour, 80 à 300 € par jour, aucune expérience requise. Intéressé(e) ?' },
      { from: 'eux', texte: 'Il suffit de valider des commandes sur notre plateforme. Pour commencer, créez votre compte et rechargez 40 € qui vous seront rendus avec vos gains.' }
    ],
    verdict: 'arnaque',
    categorie: 'Fausse offre d’emploi / « arnaque à la tâche »',
    indices: [
      'Salaire irréaliste pour un travail « sans expérience, 30 min par jour ».',
      'Recrutement par WhatsApp au nom d’une grande marque : les vraies entreprises ne font pas ça.',
      'On vous demande de « recharger » ou d’avancer de l’argent pour commencer : signal d’alarme absolu.',
      'Au début on vous rend vos petits gains… pour vous pousser à verser des sommes de plus en plus grosses.'
    ],
    reflexe: 'Un vrai emploi vous paie ; il ne vous demande jamais de payer pour travailler. Fuyez toute « recharge » demandée.',
    explication: 'Ces fausses missions (« liker », « valider des commandes ») paraissent payer au début, puis exigent des dépôts croissants que vous ne reverrez jamais. Aucune entreprise sérieuse ne recrute par SMS/WhatsApp en réclamant de l’argent d’avance.'
  },

  /* ---------- 11b. SMS colis + photo IA « à votre nom » — ARNAQUE ----- */
  {
    id: 'sms-colis-photo-ia',
    canal: 'sms',
    entete: 'SMS reçu ce matin, avec une photo en pièce jointe',
    expediteur: '+33 6 12 44 90 08',
    messages: [
      'Bonjour, votre colis est bloqué à notre centre : votre adresse est incomplète. Voici la photo de votre paquet en attente 👇',
      { photo: true, nom: 'Mme Martine DUPONT', legende: 'Colis en attente · centre de tri' },
      'Confirmez votre adresse et réglez 1,95 € de relivraison ici : https://suivi-colis-relais.net'
    ],
    verdict: 'arnaque',
    categorie: 'Faux colis « nouvelle génération » — photo générée par IA',
    indices: [
      'Le SMS vient d’un numéro de portable (+33 6…) : un vrai transporteur ne vous écrit pas d’un 06/07.',
      'La « photo du colis » avec votre nom dessus est fabriquée par IA en quelques secondes : votre nom sur une étiquette ne prouve rien.',
      'On réclame de petits « frais de relivraison » par SMS : aucun transporteur ne se fait payer ainsi.',
      'Le lien ne mène pas au vrai site du transporteur (La Poste, Chronopost, Mondial Relay).'
    ],
    reflexe: 'Une photo, même avec votre nom dessus, ne prouve rien : elle se fabrique en un instant. Ne cliquez pas, vérifiez le suivi sur l’appli ou le site officiel du transporteur.',
    explication: 'C’est la version « nouvelle génération » de l’arnaque au colis : les escrocs ajoutent une photo ultra-réaliste, générée par IA, montrant un paquet à VOTRE nom pour vous convaincre qu’il existe vraiment. Le but reste le même : vous faire payer de faux « frais de relivraison » et voler votre carte bancaire, puis vous rappeler en se faisant passer pour votre banque. Un vrai transporteur ne vous envoie jamais de photo de votre colis avec votre nom. Signalez le SMS au 33700.'
  },

  /* ================== MESSAGES LÉGITIMES (à ne pas confondre) ========= */

  /* ---------- 12. SMS banque légitime — FIABLE ----------------------- */
  {
    id: 'sms-banque-ok',
    canal: 'sms',
    entete: 'SMS de votre banque',
    expediteur: 'CIC',
    messages: [
      'Une opération de 54,90 € chez FNAC a été débitée sur votre carte. Vous ne reconnaissez pas cet achat ? Appelez le numéro figurant au dos de votre carte. Nous ne vous demanderons jamais vos codes.'
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — alerte d’achat',
    indices: [
      'Aucun lien à cliquer et aucune pièce jointe.',
      'On vous renvoie vers le numéro au dos de VOTRE carte (canal que vous maîtrisez).',
      'La banque rappelle explicitement qu’elle ne demandera jamais vos codes.',
      'Pas de menace ni d’urgence excessive : une simple information.'
    ],
    reflexe: 'Un message fiable ne réclame ni code, ni mot de passe, ni clic. Il vous laisse reprendre la main par un canal officiel.',
    explication: 'Attention tout de même : même face à un vrai message, ne rappelez jamais un numéro donné DANS le SMS. Utilisez toujours le numéro officiel (dos de la carte, appli, relevé). Ici, tout est cohérent : c’est un message légitime.'
  },

  /* ---------- 13. Notification connexion Google — FIABLE ------------- */
  {
    id: 'notif-connexion-ok',
    canal: 'notif',
    app: 'Compte Google',
    appIcon: '🔐',
    fond: 'info',
    titre: 'Nouvelle connexion sur Windows',
    texte: 'Un appareil s’est connecté à votre compte. Si c’était vous, aucune action n’est nécessaire. Sinon, sécurisez votre compte depuis l’application Google, rubrique Sécurité.',
    verdict: 'fiable',
    categorie: 'Message légitime — notification de connexion',
    indices: [
      'Aucun lien pressant ni bouton « urgent » à cliquer.',
      'On vous invite à agir depuis l’application officielle, pas via un lien du message.',
      '« Si c’était vous, aucune action nécessaire » : ton informatif, sans menace.',
      'Pas de demande de mot de passe ni de coordonnées bancaires.'
    ],
    reflexe: 'Une vraie notification vous renvoie vers l’appli/site officiel que vous ouvrez vous-même — jamais vers un lien à cliquer en urgence.',
    explication: 'Les vraies alertes de connexion existent et sont utiles. Le bon réflexe reste le même : ne cliquez pas dans le message, ouvrez directement l’application concernée pour vérifier. Ici, rien ne cloche : c’est légitime.'
  },

  /* ---------- 14. Message d’un ami — FIABLE --------------------------- */
  {
    id: 'chat-ami-ok',
    canal: 'chat',
    plateforme: 'SMS',
    contact: 'Jacqueline (voisine)',
    avatar: '',
    messages: [
      { from: 'eux', texte: 'Bonjour ! Toujours d’accord pour le café demain 15h chez moi ?' },
      { from: 'eux', texte: 'J’ai fait une tarte aux pommes 🥧 N’apporte rien, juste toi !' }
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — conversation normale',
    indices: [
      'Contact connu et enregistré, ton habituel.',
      'Aucune demande d’argent, de code ou d’information personnelle.',
      'Aucun lien, aucune urgence, aucune menace.',
      'Le contenu correspond à votre vie réelle (un rendez-vous prévu).'
    ],
    reflexe: 'Tout n’est pas une arnaque ! Un message d’un proche connu, sans demande d’argent ni de lien, est normal.',
    explication: 'Rester prudent ne veut pas dire se méfier de tout le monde. Les vrais échanges avec vos proches n’ont ni lien piégé, ni demande d’argent urgente. Sachez reconnaître ce qui est normal pour mieux repérer ce qui ne l’est pas.'
  },

  /* ---------- 15. SMS code de connexion (demandé) — FIABLE ----------- */
  {
    id: 'sms-code-ok',
    canal: 'sms',
    entete: 'SMS reçu juste après avoir cliqué « Se connecter » sur le site de votre banque',
    expediteur: 'CIC',
    messages: [
      'Votre code de connexion est 483 920. Il est valable 5 minutes. Ne le communiquez jamais à personne, pas même à un conseiller.'
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — code à usage unique (que VOUS avez demandé)',
    indices: [
      'Vous venez vous-même de demander à vous connecter : ce code est attendu.',
      'Aucun lien à cliquer, aucune pièce jointe.',
      'Le message rappelle de ne jamais communiquer le code, même à un conseiller.',
      'Aucune menace ni urgence anormale.'
    ],
    reflexe: 'Un code reçu par SMS ne se DONNE jamais à personne : vous le saisissez vous-même sur le site officiel, c’est tout.',
    explication: 'Ces codes à usage unique sont normaux quand c’est VOUS qui vous connectez. Le piège commence si quelqu’un vous APPELLE pour vous demander de le lui dicter : là, on raccroche. Reçu après votre propre action, ce message est fiable.'
  },

  /* ---------- 16. Notification virement reçu — FIABLE --------------- */
  {
    id: 'notif-virement-ok',
    canal: 'notif',
    app: 'Ma Banque',
    appIcon: '🏦',
    fond: 'info',
    titre: 'Virement reçu : +200,00 €',
    texte: 'Vous avez reçu un virement de 200,00 € de la part de « Paul Durand ». Solde consultable dans votre application.',
    verdict: 'fiable',
    categorie: 'Message légitime — notification de votre banque',
    indices: [
      'Simple information sur une opération, sans rien à faire.',
      'Aucun lien à cliquer, aucun code ni mot de passe demandé.',
      'La notification provient de l’application bancaire installée sur votre téléphone.',
      'Aucune urgence ni menace.'
    ],
    reflexe: 'Une vraie notification informe ; elle ne vous demande jamais d’agir en urgence ni de saisir vos codes.',
    explication: 'Les applications bancaires envoient ce type d’informations. Rien n’est demandé, aucun lien : c’est légitime. En cas de doute, ouvrez vous-même l’application pour vérifier votre solde.'
  },

  /* ---------- 17. Newsletter d’une association — FIABLE ------------- */
  {
    id: 'email-newsletter-ok',
    canal: 'email',
    entete: 'E-mail d’une association à laquelle vous êtes inscrit',
    de: 'Les Restos du Cœur',
    deAdresse: 'contact@restosducoeur.org',
    objet: 'Votre lettre d’information de janvier',
    date: 'Mar. 07/01, 08:30',
    corps: 'Bonjour,<br><br>Merci de votre fidélité. Découvrez les actions près de chez vous ce mois-ci et l’avancée de nos collectes.<br><br>Bonne lecture, et encore merci pour votre soutien.<br><br><span style="color:#64748b;font-size:.85em">Vous recevez ce message car vous êtes inscrit à notre lettre d’information. Vous pouvez vous désinscrire à tout moment.</span>',
    verdict: 'fiable',
    categorie: 'Message légitime — lettre d’information (newsletter)',
    indices: [
      'Adresse d’expéditeur cohérente avec l’organisme (restosducoeur.org).',
      'Aucune demande d’argent immédiate, de code ni de coordonnées bancaires.',
      'Ton informatif, sans menace ni urgence.',
      'Un lien de désinscription clair, comme l’exige la loi.'
    ],
    reflexe: 'Une lettre d’information d’un organisme auquel vous êtes inscrit, sans demande d’argent ni d’identifiants, est normale.',
    explication: 'Recevoir des lettres d’information d’associations ou de marques auxquelles on s’est abonné est banal. Le signe rassurant : on ne vous presse pas, on ne réclame ni argent ni mot de passe, et vous pouvez vous désinscrire quand vous voulez.'
  },

  /* ---------- 18. Nouvelles de la famille (WhatsApp) — FIABLE ------- */
  {
    id: 'chat-famille-ok',
    canal: 'chat',
    plateforme: 'WhatsApp',
    contact: 'Sophie (ma fille)',
    avatar: '',
    messages: [
      { from: 'eux', texte: 'Coucou maman ! Voici les photos du spectacle de danse de Léa 💃 Elle était tellement fière 😍' },
      { from: 'eux', texte: 'On passe dimanche midi comme prévu ? Je ramène le dessert 🍰' }
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — nouvelles de la famille',
    indices: [
      'Contact connu et enregistré (le numéro habituel de votre fille).',
      'Contenu personnel et cohérent avec votre vie (le spectacle de Léa).',
      'Aucune demande d’argent, de code ni de virement.',
      'Aucun lien ni pièce jointe suspecte.'
    ],
    reflexe: 'Un proche, sur son numéro habituel, qui partage des nouvelles sans demander d’argent, c’est simplement… votre famille.',
    explication: 'Attention à ne pas confondre avec l’arnaque au faux proche, qui utilise un NOUVEAU numéro inconnu et demande de l’argent en urgence. Ici, c’est le numéro habituel et il n’y a aucune demande : le message est fiable.'
  },

  /* ---------- 19. Appel du secrétariat médical — FIABLE ------------- */
  {
    id: 'appel-medecin-ok',
    canal: 'appel',
    afficheur: 'Cabinet du Dr Martin',
    numero: 'appel du secrétariat médical',
    transcript: [
      { qui: 'lui', texte: 'Bonjour, secrétariat du Dr Martin. Je vous appelle pour confirmer votre rendez-vous de jeudi à 15h.' },
      { qui: 'vous', texte: 'Oui, tout à fait, je serai là.' },
      { qui: 'lui', texte: 'Parfait. Pensez à apporter votre carte Vitale. Bonne journée !' }
    ],
    verdict: 'fiable',
    categorie: 'Message légitime — confirmation de rendez-vous',
    indices: [
      'On confirme seulement un rendez-vous que vous connaissez déjà.',
      'Aucune demande de coordonnées bancaires ni de code.',
      'On vous demande votre carte Vitale sur place (normal), pas ses numéros au téléphone.',
      'Ton courtois, sans pression ni menace.'
    ],
    reflexe: 'Un vrai rendez-vous se confirme sans jamais réclamer vos codes ni votre carte bancaire au téléphone.',
    explication: 'Tous les appels ne sont pas des arnaques. Un secrétariat qui confirme un rendez-vous ne demande aucune information sensible. Si un « service » réclamait un paiement ou vos codes par téléphone, là il faudrait se méfier.'
  }

];

/* =========================================================================
   GLOSSAIRE — « Les mots à connaître »
   Accessible depuis le menu et en cliquant sur les mots pendant le jeu.
   aliases = toutes les formes reconnues dans les textes (repérage automatique).
   ========================================================================= */
const GLOSSAIRE = [
  { key:'hameconnage', terme:'Hameçonnage (phishing)',
    aliases:['hameçonnage','phishing'],
    def:'Technique où un escroc se fait passer pour un organisme de confiance (banque, poste, impôts…) pour vous pousser à cliquer sur un lien et à livrer vos informations (mot de passe, carte bancaire). « Phishing » est le mot anglais.' },
  { key:'smishing', terme:'Smishing',
    aliases:['smishing'],
    def:'Hameçonnage par SMS. Un faux message (colis, amende, banque) contient un lien piégé. Réflexe : ne pas cliquer, vérifier sur le site officiel, signaler au 33700.' },
  { key:'vishing', terme:'Vishing',
    aliases:['vishing'],
    def:'Hameçonnage par téléphone (appel vocal). L’escroc vous appelle en se faisant passer pour votre banque ou un service, et tente d’obtenir vos codes.' },
  { key:'spoofing', terme:'Spoofing (usurpation de numéro)',
    aliases:['spoofing'],
    def:'Falsification du numéro affiché sur votre téléphone. L’escroc fait apparaître le vrai numéro de votre banque alors que ce n’est pas elle. Le numéro affiché ne prouve donc jamais l’identité de l’appelant.' },
  { key:'deepfake', terme:'Deepfake (hypertrucage)',
    aliases:['deepfake','hypertrucage'],
    def:'Image, vidéo ou voix fabriquée par intelligence artificielle pour imiter une personne réelle. Sert à désinformer ou à arnaquer (fausse célébrité, fausse voix d’un proche).' },
  { key:'romance', terme:'Arnaque aux sentiments',
    aliases:['arnaque aux sentiments','arnaque aux sentiments / fausse célébrité'],
    def:'L’escroc crée une fausse relation amoureuse en ligne, gagne votre confiance pendant des semaines, puis invente un problème pour vous demander de l’argent. On parle aussi de « brouteur ».' },
  { key:'faux-conseiller', terme:'Faux conseiller bancaire',
    aliases:['faux conseiller bancaire','faux conseiller'],
    def:'Un escroc se fait passer pour votre banque (souvent par spoofing) et vous fait valider ou dicter des codes qui autorisent en réalité SES virements. Une banque ne demande jamais vos codes.' },
  { key:'faux-proche', terme:'Arnaque au faux proche',
    aliases:['arnaque au faux proche','faux proche','bonjour maman'],
    def:'Un message venu d’un numéro inconnu prétend être votre enfant (« j’ai changé de numéro ») et demande de l’argent en urgence. Toujours vérifier en appelant le proche sur son ancien numéro.' },
  { key:'faux-support', terme:'Faux support technique',
    aliases:['faux support technique','support technique'],
    def:'Une fenêtre ou un appel prétend que votre ordinateur est infecté et vous pousse à appeler un « technicien » qui prend le contrôle de la machine et vous soutire de l’argent. Un vrai éditeur ne fait jamais cela.' },
  { key:'usurpation', terme:'Usurpation d’identité',
    aliases:['usurpation d’identité','usurpation','usurpent','usurpe'],
    def:'Le fait, pour un escroc, de se faire passer pour une personne ou un organisme officiel (CAF, Assurance Maladie, une marque, un proche) afin de gagner votre confiance.' },
  { key:'carte-cadeau', terme:'Paiement en cartes cadeaux',
    aliases:['cartes cadeaux','carte cadeau','cartes-cadeaux'],
    def:'Moyen de paiement favori des escrocs : ils demandent d’acheter des cartes cadeaux (iTunes, Amazon…) et d’en communiquer les codes, car l’argent devient alors introuvable. Aucune administration ni entreprise sérieuse ne se fait payer ainsi.' },
  { key:'piece-jointe', terme:'Pièce jointe piégée',
    aliases:['pièce jointe piégée','pièce jointe'],
    def:'Un fichier joint à un e-mail (PDF, document) qui installe un virus ou un logiciel espion dès qu’on l’ouvre. N’ouvrez jamais une pièce jointe venue d’un expéditeur inconnu.' },
  { key:'code-unique', terme:'Code à usage unique (code SMS)',
    aliases:['code à usage unique','code reçu par sms','code de confirmation','code par sms'],
    def:'Chiffre envoyé par SMS pour valider une connexion ou un achat. Vous le SAISISSEZ vous-même sur le site officiel ; vous ne le DONNEZ jamais à quelqu’un qui vous le demande.' }
];

/* =========================================================================
   REPERES — éléments cliquables du message (phase d'entraînement au repérage)
   Après avoir choisi, le joueur clique sur les éléments qui justifient sa
   décision. bon:true = véritable indice (suspect pour une arnaque / rassurant
   pour un message fiable). bon:false = leurre qui attire l'œil sans être un signe.
   « texte » doit apparaître tel quel dans le message affiché ; '__IMG__' = l'image.
   ========================================================================= */
const REPERES = {
  'sms-colis': [
    { texte:'+33 7 45 13 81 31', bon:true, aide:'Un vrai transporteur (Chronopost, Colissimo…) vous écrirait-il depuis un simple numéro de portable ? Regardez qui envoie le message.', note:'Un vrai transporteur n’écrit pas depuis un numéro de portable personnel.' },
    { texte:'https://mon-relay-suivi.com', bon:true, aide:'Y a-t-il un lien à cliquer ? Est-ce vraiment l’adresse officielle du transporteur ?', note:'Ce n’est pas l’adresse officielle du transporteur : lien piégé.' },
    { texte:'sinon il sera renvoyé', bon:true, aide:'Cherchez la phrase qui vous met la pression pour agir tout de suite.', note:'Fausse urgence : on vous presse pour vous faire cliquer sans réfléchir.' },
    { texte:'3e095272b3fe4c7996b', bon:false, note:'Impressionnant, mais c’est du décor : une suite de caractères pour faire « officiel ».' }
  ],
  'sms-colis-photo-ia': [
    { texte:'+33 6 12 44 90 08', bon:true, aide:'Un vrai transporteur (La Poste, Chronopost, Mondial Relay…) vous écrirait-il depuis un simple numéro de portable ? Regardez qui envoie le message.', note:'Un vrai transporteur n’écrit pas depuis un numéro de portable personnel.' },
    { texte:'__IMG__', bon:true, aide:'Cette photo prouve-t-elle vraiment que le colis existe ? Votre nom sur l’étiquette est-il difficile à obtenir ? Cliquez sur la photo.', note:'Photo générée par IA : votre nom sur une étiquette se fabrique en quelques secondes. Une image ne prouve jamais qu’un colis existe.' },
    { texte:'1,95 € de relivraison', bon:true, aide:'Un transporteur se fait-il payer quelques euros par SMS ? Cherchez la demande d’argent.', note:'Aucun transporteur ne réclame de « frais de relivraison » par SMS : c’est le piège pour voler votre carte.' },
    { texte:'https://suivi-colis-relais.net', bon:true, aide:'Est-ce vraiment l’adresse officielle du transporteur ? Regardez le lien.', note:'Ce n’est pas le site officiel du transporteur : lien piégé.' },
    { texte:'centre de tri', bon:false, note:'« Centre de tri » fait très officiel… mais ce n’est que du décor ajouté sous la fausse photo.' }
  ],
  'email-motdepasse': [
    { texte:'ne-pas-repondre@chronopost.fr', bon:true, aide:'Le message dit « Microsoft »… mais regardez l’adresse e-mail complète de l’expéditeur : est-elle cohérente ?', note:'Le nom affiché dit « Microsoft », mais l’adresse finit par @chronopost.fr : ça ne colle pas.' },
    { texte:'sous 24h', bon:true, aide:'Cherchez un délai qui vous oblige à vous dépêcher.', note:'Urgence artificielle : « agissez sous 24h ».' },
    { texte:'suspension de votre compte', bon:true, aide:'Repérez la menace censée vous faire peur.', note:'On vous fait peur avec une menace de suspension.' },
    { texte:'que vous n’avez pas Utiliser', bon:true, aide:'Un grand service écrit-il sans fautes ? Cherchez une tournure ou une majuscule qui sonne faux.', note:'Faute et tournure maladroite : un vrai service ne s’exprime pas ainsi.' }
  ],
  'email-boite-mystere': [
    { texte:'noreply.LE.04@b8.9a.21.eb', bon:true, aide:'Regardez l’adresse de l’expéditeur : ressemble-t-elle à une vraie adresse d’entreprise ?', note:'Adresse d’expéditeur incompréhensible : signe d’arnaque.' },
    { texte:'Gagné Une Boîte-mystère', bon:true, aide:'Avez-vous vraiment participé à un jeu ? Cherchez le « cadeau » que vous n’avez jamais demandé.', note:'Un « cadeau » que vous n’avez jamais demandé : c’est un appât.' },
    { texte:'-VeuiLLez.ConFirmer La-Reception!!-', bon:true, aide:'Cherchez le texte à la mise en forme cassée (majuscules et tirets au milieu des mots).', note:'Mise en forme cassée (majuscules, tirets) pour tromper les filtres anti-spam.' },
    { texte:'NQLRF.pdf', bon:true, aide:'Y a-t-il un fichier joint que vous n’attendiez pas ?', note:'Pièce jointe inconnue : ne jamais l’ouvrir, elle peut contenir un virus.' }
  ],
  'email-panneaux': [
    { texte:'charlotte.robert@shikisc.com', bon:true, aide:'Un organisme public écrirait-il depuis cette adresse ? Regardez l’expéditeur.', note:'Adresse d’entreprise fantaisiste, sans lien avec un organisme public.' },
    { texte:'Dernière chance', bon:true, aide:'Cherchez la formule qui vous pousse à agir sans réfléchir.', note:'Pression : « dernière chance » pour vous faire agir vite.' },
    { texte:'01-01-2025', bon:true, aide:'Regardez bien la date : est-elle cohérente, ou déjà passée ?', note:'Date d’aide déjà dépassée : incohérence révélatrice.' },
    { texte:'ne pourront pas faire face', bon:true, aide:'Cherchez ce qui laisse croire qu’il faut se dépêcher avant qu’il ne reste plus rien.', note:'Rareté artificielle pour créer l’urgence.' }
  ],
  'chat-celebrite': [
    { texte:'Brad Pitt (Officiel) ✔', bon:true, aide:'Pensez-vous qu’une star du cinéma vous contacterait vraiment en privé pour vous parler ? Regardez qui écrit.', note:'Une célébrité ne vous contacte pas en privé : profil usurpé.' },
    { texte:'850 € en cartes cadeaux', bon:true, aide:'Que vous demande-t-on d’envoyer ? Est-ce une façon normale de payer ?', note:'Demande d’argent en cartes cadeaux : intraçable, réflexe d’arnaque absolu.' },
    { texte:'garde notre relation secrète', bon:true, aide:'Cherchez la phrase qui vous demande de n’en parler à personne.', note:'Le secret imposé sert à vous isoler.' },
    { texte:'Tu es la seule qui me comprend', bon:false, note:'C’est touchant… et calculé : la flatterie sert à mettre en confiance.' }
  ],
  'appel-banque': [
    { texte:'01 40 XX XX XX (n° de votre agence)', bon:true, aide:'Le numéro qui s’affiche prouve-t-il vraiment que c’est votre banque ? Un numéro peut-il être imité ?', note:'Le numéro affiché peut être falsifié (spoofing) : il ne prouve rien.' },
    { texte:'virement suspect de 1 290 €', bon:true, aide:'Cherchez ce qui doit vous faire paniquer tout de suite.', note:'Fausse urgence pour vous faire paniquer.' },
    { texte:'donnez-le-moi', bon:true, aide:'Que vous demande-t-on de communiquer ? Une banque réclame-t-elle un code reçu par SMS ?', note:'On vous demande un code reçu par SMS : une banque ne fait JAMAIS ça.' },
    { texte:'confirmez votre mot de passe', bon:true, aide:'Un vrai conseiller vous demanderait-il votre mot de passe ?', note:'Jamais un vrai conseiller ne demande votre mot de passe.' }
  ],
  'chat-faux-proche': [
    { texte:'+33 6 51 20 84 77', bon:true, aide:'Ce numéro est-il bien celui, enregistré, de votre proche ? Regardez d’où vient le message.', note:'Numéro inconnu qui prétend être votre enfant.' },
    { texte:'voici mon nouveau numéro', bon:true, aide:'Cherchez l’excuse donnée pour expliquer ce numéro inconnu.', note:'« J’ai changé de numéro » : l’excuse classique du faux proche.' },
    { texte:'plus accès à mon appli bancaire', bon:true, aide:'Pourquoi ne peut-il pas payer lui-même ? Cherchez le prétexte.', note:'Prétexte pour justifier de ne pas payer lui-même.' },
    { texte:'virement de 680 €', bon:true, aide:'Que vous demande-t-on de faire en urgence ?', note:'Demande d’argent urgente : vérifiez en appelant le vrai numéro.' }
  ],
  'image-deepfake': [
    { texte:'__IMG__', bon:true, aide:'Regardez l’image de près : les mains, les visages, l’arrière-plan vous paraissent-ils naturels ? Cliquez dessus.', note:'Zoomez : mains ou visages déformés, arrière-plan « lisse »… signes d’une image générée par IA.' },
    { texte:'Regardez ce qu’on nous cache', bon:true, aide:'Cherchez la phrase qui joue sur l’émotion pour vous faire réagir.', note:'Formule sensationnaliste qui joue sur l’émotion.' },
    { texte:'Partagé 48 000 fois', bon:false, note:'Le nombre de partages ne prouve rien : le faux se propage très vite.' }
  ],
  'sms-ameli': [
    { texte:'carte Vitale expire', bon:true, aide:'Une carte Vitale « expire »-t-elle vraiment au point de bloquer vos remboursements ? Cherchez cette affirmation.', note:'La carte Vitale n’a pas de date qui « suspend » les remboursements : fausse info.' },
    { texte:'remboursements seront suspendus', bon:true, aide:'Cherchez la menace censée vous faire peur.', note:'Menace pour vous faire agir dans la panique.' },
    { texte:'http://ameli-mise-a-jour.info-fr.net', bon:true, aide:'Le vrai site de l’Assurance Maladie, c’est ameli.fr. Cette adresse lui ressemble-t-elle vraiment ?', note:'Le vrai site est ameli.fr — cette adresse est trompeuse.' },
    { texte:'AMELI-INFO', bon:false, note:'Un nom d’expéditeur se falsifie facilement : il ne garantit rien.' }
  ],
  'popup-support': [
    { texte:'5 virus détectés', bon:true, aide:'Cherchez l’alerte spectaculaire censée vous effrayer.', note:'Fausse alerte spectaculaire pour vous effrayer.' },
    { texte:'N’éteignez pas l’ordinateur', bon:true, aide:'Cherchez la consigne qui vous empêche de réfléchir ou de demander de l’aide.', note:'On vous empêche de réfléchir ou de demander de l’aide.' },
    { texte:'support Microsoft : 01 84 88 XX XX', bon:true, aide:'Un antivirus vous demanderait-il d’appeler un numéro de téléphone ?', note:'Un vrai antivirus ne demande jamais d’appeler un numéro.' },
    { texte:'données bancaires sont en danger', bon:false, note:'Phrase choc… mais c’est justement l’appât : ne cédez pas à la peur.' }
  ],
  'chat-emploi': [
    { texte:'Recrutement Amazon (RH)', bon:true, aide:'Une grande entreprise recrute-t-elle vraiment par messagerie ? Regardez qui vous écrit.', note:'Une grande marque ne recrute pas par WhatsApp.' },
    { texte:'80 à 300 € par jour', bon:true, aide:'Ce salaire est-il réaliste pour quelques minutes de travail, sans expérience ?', note:'Salaire irréaliste pour « 30 min par jour, sans expérience ».' },
    { texte:'rechargez 40 €', bon:true, aide:'On vous demande de payer pour travailler : est-ce normal ? Cherchez cette demande.', note:'On vous demande de payer pour travailler : signal d’alarme absolu.' },
    { texte:'aucune expérience requise', bon:false, note:'Ça met en confiance, mais ce n’est pas en soi la preuve d’une arnaque.' }
  ],
  'sms-banque-ok': [
    { texte:'Appelez le numéro figurant au dos de votre carte', bon:true, aide:'Cherchez ce qui vous renvoie vers un moyen sûr, que vous contrôlez vous-même.', note:'On vous renvoie vers un canal officiel que VOUS maîtrisez.' },
    { texte:'Nous ne vous demanderons jamais vos codes', bon:true, aide:'Cherchez la phrase qui promet de ne jamais réclamer vos codes.', note:'Une vraie banque le rappelle : elle ne demande jamais vos codes.' },
    { texte:'54,90 € chez FNAC', bon:false, note:'C’est juste l’info de l’achat : ni bon ni mauvais signe en soi.' }
  ],
  'notif-connexion-ok': [
    { texte:'Compte Google', bon:true, aide:'D’où vient cette notification ? Cherchez ce qui montre qu’elle vient de l’application officielle.', note:'La notification provient de l’application officielle.' },
    { texte:'aucune action n’est nécessaire', bon:true, aide:'Cherchez la phrase qui montre qu’il n’y a rien à faire en urgence.', note:'Ton informatif, sans menace : rien à faire en urgence.' },
    { texte:'depuis l’application Google, rubrique Sécurité', bon:true, aide:'Cherchez ce qui vous renvoie vers l’appli officielle plutôt que vers un lien à cliquer.', note:'On vous renvoie vers l’appli officielle, pas vers un lien à cliquer.' }
  ],
  'chat-ami-ok': [
    { texte:'Jacqueline (voisine)', bon:true, aide:'Regardez qui écrit : est-ce un contact que vous connaissez et avez enregistré ?', note:'Contact connu et enregistré : c’est bien votre voisine.' },
    { texte:'le café demain 15h', bon:true, aide:'Cherchez ce qui correspond à votre vie de tous les jours.', note:'Un rendez-vous cohérent avec votre vie réelle.' },
    { texte:'N’apporte rien, juste toi', bon:true, aide:'Vous demande-t-on de l’argent ou des informations ? Cherchez ce qui prouve que non.', note:'Aucune demande d’argent ni d’information : tout va bien.' }
  ],
  'sms-code-ok': [
    { texte:'Ne le communiquez jamais à personne', bon:true, aide:'Cherchez le rappel de sécurité tout à fait normal au sujet de ce code.', note:'Rappel de sécurité normal : le code ne se donne pas.' },
    { texte:'valable 5 minutes', bon:true, aide:'Cherchez le détail technique habituel d’un vrai code de connexion.', note:'Détail technique habituel d’un vrai code de connexion.' },
    { texte:'483 920', bon:false, note:'Le code lui-même n’est pas un indice : ce qui compte, c’est de ne jamais le donner.' }
  ],
  'notif-virement-ok': [
    { texte:'Ma Banque', bon:true, aide:'D’où vient cette notification ? Cherchez ce qui montre qu’elle vient de votre appli bancaire.', note:'Notification issue de votre application bancaire.' },
    { texte:'Solde consultable dans votre application', bon:true, aide:'Cherchez ce qui vous renvoie à l’appli, sans lien ni urgence.', note:'On vous renvoie à l’appli, sans lien ni action urgente.' },
    { texte:'Paul Durand', bon:false, note:'Le nom de l’émetteur est une simple info, pas un indice.' }
  ],
  'email-newsletter-ok': [
    { texte:'contact@restosducoeur.org', bon:true, aide:'Regardez l’adresse de l’expéditeur : est-elle cohérente avec l’organisme ?', note:'Adresse cohérente avec l’organisme : bon signe.' },
    { texte:'vous désinscrire à tout moment', bon:true, aide:'Cherchez le lien de désinscription clair, comme la loi l’exige.', note:'Lien de désinscription clair, comme l’exige la loi.' },
    { texte:'Merci de votre fidélité', bon:false, note:'Formule de politesse : agréable, mais pas un indice.' }
  ],
  'chat-famille-ok': [
    { texte:'Sophie (ma fille)', bon:true, aide:'Regardez qui écrit : est-ce bien son numéro habituel, déjà enregistré ?', note:'Contact connu, sur son numéro habituel.' },
    { texte:'spectacle de danse de Léa', bon:true, aide:'Cherchez le détail personnel qui colle à votre vie de famille.', note:'Contenu personnel cohérent avec votre vie.' },
    { texte:'comme prévu', bon:true, aide:'Cherchez ce qui montre qu’on parle d’un projet déjà convenu ensemble.', note:'Se réfère à un projet réel déjà convenu : rien d’anormal.' }
  ],
  'appel-medecin-ok': [
    { texte:'Cabinet du Dr Martin', bon:true, aide:'Cherchez ce qui identifie clairement la personne qui appelle.', note:'Interlocuteur clairement identifié.' },
    { texte:'confirmer votre rendez-vous', bon:true, aide:'Cherchez ce qui montre qu’on confirme seulement un rendez-vous que vous connaissez.', note:'On confirme seulement un rendez-vous que vous connaissez.' },
    { texte:'apporter votre carte Vitale', bon:true, aide:'Vous demande-t-on des numéros au téléphone, ou juste de la présenter sur place ?', note:'On la présente sur place — on ne demande pas ses numéros au téléphone.' }
  ]
};

/* Rendu accessible partout */
if (typeof window !== 'undefined'){
  window.SCENARIOS = SCENARIOS;
  window.GLOSSAIRE = GLOSSAIRE;
  window.REPERES = REPERES;
}
