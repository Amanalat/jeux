/* =====================================================================
   avatar-render.js — moteur de rendu de l'avatar (source unique)
   Utilisé par le créateur (exploration/index.html) ET par la carte du
   village (exploration/carte.html).

     window.buildAvatarInner(state)  ->  chaîne SVG (à mettre dans un
     <svg viewBox="0 0 240 380"> … </svg>)

   state = { genre, peau, cheveuxCouleur, cheveuxStyle, habit, habitForme,
             taille, corpulence, lunettes, barbe }
   ===================================================================== */
(function () {
  'use strict';

  function h2r(h){ h=h.replace('#',''); if(h.length===3) h=h.split('').map(c=>c+c).join('');
    return [parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)]; }
  function r2h(r,g,b){ return '#'+[r,g,b].map(x=>{ x=Math.max(0,Math.min(255,Math.round(x)));
    return x.toString(16).padStart(2,'0'); }).join(''); }
  function shade(hex,a){ const [r,g,b]=h2r(hex);
    if(a<0){ const f=1+a; return r2h(r*f,g*f,b*f); }
    return r2h(r+(255-r)*a,g+(255-g)*a,b+(255-b)*a); }

  function silhouette(g){
    if(g==='homme')  return {sh:58, hh:42};
    if(g==='femme')  return {sh:44, hh:54};
    return {sh:51, hh:48};
  }

  function buildAvatarInner(input){
    input = input || {};
    const state = {
      genre: input.genre || 'indifferent',
      peau: input.peau || '#f6cfa2',
      cheveuxCouleur: input.cheveuxCouleur || '#6b4423',
      cheveuxStyle: input.cheveuxStyle || 'court',
      habit: input.habit || '#3498db',
      habitForme: input.habitForme || 'tshirt',
      taille: (input.taille != null ? input.taille : 1),
      corpulence: (input.corpulence != null ? input.corpulence : 1),
      lunettes: !!input.lunettes,
      barbe: !!input.barbe
    };

    const {sh,hh}=silhouette(state.genre);
    const skin=state.peau, hair=state.cheveuxCouleur, habit=state.habit;
    const skinD=shade(skin,-0.16), skinLine=shade(skin,-0.42);
    const hairD=shade(hair,-0.30), hairL=shade(hair,0.40), hairLine=shade(hair,-0.55);
    const habitLine=shade(habit,-0.40);
    const pant='#3d4c66', pantLine='#28324a', shoe='#252f3e';

    const cx=120, headCy=106, headRx=37, headRy=43, headTop=headCy-headRy, headBot=headCy+headRy;
    const shoulderY=168, hipY=262, footY=352, groundY=360;

    /* Dégradés */
    const defs = `<defs>`+
      `<radialGradient id="gSkin" cx="42%" cy="34%" r="78%">`+
        `<stop offset="0%" stop-color="${shade(skin,0.24)}"/>`+
        `<stop offset="62%" stop-color="${skin}"/>`+
        `<stop offset="100%" stop-color="${skinD}"/></radialGradient>`+
      `<linearGradient id="gHair" x1="0" y1="0" x2="0.25" y2="1">`+
        `<stop offset="0%" stop-color="${hairL}"/>`+
        `<stop offset="48%" stop-color="${hair}"/>`+
        `<stop offset="100%" stop-color="${hairD}"/></linearGradient>`+
      `<linearGradient id="gCloth" x1="0.15" y1="0" x2="0.5" y2="1">`+
        `<stop offset="0%" stop-color="${shade(habit,0.20)}"/>`+
        `<stop offset="55%" stop-color="${habit}"/>`+
        `<stop offset="100%" stop-color="${shade(habit,-0.22)}"/></linearGradient>`+
      `<linearGradient id="gPant" x1="0" y1="0" x2="0" y2="1">`+
        `<stop offset="0%" stop-color="${pant}"/>`+
        `<stop offset="100%" stop-color="${shade(pant,-0.22)}"/></linearGradient>`+
      `<linearGradient id="gSuit" x1="0" y1="0" x2="0.3" y2="1">`+
        `<stop offset="0%" stop-color="#f7fafc"/><stop offset="60%" stop-color="#e2e8f0"/>`+
        `<stop offset="100%" stop-color="#c2ccd8"/></linearGradient>`+
      `<linearGradient id="gFur" x1="0" y1="0" x2="0.2" y2="1">`+
        `<stop offset="0%" stop-color="#a8865c"/><stop offset="55%" stop-color="#8a6a45"/>`+
        `<stop offset="100%" stop-color="#6b5236"/></linearGradient>`+
    `</defs>`;

    const ground = `<ellipse cx="${cx}" cy="${groundY}" rx="62" ry="8.5" fill="#000" opacity="0.22"/>`;

    /* ---------- CORPS (mis à l'échelle par la corpulence) ---------- */
    const form=state.habitForme||'tshirt';
    const habitL=shade(habit,0.18), midY=(shoulderY+hipY)/2;
    const legW=30, gap=8, lX=cx-gap/2-legW, rX=cx+gap/2, legTop=hipY-18, legH=footY-legTop-4;
    const armW=17, sleeveW=21, aTop=shoulderY+4, aBot=hipY+8, lc=cx-sh+3, rc=cx+sh-3;
    const longEnd=aBot-2, shortEnd=aTop+30;

    // briques réutilisables
    function legsFn(fill, line, shoeF, shoeL){
      return `<g stroke="${line}" stroke-width="2.5" stroke-linejoin="round">`+
        `<rect x="${lX}" y="${legTop}" width="${legW}" height="${legH}" rx="11" fill="${fill}"/>`+
        `<rect x="${rX}" y="${legTop}" width="${legW}" height="${legH}" rx="11" fill="${fill}"/></g>`+
        `<g fill="${shoeF}" stroke="${shoeL}" stroke-width="2" stroke-linejoin="round">`+
        `<rect x="${lX-4}" y="${footY-9}" width="${legW+11}" height="15" rx="7"/>`+
        `<rect x="${rX-7}" y="${footY-9}" width="${legW+11}" height="15" rx="7"/></g>`;
    }
    function armsFn(fill, line, handFill, handLine){
      return `<g fill="${fill}" stroke="${line}" stroke-width="2" stroke-linejoin="round">`+
        `<rect x="${lc-armW/2}" y="${aTop}" width="${armW}" height="${aBot-aTop}" rx="8.5"/>`+
        `<rect x="${rc-armW/2}" y="${aTop}" width="${armW}" height="${aBot-aTop}" rx="8.5"/></g>`+
        `<g fill="${handFill}" stroke="${handLine}" stroke-width="2">`+
        `<circle cx="${lc}" cy="${aBot+2}" r="9.5"/><circle cx="${rc}" cy="${aBot+2}" r="9.5"/></g>`;
    }
    function sleeveFn(endY, fill, line){
      return `<g fill="${fill}" stroke="${line}" stroke-width="2.5" stroke-linejoin="round">`+
        `<rect x="${lc-sleeveW/2}" y="${aTop-3}" width="${sleeveW}" height="${endY-(aTop-3)}" rx="9"/>`+
        `<rect x="${rc-sleeveW/2}" y="${aTop-3}" width="${sleeveW}" height="${endY-(aTop-3)}" rx="9"/></g>`;
    }
    function torsoFn(hipW, hemY, hemCurve, fill, line){
      return `<path d="M ${cx-sh} ${shoulderY} `+
        `C ${cx-sh-3} ${midY} ${cx-hipW-2} ${hemY-10} ${cx-hipW} ${hemY} `+
        `Q ${cx} ${hemY+hemCurve} ${cx+hipW} ${hemY} `+
        `C ${cx+sh+3} ${midY} ${cx+sh+3} ${midY} ${cx+sh} ${shoulderY} `+
        `Q ${cx} ${shoulderY+18} ${cx-sh} ${shoulderY} Z" `+
        `fill="${fill}" stroke="${line}" stroke-width="2.5" stroke-linejoin="round"/>`;
    }
    const roundCollar = `<path d="M ${cx-14} ${shoulderY+3} Q ${cx} ${shoulderY+19} ${cx+14} ${shoulderY+3}" `+
      `fill="none" stroke="${habitLine}" stroke-width="2.5" stroke-linecap="round"/>`;

    let bodyInner='', helmet='', hideHair=false;

    if(form==='cosmonaute'){
      const suitG='url(#gSuit)', suitL='#9aa7b5', boot='#c2ccd8', gl='#f4f7fb';
      const panel=`<rect x="${cx-16}" y="${midY-6}" width="32" height="26" rx="5" fill="${shade(habit,-0.04)}" stroke="${suitL}" stroke-width="2"/>`+
        `<circle cx="${cx-8}" cy="${midY+2}" r="3" fill="#ff5d5d"/><circle cx="${cx}" cy="${midY+2}" r="3" fill="#5dff8f"/>`+
        `<circle cx="${cx+8}" cy="${midY+2}" r="3" fill="#5db8ff"/>`+
        `<rect x="${cx-11}" y="${midY+10}" width="22" height="5" rx="2.5" fill="${habit}"/>`;
      const stripes=`<path d="M ${cx-sh} ${shoulderY+2} q 6 10 0 20" stroke="${habit}" stroke-width="4" fill="none"/>`+
        `<path d="M ${cx+sh} ${shoulderY+2} q -6 10 0 20" stroke="${habit}" stroke-width="4" fill="none"/>`;
      bodyInner = legsFn(suitG,suitL,boot,suitL) + torsoFn(hh+3,hipY+4,20,suitG,suitL) +
        stripes + panel + sleeveFn(aBot+2,suitG,suitL) + armsFn(suitG,suitL,gl,suitL);
      helmet =
        `<circle cx="${cx}" cy="${headCy}" r="${headRx+11}" fill="none" stroke="#f2f5f9" stroke-width="9"/>`+
        `<circle cx="${cx}" cy="${headCy}" r="${headRx+11}" fill="none" stroke="${suitL}" stroke-width="2"/>`+
        `<ellipse cx="${cx-13}" cy="${headCy-15}" rx="8" ry="15" fill="#fff" opacity="0.22"/>`;
      hideHair = true;
    }
    else if(form==='cavernes'){
      const furG='url(#gFur)', furL=shade('#8a6a45',-0.42);
      const tunic=`<path d="M ${cx-sh} ${shoulderY} `+
        `Q ${cx} ${shoulderY+17} ${cx+sh} ${shoulderY} `+
        `C ${cx+sh+3} ${midY} ${cx+hh+2} ${hipY-8} ${cx+hh} ${hipY} `+
        `L ${cx+hh-10} ${hipY+12} L ${cx+hh-20} ${hipY+2} L ${cx} ${hipY+14} `+
        `L ${cx-hh+20} ${hipY+2} L ${cx-hh+10} ${hipY+12} L ${cx-hh} ${hipY} `+
        `C ${cx-hh-2} ${hipY-8} ${cx-sh-3} ${midY} ${cx-sh} ${shoulderY} Z" `+
        `fill="${furG}" stroke="${furL}" stroke-width="2.5" stroke-linejoin="round"/>`;
      const strap=`<path d="M ${cx-sh+7} ${shoulderY+2} L ${cx+10} ${midY-4}" `+
        `stroke="${furL}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.5"/>`;
      const spots=`<g fill="${furL}" opacity="0.45"><circle cx="${cx-14}" cy="${hipY-18}" r="2.6"/>`+
        `<circle cx="${cx+13}" cy="${hipY-6}" r="2.6"/><circle cx="${cx-2}" cy="${shoulderY+28}" r="2.6"/>`+
        `<circle cx="${cx+18}" cy="${midY}" r="2.6"/></g>`;
      bodyInner = legsFn('url(#gSkin)',skinLine,skin,skinLine) + tunic + strap + spots +
        armsFn('url(#gSkin)',skinLine,'url(#gSkin)',skinLine);
    }
    else {
      let hipW=hh, hemY=hipY, hemCurve=18, sleeveEnd=longEnd, details='', drawSleeve=true;
      if(form==='tshirt'){ sleeveEnd=shortEnd; details=roundCollar; }
      else if(form==='pull'){ details=roundCollar; }
      else if(form==='chemise'){
        details=`<path d="M ${cx-11} ${shoulderY+1} L ${cx-1} ${shoulderY+3} L ${cx-8} ${shoulderY+15} Z" fill="${habitL}" stroke="${habitLine}" stroke-width="1.5" stroke-linejoin="round"/>`+
          `<path d="M ${cx+11} ${shoulderY+1} L ${cx+1} ${shoulderY+3} L ${cx+8} ${shoulderY+15} Z" fill="${habitL}" stroke="${habitLine}" stroke-width="1.5" stroke-linejoin="round"/>`+
          `<line x1="${cx}" y1="${shoulderY+8}" x2="${cx}" y2="${hipY-2}" stroke="${habitLine}" stroke-width="1.5" opacity="0.7"/>`+
          [0,1,2,3].map(i=>`<circle cx="${cx}" cy="${shoulderY+28+i*20}" r="1.8" fill="${habitLine}"/>`).join('');
      }
      else if(form==='robe'){ hipW=hh+24; hemY=hipY+44; hemCurve=26; sleeveEnd=shortEnd;
        details=roundCollar+`<path d="M ${cx-sh+4} ${midY+6} Q ${cx} ${midY+12} ${cx+sh-4} ${midY+6}" fill="none" stroke="${habitLine}" stroke-width="3" opacity="0.5"/>`;
      }
      else if(form==='debardeur'){ drawSleeve=false;
        details=`<path d="M ${cx-15} ${shoulderY+1} Q ${cx} ${shoulderY+24} ${cx+15} ${shoulderY+1} L ${cx+9} ${shoulderY-1} Q ${cx} ${shoulderY+17} ${cx-9} ${shoulderY-1} Z" fill="url(#gSkin)" stroke="${skinLine}" stroke-width="1.5" stroke-linejoin="round"/>`;
      }
      bodyInner = legsFn('url(#gPant)',pantLine,shoe,shade(shoe,-0.4)) +
        torsoFn(hipW,hemY,hemCurve,'url(#gCloth)',habitLine) + details +
        armsFn('url(#gSkin)',skinLine,'url(#gSkin)',skinLine) +
        (drawSleeve ? sleeveFn(sleeveEnd,'url(#gCloth)',habitLine) : '');
    }

    /* ---------- TÊTE / CHEVEUX / VISAGE ---------- */
    const neck = `<rect x="${cx-12}" y="${headBot-14}" width="24" height="42" rx="10" `+
      `fill="url(#gSkin)" stroke="${skinLine}" stroke-width="2"/>`;
    const head = `<ellipse cx="${cx}" cy="${headCy}" rx="${headRx}" ry="${headRy}" `+
      `fill="url(#gSkin)" stroke="${skinLine}" stroke-width="2.5"/>`;
    const ears = `<g fill="url(#gSkin)" stroke="${skinLine}" stroke-width="2">`+
      `<ellipse cx="${cx-headRx+2}" cy="${headCy+6}" rx="6.5" ry="10"/>`+
      `<ellipse cx="${cx+headRx-2}" cy="${headCy+6}" rx="6.5" ry="10"/></g>`;
    const cheeks = `<g fill="#ff7d7d" opacity="0.15">`+
      `<ellipse cx="${cx-19}" cy="${headCy+15}" rx="8" ry="5.5"/>`+
      `<ellipse cx="${cx+19}" cy="${headCy+15}" rx="8" ry="5.5"/></g>`;

    /* Cheveux */
    let hairBehind='', hairTop='';
    const st=state.cheveuxStyle;
    if(!hideHair && st!=='chauve'){
      const HR=headRx+2, VR=headRy+2, kx=+(HR*0.552).toFixed(1), ky=+(VR*0.552).toFixed(1);
      const calotte =
        `<path d="M ${cx-HR} ${headCy} `+
        `C ${cx-HR} ${headCy-ky} ${cx-kx} ${headCy-VR} ${cx} ${headCy-VR} `+
        `C ${cx+kx} ${headCy-VR} ${cx+HR} ${headCy-ky} ${cx+HR} ${headCy} `+
        `C ${cx+HR-8} ${headCy-15} ${cx+13} ${headCy-16} ${cx} ${headCy-16} `+
        `C ${cx-13} ${headCy-16} ${cx-HR+8} ${headCy-15} ${cx-HR} ${headCy} Z" `+
        `fill="url(#gHair)" stroke="${hairLine}" stroke-width="2" stroke-linejoin="round"/>`;

      if(st==='court'){ hairTop=calotte; }
      else if(st==='carre'){
        const yB=headBot+4;
        hairBehind=`<g fill="url(#gHair)" stroke="${hairLine}" stroke-width="2" stroke-linejoin="round">`+
          `<path d="M ${cx-HR} ${headCy-4} L ${cx-HR} ${yB} Q ${cx-HR+7} ${yB+5} ${cx-HR+13} ${yB} L ${cx-HR+13} ${headCy-4} Z"/>`+
          `<path d="M ${cx+HR} ${headCy-4} L ${cx+HR} ${yB} Q ${cx+HR-7} ${yB+5} ${cx+HR-13} ${yB} L ${cx+HR-13} ${headCy-4} Z"/></g>`;
        hairTop=calotte;
      }
      else if(st==='long'){
        const yE=shoulderY+50;
        hairBehind=
          `<path d="M ${cx-headRx+2} ${headCy-4} C ${cx-headRx-10} ${headCy+30} ${cx-headRx-7} ${yE-16} ${cx-headRx+6} ${yE} C ${cx-headRx+16} ${yE-22} ${cx-headRx+12} ${headCy+20} ${cx-headRx+9} ${headCy-2} Z" fill="url(#gHair)" stroke="${hairLine}" stroke-width="2" stroke-linejoin="round"/>`+
          `<path d="M ${cx+headRx-2} ${headCy-4} C ${cx+headRx+10} ${headCy+30} ${cx+headRx+7} ${yE-16} ${cx+headRx-6} ${yE} C ${cx+headRx-16} ${yE-22} ${cx+headRx-12} ${headCy+20} ${cx+headRx-9} ${headCy-2} Z" fill="url(#gHair)" stroke="${hairLine}" stroke-width="2" stroke-linejoin="round"/>`;
        hairTop=calotte;
      }
      else if(st==='couettes'){
        hairBehind=`<g fill="url(#gHair)" stroke="${hairLine}" stroke-width="2" stroke-linejoin="round">`+
          `<ellipse cx="${cx-HR-6}" cy="${headCy+18}" rx="11" ry="18"/>`+
          `<ellipse cx="${cx+HR+6}" cy="${headCy+18}" rx="11" ry="18"/></g>`+
          `<g fill="url(#gHair)"><circle cx="${cx-HR+3}" cy="${headCy+4}" r="6"/><circle cx="${cx+HR-3}" cy="${headCy+4}" r="6"/></g>`;
        hairTop=calotte;
      }
      else if(st==='chignon'){
        hairTop=calotte+`<circle cx="${cx}" cy="${headCy-VR-7}" r="12" fill="url(#gHair)" stroke="${hairLine}" stroke-width="2"/>`;
      }
      else if(st==='crete'){
        hairTop=`<path d="M ${cx} ${headCy-VR-16} C ${cx+12} ${headCy-VR-4} ${cx+10} ${headCy-8} ${cx+9} ${headCy-2} `+
          `L ${cx-9} ${headCy-2} C ${cx-10} ${headCy-8} ${cx-12} ${headCy-VR-4} ${cx} ${headCy-VR-16} Z" `+
          `fill="url(#gHair)" stroke="${hairLine}" stroke-width="2" stroke-linejoin="round"/>`;
      }
      else if(st==='boucle'){
        let back=''; [[-30,-8],[-31,-26],[-16,-39],[4,-44],[23,-38],[33,-20],[33,2]]
          .forEach(p=> back += `<circle cx="${cx+p[0]}" cy="${headCy+p[1]}" r="15"/>`);
        hairBehind=`<g fill="url(#gHair)">${back}</g>`;
        let front=''; [[-21,-6],[-7,-12],[7,-11],[20,-4]]
          .forEach(p=> front += `<circle cx="${cx+p[0]}" cy="${headCy+p[1]}" r="10"/>`);
        hairTop=`<g fill="url(#gHair)">${front}</g>`;
      }
    }

    /* Visage */
    const eyeY=headCy+3, dx=13;
    const eyes =
      `<ellipse cx="${cx-dx}" cy="${eyeY}" rx="5.5" ry="6.5" fill="#fff" stroke="${shade(skin,-0.28)}" stroke-width="1"/>`+
      `<ellipse cx="${cx+dx}" cy="${eyeY}" rx="5.5" ry="6.5" fill="#fff" stroke="${shade(skin,-0.28)}" stroke-width="1"/>`+
      `<circle cx="${cx-dx}" cy="${eyeY+1}" r="3" fill="#3a2a20"/>`+
      `<circle cx="${cx+dx}" cy="${eyeY+1}" r="3" fill="#3a2a20"/>`+
      `<circle cx="${cx-dx+1.2}" cy="${eyeY-0.6}" r="1.1" fill="#fff"/>`+
      `<circle cx="${cx+dx+1.2}" cy="${eyeY-0.6}" r="1.1" fill="#fff"/>`;
    const nose = `<path d="M ${cx-1} ${eyeY+6} Q ${cx-3} ${eyeY+12} ${cx+2} ${eyeY+12}" `+
      `fill="none" stroke="${skinD}" stroke-width="2" stroke-linecap="round"/>`;
    const mouth = `<path d="M ${cx-9} ${eyeY+18} Q ${cx} ${eyeY+26} ${cx+9} ${eyeY+18}" `+
      `fill="none" stroke="#b34b43" stroke-width="3" stroke-linecap="round"/>`;

    const beard = (state.barbe && !hideHair)
      ? `<path d="M ${cx-headRx+3} ${headCy+1} `+
        `Q ${cx-headRx+1} ${headBot+3} ${cx} ${headBot+6} `+
        `Q ${cx+headRx-1} ${headBot+3} ${cx+headRx-3} ${headCy+1} `+
        `Q ${cx} ${headCy+18} ${cx-headRx+3} ${headCy+1} Z" `+
        `fill="url(#gHair)" stroke="${hairLine}" stroke-width="2" stroke-linejoin="round" opacity="0.96"/>` : '';

    const glasses = state.lunettes
      ? `<g fill="#0b1220" fill-opacity="0.07" stroke="#161d29" stroke-width="2.5" stroke-linejoin="round">`+
        `<rect x="${cx-dx-8}" y="${eyeY-7}" width="16" height="14" rx="6"/>`+
        `<rect x="${cx+dx-8}" y="${eyeY-7}" width="16" height="14" rx="6"/></g>`+
        `<path d="M ${cx-5} ${eyeY-2} h 10" stroke="#161d29" stroke-width="2.5" fill="none"/>` : '';

    const bodyT  = `translate(${cx} ${hipY}) scale(${state.corpulence} 1) translate(${-cx} ${-hipY})`;
    const wholeT = `translate(${cx} ${footY}) scale(1 ${state.taille}) translate(${-cx} ${-footY})`;

    return defs + ground +
      `<g transform="${wholeT}">`+
        neck +
        `<g transform="${bodyT}">${bodyInner}</g>`+
        hairBehind + head + ears + hairTop + cheeks + beard +
        eyes + nose + mouth + glasses + helmet +
      `</g>`;
  }

  window.buildAvatarInner = buildAvatarInner;
})();
