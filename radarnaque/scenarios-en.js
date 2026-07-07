/* RADAR ANTI-SCAMS — Scenario bank (English translation) */

const SCENARIOS = [
  {
    "id": "sms-colis",
    "canal": "sms",
    "entete": "SMS received this morning from an unknown number",
    "expediteur": "+33 7 45 13 81 31",
    "messages": [
      "Hello, your parcel did not fit in the mailbox. Act before 09/01 or it will be returned: https://mon-relay-suivi.com",
      "3e095272b3fe4c7996b"
    ],
    "verdict": "arnaque",
    "categorie": "SMS phishing (“smishing”) — fake parcel",
    "indices": [
      "Personal mobile number (+33 7…): a real carrier does not text from a 06/07 number.",
      "Suspicious link “mon-relay-suivi.com”: this is not the real Mondial Relay / La Poste website.",
      "Pressure with a deadline (“before 09/01, or returned”).",
      "Random string of characters used to look “official”."
    ],
    "reflexe": "Not expecting a parcel? Do not click the link. Check through the carrier’s official app or website.",
    "explication": "This is the most common scam in France. The link leads to a fake site asking for a small “fee” to steal your bank card, then scammers may call pretending to be your bank. Report the SMS by forwarding it to 33700."
  },
  {
    "id": "email-motdepasse",
    "canal": "email",
    "entete": "Email received in your inbox",
    "de": "Microsoft Security Team",
    "deAdresse": "ne-pas-repondre@chronopost.fr",
    "objet": "Security alert: new password request",
    "date": "Today, 09:14",
    "corps": "Hi, antoninatger:<br><br>We received a request to set a new password for your account from a device or location you do not usually use. Was this you?<br><br>Confirm your identity within 24 hours to avoid your account being suspended.",
    "bouton": "Yes, it was me — confirm",
    "verdict": "arnaque",
    "categorie": "Email phishing — fake account security alert",
    "indices": [
      "The sender says “Microsoft” but the email address ends in @chronopost.fr: it does not match.",
      "Awkward wording and language mistakes.",
      "Fear and urgency: “account suspended” and “within 24 hours”.",
      "The button leads to a fake page that steals your login and password."
    ],
    "reflexe": "Always check the sender’s full email address, not just the displayed name. Name ≠ address.",
    "explication": "Scammers display a reassuring name but the real email address gives them away. If in doubt, never use the email button: open the official website yourself in your browser."
  },
  {
    "id": "email-boite-mystere",
    "canal": "email",
    "entete": "Email with an attachment",
    "de": "SHIPPING_CONFIRMATION#",
    "deAdresse": "noreply.LE.04@b8.9a.21.eb",
    "objet": "_YouHave-Won A TEMU--Mystery Box",
    "date": "Sun. 02/02, 17:59",
    "corps": "Congratulations!<br><br>-PLeaSe.ConfIrM Receipt!!-<br><br>Open the attachment to claim your gift before it expires.",
    "piecesJointes": [
      "NQLRF.pdf"
    ],
    "verdict": "arnaque",
    "categorie": "Fake prize / gift — malicious attachment",
    "indices": [
      "Unreadable sender address (noreply.LE.04@b8.9a.21.eb).",
      "Text full of strange capital letters, dashes and mistakes to bypass spam filters.",
      "A “gift” you never entered to win: nobody gives things away for free.",
      "Unknown PDF attachment: never open it, it may install malware."
    ],
    "reflexe": "A prize from a contest you never entered is always a trap. Do not open the attachment; delete it.",
    "explication": "Broken formatting is often deliberate: it helps bypass anti-spam filters. The attachment may install spyware or lead to a page asking for bank details for fake delivery fees."
  },
  {
    "id": "email-panneaux",
    "canal": "email",
    "entete": "Email about government aid",
    "de": "Charlotte Robert",
    "deAdresse": "charlotte.robert@shikisc.com",
    "objet": "Last chance: solar panel grants in your area",
    "date": "Mon. 03/02, 10:58",
    "corps": "Specialists in <b>solar panel installations</b> will be in your region from February 14 to March 14.<br><br>Their goal: provide personalised quotes and information about government grants, valid until 01-01-2025.<br><br>Our teams will not be able to handle every request, so you are advised to <u>sign up today</u> so you do not miss this opportunity.",
    "bouton": "Claim the grants",
    "verdict": "arnaque",
    "categorie": "Fake “energy renovation / government grants” canvassing",
    "indices": [
      "Fantasy company address (@shikisc.com), not linked to a public body.",
      "A grant deadline that has already passed (01-01-2025).",
      "Artificial scarcity: “our teams cannot handle every request”, “last chance”.",
      "The state does not email you to sell work on your home."
    ],
    "reflexe": "Public grants are not claimed by clicking an unsolicited email. Use the official France Rénov’ website or phone number.",
    "explication": "Scammers exploit topics such as insulation, heat pumps and solar panels to collect data, book appointments and push overpriced or non-existent work."
  },
  {
    "id": "chat-celebrite",
    "canal": "chat",
    "plateforme": "Messenger",
    "contact": "Brad Pitt (Official) ✔",
    "avatar": "img/celebrite-roses.jpg",
    "messages": [
      {
        "from": "eux",
        "texte": "Hello my darling ❤️ I think about you every day. You are the only one who truly understands me."
      },
      {
        "from": "eux",
        "texte": "My team is keeping our relationship secret because of the media. I will come to France soon for you."
      },
      {
        "from": "eux",
        "texte": "I have a small problem: my accounts are blocked by production. Can you advance me €850 in gift cards? I will pay you back when I arrive. 🌹"
      }
    ],
    "verdict": "arnaque",
    "categorie": "Romance scam / fake celebrity",
    "indices": [
      "A celebrity privately messaging you and falling in love within a few messages: impossible.",
      "Enforced secrecy isolates the victim.",
      "The request for money always arrives — often in untraceable gift cards.",
      "A photo proves nothing: it may be real, stolen, or AI-generated."
    ],
    "reflexe": "Whenever an online “love interest” asks for money, it is a scam. No exception.",
    "explication": "Victims have lost tens of thousands of euros to fake celebrities. Scammers build affection over time, then invent an emergency requiring money."
  },
  {
    "id": "appel-banque",
    "canal": "appel",
    "afficheur": "Your bank",
    "numero": "displayed call: 01 40 XX XX XX (your branch number)",
    "transcript": [
      {
        "qui": "lui",
        "texte": "Hello, fraud prevention department of your bank. We see a suspicious transfer of €1,290 to a foreign account. Was that you?"
      },
      {
        "qui": "vous",
        "texte": "No, not at all!"
      },
      {
        "qui": "lui",
        "texte": "Don’t worry, I’ll block it right away. To cancel it, I’m sending you a code by SMS: give it to me, and confirm your app password."
      }
    ],
    "verdict": "arnaque",
    "categorie": "Fake bank adviser (“number spoofing”)",
    "indices": [
      "The displayed number may be your bank’s number, but it can be spoofed.",
      "A fake emergency makes you panic.",
      "You are asked for an SMS code or password: a bank NEVER asks for this.",
      "Giving the code actually validates the scammers’ transfer."
    ],
    "reflexe": "A real adviser never asks for your codes or passwords. Hang up, then call the number on the back of your card.",
    "explication": "This scam is very costly. The scammer may display your bank’s number and know details about you. Do not validate anything or dictate any code."
  },
  {
    "id": "chat-faux-proche",
    "canal": "chat",
    "plateforme": "WhatsApp",
    "contact": "+33 6 51 20 84 77",
    "avatar": "",
    "messages": [
      {
        "from": "eux",
        "texte": "Hi mum, it’s me 😊 I broke my phone, this is my new number. Save it."
      },
      {
        "from": "eux",
        "texte": "So I can’t access my banking app until tomorrow…"
      },
      {
        "from": "eux",
        "texte": "Can you help me with a €680 transfer for an urgent bill? I’ll pay you back as soon as my account works again. Thanks mum ❤️"
      }
    ],
    "verdict": "arnaque",
    "categorie": "Fake relative scam (“Hi mum”)",
    "indices": [
      "Unknown new number claiming to be your child.",
      "Classic excuse: broken phone + banking app blocked “until tomorrow”.",
      "Urgent money request.",
      "They avoid voice contact to avoid being exposed."
    ],
    "reflexe": "Call your relative on their OLD number to check. Never transfer money based only on a message.",
    "explication": "The scammer pretends to be a child or grandchild in distress. Ask a question only the real person would know, or call them directly."
  },
  {
    "id": "image-deepfake",
    "canal": "image",
    "image": "img/deepfake-arrestation.jpg",
    "legende": "“Look what they are hiding from us! A leader arrested in the street.” — Shared 48,000 times",
    "verdict": "arnaque",
    "categorie": "AI-generated image (“deepfake”) / hoax",
    "indices": [
      "Abnormal details: distorted hands, extra fingers, smooth faces or blurry background.",
      "No serious media outlet reports it.",
      "The caption plays on emotion and sensationalism.",
      "An image alone proves nothing: it can be made in seconds."
    ],
    "reflexe": "Before believing or sharing a shocking image, check known sources. Zoom in on hands and details.",
    "explication": "AI images can manipulate opinion, create buzz or lure people to fraudulent sites. If the event appears nowhere else, it is probably false."
  },
  {
    "id": "sms-ameli",
    "canal": "sms",
    "entete": "SMS received this afternoon",
    "expediteur": "AMELI-INFO",
    "messages": [
      "Health Insurance: your Vitale card expires on 15/07. Without an update, your reimbursements will be suspended. Update here: http://ameli-mise-a-jour.info-fr.net"
    ],
    "verdict": "arnaque",
    "categorie": "Public service impersonation (Health Insurance)",
    "indices": [
      "The Vitale card does not have an expiry date that suspends reimbursements.",
      "Misleading link: the real site is ameli.fr, not “ameli-mise-a-jour.info-fr.net”.",
      "Threat + urgency: “reimbursements suspended”.",
      "A public service never asks for bank details by SMS."
    ],
    "reflexe": "A real official site ends with a known official domain such as ameli.fr or impots.gouv.fr. Type the address yourself.",
    "explication": "Scammers impersonate public bodies to steal your social security number and bank card. Official reimbursements are automatic."
  },
  {
    "id": "popup-support",
    "canal": "notif",
    "app": "Security alert",
    "appIcon": "⚠️",
    "fond": "alerte",
    "titre": "YOUR COMPUTER IS INFECTED (5 viruses detected)",
    "texte": "Your passwords and banking data are at risk. Do not turn off the computer. Call Microsoft support immediately: 01 84 88 XX XX.",
    "verdict": "arnaque",
    "categorie": "Fake tech support (“your PC is infected”)",
    "indices": [
      "A real antivirus alert never asks you to call a phone number.",
      "Panic + “do not turn off” prevents you from thinking.",
      "Microsoft support does not monitor your screen or call you.",
      "The goal is remote access to your computer and money."
    ],
    "reflexe": "Never call the displayed number. Close the window or shut down, then ask someone trusted to check the computer.",
    "explication": "If you call, a fake technician asks you to install remote-control software and charges you for a fake repair — or empties your accounts."
  },
  {
    "id": "chat-emploi",
    "canal": "chat",
    "plateforme": "WhatsApp",
    "contact": "Amazon Recruitment (HR)",
    "avatar": "",
    "messages": [
      {
        "from": "eux",
        "texte": "Hello! We are hiring home operators. 30 min/day, €80 to €300 per day, no experience required. Interested?"
      },
      {
        "from": "eux",
        "texte": "You just need to validate orders on our platform. To start, create your account and top up €40, which will be returned with your earnings."
      }
    ],
    "verdict": "arnaque",
    "categorie": "Fake job offer / “task scam”",
    "indices": [
      "Unrealistic pay for “no experience, 30 minutes a day”.",
      "Recruitment by WhatsApp using a major brand name.",
      "You are asked to top up or pay money to start: absolute red flag.",
      "Small early “earnings” are used to make you pay more."
    ],
    "reflexe": "A real job pays you; it never asks you to pay to work. Refuse any required “top-up”.",
    "explication": "These fake missions seem to pay at first, then require growing deposits you never recover."
  },
  {
    "id": "sms-colis-photo-ia",
    "canal": "sms",
    "entete": "SMS received this morning, with an attached photo",
    "expediteur": "+33 6 12 44 90 08",
    "messages": [
      "Hello, your parcel is blocked at our centre: your address is incomplete. Here is a photo of your waiting package 👇",
      {
        "photo": true,
        "nom": "Mrs Martine DUPONT",
        "legende": "Parcel waiting · sorting centre"
      },
      "Confirm your address and pay €1.95 for redelivery here: https://suivi-colis-relais.net"
    ],
    "verdict": "arnaque",
    "categorie": "New-generation fake parcel — AI-generated photo",
    "indices": [
      "SMS from a mobile number (+33 6…): real carriers do not text from 06/07 numbers.",
      "The “photo of the parcel” with your name can be generated by AI in seconds.",
      "Small “redelivery fee” requested by SMS: no carrier charges like this.",
      "The link is not the carrier’s official site."
    ],
    "reflexe": "A photo, even with your name on it, proves nothing. Do not click; check official tracking.",
    "explication": "Scammers add an AI-generated realistic parcel photo to make the scam more convincing. The goal remains to steal your bank card."
  },
  {
    "id": "chat-faux-numero-invest",
    "canal": "chat",
    "plateforme": "SMS",
    "contact": "+33 6 44 71 20 96",
    "avatar": "",
    "messages": [
      {
        "from": "eux",
        "texte": "Hello Julien! I confirm the table for 6 people on Saturday at 8 p.m. at Le Jardin restaurant?"
      },
      {
        "from": "eux",
        "texte": "Oh, sorry, wrong number 😅 Have a lovely day anyway!"
      },
      {
        "from": "eux",
        "texte": "Hello again 🙂 It was nice chatting the other day; polite people are rare now. I’m Léa, I split my life between Paris and Singapore for my finance work."
      },
      {
        "from": "eux",
        "texte": "Thanks to my uncle’s trading platform, I made 32% in three weeks. I can guide you step by step; we start with only €250 and you’ll see the first gains immediately 📈"
      }
    ],
    "verdict": "arnaque",
    "categorie": "Wrong-number scam leading to fake investment",
    "indices": [
      "A supposed wrong-number message from a stranger who keeps talking.",
      "The person becomes friendly and patient to build trust.",
      "They eventually promote a “miracle” investment with fast gains.",
      "They push you to place money on a platform they choose: the displayed gains are fake."
    ],
    "reflexe": "A stranger who wrote “by mistake” and then talks about money or investments: cut it short.",
    "explication": "This is “pig butchering”: the scammer builds trust, then pushes the victim into a fake crypto/trading platform. Withdrawal becomes impossible."
  },
  {
    "id": "email-airbnb-horsplateforme",
    "canal": "email",
    "entete": "Email after contacting a holiday rental host",
    "de": "Marco — Sea-view apartment",
    "deAdresse": "marco.rivas.locations@gmail.com",
    "objet": "Re: Your stay — let’s pay directly, it’s easier 😊",
    "date": "Thu. 12/06, 21:47",
    "corps": "Hello,<br><br>Thank you for your interest! My apartment is in high demand and <b>two other families</b> want it for your dates. To avoid platform service fees, I suggest paying <b>directly between us</b>: pay a 40% deposit by bank transfer and I will block the accommodation in your name today.<br><br>My bank details are attached. Please hurry, I cannot hold the dates for long!",
    "piecesJointes": [
      "RIB_Marco.pdf"
    ],
    "verdict": "arnaque",
    "categorie": "Fake holiday rental — off-platform payment",
    "indices": [
      "You are asked to pay OUTSIDE the booking platform: you lose protection.",
      "Bank transfer directly to a private person is hard to recover.",
      "Gmail address and attached bank details: nothing goes through the official booking site.",
      "Artificial urgency and scarcity: “two other families”, “hurry”."
    ],
    "reflexe": "Never pay for a rental outside the booking platform. Payment must happen on the official site.",
    "explication": "The property often does not exist or does not belong to the scammer. Leaving the platform removes refund and dispute protections."
  },
  {
    "id": "sms-banque-ok",
    "canal": "sms",
    "entete": "SMS from your bank",
    "expediteur": "CIC",
    "messages": [
      "A transaction of €54.90 at FNAC has been debited from your card. Do you not recognise it? Call the number on the back of your card. We will never ask for your codes."
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — purchase alert",
    "indices": [
      "No link to click and no attachment.",
      "It sends you to the number on the back of YOUR card.",
      "The bank explicitly says it will never ask for your codes.",
      "No excessive threat or urgency: just information."
    ],
    "reflexe": "A reliable message does not ask for a code, password or click. It lets you use an official channel.",
    "explication": "Even with a real message, never call a number given inside a suspicious SMS. Use the official number. Here, everything is coherent."
  },
  {
    "id": "notif-connexion-ok",
    "canal": "notif",
    "app": "Google Account",
    "appIcon": "🔐",
    "fond": "info",
    "titre": "New sign-in on Windows",
    "texte": "A device signed in to your account. If this was you, no action is needed. Otherwise, secure your account from the Google app, Security section.",
    "verdict": "fiable",
    "categorie": "Legitimate message — sign-in notification",
    "indices": [
      "No urgent link or button to click.",
      "You are invited to act from the official app, not through a message link.",
      "“If this was you, no action is needed”: informative tone.",
      "No password or bank details requested."
    ],
    "reflexe": "A real notification sends you to the official app/site that you open yourself — not an urgent link.",
    "explication": "Real sign-in alerts exist and are useful. The reflex stays the same: open the app yourself to check."
  },
  {
    "id": "chat-ami-ok",
    "canal": "chat",
    "plateforme": "SMS",
    "contact": "Jacqueline (neighbour)",
    "avatar": "",
    "messages": [
      {
        "from": "eux",
        "texte": "Hello! Still OK for coffee tomorrow at 3 p.m. at my place?"
      },
      {
        "from": "eux",
        "texte": "I made an apple pie 🥧 Bring nothing, just yourself!"
      }
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — normal conversation",
    "indices": [
      "Known saved contact, usual tone.",
      "No request for money, code or personal information.",
      "No link, no urgency, no threat.",
      "Content matches your real life."
    ],
    "reflexe": "Not everything is a scam. A message from a known contact with no money request or link is normal.",
    "explication": "Being cautious does not mean distrusting everyone. Real exchanges do not contain urgent money requests or trapped links."
  },
  {
    "id": "sms-code-ok",
    "canal": "sms",
    "entete": "SMS received just after clicking “Sign in” on your bank’s website",
    "expediteur": "CIC",
    "messages": [
      "Your login code is 483 920. It is valid for 5 minutes. Never share it with anyone, not even an adviser."
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — one-time code YOU requested",
    "indices": [
      "You just asked to sign in: the code is expected.",
      "No link to click, no attachment.",
      "The message reminds you never to share the code.",
      "No abnormal threat or urgency."
    ],
    "reflexe": "You never GIVE an SMS code to anyone: you type it yourself on the official site.",
    "explication": "One-time codes are normal when YOU are logging in. The danger starts if someone calls and asks you to dictate it."
  },
  {
    "id": "notif-virement-ok",
    "canal": "notif",
    "app": "My Bank",
    "appIcon": "🏦",
    "fond": "info",
    "titre": "Transfer received: +€200.00",
    "texte": "You received a transfer of €200.00 from “Paul Durand”. Balance available in your app.",
    "verdict": "fiable",
    "categorie": "Legitimate message — bank notification",
    "indices": [
      "Simple information about a transaction, nothing to do.",
      "No link, code or password requested.",
      "The notification comes from the banking app on your phone.",
      "No urgency or threat."
    ],
    "reflexe": "A real notification informs you; it does not ask you to act urgently or enter codes.",
    "explication": "Bank apps send this kind of notification. If in doubt, open the app yourself."
  },
  {
    "id": "email-newsletter-ok",
    "canal": "email",
    "entete": "Email from an association you subscribed to",
    "de": "Les Restos du Cœur",
    "deAdresse": "contact@restosducoeur.org",
    "objet": "Your January newsletter",
    "date": "Tue. 07/01, 08:30",
    "corps": "Hello,<br><br>Thank you for your loyalty. Discover our actions near you this month and the progress of our collections.<br><br>Happy reading, and thank you again for your support.<br><br><span style=\"color:#64748b;font-size:.85em\">You receive this message because you subscribed to our newsletter. You can unsubscribe at any time.</span>",
    "verdict": "fiable",
    "categorie": "Legitimate message — newsletter",
    "indices": [
      "Sender address matches the organisation (restosducoeur.org).",
      "No immediate request for money, code or bank details.",
      "Informative tone, no threat or urgency.",
      "Clear unsubscribe option, as required by law."
    ],
    "reflexe": "A newsletter from an organisation you subscribed to, with no money or password request, is normal.",
    "explication": "Newsletters from organisations or brands are common. A reassuring sign: no pressure, no passwords, and you can unsubscribe."
  },
  {
    "id": "chat-famille-ok",
    "canal": "chat",
    "plateforme": "WhatsApp",
    "contact": "Sophie (my daughter)",
    "avatar": "",
    "messages": [
      {
        "from": "eux",
        "texte": "Hi mum! Here are the photos from Léa’s dance show 💃 She was so proud 😍"
      },
      {
        "from": "eux",
        "texte": "Are we still coming on Sunday lunchtime as planned? I’ll bring dessert 🍰"
      }
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — family news",
    "indices": [
      "Known contact, usual number.",
      "Personal content consistent with your life.",
      "No request for money, code or transfer.",
      "No suspicious link or attachment."
    ],
    "reflexe": "A loved one on their usual number sharing news without asking for money is simply family.",
    "explication": "Unlike fake-relative scams, this uses the usual number and asks for nothing sensitive."
  },
  {
    "id": "appel-medecin-ok",
    "canal": "appel",
    "afficheur": "Dr Martin’s office",
    "numero": "call from the medical secretary",
    "transcript": [
      {
        "qui": "lui",
        "texte": "Hello, Dr Martin’s office. I’m calling to confirm your appointment on Thursday at 3 p.m."
      },
      {
        "qui": "vous",
        "texte": "Yes, of course, I’ll be there."
      },
      {
        "qui": "lui",
        "texte": "Perfect. Please remember to bring your Vitale card. Have a nice day!"
      }
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — appointment confirmation",
    "indices": [
      "They only confirm an appointment you already know about.",
      "No bank details or code requested.",
      "They ask you to bring your card in person, not to read its numbers over the phone.",
      "Polite tone, no pressure or threat."
    ],
    "reflexe": "A real appointment confirmation never asks for your codes or bank card over the phone.",
    "explication": "Not every call is a scam. A secretary confirming an appointment asks for no sensitive information."
  }
];

const GLOSSAIRE = [
  {
    "key": "hameconnage",
    "terme": "Phishing",
    "aliases": [
      "phishing",
      "hameçonnage"
    ],
    "def": "A scam technique where someone pretends to be a trusted organisation to make you click a link and reveal passwords or bank details."
  },
  {
    "key": "smishing",
    "terme": "Smishing",
    "aliases": [
      "smishing"
    ],
    "def": "Phishing by SMS. A fake message contains a trapped link. Do not click; check the official site and report to 33700."
  },
  {
    "key": "vishing",
    "terme": "Vishing",
    "aliases": [
      "vishing"
    ],
    "def": "Voice phishing by phone. The scammer calls pretending to be your bank or a service to obtain codes."
  },
  {
    "key": "spoofing",
    "terme": "Spoofing",
    "aliases": [
      "spoofing"
    ],
    "def": "Faking the displayed phone number. A scammer can make your bank’s real number appear on screen."
  },
  {
    "key": "deepfake",
    "terme": "Deepfake",
    "aliases": [
      "deepfake"
    ],
    "def": "An image, video or voice made with AI to imitate a real person."
  },
  {
    "key": "romance",
    "terme": "Romance scam",
    "aliases": [
      "romance scam",
      "arnaque aux sentiments"
    ],
    "def": "A scammer creates a fake online relationship, gains trust, then asks for money."
  },
  {
    "key": "faux-conseiller",
    "terme": "Fake bank adviser",
    "aliases": [
      "fake bank adviser",
      "faux conseiller"
    ],
    "def": "A scammer pretends to be your bank and makes you validate codes that authorise their transfers."
  },
  {
    "key": "faux-proche",
    "terme": "Fake relative scam",
    "aliases": [
      "fake relative",
      "hi mum",
      "bonjour maman"
    ],
    "def": "A message from an unknown number claims to be your child and asks for urgent money."
  },
  {
    "key": "faux-support",
    "terme": "Fake tech support",
    "aliases": [
      "fake tech support",
      "support technique"
    ],
    "def": "A pop-up or call claims your computer is infected and pushes you to call a fake technician."
  },
  {
    "key": "usurpation",
    "terme": "Identity impersonation",
    "aliases": [
      "impersonation",
      "usurpation"
    ],
    "def": "Pretending to be a person, brand or official organisation to gain trust."
  },
  {
    "key": "carte-cadeau",
    "terme": "Gift card payment",
    "aliases": [
      "gift cards",
      "cartes cadeaux"
    ],
    "def": "A favourite scammer payment method because codes are hard to trace and recover."
  },
  {
    "key": "piece-jointe",
    "terme": "Malicious attachment",
    "aliases": [
      "attachment",
      "pièce jointe"
    ],
    "def": "An attached file that may install malware or spyware when opened."
  },
  {
    "key": "code-unique",
    "terme": "One-time code",
    "aliases": [
      "one-time code",
      "SMS code"
    ],
    "def": "A code used to validate a login or purchase. Type it yourself; never give it to someone else."
  },
  {
    "key": "pig-butchering",
    "terme": "Investment scam (“pig butchering”)",
    "aliases": [
      "pig butchering"
    ],
    "def": "A scammer builds trust, then pushes the victim to invest on a fake crypto or trading platform."
  },
  {
    "key": "hors-plateforme",
    "terme": "Off-platform payment",
    "aliases": [
      "off-platform",
      "outside the platform"
    ],
    "def": "Paying outside the official site, which removes the protections of the platform."
  }
];

const REPERES = {
  "sms-colis": [
    {
      "texte": "+33 7 45 13 81 31",
      "bon": true,
      "aide": "Look at who sent the message.",
      "note": "A real carrier does not write from a personal mobile number."
    },
    {
      "texte": "https://mon-relay-suivi.com",
      "bon": true,
      "aide": "Is this the carrier’s official address?",
      "note": "This is not an official carrier website."
    },
    {
      "texte": "or it will be returned",
      "bon": true,
      "aide": "Find the pressure phrase.",
      "note": "False urgency pushes you to click."
    }
  ],
  "email-motdepasse": [
    {
      "texte": "ne-pas-repondre@chronopost.fr",
      "bon": true,
      "aide": "Does the email address match Microsoft?",
      "note": "The displayed name and real address do not match."
    },
    {
      "texte": "within 24 hours",
      "bon": true,
      "aide": "Look for urgency.",
      "note": "Artificial urgency."
    },
    {
      "texte": "account being suspended",
      "bon": true,
      "aide": "Look for the threat.",
      "note": "Fear is used to make you click."
    }
  ],
  "email-boite-mystere": [
    {
      "texte": "noreply.LE.04@b8.9a.21.eb",
      "bon": true,
      "aide": "Does the sender address look real?",
      "note": "Unreadable sender address."
    },
    {
      "texte": "YouHave-Won",
      "bon": true,
      "aide": "Did you enter a contest?",
      "note": "Unexpected gift/prize is bait."
    },
    {
      "texte": "NQLRF.pdf",
      "bon": true,
      "aide": "Is there an unexpected attachment?",
      "note": "Unknown attachment: do not open."
    }
  ],
  "email-panneaux": [
    {
      "texte": "charlotte.robert@shikisc.com",
      "bon": true,
      "aide": "Look at the sender address.",
      "note": "No link with a public body."
    },
    {
      "texte": "Last chance",
      "bon": true,
      "aide": "Find the pressure phrase.",
      "note": "Pressure to act quickly."
    },
    {
      "texte": "01-01-2025",
      "bon": true,
      "aide": "Is the date coherent?",
      "note": "Already expired date."
    }
  ],
  "chat-celebrite": [
    {
      "texte": "Brad Pitt (Official) ✔",
      "bon": true,
      "aide": "Would a celebrity really contact you privately?",
      "note": "Impersonated profile."
    },
    {
      "texte": "€850 in gift cards",
      "bon": true,
      "aide": "What payment method is requested?",
      "note": "Gift cards are untraceable scam payments."
    },
    {
      "texte": "relationship secret",
      "bon": true,
      "aide": "Look for secrecy.",
      "note": "Secrecy isolates the victim."
    }
  ],
  "appel-banque": [
    {
      "texte": "01 40 XX XX XX (your branch number)",
      "bon": true,
      "aide": "Can the displayed number be trusted?",
      "note": "Displayed numbers can be spoofed."
    },
    {
      "texte": "suspicious transfer of €1,290",
      "bon": true,
      "aide": "Find the panic trigger.",
      "note": "Fake emergency."
    },
    {
      "texte": "give it to me",
      "bon": true,
      "aide": "Is a bank allowed to ask for an SMS code?",
      "note": "A bank never asks you to dictate a code."
    }
  ],
  "chat-faux-proche": [
    {
      "texte": "+33 6 51 20 84 77",
      "bon": true,
      "aide": "Is this the saved number of your relative?",
      "note": "Unknown number claiming to be your child."
    },
    {
      "texte": "new number",
      "bon": true,
      "aide": "Find the excuse for the unknown number.",
      "note": "Classic fake-relative excuse."
    },
    {
      "texte": "€680 transfer",
      "bon": true,
      "aide": "Find the money request.",
      "note": "Urgent money request: verify by calling."
    }
  ],
  "image-deepfake": [
    {
      "texte": "__IMG__",
      "bon": true,
      "aide": "Look closely at the image details.",
      "note": "AI images often contain distorted hands or faces."
    },
    {
      "texte": "Look what they are hiding from us",
      "bon": true,
      "aide": "Find the emotional hook.",
      "note": "Sensational wording."
    }
  ],
  "sms-ameli": [
    {
      "texte": "Vitale card expires",
      "bon": true,
      "aide": "Does a Vitale card expire like this?",
      "note": "False claim."
    },
    {
      "texte": "reimbursements will be suspended",
      "bon": true,
      "aide": "Find the threat.",
      "note": "Threat creates panic."
    },
    {
      "texte": "http://ameli-mise-a-jour.info-fr.net",
      "bon": true,
      "aide": "Is this the real ameli.fr website?",
      "note": "Misleading link."
    }
  ],
  "popup-support": [
    {
      "texte": "5 viruses detected",
      "bon": true,
      "aide": "Find the scary alert.",
      "note": "Fake scare alert."
    },
    {
      "texte": "Do not turn off the computer",
      "bon": true,
      "aide": "Find the instruction that prevents you from thinking.",
      "note": "They want to keep you under pressure."
    },
    {
      "texte": "Microsoft support: 01 84 88 XX XX",
      "bon": true,
      "aide": "Would antivirus ask you to call?",
      "note": "Real antivirus alerts do not ask you to call a number."
    }
  ],
  "chat-emploi": [
    {
      "texte": "Amazon Recruitment (HR)",
      "bon": true,
      "aide": "Do major brands recruit by WhatsApp?",
      "note": "Major brands do not recruit like this."
    },
    {
      "texte": "€80 to €300 per day",
      "bon": true,
      "aide": "Is the salary realistic?",
      "note": "Unrealistic pay."
    },
    {
      "texte": "top up €40",
      "bon": true,
      "aide": "Are you asked to pay to work?",
      "note": "Paying to work is an absolute red flag."
    }
  ],
  "sms-colis-photo-ia": [
    {
      "texte": "+33 6 12 44 90 08",
      "bon": true,
      "aide": "Look at the sender number.",
      "note": "Personal mobile number."
    },
    {
      "texte": "__IMG__",
      "bon": true,
      "aide": "Does the photo prove the parcel exists?",
      "note": "AI-generated photo proves nothing."
    },
    {
      "texte": "€1.95 for redelivery",
      "bon": true,
      "aide": "Find the payment request.",
      "note": "Fake redelivery fee."
    },
    {
      "texte": "https://suivi-colis-relais.net",
      "bon": true,
      "aide": "Is this the official carrier site?",
      "note": "Trapped link."
    }
  ],
  "chat-faux-numero-invest": [
    {
      "texte": "wrong number",
      "bon": true,
      "aide": "Was the message really meant for you?",
      "note": "Wrong-number pretext."
    },
    {
      "texte": "nice chatting",
      "bon": true,
      "aide": "Why is the stranger coming back?",
      "note": "They are building trust."
    },
    {
      "texte": "32% in three weeks",
      "bon": true,
      "aide": "Is that return realistic?",
      "note": "Unrealistic gains."
    },
    {
      "texte": "only €250",
      "bon": true,
      "aide": "Find the money request.",
      "note": "They push you to invest money."
    }
  ],
  "email-airbnb-horsplateforme": [
    {
      "texte": "directly between us",
      "bon": true,
      "aide": "Where are you asked to pay?",
      "note": "Off-platform payment removes protection."
    },
    {
      "texte": "bank transfer",
      "bon": true,
      "aide": "Is this payment easy to recover?",
      "note": "Bank transfers are hard to recover."
    },
    {
      "texte": "marco.rivas.locations@gmail.com",
      "bon": true,
      "aide": "Would a platform message come from Gmail?",
      "note": "Personal Gmail address."
    },
    {
      "texte": "two other families",
      "bon": true,
      "aide": "Find the urgency/scarcity phrase.",
      "note": "Artificial scarcity."
    }
  ],
  "sms-banque-ok": [
    {
      "texte": "Call the number on the back of your card",
      "bon": true,
      "aide": "Find the safe official channel.",
      "note": "It sends you to a channel you control."
    },
    {
      "texte": "never ask for your codes",
      "bon": true,
      "aide": "Find the safety reminder.",
      "note": "A real bank reminds you not to share codes."
    }
  ],
  "notif-connexion-ok": [
    {
      "texte": "Google Account",
      "bon": true,
      "aide": "Where does the notification come from?",
      "note": "Official app notification."
    },
    {
      "texte": "no action is needed",
      "bon": true,
      "aide": "Find the calm tone.",
      "note": "No pressure."
    },
    {
      "texte": "Google app, Security section",
      "bon": true,
      "aide": "Find the official-app instruction.",
      "note": "It points to the official app, not a link."
    }
  ],
  "chat-ami-ok": [
    {
      "texte": "Jacqueline (neighbour)",
      "bon": true,
      "aide": "Is this a known contact?",
      "note": "Known saved contact."
    },
    {
      "texte": "coffee tomorrow at 3 p.m.",
      "bon": true,
      "aide": "Does it match real life?",
      "note": "Coherent everyday appointment."
    },
    {
      "texte": "Bring nothing, just yourself",
      "bon": true,
      "aide": "Any money or code request?",
      "note": "No sensitive request."
    }
  ],
  "sms-code-ok": [
    {
      "texte": "Never share it with anyone",
      "bon": true,
      "aide": "Find the security reminder.",
      "note": "The code must never be shared."
    },
    {
      "texte": "valid for 5 minutes",
      "bon": true,
      "aide": "Find the normal technical detail.",
      "note": "Normal one-time code detail."
    }
  ],
  "notif-virement-ok": [
    {
      "texte": "My Bank",
      "bon": true,
      "aide": "Where does the notification come from?",
      "note": "Banking app notification."
    },
    {
      "texte": "Balance available in your app",
      "bon": true,
      "aide": "Does it use a link?",
      "note": "It points to the app without urgent action."
    }
  ],
  "email-newsletter-ok": [
    {
      "texte": "contact@restosducoeur.org",
      "bon": true,
      "aide": "Does the address match the organisation?",
      "note": "Coherent sender address."
    },
    {
      "texte": "unsubscribe at any time",
      "bon": true,
      "aide": "Find the unsubscribe option.",
      "note": "Clear unsubscribe option."
    }
  ],
  "chat-famille-ok": [
    {
      "texte": "Sophie (my daughter)",
      "bon": true,
      "aide": "Is this the usual contact?",
      "note": "Known usual contact."
    },
    {
      "texte": "Léa’s dance show",
      "bon": true,
      "aide": "Find the personal detail.",
      "note": "Personal content consistent with real life."
    },
    {
      "texte": "as planned",
      "bon": true,
      "aide": "Is it referring to an existing plan?",
      "note": "Refers to a real agreed plan."
    }
  ],
  "appel-medecin-ok": [
    {
      "texte": "Dr Martin’s office",
      "bon": true,
      "aide": "Who is calling?",
      "note": "Clearly identified caller."
    },
    {
      "texte": "confirm your appointment",
      "bon": true,
      "aide": "What is the purpose?",
      "note": "Only confirming a known appointment."
    },
    {
      "texte": "bring your Vitale card",
      "bon": true,
      "aide": "Are numbers requested?",
      "note": "Bring it in person, no phone details requested."
    }
  ]
};

if (typeof window !== 'undefined'){
  window.SCENARIOS = SCENARIOS;
  window.GLOSSAIRE = GLOSSAIRE;
  window.REPERES = REPERES;
}
