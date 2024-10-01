
function getMenuSymbol(){ return '☰';}
function mDomTest(dParent, styles = {}, opts = {}) {
	addKeys({ bg: rColor(), fg: 'contrast' }, styles);
	let id = getUID('div');
	addKeys({ id, html: id }, opts);
	return mDom(dParent, styles, opts);
}
function mLayoutCols3(d0, testing = false) {
	let dg1 = mDom(d0, { display: 'grid', gridCols: 'auto 1fr auto', w: '100%', h: '100%', bg: 'dimgray' });
	let func = testing ? mDomTest : mDom;
	let [dSideLeft, dMain, dSideRight] = [func(dg1), func(dg1), func(dg1)];
	return [dSideLeft, dMain, dSideRight];
}
function mLayout5(d0, testing = false) {
	let dg0 = mDom(d0, { display: 'grid', gridRows: 'auto 1fr auto', h: '100%' });
	let func = testing ? mDomTest : mDom;
	let [dTop, dMiddle, dFooter] = [func(dg0), func(dg0), func(dg0)];
	dMiddle.innerHTML = '';

	let dg1 = mDom(dMiddle, { display: 'grid', gridCols: 'auto 1fr auto', w: '100%', h: '100%'});
	let [dSideLeft, dMain, dSideRight] = [func(dg1), func(dg1), func(dg1)];
	//dSideLeft.innerHTML='left';
	//dSideRight.innerHTML='right';
	//for(const d of [dTop,dSideLeft,dMain,dSideRight,dFooter]) console.log(d.offsetWidth, d.offsetHeight);
	return [dTop, dSideLeft, dMain, dSideRight, dFooter];
}
function mLayoutLine3(dParent, testing = false) {
	dParent.innerHTML = '';
	mStyle(dParent, { display: 'flex', aitems: 'baseline', jcontent: 'space-between' });
	let func = testing ? mDomTest : mDom;
	let [dRest, dRight] = [func(dParent), func(dParent)];
	mStyle(dRest, { display: 'flex', aitems: 'baseline' });
	let [dLeft, dMiddle] = [func(dRest), func(dRest)];
	return [dLeft, dMiddle, dRight];
}
function mLayoutLine5(dParent, testing = false) {
	dParent.innerHTML = '';
	mStyle(dParent, { display: 'flex', aitems: 'baseline', jcontent: 'space-between' });
	let func = testing ? mDomTest : mDom;
	let [dl, dr] = [func(dParent), func(dParent)];
	mStyle(dl, { display: 'flex', aitems: 'baseline' });
	let [dSymLeft,dLeft, dMiddle] = [func(dl),func(dl), func(dl)];
	mStyle(dr, { display: 'flex', aitems: 'baseline' });
	let [dRight,dSymRight] = [func(dr),func(dr)];
	return [dSymLeft,dLeft, dMiddle, dRight,dSymRight];
}
function mPage(styles = {}, opts = {}) {
	addKeys({ w: '100vw', h: '100vh', wbox: true, hline: 0, margin: 0 }, styles);
	addKeys({ html: '&nbsp;' }, opts);
	let d1 = mDom(document.body, styles, opts);
	return d1;// mDom(d1, styles, opts);
}
function paletteTransWhiteBlack(n = 9) {
  let c = 'white';
  let pal = [c];
  let [iw, ib] = [Math.floor(n / 2), Math.floor((n - 1) / 2)];
  let [incw, incb] = [1 / (iw + 1), 1 / (ib + 1)];
  for (let i = 1; i < iw; i++) {
    let alpha = 1 - i * incw;
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
function showStyles(elem) { let st = mGetStyles(elem, ['bg', 'fg']); console.log('styles', st); }
function sidebarClose(d){	mStyle(d, { w: 0, wmin: 0 }); }
function sidebarControl(dSym,dSidebar){
	// dSym
	// // dSymLeft.innerHTML =  getMenuSymbol();
	// // dSymRight.innerHTML =  getMenuSymbol();
	// sidebarStyle(dSideLeft);
	// sidebarStyle(dSideRight);
	// bHome.onclick = () => sidebarToggle(dSideLeft);

}
function sidebarOpen(d){	mStyle(d, { w: 150, wmin: 0 }); }
function sidebarToggle(d){ let w=mGetStyle(d,'w'); if (w) sidebarClose(d); else sidebarOpen(d);}
function sidebarStyle(d){
	mStyle(d,{overflow:'hidden',className:'translow'})
}


