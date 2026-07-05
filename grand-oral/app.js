// Chaque option : t = l'argument, pts (2 = adapté à CET auditoire, 1 = correct mais mal ciblé, 0 = fallacieux/contre-productif), fb = réaction de l'auditoire
const MISSIONS = [
 {
  goal:"Convaincre le conseil d'administration du collège d'installer des fontaines à eau et de bannir les bouteilles en plastique.",
  aemoji:"🏫", aname:"Le conseil d'administration",
  adesc:"Des gestionnaires prudents. Ce qui les préoccupe : le budget de l'établissement et sa réputation auprès des parents.",
  ethos:[
   {t:"« Nous sommes les délégués élus des élèves : nous parlons aujourd'hui au nom des 600 collégiens de cet établissement. »", pts:2,
    fb:"👏 <b>+2</b> — Légitimité claire : vous ne parlez pas pour vous, mais au nom de ceux que vous représentez. L'ethos contextuel parfait."},
   {t:"« Faites-nous confiance : nous sommes des élèves sérieux et nous avons bien travaillé ce dossier. »", pts:1,
    fb:"🙂 <b>+1</b> — Honnête, mais vague : « sérieux », ça ne se déclare pas, ça se prouve. Un ethos un peu faible."},
   {t:"« Mon oncle, qui est champion régional de natation, trouve que c'est une excellente idée. »", pts:0,
    fb:"😬 <b>+0</b> — Champion de natation ≠ expert en gestion d'établissement : c'est l'effet de halo, la compétence ne se transfère pas. L'auditoire fronce les sourcils."},
  ],
  pathos:[
   {t:"« Imaginez la photo dans le journal local : “Le premier collège de la ville sans bouteilles plastique”. Les parents seraient fiers d'inscrire leurs enfants ici. »", pts:2,
    fb:"👏 <b>+2</b> — Tu touches LEUR corde sensible : la réputation de l'établissement. L'émotion adaptée à l'auditoire."},
   {t:"« Pensez aux océans : chaque année, des tonnes de plastique étouffent les tortues marines. »", pts:1,
    fb:"🙂 <b>+1</b> — Émouvant, mais lointain : le conseil gère un collège, pas l'océan Pacifique. Le pathos marche mieux quand il est proche de l'auditoire."},
   {t:"« Si vous refusez, c'est que l'avenir de vos propres élèves vous est complètement égal ! »", pts:0,
    fb:"😡 <b>+0</b> — Culpabiliser l'auditoire le braque immédiatement. Le pathos agressif se retourne contre l'orateur."},
  ],
  logos:[
   {t:"« Une fontaine coûte 800 €. Le collège dépense 1 200 € de bouteilles par an : l'investissement est amorti en moins d'un an. »", pts:2,
    fb:"👏 <b>+2</b> — Des chiffres, un calcul, une conclusion : voilà un logos qui parle à des gestionnaires de budget."},
   {t:"« Tout le monde sait que le plastique c'est mauvais, et toutes les villes installent des fontaines. »", pts:1,
    fb:"😐 <b>+1</b> — « Tout le monde le sait »… c'est un appel à la popularité, pas une démonstration. Le logos demande des faits vérifiables."},
   {t:"« Le collège voisin a installé des fontaines, et l'année suivante ses résultats au brevet ont augmenté ! »", pts:0,
    fb:"😬 <b>+0</b> — Corrélation n'est pas causalité ! Un membre du conseil sourit : « les fontaines font réussir le brevet, vraiment ? »"},
  ],
  lesson:"Un bon discours combine les trois registres… mais surtout les <b>adapte</b> : cet auditoire pense budget et réputation. Le même discours devant une association écologiste aurait mis les océans en premier !"
 },
 {
  goal:"Convaincre tes grands-parents de se mettre aux appels vidéo pour garder le contact avec la famille.",
  aemoji:"👴👵", aname:"Papi Jean & Mamie Lucette",
  adesc:"Méfiants envers la technologie (et les vendeurs !), très attachés à la famille, fiers de se débrouiller seuls.",
  ethos:[
   {t:"« Tu me connais, Mamie : c'est moi qui ai réparé ta télé et réglé ton téléphone. Je t'installe tout, et je reste ton dépanneur officiel. »", pts:2,
    fb:"👏 <b>+2</b> — Un ethos sur mesure : tu as déjà fait tes preuves auprès d'eux. La confiance est personnelle et méritée."},
   {t:"« Les vendeurs du magasin d'informatique disent que c'est très simple à utiliser. »", pts:1,
    fb:"😐 <b>+1</b> — Les vendeurs ? Exactement ceux dont Papi se méfie le plus… Leur parole a peu de poids ici."},
   {t:"« De toute façon, à votre âge, vous ne pouvez pas comprendre : laissez-moi juste tout installer sans discuter. »", pts:0,
    fb:"😡 <b>+0</b> — Attaquer la personne (« à votre âge ») au lieu d'argumenter : vexant et contre-productif. Mamie croise les bras."},
  ],
  pathos:[
   {t:"« Tu pourrais voir le sourire de ta petite-fille le soir de son anniversaire, même quand on est à 800 km. »", pts:2,
    fb:"👏 <b>+2</b> — En plein cœur : la famille, c'est exactement ce qui les touche le plus. Mamie a déjà les larmes aux yeux."},
   {t:"« Tout le monde fait des appels vidéo maintenant : vous serez enfin modernes ! »", pts:1,
    fb:"😐 <b>+1</b> — Être « modernes » ne les intéresse pas : ils sont fiers d'être à l'ancienne. Mauvaise corde sensible."},
   {t:"« Si vous refusez, ne venez pas vous plaindre de ne jamais voir vos petits-enfants ! »", pts:0,
    fb:"😡 <b>+0</b> — Le chantage affectif est un pathos toxique : il blesse au lieu de convaincre."},
  ],
  logos:[
   {t:"« C'est gratuit, ça marche sur la tablette que vous avez déjà, et il n'y a qu'un bouton à toucher : je vous montre en cinq minutes. »", pts:2,
    fb:"👏 <b>+2</b> — Simple, concret, factuel : tu réponds d'avance à leur vraie objection (« c'est trop compliqué »)."},
   {t:"« Une étude montre que 78 % des seniors équipés utilisent la visio chaque semaine. »", pts:1,
    fb:"🙂 <b>+1</b> — Un vrai chiffre, mais abstrait : Papi ne se sent pas concerné par « les seniors équipés ». Le logos doit rester proche de l'auditoire."},
   {t:"« Depuis que la voisine fait des appels vidéo, elle a l'air en bien meilleure santé. La visio, c'est bon pour la santé ! »", pts:0,
    fb:"😬 <b>+0</b> — La voisine va mieux ET fait de la visio… corrélation n'est pas causalité ! Papi, malin, le fait remarquer aussitôt."},
  ],
  lesson:"Pour convaincre, <b>mets-toi dans la peau de ton auditoire</b> : ses valeurs (la famille), ses craintes (la complexité), sa fierté (se débrouiller seuls). L'argument « soyez modernes » qui marcherait sur tes amis tombe à plat ici."
 },
 {
  goal:"Convaincre le conseil municipal de construire un skatepark dans le quartier.",
  aemoji:"🏛️", aname:"Le conseil municipal",
  adesc:"Des élus prudents. Ce qui les préoccupe : la tranquillité des riverains, la sécurité… et les prochaines élections.",
  ethos:[
   {t:"« Nous représentons l'association des jeunes du quartier : 240 adhérents, et trois événements déjà organisés sans le moindre incident. »", pts:2,
    fb:"👏 <b>+2</b> — Des preuves de sérieux + une légitimité collective : le conseil vous écoute tout à coup différemment."},
   {t:"« On est passionnés de skate depuis des années, on connaît le sujet par cœur. »", pts:1,
    fb:"🙂 <b>+1</b> — La passion, c'est sympathique, mais ça ne rassure pas des élus inquiets pour la tranquillité publique."},
   {t:"« Un youtubeur skateur ultra célèbre dit que toutes les villes devraient avoir un skatepark. »", pts:0,
    fb:"😬 <b>+0</b> — Célèbre ≠ compétent en urbanisme : effet de halo. Un élu lève un sourcil, un autre regarde sa montre."},
  ],
  pathos:[
   {t:"« Aujourd'hui, les jeunes skatent sur la place du marché, entre les poussettes. Imaginez plutôt des riverains tranquilles et des jeunes fiers de leur ville. »", pts:2,
    fb:"👏 <b>+2</b> — Tu transformes LEUR problème (les plaintes des riverains) en image positive. L'émotion qui rassure : bien visé."},
   {t:"« Le skate, c'est notre vie, notre liberté ! Sans skatepark, on étouffe ! »", pts:1,
    fb:"😐 <b>+1</b> — Sincère… mais ça parle de VOS émotions, pas des leurs. Les élus restent de marbre."},
   {t:"« Si vous refusez, les jeunes s'en souviendront dans les urnes, et vous perdrez les élections ! »", pts:0,
    fb:"😡 <b>+0</b> — La menace n'est pas un argument : le conseil se braque. Pathos catastrophique."},
  ],
  logos:[
   {t:"« La ville voisine a installé un skatepark à 40 000 € : les plaintes des riverains pour nuisances ont été divisées par deux, car les jeunes ont un lieu dédié. »", pts:2,
    fb:"👏 <b>+2</b> — Un coût précis + un résultat mesuré qui répond à leur préoccupation n°1 : la tranquillité. Imparable."},
   {t:"« Le skate est aux Jeux olympiques maintenant : c'est la preuve que c'est un vrai sport. »", pts:1,
    fb:"🙂 <b>+1</b> — Vrai, mais hors sujet : la question des élus n'est pas « est-ce un sport ? » mais « ça posera des problèmes ? »."},
   {t:"« Soit vous construisez ce skatepark, soit cette ville n'a aucun avenir pour les jeunes. »", pts:0,
    fb:"😬 <b>+0</b> — Un faux dilemme : il existe mille nuances entre « skatepark » et « aucun avenir ». L'adjoint le fait remarquer en souriant."},
  ],
  lesson:"Le secret : répondre à la question que <b>l'auditoire</b> se pose (« ça va déranger ? combien ça coûte ? ») plutôt qu'à celle que <b>toi</b> tu te poses (« le skate, c'est génial ? »)."
 },
 {
  goal:"Convaincre ta classe de voter pour le séjour nature (plutôt que le parc d'attractions) au prochain voyage scolaire.",
  aemoji:"🎒", aname:"Ta classe de 4e",
  adesc:"Tes copains. Ce qu'ils veulent : du fun, des souvenirs entre amis. Leur grande peur : s'ennuyer.",
  ethos:[
   {t:"« Vous me connaissez : je suis le premier à mettre l'ambiance. Si MOI je vote nature, c'est que ça ne sera pas ennuyeux. »", pts:2,
    fb:"👏 <b>+2</b> — Ethos malin : ta réputation de boute-en-train répond pile à leur peur n°1, l'ennui."},
   {t:"« Écoutez-moi : je suis délégué, c'est mon rôle de choisir ce qui est bien pour la classe. »", pts:1,
    fb:"😐 <b>+1</b> — Être délégué te donne la parole, pas raison. Tes copains haussent les épaules."},
   {t:"« Ceux qui préfèrent le parc d'attractions sont des bébés qui n'ont jamais quitté leur canapé. »", pts:0,
    fb:"😡 <b>+0</b> — Insulter la moitié de ton auditoire… stratégie audacieuse. Et perdante : c'est une attaque personnelle, pas un argument."},
  ],
  pathos:[
   {t:"« Imaginez : le feu de camp le soir, les batailles d'eau à la rivière, les fous rires au dortoir. Le parc, on y va déjà en famille. ÇA, on ne le vivra qu'une fois — et ensemble. »", pts:2,
    fb:"👏 <b>+2</b> — Tu vends du fun et des souvenirs entre copains : exactement ce qu'ils veulent. Les yeux brillent."},
   {t:"« La nature est précieuse : il faut apprendre à la contempler en silence. »", pts:1,
    fb:"😐 <b>+1</b> — « Contempler en silence »… tu viens de réveiller leur pire crainte : l'ennui. Bel argument, mauvais auditoire."},
   {t:"« Si on choisit le parc d'attractions, je ne viendrai pas, et tant pis pour vous. »", pts:0,
    fb:"😡 <b>+0</b> — La bouderie n'a jamais convaincu personne. Pathos toxique."},
  ],
  logos:[
   {t:"« Le séjour nature coûte 80 € de moins par personne : avec la différence, on finance une soirée pizza ET une sortie kayak en plus. »", pts:2,
    fb:"👏 <b>+2</b> — Un calcul concret traduit en bénéfices qu'ils veulent vraiment (pizza + kayak) : imparable."},
   {t:"« Des études montrent que la nature réduit le stress et améliore la concentration en classe. »", pts:1,
    fb:"🙂 <b>+1</b> — Vrai… mais « améliorer la concentration en classe » n'est pas exactement le rêve de tes copains de 4e. Argument mal ciblé."},
   {t:"« L'an dernier, une classe est allée au parc et il a plu toute la semaine. Le parc = la pluie assurée ! »", pts:0,
    fb:"😬 <b>+0</b> — Une classe, une fois : généralisation hâtive (et la pluie tombe aussi sur les forêts). Tes copains rigolent — contre toi."},
  ],
  lesson:"Même un auditoire de copains demande de l'<b>adaptation</b> : leurs valeurs, c'est le fun et les souvenirs. Le discours « écolo-sérieux » qui convaincrait des adultes tombe à plat ici."
 },
 {
  goal:"Tu es médecin porte-parole de la santé publique aux États-Unis : convaincre un public conservateur de se faire vacciner. (Cas réel vu en formation !)",
  aemoji:"🇺🇸", aname:"Un public conservateur",
  adesc:"Attachés à la fierté nationale, à la liberté individuelle et à l'économie. Méfiants envers les grandes institutions et Hollywood.",
  ethos:[
   {t:"« Je ne suis pas un politicien : je suis médecin de terrain depuis vingt ans, et je soigne vos familles, ici, dans cette ville. »", pts:2,
    fb:"👏 <b>+2</b> — La légitimité du terrain, sans étiquette politique qui braquerait l'auditoire. Ethos parfait pour ce public."},
   {t:"« L'Organisation mondiale de la santé recommande ce vaccin. »", pts:1,
    fb:"🙂 <b>+1</b> — Autorité réelle… mais lointaine et institutionnelle : ce public se méfie justement des grandes organisations. Peu d'effet."},
   {t:"« Les plus grandes stars d'Hollywood se sont toutes fait vacciner publiquement ! »", pts:0,
    fb:"😬 <b>+0</b> — Hollywood, devant CE public ? Effet de halo + mauvais groupe de référence : tu viens de perdre la salle."},
  ],
  pathos:[
   {t:"« Ce vaccin a été inventé ici, par nos chercheurs, dans nos laboratoires. Se vacciner, c'est porter haut les couleurs du pays. »", pts:2,
    fb:"👏 <b>+2</b> — La fierté nationale : la corde sensible exacte de cet auditoire. C'est l'argument réellement utilisé en 2021 !"},
   {t:"« Pensez aux personnes fragiles : vaccinez-vous pour protéger les plus vulnérables d'entre nous. »", pts:1,
    fb:"🙂 <b>+1</b> — Bel argument… qui marchait sur l'AUTRE public (progressiste). Ici, la solidarité collective touche moins que la liberté et la fierté."},
   {t:"« Ceux qui ne se vaccinent pas sont des égoïstes et des ignorants. »", pts:0,
    fb:"😡 <b>+0</b> — Insulter son auditoire : la pire stratégie rhétorique au monde. La salle se vide."},
  ],
  logos:[
   {t:"« Chaque employé malade, c'est deux semaines d'arrêt pour nos entreprises. Vaccinés, on travaille, les commerces restent ouverts, l'économie repart. »", pts:2,
    fb:"👏 <b>+2</b> — L'argument économique : concret et aligné avec leurs valeurs. Imparable ici."},
   {t:"« Les études montrent 90 % d'efficacité sur les formes graves, avec un intervalle de confiance robuste. »", pts:1,
    fb:"🙂 <b>+1</b> — Scientifiquement vrai… mais le jargon (« intervalle de confiance ») perd un public déjà méfiant. La précision sans pédagogie ne convainc pas."},
   {t:"« Mon cousin s'est vacciné et n'a jamais attrapé le Covid : la preuve que ça marche ! »", pts:0,
    fb:"😬 <b>+0</b> — Un seul cas ne prouve rien : généralisation hâtive. L'auditoire le sait, et ta crédibilité chute."},
  ],
  lesson:"Cas réel : aux États-Unis, on a utilisé des arguments <b>différents</b> pour convaincre démocrates (« protégeons les fragiles ») et républicains (« le vaccin est américain, l'économie repart »). Aucun n'est plus « vrai » que l'autre : ils sont <b>adaptés à leur auditoire</b>. C'est ça, la rhétorique."
 },
];

const REGS=["ethos","pathos","logos"];
let mi=0, sel={ethos:-1,pathos:-1,logos:-1}, order={}, stars=0;
const $=id=>document.getElementById(id);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function startGame(){
  mi=0; stars=0;
  $("intro").style.display="none";
  $("hud").style.display="flex";
  $("game").style.display="block";
  $("qtot").textContent=MISSIONS.length;
  renderMission();
}

function renderMission(){
  const M=MISSIONS[mi];
  sel={ethos:-1,pathos:-1,logos:-1};
  $("qnum").textContent=mi+1;
  $("mtxt").textContent=M.goal;
  $("aemoji").textContent=M.aemoji;
  $("aname").textContent=M.aname;
  $("adesc").textContent=M.adesc;
  $("builder").style.display="block";
  $("delivery").style.display="none";
  $("verdict").style.display="none";
  $("nextbtn").style.display="none";
  for(let s=0;s<3;s++) $("step"+s).style.display="none";
  $("conv-fill").style.width="0%";
  $("conv-val").textContent="0 %";
  REGS.forEach(reg=>{
    order[reg]=shuffle([...M[reg].keys()]);
    const wrap=$("opts-"+reg); wrap.innerHTML="";
    order[reg].forEach(oi=>{
      const o=M[reg][oi];
      const b=document.createElement("button");
      b.className="opt";
      b.textContent=o.t;
      b.onclick=()=>{
        sel[reg]=oi;
        wrap.querySelectorAll(".opt").forEach(x=>x.classList.toggle("sel",x===b));
        checkReady();
      };
      wrap.appendChild(b);
    });
  });
  checkReady();
  window.scrollTo({top:0,behavior:"smooth"});
}

function checkReady(){
  const ready=REGS.every(r=>sel[r]>=0);
  const btn=$("speakbtn");
  btn.disabled=!ready;
  btn.textContent=ready?"🎙️ Prononcer le discours !":"🎙️ Choisis un argument par registre";
}

function speak(){
  const M=MISSIONS[mi];
  $("builder").style.display="none";
  $("delivery").style.display="block";
  let total=0;
  REGS.forEach((reg,s)=>{
    const o=M[reg][sel[reg]];
    setTimeout(()=>{
      const step=$("step"+s);
      step.classList.remove("p0","p1","p2");
      step.classList.add("p"+o.pts);
      step.querySelector(".dsaid").textContent=o.t;
      step.querySelector(".dreact").innerHTML=o.fb;
      step.style.display="block";
      total+=o.pts;
      const pct=Math.round(total/6*100);
      $("conv-fill").style.width=pct+"%";
      $("conv-val").textContent=pct+" %";
      step.scrollIntoView({behavior:"smooth",block:"center"});
      if(s===2) setTimeout(()=>verdict(total),900);
    },500+s*1400);
  });
}

function verdict(total){
  const M=MISSIONS[mi];
  const got = total>=6?3 : total>=4?2 : total>=2?1 : 0;
  stars+=got;
  $("hud-stars").textContent="⭐ "+stars;
  let t;
  if(got===3) t="🎉 Ovation debout ! L'auditoire est conquis.";
  else if(got===2) t="👏 Auditoire convaincu — quelques sceptiques restent.";
  else if(got===1) t="😶 Accueil mitigé… le discours n'a pas porté.";
  else t="🍅 Fiasco total. On t'a presque jeté des tomates.";
  $("v-title").textContent=t;
  $("v-stars").textContent="⭐".repeat(got)+"☆".repeat(3-got);
  $("v-lesson").innerHTML=M.lesson;
  $("verdict").style.display="block";
  $("nextbtn").textContent = mi===MISSIONS.length-1 ? "Voir mon bilan ➜" : "Mission suivante ➜";
  $("nextbtn").style.display="block";
  $("verdict").scrollIntoView({behavior:"smooth",block:"center"});
}

function nextMission(){
  if(mi===MISSIONS.length-1){ endGame(); return; }
  mi++; renderMission();
}

function endGame(){
  $("game").style.display="none";
  $("hud").style.display="none";
  $("end").style.display="block";
  const max=MISSIONS.length*3;
  $("end-score").textContent="⭐ "+stars+" / "+max;
  let title,msg;
  if(stars>=max-2){title="🏆 Orateur d'exception !";msg="Tu maîtrises l'art le plus fin de la rhétorique : <b>l'adaptation à l'auditoire</b>. Ethos, pathos, logos… tu sais lequel dégainer, et surtout comment le formuler pour CE public-là.";}
  else if(stars>=Math.round(max*0.55)){title="🎙️ Bon orateur !";msg="Tes discours portent ! Garde le réflexe clé : avant de parler, demande-toi <b>« qu'est-ce qui compte pour EUX ? »</b> — leurs valeurs, leurs craintes, leurs fiertés.";}
  else{title="📢 Orateur en herbe";msg="La rhétorique se <b>pratique</b> plus qu'elle ne s'apprend ! Relis les réactions de l'auditoire : un argument vrai mais mal ciblé convainc moins qu'un argument adapté.";}
  msg+="<br><br>💡 Et souviens-toi : connaître ces techniques sert à <b>convaincre honnêtement</b>… et à repérer quand on les utilise sur toi.";
  $("end-title").textContent=title;
  $("end-msg").innerHTML=msg;
}
