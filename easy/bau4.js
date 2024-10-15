
function arrNoDuplicates(arr) {	return [...new Set(arr)];}
function divInt(a, b) { return Math.trunc(a / b); }
function downloadAsCode(obj,fname) {
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
	link.download = fname+'.js'; // Name of the file to be downloaded

	// Trigger the download
	document.body.appendChild(link);
	link.click();

	// Clean up by removing the link
	document.body.removeChild(link);
}
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
	let palette = paletteTransWhiteBlack(names.length + 3).slice(2); //console.log(palette);
	for (const name of names) {
		let d = mBy(name); //console.log(name,d)
		mStyle(d, { bg: palette.shift(), fg: 'contrast', padding: 10, wbox: true });
	}

}



