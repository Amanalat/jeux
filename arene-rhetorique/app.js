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
  {id:"circulaire", l:"🔄 Raisonnement circulaire", s:"la conclusion sert de preuve à elle-même"},
  {id:"hareng",     l:"🐟 Hareng rouge",            s:"changer de sujet pour éviter de répondre"},
  {id:"cherry",     l:"🍒 Cueillette des faits",     s:"ne montrer que les données qui arrangent"},
  {id:"whatabout",  l:"🪞 Et toi alors ?",           s:"pointer l'hypocrisie de l'autre sans répondre sur le fond"},
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
  {name:"Le Complotiste", emoji:"🕵️", desc:"a fait ses propres recherches", hp:6,
   intro:"Derrière son mur de post-its et d'articles imprimés, il pointe un doigt vers toi : « Ah, toi aussi tu crois ce qu'on te dit à la télé… Laisse-moi t'ouvrir les yeux. »",
   lines:[
    {type:"fall", t:"« Regarde, j'ai trouvé DIX études qui vont dans mon sens ! Les scientifiques « officiels », eux, refusent juste de regarder ces preuves-là. »",
     a:"cherry", opts:["popu","halo","genehat"],
     e:"La <b>cueillette des faits</b> (cherry-picking) : il ne montre que les études qui l'arrangent et passe sous silence l'énorme majorité des travaux qui disent le contraire. Le vrai consensus scientifique se juge sur l'ensemble des études, pas sur dix triées sur le volet."},
    {type:"fall", t:"« Comment je sais que c'est vrai ? C'est écrit noir sur blanc sur mon site de confiance. Et ce site, on peut lui faire confiance… parce qu'il le dit lui-même ! »",
     a:"circulaire", opts:["preuve","popu","adhom"],
     e:"Un <b>raisonnement circulaire</b> : la conclusion (« ce site est fiable ») sert de preuve à elle-même, sans aucune vérification extérieure. C'est comme dire « je dis la vérité parce que je ne mens jamais »."},
    {type:"fall", t:"« Le mois où cette antenne 5G a été installée près de chez moi, mon chat est tombé malade. Coïncidence ? Je ne crois pas. »",
     a:"posthoc", opts:["nature","genehat","cherry"],
     e:"Encore une <b>cause imaginée</b> : deux événements qui se suivent dans le temps ne sont pas forcément liés. Le chat pouvait tomber malade pour mille raisons — seule une vraie étude pourrait établir un lien avec l'antenne."},
    {type:"epl", t:"« Tu ne sens pas qu'on te ment ? Cette peur au ventre, ce sentiment que quelque chose cloche… Ils nous cachent la vérité, et au fond de toi, tu le sais. »",
     a:"pathos", e:"Aucun fait, aucune preuve : juste la <b>peur</b> et le sentiment de trahison. C'est du <b>pathos</b> — très efficace pour convaincre sans avoir à démontrer quoi que ce soit."},
    {type:"fall", t:"« Prouve-moi que ce n'est PAS un complot ! Tant que tu n'as pas la preuve du contraire, il faut bien admettre que j'ai raison. »",
     a:"preuve", opts:["dilemme","adhom","popu"],
     e:"Encore la <b>charge de la preuve inversée</b> : c'est à celui qui affirme qu'il y a complot de le prouver, pas à toi de prouver le contraire. Sinon on pourrait affirmer n'importe quoi et exiger qu'on le réfute."},
    {type:"fall", t:"« Les vaccins, c'est plein de produits chimiques. Moi je préfère renforcer mes défenses avec des remèdes 100 % naturels, c'est quand même plus logique, non ? »",
     a:"nature", opts:["dilemme","genehat","cherry"],
     e:"L'<b>appel à la nature</b> : « naturel » ne veut pas dire « sans danger », et « chimique » ne veut pas dire « nocif ». L'eau, l'arsenic et le venin de serpent sont aussi 100 % naturels."},
    {type:"epl", t:"« Moi, contrairement aux journalistes payés par les lobbies, j'ai fait mes propres recherches pendant des années. Je n'ai aucun intérêt caché, juste la vérité à défendre. »",
     a:"ethos", e:"Il se présente comme le seul honnête, le seul à « avoir fait ses recherches » : c'est de l'<b>ethos contextuel</b>, une légitimité auto-proclamée. Passer des heures sur internet ne remplace pas l'expertise d'un domaine, ni la méthode scientifique."},
   ]},
  {name:"La Directrice Greenwashing", emoji:"👔", desc:"communicante corporate hors pair", hp:6,
   intro:"Sous les projecteurs d'une conférence de presse, elle ajuste son micro-cravate : « Chez nous, la planète est notre priorité n°1. Laissez-moi vous expliquer pourquoi vous avez tort de vous inquiéter. »",
   lines:[
    {type:"fall", t:"« Vous m'interrogez sur nos émissions de CO2 ? Justement, laissez-moi vous parler de notre magnifique programme de recyclage des gobelets en carton, lancé cette année dans tous nos bureaux ! »",
     a:"hareng", opts:["whatabout","popu","cherry"],
     e:"Un <b>hareng rouge</b> : elle change de sujet (le CO2 → les gobelets recyclés) au lieu de répondre à la question posée. Le recyclage des gobelets, c'est bien, mais ça ne dit rien des émissions de l'entreprise."},
    {type:"fall", t:"« Vous critiquez notre bilan carbone ? Et nos concurrents, vous avez vu le leur ? Ils sont bien pires que nous, et personne ne leur demande de comptes ! »",
     a:"whatabout", opts:["adhom","dilemme","hareng"],
     e:"Le <b>« et toi alors ? »</b> (whataboutism) : pointer l'hypocrisie ou les défauts supposés d'un autre au lieu de répondre sur le fond. Même si les concurrents polluent plus, ça ne rend pas son propre bilan carbone acceptable."},
    {type:"fall", t:"« 10 millions de clients nous font confiance chaque jour. Avec un tel soutien, comment pourrions-nous être une entreprise qui pollue ? »",
     a:"popu", opts:["halo","preuve","genehat"],
     e:"L'<b>appel à la popularité</b> : le nombre de clients ne dit rien de l'impact environnemental réel de l'entreprise. Beaucoup de clients peut simplement vouloir dire beaucoup de communication et de parts de marché."},
    {type:"fall", t:"« Cette actrice mondialement connue a accepté d'être notre ambassadrice. Si une personnalité aussi engagée nous fait confiance, c'est bien que nos produits sont vraiment respectueux de l'environnement. »",
     a:"halo", opts:["popu","preuve","cherry"],
     e:"L'<b>effet de halo</b> : le talent d'actrice n'a aucun rapport avec une expertise environnementale. Une célébrité peut être payée pour représenter une marque sans rien connaître à son empreinte carbone réelle."},
    {type:"epl", t:"« Nos chiffres sont clairs : -12 % d'émissions par unité produite depuis 2019, +30 % d'investissement dans les énergies renouvelables. Voici le détail complet dans notre rapport RSE de 40 pages. »",
     a:"logos", e:"Des chiffres, des dates, un rapport détaillé : c'est du <b>logos</b>. Attention cependant : présenter des statistiques précises n'empêche pas de faire de la <b>cueillette des faits</b> en coulisses — toujours vérifier ce que le rapport ne dit pas."},
    {type:"epl", t:"« Chez nous, l'engagement et la responsabilité ne sont pas que des mots : ce sont nos valeurs fondatrices, gravées dans notre charte depuis le premier jour. »",
     a:"ethos", e:"Des grandes valeurs affichées (engagement, responsabilité) sans aucune preuve concrète à l'appui : c'est de l'<b>ethos</b>. Une charte ne prouve rien tant qu'elle ne s'accompagne pas de résultats vérifiables."},
    {type:"fall", t:"« Regardez : dans notre usine de Lyon, nous avons réduit nos émissions de 5 % cette année. La preuve que notre stratégie environnementale fonctionne ! »",
     a:"cherry", opts:["posthoc","popu","halo"],
     e:"De la <b>cueillette des faits</b> : un seul chiffre positif, sur un seul site, est mis en avant — en passant sous silence ce qui se passe dans le reste du groupe, où les émissions ont peut-être augmenté."},
   ]},
];

let foeIdx=0, lineIdx=0, youHP=6, foeHP=0, order=[];
let correctCount=0, totalCount=0;
const YOUMAX=6;
const $=id=>document.getElementById(id);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function startMatch(i){
  foeIdx=i; lineIdx=0;
  const foe=FOES[i];
  foeHP=foe.hp;
  if(i===0){ youHP=YOUMAX; correctCount=0; totalCount=0; }
  order=shuffle([...foe.lines.keys()]);
  $("intro").style.display="none";
  $("inter").style.display="none";
  $("battle").style.display="block";
  $("foe-emoji").textContent=foe.emoji;
  $("foe-title").textContent=foe.name;
  $("foe-tag").textContent=foe.emoji+" "+foe.name+" — "+foe.desc;
  renderBreadcrumb();
  updateHP();
  renderTurn();
}

function renderBreadcrumb(){
  const bc=$("foe-breadcrumb");
  bc.innerHTML="";
  FOES.forEach((f,i)=>{
    const span=document.createElement("span");
    span.className="bc-item"+(i<foeIdx?" done":i===foeIdx?" current":"");
    span.textContent=f.emoji;
    bc.appendChild(span);
  });
}

function updateHP(){
  const foe=FOES[foeIdx];
  $("hp-you").firstElementChild.style.width=(youHP/YOUMAX*100)+"%";
  $("hp-foe").firstElementChild.style.width=(foeHP/foe.hp*100)+"%";
  $("hp-you-txt").textContent="Conviction : "+youHP+"/"+YOUMAX;
  $("hp-foe-txt").textContent="Conviction : "+foeHP+"/"+foe.hp;
  $("hp-you").setAttribute("aria-valuemax",YOUMAX);
  $("hp-you").setAttribute("aria-valuenow",Math.max(0,youHP));
  $("hp-foe").setAttribute("aria-valuemax",foe.hp);
  $("hp-foe").setAttribute("aria-valuenow",Math.max(0,foeHP));
}

function renderTurn(){
  const foe=FOES[foeIdx];
  const line=foe.lines[order[lineIdx % order.length]];
  $("btxt").textContent=line.t;
  $("riposte").style.display="none";
  $("nextbtn").style.display="none";
  $("turn-progress").textContent="Réplique "+(lineIdx+1)+" / "+foe.lines.length;
  const bubble=document.querySelector(".bubble");
  bubble.classList.remove("pop-replay");
  void bubble.offsetWidth;
  bubble.classList.add("pop-replay");
  const ansDiv=$("answers"); ansDiv.innerHTML="";
  let choices;
  if(line.type==="epl"){
    $("qprompt").textContent="Quel ressort rhétorique utilise-t-il ?";
    choices=shuffle(EPL.map(o=>({...o})));
  } else {
    $("qprompt").textContent="Quel est le problème de cet argument ?";
    const pool=[line.a,...line.opts];
    choices=shuffle(pool.map(id=>({...FALLACIES.find(f=>f.id===id)})));
  }
  choices.forEach(c=>{
    const b=document.createElement("button");
    b.className="abtn";
    b.dataset.id=c.id;
    b.innerHTML=`${c.l}<span class="asub">${c.s}</span>`;
    b.onclick=()=>answer(line,c.id,b);
    ansDiv.appendChild(b);
  });
}

function answer(line,id,btn){
  const ok=id===line.a;
  totalCount++;
  if(ok) correctCount++;
  const all=[...document.querySelectorAll(".abtn")];
  all.forEach(b=>{b.disabled=true;b.classList.add("dim");});
  const goodLabel=(line.type==="epl"?EPL:FALLACIES).find(o=>o.id===line.a).l;
  all.forEach(b=>{ if(b.dataset.id===line.a){b.classList.remove("dim");b.classList.add("good");} });
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
  $("nextbtn").focus();
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
  youHP=Math.min(YOUMAX,youHP+3);
  $("inter-btn").textContent="⚔️ Affronter "+next.name;
  $("inter-btn").onclick=()=>startMatch(foeIdx+1);
}

function scoreLine(){
  const pct=totalCount?Math.round(correctCount/totalCount*100):0;
  return "Score final : "+correctCount+" bonnes réponses sur "+totalCount+" ("+pct+" %)";
}

function victory(){
  $("end").style.display="block";
  $("end-emoji").textContent="👑";
  $("end-title").textContent="Maître de l'Arène !";
  $("retry-btn").style.display="none";
  $("end-msg").innerHTML="Tu as vaincu les cinq adversaires ! Tu sais maintenant repérer l'<b>ethos</b>, le <b>pathos</b>, le <b>logos</b>… et les sophismes les plus courants.<br><br>"+scoreLine()+"<br><br>Dernier secret de l'arène : la meilleure technique de débat n'est pas une attaque. C'est l'<b>homme de fer</b> — reformuler fidèlement l'argument de l'autre avant d'y répondre, et chercher un <b>point d'accord</b>. Le débat devient alors plus riche… et plus serein. 🤝";
}

function lose(){
  $("battle").style.display="none";
  $("nextbtn").style.display="none";
  $("end").style.display="block";
  $("end-emoji").textContent="😵";
  $("end-title").textContent="Battu… cette fois !";
  $("end-msg").innerHTML=FOES[foeIdx].name+" t'a submergé de rhétorique. Pas grave : l'art du débat <b>se pratique</b> plus qu'il ne s'apprend.<br><br>"+scoreLine()+"<br><br>Relis bien les ripostes : homme de paille, faux dilemme, appel à la popularité… Une fois qu'on les connaît, on les voit partout !";
  const rb=$("retry-btn");
  rb.style.display="inline-block";
  rb.textContent="🔁 Retenter "+FOES[foeIdx].name;
  rb.onclick=()=>{ $("end").style.display="none"; startMatch(foeIdx); };
}
