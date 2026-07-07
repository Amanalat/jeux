/* =========================================================================
   SCAM RADAR — Game logic
   Depends on scenarios.js (global SCENARIOS variable).
   ========================================================================= */

(function () {
  'use strict';

  var CARTES_PAR_PARTIE = 14;   // number of cards played per game (balanced)
  var app, hud, barFill, barLbl, scoreEl;
  var deck = [], idx = 0, score = 0, repondu = false;

  /* clue-spotting phase (after the decision) */
  var REP = (typeof REPERES !== 'undefined') ? REPERES : {};
  var reperesActifs = [], foundBon = 0, currentChoix = null;
  /* two-level hint: 1 = written clue, 2 = show the location */
  var hintIdx = -1, hintStep = 0;

  /* glossary state (automatic word spotting) */
  var GLOSS = (typeof GLOSSAIRE !== 'undefined') ? GLOSSAIRE : [];
  var glossParKey = {}, glossParAlias = {}, glossRegex = null;

  /* ---------- utilities ---------- */
  function el(id){ return document.getElementById(id); }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
  function initiales(nom){ return (nom||'?').replace(/[^A-Za-zÀ-ÿ ]/g,'').trim().split(/\s+/).map(function(m){return m[0];}).slice(0,2).join('').toUpperCase() || '?'; }
  // turns http(s) URLs in text into visible fake links (not clickable)
  function liens(t){ return esc(t).replace(/(https?:\/\/[^\s]+)/g, '<span class="lien">$1</span>'); }
  function escapeReg(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  // builds the glossary term index and matching regular expression
  function prepareGlossaire(){
    var alias = [];
    GLOSS.forEach(function(g){
      glossParKey[g.key] = g;
      (g.aliases||[]).forEach(function(a){ glossParAlias[a.toLowerCase()] = g.key; alias.push(a); });
    });
    // longest first to avoid partial matches
    alias.sort(function(a,b){ return b.length - a.length; });
    if (alias.length) glossRegex = new RegExp('(' + alias.map(escapeReg).join('|') + ')', 'gi');
  }

  // escapes text THEN makes glossary words clickable
  function gl(txt){
    var s = esc(txt);
    if (!glossRegex) return s;
    return s.replace(glossRegex, function(m){
      var key = glossParAlias[m.toLowerCase()];
      if (!key) return m;
      return '<span class="gloss" data-g="' + key + '" role="button" tabindex="0" title="See the definition">' + m + '</span>';
    });
  }

  /* ---------- text size setting ---------- */
  function setTaille(v, btn){
    document.documentElement.style.setProperty('--taille', v);
    var b = document.querySelectorAll('.textsize button');
    for (var i=0;i<b.length;i++) b[i].classList.remove('on');
    if (btn) btn.classList.add('on');
    try { localStorage.setItem('radar_taille', v); } catch(e){}
  }

  /* =====================================================================
     HOME SCREEN
     ===================================================================== */
  function ecranAccueil(){
    hud.style.display = 'none';
    var mb = el('menu-btn'); if (mb) mb.style.display = 'none';
    app.innerHTML =
      '<div class="panel hero">' +
        '<div class="big-em">🛡️</div>' +
        '<h1>Can you outsmart scams&nbsp;?</h1>' +
        '<p class="lead">Messages, emails and calls like the ones you really receive. ' +
        'For each one, decide whether it is <b>reliable</b> or whether you should <b>be suspicious</b>. ' +
        'No technical traps: you will learn the right reflexes.</p>' +
        '<div class="how">' +
          '<div class="step"><div class="n">1</div><div>Read the message shown (SMS, email, call…).</div></div>' +
          '<div class="step"><div class="n">2</div><div>Choose: <b>“It’s a scam”</b> or <b>“It’s reliable”</b>.</div></div>' +
          '<div class="step"><div class="n">3</div><div>Find the clues that prove whether you can trust the message or should be suspicious.</div></div>' +
        '</div>' +
        '<div class="accueil-boutons">' +
          '<button class="btn-start" id="go">Start&nbsp;▶</button>' +
          '<button class="btn-gloss" id="voir-mots">📖 Words to know</button>' +
        '</div>' +
        '<p class="footer-note">No data is sent. This game is only for practice.</p>' +
      '</div>';
    el('go').onclick = demarrer;
    el('voir-mots').onclick = function(){ openGlossaire(); };
  }

  /* =====================================================================
     STARTING A GAME
     ===================================================================== */
  function demarrer(){
    fermerGlossaire();
    // BALANCED draw: as many scams as reliable messages where possible
    var arnaques = shuffle(SCENARIOS.filter(function(c){ return c.verdict==='arnaque'; }));
    var fiables  = shuffle(SCENARIOS.filter(function(c){ return c.verdict==='fiable';  }));
    var total = Math.min(CARTES_PAR_PARTIE, SCENARIOS.length);
    var moitie = Math.floor(total/2);
    var nbFiables  = Math.min(moitie, fiables.length);
    var nbArnaques = Math.min(total - nbFiables, arnaques.length);
    nbFiables = Math.min(total - nbArnaques, fiables.length); // récupère la place restante
    deck = shuffle(arnaques.slice(0, nbArnaques).concat(fiables.slice(0, nbFiables)));
    idx = 0; score = 0;
    hud.style.display = 'flex';
    var mb = el('menu-btn'); if (mb) mb.style.display = '';
    montrerCarte();
  }

  function majHud(){
    var pct = Math.round((idx) / deck.length * 100);
    barFill.style.width = pct + '%';
    barLbl.textContent = 'Message ' + (idx+1) + ' of ' + deck.length;
    scoreEl.innerHTML = '✔ <b>' + score + '</b>&nbsp;/&nbsp;' + deck.length;
  }

  /* =====================================================================
     DISPLAYING A CARD
     ===================================================================== */
  function montrerCarte(){
    repondu = false;
    currentChoix = null;
    majHud();
    var c = deck[idx];
    reperesActifs = c.reperes || REP[c.id] || [];
    foundBon = 0;
    app.innerHTML =
      '<div class="panel">' +
        '<div class="entete">' + esc(c.entete || contexteParDefaut(c)) + '</div>' +
        '<div id="maquette">' + renderMaquette(c) + '</div>' +
      '</div>' +
      '<div class="panel"><div id="lower"></div></div>';

    // shows the whole message, then makes it clickable: investigate before deciding
    var host = document.querySelector('#maquette [data-anim]');
    if (host) host.innerHTML = itemsFor(c).join('');
    if (reperesActifs.length){
      el('maquette').classList.add('mode-spot');
      activerReperes(el('maquette'), reperesActifs);
      entrerSpotting();
    } else {
      phaseDecision();
    }
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function contexteParDefaut(c){
    switch(c.canal){
      case 'sms': return 'SMS received';
      case 'email': return 'Email received';
      case 'chat': return 'Message received';
      case 'appel': return 'Phone call';
      case 'notif': return 'Notification shown on screen';
      case 'image': return 'Publication vue of les réseaux sociaux';
    }
    return '';
  }

  /* ---------- rendering by channel ---------- */
  function renderMaquette(c){
    switch(c.canal){
      case 'sms':   return renderSMS(c);
      case 'email': return renderEmail(c);
      case 'chat':  return renderChat(c);
      case 'appel': return renderAppel(c);
      case 'notif': return renderNotif(c);
      case 'image': return renderImage(c);
    }
    return '';
  }

  function renderSMS(c){
    return '<div class="phone">' +
      '<div class="bar"><div class="from">' + esc(c.expediteur) + '</div><div class="sub">Text message · today</div></div>' +
      '<div class="thread" data-anim="sms"></div>' +
    '</div>';
  }

  function renderChat(c){
    var messenger = /messenger/i.test(c.plateforme);
    var av = c.avatar ? '<img src="'+esc(c.avatar)+'" alt="">' : (initiales(c.contact) || '👤');
    return '<div class="chat ' + (messenger?'messenger':'') + '">' +
      '<div class="head"><div class="av">' + av + '</div>' +
        '<div><div class="nm">' + esc(c.contact) + '</div><div class="st">' + esc(c.plateforme) + ' · online</div></div></div>' +
      '<div class="body" data-anim="chat"></div>' +
    '</div>';
  }

  function renderEmail(c){
    var att = '';
    if (c.piecesJointes && c.piecesJointes.length){
      att = c.piecesJointes.map(function(p){ return '<span class="att">'+esc(p)+'</span>'; }).join(' ');
    }
    var cta = c.bouton ? '<a class="cta" onclick="return false" href="#">'+esc(c.bouton)+'</a>' : '';
    return '<div class="mail">' +
      '<div class="hd">' +
        '<div class="obj">' + esc(c.objet) + '</div>' +
        '<div class="row"><div class="av">' + initiales(c.de) + '</div>' +
          '<div class="who"><div class="nm">' + esc(c.de) + '</div>' +
          '<div class="ad">&lt;' + esc(c.deAdresse) + '&gt; · ' + esc(c.date||'') + '</div></div></div>' +
      '</div>' +
      '<div class="body">' + liens_html(c.corps) + (att?('<div>'+att+'</div>'):'') + cta + '</div>' +
    '</div>';
  }

  function renderNotif(c){
    return '<div class="notif ' + (c.fond||'info') + '">' +
      '<div class="top"><span class="ic">' + (c.appIcon||'🔔') + '</span>' + esc(c.app||'Notification') + '</div>' +
      '<div class="cont"><div class="t">' + esc(c.titre) + '</div><div>' + esc(c.texte) + '</div></div>' +
    '</div>';
  }

  function renderImage(c){
    return '<div class="social">' +
      '<div class="sh"><div class="av">📷</div><div><div class="nm">Actu Choc 24</div><div class="mt">Page · Sponsorisé</div></div></div>' +
      '<img class="big" src="' + esc(c.image) + '" alt="Image partagée of les réseaux">' +
      '<div class="cap">' + esc(c.legende) + '</div>' +
    '</div>';
  }

  function renderAppel(c){
    return '<div class="call"><div class="screen">' +
      '<div class="avat">📞</div>' +
      '<div class="name">' + esc(c.afficheur) + '</div>' +
      '<div class="num">' + esc(c.numero||'') + '</div>' +
      '<div class="state">Call in progress…</div>' +
      '<div class="keys"><div class="k red">✕</div><div class="k green">✓</div></div>' +
      '</div><div class="transcript" data-anim="call"></div></div>';
  }

  // email body: allows simple HTML already present in the data
  // (the data comes from the game, not from user input)
  function liens_html(html){ return html; }

  /* ---------- builds the message bubbles (SMS/chat/call) ---------- */
  function itemsFor(c){
    if (c.canal === 'sms'){
      return c.messages.map(function(m){
        if (m && typeof m === 'object' && m.photo){
          return '<div class="bubble bubble-photo">' +
            '<div class="fauxphoto" role="img" aria-label="Photo of a parcel with a label showing the recipient’s name">' +
              '<div class="fp-scene">📦</div>' +
              '<span class="fp-hand">🧤</span>' +
              '<div class="fp-tag"><span class="fp-hd">RECIPIENT</span><b>' + esc(m.nom) + '</b>' +
                '<span class="fp-bar">‖│┃║▏▎│┃‖│▏║</span></div>' +
            '</div>' +
            (m.legende ? '<div class="fp-cap">' + esc(m.legende) + '</div>' : '') +
          '</div>';
        }
        return '<div class="bubble">'+liens(m)+'</div>';
      });
    }
    if (c.canal === 'chat'){
      return c.messages.map(function(m){
        if (m.voix){
          return '<div class="msg"><div class="voicebar"><span class="play">▶</span><span class="wave"></span><span class="t">'+esc(m.voix)+'</span></div></div>';
        }
        return '<div class="msg">'+esc(m.texte)+'<div class="h">'+(m.heure||'')+' ✓✓</div></div>';
      });
    }
    if (c.canal === 'appel'){
      return c.transcript.map(function(l){
        var who = l.qui==='vous' ? 'You' : 'The person on the phone';
        return '<div class="l '+(l.qui==='vous'?'vous':'')+'"><span class="who">'+who+'</span>'+esc(l.texte)+'</div>';
      });
    }
    return [];
  }

  /* message-by-message animation */
  function animerMessages(c){
    var host = document.querySelector('#maquette [data-anim]');
    if (!host) return;
    sequence(itemsFor(c), host);
  }

  function sequence(items, host){
    var i = 0;
    (function next(){
      if (i >= items.length) return;
      host.insertAdjacentHTML('beforeend', items[i]);
      i++;
      if (i < items.length) setTimeout(next, 620);
    })();
  }

  /* =====================================================================
     ANSWER + CORRECTION
     ===================================================================== */
  function repondre(choix){
    if (repondu) return;
    repondu = true;
    currentChoix = choix;
    var c = deck[idx];
    var bon = (choix === c.verdict);
    if (bon) score++;

    var ba = el('b-arnaque'), bf = el('b-fiable');
    if (ba) ba.disabled = true;
    if (bf) bf.disabled = true;
    var chosen = el(choix==='arnaque' ? 'b-arnaque' : 'b-fiable');
    if (chosen) chosen.classList.add('choisi');

    montrerCorrection(bon);
  }

  /* ---------- 1) INVESTIGATION phase: spot clues BEFORE deciding ---------- */
  function entrerSpotting(){
    hintIdx = -1; hintStep = 0;
    var totalBon = reperesActifs.filter(function(r){ return r.bon; }).length;
    el('lower').innerHTML =
      '<div class="spot-consigne"><b>Étape 1 — Enquêtez.</b> Cliquez, dans le message, of les <b>éléments qui vous mettent la puce à l’oreille</b> (ou, au contraire, qui rassurent) 👆<small>With each click, you are told whether it is a real clue — and what it means. Nothing is highlighted: it is up to you to investigate.</small></div>' +
      '<div class="spot-compteur" id="spot-compteur" data-total="' + totalBon + '">Clues found: <b>0</b> / ' + totalBon + '</div>' +
      '<div class="spot-actions">' +
        '<button class="hint-btn" id="coup-pouce">💡 Hint</button>' +
      '</div>' +
      '<div class="hint-box" id="hint-box" hidden></div>' +
      '<button class="next" id="go-decide">I have investigated, I decide ▶</button>';
    el('coup-pouce').onclick = coupDePouce;
    el('go-decide').onclick = phaseDecision;
    window.scrollTo({top:0, behavior:'smooth'});
  }

  /* ---------- 2) DECISION phase: after investigating, make a call ---------- */
  function phaseDecision(){
    hidePop();
    el('lower').innerHTML =
      '<div class="consigne"><b>Step 2 — Your verdict.</b> Based on the clues, what do you do with this message?<small>Do you distrust it, or can you trust it?</small></div>' +
      '<div class="decide">' +
        '<button class="btn-arnaque" id="b-arnaque"><span class="em">🚨</span>Be suspicious<small>It’s a scam</small></button>' +
        '<button class="btn-fiable" id="b-fiable"><span class="em">✅</span>Trust it<small>It’s reliable</small></button>' +
      '</div>' +
      '<button class="hint-btn" id="retour-enquete" style="margin-top:10px">↩ Go back to the investigation</button>';
    el('b-arnaque').onclick = function(){ repondre('arnaque'); };
    el('b-fiable').onclick  = function(){ repondre('fiable'); };
    var rb = el('retour-enquete'); if (rb) rb.onclick = entrerSpotting;
    window.scrollTo({top:0, behavior:'smooth'});
  }

  // makes the fragments defined in the clues clickable
  function activerReperes(root, reperes){
    reperes.forEach(function(r, i){
      if (r.texte === '__IMG__'){
        var img = root.querySelector('img.big, .fauxphoto');
        if (img){ img.classList.add('repere'); img.setAttribute('data-i', i); }
        return;
      }
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var node;
      while ((node = walker.nextNode())){
        var pos = node.nodeValue.indexOf(r.texte);
        if (pos >= 0){
          var range = document.createRange();
          range.setStart(node, pos);
          range.setEnd(node, pos + r.texte.length);
          var span = document.createElement('span');
          span.className = 'repere';
          span.setAttribute('data-i', i);
          try { range.surroundContents(span); } catch(e){ break; }
          break;
        }
      }
    });
    root.addEventListener('click', function(e){
      if (!root.classList.contains('mode-spot')) return;
      // click inside the explanation pop-up (or on a glossary word): let it happen
      if (e.target.closest && (e.target.closest('.spot-pop') || e.target.closest('.gloss'))) return;
      var t = e.target.closest ? e.target.closest('.repere') : null;
      if (t) clicRepere(parseInt(t.getAttribute('data-i'), 10), t);
      else clicVide(e);            // the player clicked beside a clue: give feedback
    });
  }

  function clicRepere(i, span){
    var r = reperesActifs[i];
    if (!r) return;
    if (r.bon){
      if (!span.classList.contains('trouve')){
        span.classList.remove('hint-flash');
        span.classList.add('trouve');
        foundBon++;
        majCompteur();
        // l'indice est trouvé : le coup de pouce repart de zéro of le suivant
        hintIdx = -1; hintStep = 0; hideAide(); resetHintBtn();
      }
      var est = deck[idx].verdict === 'arnaque';
      var lbl = est ? '🚩 Suspicious sign — ' : '✅ Reassuring sign — ';
      showPop(span, 'ok', lbl + r.note);   // show the explanation again if clicked again
    } else {
      span.classList.add('decoy');
      showPop(span, 'ko', '🅾️ False clue — ' + (r.note || 'this detail catches the eye, but it is not the real sign.'));
    }
  }

  // click beside a clue: reassuring feedback at the click location
  function clicVide(e){
    showPopAt(e, 'miss', 'Nothing useful here. Look for details that seem unusual: the sender, a link, the tone, urgency, a request for money or a code…');
  }

  function majCompteur(){
    var cmp = el('spot-compteur');
    if (cmp) cmp.innerHTML = 'Clues spotted: <b>' + foundBon + '</b> / ' + cmp.getAttribute('data-total');
  }

  /* ---------- Two-level hint ----------
     1st click: a WRITTEN clue that encourages thinking (« Penses-tu qu'une star… »).
     2nd click: SHOW the location by making it flash.
     Once a clue is found, reset to level 1 for the next one. */
  function coupDePouce(){
    var maq = el('maquette'); if (!maq) return;
    var next = -1;
    reperesActifs.forEach(function(r, i){
      if (next >= 0 || !r.bon) return;
      var s = maq.querySelector('.repere[data-i="' + i + '"]');
      if (s && !s.classList.contains('trouve')) next = i;
    });
    var btn = el('coup-pouce');
    if (next < 0){ if (btn){ btn.disabled = true; btn.textContent = '💡 Everything spotted ✓'; } hideAide(); return; }

    // new target → start again at level 1
    if (next !== hintIdx){ hintIdx = next; hintStep = 0; }
    hintStep++;
    var r = reperesActifs[next];

    if (hintStep === 1 && r.aide){
      // Level 1: written clue, without revealing the location
      showAide(r.aide);
      if (btn) btn.textContent = '👀 Show me where';
    } else {
      // Level 2 (or no written clue available): show the place
      var span = maq.querySelector('.repere[data-i="' + next + '"]');
      if (span){
        span.classList.add('hint-flash');
        span.scrollIntoView({block:'center', behavior:'smooth'});
        setTimeout(function(){ if (span) span.classList.remove('hint-flash'); }, 2400);
      }
      resetHintBtn();
    }
  }
  function resetHintBtn(){ var b = el('coup-pouce'); if (b && !b.disabled) b.textContent = '💡 Hint'; }

  // Written hint box (level 1), shown under the button
  function showAide(text){
    var box = el('hint-box'); if (!box) return;
    box.innerHTML = '<span class="hi">💭</span><span>' + gl(text) + '</span>';
    box.hidden = false;
  }
  function hideAide(){ var b = el('hint-box'); if (b) b.hidden = true; }

  /* ---------- Small explanation pop-up anchored near the click ---------- */
  function ensurePop(){
    var maq = el('maquette');
    var pop = maq.querySelector('#spot-pop');
    if (!pop){ pop = document.createElement('div'); pop.id = 'spot-pop'; maq.appendChild(pop); }
    pop.style.display = 'block';
    return pop;
  }
  function hidePop(){ var p = document.querySelector('#spot-pop'); if (p) p.style.display = 'none'; }

  function remplirPop(kind, note){
    var pop = ensurePop();
    pop.className = 'spot-pop ' + kind;
    var ic = kind==='ok' ? '✅' : (kind==='ko' ? '➖' : '🤔');
    pop.innerHTML =
      '<button class="x" type="button" aria-label="Close">✕</button>' +
      '<div class="pc"><span class="ic">' + ic + '</span><span>' + gl(note) + '</span></div>' +
      '<span class="arrow"></span>';
    pop.querySelector('.x').onclick = function(ev){ ev.stopPropagation(); hidePop(); };
    return pop;
  }

  function showPop(anchor, kind, note){
    if (!el('maquette')) return;
    positionPop(remplirPop(kind, note), anchor, null);
  }
  function showPopAt(e, kind, note){
    var maq = el('maquette'); if (!maq) return;
    positionPop(remplirPop(kind, note), null, { x:e.clientX, y:e.clientY });
  }

  function positionPop(pop, anchor, xy){
    var maq = el('maquette');
    pop.style.visibility = 'hidden'; pop.style.display = 'block';
    var mr = maq.getBoundingClientRect();
    var cx, topA, botA, refTop, refBot;
    if (anchor){
      var ar = anchor.getBoundingClientRect();
      cx = ar.left + ar.width/2 - mr.left;
      topA = ar.top - mr.top; botA = ar.bottom - mr.top;
      refTop = ar.top; refBot = ar.bottom;
    } else {
      cx = xy.x - mr.left; topA = botA = xy.y - mr.top;
      refTop = refBot = xy.y;
    }
    var pw = pop.offsetWidth, ph = pop.offsetHeight;
    var left = Math.max(6, Math.min(cx - pw/2, maq.clientWidth - pw - 6));

    // below the element by default; above it if there is not enough room at the bottom of the screen
    var placeBelow = (window.innerHeight - refBot) > (ph + 24) || refTop < (ph + 24);
    var top = placeBelow ? (botA + 12) : (topA - ph - 12);
    pop.classList.toggle('above', !placeBelow);
    pop.style.left = left + 'px';
    pop.style.top  = top + 'px';

    var arrow = pop.querySelector('.arrow');
    if (arrow){ arrow.style.left = Math.max(10, Math.min(cx - left - 6, pw - 22)) + 'px'; }
    pop.style.visibility = 'visible';
  }

  /* ---------- full CORRECTION ---------- */
  function montrerCorrection(bon){
    hidePop();
    var c = deck[idx];
    var estArnaque = c.verdict === 'arnaque';

    // reveals the clues not found in the message
    var root = el('maquette');
    if (root){
      root.classList.remove('mode-spot');
      root.classList.add('mode-corrige');
      reperesActifs.forEach(function(r, i){
        if (!r.bon) return;
        var span = root.querySelector('.repere[data-i="' + i + '"]');
        if (span && !span.classList.contains('trouve')) span.classList.add('manque');
      });
    }

    var listeClasse = estArnaque ? 'indices' : 'indices ok';
    var indices = (c.indices||[]).map(function(x){ return '<li>'+gl(x)+'</li>'; }).join('');

    var titreVerdict, sousTitre;
    if (bon){
      titreVerdict = '👏 Well spotted!';
      sousTitre = estArnaque ? 'It really was a scam.' : 'It really was a reliable message.';
    } else {
      titreVerdict = '⚠️ Careful';
      sousTitre = estArnaque
        ? 'Actually, it was a scam. Here is how to spot it.'
        : 'Actually, this message was reliable — no need to worry here.';
    }

    var totalBon = reperesActifs.filter(function(r){ return r.bon; }).length;
    var recap = totalBon
      ? '<div class="spot-recap">You avez repéré <b>' + foundBon + '</b> indice(s) of ' + totalBon +
        '. The <span class="lg-manque">outlined</span> elements in the message are the ones to remember.</div>'
      : '';

    el('lower').innerHTML =
      '<div class="feedback">' +
        '<div class="verdict-bar ' + (bon?'bon':'faux') + '">' +
          '<span class="big">' + (bon?'✅':'❗') + '</span>' +
          '<div>' + titreVerdict + '<small>' + sousTitre + '</small></div>' +
        '</div>' +
        recap +
        '<span class="tag ' + (estArnaque?'arnaque':'fiable') + '">' +
          (estArnaque?'🚨 ':'✅ ') + gl(c.categorie) + '</span>' +
        '<div class="bloc-titre">' + (estArnaque?'🔎 The clues that reveal the scam:':'✅ What shows it is reliable:') + '</div>' +
        '<ul class="' + listeClasse + '">' + indices + '</ul>' +
        '<div class="reflexe"><b>👉 The right reflex:</b> ' + gl(c.reflexe) + '</div>' +
        '<div class="explication">' + gl(c.explication) + '</div>' +
        '<button class="next" id="next">' + (idx+1 < deck.length ? 'Next message ▶' : 'See my result 🏁') + '</button>' +
      '</div>';

    el('next').onclick = suivant;
    barFill.style.width = Math.round((idx+1)/deck.length*100) + '%';
    scoreEl.innerHTML = '✔ <b>' + score + '</b>&nbsp;/&nbsp;' + deck.length;
    el('lower').querySelector('.feedback').scrollIntoView({behavior:'smooth', block:'nearest'});
  }

  function suivant(){
    idx++;
    if (idx >= deck.length) return ecranFin();
    montrerCarte();
  }

  /* =====================================================================
     END SCREEN
     ===================================================================== */
  function ecranFin(){
    hud.style.display = 'none';
    var total = deck.length;
    var pct = Math.round(score/total*100);
    var jauge, msg;
    if (pct >= 85){ jauge='🏆'; msg='Excellent&nbsp;! You avez l’œil. You saurez déjouer la plupart des pièges.'; }
    else if (pct >= 60){ jauge='👍'; msg='Good work! Build a few more reflexes and you will be unbeatable.'; }
    else if (pct >= 40){ jauge='💪'; msg='It is a start. Play again to memorize the clues that often come up.'; }
    else { jauge='🌱'; msg='No worries: these scams are designed to deceive. Review the reflexes and try again.'; }

    app.innerHTML =
      '<div class="panel hero">' +
        '<div class="gauge">' + jauge + '</div>' +
        '<div class="result-score">Score: <span class="n">' + score + '</span> / ' + total + '</div>' +
        '<p class="lead">' + msg + '</p>' +
        '<div class="reflexes-carte">' +
          '<h3>🛡️ The 6 reflexes to keep in mind</h3>' +
          '<ul>' +
            '<li>Je ne clique <b>jamais</b> of un lien reçu par SMS ou e-mail non attendu.</li>' +
            '<li>A bank or public service <b>never</b> asks for a code, password or bank card.</li>' +
            '<li>Urgency, fear, threats, gifts: these are <b>traps</b> meant to stop me thinking.</li>' +
            '<li>I check the sender’s <b>full address</b> (the displayed name proves nothing).</li>' +
            '<li>When in doubt, I <b>hang up</b> and call back using the official number (back of the card, known website).</li>' +
            '<li>Un « amour » ou un « proche » qui demande de l’<b>argent</b> online&nbsp;: je vérifie toujours autrement.</li>' +
          '</ul>' +
        '</div>' +
        '<div class="ressources">' +
          '<h3>📞 If in doubt or if you are a victim</h3>' +
          '<div class="r"><span class="num">17</span><span>Police / Gendarmerie in an emergency.</span></div>' +
          '<div class="r"><span class="num">33700</span><span>To report a fraudulent SMS or call (forward it, free of charge).</span></div>' +
          '<div class="r"><span class="num">0 805 805 817</span><span>Scam information helpline (free number).</span></div>' +
          '<div class="r"><b>cybermalveillance.gouv.fr</b><span>Help and procedures if you have been tricked.</span></div>' +
          '<div class="r"><b>signal-arnaques.com</b><span>Check a suspicious number, website or message.</span></div>' +
        '</div>' +
        '<button class="btn-start" id="rejouer" style="margin-top:22px">Play again&nbsp;🔄</button>' +
        '<button class="btn-gloss" id="fin-avis" style="margin-top:10px">💬 Give feedback</button>' +
        '<p class="footer-note">Talk about it with people around you: talking about it is already a way to protect yourself.</p>' +
      '</div>';
    el('rejouer').onclick = demarrer;
    var fa = el('fin-avis'); if (fa) fa.onclick = openFeedback;
    window.scrollTo({top:0, behavior:'smooth'});
  }

  /* =====================================================================
     GLOSSARY — “Words to know” window
     ===================================================================== */
  function buildGlossaireModal(){
    if (el('gloss-modal')) return;
    var items = GLOSS.map(function(g){
      return '<div class="gdef" id="gdef-' + g.key + '">' +
               '<div class="gt">' + esc(g.terme) + '</div>' +
               '<div class="gd">' + esc(g.def) + '</div>' +
             '</div>';
    }).join('');
    var ov = document.createElement('div');
    ov.className = 'modal-overlay';
    ov.id = 'gloss-modal';
    ov.setAttribute('hidden','');
    ov.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-label="Words to know">' +
        '<div class="modal-head">' +
          '<h2>📖 Words to know</h2>' +
          '<button class="modal-close" id="gloss-close" aria-label="Close">✕</button>' +
        '</div>' +
        '<p class="modal-intro">Scam vocabulary, explained simply. ' +
        'During the game, <span class="gloss-demo">underlined words</span> are clickable.</p>' +
        '<div class="modal-body" id="gloss-list">' + items + '</div>' +
        '<button class="next" id="gloss-ok">Got it</button>' +
      '</div>';
    document.body.appendChild(ov);
    el('gloss-close').onclick = fermerGlossaire;
    el('gloss-ok').onclick = fermerGlossaire;
    ov.addEventListener('click', function(e){ if (e.target === ov) fermerGlossaire(); });
  }

  function openGlossaire(key){
    buildGlossaireModal();
    var ov = el('gloss-modal');
    ov.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    // enlève un éventuel surlignage précédent
    var prev = document.querySelector('.gdef.surligne');
    if (prev) prev.classList.remove('surligne');
    if (key && glossParKey[key]){
      var cible = el('gdef-' + key);
      if (cible){
        cible.classList.add('surligne');
        cible.scrollIntoView({block:'center'});
      }
    } else {
      el('gloss-list').scrollTop = 0;
    }
  }

  function fermerGlossaire(){
    var ov = el('gloss-modal');
    if (ov){ ov.setAttribute('hidden',''); }
    document.body.style.overflow = '';
  }

  /* =====================================================================
     INITIALIZATION
     ===================================================================== */
  /* =====================================================================
     FEEDBACK — direct email sending (Web3Forms, like Fakemètre)
     ===================================================================== */
  function openFeedback(){ var o=el('fb-overlay'); if(o){ o.classList.add('open'); var m=el('fb-message'); if(m) m.focus(); } }
  function closeFeedback(){ var o=el('fb-overlay'); if(o) o.classList.remove('open'); }
  function sendFeedback(){
    var n=el('fb-name'), e=el('fb-email'), m=el('fb-message');
    var name=(n&&n.value||'').trim(), email=(e&&e.value||'').trim(), msg=(m&&m.value||'').trim();
    if(!msg){ alert('Write a short message before sending 🙂'); return; }
    var btn=el('fb-send'); if(btn){ btn.disabled=true; btn.textContent='⏳ Sending…'; }
    fetch('https://api.web3forms.com/submit', {
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body: JSON.stringify({
        access_key:'ef1fe549-c616-4a27-a6c2-97f06caa913d',
        subject:'Radar’naque feedback' + (name ? ' — ' + name : ''),
        name: name || 'Anonymous',
        email: email || 'not provided',
        message: msg
      })
    }).then(function(r){ return r.json(); }).then(function(d){
      if(d && d.success){ alert('Thank you very much for your feedback! 🙏'); if(n)n.value=''; if(e)e.value=''; if(m)m.value=''; closeFeedback(); }
      else { alert('Oops, sending failed. Try again, or write to contact@antoninatger.com'); }
    }).catch(function(){ alert('Oops, sending failed. Try again, or write to contact@antoninatger.com'); })
    .then(function(){ if(btn){ btn.disabled=false; btn.textContent='📨 Send'; } });
  }

  function init(){
    app = el('app'); hud = el('hud');
    barFill = el('barfill'); barLbl = el('barlbl'); scoreEl = el('score');

    prepareGlossaire();
    buildGlossaireModal();

    // text-size buttons
    var tb = document.querySelectorAll('.textsize button');
    for (var i=0;i<tb.length;i++){
      (function(b){ b.onclick = function(){ setTaille(b.getAttribute('data-t'), b); }; })(tb[i]);
    }
    var saved = null;
    try { saved = localStorage.getItem('radar_taille'); } catch(e){}
    if (saved){
      var match = document.querySelector('.textsize button[data-t="'+saved+'"]');
      setTaille(saved, match);
    }

    // “back to menu” button (visible only during the game)
    var mb = el('menu-btn');
    if (mb) mb.onclick = function(){
      if (hud && hud.style.display !== 'none' &&
          !confirm('Go back to the menu? The current game will be lost.')) return;
      ecranAccueil();
    };

    // top-bar glossary button (accessible during the game)
    var gb = el('gloss-btn');
    if (gb) gb.onclick = function(){ openGlossaire(); };

    // “Feedback” button + feedback window (sent by email)
    var ab = el('avis-btn');   if (ab) ab.onclick = openFeedback;
    var fx = el('fb-x');       if (fx) fx.onclick = closeFeedback;
    var fc = el('fb-cancel');  if (fc) fc.onclick = closeFeedback;
    var fs = el('fb-send');    if (fs) fs.onclick = sendFeedback;
    var fo = el('fb-overlay'); if (fo) fo.addEventListener('click', function(e){ if (e.target === fo) closeFeedback(); });

    // click on a glossary word (delegation: works on all injected content)
    document.addEventListener('click', function(e){
      var t = e.target;
      if (t && t.classList && t.classList.contains('gloss')){
        openGlossaire(t.getAttribute('data-g'));
      }
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape'){ fermerGlossaire(); closeFeedback(); }
      var t = e.target;
      if ((e.key === 'Enter' || e.key === ' ') && t && t.classList && t.classList.contains('gloss')){
        e.preventDefault(); openGlossaire(t.getAttribute('data-g'));
      }
    });

    ecranAccueil();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
