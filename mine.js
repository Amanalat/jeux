/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const QUESTIONS=[
  {
    type:'to-opinion',
    avant:"Fumer en public est ",mot:"interdit",apres:".",
    choix:["honteux","autorisé","légal"],correct:0,
    acc_fa:["interdit","interdite","illegal","illegale","prohibe","prohibee","proscrit","proscrite","sanctionne","sanctionnee","penalise","penalisee","reglemente","reglementee"],
    acc_op:["honteux","honteuse","scandaleux","scandaleuse","inadmissible","inacceptable","choquant","choquante","immoral","immorale","condamnable","horrible","mal","mauvais","mauvaise","normal","normale","acceptable","tolerable","banal","banale","discutable","libre","choquant"],
    pieges:{"fumer":"'Fumer' est le sujet — pas le mot qui porte le jugement.","public":"'Public' précise le lieu — ce n'est pas lui qui change le sens."},
    exp:"'Interdit' = fait légal vérifiable. 'Honteux' ou 'normal' = jugements — chacun son avis !"
  },
  {
    type:'to-opinion',
    avant:"Les commentaires haineux sont ",mot:"légalement",apres:" sanctionnés en France.",
    choix:["heureusement","légalement","rarement"],correct:0,
    acc_fa:["legalement","officiellement","juridiquement","penalement","reglementairement","par la loi"],
    acc_op:["heureusement","malheureusement","rarement","insuffisamment","enfin","injustement","logiquement","correctement","severement","trop peu"],
    pieges:{"commentaires":"'Commentaires haineux' est le sujet.","sanctions":"'Sanctionnés' décrit ce qui leur arrive — l'adverbe change le sens.","france":"'France' précise le lieu."},
    exp:"'Légalement' = loi vérifiable. 'Heureusement' ou 'rarement' = jugement sur son application !"
  },
  {
    type:'to-opinion',
    avant:"Les réseaux sociaux sont ",mot:"massivement",apres:" utilisés par les adolescents.",
    choix:["malheureusement","massivement","logiquement"],correct:0,
    acc_fa:["massivement","largement","majoritairement","frequemment","enormement","beaucoup","couramment","tres souvent","de plus en plus"],
    acc_op:["malheureusement","dangereusement","excessivement","trop","heureusement","naturellement","normalement","logiquement","evidemment","regrettablement"],
    pieges:{"reseaux":"'Réseaux sociaux' est le sujet.","utilises":"'Utilisés' décrit le comportement.","adolescents":"Précise qui."},
    exp:"'Massivement' = constat chiffrable. 'Malheureusement' ou 'heureusement' = ton point de vue !"
  },
  {
    type:'to-opinion',
    avant:"Le réchauffement climatique est un phénomène ",mot:"documenté",apres:".",
    choix:["catastrophique","documenté","récent"],correct:0,
    acc_fa:["documente","documentee","prouve","prouvee","mesure","mesuree","etabli","etablie","avere","averee","demontre","demontree","observe","observee","scientifique","verifie","verifiee","confirme","confirmee"],
    acc_op:["catastrophique","alarmant","alarmante","terrifiant","terrifiante","inquietant","inquietante","dramatique","desastreux","desastreuse","terrible","grave","urgent","urgente","exagere","exageree","discutable","contestable","relatif","relative","incertain","incertaine"],
    pieges:{"rechauffement":"'Réchauffement climatique' est le sujet.","phenomene":"'Phénomène' est le nom — l'adjectif qui le suit change tout."},
    exp:"'Documenté' = données scientifiques vérifiables. 'Catastrophique' ou 'exagéré' = jugements opposés !"
  },
  {
    type:'to-fait',
    avant:"Partager une fake news est un acte ",mot:"irresponsable",apres:".",
    choix:["irresponsable","répandu","honteux"],correct:1,
    acc_fa:["repandu","courante","courant","frequent","frequente","commun","commune","ordinaire","habituel","habituelle","banal","banale"],
    acc_op:["irresponsable","honteux","honteuse","condamnable","inadmissible","dangereux","dangereuse","grave","scandaleux","scandaleuse","immoral","immorale","mal","nuisible","normal","normale","comprehensible","excusable","anodin","anodine","innocent","innocente"],
    pieges:{"partager":"'Partager' est le verbe.","fake":"Fait partie du sujet.","news":"Fait partie du sujet.","acte":"'Acte' est le nom — l'adjectif qui suit change tout."},
    exp:"'Répandu' = fréquence vérifiable. 'Irresponsable' ou 'excusable' = jugements moraux opposés !"
  },
  {
    type:'to-opinion',
    avant:"L'intelligence artificielle est un ",mot:"enjeu",apres:" pour l'emploi.",
    choix:["danger","enjeu","sujet"],correct:0,
    acc_fa:["enjeu","sujet","facteur","defi","parametre","element","aspect"],
    acc_op:["danger","menace","bienfait","progres","catastrophe","revolution","fleau","opportunite","chance","risque","probleme","atout"],
    pieges:{"intelligence":"Fait partie du sujet.","artificielle":"Fait partie du sujet.","emploi":"'Emploi' précise le domaine concerné."},
    exp:"'Enjeu' = neutre, factuel. 'Danger' ou 'bienfait' = prise de position — chacun son avis !"
  },
  {
    type:'to-opinion',
    avant:"Les publicités ",mot:"influencent",apres:" les habitudes des consommateurs.",
    choix:["manipulent","influencent","modifient"],correct:0,
    acc_fa:["influencent","modifient","transforment","changent","affectent","etudient","analysent","observent","accompagnent"],
    acc_op:["manipulent","exploitent","conditionnent","trompent","abusent","instrumentalisent","orientent","fabriquent","formatent","enferment","liberent","enrichissent"],
    pieges:{"publicites":"'Publicités' est le sujet.","habitudes":"'Habitudes' est le complément.","consommateurs":"Précise qui."},
    exp:"'Influencent' = constat neutre et mesurable. 'Manipulent' = jugement moral sur l'intention !"
  },
  {
    type:'to-opinion',
    avant:"Les réseaux sociaux ",mot:"transforment",apres:" les relations sociales.",
    choix:["détruisent","transforment","modifient"],correct:0,
    acc_fa:["transforment","modifient","changent","affectent","reconfigurent","remodèlent","remodèlent","influencent","remodèlent"],
    acc_op:["detruisent","appauvrissent","enrichissent","remplacent","degradent","renforcent","fragilisent","abiment","empoisonnent","vitalisent","revolutionnent","bouleversent"],
    pieges:{"reseaux":"'Réseaux sociaux' est le sujet.","relations":"'Relations sociales' est le complément.","sociales":"Fait partie du complément."},
    exp:"'Transforment' = constat neutre. 'Détruisent' ou 'enrichissent' = jugement de valeur fort !"
  },
  {
    type:'to-fait',
    avant:"Les réseaux sociaux ",mot:"volent",apres:" des données personnelles sur leurs utilisateurs.",
    choix:["volent","collectent","espionnent"],correct:1,
    acc_fa:["collectent","enregistrent","stockent","traitent","recuperent","sauvegardent","conservent","accumulent","analysent","utilisent","partagent","revendent","transmettent","centralisent","archivent","memorisent","captent","exploitent"],
    acc_op:["volent","pillent","exploitent","s approprient","captent","siphonnent","aspirent","detournent","subtilisent","pompent","absorbent","raflent","recuperent illegalement","espionnent","surveillent","derobent","s emparent","piratent","confisquent"],
    pieges:{"reseaux":"'Réseaux sociaux' est le sujet.","donnees":"'Données personnelles' est le complément.","utilisateurs":"Précise à qui appartiennent les données."},
    exp:"'Collectent' = constat technique neutre et vérifiable. 'Volent' ou 'espionnent' = jugement moral sur l'intention !"
  },
  {
    type:'to-fait',
    avant:"Les réseaux sociaux sont un ",mot:"danger",apres:" pour la démocratie.",
    choix:["danger","enjeu","fléau"],correct:1,
    acc_fa:["enjeu","facteur","sujet","defi","parametre","element","composante","variable","phenomene","realite","aspect","donnee"],
    acc_op:["danger","menace","fleau","poison","probleme","risque","peril","cancer","frein","obstacle","atteinte","nuisance","bienfait","atout","progres","espoir","levier","moteur","soutien","renfort","chance","revolution","booster"],
    pieges:{"reseaux":"'Réseaux sociaux' est le sujet.","democratie":"'Démocratie' précise le domaine."},
    exp:"'Enjeu' = neutre, factuel — ne prend pas parti. 'Danger' ou 'bienfait' = jugement de valeur, chacun son avis !"
  },
  {
    type:'to-fait',
    avant:"Le smartphone est devenu un ",mot:"fléau",apres:" pour les adolescents.",
    choix:["fléau","outil","danger"],correct:1,
    acc_fa:["outil","appareil","objet","accessoire","dispositif","instrument","equipement","produit","technologie","support","terminal","moyen"],
    acc_op:["fleau","addiction","dependance","piege","esclavage","poison","probleme","obsession","danger","nuisance","menace","bienfait","atout","allie","revolution","progres","avantage","plaisir","liberte","outil precieux","compagnon","ami"],
    pieges:{"smartphone":"'Smartphone' est le sujet.","adolescents":"Précise à qui on s'intéresse."},
    exp:"'Outil' = neutre, factuel. 'Fléau' ou 'bienfait' = jugement de valeur — chacun son avis !"
  },
];

/* ══════════════════════════════════════
   NORMALIZE
══════════════════════════════════════ */
function norm(s){
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,' ').trim();
}
function chk(v,list){return list.some(a=>norm(a)===norm(v))}

/* ══════════════════════════════════════
   STATE
══════════════════════════════════════ */
let score=0, lives=3, mined=0, lvl=1;
let qPool=[], qIdx=0, answered=false, tries=0;
let blockClicks=0;       // clicks on current block (0→3 to reveal phrase)
let questionsToWin=10;   // 10 for normal, 5 for quick mode
let phase='mining';      // 'mining' | 'question'
let totalCracks=0;       // cracks across all blocks (never resets)

const CLICKS_NEEDED=3;

/* ══════════════════════════════════════
   CURSOR
══════════════════════════════════════ */
const cur=document.getElementById('cursor');
document.addEventListener('mousemove',e=>{
  cur.style.left=(e.clientX+5)+'px';
  cur.style.top=(e.clientY-22)+'px';
});

/* ══════════════════════════════════════
   HUD
══════════════════════════════════════ */
function updateHUD(){
  document.getElementById('h-score').textContent=score;
  document.getElementById('h-blocs').textContent=mined+'/'+questionsToWin;
  document.getElementById('sn').textContent=mined;
  const lv=document.getElementById('lives');lv.innerHTML='';
  for(let i=0;i<3;i++){
    const s=document.createElement('span');s.style.fontSize='15px';
    s.textContent=i<lives?'❤️':'🖤';lv.appendChild(s);
  }
}

/* ══════════════════════════════════════
   BLOCK CLICK
══════════════════════════════════════ */
function clickBlock(){
  if(phase!=='mining') return;

  doSwing();
  blockClicks++;
  spawnChips();

  // Add one crack per click (cumulative, never cleared)
  addCrackOnClick();

  // update counter
  const rem=CLICKS_NEEDED-blockClicks;
  const cc=document.getElementById('click-counter');
  if(rem>0){
    cc.textContent='⛏ '.repeat(blockClicks)+'· '.repeat(rem);
  } else {
    cc.textContent='';
  }

  // shake on each hit
  const bl=document.getElementById('block');
  bl.classList.remove('shaking');
  void bl.offsetWidth;
  bl.classList.add('shaking');

  if(blockClicks>=CLICKS_NEEDED){
    // reveal phrase
    setTimeout(()=>revealPhrase(),200);
  }
}

/* ══════════════════════════════════════
   CRACKS — accumulate across all blocks
══════════════════════════════════════ */
// All crack paths, normalized to viewBox 0 0 100 100
// Each block adds 2-3 new cracks per click cycle
/* ══════════════════════════════════════
   CRACK SYSTEM — jagged procedural cracks
   One new crack per block click (3 per question cycle)
   + one extra crack per correct answer
   Total: up to ~40 cracks over the game, never cleared
══════════════════════════════════════ */

// Seeded pseudo-random so cracks are deterministic per index
function seededRand(seed){
  let s=seed;
  return function(){
    s=(s*1664525+1013904223)&0xffffffff;
    return (s>>>0)/0xffffffff;
  };
}

// Generate a jagged crack path from (x0,y0) toward (x1,y1)
// Steps: number of intermediate points
// jitter: how much each step deviates sideways
function jaggedPath(x0,y0,x1,y1,steps,jitter,rng){
  const pts=[[x0,y0]];
  for(let i=1;i<=steps;i++){
    const t=i/(steps+1);
    const bx=x0+(x1-x0)*t;
    const by=y0+(y1-y0)*t;
    // perpendicular direction
    const dx=x1-x0, dy=y1-y0;
    const len=Math.sqrt(dx*dx+dy*dy)||1;
    const px=-dy/len, py=dx/len;
    const off=(rng()-.5)*2*jitter;
    pts.push([bx+px*off, by+py*off]);
  }
  pts.push([x1,y1]);
  return pts;
}

// Branch: from a midpoint, shoot a smaller crack sideways
function branchPath(px,py,angle,length,steps,jitter,rng){
  const x1=px+Math.cos(angle)*length;
  const y1=py+Math.sin(angle)*length;
  return jaggedPath(px,py,x1,y1,steps,jitter,rng);
}

// All crack definitions — origins spread across the whole block
// Each crack goes FROM a point anywhere on the block TO another point
const CRACK_DEFS=[
  // clicks 1-3
  {ox:10,oy:20, tx:35,ty:45, steps:5, jit:5, branch:false},
  {ox:85,oy:15, tx:60,ty:40, steps:5, jit:5, branch:false},
  {ox:20,oy:80, tx:45,ty:55, steps:5, jit:5, branch:false},
  // answer 1
  {ox:75,oy:85, tx:55,ty:55, steps:6, jit:6, branch:true},
  // clicks 4-6
  {ox:5, oy:50, tx:40,ty:50, steps:5, jit:4, branch:false},
  {ox:95,oy:30, tx:65,ty:45, steps:5, jit:4, branch:false},
  {ox:50,oy:5,  tx:50,ty:40, steps:5, jit:4, branch:false},
  // answer 2
  {ox:50,oy:95, tx:50,ty:62, steps:6, jit:6, branch:true},
  // clicks 7-9
  {ox:8, oy:8,  tx:30,ty:30, steps:5, jit:5, branch:false},
  {ox:92,oy:8,  tx:70,ty:30, steps:5, jit:5, branch:false},
  {ox:8, oy:92, tx:30,ty:70, steps:5, jit:5, branch:false},
  // answer 3
  {ox:92,oy:92, tx:70,ty:70, steps:6, jit:6, branch:true},
  // clicks 10-12
  {ox:30,oy:15, tx:5, ty:5,  steps:5, jit:5, branch:false},
  {ox:70,oy:85, tx:95,ty:95, steps:5, jit:5, branch:false},
  {ox:15,oy:55, tx:0, ty:75, steps:5, jit:5, branch:false},
  // answer 4
  {ox:85,oy:45, tx:100,ty:25,steps:5, jit:5, branch:true},
  // clicks 13-15
  {ox:50,oy:20, tx:20,ty:5,  steps:5, jit:5, branch:false},
  {ox:50,oy:20, tx:80,ty:5,  steps:5, jit:5, branch:false},
  {ox:25,oy:75, tx:0, ty:90, steps:5, jit:5, branch:false},
  // answer 5
  {ox:75,oy:25, tx:100,ty:10,steps:5, jit:5, branch:true},
  // clicks 16-18
  {ox:20,oy:40, tx:0, ty:20, steps:5, jit:6, branch:false},
  {ox:80,oy:60, tx:100,ty:80,steps:5, jit:6, branch:false},
  {ox:40,oy:90, tx:20,ty:100,steps:5, jit:6, branch:false},
  // answer 6
  {ox:60,oy:10, tx:80,ty:0,  steps:5, jit:6, branch:true},
  // clicks 19-21
  {ox:15,oy:30, tx:35,ty:60, steps:6, jit:6, branch:false},
  {ox:85,oy:70, tx:65,ty:40, steps:6, jit:6, branch:false},
  {ox:45,oy:5,  tx:25,ty:35, steps:6, jit:6, branch:false},
  // answer 7
  {ox:55,oy:95, tx:75,ty:65, steps:6, jit:6, branch:true},
  // clicks 22-24 — cracks now crossing the block
  {ox:5, oy:10, tx:95,ty:40, steps:7, jit:7, branch:true},
  {ox:5, oy:90, tx:95,ty:60, steps:7, jit:7, branch:true},
  {ox:20,oy:5,  tx:40,ty:95, steps:7, jit:7, branch:false},
  // answer 8
  {ox:80,oy:5,  tx:60,ty:95, steps:7, jit:7, branch:true},
  // clicks 25-27 — shattering all quadrants
  {ox:0, oy:0,  tx:45,ty:45, steps:6, jit:6, branch:true},
  {ox:100,oy:0, tx:55,ty:45, steps:6, jit:6, branch:true},
  {ox:0, oy:100,tx:45,ty:55, steps:6, jit:6, branch:true},
  // answer 9
  {ox:100,oy:100,tx:55,ty:55,steps:6, jit:6, branch:true},
  // clicks 28-30 — final destruction
  {ox:10,oy:50, tx:90,ty:50, steps:8, jit:8, branch:true},
  {ox:50,oy:10, tx:50,ty:90, steps:8, jit:8, branch:true},
  {ox:0, oy:0,  tx:100,ty:100,steps:8,jit:8, branch:true},
  // answer 10
  {ox:100,oy:0, tx:0,ty:100, steps:8, jit:8, branch:true},
];

let crackDrawnCount=0; // how many cracks have been drawn so far

function addCrackOnClick(){
  drawNextCrack();
}

function addCrackOnSuccess(){
  // Add 2 extra cracks on correct answer (denser)
  drawNextCrack();
  drawNextCrack();
}

function drawNextCrack(){
  if(crackDrawnCount>=CRACK_DEFS.length) return;
  const def=CRACK_DEFS[crackDrawnCount];
  const rng=seededRand(crackDrawnCount*137+42);
  const svg=document.getElementById('cracks');

  // Main crack
  const pts=jaggedPath(def.ox,def.oy,def.tx,def.ty,def.steps,def.jit,rng);
  renderCrackSVG(svg,pts,1.6,0.7);

  // Branch from midpoint
  if(def.branch){
    const mid=pts[Math.floor(pts.length/2)];
    const angle=rng()*Math.PI*2;
    const len=8+rng()*12;
    const bpts=branchPath(mid[0],mid[1],angle,len,3,def.jit*0.6,rng);
    renderCrackSVG(svg,bpts,1.0,0.5);
    // sometimes a second branch
    if(rng()>0.4){
      const angle2=angle+Math.PI*0.4+rng()*0.5;
      const bpts2=branchPath(mid[0],mid[1],angle2,len*0.7,2,def.jit*0.5,rng);
      renderCrackSVG(svg,bpts2,0.8,0.4);
    }
  }

  crackDrawnCount++;
}

function renderCrackSVG(svg,pts,shadowW,hlW){
  const d='M'+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' L');
  const sh=document.createElementNS('http://www.w3.org/2000/svg','path');
  sh.setAttribute('d',d);
  sh.setAttribute('stroke','rgba(0,0,0,.92)');
  sh.setAttribute('stroke-width',String(shadowW));
  sh.setAttribute('fill','none');
  sh.setAttribute('stroke-linecap','round');
  sh.setAttribute('stroke-linejoin','round');
  sh.setAttribute('vector-effect','non-scaling-stroke');
  svg.appendChild(sh);
  const hl=document.createElementNS('http://www.w3.org/2000/svg','path');
  hl.setAttribute('d',d);
  hl.setAttribute('stroke','rgba(255,255,255,.16)');
  hl.setAttribute('stroke-width',String(hlW));
  hl.setAttribute('fill','none');
  hl.setAttribute('stroke-linecap','round');
  hl.setAttribute('stroke-linejoin','round');
  hl.setAttribute('vector-effect','non-scaling-stroke');
  svg.appendChild(hl);
}

/* ══════════════════════════════════════
   REVEAL PHRASE
══════════════════════════════════════ */
function revealPhrase(){
  phase='question';
  document.getElementById('click-hint').style.display='none';
  document.getElementById('click-counter').textContent='';
  renderPhrase(qPool[qIdx]);
  document.getElementById('phrase-panel').classList.add('show');
}

/* ══════════════════════════════════════
   RENDER PHRASE
══════════════════════════════════════ */
function renderPhrase(q){
  const con=document.getElementById('consigne');
  const ph=document.getElementById('phrase-text');
  const hint=document.getElementById('phrase-hint');
  const ch=document.getElementById('choices');
  const ip=document.getElementById('ip-row');
  const fb=document.getElementById('panel-fb');
  const nx=document.getElementById('panel-next');
  const tr=document.getElementById('ip-tries');

  fb.className='fb';fb.style.display='none';
  nx.style.display='none';ch.innerHTML='';
  ip.style.display='none';tr.textContent='';
  answered=false;tries=0;

  if(q.type==='to-fait'){con.className='fait';con.textContent="OPINION → FAIT";}
  else{con.className='opinion';con.textContent="FAIT → OPINION";}

  // Build phrase with HTML spans
  ph.innerHTML='';
  const full=q.avant+q.mot+q.apres;
  const tokens=full.split(/(\s+)/);
  tokens.forEach(tok=>{
    if(/^\s+$/.test(tok)){ph.appendChild(document.createTextNode(' '));return;}
    const span=document.createElement('span');
    span.className='w';
    span.textContent=tok;
    const isTarget=norm(tok)===norm(q.mot);
    if(lvl===1 && isTarget){
      span.classList.add('ore');
      span.addEventListener('click',()=>{if(!answered)openAnswer(q,span,isTarget);});
    } else if(lvl===2){
      span.classList.add('clickable');
      span.addEventListener('click',()=>{if(!answered)openAnswer(q,span,isTarget);});
    }
    ph.appendChild(span);
  });

  if(lvl===1){
    hint.textContent='⛏ CLIQUE LE MOT EN OR';
    document.body.classList.remove('lvl2');
  } else {
    hint.textContent='⛏ CLIQUE LE MOT À CHANGER';
    document.body.classList.add('lvl2');
  }
}

/* ══════════════════════════════════════
   OPEN ANSWER
══════════════════════════════════════ */
function openAnswer(q, span, isTarget){
  const ch=document.getElementById('choices');
  const ip=document.getElementById('ip-row');
  const tr=document.getElementById('ip-tries');

  if(lvl===1){
    // show 3 choices
    const label=document.getElementById('panel-fb');
    ch.innerHTML='';ch.style.display='grid';ip.style.display='none';
    q.choix.forEach((c,i)=>{
      const b=document.createElement('button');
      b.className='cbtn';b.textContent=c;
      b.addEventListener('click',()=>{if(!answered)pickChoice(b,i,q);});
      ch.appendChild(b);
    });
  } else {
    // lvl2: check if correct word
    if(!isTarget){
      const cw=norm(span.textContent);
      const piege=Object.keys(q.pieges||{}).find(k=>norm(k)===cw);
      if(piege){
        const fb=document.getElementById('panel-fb');
        fb.className='fb hint';fb.textContent='💡 '+q.pieges[piege];fb.style.display='block';
        setTimeout(()=>{fb.style.display='none';},2000);
      }
      return;
    }
    // correct word selected
    document.querySelectorAll('.w.selected').forEach(s=>s.classList.remove('selected'));
    span.classList.add('selected');
    ch.innerHTML='';ch.style.display='none';
    ip.style.display='flex';tr.textContent='2 ESSAIS';
    const inp=document.getElementById('ip-in');
    inp.value='';
    setTimeout(()=>inp.focus(),80);
  }
}

/* ══════════════════════════════════════
   PICK CHOICE (lvl1)
══════════════════════════════════════ */
function pickChoice(btn,idx,q){
  answered=true;
  document.querySelectorAll('.cbtn').forEach(b=>b.disabled=true);
  const fb=document.getElementById('panel-fb');
  const nx=document.getElementById('panel-next');
  if(idx===q.correct){
    btn.classList.add('ok');
    fb.className='fb ok';fb.textContent='✔ '+q.exp;fb.style.display='block';
    onSuccess();
  } else {
    btn.classList.add('ko');
    document.querySelectorAll('.cbtn')[q.correct].classList.add('ok');
    fb.className='fb ko';fb.textContent='✘ '+q.exp;fb.style.display='block';
    onFail();
    if(lives<=0){setTimeout(()=>{closePanel();showOver();},1800);return;}
  }
  nx.style.display='block';
  nx.textContent=mined>=questionsToWin?'[ TROUVER LE DIAMANT ! ]':'[ MINER LE BLOC SUIVANT ]';
  nx.onclick=mined>=questionsToWin?doWin:nextBlock;
}

/* ══════════════════════════════════════
   VALIDATE INPUT (lvl2)
══════════════════════════════════════ */
// Stored extra accepted words per question (teacher additions)
const extraAccepted={};

function forceValidate(){
  const q=qPool[qIdx];
  const val=document.getElementById('ip-in').value.trim();
  if(!val)return;
  const key=qIdx+'_'+q.type;
  if(!extraAccepted[key]) extraAccepted[key]=[];
  extraAccepted[key].push(val);
  // save to localStorage for persistence
  try{
    const stored=JSON.parse(localStorage.getItem('mine_extra')||'{}');
    const qKey=q.avant+q.mot+q.apres+'_'+q.type;
    if(!stored[qKey]) stored[qKey]=[];
    if(!stored[qKey].includes(val)) stored[qKey].push(val);
    localStorage.setItem('mine_extra',JSON.stringify(stored));
  }catch(e){}
  // now validate
  answered=true;
  const fb=document.getElementById('panel-fb');
  const nx=document.getElementById('panel-next');
  document.getElementById('btn-force').style.display='none';
  document.getElementById('ip-row').style.display='none';
  document.getElementById('ip-tries').textContent='';
  fb.className='fb ok';fb.textContent="🔑 Mot \""+val+"\" accepté et enregistré ! "+qPool[qIdx].exp;fb.style.display='block';
  document.querySelectorAll('.w.selected').forEach(s=>{
    s.textContent=val;s.classList.remove('selected');s.style.color='#00ff88';
  });
  onSuccess();
  nx.style.display='block';
  nx.textContent=mined>=questionsToWin?'[ TROUVER LE DIAMANT ! ]':'[ MINER LE BLOC SUIVANT ]';
  nx.onclick=mined>=questionsToWin?doWin:nextBlock;
}

function getExtraList(q){
  try{
    const stored=JSON.parse(localStorage.getItem('mine_extra')||'{}');
    const qKey=q.avant+q.mot+q.apres+'_'+q.type;
    return stored[qKey]||[];
  }catch(e){return []}
}

function validateInput(){
  if(answered)return;
  const q=qPool[qIdx];
  const val=document.getElementById('ip-in').value.trim();
  if(!val)return;
  const list=q.type==='to-fait'?q.acc_fa:q.acc_op;
  const fb=document.getElementById('panel-fb');
  const nx=document.getElementById('panel-next');
  const tr=document.getElementById('ip-tries');

  const extra=getExtraList(q);
  if(chk(val,list)||chk(val,extra)){
    answered=true;
    fb.className='fb ok';fb.textContent='✔ '+q.exp;fb.style.display='block';
    document.getElementById('btn-force').style.display='none';
    document.getElementById('ip-row').style.display='none';tr.textContent='';
    // update word visually
    document.querySelectorAll('.w.selected').forEach(s=>{
      s.textContent=val;s.classList.remove('selected');s.style.color='#00ff88';
    });
    onSuccess();
    nx.style.display='block';
    nx.textContent=mined>=questionsToWin?'[ TROUVER LE DIAMANT ! ]':'[ MINER LE BLOC SUIVANT ]';
    nx.onclick=mined>=questionsToWin?doWin:nextBlock;
  } else {
    tries++;
    if(tries>=2){
      answered=true;
      fb.className='fb ko';fb.textContent='✘ '+q.exp+' — Ex: "'+list[0]+'"';fb.style.display='block';
      document.getElementById('ip-row').style.display='none';tr.textContent='';
      document.getElementById('btn-force').style.display='block';
      onFail();
      if(lives<=0){setTimeout(()=>{closePanel();showOver();},2000);return;}
      nx.style.display='block';
      nx.textContent=mined>=questionsToWin?'[ TROUVER LE DIAMANT ! ]':'[ MINER LE BLOC SUIVANT ]';
      nx.onclick=mined>=questionsToWin?doWin:nextBlock;
    } else {
      fb.className='fb hint';fb.textContent='💡 Pas tout à fait — essaie un autre mot.';fb.style.display='block';
      tr.textContent='1 ESSAI RESTANT';
      document.getElementById('btn-force').style.display='block';
      document.getElementById('ip-in').value='';
      document.getElementById('ip-in').focus();
    }
  }
}
document.getElementById('ip-in').addEventListener('keydown',e=>{
  if(e.key==='Enter'){e.preventDefault();validateInput();}
});

/* ══════════════════════════════════════
   SUCCESS / FAIL
══════════════════════════════════════ */
function onSuccess(){
  score+=lvl===1?100:150;
  mined++;
  updateHUD();
  addCrackOnSuccess();
  flashBlock(true);
}
function onFail(){
  lives--;updateHUD();
  flashBlock(false);
  const d=document.getElementById('dmg');
  d.style.opacity='1';setTimeout(()=>d.style.opacity='0',280);
}

function flashBlock(ok){
  const b=document.getElementById('block');
  const col=ok?'rgba(0,255,100,.3)':'rgba(255,0,0,.3)';
  b.style.outline=`4px solid ${ok?'#00ff88':'#ff4466'}`;
  b.style.boxShadow=`0 0 30px ${col}`;
  setTimeout(()=>{b.style.outline='';b.style.boxShadow='';},400);
}

/* ══════════════════════════════════════
   NEXT BLOCK
══════════════════════════════════════ */
function nextBlock(){
  closePanel();
  blockClicks=0;
  phase='mining';
  document.getElementById('click-hint').style.display='block';
  document.getElementById('click-counter').textContent='';
  qIdx=(qIdx+1)%qPool.length;
  // don't clear SVG — cracks stay!
}

function closePanel(){
  const p=document.getElementById('phrase-panel');
  p.classList.remove('show');
}

/* ══════════════════════════════════════
   FX
══════════════════════════════════════ */
function doSwing(){
  document.body.classList.add('swing');
  setTimeout(()=>document.body.classList.remove('swing'),180);
}

function spawnChips(){
  const b=document.getElementById('block');
  const r=b.getBoundingClientRect();
  const cx=r.left+r.width/2, cy=r.top+r.height/3;
  const c=document.getElementById('ptc');
  const cols=['#888','#777','#666','#999','#aaa','#555','#bbb'];
  for(let i=0;i<12;i++){
    const el=document.createElement('div');el.className='chip';
    const sz=3+Math.random()*7;
    const ang=(Math.random()-.5)*Math.PI-Math.PI/2;
    const spd=30+Math.random()*80;
    el.style.cssText=`width:${sz}px;height:${sz}px;background:${cols[i%cols.length]};
      position:absolute;left:${cx}px;top:${cy}px;
      --dx:${Math.cos(ang)*spd}px;--dy:${Math.sin(ang)*spd}px;
      --dr:${Math.random()*360}deg;--d:${.3+Math.random()*.4}s`;
    c.appendChild(el);setTimeout(()=>el.remove(),600);
  }
}

function launchConfetti(){
  const cols=['#00ff88','#00dcff','#ffd700','#ff3cac','#ff8800','#fff'];
  const c=document.getElementById('ptc');
  if(!document.getElementById('cfstyle')){
    const s=document.createElement('style');s.id='cfstyle';
    s.textContent=`@keyframes cff{0%{opacity:1;transform:translateY(0) rotate(0)}100%{opacity:0;transform:translateY(110vh) rotate(720deg)}}`;
    document.head.appendChild(s);
  }
  for(let i=0;i<80;i++){
    setTimeout(()=>{
      const el=document.createElement('div');
      const sz=4+Math.random()*8,col=cols[i%cols.length];
      el.style.cssText=`position:fixed;left:${Math.random()*100}vw;top:-16px;
        width:${sz}px;height:${sz}px;background:${col};
        border-radius:${Math.random()>.5?'0':'50%'};pointer-events:none;
        animation:cff ${1.2+Math.random()*2}s linear forwards;`;
      c.appendChild(el);setTimeout(()=>el.remove(),3400);
    },i*30);
  }
}

/* ══════════════════════════════════════
   SCREENS
══════════════════════════════════════ */
function doWin(){
  closePanel();
  document.getElementById('win-pts').textContent=score+' PTS';
  document.getElementById('win-screen').style.display='flex';
  launchConfetti();
}
function showOver(){document.getElementById('over-screen').style.display='flex';}
function goMenu(){
  document.getElementById('win-screen').style.display='none';
  document.getElementById('over-screen').style.display='none';
  document.getElementById('duration-screen').style.display='none';
  document.getElementById('menu-screen').style.display='flex';
}
let pendingLvl=1;

function showDurationPicker(l){
  pendingLvl=l;
  document.getElementById('dur-title').textContent=l===1?'EXTRACTION FACILE':'EXTRACTION DIFFICILE';
  document.getElementById('menu-screen').style.display='none';
  document.getElementById('duration-screen').style.display='flex';
}

function selectDuration(n){
  lvl=pendingLvl;
  questionsToWin=n;
  document.getElementById('duration-screen').style.display='none';
  // show tuto adapted to level
  document.getElementById('tuto-step-lvl1').style.display=lvl===1?'flex':'none';
  document.getElementById('tuto-step-lvl2').style.display=lvl===2?'flex':'none';
  document.getElementById('tuto').style.display='flex';
  startGame();
}

function selectLvl(l){
  lvl=l;
  document.getElementById('menu-screen').style.display='none';
  startGame();
}
function restart(){
  document.getElementById('win-screen').style.display='none';
  document.getElementById('over-screen').style.display='none';
  startGame();
}

/* ══════════════════════════════════════
   START
══════════════════════════════════════ */
function closeTuto(){
  document.getElementById('tuto').style.display='none';
}

function startGame(){
  score=0;lives=3;mined=0;qIdx=0;answered=false;tries=0;
  blockClicks=0;phase='mining';totalCracks=0;crackDrawnCount=0;
  document.getElementById('cracks').innerHTML='';
  document.getElementById('click-hint').style.display='block';
  document.getElementById('click-counter').textContent='';
  updateHUD();
  if(questionsToWin===5){
    // balanced 5-question pool: at least 2 to-fait + 2 to-opinion
    const toFait=QUESTIONS.filter(q=>q.type==='to-fait').sort(()=>Math.random()-.5);
    const toOp  =QUESTIONS.filter(q=>q.type==='to-opinion').sort(()=>Math.random()-.5);
    const mixed=[...toFait.slice(0,2),...toOp.slice(0,2),...[...toFait.slice(2),...toOp.slice(2)].slice(0,1)];
    qPool=mixed.sort(()=>Math.random()-.5);
  } else {
    const sh=[...QUESTIONS].sort(()=>Math.random()-.5);
    qPool=[];while(qPool.length<13)qPool=[...qPool,...sh];
    qPool=qPool.slice(0,13);
  }
  closePanel();
}

updateHUD();

/* ══════════════════════════════════════
   EXPORT TEACHER WORDS
══════════════════════════════════════ */
function showExport(){
  let stored={};
  try{ stored=JSON.parse(localStorage.getItem('mine_extra')||'{}'); }catch(e){}
  const keys=Object.keys(stored);
  let out='';
  if(keys.length===0){
    out="Aucun mot ajouté pour l'instant.";
  } else {
    out="Mots validés par l'enseignant :\n\n";
    keys.forEach(k=>{
      const words=stored[k];
      if(words&&words.length){
        out+=k+'\n  \u2192 '+words.join(', ')+'\n\n';
      }
    });
    out+='\n--- COPIE POUR CLAUDE ---\n';
    out+=JSON.stringify(stored,null,2);
  }
  // Show in a modal
  let modal=document.getElementById('export-modal');
  if(!modal){
    modal=document.createElement('div');
    modal.id='export-modal';
    modal.style.cssText='position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;padding:20px';
    modal.innerHTML=`
      <div style="background:#151515;border:3px solid #555;border-top-color:#aaa;border-left-color:#aaa;max-width:560px;width:100%;padding:20px;max-height:80vh;display:flex;flex-direction:column;gap:10px">
        <div style="font-family:'Press Start 2P',monospace;font-size:.5rem;color:#ffd700">MOTS AJOUTÉS</div>
        <textarea id="export-txt" readonly style="flex:1;min-height:200px;background:#0a0a0a;border:2px solid #444;color:#aaffcc;font-family:VT323,monospace;font-size:1rem;padding:10px;resize:none;outline:none"></textarea>
        <div style="display:flex;gap:8px">
          <button onclick="document.getElementById('export-txt').select();document.execCommand('copy');this.textContent='✔ COPIÉ !';setTimeout(()=>this.textContent='📋 COPIER',1500)"
            style="flex:1;padding:8px;background:#003300;border:2px solid #00aa00;border-top-color:#00ff00;border-left-color:#00ff00;font-family:'Press Start 2P',monospace;font-size:.38rem;color:#00ff88;cursor:none">📋 COPIER</button>
          <button onclick="if(confirm("Effacer tous les mots ajoutés ?")){localStorage.removeItem('mine_extra');document.getElementById('export-txt').value='(effacé)';}"
            style="padding:8px 14px;background:#330000;border:2px solid #aa0000;border-top-color:#ff0000;border-left-color:#ff0000;font-family:'Press Start 2P',monospace;font-size:.38rem;color:#ff6666;cursor:none">🗑 EFFACER</button>
          <button onclick="document.getElementById('export-modal').style.display='none'"
            style="padding:8px 14px;background:#1e1e1e;border:2px solid #555;border-top-color:#888;border-left-color:#888;font-family:'Press Start 2P',monospace;font-size:.38rem;color:#999;cursor:none">✕ FERMER</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }
  document.getElementById('export-txt').value=out;
  modal.style.display='flex';
}
