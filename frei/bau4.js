
function _mStyle(elem, styles = {}) {
	elem = toElem(elem);
	styles = jsCopy(styles);
	for (const k in styles) {
		let key = STYLE_PARAMS_2[k];
		let v = styles[k];
		let val = isNumber(v) ? '' + Number(v) + 'px' : v;
		if (isdef(key)) { elem.style.setProperty(key, val); continue; }

		//jetzt mach ich es ueber di mit spezialfaellen
		const STYLE_PARAMS_3 = {
			gridCols: 'grid-template-columns',
			gridRows: 'grid-template-rows',
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
		} else if (k.startsWith('grid') && isdef(STYLE_PARAMS_3[k])) {
			key = STYLE_PARAMS_3[k];
			val = isNumber(v) ? `repeat(${v},1fr)` : v;
			elem.style.setProperty(key, val);
		} else elem.style.setProperty(k, val);
	}
}
function showStyles(elem) { let st = mGetStyles(elem, ['bg', 'fg']); console.log('styles', st); }

