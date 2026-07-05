// ─── Réponses possibles ───
const EPL = [
  {id:"ethos",  l:"🏛️ Ethos", s:"il invoque l'éthique, des valeurs, sa légitimité"},
  {id:"pathos", l:"💔 Pathos", s:"il joue sur l'émotion"},
  {id:"logos",  l:"🧮 Logos", s:"il argumente par la logique, les faits"},
];
const FALLACIES = [
  {id:"paille",   l:"🎃 Homme de paille", s:"caricaturer ton propos pour l'attaquer"},
  {id:"adhom",    l:"👤 Attaque personnelle", s:"viser la personne, pas l'argument"},
  {id:"popu",     l:"📣 Appel à la popularité", s:"« tout le monde le pense ! »"},
  {id:"dilemme",  l:"⚖️ Faux dilemme", s:"il n'y aurait que deux options"},
  {id:"pente",    l:"🎢 Pente glissante", s:"exagérer les conséquences en cascade"},
  {id:"genehat",  l:"🎲 Généralisation hâtive", s:"conclure à partir d'un seul cas"},
  {id:"nature",   l:"🌿 Appel à la nature", s:"« naturel » ne veut pas dire « bon »"},
  {id:"halo",     l:"⭐ Autorité hors domaine", s:"célèbre ≠ compétent (effet de halo)"},
  {id:"preuve",   l:"🔄 Charge de la preuve inversée", s:"c'est à celui qui affirme de prouver"},
  {id:"posthoc",  l:"🔗 Cause imaginée", s:"« après donc à cause de » (corrélation ≠ causalité)"},
];

// ─── Adversaires ───
// type "epl" : identifier ethos/pathos/logos. type "fall" : nommer le sophisme (a = id, opts = 3 distracteurs)
const FOES = [
  {name:"Tonton Gérard", emoji:"🍗", desc:"champion du repas de famille", hp:4,
   intro:"Au dessert, Tonton Gérard pose sa fourchette : « Toi qui fais des études, on va voir si tu sais débattre ! » Le combat commence.",
   lines:[
    {type:"epl", t:"« Moi, mon petit, j'ai 60 ans de vie derrière moi. J'ai travaillé dur toute ma vie, je n'ai jamais menti à personne. Alors tu peux me croire sur parole ! »",
     a:"ethos", e:"Gérard ne donne <b>aucun argument</b> sur le fond : il met en avant son honnêteté et son vécu pour inspirer confiance. C'est de l'<b>ethos contextuel</b> — comme un politicien qui se dit « proche du peuple »."},
    {type:"epl", t:"« Tu veux devenir végétarien ?! Pense à ta pauvre grand-mère… elle qui te préparait son poulet rôti avec tant d'amour. Tu veux lui briser le cœur, c'est ça ? »",
     a:"pathos", e:"Aucune logique ici : Gérard joue à fond sur <b>l'émotion</b> (la culpabilité, la grand-mère, l'amour du poulet rôti). C'est du <b>pathos</b> pur jus — très efficace, et très utilisé en publicité."},
    {type:"fall", t:"« Mon voisin a mangé bio toute sa vie, et il est tombé malade quand même. Le bio, ça ne sert à rien, c'est prouvé ! »",
     a:"genehat", opts:["popu","nature","adhom"],
     e:"Un seul voisin ne fait pas une étude scientifique ! Conclure à partir d'<b>un seul cas</b>, c'est une <b>généralisation hâtive</b>. Pour savoir si le bio a un effet, il faut comparer des milliers de personnes."},
    {type:"fall", t:"« De toute façon, les médicaments c'est de la chimie. Moi je me soigne avec des plantes : c'est naturel, donc c'est forcément meilleur pour la santé ! »",
     a:"nature", opts:["dilemme","genehat","preuve"],
     e:"L'<b>appel à la nature</b> : « naturel » ne veut pas dire « bon » (la cigüe et l'amanite phalloïde sont 100 % naturelles…), et « chimique » ne veut pas dire « mauvais ». Beaucoup de médicaments viennent d'ailleurs des plantes !"},
    {type:"fall", t:"« Si on laisse les jeunes jouer aux jeux vidéo, bientôt ils ne sortiront plus de leur chambre, puis ils arrêteront l'école, et dans dix ans ce pays sera ruiné ! »",
     a:"pente", opts:["paille","dilemme","posthoc"],
     e:"La <b>pente glissante</b> : enchaîner des conséquences de plus en plus catastrophiques comme si elles étaient inévitables, sans prouver aucun des maillons de la chaîne."},
    {type:"fall", t:"« Et puis tu défends les écrans, toi ? C'est bien la peine, avec tes lunettes et tes notes moyennes en maths ! »",
     a:"adhom", opts:["paille","halo","popu"],
     e:"Gérard ne répond pas à tes arguments : il <b>t'attaque toi</b>. C'est l'attaque personnelle (ad hominem). Taper sur la personne pour dévaloriser son discours, c'est courant… et fallacieux."},
   ]},
  {name:"Maxx_Buzz", emoji:"🤳", desc:"influenceur 2,4 M d'abonnés", hp:5,
   intro:"Maxx_Buzz dégaine sa perche à selfie : « Salut la commu ! Aujourd'hui je débats contre un hater. Lâchez vos likes ! »",
   lines:[
    {type:"epl", t:"« Regardez cette vidéo de chaton abandonné sous la pluie… 😢 Si vous ne partagez pas ma cagnotte après ça, c'est que vous n'avez pas de cœur. »",
     a:"pathos", e:"L'émotion comme levier d'engagement : c'est du <b>pathos</b>. Les réseaux sociaux en raffolent, car une info émouvante capte notre attention… qu'elle soit vraie ou fausse. Méfiance avant de liker !"},
    {type:"fall", t:"« Ma nouvelle boisson détox est validée par la science : 2,4 millions d'abonnés ne peuvent pas se tromper ! »",
     a:"popu", opts:["halo","preuve","genehat"],
     e:"L'<b>appel à la popularité</b> : le nombre de fans ne prouve rien. Des millions de personnes ont déjà cru des choses fausses. La popularité mesure la visibilité, pas la vérité."},
    {type:"fall", t:"« Ce footballeur star dit que ma boisson booste ses performances. C'est un champion du monde quand même, il s'y connaît ! »",
     a:"halo", opts:["popu","posthoc","adhom"],
     e:"L'<b>effet de halo</b> : on transfère la compétence de quelqu'un (le foot) vers un domaine qui n'a rien à voir (la nutrition). Être champion du monde ne rend pas expert en boissons — c'est exactement comme ça que fonctionne la pub."},
    {type:"fall", t:"« Depuis que je bois mon jus détox tous les matins, je n'ai pas eu un seul rhume. La preuve que ça marche ! »",
     a:"posthoc", opts:["genehat","nature","preuve"],
     e:"« Après, donc à cause de » : deux événements qui se suivent ne sont pas forcément liés. C'est une <b>cause imaginée</b> — peut-être que Maxx n'aurait pas eu de rhume de toute façon. Seule une vraie étude peut le dire."},
    {type:"fall", t:"« Tu dis que mon produit est inutile ? Prouve-moi qu'il ne marche PAS ! Tant que tu n'as pas de preuve, c'est que j'ai raison. »",
     a:"preuve", opts:["dilemme","adhom","popu"],
     e:"Renversement de la <b>charge de la preuve</b> : c'est à <b>celui qui affirme</b> de prouver, pas l'inverse. Sinon je peux affirmer n'importe quoi (« Joe Biden est un reptilien ! ») et exiger qu'on me prouve le contraire."},
    {type:"epl", t:"« Les chiffres parlent d'eux-mêmes : sur 1 000 testeurs, 87 % ont déclaré se sentir mieux après un mois. Voici l'étude complète en description. »",
     a:"logos", e:"Cette fois Maxx avance des <b>données chiffrées et une source</b> : c'est du <b>logos</b>, l'argumentation par la logique et les faits. Attention : un argument logos peut quand même être trompeur — il faut vérifier l'étude ! Mais le <i>ressort</i> utilisé, c'est bien la raison."},
   ]},
  {name:"Sénateur Brutus", emoji:"🏛️", desc:"orateur politique redoutable", hp:6,
   intro:"Le Sénateur Brutus ajuste sa cravate sous les projecteurs : « Mes chers concitoyens, écrasons ce jeune contradicteur… avec élégance. »",
   lines:[
    {type:"epl", t:"« Il est scandaleux que dans la patrie des droits de l'Homme, le pays des Lumières, des gens dorment encore dans la rue. Au nom de la fraternité, votez pour moi ! »",
     a:"ethos", e:"Brutus invoque des <b>grandes valeurs universelles</b> (les Lumières, la fraternité, les droits de l'Homme) : c'est de l'<b>ethos universel</b>. L'autre variante, l'ethos contextuel, consiste à se présenter soi-même comme vertueux."},
    {type:"epl", t:"« Tous les pays qui ont baissé cet impôt ont vu leur chômage diminuer dans les deux ans. Nous proposons la même baisse : voici les projections, secteur par secteur. »",
     a:"logos", e:"Données, comparaisons, projections : Brutus utilise le <b>logos</b>. C'est la forme d'argument la plus solide en apparence… mais vérifie toujours les chiffres : un logos peut cacher des statistiques mal utilisées."},
    {type:"fall", t:"« Mon adversaire veut réguler la vitesse en ville. Autrement dit, il veut interdire la voiture, supprimer votre liberté de vous déplacer, et vous enfermer chez vous ! »",
     a:"paille", opts:["pente","dilemme","adhom"],
     e:"L'<b>homme de paille</b> : déformer le propos de l'adversaire (réguler ≠ interdire) pour attaquer la caricature plutôt que l'argument réel. Le contraire du débat honnête — qui consiste à reformuler fidèlement, l'« homme de fer »."},
    {type:"fall", t:"« Les choses sont simples : soit vous votez ma loi sur la surveillance, soit vous acceptez de vivre dans l'insécurité totale. Il faut choisir ! »",
     a:"dilemme", opts:["pente","paille","popu"],
     e:"Le <b>faux dilemme</b> : présenter deux options comme les seules possibles, alors qu'il en existe plein d'autres (d'autres lois, d'autres moyens…). Quand on te dit « c'est ça ou le chaos », méfie-toi."},
    {type:"fall", t:"« Pourquoi écouter ce climatologue ? Il a été vu en train de prendre l'avion pour un congrès ! Son hypocrisie disqualifie toutes ses recherches. »",
     a:"adhom", opts:["halo","paille","preuve"],
     e:"Attaquer le <b>comportement de la personne</b> pour rejeter ses <b>arguments scientifiques</b> : ad hominem. Même si l'hypocrisie est réelle (comme Harrison Ford et son jet privé), elle ne rend pas les données fausses."},
    {type:"fall", t:"« Tous les sondages me donnent en tête. Le peuple est avec moi ! Comment osez-vous prétendre que je me trompe, alors que des millions de Français me soutiennent ? »",
     a:"popu", opts:["preuve","genehat","dilemme"],
     e:"L'<b>appel à la popularité</b>, version politique : être majoritaire ne rend pas un argument vrai. La vérité ne se vote pas — pendant des siècles, la majorité pensait que le Soleil tournait autour de la Terre."},
    {type:"epl", t:"« Souvenez-vous de cette petite fille que j'ai rencontrée à l'hôpital, ses dessins accrochés au mur… C'est pour elle, pour vos enfants, que je me bats ce soir. »",
     a:"pathos", e:"L'anecdote émouvante, l'enfant malade, les trémolos : du <b>pathos</b> de compétition. Ce n'est ni bien ni mal en soi — Martin Luther King utilisait aussi le pathos — mais il faut le <b>repérer</b> pour ne pas être convaincu par la seule émotion."},
   ]},
];

let foeIdx=0, lineIdx=0, youHP=6, foeHP=0, order=[];
const YOUMAX=6;
const $=id=>document.getElementById(id);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function startMatch(i){
  foeIdx=i; lineIdx=0;
  const foe=FOES[i];
  foeHP=foe.hp;
  if(i===0) youHP=YOUMAX;
  order=shuffle([...foe.lines.keys()]);
  $("intro").style.display="none";
  $("inter").style.display="none";
  $("battle").style.display="block";
  $("foe-emoji").textContent=foe.emoji;
  $("foe-title").textContent=foe.name;
  $("foe-tag").textContent=foe.emoji+" "+foe.name+" — "+foe.desc;
  updateHP();
  renderTurn();
}

function updateHP(){
  const foe=FOES[foeIdx];
  $("hp-you").firstElementChild.style.width=(youHP/YOUMAX*100)+"%";
  $("hp-foe").firstElementChild.style.width=(foeHP/foe.hp*100)+"%";
  $("hp-you-txt").textContent="Conviction : "+youHP+"/"+YOUMAX;
  $("hp-foe-txt").textContent="Conviction : "+foeHP+"/"+foe.hp;
}

function renderTurn(){
  const foe=FOES[foeIdx];
  const line=foe.lines[order[lineIdx % order.length]];
  $("btxt").textContent=line.t;
  $("riposte").style.display="none";
  $("nextbtn").style.display="none";
  const ansDiv=$("answers"); ansDiv.innerHTML="";
  let choices;
  if(line.type==="epl"){
    $("qprompt").textContent="Quel ressort rhétorique utilise-t-il ?";
    choices=EPL.map(o=>({...o}));
  } else {
    $("qprompt").textContent="Quel est le problème de cet argument ?";
    const pool=[line.a,...line.opts];
    choices=shuffle(pool.map(id=>({...FALLACIES.find(f=>f.id===id)})));
  }
  choices.forEach(c=>{
    const b=document.createElement("button");
    b.className="abtn";
    b.innerHTML=`${c.l}<span class="asub">${c.s}</span>`;
    b.onclick=()=>answer(line,c.id,b);
    ansDiv.appendChild(b);
  });
}

function answer(line,id,btn){
  const ok=id===line.a;
  const all=[...document.querySelectorAll(".abtn")];
  all.forEach(b=>{b.disabled=true;b.classList.add("dim");});
  const goodLabel=(line.type==="epl"?EPL:FALLACIES).find(o=>o.id===line.a).l;
  all.forEach(b=>{ if(b.innerHTML.startsWith(goodLabel)){b.classList.remove("dim");b.classList.add("good");} });
  if(ok){
    foeHP--;
    $("f-foe").classList.add("shake");
    setTimeout(()=>$("f-foe").classList.remove("shake"),450);
    $("rip-title").textContent="✔ Touché ! Tu as démasqué la technique.";
  } else {
    btn.classList.remove("dim");btn.classList.add("bad");
    youHP--;
    $("f-you").classList.add("shake");
    setTimeout(()=>$("f-you").classList.remove("shake"),450);
    $("rip-title").textContent="✘ Aïe ! C'était : "+goodLabel;
  }
  updateHP();
  const rip=$("riposte");
  rip.className=ok?"ok":"ko"; rip.style.display="block";
  $("rip-expl").innerHTML=line.e;
  $("nextbtn").style.display="block";
  if(foeHP<=0) $("nextbtn").textContent="🏆 Adversaire vaincu ! ➜";
  else if(youHP<=0) $("nextbtn").textContent="💀 Tu es à court d'arguments… ➜";
  else $("nextbtn").textContent="Réplique suivante ➜";
  $("nextbtn").scrollIntoView({behavior:"smooth",block:"end"});
}

function nextTurn(){
  if(foeHP<=0){ winMatch(); return; }
  if(youHP<=0){ lose(); return; }
  lineIdx++;
  renderTurn();
  window.scrollTo({top:0,behavior:"smooth"});
}

function winMatch(){
  $("battle").style.display="none";
  $("nextbtn").style.display="none";
  if(foeIdx===FOES.length-1){ victory(); return; }
  const next=FOES[foeIdx+1];
  $("inter").style.display="block";
  $("inter-emoji").textContent=FOES[foeIdx].emoji;
  $("inter-title").textContent=FOES[foeIdx].name+" est à court d'arguments !";
  $("inter-msg").innerHTML="Bien joué ! Tu récupères un peu de conviction. 💪<br><br>Prochain adversaire : <b>"+next.emoji+" "+next.name+"</b> — "+next.desc+".<br><i>"+next.intro+"</i>";
  youHP=Math.min(YOUMAX,youHP+2);
  $("inter-btn").textContent="⚔️ Affronter "+next.name;
  $("inter-btn").onclick=()=>startMatch(foeIdx+1);
}

function victory(){
  $("end").style.display="block";
  $("end-emoji").textContent="👑";
  $("end-title").textContent="Maître de l'Arène !";
  $("end-msg").innerHTML="Tu as vaincu les trois adversaires ! Tu sais maintenant repérer l'<b>ethos</b>, le <b>pathos</b>, le <b>logos</b>… et les sophismes les plus courants.<br><br>Dernier secret de l'arène : la meilleure technique de débat n'est pas une attaque. C'est l'<b>homme de fer</b> — reformuler fidèlement l'argument de l'autre avant d'y répondre, et chercher un <b>point d'accord</b>. Le débat devient alors plus riche… et plus serein. 🤝";
}

function lose(){
  $("battle").style.display="none";
  $("nextbtn").style.display="none";
  $("end").style.display="block";
  $("end-emoji").textContent="😵";
  $("end-title").textContent="Battu… cette fois !";
  $("end-msg").innerHTML=FOES[foeIdx].name+" t'a submergé de rhétorique. Pas grave : l'art du débat <b>se pratique</b> plus qu'il ne s'apprend.<br><br>Relis bien les ripostes : homme de paille, faux dilemme, appel à la popularité… Une fois qu'on les connaît, on les voit partout !";
}
