
function mAreas(dParent, areas, gridCols, gridRows) {
	mClear(dParent); mStyle(dParent, { padding: 0 })
	let names = arrNoDuplicates(toWords(areas)); //console.log(names);
	let dg = mDom(dParent); 
	for (const name of names) {
		let d = mDom(dg, { family: 'opensans', padding: 10, wbox: true }, { id: name });
		d.style.gridArea = name;
	}
	mStyle(dg, { display: 'grid', gridCols, gridRows, dir: 'column', h: '100%' });
	dg.style.gridTemplateAreas = areas;
	return names;
}
function mShade(names){
	let palette = paletteTransWhiteBlack(names.length + 3).slice(2); console.log(palette);
	for (const name of names) {
		let d = mBy(name); //console.log(name,d)
		mStyle(d, { bg: palette.shift(), fg: 'contrast', padding: 10, wbox: true });
	}

}


