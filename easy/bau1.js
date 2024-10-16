
function mHomeLogo(d, key, handler) {
	let ui = mKey(key, d, { fz: 30, cursor: 'pointer' }, { onclick: handler });
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
function mLink(d, text, handler, kennzahl) {
	if (nundef(kennzahl)) kennzahl = getUID();
	let ui = mDom(d, { className: 'a', maleft: 12, deco: 'none', rounding: 10, hpadding: 10, vpadding: 4 }, { tag: 'a', html: text, href: '#', onclick: handler, kennzahl });

	return ui;
}
function mLinkMenu(d, text, handler, menu, kennzahl) {
	if (nundef(kennzahl)) kennzahl = getUID();
	let ui = mDom(d, { className: 'a', maleft: 12, deco: 'none', rounding: 10, hpadding: 10, vpadding: 4 }, { tag: 'a', html: text, href: '#', onclick: handler, kennzahl, menu });

	return ui;
}
function mLinkToggle(d, text, handler, init, kennzahl) {
	if (nundef(kennzahl)) kennzahl = getUID();
	let ui = mDom(d, { className: 'a', maleft: 12, deco: 'none', rounding: 10, hpadding: 10, vpadding: 4 }, { tag: 'a', html: text, href: '#', onclick: handler, kennzahl, val:init });

	return ui;
}
function hToggleClassMenu(ev) {
	let a = ev.target;
	let menu = a.getAttribute('menu');
	let others = document.querySelectorAll(`a[menu='${menu}']`);
	for (const o of others) {
		mClassRemove(o, 'active')
	}
	mClassToggle(a, 'active')
}
async function onclickDay(ev) {
	hToggleClassMenu(ev);
}
async function onclickGame(ev) {
	hToggleClassMenu(ev);
}
async function onclickHome(ev) {
	console.log('home!')
}
