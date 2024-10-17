
function mLinkToggle(d, text, handler, init, kennzahl) {
	if (nundef(kennzahl)) kennzahl = getUID();
	let ui = mDom(d, { className: 'a', maleft: 12, deco: 'none', rounding: 10, hpadding: 10, vpadding: 4 }, { tag: 'a', html: text, href: '#', onclick: handler, kennzahl, val: init });

	return ui;
}
async function onclickDay(ev) {
	hToggleClassMenu(ev); mClear('dMain');
}
async function onclickExample(ev) {
	hToggleClassMenu(ev); mClear('dMain');
	let d = mDom('dMain', { w: '100%', h: '100%', bg: 'lightgreen' });
	let names = mAreas(d, ` 'dSide dTable' `, 'auto 1fr', '1fr');
	mShade(names);
	let dSide = mBy(names[0]);		
	mStyle(dSide,{padding:10,wbox:true})
	mDom(dSide, {}, { html: 'TODO:' });
	mDom('dTable', {}, { html: 'dTable' });

	//on the sidebar, list steps such as 'Nil github', 'get up v', 'get dressed', 'cleanup f', 'LG github', 'email check', 'stretching', 'plan', 'tune violin', 'schradiek'
	let list = ['Nil github', 'get up v', 'get dressed', 'cleanup f', 'LG github', 'email check', 'stretching', 'plan', 'tune violin', 'schradiek'];	
	for(const item of list){
		mDom(dSide, {margin:0}, { tag:'button',html: item, onclick:onclickExampleItem });
		mLinebreak(dSide,3);
	}


}
async function onclickExampleItem(ev) {
	mClear('dTable');
	mDom('dTable', {}, { html: ev.target.innerHTML })
}
async function onclickGame(ev) {
	hToggleClassMenu(ev); mClear('dMain');
}
async function onclickHome(ev) {
	hToggleClassMenu(ev); mRemoveClass(ev.target, 'active'); //just set other top menu buttons inactive!
	mClear('dMain');
	console.log('home!');
}
async function onclickZone(ev) {
	hToggleClassMenu(ev); mClear('dMain');
}
