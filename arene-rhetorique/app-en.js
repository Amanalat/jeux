// ─── Possible answers ───
const EPL = [
  {id:"ethos",  l:"🏛️ Ethos", s:"he appeals to ethics, values, or his legitimacy"},
  {id:"pathos", l:"💔 Pathos", s:"he plays on emotion"},
  {id:"logos",  l:"🧮 Logos", s:"he argues through logic and facts"},
];
const FALLACIES = [
  {id:"paille",   l:"🎃 Straw man", s:"caricaturing your point in order to attack it"},
  {id:"adhom",    l:"👤 Personal attack", s:"targeting the person, not the argument"},
  {id:"popu",     l:"📣 Appeal to popularity", s:"'everyone thinks so!'"},
  {id:"dilemme",  l:"⚖️ False dilemma", s:"claiming there are only two options"},
  {id:"pente",    l:"🎢 Slippery slope", s:"exaggerating a chain of consequences"},
  {id:"genehat",  l:"🎲 Hasty generalisation", s:"drawing a conclusion from a single case"},
  {id:"nature",   l:"🌿 Appeal to nature", s:"'natural' does not mean 'good'"},
  {id:"halo",     l:"⭐ Authority outside their field", s:"famous ≠ competent (halo effect)"},
  {id:"preuve",   l:"🔄 Reversed burden of proof", s:"the person making the claim must prove it"},
  {id:"posthoc",  l:"🔗 Imagined cause", s:"'after this, therefore because of this' (correlation ≠ causation)"},
  {id:"circulaire", l:"🔄 Circular reasoning", s:"the conclusion is used as its own proof"},
  {id:"hareng",     l:"🐟 Red herring",         s:"changing the subject to dodge the question"},
  {id:"cherry",     l:"🍒 Cherry-picking",       s:"only showing the data that fits"},
  {id:"whatabout",  l:"🪞 Whataboutism",         s:"pointing at the other's hypocrisy instead of answering"},
];

// ─── Opponents ───
// type "epl": identify ethos/pathos/logos. type "fall": name the fallacy (a = id, opts = 3 distractors)
const FOES = [
  {name:"Uncle Gerard", emoji:"🍗", desc:"family-dinner champion", hp:4,
   intro:"At dessert, Uncle Gerard puts down his fork: 'You, with all your studying, let's see if you know how to debate!' The battle begins.",
   lines:[
    {type:"epl", t:"'Listen, kid, I have 60 years of life behind me. I have worked hard all my life, and I have never lied to anyone. So you can take my word for it!'",
     a:"ethos", e:"Gerard gives <b>no argument</b> about the actual issue: he highlights his honesty and life experience to inspire trust. That is <b>contextual ethos</b> — like a politician who says they are 'close to the people'."},
    {type:"epl", t:"'You want to become vegetarian?! Think of your poor grandmother… she made you roast chicken with so much love. You want to break her heart, is that it?'",
     a:"pathos", e:"There is no logic here: Gerard leans fully on <b>emotion</b> — guilt, the grandmother, the love of roast chicken. That is pure <b>pathos</b> — very effective, and very common in advertising."},
    {type:"fall", t:"'My neighbour ate organic food all his life, and he got sick anyway. Organic food is useless, that proves it!'",
     a:"genehat", opts:["popu","nature","adhom"],
     e:"One neighbour does not make a scientific study! Drawing a conclusion from <b>a single case</b> is a <b>hasty generalisation</b>. To know whether organic food has an effect, you need to compare thousands of people."},
    {type:"fall", t:"'Anyway, medicines are chemicals. I treat myself with plants: it is natural, so it is obviously better for your health!'",
     a:"nature", opts:["dilemme","genehat","preuve"],
     e:"The <b>appeal to nature</b>: 'natural' does not mean 'good' — hemlock and death cap mushrooms are 100% natural — and 'chemical' does not mean 'bad'. Many medicines actually come from plants!"},
    {type:"fall", t:"'If we let young people play video games, soon they will never leave their rooms, then they will drop out of school, and in ten years this country will be ruined!'",
     a:"pente", opts:["paille","dilemme","posthoc"],
     e:"The <b>slippery slope</b>: linking increasingly catastrophic consequences as if they were inevitable, without proving any link in the chain."},
    {type:"fall", t:"'And you defend screens, do you? That is rich, with your glasses and your average maths grades!'",
     a:"adhom", opts:["paille","halo","popu"],
     e:"Gerard does not answer your arguments: he <b>attacks you</b>. That is a personal attack, or ad hominem. Targeting the person to discredit their argument is common… and fallacious."},
   ]},
  {name:"Maxx_Buzz", emoji:"🤳", desc:"influencer with 2.4M followers", hp:5,
   intro:"Maxx_Buzz grabs his selfie stick: 'Hey community! Today I'm debating a hater. Drop your likes!'",
   lines:[
    {type:"epl", t:"'Look at this video of an abandoned kitten in the rain… 😢 If you do not share my fundraiser after that, you have no heart.'",
     a:"pathos", e:"Emotion as an engagement lever: that is <b>pathos</b>. Social media loves it, because emotional information grabs our attention… whether it is true or false. Be careful before liking!"},
    {type:"fall", t:"'My new detox drink is backed by science: 2.4 million followers cannot be wrong!'",
     a:"popu", opts:["halo","preuve","genehat"],
     e:"The <b>appeal to popularity</b>: the number of fans proves nothing. Millions of people have believed false things before. Popularity measures visibility, not truth."},
    {type:"fall", t:"'This star footballer says my drink boosts his performance. He is a world champion, so he knows what he is talking about!'",
     a:"halo", opts:["popu","posthoc","adhom"],
     e:"The <b>halo effect</b>: we transfer someone's competence in one area — football — to a completely unrelated area — nutrition. Being a world champion does not make someone a drinks expert; that is exactly how advertising works."},
    {type:"fall", t:"'Since I started drinking my detox juice every morning, I have not had a single cold. Proof that it works!'",
     a:"posthoc", opts:["genehat","nature","preuve"],
     e:"'After this, therefore because of this': two events that follow each other are not necessarily linked. That is an <b>imagined cause</b> — maybe Maxx would not have caught a cold anyway. Only a real study could tell us."},
    {type:"fall", t:"'You say my product is useless? Prove to me that it DOES NOT work! Until you have proof, I am right.'",
     a:"preuve", opts:["dilemme","adhom","popu"],
     e:"A reversal of the <b>burden of proof</b>: it is up to <b>the person making the claim</b> to prove it, not the other way around. Otherwise I could claim anything — 'Joe Biden is a reptilian!' — and demand that you prove me wrong."},
    {type:"epl", t:"'The numbers speak for themselves: out of 1,000 testers, 87% said they felt better after one month. Here is the full study in the description.'",
     a:"logos", e:"This time, Maxx provides <b>data and a source</b>: that is <b>logos</b>, argumentation through logic and facts. Be careful: a logos argument can still be misleading — you need to check the study! But the <i>appeal</i> being used is reason."},
   ]},
  {name:"Senator Brutus", emoji:"🏛️", desc:"formidable political speaker", hp:6,
   intro:"Senator Brutus adjusts his tie under the spotlights: 'My dear fellow citizens, let us crush this young opponent… elegantly.'",
   lines:[
    {type:"epl", t:"'It is outrageous that in the homeland of human rights, the country of the Enlightenment, people are still sleeping in the streets. In the name of fraternity, vote for me!'",
     a:"ethos", e:"Brutus invokes <b>great universal values</b> — the Enlightenment, fraternity, human rights: that is <b>universal ethos</b>. The other form, contextual ethos, consists of presenting oneself as virtuous."},
    {type:"epl", t:"'Every country that lowered this tax saw unemployment fall within two years. We propose the same cut: here are the projections, sector by sector.'",
     a:"logos", e:"Data, comparisons, projections: Brutus uses <b>logos</b>. It is the type of argument that appears most solid… but always check the figures: logos can hide misused statistics."},
    {type:"fall", t:"'My opponent wants to regulate speed in cities. In other words, he wants to ban cars, take away your freedom to move around, and lock you inside your homes!'",
     a:"paille", opts:["pente","dilemme","adhom"],
     e:"The <b>straw man</b>: distorting the opponent's position — regulating ≠ banning — in order to attack the caricature rather than the real argument. The opposite of honest debate is the 'steel man': reformulating the other person's argument faithfully."},
    {type:"fall", t:"'Things are simple: either you vote for my surveillance law, or you accept living in total insecurity. You have to choose!'",
     a:"dilemme", opts:["pente","paille","popu"],
     e:"The <b>false dilemma</b>: presenting two options as the only possibilities, when there are many others — other laws, other methods, and so on. When someone tells you 'it is this or chaos', be suspicious."},
    {type:"fall", t:"'Why listen to this climate scientist? He was seen taking a plane to a conference! His hypocrisy disqualifies all his research.'",
     a:"adhom", opts:["halo","paille","preuve"],
     e:"Attacking the <b>person's behaviour</b> in order to reject their <b>scientific arguments</b>: ad hominem. Even if the hypocrisy is real — like Harrison Ford and his private jet — it does not make the data false."},
    {type:"fall", t:"'All the polls put me in the lead. The people are with me! How dare you claim I am wrong when millions of French people support me?'",
     a:"popu", opts:["preuve","genehat","dilemme"],
     e:"The <b>appeal to popularity</b>, political version: being in the majority does not make an argument true. Truth is not decided by vote — for centuries, most people thought the Sun revolved around the Earth."},
    {type:"epl", t:"'Remember that little girl I met in hospital, her drawings pinned to the wall… It is for her, for your children, that I am fighting tonight.'",
     a:"pathos", e:"The moving anecdote, the sick child, the trembling voice: top-level <b>pathos</b>. It is not good or bad in itself — Martin Luther King also used pathos — but you need to <b>spot it</b> so that emotion alone does not convince you."},
   ]},
  {name:"The Conspiracy Uncle", emoji:"🕵️", desc:"has done his own research", hp:6,
   intro:"Behind his wall of sticky notes and printed articles, he points a finger at you: 'Ah, you too believe what they tell you on TV… Let me open your eyes.'",
   lines:[
    {type:"fall", t:"'Look, I found TEN studies that support my view! The «official» scientists just refuse to look at this evidence.'",
     a:"cherry", opts:["popu","halo","genehat"],
     e:"<b>Cherry-picking</b>: he only shows the studies that suit him and stays silent about the vast majority of research that says the opposite. Real scientific consensus is judged on the whole body of evidence, not on ten hand-picked studies."},
    {type:"fall", t:"'How do I know it is true? It is written in black and white on my trusted website. And that website can be trusted… because it says so itself!'",
     a:"circulaire", opts:["preuve","popu","adhom"],
     e:"<b>Circular reasoning</b>: the conclusion ('this website is reliable') is used as its own proof, with no outside verification at all. It is like saying 'I tell the truth because I never lie'."},
    {type:"fall", t:"'The month this 5G antenna was installed near my house, my cat got sick. Coincidence? I do not think so.'",
     a:"posthoc", opts:["nature","genehat","cherry"],
     e:"Another <b>imagined cause</b>: two events that follow each other in time are not necessarily linked. The cat could have gotten sick for a thousand reasons — only a real study could establish a link with the antenna."},
    {type:"epl", t:"'Do not you feel that they are lying to you? That knot in your stomach, that feeling that something is wrong… They are hiding the truth, and deep down, you know it.'",
     a:"pathos", e:"No facts, no proof: just <b>fear</b> and a feeling of betrayal. That is <b>pathos</b> — very effective for convincing without having to demonstrate anything."},
    {type:"fall", t:"'Prove to me that it is NOT a conspiracy! Until you have proof of the contrary, you have to admit I am right.'",
     a:"preuve", opts:["dilemme","adhom","popu"],
     e:"Another <b>reversed burden of proof</b>: it is up to the person claiming there is a conspiracy to prove it, not up to you to prove otherwise. Otherwise anyone could claim anything and demand it be disproven."},
    {type:"fall", t:"'Vaccines are full of chemicals. I would rather boost my defences with 100% natural remedies — that is just more logical, right?'",
     a:"nature", opts:["dilemme","genehat","cherry"],
     e:"The <b>appeal to nature</b>: 'natural' does not mean 'harmless', and 'chemical' does not mean 'harmful'. Water, arsenic and snake venom are all 100% natural too."},
    {type:"epl", t:"'Unlike journalists paid by lobbies, I have done my own research for years. I have no hidden interest, just the truth to defend.'",
     a:"ethos", e:"He presents himself as the only honest one, the only one who has 'done his research': that is <b>contextual ethos</b>, a self-proclaimed legitimacy. Spending hours online does not replace expertise in a field, nor the scientific method."},
   ]},
  {name:"The Greenwashing CEO", emoji:"👔", desc:"master of corporate spin", hp:6,
   intro:"Under the press conference lights, they adjust their lapel mic: 'Here, the planet is our #1 priority. Let me explain why you are wrong to worry.'",
   lines:[
    {type:"fall", t:"'You are asking about our CO2 emissions? Let me tell you about our wonderful cardboard-cup recycling programme, launched this year in all our offices!'",
     a:"hareng", opts:["whatabout","popu","cherry"],
     e:"A <b>red herring</b>: they change the subject (CO2 → recycled cups) instead of answering the question asked. Recycling cups is nice, but it says nothing about the company's emissions."},
    {type:"fall", t:"'You criticise our carbon footprint? What about our competitors — have you seen theirs? They are far worse than us, and nobody holds them accountable!'",
     a:"whatabout", opts:["adhom","dilemme","hareng"],
     e:"<b>Whataboutism</b>: pointing at another's hypocrisy or supposed flaws instead of answering on the substance. Even if competitors pollute more, that does not make their own carbon footprint acceptable."},
    {type:"fall", t:"'10 million customers trust us every day. With that much support, how could we possibly be a polluting company?'",
     a:"popu", opts:["halo","preuve","genehat"],
     e:"The <b>appeal to popularity</b>: the number of customers says nothing about the company's real environmental impact. Having many customers can simply mean a lot of marketing and market share."},
    {type:"fall", t:"'This world-famous actress agreed to be our ambassador. If such a committed public figure trusts us, our products must really be environmentally friendly.'",
     a:"halo", opts:["popu","preuve","cherry"],
     e:"The <b>halo effect</b>: acting talent has nothing to do with environmental expertise. A celebrity can be paid to represent a brand without knowing anything about its real carbon footprint."},
    {type:"epl", t:"'Our figures are clear: -12% emissions per unit produced since 2019, +30% investment in renewable energy. Here is the full detail in our 40-page CSR report.'",
     a:"logos", e:"Numbers, dates, a detailed report: that is <b>logos</b>. Be careful, though: presenting precise statistics does not rule out <b>cherry-picking</b> behind the scenes — always check what the report leaves out."},
    {type:"epl", t:"'Here, commitment and responsibility are not just words: they are our founding values, written into our charter since day one.'",
     a:"ethos", e:"Grand values on display (commitment, responsibility) with no concrete evidence behind them: that is <b>ethos</b>. A charter proves nothing unless it comes with verifiable results."},
    {type:"fall", t:"'Look: at our Lyon factory, we cut emissions by 5% this year. Proof that our environmental strategy works!'",
     a:"cherry", opts:["posthoc","popu","halo"],
     e:"<b>Cherry-picking</b>: a single positive figure, from a single site, is highlighted — while staying silent about the rest of the group, where emissions may have risen."},
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
  $("hp-you-txt").textContent="Conviction: "+youHP+"/"+YOUMAX;
  $("hp-foe-txt").textContent="Conviction: "+foeHP+"/"+foe.hp;
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
  $("turn-progress").textContent="Reply "+(lineIdx+1)+" / "+foe.lines.length;
  const bubble=document.querySelector(".bubble");
  bubble.classList.remove("pop-replay");
  void bubble.offsetWidth;
  bubble.classList.add("pop-replay");
  const ansDiv=$("answers"); ansDiv.innerHTML="";
  let choices;
  if(line.type==="epl"){
    $("qprompt").textContent="Which rhetorical appeal is being used?";
    choices=shuffle(EPL.map(o=>({...o})));
  } else {
    $("qprompt").textContent="What is wrong with this argument?";
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
    $("rip-title").textContent="✔ Hit! You exposed the technique.";
  } else {
    btn.classList.remove("dim");btn.classList.add("bad");
    youHP--;
    $("f-you").classList.add("shake");
    setTimeout(()=>$("f-you").classList.remove("shake"),450);
    $("rip-title").textContent="✘ Ouch! It was: "+goodLabel;
  }
  updateHP();
  const rip=$("riposte");
  rip.className=ok?"ok":"ko"; rip.style.display="block";
  $("rip-expl").innerHTML=line.e;
  $("nextbtn").style.display="block";
  if(foeHP<=0) $("nextbtn").textContent="🏆 Opponent defeated! ➜";
  else if(youHP<=0) $("nextbtn").textContent="💀 You are out of arguments… ➜";
  else $("nextbtn").textContent="Next reply ➜";
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
  $("inter-title").textContent=FOES[foeIdx].name+" is out of arguments!";
  $("inter-msg").innerHTML="Well done! You recover a little conviction. 💪<br><br>Next opponent: <b>"+next.emoji+" "+next.name+"</b> — "+next.desc+".<br><i>"+next.intro+"</i>";
  youHP=Math.min(YOUMAX,youHP+3);
  $("inter-btn").textContent="⚔️ Face "+next.name;
  $("inter-btn").onclick=()=>startMatch(foeIdx+1);
}

function scoreLine(){
  const pct=totalCount?Math.round(correctCount/totalCount*100):0;
  return "Final score: "+correctCount+" correct answers out of "+totalCount+" ("+pct+"%)";
}

function victory(){
  $("end").style.display="block";
  $("end-emoji").textContent="👑";
  $("end-title").textContent="Master of the Arena!";
  $("retry-btn").style.display="none";
  $("end-msg").innerHTML="You defeated all five opponents! You can now spot <b>ethos</b>, <b>pathos</b>, <b>logos</b>… and the most common fallacies.<br><br>"+scoreLine()+"<br><br>The arena's final secret: the best debating technique is not an attack. It is the <b>steel man</b> — faithfully reformulating the other person's argument before responding to it, and looking for a <b>point of agreement</b>. Debate then becomes richer… and calmer. 🤝";
}

function lose(){
  $("battle").style.display="none";
  $("nextbtn").style.display="none";
  $("end").style.display="block";
  $("end-emoji").textContent="😵";
  $("end-title").textContent="Defeated… this time!";
  $("end-msg").innerHTML=FOES[foeIdx].name+" overwhelmed you with rhetoric. No worries: the art of debate is something you <b>practise</b> more than something you learn.<br><br>"+scoreLine()+"<br><br>Read the replies carefully: straw man, false dilemma, appeal to popularity… Once you know them, you see them everywhere!";
  const rb=$("retry-btn");
  rb.style.display="inline-block";
  rb.textContent="🔁 Retry "+FOES[foeIdx].name;
  rb.onclick=()=>{ $("end").style.display="none"; startMatch(foeIdx); };
}
