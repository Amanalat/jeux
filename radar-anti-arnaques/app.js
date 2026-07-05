/* =========================================================================
   RADAR ANTI-ARNAQUES — Logique du jeu
   Dépend de scenarios.js (variable globale SCENARIOS).
   ========================================================================= */

(function () {
  'use strict';

  var CARTES_PAR_PARTIE = 14;   // nombre de cartes jouées par partie (équilibré)
  var app, hud, barFill, barLbl, scoreEl;
  var deck = [], idx = 0, score = 0, repondu = false;

  /* phase de repérage des indices (après la décision) */
  var REP = (typeof REPERES !== 'undefined') ? REPERES : {};
  var reperesActifs = [], foundBon = 0, currentChoix = null;
  /* coup de pouce à deux niveaux : 1 = indice écrit, 2 = on montre l'emplacement */
  var hintIdx = -1, hintStep = 0;

  /* état du glossaire (repérage automatique des mots) */
  var GLOSS = (typeof GLOSSAIRE !== 'undefined') ? GLOSSAIRE : [];
  var glossParKey = {}, glossParAlias = {}, glossRegex = null;

  /* ---------- utilitaires ---------- */
  function el(id){ return document.getElementById(id); }
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;} return a; }
  function initiales(nom){ return (nom||'?').replace(/[^A-Za-zÀ-ÿ ]/g,'').trim().split(/\s+/).map(function(m){return m[0];}).slice(0,2).join('').toUpperCase() || '?'; }
  // transforme les URLs http(s) d'un texte en faux liens visibles (non cliquables)
  function liens(t){ return esc(t).replace(/(https?:\/\/[^\s]+)/g, '<span class="lien">$1</span>'); }
  function escapeReg(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  // construit l'index et l'expression régulière de repérage des termes du glossaire
  function prepareGlossaire(){
    var alias = [];
    GLOSS.forEach(function(g){
      glossParKey[g.key] = g;
      (g.aliases||[]).forEach(function(a){ glossParAlias[a.toLowerCase()] = g.key; alias.push(a); });
    });
    // les plus longs d'abord pour éviter les correspondances partielles
    alias.sort(function(a,b){ return b.length - a.length; });
    if (alias.length) glossRegex = new RegExp('(' + alias.map(escapeReg).join('|') + ')', 'gi');
  }

  // échappe le texte PUIS rend cliquables les mots du glossaire (pastille ?)
  function gl(txt){
    var s = esc(txt);
    if (!glossRegex) return s;
    return s.replace(glossRegex, function(m){
      var key = glossParAlias[m.toLowerCase()];
      if (!key) return m;
      return '<span class="gloss" data-g="' + key + '" role="button" tabindex="0" title="Voir la définition">' + m + '</span>';
    });
  }

  /* ---------- réglage taille du texte ---------- */
  function setTaille(v, btn){
    document.documentElement.style.setProperty('--taille', v);
    var b = document.querySelectorAll('.textsize button');
    for (var i=0;i<b.length;i++) b[i].classList.remove('on');
    if (btn) btn.classList.add('on');
    try { localStorage.setItem('radar_taille', v); } catch(e){}
  }

  /* =====================================================================
     ÉCRAN D'ACCUEIL
     ===================================================================== */
  function ecranAccueil(){
    hud.style.display = 'none';
    app.innerHTML =
      '<div class="panel hero">' +
        '<div class="big-em">🛡️</div>' +
        '<h1>Saurez-vous déjouer les arnaques&nbsp;?</h1>' +
        '<p class="lead">Des messages, e-mails et appels comme vous en recevez vraiment. ' +
        'À vous de dire, pour chacun, s’il est <b>fiable</b> ou s’il faut <b>se méfier</b>. ' +
        'Pas de piège technique&nbsp;: on apprend à repérer les bons réflexes.</p>' +
        '<div class="how">' +
          '<div class="step"><div class="n">1</div><div>Lisez le message affiché (SMS, e-mail, appel…).</div></div>' +
          '<div class="step"><div class="n">2</div><div>Choisissez&nbsp;: <b>« C’est une arnaque »</b> ou <b>« C’est fiable »</b>.</div></div>' +
          '<div class="step"><div class="n">3</div><div>Trouvez les indices qui permettent de prouver que l’on peut faire confiance ou qu’il faut se méfier de ce message.</div></div>' +
        '</div>' +
        '<div class="accueil-boutons">' +
          '<button class="btn-start" id="go">Commencer&nbsp;▶</button>' +
          '<button class="btn-gloss" id="voir-mots">📖 Les mots à connaître</button>' +
        '</div>' +
        '<p class="footer-note">Aucune donnée n’est envoyée. Ce jeu sert uniquement à s’entraîner.</p>' +
      '</div>';
    el('go').onclick = demarrer;
    el('voir-mots').onclick = function(){ openGlossaire(); };
  }

  /* =====================================================================
     DÉMARRAGE D'UNE PARTIE
     ===================================================================== */
  function demarrer(){
    fermerGlossaire();
    // tirage ÉQUILIBRÉ : autant d'arnaques que de messages fiables (au possible)
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
    montrerCarte();
  }

  function majHud(){
    var pct = Math.round((idx) / deck.length * 100);
    barFill.style.width = pct + '%';
    barLbl.textContent = 'Message ' + (idx+1) + ' sur ' + deck.length;
    scoreEl.innerHTML = '✔ <b>' + score + '</b>&nbsp;/&nbsp;' + deck.length;
  }

  /* =====================================================================
     AFFICHAGE D'UNE CARTE
     ===================================================================== */
  function montrerCarte(){
    repondu = false;
    majHud();
    var c = deck[idx];
    app.innerHTML =
      '<div class="panel">' +
        '<div class="entete">' + esc(c.entete || contexteParDefaut(c)) + '</div>' +
        '<div id="maquette">' + renderMaquette(c) + '</div>' +
      '</div>' +
      '<div class="panel"><div id="lower">' +
        '<div class="consigne">Selon vous, ce message est…<small>Prenez le temps de bien le lire avant de choisir.</small></div>' +
        '<div class="decide">' +
          '<button class="btn-arnaque" id="b-arnaque"><span class="em">🚨</span>C’est une arnaque<small>Message piégé, je me méfie</small></button>' +
          '<button class="btn-fiable" id="b-fiable"><span class="em">✅</span>C’est fiable<small>Rien d’anormal ici</small></button>' +
        '</div>' +
      '</div></div>';

    el('b-arnaque').onclick = function(){ repondre('arnaque'); };
    el('b-fiable').onclick  = function(){ repondre('fiable'); };
    animerMessages(c);
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function contexteParDefaut(c){
    switch(c.canal){
      case 'sms': return 'SMS reçu';
      case 'email': return 'E-mail reçu';
      case 'chat': return 'Message reçu';
      case 'appel': return 'Appel téléphonique';
      case 'notif': return 'Notification apparue à l’écran';
      case 'image': return 'Publication vue sur les réseaux sociaux';
    }
    return '';
  }

  /* ---------- rendu selon le canal ---------- */
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
      '<div class="bar"><div class="from">' + esc(c.expediteur) + '</div><div class="sub">Message texte · aujourd’hui</div></div>' +
      '<div class="thread" data-anim="sms"></div>' +
    '</div>';
  }

  function renderChat(c){
    var messenger = /messenger/i.test(c.plateforme);
    var av = c.avatar ? '<img src="'+esc(c.avatar)+'" alt="">' : (initiales(c.contact) || '👤');
    return '<div class="chat ' + (messenger?'messenger':'') + '">' +
      '<div class="head"><div class="av">' + av + '</div>' +
        '<div><div class="nm">' + esc(c.contact) + '</div><div class="st">' + esc(c.plateforme) + ' · en ligne</div></div></div>' +
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
      '<img class="big" src="' + esc(c.image) + '" alt="Image partagée sur les réseaux">' +
      '<div class="cap">' + esc(c.legende) + '</div>' +
    '</div>';
  }

  function renderAppel(c){
    return '<div class="call"><div class="screen">' +
      '<div class="avat">📞</div>' +
      '<div class="name">' + esc(c.afficheur) + '</div>' +
      '<div class="num">' + esc(c.numero||'') + '</div>' +
      '<div class="state">Appel en cours…</div>' +
      '<div class="keys"><div class="k red">✕</div><div class="k green">✓</div></div>' +
      '</div><div class="transcript" data-anim="call"></div></div>';
  }

  // corps d'e-mail : autorise le HTML simple déjà présent dans les données
  // (les données proviennent du jeu, pas d'une saisie utilisateur)
  function liens_html(html){ return html; }

  /* ---------- fabrique les « bulles » de message (sms/chat/appel) ---------- */
  function itemsFor(c){
    if (c.canal === 'sms'){
      return c.messages.map(function(m){
        if (m && typeof m === 'object' && m.photo){
          return '<div class="bubble bubble-photo">' +
            '<div class="fauxphoto" role="img" aria-label="Photo d’un colis avec une étiquette au nom du destinataire">' +
              '<div class="fp-scene">📦</div>' +
              '<span class="fp-hand">🧤</span>' +
              '<div class="fp-tag"><span class="fp-hd">DESTINATAIRE</span><b>' + esc(m.nom) + '</b>' +
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
        var who = l.qui==='vous' ? 'Vous' : 'La personne au téléphone';
        return '<div class="l '+(l.qui==='vous'?'vous':'')+'"><span class="who">'+who+'</span>'+esc(l.texte)+'</div>';
      });
    }
    return [];
  }

  /* animation « message par message » */
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
     RÉPONSE + CORRECTION
     ===================================================================== */
  function repondre(choix){
    if (repondu) return;
    repondu = true;
    currentChoix = choix;
    var c = deck[idx];
    var bon = (choix === c.verdict);
    if (bon) score++;

    el('b-arnaque').disabled = true;
    el('b-fiable').disabled = true;
    el(choix==='arnaque' ? 'b-arnaque' : 'b-fiable').classList.add('choisi');

    reperesActifs = c.reperes || REP[c.id] || [];
    foundBon = 0;
    if (reperesActifs.length) entrerSpotting(bon);
    else montrerCorrection(bon);
  }

  /* ---------- Phase de REPÉRAGE des indices ---------- */
  function entrerSpotting(bon){
    var c = deck[idx];
    // ré-affiche le message en entier (sans animation) pour rendre les éléments cliquables
    el('maquette').innerHTML = renderMaquette(c);
    var host = document.querySelector('#maquette [data-anim]');
    if (host) host.innerHTML = itemsFor(c).join('');
    el('maquette').classList.add('mode-spot');
    activerReperes(el('maquette'), reperesActifs);

    hintIdx = -1; hintStep = 0;
    var estArnaque = c.verdict === 'arnaque';
    var totalBon = reperesActifs.filter(function(r){ return r.bon; }).length;
    var consigne = estArnaque
      ? 'Maintenant, prouvez-le&nbsp;: <b>cliquez, dans le message, sur ce qui vous paraît suspect</b> 👆<small>Rien n’est surligné&nbsp;: à vous de le trouver. L’explication s’affiche là où vous cliquez.</small>'
      : 'Maintenant, montrez pourquoi&nbsp;: <b>cliquez sur ce qui vous rassure</b> dans le message 👆<small>Rien n’est surligné&nbsp;: à vous de le trouver. L’explication s’affiche là où vous cliquez.</small>';

    el('lower').innerHTML =
      '<div class="rappel-choix">Votre réponse&nbsp;: <b>' +
        (currentChoix==='arnaque' ? '🚨 C’est une arnaque' : '✅ C’est fiable') + '</b></div>' +
      '<div class="spot-consigne">' + consigne + '</div>' +
      '<div class="spot-compteur" id="spot-compteur" data-total="' + totalBon + '">' +
        'Indices repérés&nbsp;: <b>0</b> / ' + totalBon + '</div>' +
      '<div class="spot-actions">' +
        '<button class="hint-btn" id="coup-pouce">💡 Coup de pouce</button>' +
      '</div>' +
      '<div class="hint-box" id="hint-box" hidden></div>' +
      '<button class="next" id="voir-corr">Voir la correction ▶</button>';
    el('coup-pouce').onclick = coupDePouce;
    el('voir-corr').onclick = function(){ hidePop(); montrerCorrection(bon); };
    window.scrollTo({top:0, behavior:'smooth'});
  }

  // rend cliquables les fragments définis dans les « reperes »
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
      // clic dans la petite fenêtre d'explication (ou sur un mot du glossaire) : on laisse faire
      if (e.target.closest && (e.target.closest('.spot-pop') || e.target.closest('.gloss'))) return;
      var t = e.target.closest ? e.target.closest('.repere') : null;
      if (t) clicRepere(parseInt(t.getAttribute('data-i'), 10), t);
      else clicVide(e);            // la personne a cliqué à côté : on le lui signale
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
        // l'indice est trouvé : le coup de pouce repart de zéro sur le suivant
        hintIdx = -1; hintStep = 0; hideAide(); resetHintBtn();
      }
      showPop(span, 'ok', r.note);   // ré-affiche l'explication si on reclique
    } else {
      span.classList.add('decoy');
      showPop(span, 'ko', r.note || 'Ce détail attire l’œil, mais ce n’est pas là qu’est le vrai signe.');
    }
  }

  // clic « à côté » (pas sur un indice) : petit retour rassurant à l'endroit cliqué
  function clicVide(e){
    var estArnaque = deck[idx].verdict === 'arnaque';
    var msg = estArnaque
      ? 'Rien de suspect ici. Regardez plutôt les détails inhabituels : l’adresse, le lien, le ton, l’urgence…'
      : 'Cet élément-là n’apporte pas d’indice. Cherchez ce qui rassure : une adresse connue, un ton habituel, pas de lien piégé…';
    showPopAt(e, 'miss', msg);
  }

  function majCompteur(){
    var cmp = el('spot-compteur');
    if (cmp) cmp.innerHTML = 'Indices repérés&nbsp;: <b>' + foundBon + '</b> / ' + cmp.getAttribute('data-total');
  }

  /* ---------- Coup de pouce à deux niveaux ----------
     1er clic : un indice ÉCRIT qui invite à réfléchir (« Penses-tu qu'une star… »).
     2e clic  : on MONTRE l'emplacement en le faisant clignoter.
     Dès qu'un indice est trouvé, on repart au niveau 1 sur le suivant. */
  function coupDePouce(){
    var maq = el('maquette'); if (!maq) return;
    var next = -1;
    reperesActifs.forEach(function(r, i){
      if (next >= 0 || !r.bon) return;
      var s = maq.querySelector('.repere[data-i="' + i + '"]');
      if (s && !s.classList.contains('trouve')) next = i;
    });
    var btn = el('coup-pouce');
    if (next < 0){ if (btn){ btn.disabled = true; btn.textContent = '💡 Tout est repéré ✓'; } hideAide(); return; }

    // nouvelle cible → on recommence au niveau 1
    if (next !== hintIdx){ hintIdx = next; hintStep = 0; }
    hintStep++;
    var r = reperesActifs[next];

    if (hintStep === 1 && r.aide){
      // Niveau 1 : indice écrit, sans révéler l'emplacement
      showAide(r.aide);
      if (btn) btn.textContent = '👀 Montrez-moi où';
    } else {
      // Niveau 2 (ou pas d'indice écrit dispo) : on montre l'endroit
      var span = maq.querySelector('.repere[data-i="' + next + '"]');
      if (span){
        span.classList.add('hint-flash');
        span.scrollIntoView({block:'center', behavior:'smooth'});
        setTimeout(function(){ if (span) span.classList.remove('hint-flash'); }, 2400);
      }
      resetHintBtn();
    }
  }
  function resetHintBtn(){ var b = el('coup-pouce'); if (b && !b.disabled) b.textContent = '💡 Coup de pouce'; }

  // Encadré d'indice écrit (niveau 1), affiché sous le bouton
  function showAide(text){
    var box = el('hint-box'); if (!box) return;
    box.innerHTML = '<span class="hi">💭</span><span>' + gl(text) + '</span>';
    box.hidden = false;
  }
  function hideAide(){ var b = el('hint-box'); if (b) b.hidden = true; }

  /* ---------- Petite fenêtre d'explication ancrée près du clic ---------- */
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
      '<button class="x" type="button" aria-label="Fermer">✕</button>' +
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

    // sous l'élément par défaut ; au-dessus s'il n'y a pas la place en bas de l'écran
    var placeBelow = (window.innerHeight - refBot) > (ph + 24) || refTop < (ph + 24);
    var top = placeBelow ? (botA + 12) : (topA - ph - 12);
    pop.classList.toggle('above', !placeBelow);
    pop.style.left = left + 'px';
    pop.style.top  = top + 'px';

    var arrow = pop.querySelector('.arrow');
    if (arrow){ arrow.style.left = Math.max(10, Math.min(cx - left - 6, pw - 22)) + 'px'; }
    pop.style.visibility = 'visible';
  }

  /* ---------- CORRECTION complète ---------- */
  function montrerCorrection(bon){
    hidePop();
    var c = deck[idx];
    var estArnaque = c.verdict === 'arnaque';

    // révèle les indices non trouvés dans le message
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
      titreVerdict = '👏 Bien vu&nbsp;!';
      sousTitre = estArnaque ? 'C’était bien une arnaque.' : 'C’était bien un message fiable.';
    } else {
      titreVerdict = '⚠️ Attention';
      sousTitre = estArnaque
        ? 'En réalité, c’était une arnaque. Voici comment le repérer.'
        : 'En réalité, ce message était fiable — pas besoin de s’alarmer ici.';
    }

    var totalBon = reperesActifs.filter(function(r){ return r.bon; }).length;
    var recap = totalBon
      ? '<div class="spot-recap">Vous avez repéré <b>' + foundBon + '</b> indice(s) sur ' + totalBon +
        '. Les éléments <span class="lg-manque">encadrés</span> dans le message sont ceux à retenir.</div>'
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
        '<div class="bloc-titre">' + (estArnaque?'🔎 Les indices qui trahissent l’arnaque :':'✅ Ce qui montre que c’est fiable :') + '</div>' +
        '<ul class="' + listeClasse + '">' + indices + '</ul>' +
        '<div class="reflexe"><b>👉 Le bon réflexe :</b> ' + gl(c.reflexe) + '</div>' +
        '<div class="explication">' + gl(c.explication) + '</div>' +
        '<button class="next" id="next">' + (idx+1 < deck.length ? 'Message suivant ▶' : 'Voir mon résultat 🏁') + '</button>' +
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
     ÉCRAN DE FIN
     ===================================================================== */
  function ecranFin(){
    hud.style.display = 'none';
    var total = deck.length;
    var pct = Math.round(score/total*100);
    var jauge, msg;
    if (pct >= 85){ jauge='🏆'; msg='Excellent&nbsp;! Vous avez l’œil. Vous saurez déjouer la plupart des pièges.'; }
    else if (pct >= 60){ jauge='👍'; msg='Bon travail&nbsp;! Encore quelques réflexes à ancrer et vous serez incollable.'; }
    else if (pct >= 40){ jauge='💪'; msg='C’est un début. Rejouez pour bien mémoriser les indices qui reviennent souvent.'; }
    else { jauge='🌱'; msg='Pas de souci&nbsp;: ces arnaques sont faites pour tromper. Relisez les réflexes et réessayez.'; }

    app.innerHTML =
      '<div class="panel hero">' +
        '<div class="gauge">' + jauge + '</div>' +
        '<div class="result-score">Score&nbsp;: <span class="n">' + score + '</span> / ' + total + '</div>' +
        '<p class="lead">' + msg + '</p>' +
        '<div class="reflexes-carte">' +
          '<h3>🛡️ Les 6 réflexes à garder en tête</h3>' +
          '<ul>' +
            '<li>Je ne clique <b>jamais</b> sur un lien reçu par SMS ou e-mail non attendu.</li>' +
            '<li>Une banque ou un service public ne demande <b>jamais</b> un code, un mot de passe ou une carte bancaire.</li>' +
            '<li>Urgence, peur, menace, cadeau&nbsp;: ce sont des <b>pièges</b> pour m’empêcher de réfléchir.</li>' +
            '<li>Je vérifie l’<b>adresse complète</b> de l’expéditeur (le nom affiché ne prouve rien).</li>' +
            '<li>En cas de doute, je <b>raccroche</b> et je rappelle par le numéro officiel (dos de la carte, site connu).</li>' +
            '<li>Un « amour » ou un « proche » qui demande de l’<b>argent</b> en ligne&nbsp;: je vérifie toujours autrement.</li>' +
          '</ul>' +
        '</div>' +
        '<div class="ressources">' +
          '<h3>📞 En cas de doute ou si vous êtes victime</h3>' +
          '<div class="r"><span class="num">17</span><span>Police / Gendarmerie en cas d’urgence.</span></div>' +
          '<div class="r"><span class="num">33700</span><span>Pour signaler un SMS ou appel frauduleux (transférez-le, gratuit).</span></div>' +
          '<div class="r"><span class="num">0 805 805 817</span><span>Info Escroqueries (numéro gratuit).</span></div>' +
          '<div class="r"><b>cybermalveillance.gouv.fr</b><span>Aide et démarches si vous avez été piégé.</span></div>' +
          '<div class="r"><b>signal-arnaques.com</b><span>Vérifier un numéro, un site ou un message douteux.</span></div>' +
        '</div>' +
        '<button class="btn-start" id="rejouer" style="margin-top:22px">Rejouer&nbsp;🔄</button>' +
        '<p class="footer-note">Parlez-en autour de vous&nbsp;: en parler, c’est déjà se protéger.</p>' +
      '</div>';
    el('rejouer').onclick = demarrer;
    window.scrollTo({top:0, behavior:'smooth'});
  }

  /* =====================================================================
     GLOSSAIRE — fenêtre « Les mots à connaître »
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
      '<div class="modal" role="dialog" aria-modal="true" aria-label="Les mots à connaître">' +
        '<div class="modal-head">' +
          '<h2>📖 Les mots à connaître</h2>' +
          '<button class="modal-close" id="gloss-close" aria-label="Fermer">✕</button>' +
        '</div>' +
        '<p class="modal-intro">Le vocabulaire des arnaques, expliqué simplement. ' +
        'Pendant le jeu, les mots <span class="gloss-demo">soulignés</span> sont cliquables.</p>' +
        '<div class="modal-body" id="gloss-list">' + items + '</div>' +
        '<button class="next" id="gloss-ok">J’ai compris</button>' +
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
     INITIALISATION
     ===================================================================== */
  function init(){
    app = el('app'); hud = el('hud');
    barFill = el('barfill'); barLbl = el('barlbl'); scoreEl = el('score');

    prepareGlossaire();
    buildGlossaireModal();

    // boutons de taille de texte
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

    // bouton glossaire de la barre du haut (accessible pendant le jeu)
    var gb = el('gloss-btn');
    if (gb) gb.onclick = function(){ openGlossaire(); };

    // clic sur un mot du glossaire (délégation : marche sur tout contenu injecté)
    document.addEventListener('click', function(e){
      var t = e.target;
      if (t && t.classList && t.classList.contains('gloss')){
        openGlossaire(t.getAttribute('data-g'));
      }
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') fermerGlossaire();
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
