
function arrNoDuplicates(arr) { return [...new Set(arr)]; }
function divInt(a, b) { return Math.trunc(a / b); }
function downloadAsCode(obj, fname) {
	function convertObjectToCode(obj) {
		if (typeof obj === 'object' && !Array.isArray(obj)) {
			const entries = Object.entries(obj)
				.map(([key, value]) => `${key}: ${convertObjectToCode(value)}`)
				.join(',\n');
			return `{\n${entries}\n}`;
		} else if (Array.isArray(obj)) {
			return `[${obj.map(convertObjectToCode).join(', ')}]`;
		} else if (typeof obj === 'string') {
			return `"${obj}"`;  // wrap strings in quotes
		} else {
			return obj;  // numbers, booleans, etc. don't need quotes
		}
	}
	// Convert the JS object to a code string with unquoted keys
	const objectAsCode = `const O = ${convertObjectToCode(obj)};`;

	// Create a blob with the code as text
	const blob = new Blob([objectAsCode], { type: 'text/javascript' });

	// Create a download link for the file
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = fname + '.js'; // Name of the file to be downloaded

	// Trigger the download
	document.body.appendChild(link);
	link.click();

	// Clean up by removing the link
	document.body.removeChild(link);
}
function hToggleClassMenu(a) {
	a = a.target; //toElem(a);
	let menu = a.getAttribute('menu');
	let others = document.querySelectorAll(`a[menu='${menu}']`);
	for (const o of others) {
		mClassRemove(o, 'active')
	}
	mClassToggle(a, 'active');
}
function hPrepUi(ev, areas, cols, rows, bg) {
	hToggleClassMenu(ev); mClear('dMain');
	let d = mDom('dMain', { w: '100%', h: '100%' });
	let names = mAreas(d, areas, cols, rows);
	names.unshift('dTop');
	names = names.concat(['dStatus', 'dMain']);
	mStyle('dPage', { bg });
	return names;

}
function mAreas(dParent, areas, gridCols, gridRows) {
	mClear(dParent); mStyle(dParent, { padding: 0 })
	let names = arrNoDuplicates(toWords(areas)); //console.log(names);
	let dg = mDom(dParent);
	for (const name of names) {
		let d = mDom(dg, { family: 'opensans', wbox: true }, { id: name });
		d.style.gridArea = name;
	}
	mStyle(dg, { display: 'grid', gridCols, gridRows, dir: 'column', h: '100%' });
	dg.style.gridTemplateAreas = areas;
	return names;
}
function mHomeLogo(d, key, handler, menu) {
	let ui = mKey(key, d, { maright: 12, fz: 30, cursor: 'pointer' }, { onclick: handler, menu });
	//ui.onclick=handler;
	return ui;
}
function mKey(imgKey, d, styles = {}, opts = {}) {
	let o = lookup(M.superdi, [imgKey]);
	let src;
	if (nundef(o) && imgKey.includes('.')) src = imgKey;
	else if (isdef(o) && isdef(opts.prefer)) src = valf(o[opts.prefer], o.img);
	else if (isdef(o)) src = valf(o.img, o.photo)
	if (nundef(src)) src = rChoose(M.allImages).path;
	let [w, h] = mSizeSuccession(styles, 40);
	addKeys({ w, h }, styles)
	addKeys({ tag: 'img', src }, opts)
	let img = mDom(d, styles, opts);
	return img;
}
function mLinkSide(d, text, handler, menu, kennzahl) {
	if (nundef(kennzahl)) kennzahl = getUID();
	let ui = mDom(d, { rounding: 10, hpadding: 10, vpadding: 4 }, { tag: 'a', html: text, href: '#', onclick: handler, kennzahl, menu });
	return ui;
}
function mLinkMenu(d, text, handler, menu, kennzahl) {
	if (nundef(kennzahl)) kennzahl = getUID();
	let ui = mDom(d, { className: 'a', hmargin: 8, vmargin:2, deco: 'none', rounding: 10, hpadding: 9, vpadding: 3 }, { tag: 'a', html: text, href: '#', onclick: handler, kennzahl, menu });

	return ui;
}
function mShade(names,offset=1,contrast=1) {
	let palette = paletteTransWhiteBlack(names.length*contrast+2*offset).slice(offset); //console.log(names,palette);
	for (const name of names) {
		let d = mBy(name); //console.log(name,d)
		mStyle(d, { bg: palette.shift(), fg: 'contrast', wbox: true });
	}
}
function mShadeLight(names,offset=1,contrast=1) {
	let palette = paletteTransWhite(names.length*contrast+2*offset).slice(offset); //console.log(names,palette);
	for (const name of names) {
		let d = mBy(name); //console.log(name,d)
		mStyle(d, { bg: palette.shift(), fg: 'contrast', wbox: true });
	}
}
function mShadeDark(names,offset=1,contrast=1) {
	let palette = paletteTransBlack(names.length*contrast+2*offset).slice(offset); //console.log(names,palette);
	for (const name of names) {
		let d = mBy(name); //console.log(name,d)
		mStyle(d, { bg: palette.shift(), fg: 'contrast', wbox: true });
	}
}
function paletteTransWhite(n = 9) {
  let c = 'white';
  let pal = [c];
  let incw = 1 / (n-1);
  for (let i = 1; i < n-1; i++) {
    let alpha = 1 - i * incw;
    pal.push(colorTrans(c, alpha));
  }
  pal.push('transparent');
  return pal;
}
function paletteTransBlack(n = 9) {
  let c = 'black';
  let pal = [c];
  let incw = 1 / (n-1);
  for (let i = 1; i < n-1; i++) {
    let alpha = 1 - i * incw;
    pal.push(colorTrans(c, alpha));
  }
  pal.push('transparent');
  return pal;
}



