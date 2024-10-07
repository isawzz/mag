
function oceanLayout(d,bg,level=0){
	let d0 = toElem(d)
	mStyle(d0, { bg,padding:0,margin:0 });
	mClear(d0);
	dTop = mDomid(d0, 'dTop'+level);
	dMiddle = mDom(d0, { classes: 'colsAutoFrAuto' }, { id: 'dMiddle'+level });
	dSidebar = mDomid(dMiddle, 'dSidebar'+level);
	dTable = mDomid(dMiddle, 'dTable'+level);
	let divs = [dTop,dSidebar,dTable];
	mPaletteTrans(...divs);
	divs.map(x=>mStyle(x,{},{html:x.id}))

}

