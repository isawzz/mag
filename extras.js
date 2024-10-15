function filterColorsByFunc(colors, func) {
	let filteredColors = [];
	for (let color of colors) {
		if (func(color)) {
			filteredColors.push(color);
		}
	}
	return filteredColors;
}
function mapColorsByFunc(colors, func) {
	let mappedColors = [];
	for (let color of colors) {
		mappedColors.push(func(color));
	}
	return mappedColors;
}
function mBodyResetter(bg) {
  let d0 = document.body;
  mClass(d0, 'reset100'); //console.log(d0.offsetWidth, d0.offsetHeight);
  mStyle(d0, { bg })
  let d1 = mDom(d0); //, { w: '100%', h: '100%' });
  return d1;
}
function mGridRows(d0, desc, testing=false) {
	return mGridDesc(d0, desc, 'gridTemplateRows', testing);
}
function mGridCols(d0, desc, testing=false) {
	return mGridDesc(d0, desc, 'gridTemplateColumns', testing);
}
function mGridDesc(d0, desc, prop, testing=false) {
	let dg0 = mDom(d0, { display: 'grid', w: '100%', h: '100%' });
	dg0.style[prop] = desc;
	let func = testing ? mDomTest : mDom;
	let num = desc.split(' ').length;
	let divs=[];
	for(const i of range(num)) divs.push(func(dg0));
	return divs;
}
function mPaletteTrans() {
	let palette = paletteTransWhiteBlack(arguments.length); //console.log(palette);
	for (const did of arguments) {
		let d = toElem(did);
		mStyle(d, { bg: palette.pop(), fg: 'contrast', family: 'opensans', wbox: true, padding: 10 });
	}
}
function mSidebar(dParent = 'dLeft', wmin = 170, styles = {}, opts = {}) {
  dParent = toElem(dParent);
  mStyle(dParent, { wmin: wmin, patop: 25 });
  let d = mDom(dParent, styles, opts);
  return { wmin, d }
}
function mStyle(elem, styles = {}, unit = 'px') {
  elem = toElem(elem);
  let style = styles = jsCopy(styles);
  if (isdef(styles.w100)) style.w = '100%';
  if (isdef(styles.h100)) style.h = '100%';
  let bg, fg;
  if (isdef(styles.bg) || isdef(styles.fg)) {
    [bg, fg] = colorsFromBFA(styles.bg, styles.fg, styles.alpha);
  }
  if (isdef(styles.vpadding) || isdef(styles.hpadding)) {
    styles.padding = valf(styles.vpadding, 0) + unit + ' ' + valf(styles.hpadding, 0) + unit;
  }
  if (isdef(styles.vmargin) || isdef(styles.hmargin)) {
    styles.margin = valf(styles.vmargin, 0) + unit + ' ' + valf(styles.hmargin, 0) + unit;
  }
  if (isdef(styles.upperRounding) || isdef(styles.lowerRounding)) {
    let rtop = '' + valf(styles.upperRounding, 0) + unit;
    let rbot = '' + valf(styles.lowerRounding, 0) + unit;
    styles['border-radius'] = rtop + ' ' + rtop + ' ' + rbot + ' ' + rbot;
  }
  if (isdef(styles.box)) styles['box-sizing'] = 'border-box';
  if (isdef(styles.round)) { elem.style.setProperty('border-radius', '50%'); }
  for (const k in styles) {
    if (['round', 'box'].includes(k)) continue;
    let val = styles[k];
    let key = k;
    if (isdef(STYLE_PARAMS[k])) key = STYLE_PARAMS[k];
    else if (k == 'font' && !isString(val)) {
      let fz = f.size; if (isNumber(fz)) fz = '' + fz + 'px';
      let ff = f.family;
      let fv = f.variant;
      let fw = isdef(f.bold) ? 'bold' : isdef(f.light) ? 'light' : f.weight;
      let fs = isdef(f.italic) ? 'italic' : f.style;
      if (nundef(fz) || nundef(ff)) return null;
      let s = fz + ' ' + ff;
      if (isdef(fw)) s = fw + ' ' + s;
      if (isdef(fv)) s = fv + ' ' + s;
      if (isdef(fs)) s = fs + ' ' + s;
      elem.style.setProperty(k, s);
      continue;
    } else if (k.includes('class')) {
      mClass(elem, styles[k]);
    } else if (k == 'border') {
      if (isNumber(val)) val = `solid ${val}px ${isdef(styles.fg) ? styles.fg : '#ffffff80'}`;
      if (val.indexOf(' ') < 0) val = 'solid 1px ' + val;
    } else if (k == 'ajcenter') {
      elem.style.setProperty('justify-content', 'center');
      elem.style.setProperty('align-items', 'center');
    } else if (k == 'layout') {
      if (val[0] == 'f') {
        val = val.slice(1);
        elem.style.setProperty('display', 'flex');
        elem.style.setProperty('flex-wrap', 'wrap');
        let hor, vert;
        if (val.length == 1) hor = vert = 'center';
        else {
          let di = { c: 'center', s: 'start', e: 'end' };
          hor = di[val[1]];
          vert = di[val[2]];
        }
        let justStyle = val[0] == 'v' ? vert : hor;
        let alignStyle = val[0] == 'v' ? hor : vert;
        elem.style.setProperty('justify-content', justStyle);
        elem.style.setProperty('align-items', alignStyle);
        switch (val[0]) {
          case 'v': elem.style.setProperty('flex-direction', 'column'); break;
          case 'h': elem.style.setProperty('flex-direction', 'row'); break;
        }
      } else if (val[0] == 'g') {
        val = val.slice(1);
        elem.style.setProperty('display', 'grid');
        let n = allNumbers(val);
        let cols = n[0];
        let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
        elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
        elem.style.setProperty('place-content', 'center');
      }
    } else if (k == 'layflex') {
      elem.style.setProperty('display', 'flex');
      elem.style.setProperty('flex', '0 1 auto');
      elem.style.setProperty('flex-wrap', 'wrap');
      if (val == 'v') { elem.style.setProperty('writing-mode', 'vertical-lr'); }
    } else if (k == 'laygrid') {
      elem.style.setProperty('display', 'grid');
      let n = allNumbers(val);
      let cols = n[0];
      let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
      elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
      elem.style.setProperty('place-content', 'center');
    }
    if (key == 'font-weight') { elem.style.setProperty(key, val); continue; }
    else if (key == 'background-color') elem.style.background = bg;
    else if (key == 'color') elem.style.color = fg;
    else if (key == 'opacity') elem.style.opacity = val;
    else if (key == 'wrap') { if (val == 'hard') elem.setAttribute('wrap', 'hard'); else elem.style.flexWrap = 'wrap'; }
    else if (k.startsWith('dir')) {
      isCol = val[0] == 'c';
      elem.style.setProperty('flex-direction', 'column');
    } else if (key == 'flex') {
      if (isNumber(val)) val = '' + val + ' 1 0%';
      elem.style.setProperty(key, makeUnitString(val, unit));
    } else {
      elem.style.setProperty(key, makeUnitString(val, unit));
    }
  }
}
function oceanLayout(d, bg, level = 0) {
	let d0 = toElem(d)
	mStyle(d0, { bg, padding: 0, margin: 0, wbox:true });
	mClear(d0);
	dTop = mDomid(d0, 'dTop' + level);
	dMiddle = mDom(d0, { classes: 'colsAutoFrAuto' }, { id: 'dMiddle' + level });
	dSidebar = mDomid(dMiddle, 'dSidebar' + level);
	dTable = mDomid(dMiddle, 'dTable' + level); 
	let divs = [dTop, dSidebar, dTable];
	mPaletteTrans(...divs);
	divs.map(x => mStyle(x, {wbox:true}, { html: x.id }))

	//let dTable = mBy('dTable0'); 	
	mStyle(dTable, { overy: 'scroll', hmax: dTable.offsetHeight, wbox: true });

}
function paletteTransWhiteBlack(n = 9) {
  let c = 'white';
  let pal = [c];
  let [iw, ib] = [Math.floor(n / 2) - 1, Math.floor((n - 1) / 2) - 1];
  let [incw, incb] = [1 / (iw + 1), 1 / (ib + 1)];
  for (let i = 1; i < iw; i++) {
    let alpha = i * incw;
    pal.push(colorTrans(c, alpha));
  }
  pal.push('transparent');
  c = 'black';
  for (let i = 1; i < ib; i++) {
    let alpha = i * incb;
    pal.push(colorTrans(c, alpha));
  }
  pal.push(c);
  return pal;
}
function rColorTrans(opaPer = 100, lumPer = 70, satPer = 100, hue) {
	if (isList(hue) && hue.length > 2) {
		//interpret as choose one of these hues
		hue = rChoose(hue);
	} else if (isList(hue)) {
		//interpret as range min,max
		hue = Math.random() * (hue[1] - hue[0]) + hue[0];
	} else if (isdef(hue)) {
		//interpret as modulo
		hue = divInt(rHue(), hue) * hue;
	} else hue = Math.round(Math.random() * 360);
	//console.log('hue', hue)
	return colorFrom({h:hue, s:satPer, l:lumPer}, opaPer / 100);
}
function sortColorsByFunc(colors, func) {
	return colors.sort(func);
}
