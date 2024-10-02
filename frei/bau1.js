
function mBodyResetter(bg){
	let d0 = document.body;
	mClass(d0, 'reset100'); console.log(d0.offsetWidth, d0.offsetHeight);
	let d1 = mDom(d0, { bg, w: '100%', h: '100%' });
	return d1;
}
function mStyle(elem, styles = {},opts={}) {
	elem = toElem(elem);
	styles = jsCopy(styles);
	for (const k in styles) {
		let key = STYLE_PARAMS_2[k];
		let v = styles[k];
		let val = isNumber(v) ? '' + Number(v) + 'px' : v;
		if (isdef(key)) { elem.style.setProperty(key, val); continue; }

		//jetzt mach ich es ueber di mit spezialfaellen
		const STYLE_PARAMS_3 = {
			gridRows: (elem,v)=>elem.style.gridTemplateRows = isNumber(v) ? `repeat(${v},1fr)` : v,
			gridCols: (elem,v)=>elem.style.gridTemplateColumns = isNumber(v) ? `repeat(${v},1fr)` : v,
			hpadding: (elem,v)=>elem.style.padding=`0 ${v}px`,
			vpadding: (elem,v)=>elem.style.padding=`${v}px 0`,
			hmargin: (elem,v)=>elem.style.margin=`0 ${v}px`,
			vmargin: (elem,v)=>elem.style.margin=`${v}px 0`,
		};
		if (v == 'contrast') { //nur bei fg verwenden!!!!
			let bg = nundef(styles.bg)? mGetStyle(elem, 'bg'):colorFrom(styles.bg);
			elem.style.setProperty('color', colorIdealText(bg));
		} else if (k == 'bg') {
			elem.style.setProperty('background-color', colorFrom(v, styles.alpha));
			continue;
		} else if (k == 'fg') {
			elem.style.setProperty('color', colorFrom(v));
			continue;
		} else if (isdef(STYLE_PARAMS_3[k])) {
			STYLE_PARAMS_3[k](elem,v);
		} else elem.style.setProperty(k, val);
	}
	applyOpts(elem,opts);
}


