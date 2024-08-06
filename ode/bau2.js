
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
