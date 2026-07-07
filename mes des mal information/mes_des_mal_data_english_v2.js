/* ============================================================
   Data: each scenario has one correct answer + an explanation.
   c = correct category: "mes" | "des" | "mal"
   ============================================================ */
const SCENARIOS = [
  {
    tag: "Class group",
    fmt: "post", icon: "🧑", user: "Lucas", handle: "@lucas · Year 9B group",
    body: "🚨 NO CLASSES TOMORROW!! The school is closed because of the snow ❄️ Spread the word!",
    context: "In reality, classes are taking place as usual.",
    c: "mes",
    why: "The information is <b>false</b>, but Lucas <b>is not trying to cause harm</b>: he believes he is telling the truth and just wants to warn his classmates. A mistake shared in good faith → <b>misinformation</b>."
  },
  {
    tag: "Anonymous account",
    fmt: "news", kicker: "🔴 Exclusive", outlet: "Screenshot attributed to ‘Le Quotidien’… actually fake",
    headline: "Candidate M. is said to have been convicted by a court just days before the election",
    c: "des",
    why: "The information is <b>false</b> AND <b>deliberately fabricated to deceive and harm</b> a candidate. Deliberately creating false content → <b>disinformation</b>."
  },
  {
    tag: "Private chat with a friend",
    fmt: "chat",
    chat: [
      { s: "them", who: "Maya", t: "Did you see?? Inès posted a photo of me at a party in the class group 😩" },
      { s: "me", who: "You", t: "Oh no… why would she do that?" },
      { s: "them", who: "Maya", t: "She admitted it was to get revenge on me 😤" }
    ],
    ask: "What Inès did is…",
    c: "mal",
    why: "The photo is <b>true</b>, but it was taken out of its private context and shared <b>with the aim of harming</b> Maya. Truth used to cause harm → <b>malinformation</b>."
  },
  {
    tag: "Message from your grandmother",
    fmt: "forward", fwd: "Forwarded many times",
    body: "🍋 DRINK HOT LEMON WATER every morning: it cleanses the body and CURES CANCER! 🙏 Forward this to the people you love ❤️",
    img: "images/exemple-mesinformation.jpg",
    context: "This advice is medically false.",
    c: "mes",
    why: "False health advice, but shared <b>out of kindness, with no intention to harm</b>. A good-faith mistake → <b>misinformation</b>."
  },
  {
    tag: "Notification received",
    fmt: "notif", icon: "🎁", app: "Email inbox",
    title: "🎉 You have won an iPhone 15!",
    body: "Click quickly to claim your gift within 24 hours ▶ recompense-cadeau.link",
    c: "des",
    why: "<b>False</b> content, created <b>deliberately to deceive and scam</b>. Clear intention to cause harm → <b>disinformation</b>."
  },
  {
    tag: "Hacked data",
    fmt: "mail", leak: "📂 LEAK — 2,000 internal emails posted online",
    meta: "From: direction@entreprise.fr — To: committee@entreprise.fr",
    subject: "RE: internal file (confidential)",
    body: "‘…let’s keep this between us for now, especially do not share it…’",
    context: "These emails are authentic (not fake).",
    c: "mal",
    why: "The emails are <b>authentic (true)</b>, but the leak is organized <b>to cause harm</b>. Truth misused to hurt others → <b>malinformation</b>."
  },
  {
    tag: "On a news feed",
    fmt: "post", icon: "😱", user: "Karim", handle: "@karim_77 · just now",
    body: "😱 This is happening RIGHT HERE right now!! Look at these floods, stay safe 🙏",
    img: "images/exemple-inondation.jpg", // to add; displays automatically when the file exists
    context: "In reality, this photo is from another flood, 10 years ago.",
    c: "mes",
    why: "The image is misleading (wrong date), but the person <b>does not know</b> and does not want to cause harm. Unintentional mistake → <b>misinformation</b>."
  },
  {
    tag: "Wave of identical accounts",
    fmt: "post", icon: "🤖", user: "Account no. 47", handle: "@reveil_2026", badge: "1 of 60 fake accounts",
    body: "💉⚠️ The vaccine contains a CHIP to CONTROL you! Share before it gets censored!! 🔁",
    img: "images/exemple-desinformation.jpg",
    context: "This claim is false (an invented rumour).",
    c: "des",
    why: "<b>False</b> claim, spread <b>massively and deliberately to manipulate</b>. Organized fabrication → <b>disinformation</b>."
  },
  {
    tag: "Posted on his profile",
    fmt: "post", icon: "😏", user: "Théo", handle: "@theo · 2 min ago",
    body: "LOL look what a classmate told me in private 😂😂 [screenshot]",
    img: "images/exemple-malinformation.jpg",
    context: "The conversation is authentic and private.",
    c: "mal",
    why: "The message is <b>real</b>, but sharing it outside its private context is meant <b>to humiliate</b>. Truth used to cause harm → <b>malinformation</b>."
  },
  {
    tag: "Video going around",
    fmt: "post", icon: "🎬", user: "BuzzActu", handle: "@buzzactu · viral",
    body: "🎥 He DARED to say THIS during a speech 😱 (5-second clip)",
    context: "The sentence was really spoken, but the clip is cut out of context.",
    c: "mal",
    why: "The sentence <b>was really said</b>, but it is isolated from its context <b>to harm</b> the person. Truth misused → <b>malinformation</b>."
  },
  {
    tag: "Article from a serious newspaper",
    fmt: "news", kicker: "📰 News", outlet: "The Regional Gazette",
    headline: "Unemployment is said to have jumped by 30% in one month (incorrect figure)",
    erratum: "Correction: false figure published by mistake. The article has been corrected and the newspaper has apologized.",
    c: "mes",
    why: "<b>Incorrect</b> information, but published <b>without any intention to deceive</b> (and corrected). A good-faith mistake → <b>misinformation</b>."
  },
  {
    tag: "‘Shocking’ video",
    fmt: "post", icon: "🎥", user: "Leaks & Scoops", handle: "@leaks_off",
    body: "🎥 INCREDIBLE: the minister admits everything on camera! (AI-generated video)",
    context: "This video is fake (AI-generated): the minister never said these words.",
    c: "des",
    why: "The video is <b>false (fake)</b> and designed <b>deliberately to cause harm</b>. Intentional deceptive fabrication → <b>disinformation</b>."
  },
  {
    tag: "Televised interview",
    fmt: "post", icon: "🎙️", user: "The MP", handle: "TV studio · live",
    body: "‘I have NEVER been a climate-change sceptic. I have always acknowledged the human cause of global warming.’",
    imgs: ["images/exemple-climat-2022.jpg", "images/exemple-climat-2025.jpg"], // to add; displays as soon as the files exist
    context: "Two years earlier, this same public official said they doubted the human cause of global warming.",
    c: "des",
    why: "The statement is <b>false</b> (their words from two years earlier contradict it), and they say it <b>deliberately to rewrite their image</b> and deceive the public → <b>disinformation</b>. Watch the trap: the truth (their past statement) is not what they are spreading — on the contrary, they are <b>hiding</b> it."
  }
];

/* ============================================================
   HARD LEVEL — ambiguous cases, false context, traps about intention.
   It includes one key PAIR: the same true content shifts from
   misinformation to malinformation depending on intention.
   ============================================================ */
const HARD = [
  {
    tag: "🔀 False context — episode 1",
    fmt: "post", icon: "🌧️", user: "Maël", handle: "@mael · just now",
    body: "🌊 Our town THIS MORNING… it’s catastrophic 😨 Stay safe!",
    img: "images/exemple-inondation.jpg", // to add; displays automatically when the file exists
    context: "The photo is <b>authentic</b> but is actually from <b>4 years ago</b> — and Maël <b>has no idea</b>; he thinks he is doing the right thing by warning his neighbours.",
    c: "mes",
    why: "The photo is <b>authentic</b> but <b>miscontextualized</b> (wrong date). Because Maël <b>does not know and does not want to cause harm</b>, this is a good-faith mistake → <b>misinformation</b>. <i>Remember this example: the next one shows the same content… with a different intention.</i>"
  },
  {
    tag: "🔀 False context — episode 2",
    fmt: "post", icon: "😏", user: "Léa", handle: "@lea_actu · activist",
    body: "🌊 The town UNDER WATER today 👉 the mayor has done NOTHING for years! #resign",
    img: "images/exemple-faux-contexte.jpg",
    context: "Léa <b>knows</b> that this same photo is from 4 years ago, but she dates it as today <b>on purpose</b> to exaggerate and accuse the mayor.",
    c: "mal",
    why: "<b>Identical and true</b> content, but Léa <b>knows</b> the context is false and uses it <b>deliberately to harm</b> the mayor → <b>malinformation</b>. 👉 Same image as episode 1: <b>only the intention changes the category</b>."
  },
  {
    tag: "Official statement",
    fmt: "post", icon: "🏛️", user: "The official", handle: "Press conference",
    body: "‘Unemployment is at its lowest: only X%! The situation has NEVER been this good.’",
    context: "The figure is <b>true and accurate</b>, but it <b>deliberately hides</b> the fact that it does not count people in training, to make people believe everything is improving.",
    c: "mal",
    why: "The figure is <b>true</b>, but <b>presented misleadingly through omission</b>, on purpose → <b>malinformation</b> (deceiving with the truth). This is not disinformation: no false figure has been invented."
  },
  {
    tag: "Reshared by a friend",
    fmt: "forward", fwd: "Forwarded",
    body: "😱 The government has just BANNED HOMEWORK at home!! It’s official 🎉",
    context: "Originally, it was an <b>openly satirical article (a joke)</b>. The friend did not notice the joke and reshared it <b>as real news</b>.",
    c: "mes",
    why: "The information is <b>false</b>, but the internet user <b>is not trying to deceive</b>: they were fooled too → <b>misinformation</b>. Trap: the original satire was not disinformation (openly humorous, no intention to cause harm)."
  },
  {
    tag: "‘Scandal’ photo",
    fmt: "post", icon: "📸", user: "CelebrityGossip", handle: "@gossip · sponsored",
    body: "😲 THE photo that exposes the actress! (image actually EDITED)",
    context: "The original photo was true, but it was <b>doctored</b> (object added) and then shared as authentic <b>to smear her</b>.",
    c: "des",
    why: "Trap: the original photo was true, but it was <b>doctored</b> — so the content being shared has <b>become false</b>, and was fabricated <b>to cause harm</b> → <b>disinformation</b>. Key point: the <b>content was modified</b> (unlike malinformation, where the content remains intact)."
  },
  {
    tag: "Screenshot of an old tweet",
    fmt: "post", icon: "🕰️", user: "@anti_campaign", handle: "brings up a 2018 tweet",
    body: "Look what this candidate wrote 8 years ago 👇 (authentic, unmodified tweet)",
    context: "The tweet is <b>real and unchanged</b>, but brought back at the worst possible time <b>to make their campaign fail</b>.",
    c: "mal",
    why: "The tweet is <b>authentic and unmodified</b>, but brought back and targeted <b>to harm</b> the candidate → <b>malinformation</b>. <i>Nuance: depending on the topic, revealing true information may be in the public interest — intention and context are debatable.</i>"
  },
  {
    tag: "Shared graph",
    fmt: "post", icon: "📈", user: "Activist", handle: "@stop_prices",
    body: "📈 Prices are EXPLODING!! It’s a disaster!!",
    img: "images/exemple-graphique.jpg", // to add; displays automatically when the file exists
    context: "The <b>data is true</b>, but the <b>visual presentation is manipulated</b> to alarm people. No figure is false.",
    c: "mal",
    why: "The <b>data is true</b>, but the <b>presentation is deliberately manipulated</b> → <b>malinformation</b> (false framing). Since no figure is invented, this is not disinformation in the strict sense."
  },
  {
    tag: "Playground word of mouth",
    fmt: "chat",
    chat: [
      { s: "them", who: "A student", t: "People say the cafeteria food makes you sick, you shouldn’t eat there anymore!" },
      { s: "me", who: "You", t: "Really? Who said that?" },
      { s: "them", who: "A student", t: "I don’t know, everyone keeps repeating it… I’m warning people just in case!" }
    ],
    context: "The rumour is <b>false</b>, but repeated <b>in good faith</b>, with no intention to deceive.",
    c: "mes",
    why: "<b>False</b> rumour spread <b>without any intention to cause harm</b>, just repeated naively → <b>misinformation</b>. Classic trap: many classify it as ‘disinfo’, but the intention to deceive is missing."
  },
  {
    tag: "Reshared by a blogger",
    fmt: "post", icon: "😮", user: "Health Blog+", handle: "@healthblog",
    body: "😮 A scientist says that ‘exercise is useless’!! (quote actually truncated)",
    context: "The quote is <b>taken out of context</b>, but the blogger <b>does not know</b> and believes it is accurate: no intention to cause harm.",
    c: "mes",
    why: "The quote is <b>miscontextualized</b> (and therefore misleading), but the blogger <b>does not know and does not want to cause harm</b> → <b>misinformation</b>. The same content would become <b>malinformation</b> if they did it <b>knowingly to cause harm</b>."
  },
  {
    tag: "Posted ‘as a warning’",
    fmt: "post", icon: "📍", user: "Neighbourhood Watch", handle: "@neighbourhood",
    body: "⚠️ Here is the shopkeeper’s name, address and photo 👉 go ‘teach him a lesson’!",
    context: "The information is <b>true and private</b>, disclosed <b>to expose and harm</b> someone (doxing).",
    c: "mal",
    why: "The information is <b>true and private</b>, disclosed <b>to expose and harm</b> someone (doxing) → <b>malinformation</b>. No distortion: the <b>disclosure</b> itself is the weapon."
  },
  {
    tag: "Online testimony",
    fmt: "post", icon: "🛸", user: "Tom", handle: "@tom · last night",
    body: "🛸 I saw a UFO above the stadium with my own eyes!! I swear, it was real!",
    context: "It was actually a <b>drone</b>. Tom <b>sincerely believes it</b> and shares it with no bad intention.",
    c: "mes",
    why: "<b>False</b> but sincere claim, <b>with no intention to deceive</b> → <b>misinformation</b>. Strongly believing something false and sharing it in good faith is still misinformation."
  },
  {
    tag: "So-called ‘leak’",
    fmt: "mail", leak: "📂 ‘SECRET DOCUMENTS’… actually invented",
    meta: "Supposed internal leak — source: anonymous account",
    subject: "Secret company plan (fake document)",
    body: "‘…documents fabricated from scratch to make the stock price fall…’",
    img: "images/exemple-desinformation.jpg",
    context: "It <b>looks like</b> a leak (which would be true information), but the documents are <b>entirely invented</b> to cause harm.",
    c: "des",
    why: "‘Malinfo’ trap: it looks like a leak, but the documents are <b>entirely invented</b> → <b>false</b> content, fabricated <b>to cause harm</b> → <b>disinformation</b>. A real leak would be malinformation; a fake leak remains disinformation."
  }
];

/* ---------- Labels ---------- */
const LABELS = {
  mes: { name: "Misinformation", color: "var(--mes)" },
  des: { name: "Disinformation", color: "var(--des)" },
  mal: { name: "Malinformation", color: "var(--mal)" }
};

/* ---------- State ---------- */
