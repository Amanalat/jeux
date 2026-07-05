// Biais proposés comme réponses (jeux de 4 options par question "biais")
const BIAS = {
  conf:  {l:"🔁 Biais de confirmation", s:"on préfère ce qui confirme nos idées"},
  halo:  {l:"⭐ Effet de halo", s:"compétent ici = cru partout"},
  emo:   {l:"💓 Biais émotionnel", s:"l'émotion capte notre attention"},
  popu:  {l:"📣 Biais de popularité", s:"« tout le monde y croit ! »"},
  heur:  {l:"⚡ Heuristique", s:"conclusion trop rapide, sans tous les éléments"},
  surv:  {l:"✈️ Biais du survivant", s:"on ne voit que ceux qui ont « survécu »"},
  cadr:  {l:"🖼️ Effet de cadrage", s:"la présentation oriente la perception"},
  ancr:  {l:"⚓ Effet d'ancrage", s:"le 1er chiffre sert de point de repère"},
  auto:  {l:"🎓 Biais d'autorité", s:"« un expert / une blouse l'a dit »"},
  disp:  {l:"📰 Biais de disponibilité", s:"ce qui vient vite en tête semble fréquent"},
  caus:  {l:"🔗 Corrélation ≠ causalité", s:"liés ≠ l'un cause l'autre"},
  nega:  {l:"⚠️ Biais de négativité", s:"le négatif marque plus que le positif"},
  retro: {l:"🕰️ Biais rétrospectif", s:"« je le savais depuis le début ! »"},
  barn:  {l:"♈ Effet Barnum", s:"« ce portrait vague, c'est tout moi ! »"},
};

// type "piege" : énigme avec réponse intuitive fausse. type "biais" : identifier le biais (a + 3 distracteurs)
const ITEMS = [
  {type:"piege", t:"Une raquette et une balle coûtent 1,10 € ensemble. La raquette coûte 1 € de PLUS que la balle. Combien coûte la balle ?",
   opts:["10 centimes","5 centimes","1 euro","15 centimes"], a:1,
   e:"Ton intuition crie « 10 centimes » ! Mais alors la raquette coûterait 1,10 € et le total 1,20 €. La bonne réponse est <b>5 centimes</b> (raquette : 1,05 €). C'est l'énigme classique des <b>deux systèmes de pensée</b> : l'intuition répond vite et mal, l'analyse répond lentement et bien."},
  {type:"piege", t:"Si 5 machines mettent 5 minutes à fabriquer 5 objets, combien de temps mettent 100 machines pour fabriquer 100 objets ?",
   opts:["100 minutes","20 minutes","5 minutes","50 minutes"], a:2,
   e:"L'intuition dit « 100 » ! Mais chaque machine met 5 minutes pour fabriquer SON objet. 100 machines fabriquent donc 100 objets en… <b>5 minutes</b>. Encore un piège tendu au mode intuitif."},
  {type:"piege", t:"Sur un lac, des nénuphars doublent de surface chaque jour. Ils couvrent tout le lac en 48 jours. En combien de jours couvrent-ils la MOITIÉ du lac ?",
   opts:["24 jours","47 jours","12 jours","36 jours"], a:1,
   e:"« 24 » paraît évident… mais si la surface DOUBLE chaque jour, la moitié du lac est atteinte <b>la veille</b> du lac entier : au jour <b>47</b>. Prendre 2 secondes pour réfléchir change tout."},
  {type:"piege", t:"Sur les photos de la Lune, le drapeau américain semble flotter… alors qu'il n'y a pas de vent sur la Lune. Conclusion ?",
   opts:["On n'est jamais allé sur la Lune","Le drapeau est tenu par une barre métallique","Il y a un peu de vent sur la Lune","La photo est retouchée"], a:1,
   e:"« Drapeau qui flotte + pas de vent = mensonge » : c'est un raisonnement trop rapide, une <b>heuristique</b>. En regardant mieux la photo, on voit une <b>barre en métal</b> qui tient le tissu. Avant de crier au complot, cherche l'explication simple."},
  {type:"biais", t:"Kevin est persuadé que les femmes conduisent mal. Quand il voit une statistique montrant que les hommes ont plus d'accidents graves, il répond : « ces chiffres sont truqués » — mais il se souvient très bien d'UNE vidéo de femme qui se gare mal.",
   a:"conf", opts:["halo","popu","surv"],
   e:"Le <b>biais de confirmation</b> : on accepte sans vérifier ce qui confirme nos idées, et on rejette (ou on oublie) ce qui les contredit. C'est l'un des plus grands pièges du cerveau — et une des portes d'entrée des théories du complot."},
  {type:"biais", t:"Un champion olympique de judo fait de la publicité pour une voiture. Beaucoup de gens se disent : « s'il la recommande, c'est sûrement une bonne voiture ».",
   a:"halo", opts:["popu","emo","heur"],
   e:"L'<b>effet de halo</b> : on transfère la compétence de quelqu'un (le judo !) vers un domaine qui n'a rien à voir (les voitures). Toute la publicité par célébrités repose sur ce biais."},
  {type:"biais", t:"Sur les réseaux, une photo bouleversante d'un enfant et de son chien dans des ruines récolte des millions de partages. Elle a été générée par une IA.",
   a:"emo", opts:["conf","cadr","popu"],
   e:"Le <b>biais émotionnel</b> : une info qui nous émeut capte notre attention et se partage plus vite — vraie ou fausse. C'est pour ça que les fake news les plus virales jouent sur la colère, la peur ou l'attendrissement. Respire avant de partager !"},
  {type:"biais", t:"« Des millions de personnes utilisent cette astuce santé, elle est forcément efficace ! »",
   a:"popu", opts:["surv","halo","conf"],
   e:"Le <b>biais de popularité</b> : le nombre de croyants ne prouve rien. Des millions de personnes ont longtemps cru que la Terre était au centre de l'univers. La vérité ne se mesure pas en likes."},
  {type:"biais", t:"Pendant la guerre, on étudie les avions qui REVIENNENT à la base pour savoir où les blinder. Ils ont des impacts aux ailes : on veut blinder les ailes. Le statisticien Abraham Wald dit : « Non ! Blindez là où il n'y a PAS d'impacts. »",
   a:"surv", opts:["heur","conf","cadr"],
   e:"Le <b>biais du survivant</b> : les avions touchés ailleurs ne sont jamais revenus ! On ne voyait que les « survivants ». Même piège quand on dit « mon grand-père a fumé toute sa vie et a vécu 95 ans » : on ne voit pas tous ceux qui sont morts avant."},
  {type:"biais", t:"« Mon arrière-grand-mère a fumé un paquet par jour jusqu'à 96 ans, donc le tabac n'est pas si dangereux. »",
   a:"surv", opts:["conf","heur","popu"],
   e:"Encore le <b>biais du survivant</b> : on cite le cas exceptionnel qui a « survécu », en oubliant les millions de fumeurs morts prématurément qu'on n'entend jamais témoigner. Un cas isolé ne contredit pas une statistique."},
  {type:"biais", t:"Le même sondage donne deux titres : « 64 % des Français maintiennent leur budget de Noël » ou « plus d'un Français sur trois doit réduire son budget de Noël ». Selon le titre lu, on ne ressent pas du tout la même chose.",
   a:"cadr", opts:["emo","conf","heur"],
   e:"L'<b>effet de cadrage</b> : la MÊME information, présentée différemment, change notre perception. Le verre à moitié plein ou à moitié vide. Aucun mensonge — juste un angle choisi."},
  {type:"biais", t:"« La schizophrénie, c'est avoir plusieurs personnalités » : beaucoup de gens en sont sûrs… parce qu'ils l'ont vu dans des films et des séries.",
   a:"heur", opts:["halo","popu","conf"],
   e:"Une <b>conclusion trop rapide</b> à partir de ce qui nous vient en tête (la fiction !) : c'est une <b>heuristique</b>. La schizophrénie n'a rien à voir avec les personnalités multiples. D'où la question clé : <b>« d'où est-ce que je tiens ce que je crois ? »</b>"},
  {type:"biais", t:"Un intervenant parle de psychologie pendant 1h30 à une classe. À la fin, il demande : « au fait… pourquoi m'avez-vous cru ? Je ne vous ai jamais dit que j'étais psychologue. » Personne n'avait vérifié.",
   a:"heur", opts:["popu","emo","cadr"],
   e:"On lui a accordé sa confiance par <b>raccourci</b> : il était invité par l'école, il parlait bien, donc « il doit être légitime ». C'est souvent vrai… mais il faut savoir se demander : <b>cette personne est-elle compétente sur CE sujet ?</b> Beaucoup de gens parlent dans les médias hors de leur domaine."},
  {type:"piege", t:"Selon toi, quelle est la meilleure habitude AVANT de partager une info sur les réseaux ?",
   opts:["Vérifier qu'elle a beaucoup de likes","Compter jusqu'à 2 et se demander si elle est fiable","La partager vite pour informer les autres","Vérifier qu'elle vient d'un ami de confiance"], a:1,
   e:"<b>Compter jusqu'à 2</b> : une simple respiration qui fait passer du mode intuitif au mode analytique. « Pourquoi ai-je envie de partager ça ? Est-ce que ça flatte mon biais de confirmation ? Trop beau pour être vrai ? » 2 secondes suffisent — et ça change tout."},

  // ===== 30 questions supplémentaires =====
  {type:"piege", t:"Dans une course à pied, tu doubles le coureur en 2ᵉ position. Tu es maintenant…",
   opts:["1er","2ᵉ","3ᵉ","Ça dépend"], a:1,
   e:"En doublant le 2ᵉ, tu prends SA place : tu es <b>2ᵉ</b>, pas 1er ! L'intuition crie « 1er » d'un réflexe. Compte jusqu'à 2 et tout devient clair."},
  {type:"piege", t:"Combien d'animaux de chaque espèce Moïse a-t-il emmenés dans son arche ?",
   opts:["Deux","Sept","Aucun","Un couple"], a:2,
   e:"<b>Aucun</b> : ce n'est pas Moïse mais <b>Noé</b> ! Ton cerveau lit trop vite et ne repère pas l'erreur glissée dans la phrase — on appelle ça « l'illusion de Moïse ». Toujours relire l'énoncé."},
  {type:"piege", t:"On te prescrit 3 cachets, à prendre un toutes les 30 minutes. Au bout de combien de temps auras-tu pris le dernier ?",
   opts:["1h30","1h","45 min","30 min"], a:1,
   e:"1er à 0 min, 2ᵉ à 30 min, 3ᵉ à 60 min : il s'écoule <b>1 heure</b>. L'intuition fait 3×30 = 1h30 sans voir que le premier cachet ne « compte » aucun temps d'attente."},
  {type:"piege", t:"Combien de mois de l'année comptent (au moins) 28 jours ?",
   opts:["1","2","12","11"], a:2,
   e:"<b>Les 12 mois</b> ont au moins 28 jours ! L'intuition pense aussitôt « février » et répond 1, sans relire la question."},
  {type:"piege", t:"Un tiroir contient 10 chaussettes noires et 10 bleues mélangées. Dans le noir total, combien dois-tu en sortir pour être SÛR d'avoir 2 chaussettes de la même couleur ?",
   opts:["2","3","11","21"], a:1,
   e:"<b>3 suffisent</b> : avec seulement 2 couleurs, dès la 3ᵉ chaussette, deux au moins sont forcément identiques. L'intuition surévalue (« 11 ! ») par excès de prudence."},
  {type:"piege", t:"Un escargot grimpe un puits de 10 m. Le jour il monte de 3 m, la nuit il glisse de 2 m. En combien de jours sort-il du puits ?",
   opts:["10 jours","8 jours","5 jours","20 jours"], a:1,
   e:"Il gagne 1 m net par jour… mais le 8ᵉ jour, parti de 7 m, il monte de 3 m et atteint 10 m : il est dehors avant la glissade ! Réponse : <b>8 jours</b>, pas 10."},
  {type:"piege", t:"Un avion laisse une longue traînée blanche dans le ciel, un autre presque rien. Pour certains, c'est la preuve qu'on nous « asperge » de produits. L'explication la plus probable ?",
   opts:["On nous empoisonne en secret","De la condensation, variable selon l'altitude, la température et l'humidité","Certains avions polluent plus","C'est de la fumée chimique"], a:1,
   e:"« Traînée bizarre = complot » est un raccourci trop rapide. L'explication banale existe : la <b>condensation</b> dépend de la température et de l'humidité à l'altitude de vol. Cherche d'abord l'explication simple avant l'extraordinaire."},
  {type:"piege", t:"Tu lis une info choc partagée par un proche. Quel est le MEILLEUR réflexe ?",
   opts:["La repartager vite pour prévenir tout le monde","Remonter à la source d'origine avant d'y croire","La croire, car elle vient d'un proche","Vérifier qu'elle a beaucoup de partages"], a:1,
   e:"<b>Remonter à la source</b> : qui dit ça à l'origine ? quand ? avec quelles preuves ? Un proche bien intentionné peut relayer une fausse info, et le nombre de partages ne prouve rien. Compte jusqu'à 2, puis vérifie."},

  {type:"biais", t:"Une pub clame : « 100 % de nos gagnants avaient tenté leur chance ! Et si c'était vous ? »",
   a:"surv", opts:["caus","popu","emo"],
   e:"Le <b>biais du survivant</b> : on ne te montre que les gagnants. Évidemment qu'ils ont joué… comme les millions de perdants invisibles ! Tenter sa chance ne « cause » pas de gagner."},
  {type:"biais", t:"« Steve Jobs et Bill Gates ont abandonné leurs études et sont devenus milliardaires : la preuve que l'école ne sert à rien pour réussir. »",
   a:"surv", opts:["popu","caus","halo"],
   e:"<b>Biais du survivant</b> : on cite 2 réussites célèbres en oubliant les millions de décrocheurs qui n'ont PAS réussi et dont personne ne parle jamais. Les exceptions ne font pas la règle."},
  {type:"biais", t:"On te demande d'abord « la tour Eiffel fait-elle plus ou moins de 1000 m ? », puis d'estimer sa hauteur. Tu surestimes largement (elle fait 330 m).",
   a:"ancr", opts:["disp","cadr","heur"],
   e:"L'<b>effet d'ancrage</b> : le « 1000 » entendu juste avant devient un repère qui tire ton estimation vers le haut, même s'il est absurde. Les prix barrés en magasin exploitent exactement ça."},
  {type:"biais", t:"Le vendeur annonce d'abord 18 000 € pour la voiture, puis « fait un geste » à 15 000 €. Tu trouves soudain l'affaire excellente.",
   a:"ancr", opts:["cadr","popu","auto"],
   e:"L'<b>effet d'ancrage</b> : le premier prix (18 000) sert de repère et fait paraître 15 000 « avantageux », même si la voiture en vaut 12 000. Fixe TON prix de référence avant de négocier."},
  {type:"biais", t:"Un dentifrice affiche : « Recommandé par les dentistes ». Tu l'achètes les yeux fermés.",
   a:"auto", opts:["halo","popu","conf"],
   e:"Le <b>biais d'autorité</b> : un titre ou une blouse suffit à nous convaincre, sans preuve ni détail (quels dentistes ? combien ? payés ?). Une autorité peut se tromper — demande la preuve, pas l'étiquette."},
  {type:"biais", t:"Dans une vidéo, un homme en blouse blanche affirme qu'un remède « nettoie les toxines ». Aucun nom, aucun diplôme vérifiable, mais la blouse suffit à convaincre les commentaires.",
   a:"auto", opts:["barn","halo","emo"],
   e:"Le <b>biais d'autorité</b> : un costume d'expert (blouse, plateau TV, ton assuré) inspire confiance sans aucune preuve réelle. Le symbole n'est pas une compétence."},
  {type:"biais", t:"Après un reportage sur un crash d'avion, Léa annule son vol et préfère faire 1000 km en voiture, « bien plus sûr ».",
   a:"disp", opts:["emo","nega","conf"],
   e:"Le <b>biais de disponibilité</b> : le crash, marquant et récent, lui vient facilement en tête, donc semble fréquent. Statistiquement, la voiture est pourtant bien plus dangereuse que l'avion."},
  {type:"biais", t:"On observe que plus on vend de glaces, plus il y a de noyades. Faut-il interdire les glaces pour sauver des vies ?",
   a:"caus", opts:["conf","surv","popu"],
   e:"<b>Corrélation n'est pas causalité</b> : c'est l'<b>été</b> (la chaleur) qui fait grimper les deux en même temps. Les glaces ne causent pas les noyades. Cherche toujours la cause cachée."},
  {type:"biais", t:"« Les élèves qui ont un smartphone ont de moins bonnes notes : le téléphone rend bête. »",
   a:"caus", opts:["conf","nega","surv"],
   e:"<b>Corrélation ≠ causalité</b> : d'autres facteurs (sommeil, milieu, façon d'utiliser le téléphone) peuvent expliquer les deux. Un lien observé ne dit pas qui cause quoi."},
  {type:"biais", t:"Les journaux télévisés enchaînent crimes, drames et catastrophes. Beaucoup en concluent que « tout va de pire en pire dans le monde ».",
   a:"nega", opts:["disp","cadr","popu"],
   e:"Le <b>biais de négativité</b> : le malheur capte plus l'attention et se relaie davantage que le progrès silencieux. Ce n'est pas que tout empire — c'est que le négatif fait plus de bruit."},
  {type:"biais", t:"Après l'effondrement d'une cryptomonnaie, ton oncle déclare : « C'était évident que ça allait s'écrouler, je l'ai toujours dit ! » Pourtant il avait investi dedans.",
   a:"retro", opts:["conf","heur","popu"],
   e:"Le <b>biais rétrospectif</b> : une fois le résultat connu, on est persuadé de « l'avoir toujours su ». L'avenir paraît évident… seulement après coup."},
  {type:"biais", t:"Après la défaite de l'équipe, les supporters s'écrient : « On le savait depuis le début, ce coach était nul ! » Avant le match, ils l'adoraient.",
   a:"retro", opts:["popu","conf","emo"],
   e:"Le <b>biais rétrospectif</b> : le résultat connu réécrit nos souvenirs. On reconstruit un passé où « tout était prévisible »."},
  {type:"biais", t:"« Vous êtes quelqu'un de sociable, mais qui a aussi besoin de moments de solitude ; vous doutez parfois de vos choix. » Marie trouve que son horoscope « tombe incroyablement juste ».",
   a:"barn", opts:["conf","emo","auto"],
   e:"L'<b>effet Barnum</b> : la description est si vague qu'elle colle à presque tout le monde. Demande-toi : « cela pourrait-il s'appliquer à n'importe qui ? » C'est tout le truc des horoscopes et des voyants."},
  {type:"biais", t:"Un test en ligne te révèle ton « profil unique ». La description te semble parfaitement toi… et ton ami obtient un autre résultat mais le trouve tout aussi juste.",
   a:"barn", opts:["conf","auto","heur"],
   e:"L'<b>effet Barnum</b> : ces portraits sont assez flous pour convenir à tout le monde. Le sentiment « c'est tellement moi ! » n'est pas une preuve de fiabilité."},
  {type:"biais", t:"Convaincu qu'un aliment est dangereux, Tom tape sur internet « aliment X danger » et trouve plein de résultats qui lui donnent raison.",
   a:"conf", opts:["disp","popu","auto"],
   e:"<b>Biais de confirmation</b> : en cherchant « X danger », il ne trouve que ce qui confirme sa peur. S'il avait tapé « X bienfaits », il aurait trouvé l'inverse. La requête oriente déjà la réponse."},
  {type:"biais", t:"Pendant un débat, tu retiens tous les arguments de « ton camp » et tu oublies aussitôt ceux de l'autre, que tu trouves « nuls ».",
   a:"conf", opts:["emo","halo","retro"],
   e:"<b>Biais de confirmation</b> : on mémorise ce qui nous arrange et on évacue le reste. Pour le contrer : essaie d'exposer honnêtement l'argument adverse le plus fort."},
  {type:"biais", t:"Lors d'un entretien, un candidat très beau et souriant est jugé plus compétent et plus honnête que les autres, avant même qu'on ait testé ses compétences.",
   a:"halo", opts:["auto","conf","cadr"],
   e:"L'<b>effet de halo</b> : une qualité visible (le physique, le sourire) déteint sur tout le reste. Beau ≠ compétent ≠ honnête. Sépare l'apparence du fond."},
  {type:"biais", t:"Un produit a 10 000 avis 5 étoiles, donc Sarah l'achète sans rien lire : « avec autant de monde, c'est forcément bien ».",
   a:"popu", opts:["auto","halo","surv"],
   e:"Le <b>biais de popularité</b> (preuve sociale) : le nombre rassure, mais des avis peuvent être achetés, triés ou trompeurs. Le nombre n'est pas une preuve de qualité."},
  {type:"biais", t:"Un post indigné « PARTAGEZ vite avant qu'ils ne suppriment ça !!! » te donne envie de le relayer immédiatement, sans vérifier la source.",
   a:"emo", opts:["popu","conf","auto"],
   e:"Le <b>biais émotionnel</b> : l'urgence et l'indignation court-circuitent la réflexion. Plus un message te pousse à réagir vite, plus tu dois ralentir et vérifier."},
  {type:"biais", t:"Un complément alimentaire au nom savant, « avec extrait breveté de Garcinia Cambogia », te paraît sérieux et efficace, rien qu'à cause du nom.",
   a:"heur", opts:["auto","halo","barn"],
   e:"Une <b>heuristique</b> : nom compliqué = « ça a l'air scientifique » = « ça doit marcher ». Raccourci classique. Un mot savant ne prouve aucune efficacité."},
  {type:"biais", t:"« Cette opération a 90 % de réussite » rassure bien plus que « cette opération a 10 % d'échec », alors que c'est exactement le même chiffre.",
   a:"cadr", opts:["emo","ancr","disp"],
   e:"L'<b>effet de cadrage</b> : gain ou perte, c'est la même donnée, mais notre ressenti et nos décisions changent. Médecins et publicitaires choisissent l'angle exprès."},
  {type:"biais", t:"Un steak « 80 % maigre » paraît plus appétissant que le même « 20 % de gras », alors que c'est rigoureusement identique.",
   a:"cadr", opts:["emo","ancr","popu"],
   e:"L'<b>effet de cadrage</b> : la même réalité, formulée positivement ou négativement, ne déclenche pas le même ressenti. Reformule l'info autrement pour repérer l'angle choisi."},
];

const QTIME=15; // secondes pour répondre une fois la respiration passée
let deck=[],idx=0,score=0,streak=0,best=0,locked=true,timer=null,countdown=null,timeLeft=QTIME,timedOut=0;
const $=id=>document.getElementById(id);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function startGame(){
  deck=shuffle([...ITEMS]).slice(0,12);
  idx=0;score=0;streak=0;best=0;timedOut=0;
  $("fiches").style.display="none";
  $("intro").style.display="none";
  $("hud").style.display="flex";
  $("game").style.display="block";
  $("qtot").textContent=deck.length;
  renderQ();
}

function renderQ(){
  const it=deck[idx];
  $("qnum").textContent=idx+1;
  $("scase").textContent="Dossier n°"+String(idx+1).padStart(2,"0");
  $("stxt").textContent=it.t;
  const tag=$("stag");
  if(it.type==="piege"){tag.className="stag piege";tag.textContent="⚡ Énigme piège";}
  else{tag.className="stag biais";tag.textContent="🔍 Quel biais est à l'œuvre ?";}
  $("feedback").style.display="none";
  $("nextbtn").style.display="none";
  const ans=$("answers");ans.innerHTML="";
  let choices,correct;
  if(it.type==="piege"){
    choices=it.opts.map((o,i)=>({label:o,sub:"",ok:i===it.a}));
    choices=shuffle(choices);
  } else {
    const pool=[{...BIAS[it.a],ok:true},...it.opts.map(id=>({...BIAS[id],ok:false}))];
    choices=shuffle(pool).map(c=>({label:c.l,sub:c.s,ok:c.ok}));
  }
  choices.forEach(c=>{
    const b=document.createElement("button");
    b.className="abtn locked";
    b.innerHTML=c.label+(c.sub?`<span class="asub">${c.sub}</span>`:"");
    b.dataset.ok=c.ok?"1":"0";
    b.onclick=()=>answer(it,b);
    ans.appendChild(b);
  });
  // Respiration : verrouillage 2 secondes
  locked=true;
  clearInterval(countdown);
  $("timer-wrap").style.display="none";
  const circ=$("breath-circle");
  $("breath").style.visibility="visible";
  circ.textContent="1";
  clearTimeout(timer);
  timer=setTimeout(()=>{circ.textContent="2";},1000);
  setTimeout(()=>{
    if(idx>=deck.length)return;
    locked=false;
    $("breath").style.visibility="hidden";
    document.querySelectorAll(".abtn").forEach(b=>b.classList.remove("locked"));
    startCountdown(it);
  },2000);
}

function startCountdown(it){
  clearInterval(countdown);
  timeLeft=QTIME;
  const wrap=$("timer-wrap"),num=$("timer-num"),fill=$("timer-fill");
  wrap.style.display="flex";
  wrap.classList.remove("timer-low");
  num.textContent=timeLeft;
  fill.style.width="100%";
  countdown=setInterval(()=>{
    timeLeft--;
    num.textContent=Math.max(timeLeft,0);
    fill.style.width=Math.max(timeLeft/QTIME*100,0)+"%";
    if(timeLeft<=5)wrap.classList.add("timer-low");
    if(timeLeft<=0){clearInterval(countdown);timeUp(it);}
  },1000);
}

function timeUp(it){
  locked=true;
  $("timer-wrap").style.display="none";
  document.querySelectorAll(".abtn").forEach(b=>{
    b.disabled=true;b.classList.add("dim");
    if(b.dataset.ok==="1"){b.classList.remove("dim");b.classList.add("good");}
  });
  streak=0;timedOut++;
  $("streak").textContent="";
  $("fb-title").textContent="⏱ Trop tard ! Ton Système 1 a hésité…";
  const fb=$("feedback");fb.className="ko";fb.style.display="block";
  $("fb-expl").innerHTML="Le temps est écoulé. Voici la bonne réponse :<br><br>"+it.e;
  $("nextbtn").textContent=idx===deck.length-1?"Voir mon bilan ➜":"Question suivante ➜";
  $("nextbtn").style.display="block";
  $("nextbtn").scrollIntoView({behavior:"smooth",block:"end"});
}

function answer(it,btn){
  if(locked)return;
  locked=true;
  clearInterval(countdown);
  $("timer-wrap").style.display="none";
  const ok=btn.dataset.ok==="1";
  document.querySelectorAll(".abtn").forEach(b=>{
    b.disabled=true;b.classList.add("dim");
    if(b.dataset.ok==="1"){b.classList.remove("dim");b.classList.add("good");}
  });
  if(ok){
    streak++;best=Math.max(best,streak);
    const fast=timeLeft>=QTIME-6; // répondu juste ET vite
    score+=10+(streak>=3?5:0)+(fast?5:0);
    let t;
    if(fast)t="⚡ Vif ET juste — Système 1 maîtrisé ! (+"+(15+(streak>=3?5:0))+(streak>=3?`, série de ${streak} 🔥`:"")+")";
    else if(streak>=3)t=`✔ Cerveau analytique activé ! (+15, série de ${streak} 🔥)`;
    else t="✔ Bien joué, tu as gardé la tête froide ! (+10)";
    $("fb-title").textContent=t;
  } else {
    btn.classList.remove("dim");btn.classList.add("bad");
    streak=0;
    $("fb-title").textContent="✘ Ton intuition t'a piégé !";
  }
  $("score").textContent=score;
  $("streak").textContent=streak>=2?`🔥 ${streak}`:"";
  const fb=$("feedback");
  fb.className=ok?"ok":"ko";fb.style.display="block";
  $("fb-expl").innerHTML=it.e;
  $("nextbtn").textContent=idx===deck.length-1?"Voir mon bilan ➜":"Question suivante ➜";
  $("nextbtn").style.display="block";
  $("nextbtn").scrollIntoView({behavior:"smooth",block:"end"});
}

function nextQ(){
  if(idx===deck.length-1){endGame();return;}
  idx++;renderQ();
  window.scrollTo({top:0,behavior:"smooth"});
}

function endGame(){
  clearInterval(countdown);clearTimeout(timer);
  $("timer-wrap").style.display="none";
  $("game").style.display="none";
  $("nextbtn").style.display="none";
  $("hud").style.display="none";
  $("end").style.display="block";
  $("end-score").textContent=score+" pts";
  const ratio=score/(deck.length*10);
  let title,msg;
  if(ratio>=0.9){title="🏆 Maître de la métacognition !";msg="Ton cerveau analytique est aux commandes. Tu sais prendre du recul sur ton propre fonctionnement — c'est exactement ça, la <b>métacognition</b>.";}
  else if(ratio>=0.6){title="🧠 Bon chasseur de biais !";msg="Tu repères déjà la plupart des pièges. Souviens-toi : faire confiance à son cerveau, oui — mais savoir qu'il nous joue parfois des tours.";}
  else{title="⚡ L'intuition t'a mené la vie dure…";msg="Pas de panique : ces pièges trompent presque tout le monde du premier coup ! Rejoue, et surtout : <b>compte jusqu'à 2</b> avant de répondre.";}
  if(best>=5)msg+="<br><br>Ta meilleure série : <b>"+best+" 🔥</b>";
  if(timedOut>0)msg+="<br><br>⏱ Hors-délai : <b>"+timedOut+"</b> — sous pression, garde la tête froide : respire, puis tranche.";
  msg+="<br><br>💡 <i>« L'ennemi de la connaissance, ce n'est pas l'ignorance : c'est l'illusion de la connaissance. »</i>";
  $("end-title").textContent=title;
  $("end-msg").innerHTML=msg;
}

// ===== Fiches anti-biais =====
const FICHES = [
  {concept:true, icon:"🧠", title:"Tes deux cerveaux",
   def:"Ton esprit a deux vitesses. Le <b>Système 1</b> est rapide, automatique, intuitif. Le <b>Système 2</b> est lent, réfléchi, analytique. Le 1 décide presque tout… et c'est lui qui tombe dans les pièges.",
   ex:"Énigme à 1,10 € : tu réponds « 10 centimes » sans réfléchir (Système 1). La bonne réponse, 5 centimes, demande de poser le calcul (Système 2).",
   parade:"Compte jusqu'à 2 : ce petit délai laisse au Système 2 le temps de se réveiller avant de répondre ou de partager."},
  {id:"conf",
   def:"On cherche, on retient et on croit en priorité ce qui <b>confirme</b> nos idées — et on ignore ou on minimise ce qui les contredit.",
   ex:"Kevin se souvient d'UNE femme qui se gare mal, mais rejette « truquées » les statistiques qui le contredisent.",
   parade:"Demande-toi : « Qu'est-ce qui pourrait prouver que j'ai TORT ? » — puis va vraiment le chercher."},
  {id:"halo",
   def:"Une qualité visible (beauté, talent, sympathie) <b>déteint</b> sur le reste : on suppose la personne compétente ou honnête dans tous les domaines.",
   ex:"Un champion de judo vante une voiture → on le croit, alors qu'il n'y connaît rien en mécanique.",
   parade:"Sépare la personne du message : « est-elle vraiment compétente sur CE sujet précis ? »"},
  {id:"emo",
   def:"Une info qui nous <b>émeut</b> (peur, colère, attendrissement) capte l'attention et se partage davantage — qu'elle soit vraie ou fausse.",
   ex:"Une photo générée par IA d'un enfant dans les ruines récolte des millions de partages.",
   parade:"Si une info te fait fortement réagir, méfie-toi : c'est souvent fait exprès. Respire avant de partager."},
  {id:"popu",
   def:"On croit qu'une chose est vraie ou bonne <b>parce que beaucoup de gens</b> y adhèrent (preuve sociale).",
   ex:"« Des millions de gens utilisent cette astuce, elle marche forcément ! »",
   parade:"Le nombre ne prouve rien : des millions de gens se sont déjà trompés ensemble. Cherche la preuve, pas le nombre."},
  {id:"heur",
   def:"Un <b>raccourci mental</b> : on conclut vite à partir du premier élément qui vient en tête, sans tout vérifier.",
   ex:"Un intervenant parle bien et est invité par l'école → on suppose qu'il est expert, sans avoir vérifié.",
   parade:"Pose-toi la question : « D'où je tiens ce que je crois ? » Et ralentis sur les sujets qui comptent."},
  {id:"surv",
   def:"On ne regarde que ceux qui ont <b>« survécu »/réussi</b>, en oubliant tous les cas invisibles qui ont échoué.",
   ex:"On veut blinder les avions là où les revenants sont touchés… alors qu'il faut blinder là où les abattus l'étaient.",
   parade:"Demande : « Qui manque à l'image ? Qui n'a pas pu revenir témoigner ? »"},
  {id:"cadr",
   def:"La <b>même information</b> change de sens selon la façon dont on la présente.",
   ex:"« 64 % maintiennent leur budget » vs « 1 sur 3 doit le réduire » : même chiffre, ressenti opposé.",
   parade:"Reformule l'info dans l'autre sens (verre à moitié plein / à moitié vide) pour voir l'angle choisi."},
  {id:"ancr",
   def:"Le <b>premier chiffre ou la première idée</b> rencontrés servent de point de repère et influencent tous nos jugements suivants.",
   ex:"Un prix barré très élevé fait paraître la « promo » avantageuse, même si elle reste chère.",
   parade:"Ignore le repère qu'on t'impose : cherche une référence neutre et indépendante."},
  {id:"auto",
   def:"On croit ou on obéit parce que ça vient d'une <b>figure d'autorité</b> (titre, blouse, uniforme), sans vérifier.",
   ex:"« Recommandé par les dentistes » nous convainc d'acheter, sans aucune preuve.",
   parade:"Une autorité peut se tromper ou parler hors de son domaine. Demande la preuve, pas le titre."},
  {id:"disp",
   def:"On juge qu'un événement est <b>fréquent</b> simplement parce qu'il nous vient facilement en tête (vu aux infos, marquant).",
   ex:"Après un reportage sur un crash, on a peur de l'avion — pourtant la voiture tue bien plus.",
   parade:"Cherche les vrais chiffres, pas les exemples les plus marquants de ta mémoire."},
  {id:"caus",
   def:"Deux choses qui varient <b>ensemble</b> ne s'expliquent pas forcément l'une l'autre.",
   ex:"Les ventes de glaces et les noyades augmentent ensemble… à cause de l'été, pas l'une de l'autre.",
   parade:"Demande : « Y a-t-il une 3ᵉ cause commune ? Ou est-ce un simple hasard ? »"},
  {id:"nega",
   def:"Le <b>négatif</b> (danger, drame, critique) capte plus l'attention et marque plus que le positif.",
   ex:"Les infos enchaînent les catastrophes → on finit par croire que « tout va de pire en pire ».",
   parade:"Pour chaque mauvaise nouvelle, cherche le contexte et les données de fond avant de conclure."},
  {id:"retro",
   def:"Une fois le résultat connu, on est persuadé qu'on <b>« l'avait toujours su »</b> : c'était évident… après coup.",
   ex:"Après un krach : « C'était sûr que ça allait s'effondrer ! » — alors que personne ne l'avait prédit.",
   parade:"Note tes prédictions AVANT : tu verras que l'avenir était bien moins évident qu'il n'y paraît."},
  {id:"barn",
   def:"On prend pour soi un <b>portrait assez vague</b> pour s'appliquer à presque tout le monde.",
   ex:"« Vous êtes sociable mais parfois réservé » : l'horoscope ou le test qui « tombe juste »… pour chacun.",
   parade:"Demande : « Cette description pourrait-elle coller à n'importe qui ? »"},
];

function renderFiches(){
  const g=$("fiches-grid");if(!g||g.childElementCount)return;
  FICHES.forEach(f=>{
    const title=f.concept?(f.icon+" "+f.title):BIAS[f.id].l;
    const d=document.createElement("div");
    d.className="fiche"+(f.concept?" concept":"");
    d.innerHTML=`<h3>${title}</h3>`+
      `<p class="f-def">${f.def}</p>`+
      `<p class="f-ex"><span class="f-lab">Exemple</span>${f.ex}</p>`+
      `<div class="f-parade"><span class="f-lab">Le réflexe</span>${f.parade}</div>`;
    g.appendChild(d);
  });
}
function showFiches(){
  renderFiches();
  $("intro").style.display="none";
  $("fiches").style.display="block";
  window.scrollTo({top:0,behavior:"smooth"});
}
function hideFiches(){
  $("fiches").style.display="none";
  $("intro").style.display="block";
  window.scrollTo({top:0,behavior:"smooth"});
}
