// Chaque niveau : une anxiogène, sources, 3 emplacements de réécriture.
// Option : t = texte, emo / prec = effet sur les jauges (cachées jusqu'à la publication !), trap = contredit les sources (expliqué dans why)
// Chaque emplacement contient aussi une option qui ACCENTUE le dramatique par rapport à l'originale.
const LEVELS = [
 {
  orig:"ALERTE CRISE : les Français OBLIGÉS de SACRIFIER Noël ! 😱",
  sources:[
   {icon:"📊", name:"Le sondage original", body:"Sondage en ligne, 1 012 personnes : 64 % des Français prévoient le même budget de Noël que l'an dernier, 36 % prévoient de le réduire. Quasiment personne ne prévoit de l'augmenter."},
   {icon:"🎓", name:"L'analyse d'une économiste", body:"« Une majorité stable de Français maintient son budget malgré l'inflation. La part de ceux qui réduisent progresse légèrement : 32 % l'an dernier, 36 % cette année. »"},
  ],
  slots:[
   {name:"L'attaque du titre", opts:[
    {t:"ALERTE CRISE :", emo:35, prec:0},
    {t:"C'EST OFFICIEL, Noël est FICHU :", emo:40, prec:0},
    {t:"Noël en danger :", emo:25, prec:5},
    {t:"Selon un sondage (1 012 personnes),", emo:0, prec:30},
   ]},
   {name:"Le fait", opts:[
    {t:"les Français sacrifient leur Noël", emo:30, prec:0},
    {t:"les trois quarts des Français réduisent leur budget de Noël", emo:15, prec:25, trap:"Relis le sondage : c'est 36 % qui réduisent leur budget, pas 75 % ! Un chiffre précis mais faux, c'est pire qu'un titre vague : ça ressemble à de l'info."},
    {t:"des MILLIONS de familles privées de fêtes", emo:40, prec:0},
    {t:"64 % des Français prévoient un budget de Noël stable, 36 % comptent le réduire", emo:0, prec:40},
   ]},
   {name:"La chute", opts:[
    {t:"— du JAMAIS VU !", emo:30, prec:0},
    {t:".", emo:0, prec:10},
    {t:"— préparez-vous au PIRE ! ⚠️", emo:40, prec:0},
    {t:", une part en légère hausse par rapport à l'an dernier.", emo:5, prec:30},
   ]},
  ],
  lesson:"C'est l'exemple du <b>budget de Noël</b> : « 64 % maintiennent » ou « 36 % réduisent », c'est la <b>même étude</b>. Le verre à moitié plein ou à moitié vide : l'effet de cadrage. En citant les deux chiffres et la source, tu informes au lieu d'effrayer."
 },
 {
  orig:"Un footballeur de 24 ans MEURT subitement 3 jours après son VACCIN 💉☠️",
  sources:[
   {icon:"🏥", name:"Le rapport médical", body:"L'autopsie révèle une malformation cardiaque congénitale non détectée. Aucun élément n'établit de lien avec une vaccination."},
   {icon:"📚", name:"Les données historiques", body:"Les arrêts cardiaques de jeunes sportifs existent depuis toujours : environ 1 cas sur 50 000 sportifs par an, un chiffre stable depuis vingt ans, avant comme après les campagnes de vaccination."},
  ],
  slots:[
   {name:"L'attaque du titre", opts:[
    {t:"TRAGIQUE :", emo:30, prec:0},
    {t:"Ce que les médias vous CACHENT :", emo:35, prec:0},
    {t:"☠️ HÉCATOMBE silencieuse :", emo:40, prec:0},
    {t:"Selon le rapport d'autopsie,", emo:0, prec:30},
   ]},
   {name:"Le fait", opts:[
    {t:"un footballeur meurt à cause du vaccin", emo:30, prec:10, trap:"Le rapport médical dit exactement le contraire : malformation congénitale, aucun lien établi avec le vaccin. Affirmer une cause sans preuve, c'est transformer une corrélation en causalité."},
    {t:"un footballeur de 24 ans meurt subitement après son vaccin", emo:25, prec:5},
    {t:"un jeune champion FAUCHÉ en pleine gloire", emo:35, prec:0},
    {t:"un footballeur de 24 ans est décédé d'une malformation cardiaque non détectée", emo:0, prec:35},
   ]},
   {name:"La chute", opts:[
    {t:"Coïncidence ?? 🤔", emo:30, prec:0},
    {t:".", emo:0, prec:10},
    {t:"Qui sera le PROCHAIN ?!", emo:40, prec:0},
    {t:", un type d'accident dont la fréquence est stable depuis vingt ans.", emo:0, prec:30},
   ]},
  ],
  lesson:"Mettre « meurt » et « vaccin » dans la même phrase, c'est pousser le lecteur à imaginer une <b>causalité</b> à partir d'une simple <b>concomitance</b> — sans écrire un seul mot faux. Le contexte (cause réelle + fréquence stable) désamorce le piège."
 },
 {
  orig:"Ce génie FRANÇAIS invente le MOTEUR À EAU… les pétroliers veulent le faire TAIRE !",
  sources:[
   {icon:"🔬", name:"Une physicienne", body:"« L'eau n'est pas un carburant : séparer l'hydrogène de l'eau consomme plus d'énergie qu'on n'en récupère en le brûlant. Aucun “moteur à eau” n'a jamais passé un test indépendant. »"},
   {icon:"🗞️", name:"Les archives de presse", body:"Le même inventeur vend librement ses kits depuis quinze ans : personne ne l'« empêche » de vendre. On reparle d'un « moteur à eau » tous les deux-trois ans depuis des décennies. Aucune validation indépendante publiée."},
  ],
  slots:[
   {name:"L'attaque du titre", opts:[
    {t:"RÉVOLUTION :", emo:30, prec:0},
    {t:"Scandale étouffé :", emo:35, prec:0},
    {t:"LE SCOOP DU SIÈCLE 🚨 :", emo:40, prec:0},
    {t:"Un inventeur affirme", emo:0, prec:30},
   ]},
   {name:"Le fait", opts:[
    {t:"le moteur à eau qui va tout changer est enfin là", emo:25, prec:0},
    {t:"avoir mis au point un moteur à eau", emo:5, prec:25},
    {t:"avoir mis au point un moteur à eau validé par des chercheurs", emo:5, prec:20, trap:"Validé par qui ? Les sources sont formelles : aucun test indépendant, jamais. Inventer une validation scientifique rendrait ton titre plus crédible… et complètement faux."},
    {t:"l'invention MIRACLE qui rendra l'essence OBSOLÈTE", emo:35, prec:0},
   ]},
   {name:"La chute", opts:[
    {t:"— les lobbys pétroliers en PANIQUE !", emo:35, prec:0},
    {t:"— ILS ne pourront plus le cacher très longtemps !!", emo:40, prec:0},
    {t:", mais aucun test indépendant n'a confirmé son fonctionnement à ce jour.", emo:0, prec:35},
    {t:".", emo:0, prec:10},
   ]},
  ],
  lesson:"Le <b>moteur à eau</b> revient tous les deux-trois ans… et ne marche jamais. La touche complotiste (« les pétroliers veulent le faire taire ») sert à expliquer pourquoi la révolution n'arrive jamais. Le verbe « affirme » + l'absence de validation : voilà l'info honnête."
 },
 {
  orig:"L'IA va DÉTRUIRE la moitié de vos EMPLOIS d'ici 2030 ! 🤖🔥",
  sources:[
   {icon:"📄", name:"L'étude originale", body:"L'étude estime que 30 à 50 % des TÂCHES de certains métiers pourraient être automatisées d'ici 2030 — pas les emplois eux-mêmes. Elle ne donne aucun chiffre de suppressions d'emplois et souligne une grande incertitude."},
   {icon:"🎓", name:"Un économiste du travail", body:"« Les vagues technologiques précédentes ont transformé les métiers plus qu'elles ne les ont supprimés. De nouveaux métiers apparaissent. La fourchette d'incertitude est énorme. »"},
  ],
  slots:[
   {name:"L'attaque du titre", opts:[
    {t:"PANIQUE :", emo:30, prec:0},
    {t:"FIN DU TRAVAIL HUMAIN :", emo:40, prec:0},
    {t:"C'est confirmé :", emo:25, prec:5},
    {t:"Selon une étude,", emo:0, prec:30},
   ]},
   {name:"Le fait", opts:[
    {t:"l'IA va détruire un emploi sur deux", emo:30, prec:10, trap:"L'étude parle de 30 à 50 % des TÂCHES automatisables, pas des emplois supprimés ! Glisser de « tâches » à « emplois », c'est le raccourci qui transforme une étude nuancée en titre catastrophe."},
    {t:"les robots vont TOUS nous remplacer, c'est MATHÉMATIQUE", emo:40, prec:0},
    {t:"l'IA pourrait automatiser une partie des tâches de nombreux métiers", emo:0, prec:35},
    {t:"l'IA menace vos emplois", emo:25, prec:0},
   ]},
   {name:"La chute", opts:[
    {t:"d'ici 2030. Préparez-vous au PIRE.", emo:30, prec:0},
    {t:"d'ici 2030. Sauve qui peut. 🤖💀", emo:40, prec:0},
    {t:"d'ici 2030, avec une fourchette d'incertitude encore très large.", emo:0, prec:30},
    {t:"d'ici 2030.", emo:0, prec:10},
   ]},
  ],
  lesson:"Beaucoup de titres anxiogènes naissent d'un <b>glissement de vocabulaire</b> : l'étude dit « tâches automatisables », le titre dit « emplois détruits ». Toujours se demander : <b>que dit exactement la source ?</b>"
 },
 {
  orig:"Le remède MIRACLE que Big Pharma vous CACHE : le citron TUERAIT le cancer ! 🍋",
  sources:[
   {icon:"🎗️", name:"Un cancérologue", body:"« Aucune étude clinique ne montre d'effet du citron contre le cancer. Si une solution simple à un problème complexe semble trop belle pour être vraie… elle l'est généralement. »"},
   {icon:"🔎", name:"Un fact-check", body:"La rumeur circule depuis 2011, à partir d'un email viral attribué à un « institut de recherche »… qui n'existe pas."},
  ],
  slots:[
   {name:"L'attaque du titre", opts:[
    {t:"INCROYABLE :", emo:30, prec:0},
    {t:"Ils ne veulent pas que vous le sachiez :", emo:35, prec:0},
    {t:"MIRACLE ABSOLU 🍋 :", emo:40, prec:0},
    {t:"Contrairement à une rumeur virale,", emo:0, prec:30},
   ]},
   {name:"Le fait", opts:[
    {t:"le citron tue les cellules cancéreuses", emo:25, prec:10, trap:"Aucune étude clinique ne montre ça, dit le cancérologue. La rumeur vient d'un email viral citant un institut… qui n'existe pas. Affirmer l'effet, c'est répéter la fake news."},
    {t:"le fruit qui TERRASSE la maladie en silence", emo:35, prec:0},
    {t:"le citron, un espoir contre le cancer ?", emo:20, prec:5},
    {t:"aucune étude ne montre d'effet du citron contre le cancer", emo:0, prec:35},
   ]},
   {name:"La chute", opts:[
    {t:"Big Pharma TREMBLE.", emo:35, prec:0},
    {t:"Partagez VITE, avant la CENSURE !! 🔒", emo:40, prec:0},
    {t:", rappellent les cancérologues.", emo:0, prec:30},
    {t:".", emo:0, prec:10},
   ]},
  ],
  lesson:"Une <b>solution trop simple à un problème complexe</b> est généralement fausse — ça fait des décennies qu'on cherche des traitements. Et le point d'interrogation (« un espoir… ? ») ne suffit pas : il laisse planer le doute sans informer."
 },
 {
  orig:"EXPLOSION de la violence : les agressions BONDISSENT de 20 % ! 🚨",
  sources:[
   {icon:"📊", name:"Les chiffres officiels", body:"Les signalements enregistrés ont augmenté de 20 % cette année. Le rapport précise que la mise en place de la plainte en ligne a fortement facilité les déclarations."},
   {icon:"🎓", name:"Une sociologue", body:"« Une hausse des chiffres enregistrés peut refléter une hausse des faits… ou une hausse des déclarations. Les enquêtes de victimation, elles, sont stables depuis dix ans. »"},
  ],
  slots:[
   {name:"L'attaque du titre", opts:[
    {t:"EXPLOSION de la violence :", emo:35, prec:0},
    {t:"GUERRE CIVILE en approche :", emo:40, prec:0},
    {t:"Insécurité galopante :", emo:30, prec:0},
    {t:"Selon les chiffres officiels,", emo:0, prec:30},
   ]},
   {name:"Le fait", opts:[
    {t:"les agressions bondissent de 20 %", emo:25, prec:5, trap:"Nuance capitale : ce sont les SIGNALEMENTS enregistrés qui augmentent de 20 %, pas forcément les agressions. La sociologue le dit : les enquêtes de victimation sont stables. Confondre les deux, c'est le piège classique des statistiques de délinquance."},
    {t:"la violence dévore le pays tout entier", emo:40, prec:0},
    {t:"les signalements d'agression augmentent de 20 %", emo:0, prec:30},
    {t:"le pays sombre dans le chaos", emo:35, prec:0},
   ]},
   {name:"La chute", opts:[
    {t:"Plus personne n'est en sécurité.", emo:35, prec:0},
    {t:"Barricadez-vous. 🚨🚨", emo:40, prec:0},
    {t:", une hausse en partie liée à la nouvelle plainte en ligne, selon le rapport.", emo:0, prec:35},
    {t:".", emo:0, prec:10},
   ]},
  ],
  lesson:"« Les chiffres parlent d'eux-mêmes » ? Jamais ! Un chiffre <b>enregistré</b> n'est pas un fait <b>réel</b> : si on facilite les plaintes, les chiffres montent même quand la violence est stable. C'est tout l'écart entre <b>signalements</b> et <b>réalité</b>."
 },
];

const EMO_MAX=30, PREC_MIN=70;
let lvl=0, sel=[], attempts=0, stars=0, solved=false;
const $=id=>document.getElementById(id);

function startGame(){
  lvl=0; stars=0;
  $("intro").style.display="none";
  $("hud").style.display="flex";
  $("game").style.display="block";
  $("qtot").textContent=LEVELS.length;
  $("draft-date").textContent=new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  renderLevel();
}

function renderLevel(){
  const L=LEVELS[lvl];
  sel=L.slots.map(()=>0); // par défaut : le segment original (le plus sensationnaliste)
  attempts=0; solved=false;
  $("qnum").textContent=lvl+1;
  $("orig-txt").textContent=L.orig;
  $("feedback").style.display="none";
  $("gauges").style.display="none"; // jauges cachées tant qu'on n'a pas publié
  $("nextbtn").style.display="none";
  $("publish").style.display="block";
  // Sources
  const sc=$("sources"); sc.innerHTML="";
  L.sources.forEach(s=>{
    const d=document.createElement("div");
    d.className="source";
    d.innerHTML=`<div class="source-hd">${s.icon} ${s.name} <span class="sread">✓ lu</span><span class="schev">▶</span></div><div class="source-bd">${s.body}</div>`;
    d.querySelector(".source-hd").onclick=()=>{d.classList.toggle("open");d.classList.add("read");};
    sc.appendChild(d);
  });
  // Slots
  const sl=$("slots"); sl.innerHTML="";
  L.slots.forEach((slot,si)=>{
    const g=document.createElement("div");
    g.className="slotgroup";
    g.innerHTML=`<div class="slotname">${si+1}. ${slot.name}</div>`;
    const wrap=document.createElement("div");
    wrap.className="slotopts";
    slot.opts.forEach((o,oi)=>{
      const b=document.createElement("button");
      b.className="opt"+(oi===0?" sel":"");
      b.textContent=o.t;
      b.onclick=()=>{
        sel[si]=oi;
        wrap.querySelectorAll(".opt").forEach((x,k)=>x.classList.toggle("sel",k===oi));
        updateDraft();
      };
      wrap.appendChild(b);
    });
    g.appendChild(wrap);
    sl.appendChild(g);
  });
  updateDraft();
  window.scrollTo({top:0,behavior:"smooth"});
}

function currentScores(){
  const L=LEVELS[lvl];
  let emo=0, prec=0;
  L.slots.forEach((s,i)=>{emo+=s.opts[sel[i]].emo; prec+=s.opts[sel[i]].prec;});
  return {emo:Math.min(100,emo), prec:Math.min(100,prec)};
}

function updateDraft(){
  // Met à jour l'aperçu de la une, mais PAS les jauges : le verdict n'arrive qu'à la publication.
  const L=LEVELS[lvl];
  const txt=L.slots.map((s,i)=>s.opts[sel[i]].t).join(" ")
    .replace(/\s+([,.])/g,"$1").replace(/\s+/g," ").trim();
  $("draft-txt").textContent=txt;
  if(!solved){$("feedback").style.display="none";}
}

function revealGauges(){
  const {emo,prec}=currentScores();
  $("gauges").style.display="block";
  $("emo-fill").style.width=emo+"%";
  $("prec-fill").style.width=prec+"%";
  $("emo-val").textContent=emo;
  $("prec-val").textContent=prec;
}

function publish(){
  const L=LEVELS[lvl];
  attempts++;
  revealGauges();
  const fb=$("feedback");
  // Piège : segment contredit par les sources ?
  const trapped=L.slots.map((s,i)=>s.opts[sel[i]]).find(o=>o.trap);
  if(trapped){
    fb.className="ko"; fb.style.display="block";
    $("fb-title").textContent="🛑 Retoqué par le rédac chef !";
    $("fb-expl").innerHTML="Ton segment « <i>"+trapped.t+"</i> » contredit les sources. "+trapped.trap+"<br><br>🔎 Relis les sources et corrige ta une.";
    $("fb-stars").style.display="none";
    fb.scrollIntoView({behavior:"smooth",block:"center"});
    return;
  }
  const {emo,prec}=currentScores();
  if(emo>EMO_MAX || prec<PREC_MIN){
    fb.className="ko"; fb.style.display="block";
    $("fb-title").textContent="✋ Pas encore publiable…";
    let msg=[];
    if(emo>EMO_MAX) msg.push("😱 Ton titre joue encore trop sur l'émotion ("+emo+"/100, objectif ≤ "+EMO_MAX+"). Repère les mots qui font peur : majuscules, « alerte », « panique », sous-entendus…");
    if(prec<PREC_MIN) msg.push("🎯 Il manque de la précision ou du contexte ("+prec+"/100, objectif ≥ "+PREC_MIN+"). Qui le dit ? Combien exactement ? Que précisent les sources ?");
    $("fb-expl").innerHTML=msg.join("<br><br>");
    $("fb-stars").style.display="none";
    fb.scrollIntoView({behavior:"smooth",block:"center"});
    return;
  }
  // Succès !
  solved=true;
  const allRead=[...document.querySelectorAll(".source")].every(s=>s.classList.contains("read"));
  const got = attempts===1 ? (allRead?3:2) : (attempts===2?2:1);
  stars+=got;
  $("hud-stars").textContent="⭐ "+stars;
  fb.className="ok"; fb.style.display="block";
  $("fb-title").textContent="🗞️ Une publiée ! Le rédac chef applaudit.";
  let extra = (attempts===1 && !allRead) ? "<br><br><i>(Astuce : lire toutes les sources avant de publier rapporte 3 étoiles !)</i>" : "";
  $("fb-expl").innerHTML=L.lesson+extra;
  $("fb-stars").style.display="block";
  $("fb-stars").textContent="⭐".repeat(got)+"☆".repeat(3-got);
  $("publish").style.display="none";
  $("nextbtn").textContent = lvl===LEVELS.length-1 ? "Voir mon bilan ➜" : "Une suivante ➜";
  $("nextbtn").style.display="block";
  fb.scrollIntoView({behavior:"smooth",block:"center"});
}

function nextLevel(){
  if(lvl===LEVELS.length-1){ endGame(); return; }
  lvl++; renderLevel();
}

function endGame(){
  $("game").style.display="none";
  $("hud").style.display="none";
  $("end").style.display="block";
  const max=LEVELS.length*3;
  $("end-score").textContent="⭐ "+stars+" / "+max;
  let title,msg;
  if(stars>=max-2){title="🏆 Rédacteur en chef d'exception !";msg="Tes unes informent sans affoler. Tu maîtrises la leçon : <b>une info vraie peut quand même manipuler</b>, selon comment elle est cadrée. Toi, tu choisis le cadre honnête.";}
  else if(stars>=Math.round(max*0.55)){title="📰 Bon rédacteur !";msg="Tu sais désamorcer la plupart des titres anxiogènes. Réflexe à garder : <b>toujours retourner aux sources</b> — c'est là que se cachent les nuances (tâches ≠ emplois, signalements ≠ faits…).";}
  else{title="🗞️ Stagiaire prometteur";msg="Le cadrage est subtil ! Rejoue en lisant bien chaque source avant de publier : les pièges de « fausse précision » ne pardonnent pas.";}
  msg+="<br><br>💡 Souviens-toi : la prochaine fois qu'un titre te fait peur ou t'indigne, demande-toi : <b>« comment cette même info aurait-elle pu être présentée autrement ? »</b>";
  $("end-title").textContent=title;
  $("end-msg").innerHTML=msg;
}
