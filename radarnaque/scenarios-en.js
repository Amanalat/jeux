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
      { "risque": "The button leads to a fake page that steals your login and password." }
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
      { "risque": "The request for money always arrives — often in untraceable gift cards." },
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
      { "risque": "Giving the code actually validates the scammers’ transfer." }
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
      { "risque": "The goal is remote access to your computer and money." }
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
      { "risque": "Small early “earnings” are used to make you pay more." }
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
      { "risque": "They push you to place money on a platform they choose: the displayed gains are fake." }
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
    "id": "email-prenom-detourne",
    "canal": "email",
    "entete": "Welcome email from a site you know — even though you created nothing",
    "de": "Welcome to the Jungle",
    "deAdresse": "no-reply@welcometothejungle.com",
    "objet": "Welcome! Confirm your new account",
    "date": "Today, 17:46",
    "corps": "<b style=\"font-size:1.12em\">Hello You will be charged 447.00&nbsp;€ by the Health Insurance. Your IBAN is registered for automatic payments. If you did not authorise this operation, please contact your fraud prevention department immediately on 0259509226</b><br><br>Welcome to the Jungle!<br>Thanks for creating your account! Just one last click to activate your profile.",
    "bouton": "Activate my account",
    "verdict": "arnaque",
    "categorie": "Hijacked field — fake message slipped into a real email",
    "indices": [
      "The email genuinely comes from the real site (authentic address and logo): the site is not the scammer.",
      "A stranger created an account with YOUR email address, typing the scam in place of the first name.",
      "So “Hello {first name}” displays a fake message about money, IBAN and direct debits.",
      "You are pushed to call a number (0259509226): that is where the real trap is."
    ],
    "reflexe": "Didn’t create this account? Ignore the content and never call the number shown. An automatic welcome email never asks you for anything by phone.",
    "explication": "A clever trick: the scammer did not hack the site. They simply filled the “first name” field of a sign-up form with a fake alert, then entered YOUR email. In good faith, the site sends “Hello {first name}” in big bold letters — displaying the scam in your place. The goal: make you call the number, where a fake “anti-fraud service” will help you “secure” your money… by transferring it to the crooks. Health insurance never debits anyone this way. Never call back a number contained in the message."
  },
  {
    "id": "email-fausse-boutique-liquidation",
    "canal": "email",
    "entete": "Promotional email received, with very low prices",
    "de": "Official Bike Discount",
    "deAdresse": "contact@velo-discount-shop.top",
    "objet": "TOTAL CLEARANCE before closing: -80% on the whole shop",
    "date": "Today, 11:20",
    "corps": "Store closing for good: everything must go before June 30!<br><br>Electric bike at €149 instead of €899, free helmet. Very limited stock, last items available.<br><br>100% secure payment, delivery within 48h across the country.",
    "bouton": "Get the clearance deal",
    "verdict": "arnaque",
    "categorie": "Fake online shop — fictitious clearance sale",
    "indices": [
      "Unknown, odd domain name (“velo-discount-shop.top”): no link to a real brand.",
      "Huge, unbelievable discount: an electric bike at €149 instead of €899.",
      "Fake urgency and scarcity: “closing for good”, “very limited stock”.",
      { "risque": "After payment, the item never arrives, or your bank details are stolen and reused." }
    ],
    "reflexe": "A discount too good to be true, on an unknown site, should raise a flag. Look for independent reviews and legal notices before paying.",
    "explication": "Scammers set up fake online shops, sometimes using real product photos stolen elsewhere, and rely on huge promotions to create urgency to buy. Result: nothing arrives, or the bank card is compromised. Before buying on an unknown site, check how long it has existed, look for reviews elsewhere, and be wary of a price that is too low."
  },
  {
    "id": "email-prime-video-paiement",
    "canal": "email",
    "entete": "Email received about a streaming subscription",
    "de": "Prime Video",
    "deAdresse": "support@prime-video-facturation.com",
    "objet": "Payment failed: your subscription will be suspended",
    "date": "Today, 08:03",
    "corps": "Hello,<br><br>The payment for your subscription could not be processed. Your access will be suspended within 48h.<br><br>Update your payment details to keep enjoying your films and shows.",
    "bouton": "Update my payment",
    "verdict": "arnaque",
    "categorie": "Email phishing — fake streaming service (subscription)",
    "indices": [
      "Sender address that is neither amazon.com nor primevideo.com: a made-up domain.",
      "Artificial urgency: “suspended within 48h”.",
      { "risque": "The button leads to a fake page that asks for your full card number." },
      "A real service never asks for full bank details through a link in an email."
    ],
    "reflexe": "To check a subscription, open the app directly or type the official address yourself — never through the email link.",
    "explication": "Scammers imitate major streaming or subscription services to collect full card numbers, using a fake “payment failed” excuse. The displayed name is reassuring, but the real sender address always gives it away. If in doubt about a subscription, open the official app yourself."
  },
  {
    "id": "chat-trop-percu-vente",
    "canal": "chat",
    "plateforme": "Classifieds site — messaging",
    "contact": "Interested buyer (sofa)",
    "avatar": "",
    "messages": [
      { "from": "eux", "texte": "Hello! I’m very interested in your sofa at €200. I won’t come myself, a courier will pick it up." },
      { "from": "eux", "texte": "I just sent you a transfer of €350 by mistake instead of €200, the form glitched. Could you send back the extra €150 by instant transfer while mine arrives on your account?" },
      { "from": "eux", "texte": "Here’s the screenshot of the transfer attached, it should land any moment now 😊" }
    ],
    "verdict": "arnaque",
    "categorie": "Overpayment scam (private sale)",
    "indices": [
      "The buyer never comes to see the item herself: she uses a “courier”.",
      "She claims to have sent too much money by mistake and asks you to send back the difference right away.",
      "Her only “proof” is a screenshot of the transfer — never money actually credited to your account.",
      { "risque": "You send a real transfer out of your own pocket, while her first transfer never arrives (or gets cancelled)." }
    ],
    "reflexe": "Never refund an “overpayment” before the money is truly and permanently credited to your account: check yourself in your banking app, not on a screenshot sent by the buyer.",
    "explication": "A classic scam on classifieds sites: the scammer fakes (or forges) an overly large transfer, often with a fake screenshot, and asks to be refunded the difference “urgently”. The first transfer does not exist or gets rejected days later: the victim really did send a genuine transfer — and loses it. Always use the platform’s built-in secure payment, never a direct transfer to a stranger."
  },
  {
    "id": "sms-remboursement-impots",
    "canal": "sms",
    "entete": "SMS received during tax return season",
    "expediteur": "TAX-OFFICE",
    "messages": [
      "Tax Authority: after reviewing your file, you are entitled to a refund of €237.80. To receive it, complete your bank details at: https://tax-refund-online-portal.com"
    ],
    "verdict": "arnaque",
    "categorie": "Impersonation of a public body (tax authority)",
    "indices": [
      "The sender name “TAX-OFFICE” is just as easy to fake as any other: it proves nothing.",
      "Link address that is not the official government tax site.",
      "You are asked to “complete” your bank details: if you have been refunded before, the tax authority already has them.",
      { "risque": "The fake page steals your bank details or tricks you into paying fake “processing fees”." }
    ],
    "reflexe": "Never log in through a link received by SMS: type the official tax website yourself in your browser to check a refund.",
    "explication": "Just like with health insurance or family benefits, scammers impersonate the tax authority during return season to ride the news cycle. A real tax refund is never unlocked by re-entering bank details on an external site: it is paid automatically to the account the administration already has on file."
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
  },
  {
    "id": "chat-leboncoin-paiement-securise-ok",
    "canal": "chat",
    "plateforme": "Classifieds site — messaging",
    "contact": "Interested buyer (kids’ bike)",
    "avatar": "",
    "messages": [
      { "from": "eux", "texte": "Hello, I’m interested in the kids’ bike. I’ll come pick it up Saturday morning if that works, and pay with the platform’s secure payment in person." },
      { "from": "eux", "texte": "That way it’s secure for both of us: the money is released once I’ve actually picked up the item. See you Saturday!" }
    ],
    "verdict": "fiable",
    "categorie": "Legitimate message — private sale via the platform’s secure payment",
    "indices": [
      "Payment goes through the platform’s official system, not a direct transfer to a stranger.",
      "No “courier” excuse: the buyer comes to collect the item herself.",
      "No request for a refund or “overpayment”.",
      "Simple tone, no artificial urgency or suspicious attachment."
    ],
    "reflexe": "A safe sale goes through the platform’s built-in payment (or an in-person handover against immediate payment) — never an outside transfer followed by a refund.",
    "explication": "Unlike the overpayment scam, here the money stays held by the platform until the item is actually handed over: neither of you risks losing money. The reassuring signal to remember: payment happens INSIDE the platform’s system, never through a direct bank transfer between individuals."
  },
  {
    "id": "image-deepfake-manifestation",
    "canal": "image",
    "image": "img/deepfake-manifestation.jpg",
    "legende": "“The President confronted by his own riot police in the middle of a protest! What they don’t want you to see…” — Shared 62,000 times",
    "verdict": "arnaque",
    "categorie": "AI-generated image (“deepfake”) / hoax",
    "indices": [
      "Inconsistent details: meaningless numbers on helmets/badges, blurred or duplicated faces in the crowd.",
      "No serious media outlet is reporting this scene.",
      "The caption plays on conspiracy and emotion (“what they don’t want you to see”).",
      "A single image proves nothing: it can be fabricated in seconds."
    ],
    "reflexe": "Before believing or sharing a shocking image, check the story on several recognised news outlets. Zoom in on the details (hands, inscriptions, faces in the background).",
    "explication": "As with any shocking image, the subject doesn’t matter (a celebrity, a politician, a stranger): the reflex is the same. If the event isn’t reported anywhere else, it probably didn’t happen."
  },
  {
    "id": "chat-faux-profil-rencontre",
    "canal": "chat",
    "plateforme": "Dating app",
    "contact": "Philip M. 😊",
    "avatar": "img/visage-ia-homme.jpg",
    "messages": [
      { "from": "eux", "texte": "Hi! I liked your profile right away 😊" },
      { "from": "eux", "texte": "I’m an engineer, currently working on an offshore oil platform. We’ve been talking for 3 weeks, and I feel like I’ve known you forever." },
      { "from": "eux", "texte": "I have a problem getting home: customs is asking me for €400 in fees that I don’t have on me here. Could you lend it to me? I’ll pay you back as soon as I’m back, I promise ❤️" }
    ],
    "verdict": "arnaque",
    "categorie": "Romance scam / fake profile",
    "indices": [
      "A relationship that becomes intense within just a few weeks, without ever meeting in person.",
      "A job that conveniently explains being far away and hard to reach (offshore platform, mission abroad…): a very classic excuse.",
      { "risque": "The request for money always arrives — here in the form of “customs fees”." },
      "The profile looks perfectly ordinary, not a celebrity: a believable photo proves nothing, it can be AI-generated."
    ],
    "reflexe": "As soon as an online match asks for money, even a small amount “to pay back quickly”, it’s a scam. No exception.",
    "explication": "Unlike the fake “Brad Pitt”, this kind of profile doesn’t try to impress with celebrity status, but with ordinariness and closeness built up message by message. The AI-generated photo is undetectable to the naked eye: it’s the behaviour (money requested) that should raise the alarm, not the appearance."
  },
  {
    "id": "chat-fausse-vendeuse-acompte",
    "canal": "chat",
    "plateforme": "Classifieds site (WhatsApp contact)",
    "contact": "Camille D.",
    "avatar": "img/visage-ia-femme.jpg",
    "messages": [
      { "from": "eux", "texte": "Hello! Yes, the item is still available 😊" },
      { "from": "eux", "texte": "As I have a lot of messages, I’m asking for a €30 deposit by direct bank transfer to hold the listing, outside the classifieds app (it avoids the platform’s fees)." },
      { "from": "eux", "texte": "As soon as I receive it I’ll take down the listing and we’ll arrange an in-person handover." }
    ],
    "verdict": "arnaque",
    "categorie": "Off-platform payment (fake seller)",
    "indices": [
      "You are pushed to pay OUTSIDE the website/app, supposedly to “avoid fees”.",
      "A deposit is requested before you’ve even seen the item or arranged a meeting.",
      { "risque": "Once the transfer is made outside the platform, there is no protection left: the money is lost if the item doesn’t exist." },
      "A friendly-looking profile photo guarantees nothing: it can be fake."
    ],
    "reflexe": "On a classifieds platform, payment should always go through the site’s secure system. Never a “deposit” by direct transfer.",
    "explication": "This is the exact opposite of the “secure classifieds sale” scenario: here, as soon as you’re pushed outside the protected system, you lose every guarantee. The excuse (“avoid the fees”) is almost always a sign of a scam."
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
  },
  {
    "key": "trop-percu",
    "terme": "Overpayment scam",
    "aliases": [
      "overpayment scam",
      "trop-perçu"
    ],
    "def": "A buyer claims to have sent too much money by mistake (often with a fake transfer screenshot) and asks to be refunded the difference before the money has actually arrived. The first transfer does not exist or gets cancelled: the victim loses the real money sent back."
  },
  {
    "key": "fausse-boutique",
    "terme": "Fake online shop",
    "aliases": [
      "fake online shop",
      "fausse boutique en ligne"
    ],
    "def": "A fake sales website, often with extreme discounts and artificial urgency (“clearance”, “limited stock”), that takes payment without ever delivering, or steals bank details."
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
    },
    {
      "texte": "antoninatger",
      "bon": true,
      "aide": "How are you addressed? Does a real service use your first name, or a squashed-together login?",
      "note": "You are addressed by a squashed-together lowercase login (“antoninatger”) rather than “Hi Antonin”: a real service names you properly. A sign of a malicious automated blast."
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
      "texte": "Microsoft support immediately: 01 84 88 XX XX",
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
    },
    {
      "texte": "I cannot hold the dates for long",
      "bon": true,
      "aide": "Find the phrase that pressures you with time so you don't stop to think.",
      "note": "Urgency tone: “hurry”, “I cannot hold the dates” — they want you to pay before you think."
    }
  ],
  "email-prenom-detourne": [
    {
      "texte": "You will be charged 447.00",
      "bon": true,
      "aide": "Does a mere first name contain a sentence about money and an IBAN? Look for what has no business being in a “Hello”.",
      "note": "A “first name” that talks about money, an IBAN and direct debits: this text was slipped into the first-name field in place of your name."
    },
    {
      "texte": "0259509226",
      "bon": true,
      "aide": "What are they trying to get you to do? Spot the number to call: that is where the trap is.",
      "note": "The real trap: calling this number reaches a fake “anti-fraud service” that will help you “secure” your money by transferring it to the crooks."
    },
    {
      "texte": "no-reply@welcometothejungle.com",
      "bon": false,
      "note": "Here the address is genuine: the email really does come from the site. The sender is not the problem — the injected text in place of your first name is."
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
    },
    {
      "texte": "CIC",
      "bon": true,
      "aide": "Do you recognise the sender? If CIC really is YOUR bank, that is a small reassuring sign.",
      "note": "A weak but real clue: if CIC is your bank, recognising the sender is somewhat reassuring. Still, a sender name can be spoofed — never rely on it alone."
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
    },
    {
      "texte": "Paul Durand",
      "bon": true,
      "aide": "Do you recognise who sent the transfer? A name you know is rather reassuring.",
      "note": "If you really do know a Paul Durand, recognising the sender is a good sign. Still, a name alone proves nothing — it is the whole picture (the app, no request) that reassures."
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
  ],
  "email-fausse-boutique-liquidation": [
    {
      "texte": "contact@velo-discount-shop.top",
      "bon": true,
      "aide": "Look at the sender address: does it match a real known brand?",
      "note": "Unknown, odd domain name, with no link to a real brand."
    },
    {
      "texte": "€149 instead of €899",
      "bon": true,
      "aide": "Does this discount seem realistic for an electric bike?",
      "note": "Huge, unbelievable discount: a classic fake-shop sign."
    },
    {
      "texte": "Very limited stock",
      "bon": true,
      "aide": "Find what pushes you to buy right now without thinking.",
      "note": "Fake scarcity to rush you into buying."
    },
    {
      "texte": "100% secure payment",
      "bon": false,
      "note": "A fake shop can easily write “secure payment” too: the claim alone proves nothing."
    }
  ],
  "email-prime-video-paiement": [
    {
      "texte": "support@prime-video-facturation.com",
      "bon": true,
      "aide": "Look at the full sender address: is it the real streaming service’s domain?",
      "note": "Made-up domain, unrelated to the real streaming service."
    },
    {
      "texte": "suspended within 48h",
      "bon": true,
      "aide": "Find the deadline that pushes you to act quickly.",
      "note": "Artificial urgency to make you click fast."
    },
    {
      "texte": "Update your payment details",
      "bon": true,
      "aide": "What does the button ask you to do?",
      "note": "The button leads to a fake page asking for your full card number."
    },
    {
      "texte": "Payment failed",
      "bon": false,
      "note": "A real service can write this too one day: it is the address and the link that give the scam away, not this phrase alone."
    }
  ],
  "chat-trop-percu-vente": [
    {
      "texte": "a courier will pick it up",
      "bon": true,
      "aide": "Does the buyer come to see the item herself? Find the excuse for not coming in person.",
      "note": "She never comes in person: a classic setup for this scam."
    },
    {
      "texte": "send back the extra €150",
      "bon": true,
      "aide": "What are you asked to do with money you have not actually received yet?",
      "note": "Asked to refund an “overpayment” before the money has even arrived."
    },
    {
      "texte": "screenshot of the transfer",
      "bon": true,
      "aide": "Does this “proof” of payment really show the money is in your account?",
      "note": "A screenshot is easy to fake: it is not proof the money has arrived."
    },
    {
      "texte": "€200",
      "bon": false,
      "note": "The item’s price itself is not a clue: the scam plays out around it."
    }
  ],
  "sms-remboursement-impots": [
    {
      "texte": "TAX-OFFICE",
      "bon": false,
      "note": "A sender name is easy to fake: it proves nothing on its own."
    },
    {
      "texte": "https://tax-refund-online-portal.com",
      "bon": true,
      "aide": "Does this address look like the real official tax website?",
      "note": "Not the official tax website: a trapped link."
    },
    {
      "texte": "complete your bank details",
      "bon": true,
      "aide": "If you have been refunded before, does the tax authority need you to re-enter your bank details?",
      "note": "The administration already has your bank details if you have been refunded before: it does not ask again by SMS."
    }
  ],
  "chat-leboncoin-paiement-securise-ok": [
    {
      "texte": "secure payment in person",
      "bon": true,
      "aide": "How does the buyer propose to pay? Find the payment system used.",
      "note": "Payment goes through the platform’s secure system, not a direct transfer."
    },
    {
      "texte": "actually picked up the item",
      "bon": true,
      "aide": "At what point is the money released to you?",
      "note": "Money is only released after the item is actually handed over: neither side risks anything."
    },
    {
      "texte": "See you Saturday",
      "bon": false,
      "note": "A polite closing line: nice, but not where the important information is."
    }
  ],
  "image-deepfake-manifestation": [
    {
      "texte": "__IMG__",
      "bon": true,
      "aide": "Look closely at the image: do the faces in the crowd and the inscriptions on the helmets look consistent to you? Click on it.",
      "note": "Zoom in: meaningless numbers on the helmets, blurred or distorted faces in the background — signs of an AI-generated image."
    },
    {
      "texte": "What they don’t want you to see",
      "bon": true,
      "aide": "Look for the phrase that plays on conspiracy and emotion.",
      "note": "Classic conspiracy-style phrasing designed to make you react without checking."
    },
    {
      "texte": "Shared 62,000 times",
      "bon": false,
      "note": "The number of shares proves nothing: fake content can spread just as fast, or faster, than real news."
    }
  ],
  "chat-faux-profil-rencontre": [
    {
      "texte": "engineer, currently working on an offshore oil platform",
      "bon": true,
      "aide": "Why is this person so hard to reach or meet in real life? Look for the excuse.",
      "note": "A classic job that conveniently explains being far away and unavailable."
    },
    {
      "texte": "We’ve been talking for 3 weeks",
      "bon": true,
      "aide": "Is this relationship moving at a normal pace?",
      "note": "A relationship progressing very fast online: a warning sign."
    },
    {
      "texte": "€400 in fees",
      "bon": true,
      "aide": "What are you always eventually asked for in this kind of exchange?",
      "note": "A request for money: the sign that never lies."
    },
    {
      "texte": "I liked your profile right away",
      "bon": false,
      "note": "A generic opening compliment: pleasant, but not a clue on its own."
    }
  ],
  "chat-fausse-vendeuse-acompte": [
    {
      "texte": "outside the classifieds app",
      "bon": true,
      "aide": "Where are you being pushed to make the payment, compared to the platform?",
      "note": "You are being pushed outside the platform’s secure system: a classic warning sign."
    },
    {
      "texte": "€30 deposit by direct bank transfer",
      "bon": true,
      "aide": "Are you being asked for money before you’ve even seen the item?",
      "note": "A request for a direct payment before any real contact: be cautious."
    },
    {
      "texte": "it avoids the platform’s fees",
      "bon": true,
      "aide": "What excuse is used to justify stepping outside the secure payment system?",
      "note": "A classic excuse to get you to step outside the secure payment system."
    },
    {
      "texte": "still available",
      "bon": false,
      "note": "A generic seller reply: pleasant, but not a clue on its own."
    }
  ]
};

if (typeof window !== 'undefined'){
  window.SCENARIOS = SCENARIOS;
  window.GLOSSAIRE = GLOSSAIRE;
  window.REPERES = REPERES;
}
