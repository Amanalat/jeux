/* ===== Logique du jeu ===== */
let pool = SCENARIOS;
let difficulty = "normal";
let order = [];
let idx = 0;
let score = 0;
let streak = 0;
let answered = false;
let chatTimer = null;
let stats = { mes:{ok:0,tot:0}, des:{ok:0,tot:0}, mal:{ok:0,tot:0} };

const $ = id => document.getElementById(id);

function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

/* Construit l'énoncé selon son format (post, texto, notif, news, mail, recherche…). */
function renderEnonce(s){
  const f = s.fmt || "story";
  let h = "";
  if(f === "chat"){
    h = '<div class="chat">' + s.chat.map(m =>
        '<div class="bubble ' + m.s + '">' + (m.who ? '<span class="who">' + m.who + '</span>' : '') + m.t + '</div>'
      ).join("") + '</div>';
  } else if(f === "post"){
    h = '<div class="fr-post"><div class="hd"><div class="av">' + (s.icon || "🙂") + '</div>'
      + '<div><div class="nm">' + s.user + '</div><div class="ha">' + s.handle + '</div></div>'
      + (s.badge ? '<span class="badge">' + s.badge + '</span>' : '') + '</div>'
      + '<div class="bd">' + s.body + '</div>'
      + '<div class="ft"><span>' + I18N.t('like') + '</span><span>' + I18N.t('comment') + '</span><span>' + I18N.t('share') + '</span></div></div>';
  } else if(f === "forward"){
    h = '<div class="fr-fwd"><div class="fwd">↪️ ' + (s.fwd || I18N.t('forwarded')) + '</div><div class="msg">' + s.body + '</div></div>';
  } else if(f === "notif"){
    h = '<div class="fr-notif"><div class="ic">' + (s.icon || "🔔") + '</div><div>'
      + '<div class="ap">' + s.app + '</div><div class="ti">' + s.title + '</div><div class="tx">' + s.body + '</div></div></div>';
  } else if(f === "news"){
    h = '<div class="fr-news"><div class="kick">' + (s.kicker || I18N.t('newsAlert')) + '</div><div class="in">'
      + '<div class="hl">' + s.headline + '</div>' + (s.outlet ? '<div class="src">' + s.outlet + '</div>' : '')
      + (s.erratum ? '<div class="err">✏️ ' + s.erratum + '</div>' : '') + '</div></div>';
  } else if(f === "mail"){
    h = '<div class="fr-mail">' + (s.leak ? '<div class="leak">' + s.leak + '</div>' : '') + '<div class="in">'
      + '<div class="row">' + s.meta + '</div><div class="subj">' + s.subject + '</div><div class="bd">' + s.body + '</div></div></div>';
  } else if(f === "search"){
    h = '<div class="fr-search"><div class="q">' + s.query + '</div>'
      + '<div class="rt">' + s.result + '</div>' + (s.url ? '<div class="ru">' + s.url + '</div>' : '')
      + '<div class="rs">' + s.snippet + '</div></div>';
  } else {
    h = '<div style="font-size:1.05rem;font-weight:600;line-height:1.45">' + (s.body || "") + '</div>';
  }
  if(s.context) h += '<div class="context">' + s.context + '</div>';
  return h;
}

/* Fait apparaître les bulles d'un texto une par une, avec un indicateur « en train d'écrire ». */
function revealChat(){
  const chat = document.querySelector("#scenario .chat");
  if(!chat) return;
  const bubbles = Array.from(chat.querySelectorAll(".bubble"));
  const typing = document.createElement("div");
  typing.className = "bubble them typing";
  typing.innerHTML = "<span></span><span></span><span></span>";
  let i = 0;
  const step = () => {
    if(i >= bubbles.length){ if(typing.parentNode) typing.remove(); return; }
    const b = bubbles[i];
    typing.classList.toggle("me", b.classList.contains("me"));
    typing.classList.toggle("them", !b.classList.contains("me"));
    chat.insertBefore(typing, b);
    chatTimer = setTimeout(() => {
      if(typing.parentNode) typing.remove();
      b.classList.add("in");
      i++;
      chatTimer = setTimeout(step, 380);
    }, 700);
  };
  chatTimer = setTimeout(step, 250);
}

/* Affiche immédiatement tout le texto (quand on répond ou qu'on passe à la suite). */
function revealChatNow(){
  clearTimeout(chatTimer);
  const t = document.querySelector("#scenario .chat .typing");
  if(t) t.remove();
  document.querySelectorAll("#scenario .chat .bubble").forEach(b => b.classList.add("in"));
}

function startGame(diff){
  difficulty = diff || "normal";
  pool = difficulty === "hard" ? HARD : SCENARIOS;
  if(difficulty === "hard"){
    // On garde la paire « faux contexte » (index 0 puis 1) en tête, dans l'ordre,
    // pour que la bascule més→mal soit lisible, puis on mélange le reste.
    order = [0, 1, ...shuffle([...Array(pool.length).keys()].slice(2))];
  } else {
    order = shuffle([...Array(pool.length).keys()]);
  }
  idx = 0; score = 0; streak = 0;
  stats = { mes:{ok:0,tot:0}, des:{ok:0,tot:0}, mal:{ok:0,tot:0} };
  $("intro").classList.add("hidden");
  $("end").classList.add("hidden");
  $("game").classList.remove("hidden");
  $("qtotal").textContent = "/ " + order.length;
  $("levelBadge").textContent = difficulty === "hard" ? "🔥 Difficile" : "🟢 Normal";
  renderQuestion();
}

function backToIntro(){
  $("end").classList.add("hidden");
  $("game").classList.add("hidden");
  $("intro").classList.remove("hidden");
}

function renderQuestion(){
  answered = false;
  clearTimeout(chatTimer);
  const s = pool[order[idx]];
  $("tag").textContent = s.tag;
  $("scenario").innerHTML = renderEnonce(s);
  $("ask").textContent = s.ask || I18N.t('ask');
  if(s.fmt === "chat") revealChat();

  // média(s) illustratif(s) — chaque image qui n'existe pas encore se retire d'elle-même
  const media = $("sceneMedia");
  const imgs = s.imgs || (s.img ? [s.img] : []);
  media.innerHTML = imgs.map(src => '<img src="' + src + '" alt="" loading="lazy" onerror="this.remove()">').join("");
  media.classList.toggle("show", imgs.length > 0);
  $("qcount").textContent = I18N.t('qLabel') + " " + (idx+1);
  $("score").textContent = score;
  $("streak").textContent = streak >= 2 ? "🔥×" + streak : "";
  $("barfill").style.width = (idx / order.length * 100) + "%";

  // reset boutons
  document.querySelectorAll(".choice").forEach(b => {
    b.disabled = false;
    b.classList.remove("correct","wrong","good-border");
  });
  $("feedback").classList.remove("show");
  $("nextBtn").classList.remove("show");
}

function answer(choice){
  if(answered) return;
  answered = true;
  revealChatNow();
  const s = pool[order[idx]];
  const correct = s.c;
  stats[correct].tot++;

  const isRight = choice === correct;
  if(isRight){
    streak++;
    const bonus = streak >= 3 ? 5 : 0;        // bonus de série
    score += 10 + bonus;
    stats[correct].ok++;
  } else {
    streak = 0;
  }
  $("score").textContent = score;
  $("streak").textContent = streak >= 2 ? "🔥×" + streak : "";

  // marquer les boutons
  document.querySelectorAll(".choice").forEach(b => {
    b.disabled = true;
    const c = b.dataset.c;
    if(c === correct) b.classList.add("good-border");
    if(c === choice && !isRight) b.classList.add("wrong");
    if(c !== correct && c !== choice) b.classList.add("wrong");
  });

  // feedback
  const v = $("verdict");
  if(isRight){
    v.className = "verdict ok";
    v.textContent = streak >= 3 ? I18N.t('exactStreakA') + streak + I18N.t('exactStreakB') : I18N.t('goodAnswer');
  } else {
    v.className = "verdict no";
    v.textContent = I18N.t('missPrefix') + LABELS[correct].name;
  }
  $("why").innerHTML = s.why;
  $("feedback").classList.add("show");
  $("nextBtn").classList.add("show");
}

function nextQuestion(){
  idx++;
  if(idx >= order.length){ endGame(); return; }
  renderQuestion();
}

function endGame(){
  $("game").classList.add("hidden");
  $("end").classList.remove("hidden");
  const max = order.length * 10;
  $("finalScore").textContent = score;
  $("maxScore").textContent = max;

  const totalOk = stats.mes.ok + stats.des.ok + stats.mal.ok;
  const pct = Math.round(totalOk / order.length * 100);
  let grade;
  if(pct === 100) grade = I18N.t('grade100');
  else if(pct >= 80) grade = I18N.t('grade80');
  else if(pct >= 60) grade = I18N.t('grade60');
  else if(pct >= 40) grade = I18N.t('grade40');
  else grade = I18N.t('grade0');
  $("grade").textContent = grade + " (" + totalOk + "/" + order.length + I18N.t('answersSuffix');

  // récap par catégorie
  const recap = $("recap");
  recap.innerHTML = "";
  [["mes",I18N.t('catMes')],["des",I18N.t('catDes')],["mal",I18N.t('catMal')]].forEach(([k,name]) => {
    const st = stats[k];
    const div = document.createElement("div");
    div.className = "item " + k;
    div.innerHTML = "<h3>" + name + "</h3><p>" + st.ok + " / " + st.tot + I18N.t('wellIdentified') + "</p>";
    recap.appendChild(div);
  });
  $("barfill").style.width = "100%";
}

// Raccourcis clavier : 1=més, 2=dés, 3=mal, Entrée=suivant
document.addEventListener("keydown", e => {
  if($("game").classList.contains("hidden")) return;
  if(!answered){
    if(e.key === "1") answer("mes");
    if(e.key === "2") answer("des");
    if(e.key === "3") answer("mal");
  } else if(e.key === "Enter") {
    nextQuestion();
  }
});
