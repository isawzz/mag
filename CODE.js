
function mLinkToggle(d, text, handler, init, kennzahl) {
	if (nundef(kennzahl)) kennzahl = getUID();
	let ui = mDom(d, { className: 'a', maleft: 12, deco: 'none', rounding: 10, hpadding: 10, vpadding: 4 }, { tag: 'a', html: text, href: '#', onclick: handler, kennzahl, val: init });

	return ui;
}
function _calculateStatistics(values,mu) {
	// Mean
	const mean = values.reduce((sum, value) => sum + value, 0) / values.length;

	// Median
	const sortedValues = [...values].sort((a, b) => a - b);
	const mid = Math.floor(sortedValues.length / 2);
	const median = sortedValues.length % 2 === 0 ? 
			(sortedValues[mid - 1] + sortedValues[mid]) / 2 : 
			sortedValues[mid];

	// Mode
	const frequencyMap = {};
	let maxFreq = 0;
	let mode = [];

	values.forEach(value => {
			frequencyMap[value] = (frequencyMap[value] || 0) + 1;
			if (frequencyMap[value] > maxFreq) {
					maxFreq = frequencyMap[value];
					mode = [value];
			} else if (frequencyMap[value] === maxFreq) {
					mode.push(value);
			}
	});
	mode = [...new Set(mode)]; // Remove duplicates if multiple modes

	// Variance
	const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length;

	// Standard Deviation
	const standardDeviation = Math.sqrt(variance);

	return {
			mean: mean,
			median: median,
			mode: mode,
			variance: variance,
			standardDeviation: standardDeviation
	};
}

//#region layout versuche top side left with AI
function mAreas(dParent, gridAreas, gridCols, gridRows) {
	if (isList(gridAreas)) gridAreas = gridAreas.map(x => `'${x}'`).join(' ');

	//mStyle(container, { display: 'grid', gridCols: 'auto 1fr', gridRows: 'auto 1fr', dir: 'column', h: '100vh' });
	// container.style.gridTemplateAreas = `
	// 		'top top'
	// 		'left right'
	// `;

	console.log(gridAreas);
	let dg = mDom(dParent, { display: 'grid', gridCols, gridRows, gridAreas, w: '100%', h: '100%' });
	dg.style.gridTemplateAreas = gridAreas;
	let names = arrNoDuplicates(toWords(gridAreas)); console.log(names);

	let palette = paletteTransWhiteBlack(names.length + 2).slice(1); //console.log(palette);

	for (const name of names) {
		mDom(dg, { gridArea: name, bg: palette.pop(), family: 'algerian', padding: 10, wbox: true }, { id: name, html: name });
		//mDom(dg,{gridArea:name,bg:rColor(),padding:10},{id:name,html:name});
	}

}
function mGridFrom(d, m, cols, rows, cellstyles = {}) {
	let gta = '';
	let words = [];
	for (const line of m) {
		gta = gta + `'${line}' `;
		let warr = toWords(line);
		//console.log('warr',warr)
		for (const w of warr) if (!words.includes(w)) words.push(w);
		//w.map(x => addIf(words, w));

	}
	//console.log('gta',gta);
	//console.log('words', words);
	let dParent = mDom100(d, { display: 'grid', 'grid-template-areas': gta });
	dParent.style.gridTemplateColumns = cols;
	dParent.style.gridTemplateRows = rows;
	for (const w of words) {
		let st = copyKeys({ 'grid-area': w }, cellstyles);
		let cell = window[w] = mDom(dParent, st, { id: w });//	,html:w.substring(1)})


	}
	//console.log('dParent',dParent); return;
	return dParent;
}
function show_coding_ui() {
	let d = document.body; mClass(d, 'fullpage airport'); //addDummy(d);
	//mStyle(d,{hmax:'100%'})
	let areas = [
		'dTestButtons dTestButtons',
		'dSearch dSidebar',
		'dFiddle dSidebar',
		'dTable dSidebar',
		'dFooter dSidebar',
	];
	let cols = '1fr 240px';
	let rows = 'auto auto 1fr auto auto';

	let [bg, fg] = [rColorTrans(50, 10, 100, [150, 230]), 'contrast']; //console.log('colors:', bg, fg);	//bg='hsla(120,100%,25%,0.3)';
	dPage = mGridFrom(d, areas, cols, rows, { hmax: '96%', padding: 4, box: true, bg: bg, fg: fg });

	let elem = mSearch('keywords:', mySearch, dSearch, {}, { selectOnClick: true });
	let bs = mDiv(elem, { 'grid-column': '1 / span 3', display: 'flex', gap: 4 });
	mButton('name', onclickFulltext, bs, { align: 'center', w: 110 });
	mButton('insensitive', onclickCase, bs, { align: 'center', w: 210 });
	mButton('anywhere', onclickWhere, bs, { align: 'center', w: 210 });

	mStyle(dFiddle, { h: 800, bg: GREEN });
	mDom(dFiddle, {}, { html: 'Edit Code:' });
	AU.ta = mDom(dFiddle, { fz: 18, family: 'consolas', w100: true, box: true, h: 'rest', bg: colorTrans(bg, 1), fg: 'black' }, { tag: 'textarea', id: 'ta', className: 'plain' });

	mFlex(dTestButtons);
	mButton('TEST', onclickTest, dTestButtons); //mDom(dTestButtons, { bg: bg, hpadding: 10, vpadding: 4, rounding: 8, cursor: 'pointer' }, { onclick: onclickTest, className: 'hop1', html: 'TEST' });

	addEventListener('keydown', execute_on_control_enter)
	//mDom(dTable, {margin:10,bg:'#222'}, { html: 'HAAAAAAAAAALLLLLLLLLOOOOOO', editable: true, selectOnClick: true });
	//dUnten = mDiv(dTable, {box:true,w:'100%',h:400,bg:'#222'});
}
function myLayout(container) {
	let topDiv = mDom(container, { bg: 'lightblue', padding: 10 }, { html: "Top div - grows with content." });
	topDiv.style.gridArea = 'top';

	let leftDiv = mDom(container, { overy: 'auto', w: 60, transition: 'width 0.5s ease', bg: 'lightgray', padding: 10 });
	leftDiv.style.gridArea = 'left';

	let menuSymbol = mDom(leftDiv, { cursor: 'pointer', fz: 24 }, { html: getMenuSymbol() });

	let rightDiv = mDom(container, { overy: 'scroll', bg: 'lightgreen', padding: 10 }, { html: "Right content area with scrollable content." });
	rightDiv.style.gridArea = 'right';

	mStyle(container, { display: 'grid', gridCols: 'auto 1fr', gridRows: 'auto 1fr', dir: 'column', h: '100vh' });
	container.style.gridTemplateAreas = `
			'top top'
			'left right'
	`;

	// Toggle sidebar open/close on menu symbol click
	let sidebarOpen = false;
	menuSymbol.addEventListener('click', () => {
		if (sidebarOpen) {
			leftDiv.style.width = '60px'; // Collapse the sidebar
		} else {
			leftDiv.style.width = '200px'; // Expand the sidebar
		}
		sidebarOpen = !sidebarOpen;
	});

	return [topDiv, leftDiv, rightDiv, menuSymbol];
}
function createLayout(container) {
	// Create the top div (auto height)
	const topDiv = document.createElement('div');
	topDiv.style.gridArea = 'top';
	topDiv.style.backgroundColor = 'lightblue';
	topDiv.style.padding = '10px';
	topDiv.textContent = "Top div - stays on top.";

	// Create the left (sidebar) div
	const leftDiv = document.createElement('div');
	leftDiv.style.gridArea = 'left';
	leftDiv.style.backgroundColor = 'lightgray';
	leftDiv.style.transition = 'width 0.5s ease'; // Smooth transition for open/close
	leftDiv.style.overflowY = 'auto';
	leftDiv.style.width = '60px'; // Initial width of the sidebar (collapsed)
	leftDiv.style.padding = '10px';

	// Add the 'menu' symbol to the sidebar
	const menuSymbol = document.createElement('div');
	menuSymbol.textContent = "☰"; // Menu symbol (three lines)
	menuSymbol.style.cursor = 'pointer';
	menuSymbol.style.fontSize = '24px';
	leftDiv.appendChild(menuSymbol);

	// Create the right div (main content area)
	const rightDiv = document.createElement('div');
	rightDiv.style.gridArea = 'right';
	rightDiv.style.backgroundColor = 'lightgreen';
	rightDiv.style.overflowY = 'scroll'; // Scrollbar for overflow content
	rightDiv.style.padding = '10px';

	// Example content for rightDiv
	const content = document.createElement('div');
	content.textContent = "This is the main content area. It will shrink when the sidebar opens.";
	rightDiv.appendChild(content);

	// Apply grid layout to the container
	container.style.display = 'grid';
	container.style.gridTemplateColumns = 'auto 1fr'; // Sidebar auto width, content takes the rest
	container.style.gridTemplateRows = 'auto 1fr'; // Top auto height, content takes the rest
	container.style.gridTemplateAreas = `
			'top top'
			'left right'
	`;
	container.style.height = '100vh'; // Full viewport height

	// Append top, left, and right divs to the container
	container.appendChild(topDiv);
	container.appendChild(leftDiv);
	container.appendChild(rightDiv);

	// Toggle sidebar open/close on menu symbol click
	let sidebarOpen = false;
	menuSymbol.addEventListener('click', () => {
		if (sidebarOpen) {
			leftDiv.style.width = '60px'; // Collapse the sidebar
		} else {
			leftDiv.style.width = '200px'; // Expand the sidebar
		}
		sidebarOpen = !sidebarOpen;
	});

	return [topDiv, leftDiv, rightDiv, menuSymbol];
}
function ___createLayout(container) {
	// Create the top div (auto height)
	const topDiv = document.createElement('div');
	topDiv.style.backgroundColor = 'lightblue';
	topDiv.style.padding = '10px';
	topDiv.textContent = "Top div - grows with content.";

	// Create a wrapper div for the middle section (sidebar + content)
	const middleDiv = document.createElement('div');
	middleDiv.style.display = 'flex';
	middleDiv.style.flexGrow = '1'; // Take up remaining space
	middleDiv.style.height = '100%'; // Full height for this section
	middleDiv.position = 'relative';


	// // Create the left (sidebar) div with initial small width
	// const leftDiv = document.createElement('div');
	// leftDiv.style.width = '60px'; // Initial width of the sidebar (collapsed)
	// leftDiv.style.backgroundColor = 'lightgray';
	// leftDiv.style.transition = 'width 0.5s ease'; // Smooth transition for open/close
	// leftDiv.style.overflowY = 'auto'; // In case content overflows

	const leftDiv = document.createElement('div');
	// Create the right div (main content area)
	const rightDiv = document.createElement('div');
	rightDiv.style.flexGrow = '1'; // Fill the remaining space
	rightDiv.style.overflowY = 'scroll'; // Scrollbar for overflow content
	rightDiv.style.backgroundColor = 'lightgreen';
	rightDiv.style.padding = '10px';

	// Example content for rightDiv
	const content = document.createElement('div');
	content.textContent = "This is the main content area. It will shrink as the sidebar opens.";
	rightDiv.appendChild(content);

	// Append left (sidebar) and right (content area) to the middleDiv
	middleDiv.appendChild(leftDiv);
	middleDiv.appendChild(rightDiv);

	// Append the top and middle divs to the container
	container.style.display = 'flex';
	container.style.flexDirection = 'column';
	container.style.height = '100vh'; // Full viewport height
	container.appendChild(topDiv);
	container.appendChild(middleDiv);

	// Toggle sidebar open/close on menu symbol click
	leftDiv.style.width = '60px'; // Initial width of the sidebar (collapsed)
	leftDiv.style.backgroundColor = 'lightgray';
	leftDiv.style.position = 'absolute'; // Positioned absolutely
	leftDiv.style.top = '0';
	leftDiv.style.left = '0';
	leftDiv.style.bottom = '0';
	leftDiv.style.transition = 'width 0.5s ease'; // Smooth transition for open/close

	// Add the 'menu' symbol to the sidebar
	const menuSymbol = document.createElement('div');
	menuSymbol.textContent = "☰"; // Menu symbol (three lines)
	menuSymbol.style.cursor = 'pointer';
	menuSymbol.style.padding = '10px';
	menuSymbol.style.fontSize = '24px';
	leftDiv.appendChild(menuSymbol);

	let sidebarOpen = false;
	menuSymbol.addEventListener('click', () => {
		if (sidebarOpen) {
			leftDiv.style.width = '60px'; // Collapse the sidebar
		} else {
			leftDiv.style.width = '200px'; // Expand the sidebar
		}
		sidebarOpen = !sidebarOpen;
	});


	return [topDiv, leftDiv, rightDiv, menuSymbol];

}

function __createLayout(container) {
	// Create the top div (auto height)
	const topDiv = document.createElement('div');
	topDiv.style.backgroundColor = 'lightblue';
	topDiv.style.padding = '10px';
	topDiv.textContent = "Top div - grows with content.";

	// // Create the left (sidebar) div
	// const leftDiv = document.createElement('div');
	// leftDiv.style.width = '60px'; // Initial width of the sidebar (collapsed)
	// leftDiv.style.backgroundColor = 'lightgray';
	// leftDiv.style.float = 'left'; // Sidebar floats to the left
	// leftDiv.style.transition = 'width 0.25s ease'; // Smooth transition for open/close
	// leftDiv.style.height = '100%'; // Make sidebar take full height

	// Create the left (sidebar) div with absolute positioning
	const leftDiv = document.createElement('div');
	leftDiv.style.width = '60px'; // Initial width of the sidebar (collapsed)
	leftDiv.style.backgroundColor = 'lightgray';
	leftDiv.style.position = 'absolute'; // Positioned absolutely
	leftDiv.style.top = '0';
	leftDiv.style.left = '0';
	leftDiv.style.bottom = '0';
	leftDiv.style.transition = 'width 0.5s ease'; // Smooth transition for open/close


	// Add the 'menu' symbol to the sidebar
	const menuSymbol = document.createElement('div');
	menuSymbol.textContent = "☰"; // Menu symbol (three lines)
	menuSymbol.style.cursor = 'pointer';
	menuSymbol.style.padding = '10px';
	menuSymbol.style.fontSize = '24px';
	leftDiv.appendChild(menuSymbol);

	// Create the right div (main content area)
	const rightDiv = document.createElement('div');
	rightDiv.style.marginLeft = '60px'; // Leave space for the sidebar initially
	rightDiv.style.overflowY = 'scroll'; // Scrollbar for overflow content
	rightDiv.style.backgroundColor = document.body.style.backgroundColor = 'lightgreen';
	rightDiv.style.padding = '10px';
	rightDiv.style.height = '100%'; // Take full height of the container

	// Example content for rightDiv
	const content = document.createElement('div');
	content.textContent = "This is the main content area. It will shrink as the sidebar opens.";
	rightDiv.appendChild(content);

	// Clearfix to handle float (to make sure bottom div clears the float)
	const clearDiv = document.createElement('div');
	clearDiv.style.clear = 'both';

	// Append left (sidebar) and right (content area) to the container
	container.style.height = '100%'; // Ensure the container takes the full height
	container.appendChild(topDiv);
	container.appendChild(leftDiv);
	container.appendChild(rightDiv);
	container.appendChild(clearDiv); // Clear the float with clearfix

	// Toggle sidebar open/close on menu symbol click
	let sidebarOpen = false;
	menuSymbol.addEventListener('click', () => {
		if (sidebarOpen) {
			leftDiv.style.width = '60px'; // Collapse the sidebar
			rightDiv.style.marginLeft = '60px'; // Adjust margin when sidebar collapses
		} else {
			leftDiv.style.width = '200px'; // Expand the sidebar
			rightDiv.style.marginLeft = '200px'; // Adjust margin when sidebar expands
		}
		sidebarOpen = !sidebarOpen;
	});

	return [topDiv, leftDiv, rightDiv, menuSymbol];
}

function _createLayout(container) {
	// Create the top div
	const topDiv = document.createElement('div');
	topDiv.style.backgroundColor = 'lightblue';
	topDiv.style.padding = '10px';
	topDiv.textContent = "Top div - grows with content.";

	// Create the bottom div
	const bottomDiv = document.createElement('div');
	bottomDiv.style.display = 'flex'; // Flexbox for sidebar and main content
	bottomDiv.style.flexGrow = '1'; // Take the remaining height
	bottomDiv.style.overflow = 'hidden'; // Prevent overflow issues

	// Create the left (sidebar) div
	const leftDiv = document.createElement('div');
	leftDiv.style.width = '60px'; // Initial width of the sidebar (collapsed)
	leftDiv.style.backgroundColor = 'lightgray';
	leftDiv.style.transition = 'width 0.5s ease'; // Smooth transition for open/close

	// Add the 'menu' symbol to the sidebar
	const menuSymbol = document.createElement('div');
	menuSymbol.textContent = "☰"; // Menu symbol (three lines)
	menuSymbol.style.cursor = 'pointer';
	menuSymbol.style.padding = '10px';
	menuSymbol.style.fontSize = '24px';
	leftDiv.appendChild(menuSymbol);

	// Create the right div (main content area)
	const rightDiv = document.createElement('div');
	rightDiv.style.flexGrow = '1'; // Take up the rest of the width
	rightDiv.style.overflowY = 'scroll'; // Scrollbar if content overflows
	rightDiv.style.backgroundColor = 'lightgreen';
	rightDiv.style.padding = '10px';
	rightDiv.textContent = "Right content area with scrollable content.";

	// Add some extra content to make the right div scrollable
	for (let i = 0; i < 20; i++) {
		const p = document.createElement('p');
		p.textContent = `Content line ${i + 1}`;
		rightDiv.appendChild(p);
	}

	// Append left (sidebar) and right (content area) to bottom div
	bottomDiv.appendChild(leftDiv);
	bottomDiv.appendChild(rightDiv);

	// Append top and bottom divs to the container
	container.style.display = 'flex';
	container.style.flexDirection = 'column';
	container.style.height = '100%'; // Make sure container has height constraint
	container.appendChild(topDiv);
	container.appendChild(bottomDiv);

	// Toggle sidebar open/close on menu symbol click
	let sidebarOpen = false;
	menuSymbol.addEventListener('click', () => {
		if (sidebarOpen) {
			leftDiv.style.width = '60px'; // Collapse the sidebar
		} else {
			leftDiv.style.width = '200px'; // Expand the sidebar
		}
		sidebarOpen = !sidebarOpen;
	});

	return [topDiv, leftDiv, rightDiv];
}
//#endregion

//#region mLayout neu

function mLayoutLeftMain(container, scroll = true) {
	mStyle(container, { display: 'grid', gridCols: 'auto 1fr', h: '100%' });
	let d1 = mDom(container, { transition: 'all .5s ease', wmin: 0, w: 0 }, { html: getMenuSymbol() });
	let d2 = mDom(container);
	if (scroll) mStyle(d2, { overflow: 'scroll' });
	return [d1, d2];
}
function mLayoutTopTable(container, scroll = true) {
	mStyle(container, { display: 'grid', gridRows: 'auto 1fr', h: '100%' });
	let d1 = mDom(container);
	let d2 = mDom(container);
	if (scroll) mStyle(d2, { overflow: 'scroll' });
	return [d1, d2];
}
function mLayoutTopLeftTable(container) {
	// console.log('JAAAAAA')
	mStyle(container, { display: 'flex', dir: 'column', h: '100%' });
	let topDiv = mDom(container, { bg: 'lightblue', padding: 10 }, { html: "Top div - grows with content." });
	let bottomDiv = mDom(container, { grow: 1, display: 'flex', overflow: 'hidden' });
	let leftDiv = mDom(bottomDiv, { w: 60, transition: 'width 0.5s ease', bg: 'lightgray' });
	let menuSymbol = mDom(leftDiv, { cursor: 'pointer', fz: 24, padding: 10 }, { html: getMenuSymbol() });
	let rightDiv = mDom(bottomDiv, { grow: 1, overy: 'scroll', bg: 'lightgreen', padding: 10 }, { html: "Right content area with scrollable content." });

	// // This is where you can use display:flex for internal content inside rightDiv
	// const flexChild = document.createElement('div');
	// flexChild.style.display = 'flex';
	// flexChild.style.backgroundColor = 'lightyellow';
	// flexChild.style.height = '200px'; // Some height for demo purposes
	// // Add a flex item for demo inside rightDiv
	// const flexItem = document.createElement('div');
	// flexItem.textContent = "I'm inside rightDiv with flex";
	// flexItem.style.backgroundColor = 'lightcoral';
	// flexItem.style.flexGrow = '1';
	// flexChild.appendChild(flexItem);
	// rightDiv.appendChild(flexChild);

	// Toggle sidebar open/close on menu symbol click
	let sidebarOpen = false;
	menuSymbol.addEventListener('click', () => {
		if (sidebarOpen) {
			leftDiv.style.width = '60px'; // Collapse the sidebar
		} else {
			leftDiv.style.width = '200px'; // Expand the sidebar
		}
		sidebarOpen = !sidebarOpen;
	});

	// for (let i = 0; i < 120; i++) {
	// 	mDom(rightDiv, {}, { tag: 'p', html: `Content line ${i + 1}` });
	// }

	// let sidebarOpen = false;
	return [topDiv, leftDiv, rightDiv, menuSymbol];
}

//#endregion

//#region zeug
function mLayoutTopLeftTable_YES(container) {
	// console.log('JAAAAAA')
	mStyle(container, { display: 'flex', dir: 'column', h: '100%' });
	let topDiv = mDom(container, { bg: 'lightblue', padding: 10 }, { html: "Top div - grows with content." });
	let bottomDiv = mDom(container, { grow: 1, display: 'flex', overflow: 'hidden' });
	let leftDiv = mDom(bottomDiv, { w: 60, bg: 'lightgray', transition: 'width 0.5s ease' });
	let menuSymbol = mDom(leftDiv, { cursor: 'pointer', fz: 24, padding: 10 }, { html: getMenuSymbol() });
	let rightDiv = mDom(bottomDiv, { grow: 1, overy: 'scroll', bg: 'lightgreen', padding: 10 }, { html: "Right content area with scrollable content." });

	// for (let i = 0; i < 120; i++) {
	// 	mDom(rightDiv, {}, { tag: 'p', html: `Content line ${i + 1}` });
	// }

	let sidebarOpen = false;
	menuSymbol.addEventListener('click', () => {
		if (sidebarOpen) {
			leftDiv.style.width = '60px'; // Collapse the sidebar
		} else {
			leftDiv.style.width = '200px'; // Expand the sidebar
		}
		sidebarOpen = !sidebarOpen;
	});
	return [topDiv, leftDiv, rightDiv];;
}
function mLayoutTopLeftTable(container) {

  mStyle(container, { display: 'flex', dir: 'column', h: '100%', w:'100%' });
  let d1=mDom(container,{bg:'lightblue',padding:10},{html:'top'})
  let drest=mDom(container,{display:'flex',flexGrow:1,overflow:'hidden',w:'100%'});
  let d2=mDom(drest,{w:60,bg:'lightgray',transition:'width 0.5s ease'});
  let dsym=mDom(d2,{cursor:'pointer',fz:24,padding:10},{html:getMenuSymbol()})
  let d3=mDom(drest,{flexGrow:1,overy:'scroll',bg:'lightgreen',padding:10},{html:'content'});

	// Add some extra content to make the right div scrollable
	for (let i = 0; i < 120; i++) {
		const p = document.createElement('p');
		p.textContent = `Content line ${i + 1}`;
		d3.appendChild(p);
	}

	// Toggle sidebar open/close on menu symbol click
	let sidebarOpen = false;
	menuSymbol.addEventListener('click', () => {
		if (sidebarOpen) {
			leftDiv.style.width = '60px'; // Collapse the sidebar
		} else {
			leftDiv.style.width = '200px'; // Expand the sidebar
		}
		sidebarOpen = !sidebarOpen;
	});

  return [d1,d2,d3]; //{dTop:d1,dSidebar:d2,dTable:d3,isOpen:sidebarOpen}
}

function _mLayoutTopLeftTable(container,scroll=true) {
  mStyle(container, { display: 'grid', gridRows: 'auto 1fr', h: '100%' });
  let d1 = mDom(container);
  let drest = mDom(container,{ display: 'grid', gridCols: 'auto 1fr', h: '100%', w:'100%' }); 
	let d2 = mDom(drest);
	let d3 = mDom(drest);
  if (scroll) mStyle(d3, { overflow: 'scroll' });
  return [d1, d2, d3];
}
function addColorSorting(bh=18,bs=20,bl=20) {
	let list = M.colorList;
	let [bh, bs, bl] = [18, 20, 20];
	for (const x of list) {
		let fg = colorIdealText(x.hex);
		x.fg = fg;
		x.sorth = Math.round(x.hue / bh) * bh;
		x.sortl = Math.round(x.lightness * 100 / bl) * bl;
		x.sorts = Math.round(x.sat * 100 / bs) * bs;
	}
	return list;
}
function sortColors1() {
	let list = M.colorList;
	let bb = 10;
	list = list.map(x => x.sorting = Math.round(x.hue / bb) * bb); //+Math.trunc(x.sat*10));
	list = sortByMultipleProperties(M.colorList, 'sorting', 'lightness', 'sat');
	return list;
}
function sortColors2() {
	let list = M.colorList;
	let bb = 10;
	list = list.map(x => x.sorting = Math.round(x.hue / bb) * bb); //+Math.trunc(x.sat*10));
	list = sortByMultipleProperties(M.colorList, 'hue', 'sat', 'lightness');
	return list;
}
function sortColors3() {
	let list = M.colorList;
	let bb = 10;
	list = list.map(x => x.sorting = Math.round(x.sat * 100 / bb) * bb); //+Math.trunc(x.sat*10));
	// list = sortByMultipleProperties(M.colorList,'hue','sat','lightness');
	list = sortByMultipleProperties(M.colorList, 'sorting', 'hue', 'lightness');
	return list;
}
function sortColors4() {
	let list = M.colorList;
	let bb = 10;
	list = list.map(x => x.sorth = Math.round(x.hue / bb) * bb);
	list = list.map(x => x.sortl = Math.round(x.lightness * 100 / bb) * bb);
	list = list.map(x => x.sorts = Math.round(x.sat * 100 / bb) * bb);
	list = sortByMultipleProperties(M.colorList, 'sorth', 'sortl', 'sorts');
	return list;
}
function sortColors5() {
	let list = M.colorList;
	let [bh, bl, bs] = [18, 10, 10];
	for (const x of list) {
		x.sorth = Math.round(x.hue / bh) * bh;
		x.sortl = Math.round(x.lightness * 100 / bl) * bl;
		x.sorts = Math.round(x.sat * 100 / bs) * bs;
	}
	console.log(list[0])
	list = sortByMultipleProperties(M.colorList, 'sorth', 'sortl', 'sorts', 'hue');
	return list;
}
function sortColors6() {
	let list = M.colorList;
	let [bh, bl, bs] = [18, 25, 25];
	for (const x of list) {
		x.sorth = Math.round(x.hue / bh) * bh;
		x.sortl = Math.round(x.lightness * 100 / bl) * bl;
		x.sorts = Math.round(x.sat * 100 / bs) * bs;
	}
	console.log(list[0])
	list = sortByMultipleProperties(M.colorList, 'sortl', 'sorth', 'sorts', 'lightness', 'hue');
	return list;
}
function sortColors7() {
	let list = M.colorList;
	let [bh, bs, bl] = [18, 20, 20];
	for (const x of list) {
		let fg = colorIdealText(x.hex);
		x.fg = fg;
		x.sorth = Math.round(x.hue / bh) * bh;
		x.sortl = Math.round(x.lightness * 100 / bl) * bl;
		x.sorts = Math.round(x.sat * 100 / bs) * bs;
	}
	console.log(list[0])
	list = sortByMultipleProperties(M.colorList, 'fg', 'sorth', 'sorts', 'sortl', 'hue');
	return list;
}
function insertDivs_orig(container) {
	// Create the top div
	const topDiv = document.createElement('div');
	topDiv.style.backgroundColor = 'lightblue'; // Optional styling
	topDiv.style.padding = '10px';
	topDiv.textContent = "Top div - height is auto, grows with content.";
	
	// Create the bottom div
	const bottomDiv = document.createElement('div');
	bottomDiv.style.backgroundColor = 'lightgreen'; // Optional styling
	bottomDiv.style.padding = '10px';
	bottomDiv.style.overflowY = 'scroll';
	bottomDiv.textContent = "Bottom div - scrollable if content overflows.";
	
	// Add some content to the bottom div to demonstrate scrolling
	for (let i = 0; i < 20; i++) {
			const p = document.createElement('p');
			p.textContent = `Scrollable content ${i + 1}`;
			bottomDiv.appendChild(p);
	}

	// Apply CSS to the container to use Grid layout
	container.style.display = 'grid';
	container.style.gridTemplateRows = 'auto 1fr'; // Top div auto, bottom div fills the remaining space
	container.style.height = '100%'; // Ensure container has height constraint
	
	// Append the divs to the container
	container.appendChild(topDiv);
	container.appendChild(bottomDiv);

	return [topDiv,bottomDiv]
}
function insertDivs(container) {
	// Create the top div
	const topDiv = document.createElement('div');
	topDiv.style.backgroundColor = 'lightblue'; // Optional styling
	topDiv.style.padding = '10px';
	topDiv.textContent = "Top div - height is auto, grows with content.";
	
	// Create the bottom div
	const bottomDiv = document.createElement('div');
	bottomDiv.style.backgroundColor = 'lightgreen'; // Optional styling
	bottomDiv.style.padding = '10px';
	bottomDiv.style.overflowY = 'scroll';
	bottomDiv.textContent = "Bottom div - scrollable if content overflows.";
	
	// Add some content to the bottom div to demonstrate scrolling
	for (let i = 0; i < 20; i++) {
			const p = document.createElement('p');
			p.textContent = `Scrollable content ${i + 1}`;
			bottomDiv.appendChild(p);
	}

	// Apply CSS to the container to use Grid layout
	container.style.display = 'grid';
	container.style.gridTemplateRows = 'auto 1fr'; // Top div auto, bottom div fills the remaining space
	container.style.height = '100%'; // Ensure container has height constraint
	
	// Append the divs to the container
	container.appendChild(topDiv);
	container.appendChild(bottomDiv);

	return [topDiv,bottomDiv]
}

function presentImages(){
	let dUpper = mBy('dUpper');	console.log('__________',dUpper);
	
	mClear(dUpper);
	let w=dUpper.offsetWidth-27; console.log('w',w);
	let wi=Math.floor(w/3) - 10;console.log('wi',wi);
	let hi = Math.floor(wi*2/3);
	//let perRow=Math.floor(w/300); console.log('perRow', perRow);
	//let wImg=Math.floor(w/perRow); wImg-=(perRow-1)*10; console.log('wImg', wImg);
	//let hImg=wImg*2/3;
	let images = M.recipes.map(img => '../assets/img/recipes/' + img);
	images.forEach(img => mDom(dUpper, { w:'30%',bg: rColor(), fg: 'contrast', hline: 'normal' }, { tag: 'img', src:img }));
}
function presentImages(){
	let dUpper = mBy('dUpper');
	console.log(dUpper);
	mClear(dUpper);
	let w=dUpper.offsetWidth-40; console.log('w',w);
	let perRow=Math.floor(w/300); console.log('perRow', perRow);
	let wImg=Math.floor(w/perRow); wImg-=(perRow-1)*10; console.log('wImg', wImg);
	let hImg=wImg*2/3;
	let images = M.recipes.map(img => '../assets/img/recipes/' + img);
	images.forEach(img => mDom(dUpper, { w:wImg,h: hImg, bg: rColor(), fg: 'contrast', hline: 'normal' }, { tag: 'img', src:img }));
}
//#endregion

//#region extra unused in frei
function mPage(styles = {}, opts = {}) {
	addKeys({ w: '100vw', h: '100vh', wbox: true, hline: 0, margin: 0 }, styles);
	addKeys({ html: '&nbsp;' }, opts);
	let d1 = mDom(document.body, styles, opts);
	return d1;// mDom(d1, styles, opts);
}
function showStyles(elem) { let st = mGetStyles(elem, ['bg', 'fg']); console.log('styles', st); }
//#endregion

//#region lacuna
async function placeYourMeeple(ev) {
  //console.log('placeYourMeeple',B.counter++);//,ev.target);
  let d = mBy('dCanvas');
  document.onclick = null;
  d.onmousemove = null;
  let sz = rChoose(range(10, 40)); //10;
  let b = mGetStyle(d, 'border-width'); //console.log(b);
  let p = mGetStyle(d, 'padding'); console.log(p);
  x = ev.clientX - d.offsetLeft - b - sz;
  y = ev.clientY - d.offsetTop - b - sz;
  // x = ev.clientX - sz / 2 - d.offsetLeft - d.parentNode.offsetLeft;
  // y = ev.clientY - sz / 2 - d.offsetTop - d.parentNode.offsetTop;
  // x = ev.clientX - sz / 2;// - d.offsetLeft - d.parentNode.offsetLeft;
  // y = ev.clientY - sz / 2;// - d.offsetTop - d.parentNode.offsetTop;
  // let pMeeple = { x: x - sz / 2, y: y - sz / 2, sz, bg: 'black', border: getPlayerProp('color'), id: getUID(), owner: getUname() };
  let pMeeple = { x, y, sz, bg: 'red', border: 'gold', id: getUID(), owner: 'hallo' };
  // fen.meeples.push(jsCopy(pMeeple));//**** */
  drawMeeple(d, pMeeple);
  lookupAddToList(B, ['meeples'], pMeeple);
  let linesActivated = B.linesActivated = getActivatedLines(B.lines);
  console.log('linesActivated', linesActivated);
  B.selectedPoints = [];
  B.endPoints = [];
  B.possiblePairs = [];
  if (linesActivated.length == 1) {
    //grab these points and finish move
    B.selectedPoints.push(linesActivated[0].p1.id);
    B.selectedPoints.push(linesActivated[0].p2.id);
    let res = await lacunaMoveComplete(B.selectedPoints); console.log('res', res);
  } else {
    animateEndpointsOfActivatedLines();
  }
}
function _generateGridPoints(n,w,h){
	const points = [];
	let { rows, cols } = divideRectangleIntoGrid(w, h * .8, n);
	const xSpacing = w / (cols + 1);
	const ySpacing = h / (rows + 1); //console.log(xSpacing, ySpacing);
	let dmin = 10;
	let x, y, xfix, yfix, xlast = -dmin, ylast = -dmin;
	for (let i = 0; i < rows; i++) {
		yfix = (i + .75) * ySpacing;
		for (let j = 0; j < cols; j++) {
			xfix = (j + .75) * xSpacing;
			if (points.length < n) {
				let dx = rand * (Math.random() - 0.5) * xSpacing; if (coin()) dx = -dx;
				let dy = rand * (Math.random() - 0.5) * ySpacing; if (coin()) dy = -dy;
				x = xfix + dx; if (x > xlast && x - xlast < dmin) x += dmin;
				y = yfix + dy; if (y > ylast && y - ylast < dmin) y += dmin;
				xlast = x;
				points.push({ x: Math.round(x), y: Math.round(y) });
			}
			ylast = y
		}
	}
	return points;
}
function drawInteractiveLine0(p1, p2, color = 'black', thickness = 10) {
	const line = document.createElement('div');
	const offs = thickness / 2;
	//let [x1, y1, x2, y2] = [p1.cxPage, p1.cyPage, p2.cxPage, p2.cyPage];
	let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];

	const distance = Math.hypot(x2 - x1, y2 - y1);
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

	// Style the line
	line.className = 'line1';
	line.style.width = `${distance}px`;
	line.style.height = `${thickness}px`;
	line.style.transform = `rotate(${angle}deg)`;
	line.style.left = `${x1}px`;
	line.style.top = `${y1 - offs}px`;
	line.style.backgroundColor = color;
	line.style.opacity = .5;

	// Store line data
	line.dataset.x1 = x1;
	line.dataset.y1 = y1;
	line.dataset.x2 = x2;
	line.dataset.y2 = y2;
	line.dataset.thickness = thickness;

	// Append the line to the body
	document.body.appendChild(line);
	return line;
	//lines.push(line); // Store the line for later reference
}

function generateStar(dParent,x,y){
	let html = `<svg width="100" height="100">
			<polygon points="50 0 86.6 50 100 0 75 35 50 70.7 25 35 0 0" fill="yellow" />
		</svg>`;
	let d=mDom(dParent,{w:100,h:100,pos:'absolute',left:x,top:y},{html});
	return html;
}
function numTranslate(n, newmax, newmin = 0, oldmax = 1000, oldmin = 0) { return Math.round(newmin + (newmax - newmin) * (n - oldmin) / (oldmax - oldmin)); }

function pointFromFen(pfen,dParent,margin){
  //a fen point is 'x_y_type_owner'
  //result should be {x,y,type,owner,div,sz,bg} x on page,y on page,owner may be null
  let rect=getRect(dParent); 
  let [w,h,xoff,yoff] = [rect.w,rect.h,rect.x,rect.y];console.log(w,h,xoff,yoff)
  console.log(pfen)
  const [x, y, type, owner] = pfen.split('_').map(val => isNaN(val) ? val : parseInt(val, 10));
  const p = {
      x: Math.round((x / 1000) * w + xoff+margin), // Convert x to page coordinates
      y: Math.round((y / 1000) * h + yoff+margin), // Convert y to page coordinates
      type,
      owner: owner === 'null' ? null : owner, // Handle null owner
      div: null, // Placeholder for the div element
      sz: 20, //Math.max(10,Math.round(20/1000 * Math.min(w,h))), // Default size (can be adjusted)
      bg: rColor(),//'black' // Default background color (can be adjusted)
  };
  console.log(p)
  p.div=mDom(dParent,{position:'absolute',w:p.sz,h:p.sz,left:p.x - p.sz / 2,top:p.y - p.sz / 2,bg:p.bg},{'data-type':p.type});
  return p;
}

function pointFromFen(fen, w, h, margin, dParent) {
  // Split the FEN string into components
  const [x, y, type, owner] = fen.split('_').map(val => isNaN(val) ? val : parseInt(val, 10));

  // Create a point object with page coordinates
  const p = {
      x: Math.round((x / 1000) * w) + margin, // Convert x to page coordinates
      y: Math.round((y / 1000) * h) + margin, // Convert y to page coordinates
      type,
      owner: owner === 'null' ? null : owner, // Handle null owner
      div: null, // Placeholder for the div element
      sz: 10, // Default size (can be adjusted)
      bg: 'black' // Default background color (can be adjusted)
  };

  // Create the div element representing the point
  let d=mDom(dParent,{position:'absolute',w:p.sz,h:p.sz,left:p.x - p.sz / 2,top:p.y - p.sz / 2,bg:p.bg},{'data-type':p.type});
  // point.div = document.createElement('div');
  // point.div.style.position = 'absolute';
  // point.div.style.width = `${point.sz}px`;
  // point.div.style.height = `${point.sz}px`;
  // point.div.style.left = `${point.x - point.sz / 2}px`; // Center the point div
  // point.div.style.top = `${point.y - point.sz / 2}px`; // Center the point div
  // point.div.style.backgroundColor = point.bg;
  // point.div.setAttribute('data-type', point.type); // Store the type as a data attribute
  // // Append the point div to the parent div
  // dParent.appendChild(point.div);

  return p;
}
async function showInstructionStandard(table, instruction) {
  let myTurn = isMyTurn(table);
  if (!myTurn) staticTitle(table); else animatedTitle();
  if (nundef(instruction)) return;
  let styleInstruction = { hmin:42, display: 'flex', 'justify-content': 'center', 'align-items': 'center' };
  let dinst = mBy('dInstruction');
  if (nundef(dinst)) return;
  mClear(dinst);
  let html;
  if (myTurn) {
    styleInstruction.maleft = -30;
    html = `
        ${getWaitingHtml()}
        <span style="color:red;font-weight:bold;max-height:25px">You</span>
        &nbsp;${instruction};
        `;
  } else { html = `waiting for: ${getTurnPlayers(table)}` }
  mDom(dinst, styleInstruction, { html });
}
async function showInstructionCompact(table, instruction) {
  let myTurn = isMyTurn(table);
  if (!myTurn) staticTitle(table); else animatedTitle();
  if (nundef(instruction)) return;
  let styleInstruction = { hmin:42, display: 'flex', 'justify-content': 'center', 'align-items': 'center' };
  let dinst = mBy('dInstruction');
  if (nundef(dinst)) return;
  mClear(dinst);
  let html;
  if (myTurn) {
    styleInstruction.maleft = -30;
    html = `
        ${getWaitingHtml()}
        <span style="color:red;font-weight:bold;max-height:25px">You</span>
        &nbsp;${instruction};
        `;
  } else { html = `waiting for: ${getTurnPlayers(table)}` }
  mDom(dinst, styleInstruction, { html });
}

async function updateTestButtonsPlayers(table) {
	if (nundef(table)) table = T;
	assertion(table, "NOT TABLE IN updateTestButtonsPlayers")
	let d = mBy('dExtraRight'); mClear(d); //mFlexWrap(d);
	let me = getUname();
	let names = table.playerNames; //addIf(names,'mimi');
	//addIf(names,me);
	let dplayers = mDom(d);
	for (const name of names) {
		let idname = getButtonCaptionName(name);
		let b = UI[idname] = mButton(name, async () => await switchToUser(name), dplayers, { maleft: 4, hpadding: 3, wmin: 50, className: 'button' });
		if (me == name) mStyle(b, { bg: 'red', fg: 'white' });
	}

	if (!table.playerNames.includes(me)) return;

	//mLinebreak(d)
	// let dSwitches=mDom(d,{wmin:200,display:'flex',gap:20,justify:'end',align:'center'});
	// let dbotswitch = mDom(dSwitches, { align: 'right', patop: 6, gap: 6 }, { html: 'BOT' }); mFlexLine(dbotswitch, 'end')
	// let oSwitch = mSwitch(dbotswitch, {}, { id: 'bot', val: amIHuman(table) ? '' : 'checked' });
	// oSwitch.inp.onchange = onchangeBotSwitch;

	// let dautoswitch = mDom(dSwitches, { align: 'right', patop: 10, gap: 6 }, { html: 'AUTO' }); mFlexLine(dautoswitch, 'end')
	// let oSwitch1 = mSwitch(dautoswitch, {}, { id: 'auto', val: DA.autoSwitch===true?'checked':'' });
	// let inp1 = oSwitch1.inp;
	// oSwitch1.inp.onchange = onchangeAutoSwitch;

}

async function showTable(id) {
  let me = getUname();
  let table = await mGetRoute('table', { id });  //console.log('table',table)
  if (!table) { showMessage('table deleted!'); return await showTables('showTable'); }
  let func = DA.funcs[table.game];
  T = table;
  clearMain();
  let d = mBy('dExtraLeft');
  d.innerHTML = `<h2>${getGameProp('friendly').toUpperCase()}: ${table.friendly} (${table.step})</h2>`; // title
  let items = func.present(table);
  func.stats(table);
  if (table.status == 'over') { showGameover(table, 'dTitle'); return; }
  assertion(table.status == 'started', `showTable status ERROR ${table.status}`);
  await updateTestButtonsPlayers(table);
  func.activate(table, items);
}

function instructionUpdate() {
}
function lacuna() {
	function setup(table) {
		let fen = {};

		// table.options.numMeeples = 1;
		// table.options.numPoints = 10;
		// table.options.numColors = 2;

		//console.log(table.options)
		let [w, h, sz, n, neach] = [fen.w, fen.h, fen.sz, fen.n, fen.neach] = [900, 700, 20, table.options.numPoints, table.options.numPoints / table.options.numColors];
		//console.log(n, neach);
		fen.points = lacunaGeneratePoints(w, h, n, neach, sz, .6, true); //console.log(jsCopy(points[0]));

		fen.colorsInUse = Array.from(new Set(fen.points.map(x=>x.bg))); console.log('colorsUsed',fen.colorsInUse)
		for (const name in table.players) {
			let pl = table.players[name];
			pl.score = 0;
			pl.positions = [];
			pl.flowers = {};
			for(const c of fen.colorsInUse){
				pl.flowers[c]=0;
			}
		}

		fen.meeples = [];
		table.plorder = jsCopy(table.playerNames);
		table.turn = [rChoose(table.playerNames)];

		

		return fen;
	}

	function stats(table) {
		let [me, players] = [getUname(), table.players];
		let style = { patop: 8, mabottom: 20, wmin: 80, bg: 'beige', fg: 'contrast' };
		let player_stat_items = uiTypePlayerStats(table, me, 'dStats', 'colflex', style)
		for (const plname in players) {
			let pl = players[plname];
			let item = player_stat_items[plname];
			if (pl.playmode == 'bot') { mStyle(item.img, { rounding: 0 }); }
			let d = iDiv(item); mCenterFlex(d); mLinebreak(d); mIfNotRelative(d);

			
			for(const c in pl.flowers){
				let n=pl.flowers[c];
				playerStatCount(c, n, d); //, {}, {id:`stat_${plname}_score`});	
			}

			
			if (table.turn.includes(plname)) { mDom(d, { position: 'absolute', left: -3, top: 0 }, { html: getWaitingHtml() }); }
		}

	}

	function present(table) {
		B={};
		let dTable = presentBgaRoundTable();
		let fen = table.fen;
		let [w, h, sz, n, neach, points, meeples] = [fen.w, fen.h, fen.sz, fen.n, fen.neach, jsCopy(fen.points), jsCopy(fen.meeples)];
		let padding = 20;
		mStyle(dTable, { bg: 'midnight_purple', position: 'relative', padding, wmin: w + 2 * padding, hmin: h + 2 * padding });
		let dParent = B.dParent = mDom(dTable, { w, h, position: 'absolute', left: 2 * padding, top: 2 * padding }, { id: 'dCanvas' });
		B.points = points; //console.log(points);
		B.sz = sz;
		B.diPoints = lacunaDrawPoints(dParent, points);
		B.meeples = meeples;
		B.diMeeples = lacunaDrawPoints(dParent, meeples);
		//meeples.map(x=>showMeeple(dParent,x));
		return B.points;
	}

	async function activate(table, items) {
		//console.log('activate', table, items);
		await instructionStandard(table, 'must place a meeple'); //browser tab and instruction if any
		if (!isMyTurn(table)) return;
		setTimeout(() => lacunaStartMove(), 10);
	}

	return { setup, present, stats, activate };
}

function drawLine1(p1,p2) {
	// Calculate the distance between the two points (line length)
	let [x1,y1,x2,y2]=[p1.cxPage,p1.cyPage,p2.cxPage,p2.cyPage];
	const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

	// Calculate the angle between the two points
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

	// Create the line div
	const line = document.createElement('div');
	line.className = 'line';
	line.style.height = `${length}px`;
	line.style.transform = `rotate(${angle}deg)`;
	
	// Position the line to be centered on the endpoints
	line.style.left = `${x1}px`;
	line.style.top = `${y1}px`;
	
	// Append the line to the body
	document.body.appendChild(line);

	return line;
}
function onMouseMoveLine1(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  DA.lines.forEach(line => {
    const rect = line.getBoundingClientRect();
    if (
      mouseX >= rect.left && mouseX <= rect.right &&
      mouseY >= rect.top && mouseY <= rect.bottom
    ) {
      line.style.backgroundColor = 'red'; // Change color on hover
    } else {
      line.style.backgroundColor = 'black'; // Reset color when not hovered
    }
  });
}

function pointLineDistance1(px, py, ax, ay, bx, by) {
	const A = px - ax;
	const B = py - ay;
	const C = bx - ax;
	const D = by - ay;
	const dot = A * C + B * D;
	const len_sq = C * C + D * D;
	let param = (len_sq !== 0) ? dot / len_sq : -1;
	let xx, yy;
	if (param < 0) {
		xx = ax;
		yy = ay;
	} else if (param > 1) {
		xx = bx;
		yy = by;
	} else {
		xx = ax + param * C;
		yy = ay + param * D;
	}
	const dx = px - xx;
	const dy = py - yy;
	return Math.sqrt(dx * dx + dy * dy);
}
function pointToLineDistance2(x, y, x1, y1, x2, y2) {
	const numerator = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1);
	const denominator = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
	const distance = numerator / denominator;
	return distance;
}

function drawInteractiveLine0(p1, p2, color = 'black') {
	const line = document.createElement('div');
	let thickness = 10; let offs = thickness / 2;
	let [x1, y1, x2, y2] = [p1.cxPage, p1.cyPage, p2.cxPage, p2.cyPage];

	const distance = Math.hypot(x2 - x1, y2 - y1);
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
	line.style.position = 'absolute';
	line.style.transformOrigin = '0 0';
	line.style.transform = `rotate(${angle}deg)`;
	line.style.height = '2px';
	line.style.outline = 'solid red 11px';
	line.style.width = `${distance}px`;
	line.style.backgroundColor = color;
	line.style.left = `${x1}px`;
	line.style.top = `${y1}px`;

	line.addEventListener('mouseover', () => { line.style.backgroundColor = 'red'; });
	line.addEventListener('mouseout', () => { line.style.backgroundColor = color; });

	document.body.appendChild(line);
	return line;
}
function drawInteractiveLine1(p1, p2, color = 'black') {
	const line = document.createElement('div');
	const thickness = 20; // Set the line thickness (height) to 20px
	const offs = thickness / 2; 
	let [x1, y1, x2, y2] = [p1.cxPage, p1.cyPage, p2.cxPage, p2.cyPage];

	const distance = Math.hypot(x2 - x1, y2 - y1);
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

	// Style the line
	line.style.position = 'absolute';
	line.style.transformOrigin = '0 50%';  // Rotate around the center of the thickness
	line.style.transform = `rotate(${angle}deg)`;
	line.style.height = `${thickness}px`;
	line.style.width = `${distance}px`;
	line.style.backgroundColor = color;

	// Position the line so that it's centered on its original location
	line.style.left = `${x1}px`;
	line.style.top = `${y1 - offs}px`;  // Adjust top by half of thickness

	// Interactive color change
	line.addEventListener('mouseover', () => { line.style.backgroundColor = 'red'; });
	line.addEventListener('mouseout', () => { line.style.backgroundColor = color; });

	// Append the line to the body
	document.body.appendChild(line);
	return line;
}
function drawInteractiveLine2(p1, p2, color = 'black') {
	const line = document.createElement('div');
	const thickness = 20; // Set the line thickness (height) to 20px
	const offs = thickness / 2; 
	let [x1, y1, x2, y2] = [p1.cxPage, p1.cyPage, p2.cxPage, p2.cyPage];

	const distance = Math.hypot(x2 - x1, y2 - y1);
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

	// Style the line
	line.style.position = 'absolute';
	line.style.transformOrigin = '0 50%';  // Rotate around the center of the thickness
	line.style.transform = `rotate(${angle}deg)`;
	line.style.height = `${thickness}px`;
	line.style.width = `${distance}px`;
	line.style.backgroundColor = color;

	// Position the line so that it's centered on its original location
	line.style.left = `${x1}px`;
	line.style.top = `${y1 - offs}px`;  // Adjust top by half of thickness

	document.body.appendChild(line);
	return line;
}
function drawInteractiveLine00(p1, p2, color='black') {
	const line = document.createElement('div');
	let thickness = 10; let offs = thickness/2;
	let [x1,y1,x2,y2]=[p1.cxPage,p1.cyPage,p2.cxPage,p2.cyPage];
	// let [x1,y1,x2,y2]=[p1.cxPage-offs,p1.cyPage-offs,p2.cxPage-offs,p2.cyPage-offs];
	// let [x1,y1,x2,y2]=[p1.cxPage,p1.cyPage-offs,p2.cxPage,p2.cyPage-offs];

	const distance = Math.hypot(x2 - x1, y2 - y1);
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
	line.style.position = 'absolute';
	line.style.transformOrigin = '0 0';
	line.style.transform = `rotate(${angle}deg)`;
	line.style.height = '2px';
	line.style.outline = 'solid red 11px';
	line.style.width = `${distance}px`;
	line.style.backgroundColor = color;
	line.style.left = `${x1}px`;
	line.style.top = `${y1}px`;

	line.addEventListener('mouseover', () => {		line.style.backgroundColor = 'red';	});
	line.addEventListener('mouseout', () => {		line.style.backgroundColor = color;	});

	document.body.appendChild(line);
	return line;
}
//#endregion

//#region lacuna NOT in game
function lacunaMakeSelectable() {
	for (const id of B.endPoints) {
		let div = mBy(id);
		mClass(div, 'selectable')
		div.onclick = ev => lacunaSelectPoint(ev);
	}
}
function lacunaMoveCompleted(idlist) {
	B.endPoints.map(x => lacunaUnselectable(x));
	showMessage("Move completed, removing", idlist);
	if (idlist.length == 2) {
		let p1 = B.diPoints[idlist[0]];
		let p2 = B.diPoints[idlist[1]];
		delete B.diPoints[p1.id];
		delete B.diPoints[p2.id];
		mRemove(p1.div);
		mRemove(p2.div);
		B.points = B.points.filter(x => x.id != p1.id && x.id != p2.id);
	}
	//remove hotspots 
	for (const p of B.hotspotList) { mRemove(p.div); }
	let ch = arrChildren(B.dParent); console.log('ch', ch.length, 'points', B.points.length);
	B.selectedPoints = [];
	B.dParent.onclick = lacunaStartMove;
}
function lacunaSelectPoint(ev) {
	let id = evToId(ev);
	let p = B.diPoints[id];
	console.log('selecting point', p.id);
	lookupAddIfToList(B, ['selectedPoints'], id); console.log(B.selectedPoints.length)
	assertion(B.selectedPoints.length >= 1, "WTF");
	if (B.selectedPoints.length == 1) {
		let eps = [];
		console.log('possiblePairs', B.possiblePairs);
		for (const pair of B.possiblePairs.map(x => x.split(',').map(x => B.diPoints[x]))) {
			let p1 = pair[0];
			let p2 = pair[1];
			if (p1.id != id && p2.id != id) continue;
			if (p1.id == id) addIf(eps, p2.id); else addIf(eps, p1.id);
		}
		let unselect = B.endPoints.filter(x => !eps.includes(x));
		unselect.map(x => lacunaUnselectable(x));
		B.endPoints = eps; console.log('endPoints remaining', B.endPoints);
		if (B.endPoints.length < 2) {
			B.selectedPoints.push(B.endPoints[0]);
			lacunaMoveCompleted(B.selectedPoints);
		}
	} else {
		assertion(B.selectedPoints.length == 2, "WTF2!!!!!!!!!!!!!");
		lacunaMoveCompleted(B.selectedPoints);
	}
}
function placeYourMeeple(ev) {
	stopPulsing();
	d = mBy('dCanvas');
	d.onmousemove = null;
	d.onclick = null;
	for (const p of B.hotspotList) {
		mStyle(p.div, { z: 0 })
	}
	for (const p of B.points) {
		p.div.style.zIndex = 1000;
	}
	let sz = 20;
	x = ev.clientX - d.offsetLeft - d.parentNode.offsetLeft;
	y = ev.clientY - d.offsetTop - d.parentNode.offsetTop;
	let color = getPlayerProp('color'); console.log('color', color)
	let pMeeple = { x: x - sz / 2, y: y - sz / 2, sz, bg: 'black', id: getUID() };
	lacunaDrawPoints(d, [pMeeple], false);
	mStyle(iDiv(pMeeple), { border: `${color} 5px solid` })
	B.meeples.push(pMeeple); console.log('B.meeples', B.meeples);

	//TODO: if only 2 points are selectable, just grab them and finish move!
	if (B.endPoints.length == 0) {
		//finish move without grabbing any flowers
		lacunaMoveCompleted([]);

	} else if (B.endPoints.length == 2) {
		//grab those flowers and finish move
		B.selectedPoints.push(B.endPoints[0]);
		B.selectedPoints.push(B.endPoints[1]);
		lacunaMoveCompleted(B.selectedPoints);

	} else lacunaMakeSelectable();
}

//#endregion

//#region lacuna_unused
function _drawPoints(dParent, points) {
	return points.map(p => placeCircle(dParent, p.x, p.y, valf(p.sz, 20), valf(p.bg, rColor())));
}
function alertOnPointClick(elem, di, threshold = 2) {
	elem.addEventListener('click', (ev) => {
		const rect = elem.getBoundingClientRect();
		const mouseX = ev.clientX - rect.left;
		const mouseY = ev.clientY - rect.top;
		let [xs, ys] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
		let mx1 = xs.lower;
		let mx2 = xs.higher;
		let my1 = ys.lower;
		let my2 = ys.higher;
		stopAnimatingPoints();
		if (mx1 - 2 <= mouseX && mouseX <= mx2 && my1 - 2 <= mouseY && mouseY <= my2) {
			B.mousePoint = { x: mouseX, y: mouseY };
			key = getXYKey(mx1, my1);
			let entry = lookup(di, [key]);
			if (entry) {
				B.pairInfo = entry;
				console.log(`Mouse over point (${mx1} (${mouseX}),${my1} (${mouseY}))`, entry);
				for (const id of entry) {
					mClass(id, ani)
				}
			}
		}
	});
}
function alertOnPointClickPair(elem, di, threshold = 2) {
	elem.addEventListener('click', (ev) => {
		const rect = elem.getBoundingClientRect();
		const mouseX = ev.clientX - rect.left;
		const mouseY = ev.clientY - rect.top;
		let [xs, ys] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
		let mx1 = xs.lower;
		let mx2 = xs.higher;
		let my1 = ys.lower;
		let my2 = ys.higher;
		stopAnimatingPairs();
		if (mx1 - 2 <= mouseX && mouseX <= mx2 && my1 - 2 <= mouseY && mouseY <= my2) {
			B.mousePoint = { x: mouseX, y: mouseY };
			key = getXYKey(mx1, my1);
			let entry = lookup(di, [key]);
			if (entry) {
				B.pairInfo = entry;
				if (entry.length == 1) {
					console.log(`pair ${entry[0]} is removed`);
					lacunaRemovePair(entry[0]);
				} else {
					console.log(`user will choose pair from`, entry);
				}
			}
		}
	});
}
async function alertOnPointClickPairHandler(ev) {
	let [dParent, di] = [B.info.dParent, B.info.di];
	dParent.onmousemove = null;
	dParent.onclick = null;
	const rect = dParent.getBoundingClientRect();
	const mouseX = ev.clientX - rect.left;
	const mouseY = ev.clientY - rect.top;
	let [xs, ys] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
	let mx1 = xs.lower;
	let mx2 = xs.higher;
	let my1 = ys.lower;
	let my2 = ys.higher;
	if (mx1 - 2 <= mouseX && mouseX <= mx2 && my1 - 2 <= mouseY && mouseY <= my2) {
		B.mousePoint = { x: mouseX, y: mouseY };
		key = getXYKey(mx1, my1);
		let entry = lookup(di, [key]);
		if (entry) {
			B.pairInfo = entry;
			if (entry.length == 1) {
				stopAnimatingPairs();
				B.selectedPairIds = entry[0].split(',');
				console.log(`pair ${entry[0]} is removed`);
				lacunaRemovePair(entry[0]);
			} else {
				B.selectedPairIds = [];
				lacunaSelectPair(entry);
			}
		}
	}
}
function alertOnPointHover(elem, di, threshold = 2) {
	elem.addEventListener('mousemove', (ev) => {
		const rect = elem.getBoundingClientRect();
		const mouseX = ev.clientX - rect.left;
		const mouseY = ev.clientY - rect.top;
		let [xs, ys] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
		let mx1 = xs.lower;
		let mx2 = xs.higher;
		let my1 = ys.lower;
		let my2 = ys.higher;
		stopAnimatingPoints();
		if (mx1 - 2 <= mouseX && mouseX <= mx2 && my1 - 2 <= mouseY && mouseY <= my2) {
			B.mousePoint = { x: mouseX, y: mouseY };
			key = getXYKey(mx1, my1);
			let entry = lookup(di, [key]);
			if (entry) {
				startAnimatingPoints(entry)
			}
		}
	});
}
function alertOnPointHoverPair(elem, di, threshold = 2) {
	elem.addEventListener('mousemove', (ev) => {
		const rect = elem.getBoundingClientRect();
		const mouseX = ev.clientX - rect.left;
		const mouseY = ev.clientY - rect.top;
		let [xs, ys] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
		let mx1 = xs.lower;
		let mx2 = xs.higher;
		let my1 = ys.lower;
		let my2 = ys.higher;
		stopAnimatingPairs();
		if (mx1 - 2 <= mouseX && mouseX <= mx2 && my1 - 2 <= mouseY && mouseY <= my2) {
			B.mousePoint = { x: mouseX, y: mouseY };
			key = getXYKey(mx1, my1);
			let entry = lookup(di, [key]);
			if (entry) {
				startAnimatingPairs(entry)
			}
		}
	});
}
function alertOnPointHoverPairHandler(ev) {
	let [dParent, di] = [B.info.dParent, B.info.di];
	const rect = dParent.getBoundingClientRect();
	const mouseX = ev.clientX - rect.left;
	const mouseY = ev.clientY - rect.top;
	let [xs, ys] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
	let mx1 = xs.lower;
	let mx2 = xs.higher;
	let my1 = ys.lower;
	let my2 = ys.higher;
	stopAnimatingPairs();
	if (mx1 - 10 <= mouseX && mouseX <= mx2 + 5 && my1 - 10 <= mouseY && mouseY <= my2 + 5) {
		B.mousePoint = { x: mouseX, y: mouseY };
		key = getXYKey(mx1, my1);
		let entry = lookup(di, [key]);
		if (entry) {
			startAnimatingPairs(entry)
		}
	}
}
function filterIsolatedPairs(pairs, blockers, threshold = 10) {
	console.log(pairs, blockers);
	let newPairs = [];
	for (const pair of pairs) {
		const [ax, ay] = [pair[0].x, pair[0].y];
		const [bx, by] = [pair[1].x, pair[1].y];
		let isIsolated = true;
		for (const blocker of blockers) {
			const [px, py] = [blocker.x, blocker.y];
			const distance = pointToLineDistance(px, py, ax, ay, bx, by);
			if (distance < threshold) {
				isIsolated = false;
				break;
			}
		}
		if (isIsolated) {
			newPairs.push(pair);
		}
	}
	return newPairs;
	const isolatedPairs = [], obstaclePairs = [];
	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			if (nodes[i].bg != nodes[j].bg) continue;
			const [ax, ay] = [nodes[i].x, nodes[i].y];
			const [bx, by] = [nodes[j].x, nodes[j].y];
			let isIsolated = true;
			for (let k = 0; k < nodes.length; k++) {
				if (k === i || k === j) continue;
				const [px, py] = [nodes[k].x, nodes[k].y];
				const distance = pointLineDistance(px, py, ax, ay, bx, by);
				if (distance < threshold) {
					isIsolated = false;
					break;
				}
			}
			let pair = nodes[i].x <= nodes[j].x ? [nodes[i], nodes[j]] : [nodes[j], nodes[i]]; //console.log(pair[0].x,pair[1].x);
			assertion(pair[0].x <= pair[1].x, "NOT SORTED!!!!!!!!!!!!!!!!");
			if (isIsolated) {
				isolatedPairs.push(pair);
			} else {
				obstaclePairs.push(pair);
			}
		}
	}
	return { isolatedPairs, obstaclePairs };
}
function findClosePairs(points, x, y, threshold = 3) {
	function pointLineDistance(px, py, ax, ay, bx, by) {
		const A = px - ax;
		const B = py - ay;
		const C = bx - ax;
		const D = by - ay;
		const dot = A * C + B * D;
		const len_sq = C * C + D * D;
		let param = (len_sq !== 0) ? dot / len_sq : -1;
		let xx, yy;
		if (param < 0) {
			xx = ax;
			yy = ay;
		} else if (param > 1) {
			xx = bx;
			yy = by;
		} else {
			xx = ax + param * C;
			yy = ay + param * D;
		}
		const dx = px - xx;
		const dy = py - yy;
		return Math.sqrt(dx * dx + dy * dy);
	}
	const closePairs = [];
	for (let i = 0; i < points.length; i++) {
		for (let j = i + 1; j < points.length; j++) {
			const [ax, ay] = [points[i].x, points[i].y];
			const [bx, by] = [points[j].x, points[j].y];
			const distance = pointLineDistance(x, y, ax, ay, bx, by);
			if (distance < threshold) {
				closePairs.push([points[i], points[j]]);
			}
		}
	}
	return closePairs;
}
function findIsolatedPairs(nodes, threshold = 3) {
	function _pointLineDistance(px, py, ax, ay, bx, by) {
		const A = px - ax;
		const B = py - ay;
		const C = bx - ax;
		const D = by - ay;
		const dot = A * C + B * D;
		const len_sq = C * C + D * D;
		let param = (len_sq !== 0) ? dot / len_sq : -1;
		let xx, yy;
		if (param < 0) {
			xx = ax;
			yy = ay;
		} else if (param > 1) {
			xx = bx;
			yy = by;
		} else {
			xx = ax + param * C;
			yy = ay + param * D;
		}
		const dx = px - xx;
		const dy = py - yy;
		return Math.sqrt(dx * dx + dy * dy);
	}
	const isolatedPairs = [], obstaclePairs = [];
	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			if (nodes[i].bg != nodes[j].bg) continue;
			const [ax, ay] = [nodes[i].x, nodes[i].y];
			const [bx, by] = [nodes[j].x, nodes[j].y];
			let isIsolated = true;
			for (let k = 0; k < nodes.length; k++) {
				if (k === i || k === j) continue;
				const [px, py] = [nodes[k].x, nodes[k].y];
				const distance = pointLineDistance(px, py, ax, ay, bx, by);
				if (distance < threshold) {
					isIsolated = false;
					break;
				}
			}
			let pair = nodes[i].x <= nodes[j].x ? [nodes[i], nodes[j]] : [nodes[j], nodes[i]]; //console.log(pair[0].x,pair[1].x);
			assertion(pair[0].x <= pair[1].x, "NOT SORTED!!!!!!!!!!!!!!!!");
			if (isIsolated) {
				isolatedPairs.push(pair);
			} else {
				obstaclePairs.push(pair);
			}
		}
	}
	return { isolatedPairs, obstaclePairs };
}
function generateHotspotsNOY(dParent, pointPairs, sz = 20, color = 'red') {
	let hotspots = [];
	let linesByPair = {};
	for (const pair of pointPairs) {
		let ids = pair.map(x => x.id);
		let key = ids.join(',');
		let [pStart, pEnd] = [Items[ids[0]], Items[ids[1]]];
		let line = getEquidistantPoints(pStart, pEnd, sz / 2);
		for (const p of line) {
			p.bg = color;
			p.sz = sz;
			p.start = ids[0];
			p.end = ids[1];
			p.startX = pStart.x;
			p.endX = pEnd.x;
			p.id = getUID();
			p.pairs = [key];
			hotspots.push(p);
		}
		linesByPair[key] = line;
	}
	B.hotspots = lacunaDrawPoints(dParent, hotspots);
	hotspots.map(x => mStyle(x.div, { opacity: 0 }))
	let [c1, c2, c3, c4, c5, c6] = [0, 0, 0, 0, 0, 0];
	for (const p1 of hotspots) {
		assertion(p1.startX <= p1.endX, "NOT SORTED!!!!!")
		for (const p2 of hotspots) {
			if (p1 == p2) { c3++; continue; }
			if (p1.startX > p2.endX) { c1++; continue; }
			if (p2.startX > p1.endX) { c2++; continue; }
			if (p1.start == p2.start && p1.end == p2.end) { c4++; continue; }
			if (p1.start == p2.end && p1.end == p2.start) { c5++; continue; }
			c6++;
			let dist = getDistanceBetweenPoints(p1, p2);
			if (dist < sz / 3) {
				let newlist = new Set(p1.pairs.concat(p2.pairs));
				p1.pairs = Array.from(newlist);
				p2.pairs = Array.from(newlist);
			}
		}
	}
	return [hotspots, linesByPair];
}
function lacunaCalculate() {
	let { dParent, cv, w, h, sz, points } = B.info;
	let result = findIsolatedPairs(points, sz);
	let pixelsByPair = [];
	let di = {};
	let allPixels = [];
	for (const pair of result.isolatedPairs) {
		let [p1, p2] = [pair[0], pair[1]];
		let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];
		[x1, y1, x2, y2] = [x1, y1, x2, y2].map(x => x + sz / 2);
		let pixels = getLinePixels(x1, y1, x2, y2);
		for (const pix of pixels) {
			allPixels.push(pix);
			let key = getPixelKey(pix);
			let l = lookup(di, [key]);
			lookupAddIfToList(di, [key], `${p1.id},${p2.id}`)
		}
	}
	let di1 = B.info.di = clusterize(di);
	dParent.onmousemove = alertOnPointHoverPairHandler;
	dParent.onclick = alertOnPointClickPairHandler;
}
function lacunaCircles(w = 800, h = 400, n = 49, neach = 7, sz = 10) {
	let d = clearFlex();
	let rand = .8;
	let [d1, cv] = mArea(30, d, { w, h, bg: '#eee', position: 'relative' });
	let clist = lacunaColors();
	let points = generateRandomPointsRect(n, w, h, rand);
	let colors = generateRepeatedColors(n, neach, clist); arrShuffle(colors);
	for (let i = 0; i < n; i++) { points[i].bg = colors[i]; points[i].sz = sz; }
	for (const p of points) { drawCircleOnCanvas(cv, p.x, p.y, p.sz, p.bg); }
	return { d, cv, points };
}
function lacunaCirclesDiv(w = 800, h = 400, n = 49, neach = 7, sz = 10) {
	let d = clearFlex();
	let rand = .8;
	let [d1, cv] = mArea(30, d, { w, h, bg: '#eee', position: 'relative' });
	cv.remove();
	let clist = lacunaColors();
	let points = generateRandomPointsRect(n, w, h, rand);
	let colors = generateRepeatedColors(n, neach, clist); arrShuffle(colors);
	for (let i = 0; i < n; i++) { points[i].bg = colors[i]; points[i].sz = sz; }
	points = points.map(p => drawCircleOnDiv(d1, p.x, p.y, p.sz, p.bg));
	return { d, points };
}
function lacunaPresent() {
	let d = clearDiv();
	let [w, h, sz] = [900, 400, 20];
	let [dParent, cv] = mArea(10, d, { w, h, bg: '#eee' }); //mDom(d, { w, h, position: 'absolute', left: dx, top: dy, bg: 'yellow' });
	let points = mLacunaCirles(dParent, 49, 7, sz, .6);
	Items = drawPoints(dParent, points);
	DA.info = { dParent, cv, w, h, sz, points };
	lacunaCalculate();
}
function lacunaSelectPair(ev, pdiv, divs) {
	for (const div of divs) {
		mStyle(div, { cursor: 'pointer' })
		div.onclick = ev => lacunaSelectPoint(div, divs);
	}
}
function startAnimatingPairs(pairlist) {
	let ani = 'pulseFastInfinite'
	B.pairInfo = pairlist;
	for (const pair of pairlist) {
		let ids = pair.split(',');
		for (const id of ids) {
			let o = Items[id];
			mClass(id, ani)
		}
	}
}
function startAnimatingPoints(idlist) {
	let ani = 'pulseFastInfinite'
	B.pairInfo = idlist;
	for (const id of idlist) {
		mClass(id, ani)
	}
}
function stopAnimatingPairs() {
	let ani = 'pulseFastInfinite'
	if (nundef(B.pairInfo)) B.pairInfo = [];
	for (const p of B.pairInfo) {
		let ids = p.split(',');
		for (const id of ids) {
			let o = Items[id];
			if (nundef(o)) continue;
			mClassRemove(id, ani)
		}
	}
}
function stopAnimatingPoints() {
	let ani = 'pulseFastInfinite'
	if (nundef(B.pairInfo)) B.pairInfo = [];
	for (const p of B.pairInfo) {
		let o = Items[p]; console.log(o);
		mClassRemove(p, ani)
	}
}
//#endregion

//#region ode anfang von lacuna

function placeCircles(canvas, n) {
	// // Example usage
	// const canvas = document.getElementById('canvas');
	// placeCircles(canvas, 20);

	const ctx = canvas.getContext('2d');
	const width = canvas.width;
	const height = canvas.height;

	const rows = Math.floor(Math.sqrt(n));
	const cols = Math.ceil(n / rows);

	const cellWidth = width / cols;
	const cellHeight = height / rows;

	const radius = Math.min(cellWidth, cellHeight) / 5;

	ctx.clearRect(0, 0, width, height);

	for (let i = 0; i < n; i++) {
		const row = Math.floor(i / cols);
		const col = i % cols;

		const x = col * cellWidth + (Math.random() * (cellWidth - 2 * radius) + radius);
		const y = row * cellHeight + (Math.random() * (cellHeight - 2 * radius) + radius);

		drawCircleOnCanvas(ctx, x, y, radius);
	}
}
function drawCircleOnCanvas(ctx, x, y, radius) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fillStyle = 'blue';
	ctx.fill();
	ctx.stroke();
}
function mCanvas(dParent, styles = {}, bstyles = {}, play = null, pause = null, origin = 'tl') {
  let cv = mCreate('canvas');
  mAppend(toElem(dParent), cv);
  addKeys({ w: 500, h: 500, bg: '#222', rounding: 10 }, styles);
  mStyle(cv, styles);
  let [w, h] = [cv.width, cv.height] = [styles.w, styles.h];
	return cv;
}

function siebenVonJederFarbe() {
	let colors = {
		"Red": "#E63946",
		"Green": "#06D6A0",
		"Blue": "#118AB2",
		"Cyan": "#0F4C75",
		"Magenta": "#D81159",
		"Yellow": "#FFD166",
		"Orange": "#F4A261",
		"Purple": "#9D4EDD",
		"Pink": "#FF80AB",
		"Brown": "#8D6E63",
		"Lime": "#A7FF83",
		"Indigo": "#3A0CA3",
		"Violet": "#B5838D",
		"Gold": "#F5C518",
		"Teal": "#008080"
	}
	let list = [];
	for (const c of rChoose(Object.values(colors), 7)) {
		for (const i of range(7)) list.push(c);
	}
	arrShuffle(list);

	return list;
}

function rPositions(width,height, n) {
	const rows = Math.floor(Math.sqrt(n));
	const cols = Math.ceil(n / rows);
	const cellWidth = width / cols;
	const cellHeight = height / rows;
	const radius = Math.min(cellWidth, cellHeight) / 5;

	let list=[];
	for (let i = 0; i < n; i++) {
		const row = Math.floor(i / cols);
		const col = i % cols;
		const x = col * cellWidth + (Math.random() * (cellWidth - 2 * radius) + radius);
		const y = row * cellHeight + (Math.random() * (cellHeight - 2 * radius) + radius);
		list.push({x,y});
	}
	return {list,radius};
}

function placeCircles1(container, n) {
	const width = container.clientWidth;
	const height = container.clientHeight;
	const radius = Math.min(width, height) / 2;

	const circleRadius = 10; // Radius of the circles to be placed
	const minDistance = circleRadius * 3; // Minimum distance between circles
	const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Approx. 137.5 degrees in radians

	// Clear existing circles
	while (container.firstChild) {
			container.removeChild(container.firstChild);
	}

	const circles = [];

	// Generate points with slight randomness for more varied distribution
	for (let i = 0; i < n; i++) {
			let valid = false;
			let x, y;

			while (!valid) {
					const angle = i * goldenAngle + (Math.random() - 0.5) * goldenAngle * 0.2;
					const distance = radius * Math.sqrt(i / n) + (Math.random() - 0.5) * radius * 0.1;

					x = radius + distance * Math.cos(angle);
					y = radius + distance * Math.sin(angle);

					valid = true;
					for (const circle of circles) {
							const dx = circle.x - x;
							const dy = circle.y - y;
							if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
									valid = false;
									break;
							}
					}
			}

			circles.push({ x, y });

			// Create and position the circle
			const circle = document.createElement('div');
			circle.classList.add('circle');
			circle.style.width = `${circleRadius * 2}px`;
			circle.style.height = `${circleRadius * 2}px`;
			circle.style.left = `${x - circleRadius}px`;
			circle.style.top = `${y - circleRadius}px`;
			container.appendChild(circle);
	}
}

function placeCircles1(container, n) {
	const width = container.clientWidth;
	const height = container.clientHeight;
	const radiusX = width / 2;
	const radiusY = height / 2;

	const circleRadius = 10; // Radius of the circles to be placed
	const minDistance = circleRadius * 2; // Minimum distance between circles
	const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Approx. 137.5 degrees in radians

	// Clear existing circles
	while (container.firstChild) {
			container.removeChild(container.firstChild);
	}

	const circles = [];

	// Generate points with slight randomness for more varied distribution
	for (let i = 0; i < n; i++) {
			let valid = false;
			let x, y;

			while (!valid) {
					const angle = i * goldenAngle + (Math.random() - 0.5) * goldenAngle * 0.2;
					const distance = Math.sqrt(i / n);

					// Calculate x and y within the ellipse
					x = radiusX + distance * radiusX * Math.cos(angle);
					y = radiusY + distance * radiusY * Math.sin(angle);

					valid = true;
					for (const circle of circles) {
							const dx = circle.x - x;
							const dy = circle.y - y;
							if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
									valid = false;
									break;
							}
					}
			}

			circles.push({ x, y });

			// Create and position the circle
			const circle = document.createElement('div');
			circle.classList.add('circle');
			circle.style.width = `${circleRadius * 2}px`;
			circle.style.height = `${circleRadius * 2}px`;
			circle.style.left = `${x - circleRadius}px`;
			circle.style.top = `${y - circleRadius}px`;
			container.appendChild(circle);
	}
}


//#endregion

//#region bau4 von august 24 24




function arrSort(arr) {
  return arr.sort((a, b) => {
    // Convert both elements to strings for comparison
    const aStr = a.toString();
    const bStr = b.toString();

    // Use localeCompare to handle string comparison
    return aStr.localeCompare(bStr, undefined, { numeric: true });
  });
}
async function mPostYaml(o,path){
	return await mPostRoute('postYaml',{o,path});
}
function trimToAlphanum(str,allow_=true) {
  return str.replace(/^[^a-zA-Z0-9_]+|[^a-zA-Z0-9_]+$/g, '');
}
function normalizeString(s, sep = '_', keep = []) {
  s = s.toLowerCase().trim();
  let res = '';
  for (let i = 0; i < s.length; i++) { if (isAlphaNum(s[i]) || keep.includes(s[i])) res += s[i]; else if (last(res)!=sep) res += sep; }
  return res;
}
function replaceAllSpecialCharsFromList(str, list, sBy, removeConsecutive=true) { 
	for(const sSub of list){
		str=replaceAllSpecialChars(str,sSub,sBy);
	}
	if (removeConsecutive){
		let sresult='';
		while(str.length>0){
			let sSub=str.substring(0,sBy.length);
			str = stringAfter(str,sSub);
			if (sSub == sBy && sresult.endsWith(sBy)) continue;
			sresult += sSub;
			if (str.length<sBy.length) {sresult+=str;break;}
		}
		str=sresult;
	}
	return str;
}
function superTrim(s){
	// Remove all tab or newline characters and trim spaces
	s = s.replace(/[\t\n]/g, ' ').trim();

	// Replace multiple consecutive spaces with a single space
	s = s.replace(/\s\s+/g, ' ');

	// Remove the last semicolon if present
	if (s.endsWith(';')) {
		s = s.slice(0, -1);
	}

}
function extractWords(s, allowed) {
	let specialChars = getSeparators(allowed);
	let parts = splitAtAnyOf(s, specialChars.join('')).map(x => x.trim());
	return parts.filter(x => !isEmpty(x));
}
function getSeparators(allowed) {
	let specialChars = toLetters(' ,-.!?;:');
	if (isdef(allowed)) specialChars = arrMinus(specialChars, toLetters(allowed));
	return specialChars;
}

function toListEntry(s,sep = '_', keep = []) {
	let nogo3=['and'];


}

async function askWiki(query) {
	if (isEmpty(query)) return 'NO QUERY!';
	let response = await mGetRoute('wiki', { question: query });
	return response;
}
async function askHuggingFace(question) {
	//gratis: hugging_face
	if (isEmpty(question)) return 'NO QUESTION!';
	let response = await mGetRoute('fetch_answer', { question });
	return lookup(response, ['answer']) ?? 'ERROR';
}
async function askOpenai(prompt) {
	if (nundef(prompt)) prompt = 'list of 100 very different documentary subjects?';
	let answer = await mPostRoute('ask', { prompt });
	return answer;
}
async function askOpenaiKeyword(word, category = null) {
	if (!category) category = 'def';
	let res = await mPostRoute('ask_details', { word, category });
	return res;
	// if (nundef(word)) return; //prompt = 'list of 100 very different documentary subjects?';
	// //let prompt = pYamlDetails(word,category); =>app.js
	// let answer = await mPostRoute('ask', { prompt });
	// if (answer.includes('```')) answer = stringBeforeLast(stringAfter(answer,'\n'),'\n');
	// let o= jsyaml.load(answer);//console.log('o',o,typeof o);
	// return o;
}
async function askOpenaiListOf(word, num = 100) {
	let res = await mPostRoute('ask_list', { word, num });
	return res;
	// if (nundef(word)) return; //prompt = 'list of 100 very different documentary subjects?';
	// //let prompt = pYamlDetails(word,category); =>app.js
	// let answer = await mPostRoute('ask', { prompt });
	// if (answer.includes('```')) answer = stringBeforeLast(stringAfter(answer,'\n'),'\n');
	// let o= jsyaml.load(answer);//console.log('o',o,typeof o);
	// return o;
}
function pListOf(what) { return 'list of 100 ' + what.toLowerCase(); }
function pYamlDetails(keyword, type, props) {
	if (nundef(props)) {
		switch (type) {
			case 'animal': props = 'class, color, food, habitat, lifespan, name, offsprings, reproduction, size, species, weight'; break;
			case 'location': props = 'population, size, longitude, latitude'; break;
			default: props = 'definition, synonyms, antonyms, german, spanish, french'; break;
		}
	}
	let p = `information about ${keyword}, formatted as yaml object with the following properties: `;
	p += props + '.';
	p += `property values should if possible contain numeric information in scientific (European) metrics.`
	return p;
}
function showYaml(o, title, dParent, styles = {}, opts = {}) {
	o = toFlatObject(o);
	//return showObject(o, null, dParent, styles, addKeys({ title }, opts));
	let d = mDom(dParent,styles,opts); 
	mDom(d, {}, { tag: 'h2', html: title }); 
	let keys = Object.keys(o); 
	let grid = mGrid(keys.length,2,d,{rounding:8,padding:4,bg:'#eee',wmax:500},{wcols:'auto'});
	let cellStyles = {hpadding:4};
	if (isList(o)){
		arrSort(o);
		o.map((x,i)=>{mDom(grid,{fg:'red',align:'right'},{html:i});mDom(grid,{maleft:10},{html:x});});
	}else if (isDict(o)){
		keys.sort();
		for(const k of keys){
			mDom(grid,{fg:'red',align:'right'},{html:k})
			mDom(grid,{maleft:10},{html:o[k]});
		}
	}
	return d;
	// mDom(d, {}, { tag:'pre', html: o });

}
function recFlatten(o) {
	if (isLiteral(o)) return o;
	else if (isList(o)) return o.map(x => recFlatten(x)).join(', ');
	else if (isDict(o)) {
		let valist = [];
		for (const k in o) { let val1 = recFlatten(o[k]); valist.push(`${k}: ${val1}`); }
		return valist.join(', ');
	}
}
function toFlatObject(o) {
	if (isString(o)) return { details: o };
	for (const k in o) { let val = o[k]; o[k] = recFlatten(val); }
	return o;
}
function trimQuotes(str) { return str.replace(/^['"`]+|['"`]+$/g, ''); }



//#endregion

//#region lacuna zeug vor august 24
function mist(){
	addIf(DA.selectedPairIds, id);
	let poss = DA.pairInfo.filter(x => x.includes(id));
	assertion(poss.length >= 1, 'no pair selected')
	if (poss.length == 1) {
		lacunaRemovePair(poss[0]);
	} else if (DA.selectedPairIds.length == 2) {
		lacunaRemovePair(DA.selectedPairIds.join(','));
	} else {
		//console.log(divs)
		divs.map(x=>mClassRemove(x, 'pulseFastInfinite'));
		possids = [];
		for(const pair of poss){
			possids = possids.concat(pair.split(','));
		}
		possids.map(x=>mClass(x, 'pulseFastInfinite'));
		mRemoveClass(div, 'pulseFastInfinite');
		lacunaSelectPair(poss);
	}
}
function sortByLeastX(olist) {
	return olist.sort((a, b) => {
			// Find the minimum x value in each pair
			const minX_A = Math.min(a.xStart, a[1].x);
			const minX_B = Math.min(b[0].x, b[1].x);

			// Sort by the minimum x value
			return minX_A - minX_B;
	});
}
function lacunaSelectPair(ev, pairs, p) {
	//console.log('___click',p);
	//console.log(p.pairs);
	//p is a start or end point that has been clicked
	//pairs is the list of pairs that are currently highlighted

	//if p is included in more than 1 pair of pairs, select the corresponding other endpoints
	let poss = pairs.filter(x => x.includes(p.id));
	if (poss.length > 1) {
		let ids = [];
		for (const pair of poss) {
			let [pstart, pend] = pair.split(',').map(x => mBy(x));
			mClassRemove(pstart, 'pulseFastInfinite');
			mClassRemove(pend, 'pulseFastInfinite');
			ids = ids.concat(pair.split(','));
		}
		ids = ids.filter(x => x != p.id);
		ids.map(x => mClass(mBy(x), 'pulseFastInfinite'));
		return;
	}

	//if p is included in only 1 pair of pairs, select it and remove both points and the line between

	
	for (const pair of p.pairs) {
		//highlight the end points corresponding to this pair
		let [pstart, pend] = pair.split(',').map(x => mBy(x));
		mClass(pstart, 'pulseFastInfinite');
		mClass(pend, 'pulseFastInfinite');
	}
}
function mist(){
	for(const k in linesByPair){
		let line=linesByPair[k];
		let allOtherPairs=Object.keys(linesByPair).filter(x=>x!==k);
		for(let i=0;i<line.length-1;i++){
			//compare this point to all points of all other lines
			let p1=line[i];
			for(const kOther of allOtherPairs){
				for(const p2 of kOther){
					let dist=getDistanceBetweenPoints(p1,p2);
					console.log(p1,p2,dist);
					if (dist<sz){
						p1.bg='blue';mStyle(p1.div,{bg:'blue'});
						p2.bg='blue';mStyle(p2.div,{bg:'blue'});
						addIf(p2.pairs,k);
						addIf()
						//for(const 1addIf(p1.pairs,p2.id);
						//p1.pairs.push()
					}
				}
			}
		}
	}

}
function lacunaPresent1(points, w, h, sz) {

	let d = clearDiv();
	let [dParent, cv] = mArea(10, d, { w, h, bg: '#eee' }); //mDom(d, { w, h, position: 'absolute', left: dx, top: dy, bg: 'yellow' });
	Items = drawPoints(dParent, points); //console.log(Items)

	let info = DA.info = { dParent, cv, w, h, sz, points };

	let result = findIsolatedPairs(points, sz); //console.log(result);
	let di = {};
	let allPixels = [];
	for (const pair of result.isolatedPairs) {
		let [p1, p2] = [pair[0], pair[1]];
		let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];
		[x1, y1, x2, y2] = [x1, y1, x2, y2].map(x => x + sz / 2);
		let pixels = getLinePixels(x1, y1, x2, y2); //console.log('pixels', pixels);
		//pixelsByPair.push({ x1, y1, x2, y2, p1, p2, pixels }); //console.log('pixels', pixels);

		for (const pix of pixels) {
			allPixels.push(pix);
			let key = getPixelKey(pix);
			let l = lookup(di, [key]);
			lookupAddIfToList(di, [key], `${p1.id},${p2.id}`)
			//lookupAddIfToList(di, [key], p2.id)
			//if (l) console.log(pix.x,pix.y,lookup(di, [key]));
		}

		drawLineOnCanvas(cv, x1, y1, x2, y2, 2);
	}

	//console.log(Object.keys(di).length);
	let di1 = DA.info.di = clusterize(di,10);
	//console.log(Object.keys(di1).length); //return;

	//console.log(di);
	dParent.onmousemove = alertOnPointHoverPairHandler;
	dParent.onclick = alertOnPointClickPairHandler;
	// alertOnPointHoverPair(dParent, di1);
	// alertOnPointClickPair(dParent, di1);

}

function lacunaRemovePair(pair) {
	let { dParent, cv, w, h, sz, points } = DA.info;

	let ids = pair.split(',');
	for (const id of ids) {
		let o = Items[id];//remove the div
		o.div.remove();
		points = points.filter(x => x.id != id);//remove from points
		delete Items[id];//remove from items
	}

	mRemove(cv);
	mRemove(dParent);

	lacunaPresent1(points, w, h, sz);
	return;

	let canvas = cv; //clear DA.info.cv ctx
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//stopAnimatingPairs();

	for (const id in Items) {
		let d = mBy(id);
		mClassRemove(d, 'pulseInfinite');
		mStyle(d, { cursor: 'default' });
		d.onclick = null;
	}

	lacunaPresent1();
}
function _alertOnPointHover(canvas, points, threshold = 2) {
	canvas.addEventListener('mousemove', (ev) => {
		const rect = canvas.getBoundingClientRect();
		const mouseX = ev.clientX - rect.left;
		const mouseY = ev.clientY - rect.top;

		for (let i = 0; i < points.length; i++) {
			const point = points[i];
			const dx = mouseX - point.x;
			const dy = mouseY - point.y;

			// Check if the mouse is within the threshold distance of the point
			if (Math.sqrt(dx * dx + dy * dy) < threshold) {
				console.log(`Mouse over point (${point.x}, ${point.y})`);
				//break;  // Stop checking other points after finding a match
			}
		}
	});
}
async function _fetchAndPrintDetails(titles) {

	//let titles = Object.keys(Session.locs).map(x=>Session.locs[x].title);//["New York City", "London", "Tokyo", "Paris", "Berlin", "Sydney", "Moscow", "Beijing", "Rio de Janeiro", "Cape Town"];
	if (nundef(titles)) titles = ["New York City", "London", "Tokyo", "Paris", "Berlin", "Sydney", "Moscow", "Beijing", "Rio de Janeiro", "Cape Town"];
	titles = arrTake(titles, 10);
	//console.log(titles); return;

	const details = await getPageDetails(titles);
	return details;
	//console.log(details); return;
	if (details) {
		//console.log(details);
		details.forEach(detail => {
			console.log(detail); return;
			// console.log(`Title: ${detail.title}`);
			// console.log(`Is City: ${detail.isCity}`);
			// console.log(`Status: ${detail.status}`);
			// console.log(`Extract: ${detail.extract}`);
			console.log('--------------------');
		});
	}
}
function _mArea(padding, dParent, styles = {}, opts = {}) {
	addKeys({ padding, wbox: true, position: 'relative' }, styles)
	let d0 = mDom(dParent, styles);
	let d = mDom(d0, { w100: true, h100: true, box: true, position: 'relative' }, opts);
	let [w, h] = [mGetStyle(d, 'w'), mGetStyle(d, 'h')];
	let cv = mDom(d, { position: 'absolute', top: 0, left: 0, w100: true, h100: true }, { tag: 'canvas', id: 'canvas1', width: w, height: h })
	return [d, cv];
}
function alertOnPointHover(elem, di, threshold = 2) {
	elem.addEventListener('mousemove', (ev) => {
		const rect = elem.getBoundingClientRect();
		const mouseX = ev.clientX - rect.left;
		const mouseY = ev.clientY - rect.top;

		// let key = getXYKey(mouseX, mouseY);

		let [{ mx1, mx2 }, { my1, my2 }] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
		for (const x of range(mx1, mx2)) {
			for (const y of range(my1, my2)) {
				key = getXYKey(x, y);
				let entry = lookup(di, [key]);
				if (entry) {
					console.log(`Mouse over point (${mouseX}, ${mouseY})`, entry);
				}
			}
		}


		// for (const x in di) {
		// 	for (const y in di[x]) {
		// 		const point = { x, y };
		// 		const dx = mouseX - point.x;
		// 		const dy = mouseY - point.y;

		// 		// Check if the mouse is within the threshold distance of the point
		// 		if (Math.sqrt(dx * dx + dy * dy) < threshold) {
		// 			console.log(`Mouse over point (${point.x}, ${point.y})`);
		// 			//break;  // Stop checking other points after finding a match
		// 		}
		// 	}
		// }
	});
}
function lacunaRemovePair(pair) {
	let ids = pair.split(',');
	for (const id of ids) {

		//remove the div
		let o = Items[id];
		o.div.remove();

		//remove from points
		DA.info.points = DA.info.points.filter(x => x.id != id);


		//remove from items
		delete Items[id];


	}
	//delete event handlers from dParent
	DA.info.dParent.onclick = null;
	DA.info.dParent.onmousemove = null;

	//clear DA.info.cv ctx
	let canvas = DA.info.cv;
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	lacunaCalculate();

	// DA.entry=[];
	// //recalculate lines
	// let {dParent,cv,w,h,sz,points}=DA.info;

	// points = points.filter(x=>!ids.includes(x.id));
	// DA.points = points;
	// lacunaCalculate(dParent,cv,w,h,sz,points);

	// console.log('points', points);

}
function nodejs() {
	app.get('/cityweb_BROKEN', async (req, res) => {
		let { city } = req.query;
		let norm = normalizeString(city);

		let web = lookup(Session, ['web', norm]);
		if (web) return res.json(web);

		console.log('==> get city', city);
		const result = await getFromWebPage(city);
		lookupSet(Session, ['web', norm], result);
		res.json(result);
	});
	app.get('/cityweb0/:city/first200lines', async (req, res) => {
		const city = req.params.city;
		const first200Lines = await getFromWebPage(city);

		if (first200Lines) {
			res.send(first200Lines);
		} else {
			res.status(404).json({ message: 'City not found or error fetching data' });
		}
	});

}
//#endregion

