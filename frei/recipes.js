function recipesLayout(d1) {
	let [dTop, dMainTop, dFooter] = mGridRows(d1, 'auto 1fr auto');
	let [dSymLeft, dPageTitle, dTopMenu, dUser, dSymRight] = mLayoutLine5(dTop);
	let [dSideLeft, dUpper] = mGridCols(dMainTop, 'auto 1fr');
	let divs = [dSideLeft, dUpper, dFooter, dTop];
	let palette = paletteTransWhiteBlack(divs.length + 2); console.log(palette);
	divs.forEach((div, i) => mStyle(div, { padding: 8, bg: palette[i + 1], fg: 'contrast' }));
	mSidebar(dSymLeft, dSideLeft);
	mStyle(dUpper, { overy: 'auto', margin: 0, gap: 10, wbox: true, padding: 10 })
	mCenterFlex(dUpper);
	//for (const i of range(100)) mDom(dUpper, { h: 200, w: 200, bg: rColor(), fg: 'contrast', hline: 'normal' }, { html: 'hallo' });
	return divs;

}