/* ============================================================
   RÉSO — moteur de dialogue local (aucune connexion requise)
   ============================================================ */

const HINT_AFTER = 2;
const AUTO_ADVANCE_AFTER = 5;
const STORAGE_KEY = "reso_alberte_save_v1";
const WEB3FORMS_ACCESS_KEY = "ef1fe549-c616-4a27-a6c2-97f06caa913d";

/* --- État --- */
let idx = 0;
let busy = false;
let mode = "normal";   // "normal" (avec suggestions) | "avance" (sans aide)
let pendingFollow = null; // scénario en attente d'une explication (« pourquoi ? »)
let pendingPhotoHint = null; // sous-étape : expliquer comment prendre puis envoyer une photo
let buttonConfusionShown = false; // gag « bouton de radio » (une seule fois)
let failCount = 0;        // échecs sur l'étape courante
let riskScore = 0;        // jauge de risque cumulée (0-100)
let lastVariant = "";
const transcript = [];

const $ = id => document.getElementById(id);
const msgs = $("msgs"), input = $("input"), sendBtn = $("send"), chipsBox = $("chips");

/* --- Normalisation (accents/apostrophes) pour la détection --- */
function norm(s){
  return s.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g,"")
    .replace(/['’`-]/g," ")
    .replace(/\s+/g," ").trim();
}
function hit(text, kws){ return kws.some(k => text.includes(norm(k))); }
function isOffTopic(text){ return FILLER_PATTERNS.some(p => text.includes(norm(p))); }
function checkAnachronism(text){ const a = ANACHRONISMS.find(a => hit(text, a.kw)); return a ? a.reply : null; }
function findHistEcho(text){ const h = HIST_ECHO.find(h => hit(text, h.kw)); return h ? h.echo : null; }
function checkSafety(text){
  if(SUICIDE_KW.some(k => text.includes(norm(k)))) return "suicide";
  if(VIOLENT_KW.some(k => text.includes(norm(k)))) return "violent";
  return null;
}
function pickVariant(list){
  let c;
  do{ c = list[Math.floor(Math.random()*list.length)]; } while(list.length > 1 && c === lastVariant);
  lastVariant = c;
  return c;
}
function stripHtml(html){ const d = document.createElement("div"); d.innerHTML = html; return d.textContent; }

/* --- Ajout de messages --- */
function addMsg(who, text, cls=""){
  const row = document.createElement("div");
  row.className = "row" + (who==="me" ? " me":"");
  const b = document.createElement("div");
  b.className = "bubble " + (cls || who);
  b.innerHTML = text;
  row.appendChild(b);
  msgs.appendChild(row);
  msgs.scrollTop = msgs.scrollHeight;
  transcript.push({ who, text: stripHtml(text) });
}
function typing(){
  const row = document.createElement("div");
  row.className="row";row.id="typing";
  row.innerHTML='<div class="bubble alberte typing"><span></span><span></span><span></span></div>';
  msgs.appendChild(row);msgs.scrollTop=msgs.scrollHeight;
}
function stopTyping(){ const t=$("typing"); if(t) t.remove(); }

/* --- Alberte parle (avec délai réaliste) --- */
function alberteSay(lines, cb){
  let i=0;
  const next=()=>{
    if(i>=lines.length){ cb&&cb(); return; }
    typing();
    const visibleLen = stripHtml(lines[i]).length; // le balisage (ex. <img>) ne doit pas gonfler le délai de frappe
    setTimeout(()=>{
      stopTyping();
      addMsg("alberte", lines[i], "alberte");
      i++;
      setTimeout(next, 350);
    }, 650 + visibleLen*12);
  };
  next();
}

/* --- Puces de suggestion --- */
function showChips(list){
  chipsBox.innerHTML="";
  if(mode === "avance") return;   // mode Avancé : aucune suggestion
  list.forEach(c=>{
    const el=document.createElement("div");
    el.className="chip";el.textContent=c;
    el.onclick=()=>{ input.value=c; input.focus(); };
    chipsBox.appendChild(el);
  });
}

/* --- Puce de fin de conversation (scénario finale) : le joueur choisit quand refermer --- */
function showEndChip(){
  chipsBox.innerHTML="";
  const el=document.createElement("div");
  el.className="chip";el.textContent="Fin de la conversation";
  el.onclick=()=>{ chipsBox.innerHTML=""; nextScenario(); };
  chipsBox.appendChild(el);
}

/* --- Avatar (photo de profil, réelle dès le départ — c'est justement ce qu'il faudra repérer) --- */
function setAvatarAnon(){ $("avatar").innerHTML = '<div class="avatar-emoji">😎</div>'; }

/* --- Jauge de risque / barre de progression --- */
function updateRisk(delta){
  riskScore = Math.max(0, Math.min(100, riskScore + delta));
  const el = $("riskFill");
  el.style.width = riskScore + "%";
  el.style.background = riskScore < 33 ? "var(--accent)" : riskScore < 66 ? "var(--warn)" : "var(--danger)";
}
function updateProgress(){ $("progFill").style.width = Math.round(idx / SCENARIOS.length * 100) + "%"; }

/* --- Sauvegarde / reprise --- */
function saveState(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify({ idx, mode, riskScore, ts: Date.now() })); }catch(e){}
}
function clearSavedState(){ try{ localStorage.removeItem(STORAGE_KEY); }catch(e){} }
function loadSavedState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return null;
    const s = JSON.parse(raw);
    if(s && s.idx > 0 && s.idx < SCENARIOS.length) return s;
  }catch(e){}
  return null;
}
function resumeGame(){
  const saved = loadSavedState();
  if(!saved) return;
  mode = saved.mode || "normal";
  idx = saved.idx;
  riskScore = saved.riskScore || 0;
  $("intro").classList.add("hidden");
  input.disabled=false; sendBtn.disabled=false;
  updateRisk(0); updateProgress();
  addMsg("Système", "↻ Reprise de la partie à l'étape " + (idx+1) + "/" + SCENARIOS.length + ".", "sys");
  loadScenario();
  input.focus();
}

/* --- Export de la conversation --- */
function transcriptText(){
  return transcript.map(e => "[" + e.who + "] " + e.text).join("\n\n");
}
function exportTranscript(){
  const blob = new Blob([transcriptText()], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "reso-alberte-transcript.txt";
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

/* --- Envoi via Web3Forms (commentaires + conversations terminées) --- */
async function sendWeb3Form(subject, name, email, message){
  try{
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, subject, name, email, message })
    });
    const data = await res.json();
    return !!data.success;
  }catch(e){ return false; }
}

function openFeedback(){ $("feedbackModal").classList.remove("hidden"); }
function closeFeedback(){ $("feedbackModal").classList.add("hidden"); $("fb-status").textContent=""; }

/* --- Récap des points clés (notes de tous les scénarios) --- */
function openRecap(){
  $("recapList").innerHTML = SCENARIOS.filter(sc => sc.note).map(sc =>
    '<div class="bubble note"><span class="note-h">'+sc.note.h+'</span>'+sc.note.t+'</div>'
  ).join("");
  $("recapModal").classList.remove("hidden");
}
function closeRecap(){ $("recapModal").classList.add("hidden"); }
async function sendFeedback(){
  const msg = $("fb-message").value.trim();
  const email = $("fb-email").value.trim();
  if(!msg){ $("fb-status").textContent = "Écris un message avant d'envoyer."; return; }
  $("fb-status").textContent = "Envoi…";
  const ok = await sendWeb3Form("RÉSO — Commentaire joueur", "Joueur RÉSO", email || "non renseigné", msg);
  $("fb-status").textContent = ok ? "Merci, c'est envoyé !" : "Erreur d'envoi, réessaie plus tard.";
  if(ok){
    $("fb-message").value=""; $("fb-email").value="";
    setTimeout(closeFeedback, 1400);
  }
}

/* --- Envoi automatique de la conversation une fois la partie terminée --- */
function sendCompletedConversation(){
  const header = "Mode : " + mode + " | Niveau de risque final : " + riskScore + "%\n\n";
  sendWeb3Form("RÉSO — Conversation terminée", "Jeu RÉSO (auto)", "non renseigné", header + transcriptText());
}

/* --- Démarrage --- */
function startGame(m){
  mode = m || "normal";
  idx = 0; riskScore = 0; failCount = 0;
  clearSavedState();
  $("intro").classList.add("hidden");
  updateRisk(0); updateProgress();
  alberteSay(INTRO_ALBERTE, ()=>{
    input.disabled=false; sendBtn.disabled=false;
    loadScenario();
    input.focus();
  });
}

function loadScenario(){
  const sc = SCENARIOS[idx];
  pendingFollow = null;
  pendingPhotoHint = null;
  failCount = 0;
  if(sc.good && sc.good.parts) sc.good.parts.forEach(p => p.done = false);
  chipsBox.innerHTML="";
  updateProgress();
  saveState();
  alberteSay(sc.intro, ()=> showChips(sc.chips));
}

/* --- Relance générique (indice progressif + garde-fou anti-blocage) --- */
function guardOrRetry(sc){
  failCount++;
  if(failCount >= AUTO_ADVANCE_AFTER){
    if(sc.id === "profil") setAvatarAnon();
    addMsg("Système", "🔓 <b>On retient la leçon pour cette fois, on continue…</b>", "sys");
    setTimeout(()=>{
      addMsg("note", '<span class="note-h">'+sc.note.h+'</span>'+sc.note.t, "note");
      if(sc.type === "finale") showEndChip(); else setTimeout(nextScenario, 900);
    }, 500);
    return true;
  }
  return false;
}
function reprompt(sc, variants){
  if(guardOrRetry(sc)) return;
  let msg = pickVariant(variants);
  if(failCount >= HINT_AFTER) msg += "  Un indice : " + sc.note.t;
  alberteSay([msg], ()=>{ showChips(sc.chips); unlock(); });
}

/* --- Envoi du conseil --- */
function handleSend(){
  if(busy) return;
  const raw = input.value.trim();
  if(!raw) return;
  addMsg("me", raw, "me");
  input.value="";
  chipsBox.innerHTML="";
  const text = norm(raw);
  const sc = SCENARIOS[idx];
  const activeChips = pendingFollow ? (pendingFollow.good.followChips || sc.chips) : sc.chips;
  busy=true; input.disabled=true; sendBtn.disabled=true;

  // cadre scolaire : priorité absolue à la sécurité
  const safety = checkSafety(text);
  if(safety === "suicide"){
    addMsg("Système", "💬 Ce que tu écris semble important. Si tu traverses un moment difficile, n'hésite pas à en parler à un adulte de confiance. En France, le <b>3114</b> (numéro national de prévention du suicide, gratuit, 24h/24) est là pour t'écouter.", "sys care");
    setTimeout(()=>{ alberteSay([pickVariant(RETRY_VARIANTS)], ()=>{ showChips(activeChips); unlock(); }); }, 600);
    return;
  }
  if(safety === "violent"){
    alberteSay(["Ce n'est pas ainsi qu'on agit, même dans une guerre aussi dure que celle-ci. La violence gratuite n'est pas notre chemin, et ce n'est pas ce que je t'ai demandé."], ()=>{
      showChips(activeChips); unlock();
    });
    return;
  }

  // en attente d'explications pour prendre puis envoyer une photo
  if(pendingPhotoHint){ handlePhotoHint(pendingPhotoHint, text); return; }

  // en attente d'une explication au « pourquoi ? » d'Alberte
  if(pendingFollow){ handleFollow(pendingFollow, text); return; }

  // mots modernes/anglicismes qui doivent perturber Alberte
  const ana = checkAnachronism(text);
  if(ana){
    alberteSay([ana], ()=>{ showChips(activeChips); unlock(); });
    return;
  }

  // gag : un « bouton » évoque d'abord à Alberte un bouton de réglage qui tourne, tant que ce n'est pas précisé
  if(sc.gag && !buttonConfusionShown && hit(text,["bouton"]) && !hit(text, sc.gag.excludeKw)){
    buttonConfusionShown = true;
    const imgHtml = '<img src="'+sc.gag.img+'" alt="'+sc.gag.alt+'" style="max-width:170px;display:block;margin:2px auto 10px;border-radius:10px;border:1px solid #4a3c28">';
    alberteSay([imgHtml + sc.gag.reply], ()=>{
      showChips(sc.chips); unlock();
    });
    return;
  }

  // réponses hors-sujet (évite les faux positifs sur un mot-clé isolé et incident)
  if(isOffTopic(text)){ reprompt(sc, UNKNOWN_VARIANTS); return; }

  // insistance après un premier mauvais réflexe déjà signalé : le risque grandit encore, sans qu'Alberte se déjuge
  if(failCount > 0 && sc.bad.insistKw && hit(text, sc.bad.insistKw)){
    updateRisk(18);
    addMsg("Alerte", "⚠️ <b>Elle insiste…</b> Ce choix reste tout aussi dangereux. Le risque grandit encore.", "sys danger");
    if(riskScore >= 100){ setTimeout(loseGame, 600); return; }
    setTimeout(()=>{ reprompt(sc, RETRY_VARIANTS); }, 500);
    return;
  }

  // scénario à consignes multiples : chaque partie doit être traitée avant de valider
  if(sc.good.parts){ handleParts(sc, text); return; }

  // priorité au bon réflexe (avec mots-clés élargis après un échec), puis au mauvais, sinon incompris
  const extra = (failCount > 0 && sc.good.retryKw) ? sc.good.retryKw : [];
  if(hit(text, sc.good.kw.concat(extra))){
    reactGood(sc, text);
  } else if(hit(text, sc.bad.kw)){
    reactBad(sc, text);
  } else {
    reprompt(sc, UNKNOWN_VARIANTS);
  }
}

/* --- Scénario à consignes multiples (ex. luminosité + son) : valide partie par partie --- */
function handleParts(sc, text){
  const parts = sc.good.parts;
  const newlyDone = parts.filter(p => !p.done && hit(text, p.kw));
  if(newlyDone.length === 0){
    if(hit(text, sc.bad.kw)){ reactBad(sc, text); return; }
    reprompt(sc, UNKNOWN_VARIANTS);
    return;
  }
  newlyDone.forEach(p => p.done = true);
  const stillMissing = parts.filter(p => !p.done);
  if(stillMissing.length === 0){ reactGood(sc, text); return; }
  failCount = 0;
  const lines = [newlyDone.map(p => p.ack).join(" "), stillMissing.map(p => p.missing).join(" ")];
  alberteSay(lines, ()=>{ showChips(stillMissing[0].chips || sc.chips); unlock(); });
}

function reactGood(sc, text){
  failCount = 0;
  updateRisk(-6);
  const echo = findHistEcho(text);
  const lines = echo ? [echo, sc.good.reply] : [sc.good.reply];

  // scénario avec relance « pourquoi ? » : Alberte demande une explication avant d'être convaincue
  if(sc.good.followKw){
    pendingFollow = sc;
    alberteSay(lines, ()=>{
      showChips(sc.good.followChips || []);
      unlock();
    });
    return;
  }
  alberteSay(lines, ()=>{
    if(sc.id === "profil") setAvatarAnon();
    addMsg("note", '<span class="note-h">'+sc.note.h+'</span>'+sc.note.t, "note");
    if(sc.type === "finale") showEndChip(); else setTimeout(nextScenario, 900);
  });
}

function handleFollow(sc, text){
  if(hit(text, sc.good.followKw)){
    pendingFollow = null;
    alberteSay([sc.good.followReply], ()=>{
      addMsg("note", '<span class="note-h">'+sc.note.h+'</span>'+sc.note.t, "note");
      setTimeout(nextScenario, 900);
    });
  } else if(sc.good.hintKw && hit(text, sc.good.hintKw)){
    if(sc.good.photoParts){
      pendingPhotoHint = sc;
      sc.good.photoParts.forEach(p => p.done = false);
      alberteSay([sc.good.hintAsk], ()=>{
        showChips(sc.good.photoParts[0].chips || []);
        unlock();
      });
    } else {
      alberteSay([sc.good.hintReply], ()=>{
        showChips(sc.good.followChips || []);
        unlock();
      });
    }
  } else {
    if(sc.good.followRetryRisk) updateRisk(sc.good.followRetryRisk);
    alberteSay([sc.good.followRetry || "Je ne saisis pas encore bien… qu'est-ce que cette photographie pourrait révéler à l'ennemi ?"], ()=>{
      if(sc.good.followRetryRisk){
        addMsg("Alerte", "⚠️ <b>Mauvaise prise.</b> Forcer la mauvaise fiche risquerait de tout faire sauter — le risque grandit.", "sys danger");
      }
      if(riskScore >= 100){ setTimeout(loseGame, 600); return; }
      showChips(sc.good.followChips || []);
      unlock();
    });
  }
}

/* --- Sous-étape « recharge » : expliquer comment prendre puis envoyer la photo de la prise --- */
function handlePhotoHint(sc, text){
  const parts = sc.good.photoParts;
  const newlyDone = parts.filter(p => !p.done && hit(text, p.kw));
  if(newlyDone.length === 0){ reprompt(sc, UNKNOWN_VARIANTS); return; }
  newlyDone.forEach(p => p.done = true);
  const stillMissing = parts.filter(p => !p.done);
  failCount = 0;
  if(stillMissing.length){
    const lines = [newlyDone.map(p => p.ack).join(" "), stillMissing.map(p => p.missing).join(" ")];
    alberteSay(lines, ()=>{ showChips(stillMissing[0].chips || []); unlock(); });
    return;
  }
  pendingPhotoHint = null;
  const lines = [newlyDone.map(p => p.ack).join(" "), sc.good.hintReply];
  alberteSay(lines, ()=>{
    showChips(sc.good.followChips || []);
    unlock();
  });
}

function reactBad(sc, text){
  updateRisk(14);
  const echo = findHistEcho(text);
  const lines = echo ? [echo, sc.bad.reply] : [sc.bad.reply];
  alberteSay(lines, ()=>{
    addMsg("Alerte", "⚠️ <b>Mauvais réflexe.</b> " + (sc.bad.alertText || "Reconseille Alberte pour la protéger."), "sys danger");
    if(riskScore >= 100){ setTimeout(loseGame, 600); return; }
    setTimeout(()=>{ reprompt(sc, RETRY_VARIANTS); }, 800);
  });
}

function unlock(){
  busy=false; input.disabled=false; sendBtn.disabled=false; input.focus();
}

function nextScenario(){
  idx++;
  if(idx >= SCENARIOS.length){ endGame(); return; }
  updateProgress();
  saveState();
  setTimeout(()=>{ unlock(); loadScenario(); }, 700);
}

function endGame(){
  input.disabled=true; sendBtn.disabled=true;
  updateProgress();
  clearSavedState();
  $("scoreBox").innerHTML = "Niveau de risque final : <b>" + riskScore + "%</b>";
  $("win").classList.remove("hidden");
  sendCompletedConversation();
}

/* --- Défaite : le risque a atteint 100%, il faut recommencer --- */
function loseGame(){
  busy = true; input.disabled = true; sendBtn.disabled = true;
  clearSavedState();
  $("loseScore").innerHTML = "Niveau de risque final : <b>" + riskScore + "%</b>";
  $("lose").classList.remove("hidden");
  sendCompletedConversation();
}

/* --- Proposer la reprise si une partie était en cours --- */
(function initResume(){
  const saved = loadSavedState();
  if(saved){
    const btn = $("resumeBtn");
    btn.textContent = "↻ Reprendre à l'étape " + (saved.idx+1) + "/" + SCENARIOS.length;
    btn.classList.remove("hidden");
  }
})();

/* --- Entrée clavier --- */
input.addEventListener("keydown", e=>{ if(e.key==="Enter") handleSend(); });
