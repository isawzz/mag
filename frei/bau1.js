
function mDomTest(dParent,styles={},opts={}){
	addKeys({bg:rColor(),fg:'contrast'},styles);
	let id=getUID('div');
	addKeys({ id,html:id }, opts);
	return mDom(dParent,styles,opts);
}
function layout3(d0,testing=false){
	let dg1=mDom(d0, {display:'grid', gridCols:'auto 1fr auto',w:'100%',h:'100%',bg:'dimgray'});
	let func=testing?mDomTest:mDom;
	let [dSideLeft,dMain,dSideRight]=[func(dg1),func(dg1),func(dg1)];
	return [dSideLeft,dMain,dSideRight];
}
function layout5(d0,testing=false){
	let dg0=mDom(d0, {display:'grid', gridRows:'auto 1fr auto',h:'100%',bg:'red'});
	let func=testing?mDomTest:mDom;
	let [dTop,dMiddle,dFooter]=[func(dg0),func(dg0),func(dg0)];
	let dg1=mDom(dMiddle, {display:'grid', gridCols:'auto 1fr auto',w:'100vw',h:'100%',bg:'dimgray'});
	let [dSideLeft,dMain,dSideRight]=[func(dg1),func(dg1),func(dg1)];
	//dSideLeft.innerHTML='left';
	//dSideRight.innerHTML='right';
	//for(const d of [dTop,dSideLeft,dMain,dSideRight,dFooter]) console.log(d.offsetWidth, d.offsetHeight);
	return [dTop,dSideLeft,dMain,dSideRight,dFooter];
}

function mPage(styles={},opts={}) { 
	addKeys({w:'100vw',h:'100vh',wbox:true,hline:0,margin:0},styles);
	addKeys({ html: '&nbsp;' },opts);
	let d1 = mDom(document.body, styles, opts); 
	return d1;// mDom(d1, styles, opts);
}
