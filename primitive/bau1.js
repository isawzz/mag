
function mAreas(dParent, areas, gridCols, gridRows) {
	mClear(dParent); mStyle(dParent, { padding: 0 })
	let names = arrNoDuplicates(toWords(areas)); console.log(names);
	let dg = mDom(dParent); //,{display:'grid',gridAreas:areas,w:'100%',h:'100%'});

	for (const name of names) {
		let d = mDom(dg, { family: 'opensans', padding: 10, wbox: true }, { id: name });
		// let d = mDom(dg, {}, { id: name });
		d.style.gridArea = name;
	}
	mStyle(dg, { display: 'grid', gridCols, gridRows, dir: 'column', h: '100%' });
	dg.style.gridTemplateAreas = areas;
	return names;
}


