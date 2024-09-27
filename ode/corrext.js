
function clearDiv(dParent, styles = {}, opts = {}) {
  if (nundef(dParent)) dParent = document.body;
  addKeys({ className: 'h100', hline: 0 }, styles);
  addKeys({ html: '&nbsp;' }, opts);
  dParent.innerHTML = '';
  return mDom(dParent, styles, opts);
}
function mColFlex(dParent, chflex = [1, 5, 1], bgs) {
  let styles = { opacity: 1, display: 'flex', aitems: 'stretch', 'flex-flow': 'nowrap' };
  mStyle(dParent, styles);
  let res = [];
  for (let i = 0; i < chflex.length; i++) {
    let bg = isdef(bgs) ? bgs[i] : null;
    let d1 = mDiv(dParent, { flex: chflex[i], bg: bg });
    res.push(d1);
  }
  return res;
}
function mStyle(elem, styles = {}) {
	elem = toElem(elem);
  let bg, fg;
  if (isdef(styles.bg) || isdef(styles.fg)) {
    [bg, fg] = colorsFromBFA(styles.bg, styles.fg, styles.alpha);
    elem.style.backgroundColor = bg;
    elem.style.color = fg;
  }
	if (isdef(styles.w100)) elem.style.width = '100%';
	if (isdef(styles.h100)) elem.style.height = '100%';
	if (isdef(styles.box)) styles['box-sizing'] = 'border-box';
	if (isdef(styles.round)) { elem.style.setProperty('border-radius', '50%'); }
	let styleParams = STYLE_PARAMS;
	for (const k in styles) {
		if (['bg','fg','w100', 'h100', 'round', 'box'].includes(k)) continue;
		let val = styles[k];
		let key = valf(styleParams[k],k);
		if (k.includes('class')) elem.classList.add(val); 
    else if (k.startsWith('grid')) elem.style.setProperty(key, `repeat(${val}, 1fr)`);
		else elem.style.setProperty(key, isNumber(val) ? val + 'px' : val);
	}
}



