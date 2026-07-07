/* ═══════════════════════════════════════════════════
   QUESTIONS
═══════════════════════════════════════════════════ */
const QUESTIONS = [
  // FAITS
  {text:"La girafe est le plus grand animal terrestre du monde.",answer:"fait",cat:"🦒",exp:"📋 FAIT ! Les girafes atteignent jusqu'à 6 mètres. C'est mesurable et vérifiable !"},
  {text:"La planète Mars est plus petite que la Terre.",answer:"fait",cat:"🚀",exp:"📋 FAIT ! Mars : ~6 800 km de diamètre, la Terre : ~12 742 km. C'est prouvé par les scientifiques !"},
  {text:"Le Nil est le fleuve le plus long du monde.",answer:"fait",cat:"🌍",exp:"📋 FAIT ! Le Nil mesure ~6 650 km. Les géographes l'ont mesuré avec précision."},
  {text:"Les dauphins sont des mammifères, pas des poissons.",answer:"fait",cat:"🐬",exp:"📋 FAIT ! Les dauphins respirent de l'air et allaitent leurs petits — ce sont bien des mammifères."},
  {text:"La lumière voyage plus vite que le son.",answer:"fait",cat:"🔬",exp:"📋 FAIT ! Lumière : 300 000 km/s. Son : 340 m/s. C'est pour ça qu'on voit l'éclair avant le tonnerre !"},
  {text:"Les araignées ont huit pattes.",answer:"fait",cat:"🕷️",exp:"📋 FAIT ! Toutes les araignées ont exactement 8 pattes. C'est ce qui les distingue des insectes (6 pattes)."},
  {text:"La Tour Eiffel se trouve à Paris.",answer:"fait",cat:"🗼",exp:"📋 FAIT ! La Tour Eiffel est bien à Paris, en France. On peut le vérifier sur n'importe quelle carte !"},
  {text:"Le cœur humain bat en moyenne 70 fois par minute.",answer:"fait",cat:"❤️",exp:"📋 FAIT ! Les médecins mesurent le pouls et constatent environ 60 à 80 battements par minute au repos."},
  {text:"Les chauves-souris sont des mammifères.",answer:"fait",cat:"🦇",exp:"📋 FAIT ! Les chauves-souris allaitent leurs petits et ont des poils. Ce sont des mammifères ailés !"},
  {text:"L'eau bout à 100°C au niveau de la mer.",answer:"fait",cat:"💧",exp:"📋 FAIT ! C'est une loi physique vérifiable avec un thermomètre. On peut le prouver par l'expérience !"},
  {text:"Le Soleil est une étoile.",answer:"fait",cat:"☀️",exp:"📋 FAIT ! Le Soleil est une étoile de type nain jaune. Les astronomes peuvent le mesurer et l'analyser."},
  {text:"Les baleines bleues sont les plus grands animaux ayant jamais existé.",answer:"fait",cat:"🐋",exp:"📋 FAIT ! Elles peuvent dépasser 30 mètres. Les scientifiques ont mesuré leurs squelettes et fossiles !"},
  {text:"Un triangle a trois côtés.",answer:"fait",cat:"📐",exp:"📋 FAIT ! Par définition, un triangle a toujours exactement trois côtés. C'est une vérité mathématique !"},
  {text:"La France a 101 départements.",answer:"fait",cat:"🇫🇷",exp:"📋 FAIT ! La France compte bien 101 départements, dont 5 outre-mer. C'est officiel et vérifiable !"},
  {text:"Les plantes produisent leur nourriture grâce à la photosynthèse.",answer:"fait",cat:"🌱",exp:"📋 FAIT ! Les plantes transforment la lumière du soleil, l'eau et le CO₂ en sucre. C'est prouvé par la science !"},
  // OPINIONS
  {text:"La pizza est le meilleur plat du monde.",answer:"opinion",cat:"🍕",exp:"💬 OPINION ! Certains préfèrent les sushis ou le couscous. Le « meilleur » dépend des goûts de chacun !"},
  {text:"Les films d'aventure sont plus excitants que les comédies.",answer:"opinion",cat:"🎬",exp:"💬 OPINION ! Ce qui est « excitant » dépend de chaque personne. Certains adorent rire !"},
  {text:"Il est plus amusant de jouer dehors que sur console.",answer:"opinion",cat:"🎮",exp:"💬 OPINION ! Certains adorent les jeux vidéo, d'autres le plein air. C'est un avis personnel !"},
  {text:"Le printemps est la plus belle saison de l'année.",answer:"opinion",cat:"🌸",exp:"💬 OPINION ! Les amoureux de la neige préfèrent l'hiver, les fans de plage adorent l'été !"},
  {text:"Les romans sont plus intéressants que les bandes dessinées.",answer:"opinion",cat:"📚",exp:"💬 OPINION ! Beaucoup adorent les BD autant que les romans. C'est une question de préférence !"},
  {text:"Le football est le sport le plus passionnant.",answer:"opinion",cat:"⚽",exp:"💬 OPINION ! Les fans de tennis, de natation ou de basket ne seraient pas d'accord ! C'est subjectif."},
  {text:"Les chats sont de meilleurs animaux de compagnie que les chiens.",answer:"opinion",cat:"🐱",exp:"💬 OPINION ! Certaines personnes adorent les chiens, d'autres préfèrent les chats. C'est personnel !"},
  {text:"Les mathématiques sont la matière la plus difficile à l'école.",answer:"opinion",cat:"➕",exp:"💬 OPINION ! Pour certains élèves, c'est le français ou l'histoire qui est plus dur. C'est subjectif !"},
  {text:"Il vaut mieux vivre à la campagne qu'en ville.",answer:"opinion",cat:"🌾",exp:"💬 OPINION ! Certains adorent le calme de la campagne, d'autres préfèrent l'animation de la ville !"},
  {text:"La musique classique est plus belle que la musique pop.",answer:"opinion",cat:"🎵",exp:"💬 OPINION ! Les goûts musicaux varient énormément selon les personnes. Il n'y a pas de « meilleure » musique !"},
  {text:"Les vacances d'été sont les meilleures vacances.",answer:"opinion",cat:"☀️",exp:"💬 OPINION ! Certains adorent les vacances d'hiver pour skier. C'est une question de goût !"},
  {text:"Le dessin animé est fait uniquement pour les enfants.",answer:"opinion",cat:"🎨",exp:"💬 OPINION ! Des millions d'adultes regardent des dessins animés. C'est un avis, pas un fait !"},
  {text:"Lire est plus enrichissant que regarder des vidéos.",answer:"opinion",cat:"📖",exp:"💬 OPINION ! Les deux peuvent être enrichissants selon les contenus. C'est un point de vue personnel !"},
  {text:"Le chocolat noir est meilleur que le chocolat au lait.",answer:"opinion",cat:"🍫",exp:"💬 OPINION ! C'est une question de goût ! Certains préfèrent le lait, d'autres le noir ou le blanc."},
  {text:"Les dinosaures étaient les animaux les plus impressionnants.",answer:"opinion",cat:"🦕",exp:"💬 OPINION ! « Impressionnant » est subjectif. Certains trouvent les baleines bleues ou les aigles plus impressionnants !"},
  // FAITS — lot 2
  {text:"L'éléphant d'Afrique est l'animal terrestre le plus lourd du monde, pouvant peser jusqu'à 7 tonnes.",answer:"fait",cat:"🐘",exp:"📋 FAIT ! Les scientifiques ont pesé et comparé : aucun autre animal terrestre n'est aussi lourd !"},
  {text:"L'eau se transforme en glace à 0°C.",answer:"fait",cat:"🧊",exp:"📋 FAIT ! C'est une loi physique vérifiable avec un thermomètre dans n'importe quel congélateur !"},
  {text:"Le lion est un carnivore.",answer:"fait",cat:"🦁",exp:"📋 FAIT ! Les biologistes ont observé que le lion se nourrit exclusivement de viande."},
  {text:"La Lune n'émet pas de lumière, elle réfléchit celle du Soleil.",answer:"fait",cat:"🌕",exp:"📋 FAIT ! Les astronomes l'ont prouvé : la Lune est un astre non lumineux."},
  {text:"Le corps humain est composé de plus de 60 % d'eau.",answer:"fait",cat:"💧",exp:"📋 FAIT ! Les scientifiques ont analysé la composition du corps humain : l'eau y est l'élément majoritaire !"},
  // OPINIONS — lot 2
  {text:"La cuisine mexicaine est plus savoureuse que la cuisine italienne.",answer:"opinion",cat:"🌮",exp:"💬 OPINION ! Les goûts varient selon les personnes. Certains adorent les pâtes autant que les tacos !"},
  {text:"Les chiens sont plus intelligents que les chats.",answer:"opinion",cat:"🐶",exp:"💬 OPINION ! « Intelligent » est subjectif. Les chats et les chiens ont des formes d'intelligence différentes !"},
  {text:"Les cours d'art sont plus importants que les cours de sport.",answer:"opinion",cat:"🎨",exp:"💬 OPINION ! Certains élèves adorent le sport autant que le dessin. C'est une question de valeurs !"},
  {text:"La nuit est plus belle que le jour.",answer:"opinion",cat:"🌙",exp:"💬 OPINION ! Certains adorent le soleil, d'autres les étoiles. C'est un avis personnel !"},
  {text:"Les parcs d'attractions sont l'endroit le plus amusant du monde.",answer:"opinion",cat:"🎡",exp:"💬 OPINION ! Certains préfèrent la plage, la montagne ou les musées. C'est subjectif !"},
];

const QUESTIONS_TO_WIN = 10;
const MAX_LIVES = 3;
const STORAGE_KEY = 'planetConnaissance_usedQ';

function loadPersistentUsed() {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); }
  catch { return new Set(); }
}
function savePersistentUsed(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

/* ═══════════════════════════════════════════════════
   CANVAS SETUP
═══════════════════════════════════════════════════ */
const cv = document.getElementById('c');
const ctx = cv.getContext('2d');
let W, H;
function resize(){
  W = cv.width = window.innerWidth;
  H = cv.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

/* ═══════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════ */
let state = 'intro'; // intro | playing | question | landing | win | over
let score = 0, lives = 3, qIndex = 0;
let answered = false, questionAnsweredCorrectly = false;
let scrollY = 0;
const WORLD_HEIGHT = 3000;
let activeAsteroid = null;
let lastAsteroidSpawn = 0;
let qPool = [];
let usedQuestions = new Set();
let destroyedCount = 0;
let asteroidSpeed = 1; // multiplier 1–5, default 2

/* ═══════════════════════════════════════════════════
   STARS — streaking downward for speed effect
═══════════════════════════════════════════════════ */
const STARS = [];
function initStars(){
  STARS.length = 0;
  for(let i = 0; i < 200; i++){
    STARS.push({
      x: Math.random(),
      y: Math.random(),
      speed: 0.003 + Math.random() * 0.012,   // normalized per frame
      r: 0.5 + Math.random() * 1.8,
      a: 0.3 + Math.random() * 0.7,
      layer: Math.floor(Math.random()*3)  // 0=far,1=mid,2=close
    });
  }
}
initStars();

/* ═══════════════════════════════════════════════════
   NEBULAS
═══════════════════════════════════════════════════ */
const NEBULAS=[];
function initNebulas(){
  NEBULAS.length=0;
  for(let i=0;i<12;i++){
    NEBULAS.push({
      worldY: Math.random()*WORLD_HEIGHT,
      x: Math.random(),
      rx: 200+Math.random()*300, ry: 120+Math.random()*200,
      c: [`rgba(0,80,200,.06)`,`rgba(150,0,180,.05)`,`rgba(0,180,150,.04)`,`rgba(200,80,0,.04)`][Math.floor(Math.random()*4)]
    });
  }
}
initNebulas();

/* ═══════════════════════════════════════════════════
   SHIP
═══════════════════════════════════════════════════ */
const ship = {
  x: 0.5,          // normalized 0..1
  y: 0.82,         // normalized
  w: 38, h: 52,    // half-sizes
  vx: 0,
  flame: 0,
  trail: [],
  invincible: 0,   // frames of invincibility after hit
  shakeX: 0,
  exploding: false, explodeParts: [], explodeT: 0
};

/* mouse/touch control */
let pointerX = null;
cv.addEventListener('mousemove', e=>{pointerX = e.clientX/W});
cv.addEventListener('touchmove', e=>{e.preventDefault();pointerX=e.touches[0].clientX/W},{passive:false});
cv.addEventListener('touchstart', e=>{
  pointerX=e.touches[0].clientX/W;
  if(state==='playing') fireLaser();
},{passive:false});

/* keyboard */
const keys = { left: false, right: false };

document.addEventListener('keydown', e=>{
  // Ship movement
  if(e.code==='ArrowLeft')  { e.preventDefault(); keys.left  = true; }
  if(e.code==='ArrowRight') { e.preventDefault(); keys.right = true; }

  // Fire
  if(e.code==='Space' && state==='playing'){ e.preventDefault(); fireLaser(); }

  // Modal navigation with arrows + confirm with Enter/Space
  if(state==='question'){
    if(e.code==='ArrowLeft' || e.code==='ArrowRight'){
      e.preventDefault();
      toggleModalSelection();
    }
    if((e.code==='Enter' || e.code==='Space') && !answered){
      e.preventDefault();
      const sel = document.querySelector('.ans-btn.kb-focus');
      if(sel) answer(sel.id === 'btn-fait' ? 'fait' : 'opinion');
    }
    if((e.code==='Enter' || e.code==='Space') && answered){
      e.preventDefault();
      const cont = document.getElementById('q-continue');
      if(cont.style.display !== 'none') closeQuestion();
    }
  }
});

document.addEventListener('keyup', e=>{
  if(e.code==='ArrowLeft')  keys.left  = false;
  if(e.code==='ArrowRight') keys.right = false;
});

/* Toggle keyboard focus between FAIT and OPINION buttons */
let kbSelected = 'fait'; // default selection
function initModalKeyboard(){
  kbSelected = 'fait';
  applyModalFocus();
}
function applyModalFocus(){
  const bF = document.getElementById('btn-fait');
  const bO = document.getElementById('btn-op');
  if(!bF || !bO) return;
  bF.classList.toggle('kb-focus', kbSelected === 'fait');
  bO.classList.toggle('kb-focus', kbSelected === 'opinion');
}
function toggleModalSelection(){
  if(answered) return;
  kbSelected = kbSelected === 'fait' ? 'opinion' : 'fait';
  applyModalFocus();
}

/* Tap/click to fire on desktop too */
cv.addEventListener('click', e=>{
  if(state==='playing'){ pointerX=e.clientX/W; fireLaser(); }
});

/* ═══════════════════════════════════════════════════
   LASERS
═══════════════════════════════════════════════════ */
const lasers = [];
let lastFireTime = 0;
const FIRE_COOLDOWN = 300; // ms between shots

function fireLaser(){
  const now = performance.now();
  if(now - lastFireTime < FIRE_COOLDOWN) return;
  lastFireTime = now;
  lasers.push({
    x: ship.x,
    y: ship.y - 0.06,
    vy: -0.022,   // moves upward fast
    life: 1,
    hit: false
  });
}

function drawLasers(){
  lasers.forEach(l=>{
    if(l.hit) return;
    const lx = l.x * W;
    const ly = l.y * H;
    ctx.save();
    // outer glow
    ctx.shadowColor='#00ffcc';
    ctx.shadowBlur=18;
    ctx.strokeStyle='rgba(0,255,200,0.9)';
    ctx.lineWidth=3;
    ctx.lineCap='round';
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.lineTo(lx, ly + 22);
    ctx.stroke();
    // bright core
    ctx.shadowBlur=6;
    ctx.strokeStyle='#ffffff';
    ctx.lineWidth=1.5;
    ctx.beginPath();
    ctx.moveTo(lx, ly+2);
    ctx.lineTo(lx, ly+18);
    ctx.stroke();
    ctx.restore();
  });
}

/* ═══════════════════════════════════════════════════
   ASTEROIDS
═══════════════════════════════════════════════════ */
const asteroids = [];
function spawnAsteroid(){
  if(qPool.length === 0) return;
  const q = qPool.shift();
  const r = 55 + Math.random()*35;
  const startX = 0.1 + Math.random() * 0.8;
  const targetX = ship.x;
  const dx = targetX - startX;
  const totalFrames = 180 + Math.random()*80;
  asteroids.push({
    x: startX, y: -0.12, r,
    vx: dx / totalFrames,
    vy: (0.004 + Math.random()*0.002) * asteroidSpeed,
    rot: Math.random()*Math.PI*2,
    rotV: (Math.random()-.5)*.03,
    q, collided: false, destroyed: false,
    destroyT: 0, destroyParts: [],
    label: q.cat,
    lumps: Array.from({length:12},()=>.82+Math.random()*.28)
  });
}

// When an asteroid is missed/wrong answer → add a fresh replacement so total correct can still reach 10
function addReplacementQuestion(){
  const available = QUESTIONS.filter(q => !usedQuestions.has(q.text));
  if(available.length === 0) return;
  const pick = available[Math.floor(Math.random()*available.length)];
  usedQuestions.add(pick.text);
  qPool.push(pick);
  // NE PAS sauvegarder ici — seulement si la question est réellement affichée
}

function destroyAsteroid(ast){
  ast.destroyed = true;
  ast.destroyT = performance.now();
  ast.destroyParts = [];
  const colors=['#ff8800','#ffcc00','#ff4400','#ff6600','#ffffff','#00ff88'];
  for(let i=0;i<28;i++){
    const spd=1.5+Math.random()*4;
    const ang=Math.random()*Math.PI*2;
    ast.destroyParts.push({
      x:ast.x*W, y:ast.y*H,
      vx:Math.cos(ang)*spd*(W/800),
      vy:Math.sin(ang)*spd*(H/600),
      color:colors[i%colors.length],
      s:4+Math.random()*10, life:1, rot:0, rotV:(Math.random()-.5)*.4
    });
  }
  score += 100;
  destroyedCount++;
  updateHUD();
}

/* ═══════════════════════════════════════════════════
   PLANET (destination)
═══════════════════════════════════════════════════ */
const planet = {
  x: 0.5,
  r: 90,
  angle: 0,
  landed: false,
  // landing animation
  landAnim: 0,      // 0→1 progress
  landShipX: 0.5,   // ship position during landing
  landShipY: 0.82,
  landDustParts: [] // dust/smoke on touchdown
};

// Planet screen Y based purely on scroll progress:
// progress=0 → planet way off top (-300), progress=1 → planet at H*0.18
function getPlanetScreenY(){
  const progress = Math.min(scrollY / WORLD_HEIGHT, 1);
  return -300 + progress * (H * 0.18 + 300);
}

/* ═══════════════════════════════════════════════════
   DRAW HELPERS
═══════════════════════════════════════════════════ */
function worldToScreen(wY){
  // For nebulas: wY is a fixed world position 0..WORLD_HEIGHT
  // As scrollY increases, objects scroll up (screen Y decreases)
  return H + wY - scrollY;
}

function drawStars(dt){
  const speedMult = [0.18, 0.45, 0.9];   // much slower: gentle drift
  STARS.forEach(s => {
    const spd = s.speed * speedMult[s.layer] * (dt / 16);
    s.y += spd;
    if(s.y > 1.02) { s.y = -0.02; s.x = Math.random(); }

    const sx = s.x * W;
    const sy = s.y * H;
    const streakLen = s.layer === 0 ? 1.5 : s.layer === 1 ? 4 : 8;
    const alpha = s.a * (state === 'playing' ? 1 : 0.4);

    ctx.save();
    ctx.globalAlpha = alpha;
    if(streakLen > 3){
      const grad = ctx.createLinearGradient(sx, sy - streakLen, sx, sy + streakLen*0.3);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.4, `rgba(255,255,255,${alpha})`);
      grad.addColorStop(1, 'transparent');
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.r;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(sx, sy - streakLen);
      ctx.lineTo(sx, sy + streakLen * 0.3);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(sx, sy, s.r, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.restore();
  });
  ctx.globalAlpha = 1;
}

function drawNebulas(){
  NEBULAS.forEach(n=>{
    const sy = (n.worldY - scrollY * 0.3) % (H * 1.5);
    const screenY = sy < -300 ? sy + H*1.5 : sy;
    if(screenY < -300 || screenY > H+300) return;
    const grd=ctx.createRadialGradient(n.x*W,screenY,0,n.x*W,screenY,n.rx);
    grd.addColorStop(0,n.c);grd.addColorStop(1,'transparent');
    ctx.fillStyle=grd;
    ctx.beginPath();ctx.ellipse(n.x*W,screenY,n.rx,n.ry,0,0,Math.PI*2);ctx.fill();
  });
}

function drawPlanet(){
  const psy = getPlanetScreenY();
  if(psy < -300 || psy > H+300) return;
  const px = planet.x*W, r = planet.r;
  planet.angle += 0.003;

  // outer glow
  const og=ctx.createRadialGradient(px,psy,r*.4,px,psy,r*3);
  og.addColorStop(0,'rgba(80,200,255,.12)');og.addColorStop(1,'transparent');
  ctx.fillStyle=og;ctx.beginPath();ctx.arc(px,psy,r*3,0,Math.PI*2);ctx.fill();

  // body
  const bg=ctx.createRadialGradient(px-r*.3,psy-r*.3,r*.1,px,psy,r);
  bg.addColorStop(0,'#4fc8ff');bg.addColorStop(.4,'#1a6abf');bg.addColorStop(.75,'#0d3d80');bg.addColorStop(1,'#071a40');
  ctx.fillStyle=bg;ctx.beginPath();ctx.arc(px,psy,r,0,Math.PI*2);ctx.fill();

  // continents
  ctx.save();ctx.translate(px,psy);ctx.rotate(planet.angle);
  ctx.fillStyle='rgba(60,200,80,.55)';
  [[.2,.1,.35,.25],[-.3,-.2,.28,.2],[.1,-.35,.22,.16],[-.15,.25,.18,.13]].forEach(([cx,cy,rx,ry])=>{
    ctx.beginPath();ctx.ellipse(cx*r,cy*r,rx*r,ry*r,cx*.5,0,Math.PI*2);ctx.fill();
  });
  // atmosphere ring
  ctx.strokeStyle='rgba(100,220,255,.3)';ctx.lineWidth=6;
  ctx.beginPath();ctx.arc(0,0,r+8,0,Math.PI*2);ctx.stroke();
  ctx.restore();

  // label
  ctx.font=`700 ${r*.28}px Orbitron,monospace`;
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillStyle='rgba(180,240,255,.8)';
  ctx.shadowColor='rgba(0,200,255,.8)';ctx.shadowBlur=15;
  ctx.fillText('PLANÈTE CONNAISSANCE',px,psy+r+22);
  ctx.shadowBlur=0;
}

function drawAsteroidShape(ast, sx, sy){
  ctx.save();ctx.translate(sx,sy);ctx.rotate(ast.rot);
  const r=ast.r;
  const n=ast.lumps.length;
  ctx.beginPath();
  for(let i=0;i<=n;i++){
    const ang=i/n*Math.PI*2;
    const rv=r*ast.lumps[i%n];
    if(i===0) ctx.moveTo(Math.cos(ang)*rv,Math.sin(ang)*rv);
    else ctx.lineTo(Math.cos(ang)*rv,Math.sin(ang)*rv);
  }
  ctx.closePath();
  const bg=ctx.createRadialGradient(-r*.2,-r*.2,r*.05,0,0,r*1.1);
  bg.addColorStop(0,'#a08060');bg.addColorStop(.6,'#6b5030');bg.addColorStop(1,'#3a2510');
  ctx.fillStyle=bg;ctx.fill();
  ctx.strokeStyle='rgba(255,200,100,.15)';ctx.lineWidth=1.5;ctx.stroke();
  // question icon
  ctx.fillStyle='rgba(255,200,80,.9)';
  ctx.shadowColor='rgba(255,180,0,.8)';ctx.shadowBlur=10;
  ctx.font=`bold ${r*.55}px Exo 2,sans-serif`;
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(ast.label,0,0);
  ctx.shadowBlur=0;
  ctx.restore();
}

function drawAsteroids(){
  asteroids.forEach(ast=>{
    if(ast.destroyed){
      // draw explosion parts
      ast.destroyParts.forEach(p=>{
        p.x+=p.vx;p.y+=p.vy;p.vy+=.06;p.life-=.022;p.rot+=p.rotV;
        if(p.life<=0) return;
        ctx.save();ctx.globalAlpha=p.life;
        ctx.fillStyle=p.color;ctx.shadowColor=p.color;ctx.shadowBlur=8;
        ctx.translate(p.x,p.y);ctx.rotate(p.rot);
        ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s);
        ctx.restore();
      });
      return;
    }
    const sx=ast.x*W, sy=ast.y*H;
    // warning glow when close
    const danger = sy > H*.5;
    if(danger){
      const grd=ctx.createRadialGradient(sx,sy,ast.r*.5,sx,sy,ast.r*2);
      grd.addColorStop(0,`rgba(255,80,0,${.08+.08*Math.sin(Date.now()*.006)})`);
      grd.addColorStop(1,'transparent');
      ctx.fillStyle=grd;ctx.beginPath();ctx.arc(sx,sy,ast.r*2,0,Math.PI*2);ctx.fill();
    }
    drawAsteroidShape(ast,sx,sy);
    // approach arrow
    if(sy<0){
      ctx.save();ctx.fillStyle='rgba(255,100,0,.7)';
      const ax=ast.x*W, ay=12;
      ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(ax-8,ay-8);ctx.lineTo(ax+8,ay-8);
      ctx.closePath();ctx.fill();ctx.restore();
    }
  });
}

function drawShip(t){
  if(ship.exploding){ drawExplosion(t); return; }
  const sx=(ship.x*W)+ship.shakeX, sy=ship.y*H;

  // trail
  ship.trail.push({x:sx,y:sy+ship.h*.6});
  if(ship.trail.length>35) ship.trail.shift();
  ship.trail.forEach((pt,i)=>{
    const a=(i/ship.trail.length)*.6;
    const r=3*(i/ship.trail.length);
    ctx.globalAlpha=a;ctx.fillStyle='#00aaff';
    ctx.beginPath();ctx.arc(pt.x,pt.y,r,0,Math.PI*2);ctx.fill();
  });
  ctx.globalAlpha=1;

  // invincibility flicker
  if(ship.invincible>0 && Math.floor(ship.invincible/4)%2===0) return;

  ctx.save();ctx.translate(sx,sy);

  // flame (pointing down because ship goes up)
  ship.flame=.8+.2*Math.sin(t*.018);
  const fl=ship.flame;
  // outer flame
  const fg=ctx.createLinearGradient(0,ship.h*.5,0,ship.h*.5+32*fl);
  fg.addColorStop(0,'rgba(255,160,0,.95)');fg.addColorStop(.5,'rgba(255,60,0,.6)');fg.addColorStop(1,'transparent');
  ctx.beginPath();ctx.moveTo(-8*fl,ship.h*.45);ctx.lineTo(0,ship.h*.5+28*fl);ctx.lineTo(8*fl,ship.h*.45);
  ctx.fillStyle=fg;ctx.fill();
  // inner flame
  const fi=ctx.createLinearGradient(0,ship.h*.5,0,ship.h*.5+16*fl);
  fi.addColorStop(0,'rgba(255,255,200,1)');fi.addColorStop(1,'transparent');
  ctx.beginPath();ctx.moveTo(-3.5*fl,ship.h*.48);ctx.lineTo(0,ship.h*.5+14*fl);ctx.lineTo(3.5*fl,ship.h*.48);
  ctx.fillStyle=fi;ctx.fill();

  // hull body
  const w=ship.w,h=ship.h;
  const hg=ctx.createLinearGradient(-w,0,w,0);
  hg.addColorStop(0,'#304080');hg.addColorStop(.5,'#a0c8f8');hg.addColorStop(1,'#304080');
  ctx.fillStyle=hg;
  ctx.beginPath();
  ctx.moveTo(0,-h);            // nose
  ctx.lineTo(w*.6,-h*.1);     // right shoulder
  ctx.lineTo(w*.8,h*.5);      // right bottom
  ctx.lineTo(0,h*.35);        // bottom center
  ctx.lineTo(-w*.8,h*.5);     // left bottom
  ctx.lineTo(-w*.6,-h*.1);    // left shoulder
  ctx.closePath();ctx.fill();

  // wings
  ctx.fillStyle='#2a3870';
  ctx.beginPath();ctx.moveTo(w*.5,h*.0);ctx.lineTo(w*1.3,h*.55);ctx.lineTo(w*.7,h*.5);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(-w*.5,h*.0);ctx.lineTo(-w*1.3,h*.55);ctx.lineTo(-w*.7,h*.5);ctx.closePath();ctx.fill();

  // cockpit
  const cg=ctx.createRadialGradient(0,-h*.35,2,0,-h*.3,h*.35);
  cg.addColorStop(0,'rgba(180,240,255,.95)');cg.addColorStop(1,'rgba(0,60,160,.7)');
  ctx.fillStyle=cg;
  ctx.beginPath();ctx.ellipse(0,-h*.28,w*.32,h*.3,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='rgba(100,200,255,.4)';ctx.lineWidth=1.5;ctx.stroke();

  // neon outline
  ctx.shadowColor='rgba(0,180,255,.7)';ctx.shadowBlur=state==='playing'?16:6;
  ctx.strokeStyle='rgba(0,200,255,.35)';ctx.lineWidth=2;
  ctx.beginPath();
  ctx.moveTo(0,-h);ctx.lineTo(w*.6,-h*.1);ctx.lineTo(w*.8,h*.5);
  ctx.lineTo(0,h*.35);ctx.lineTo(-w*.8,h*.5);ctx.lineTo(-w*.6,-h*.1);ctx.closePath();ctx.stroke();
  ctx.shadowBlur=0;

  ctx.restore();
}

function drawExplosion(t){
  ship.explodeParts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;p.vy+=.08;p.life-=.015;p.rot+=p.rotV;
    if(p.life<=0) return;
    ctx.save();ctx.globalAlpha=p.life;
    ctx.fillStyle=p.color;ctx.shadowColor=p.color;ctx.shadowBlur=12;
    ctx.translate(p.x,p.y);ctx.rotate(p.rot);
    ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s);
    ctx.restore();
  });
}

/* ═══════════════════════════════════════════════════
   GAME LOOP
═══════════════════════════════════════════════════ */
let raf=null, lastT=0;
function loop(t){
  const dt=Math.min(t-(lastT||t),50);lastT=t;
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle='#04060f';ctx.fillRect(0,0,W,H);

  drawNebulas();
  drawStars(dt || 16);
  if(state === 'landing' || state === 'win') drawLanding();
  else drawPlanet();
  drawAsteroids();
  drawLasers();
  drawShip(t);

  if(state==='playing') update(t,dt);
  if(state==='landing') updateLanding(dt||16);

  raf=requestAnimationFrame(loop);
}

function update(t, dt){
  // Arrow key movement
  const arrowSpeed = 0.012 * (dt / 16);
  if(keys.left)  { ship.x -= arrowSpeed; pointerX = null; }
  if(keys.right) { ship.x += arrowSpeed; pointerX = null; }

  // ship moves toward pointer X (mouse/touch)
  if(pointerX!==null){
    ship.x += (pointerX - ship.x) * 0.08;
  }
  ship.x = Math.max(.07, Math.min(.93, ship.x));

  // shake decay
  ship.shakeX *= 0.8;
  if(ship.invincible>0) ship.invincible--;

  // scroll up — slow, steady journey
  const scrollSpeed = 0.15;
  // Only scroll freely until questions are done, then slow way down
  const speedMult = (qPool.length === 0 && asteroids.filter(a=>!a.destroyed).length === 0) ? 1.5 : 1;
  scrollY += scrollSpeed * speedMult * (dt/16);

  // Win when 10 asteroids correctly destroyed
  if(destroyedCount >= QUESTIONS_TO_WIN && asteroids.every(a=>a.destroyed) && !planet.landed){
    planet.landed = true;
    triggerWin();
    return;
  }

  // spawn one at a time — next only after current is gone
  const activeOnScreen = asteroids.some(a => !a.destroyed);
  if(qPool.length > 0 && !activeOnScreen && t - lastAsteroidSpawn > 800){
    spawnAsteroid();
    lastAsteroidSpawn = t;
  }

  // update lasers
  for(let i=lasers.length-1;i>=0;i--){
    const l=lasers[i];
    l.y += l.vy * (dt/16);
    // remove if off screen or already hit
    if(l.y < -0.05 || l.hit){ lasers.splice(i,1); continue; }
    // check laser vs asteroids
    for(const ast of asteroids){
      if(ast.destroyed || ast.collided) continue;
      const lx=l.x*W, ly=l.y*H;
      const ax=ast.x*W, ay=ast.y*H;
      const dist=Math.sqrt((lx-ax)**2+(ly-ay)**2);
      if(dist < ast.r * 0.9){
        l.hit=true;
        ast.collided=true;
        activeAsteroid=ast;
        // laser impact particles
        spawnParticles(lx, ly, '#00ffcc', 10);
        openQuestion(ast.q);
        break;
      }
    }
  }

  // update asteroids
  for(let i=asteroids.length-1;i>=0;i--){
    const ast=asteroids[i];
    if(ast.destroyed){
      if(ast.destroyParts.every(p=>p.life<=0)) asteroids.splice(i,1);
      continue;
    }
    ast.x += ast.vx;
    ast.y += ast.vy * (dt/16);
    ast.rot += ast.rotV;
    // bounce off walls
    if(ast.x<.05||ast.x>.95) ast.vx*=-1;
    // asteroid reaches ship without being shot → lose a life, remove
    if(ast.y > 1.1){
      if(!ast.collided){
        hitShip();
      }
      asteroids.splice(i,1);
      continue;
    }
    // asteroid physically hits ship (not shot) → lose a life too
    if(!ast.collided && ship.invincible===0 && state==='playing'){
      const sx=ship.x*W, sy=ship.y*H;
      const ax=ast.x*W, ay=ast.y*H;
      const dist=Math.sqrt((sx-ax)**2+(sy-ay)**2);
      if(dist < ast.r*0.6 + ship.w*0.5){
        ast.collided=true;
        asteroids.splice(i,1);
        hitShip();
      }
    }
  }

  // progress bar = correct answers / 10
  document.getElementById('prog-bar').style.width=(Math.min(destroyedCount/QUESTIONS_TO_WIN,1)*100)+'%';
}

/* ═══════════════════════════════════════════════════
   HIT SHIP
═══════════════════════════════════════════════════ */
function hitShip(){
  lives--;
  ship.invincible = 90;
  ship.shakeX = 18;
  flashScreen('rgba(255,60,60,.35)');
  updateHUD();
  spawnParticles(ship.x*W, ship.y*H, '#ff4466', 14);
  addReplacementQuestion(); // ensure there's always a question to replace the missed one
  if(lives<=0) triggerGameOver();
}

/* ═══════════════════════════════════════════════════
   QUESTION MODAL
═══════════════════════════════════════════════════ */
function openQuestion(q){
  state='question';
  answered=false;
  questionAnsweredCorrectly=false;
  // Marquer comme utilisée seulement maintenant qu'elle est réellement affichée
  const persistentUsed = loadPersistentUsed();
  persistentUsed.add(q.text);
  savePersistentUsed(persistentUsed);
  document.getElementById('q-inner').textContent=q.text;
  document.getElementById('q-feedback').className='';
  document.getElementById('q-feedback').textContent='';
  document.getElementById('q-continue').style.display='none';
  const bf=document.getElementById('btn-fait'),bo=document.getElementById('btn-op');
  bf.className='ans-btn abf';bo.className='ans-btn abo';
  bf.disabled=false;bo.disabled=false;
  const modal=document.getElementById('q-modal');
  modal.classList.add('show');
  // Reset box animation
  const box=document.getElementById('q-box');
  box.style.animation='none';void box.offsetWidth;box.style.animation='boxIn .35s cubic-bezier(.22,1,.36,1) both';
  // Initialize keyboard selection
  initModalKeyboard();
}

function answer(chosen){
  if(answered) return;
  answered=true;
  const q=activeAsteroid.q;
  const ok=chosen===q.answer;
  document.getElementById('btn-fait').disabled=true;
  document.getElementById('btn-op').disabled=true;
  const chosenBtn=document.getElementById(chosen==='fait'?'btn-fait':'btn-op');
  const correctBtn=document.getElementById(q.answer==='fait'?'btn-fait':'btn-op');
  if(ok){
    chosenBtn.classList.add('correct-sel');
    showQFeedback(true,q.exp);
    flashScreen('rgba(0,255,136,.18)');
    destroyAsteroid(activeAsteroid);
    spawnParticles(activeAsteroid.x*W,activeAsteroid.y*H,'#00ff88',22);
    questionAnsweredCorrectly=true;
  } else {
    chosenBtn.classList.add('wrong-sel');
    correctBtn.classList.add('correct-sel');
    showQFeedback(false,q.exp);
    flashScreen('rgba(255,60,60,.3)');
    hitShip();
    // asteroid continues (mark destroyed to remove it too)
    if(activeAsteroid && !activeAsteroid.destroyed) destroyAsteroid(activeAsteroid);
  }
  document.getElementById('q-continue').style.display='block';
}

function showQFeedback(ok,txt){
  const fb=document.getElementById('q-feedback');
  fb.className=ok?'ok':'ko';fb.textContent=txt;
}

function closeQuestion(){
  document.getElementById('q-modal').classList.remove('show');
  if(lives>0) state='playing';
}

/* ═══════════════════════════════════════════════════
   WIN / GAME OVER
═══════════════════════════════════════════════════ */
function triggerWin(){
  state = 'landing';
  document.getElementById('q-modal').classList.remove('show');
  // freeze ship position for animation start
  planet.landAnim = 0;
  planet.landShipX = ship.x;
  planet.landShipY = ship.y;
  planet.landDustParts = [];
}

function updateLanding(dt){
  planet.landAnim = Math.min(planet.landAnim + 0.004 * (dt/16), 1);
  const t = planet.landAnim;
  // ease in-out cubic
  const ease = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;

  // planet grows and moves to center-screen as ship approaches
  const planetTargetR = Math.min(W, H) * 0.38;
  planet._drawR = 90 + (planetTargetR - 90) * ease;
  planet._drawX = planet.x;
  planet._drawY = 0.5 * H * ease + (H * 0.12) * (1 - ease);  // planet descends into view

  // ship flies up toward planet center, slowing down
  const shipTargetX = planet.x;
  const shipTargetY = (planet._drawY / H) - (planet._drawR / H) * 0.15;
  planet.landShipX += (shipTargetX - planet.landShipX) * 0.035;
  planet.landShipY += (shipTargetY - planet.landShipY) * 0.035;
  ship.x = planet.landShipX;
  ship.y = planet.landShipY;

  // once close to planet surface, emit dust
  if(t > 0.75){
    if(Math.random() < 0.35){
      const sx = planet.landShipX * W;
      const sy = planet.landShipY * H;
      planet.landDustParts.push({
        x: sx + (Math.random()-0.5)*30,
        y: sy + 40,
        vx: (Math.random()-0.5)*2.5,
        vy: -1.5 - Math.random()*2,
        life: 1, r: 4+Math.random()*12,
        color: `rgba(100,200,255,`
      });
    }
  }

  // update dust
  planet.landDustParts.forEach(p=>{
    p.x+=p.vx; p.y+=p.vy; p.vy*=0.95; p.life-=0.018;
  });
  planet.landDustParts = planet.landDustParts.filter(p=>p.life>0);

  // landing done — show win screen
  if(t >= 1){
    state = 'win';
    document.getElementById('win-score').textContent = score + ' pts';
    const stars = lives===3?'⭐⭐⭐':lives===2?'⭐⭐':'⭐';
    document.getElementById('win-stars').textContent = stars;
    setTimeout(()=>{
      document.getElementById('win-screen').style.display='flex';
      launchConfetti();
    }, 500);
  }
}

function drawLanding(){
  if(state !== 'landing' && state !== 'win') return;
  const r = planet._drawR || 90;
  const px = planet._drawX * W || W/2;
  const py = planet._drawY || H*0.12;
  const angle = planet.angle;

  // big planet glow
  const og = ctx.createRadialGradient(px,py,r*.3,px,py,r*2.5);
  og.addColorStop(0,'rgba(80,200,255,.2)');og.addColorStop(1,'transparent');
  ctx.fillStyle=og;ctx.beginPath();ctx.arc(px,py,r*2.5,0,Math.PI*2);ctx.fill();

  // planet body
  const bg = ctx.createRadialGradient(px-r*.3,py-r*.3,r*.1,px,py,r);
  bg.addColorStop(0,'#4fc8ff');bg.addColorStop(.4,'#1a6abf');bg.addColorStop(.75,'#0d3d80');bg.addColorStop(1,'#071a40');
  ctx.fillStyle=bg;ctx.beginPath();ctx.arc(px,py,r,0,Math.PI*2);ctx.fill();

  // continents
  ctx.save();ctx.translate(px,py);ctx.rotate(angle);
  ctx.fillStyle='rgba(60,200,80,.6)';
  [[.2,.1,.35,.25],[-.3,-.2,.28,.2],[.1,-.35,.22,.16],[-.15,.25,.18,.13]].forEach(([cx,cy,rx2,ry2])=>{
    ctx.beginPath();ctx.ellipse(cx*r,cy*r,rx2*r,ry2*r,cx*.5,0,Math.PI*2);ctx.fill();
  });
  // atmosphere
  ctx.strokeStyle='rgba(100,220,255,.4)';ctx.lineWidth=8;
  ctx.beginPath();ctx.arc(0,0,r+10,0,Math.PI*2);ctx.stroke();
  ctx.restore();

  // dust particles
  planet.landDustParts.forEach(p=>{
    ctx.save();ctx.globalAlpha=p.life*0.7;
    ctx.fillStyle=p.color+p.life+')';
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
    ctx.restore();
  });

  // landing text pulsing
  const t = planet.landAnim;
  if(t > 0.5){
    const alpha = (t-0.5)*2;
    ctx.save();ctx.globalAlpha=alpha;
    ctx.font=`bold ${Math.min(W*.045, 28)}px Orbitron,monospace`;
    ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillStyle='#ffd700';
    ctx.shadowColor='#ffd700';ctx.shadowBlur=20+10*Math.sin(Date.now()*.005);
    ctx.fillText('ATTERRISSAGE EN COURS…', W/2, py + r + 35);
    ctx.restore();
  }
}

function triggerGameOver(){
  state='over';
  document.getElementById('q-modal').classList.remove('show');
  // explode ship
  ship.exploding=true;
  ship.explodeT=performance.now();
  const colors=['#ff6600','#ffcc00','#ff4400','#ffffff','#ff9900'];
  ship.explodeParts=[];
  const sx=ship.x*W,sy=ship.y*H;
  for(let i=0;i<45;i++){
    const spd=2+Math.random()*5,ang=Math.random()*Math.PI*2;
    ship.explodeParts.push({x:sx,y:sy,vx:Math.cos(ang)*spd,vy:Math.sin(ang)*spd,
      color:colors[i%colors.length],s:4+Math.random()*12,life:1,rot:0,rotV:(Math.random()-.5)*.4});
  }
  flashScreen('rgba(255,100,0,.5)');
  setTimeout(()=>{ document.getElementById('over-screen').style.display='flex'; }, 1400);
}

function restartGame(){
  document.getElementById('intro-screen').style.display='none';
  document.getElementById('win-screen').style.display='none';
  document.getElementById('over-screen').style.display='none';
  startGame();
}

/* ═══════════════════════════════════════════════════
   START
═══════════════════════════════════════════════════ */
function startGame(){
  score=0;lives=3;qIndex=0;destroyedCount=0;answered=false;
  scrollY=0;planet.landed=false;planet.landAnim=0;planet._drawR=90;planet._drawX=0.5;planet._drawY=H*0.12;planet.landDustParts=[];
  lastAsteroidSpawn=performance.now()+2000;
  asteroids.length=0; lasers.length=0; activeAsteroid=null;
  ship.x=0.5;ship.y=0.82;ship.vx=0;ship.trail=[];
  ship.invincible=0;ship.shakeX=0;ship.exploding=false;ship.explodeParts=[];
  pointerX=0.5;
  lastT=0;
  document.getElementById('prog-bar').style.width='0%';

  // Pick 13 questions from unused pool; reset pool when exhausted
  let persistentUsed = loadPersistentUsed();
  let available = QUESTIONS.filter(q => !persistentUsed.has(q.text));
  if(available.length < 13){
    persistentUsed = new Set();
    available = [...QUESTIONS];
  }
  const shuffled = [...available].sort(()=>Math.random()-.5);
  qPool = shuffled.slice(0, 13);
  usedQuestions = new Set(qPool.map(q=>q.text));
  // La sauvegarde se fait question par question dans openQuestion()

  state='playing';
  updateHUD();
  document.getElementById('intro-screen').style.display='none';
  // Cancel any existing loop and restart fresh
  if(raf){ cancelAnimationFrame(raf); raf=null; }
  raf=requestAnimationFrame(loop);
}

/* ═══════════════════════════════════════════════════
   HUD
═══════════════════════════════════════════════════ */
function updateHUD(){
  document.getElementById('hv-score').textContent=score;
  document.getElementById('hv-q').textContent=`${destroyedCount}/10`;
  const lr=document.getElementById('lives-row');
  lr.innerHTML='';
  for(let i=0;i<3;i++){
    const s=document.createElement('span');s.className='hf';
    s.textContent=i<lives?'❤️':'🖤';lr.appendChild(s);
  }
}

function updateSpeed(val){
  asteroidSpeed = parseFloat(val);
  const labels = {1:'🐢 Lent',1.5:'×1.5',2:'Normal',2.5:'×2.5',3:'Rapide 🔥',3.5:'×3.5',4:'Très rapide ⚡',4.5:'×4.5',5:'☠️ Extrême'};
  document.getElementById('speed-val').textContent = labels[val] || '×'+val;
  // update slider gradient fill
  const pct = ((val-1)/4*100).toFixed(0)+'%';
  document.getElementById('speed-slider').style.background =
    `linear-gradient(90deg,#00dcff ${pct},rgba(255,255,255,.1) ${pct})`;
}

/* ═══════════════════════════════════════════════════
   FX
═══════════════════════════════════════════════════ */
function flashScreen(color){
  const f=document.getElementById('flash');
  f.style.background=color;f.style.opacity='.85';
  setTimeout(()=>f.style.opacity='0',80);
}

function spawnParticles(x,y,color,n){
  const c=document.getElementById('ptc');
  for(let i=0;i<n;i++){
    const el=document.createElement('div');
    const size=5+Math.random()*9;
    const ang=Math.random()*Math.PI*2;
    const d=30+Math.random()*70;
    el.style.cssText=`position:absolute;border-radius:50%;
      left:${x}px;top:${y}px;width:${size}px;height:${size}px;
      background:${color};box-shadow:0 0 6px ${color};
      transform:translate(-50%,-50%);pointer-events:none;
      transition:transform ${.4+Math.random()*.4}s ease,opacity .45s ease;opacity:1;`;
    c.appendChild(el);
    requestAnimationFrame(()=>{
      el.style.transform=`translate(calc(-50% + ${Math.cos(ang)*d}px),calc(-50% + ${Math.sin(ang)*d}px))`;
      el.style.opacity='0';
    });
    setTimeout(()=>el.remove(),900);
  }
}

function launchConfetti(){
  const cols=['#00ff88','#00dcff','#ffd700','#ff3cac','#ff8800','#a29bfe'];
  const c=document.getElementById('ptc');
  if(!document.getElementById('cstyle')){
    const s=document.createElement('style');s.id='cstyle';
    s.textContent=`@keyframes cffall{0%{opacity:1;transform:translateY(0) rotate(0)}100%{opacity:0;transform:translateY(110vh) rotate(720deg)}}`;
    document.head.appendChild(s);
  }
  for(let i=0;i<90;i++){
    setTimeout(()=>{
      const el=document.createElement('div');
      const sz=6+Math.random()*12,col=cols[Math.floor(Math.random()*cols.length)];
      el.style.cssText=`position:fixed;left:${Math.random()*100}vw;top:-16px;
        width:${sz}px;height:${sz}px;background:${col};box-shadow:0 0 6px ${col};
        border-radius:${Math.random()>.5?'50%':'3px'};pointer-events:none;
        animation:cffall ${1.4+Math.random()*2}s linear forwards;`;
      c.appendChild(el);setTimeout(()=>el.remove(),3600);
    },i*35);
  }
}

/* ═══════════════════════════════════════════════════
   BOOT
═══════════════════════════════════════════════════ */
raf = requestAnimationFrame(loop);
updateHUD();
updateSpeed(1); // init slider display
