
onload = start;
async function start() { await test10_lines(); }

async function test10_lines() {
	let [w, h] = [800, 400];
	let [x, y] = [w/2, h/2];
	let { d, cv, points } = lacunaCircles(w, h);
	drawEllipseOnCanvas(cv, x, y, 20, 20, 'violet');
	let buck = groupByProperty(points, 'bg');
	let list = buck.find(x => x[0].bg === "#06D6A0");
	let result = findClosePairs(list, x, y, 10);
	console.log('result', result);
	for (const pair of result) {
		let [p1, p2] = [pair[0], pair[1]];
		let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];
		let pixels = getLinePixels(x1, y1, x2, y2);
		drawLine(cv, x1, y1, x2, y2, 2); console.log('pixels', pixels);
	}
}
async function test9_ellipse() {
	let d = clearFlex();
	let [w, h, n, neach, rand] = [500, 500, 49, 7, .8];
	let [d1, cv1] = mArea(30, d, { w, h, bg: '#eee', position: 'relative' });
	drawEllipseOnCanvas(cv1, 100, 100, 200, 200, 'violet');
}
async function test9_bufferZone() {
	let d = clearFlex();
	let [w, h, n, neach, rand] = [500, 500, 49, 7, .8];
	let [d1, cv1] = mArea(30, d, { w, h, bg: '#eee', position: 'relative' });
	let clist = { red: "#E63946", green: "#06D6A0", blue: "#118AB2", cyan: "#0F4C75", magenta: "#D81159", yellow: "#FFD166", orange: "#F4A261", purple: "#9D4EDD", pink: "#FF80AB", brown: "#8D6E63", lime: "#A7FF83", indigo: "#3A0CA3", violet: "#B5838D", gold: "#F5C518", teal: "#008080" };
	clist = Object.values(clist);
	let points1 = generateRandomPointsRect(n, w, h, rand);
	let colors = generateRepeatedColors(n, neach, clist);
	arrShuffle(colors);
	for (let i = 0; i < n; i++) { points1[i].bg = colors[i]; points1[i].sz = 20; }
	for (const p of points1) {
		drawCircleOnCanvas(cv1, p.x, p.y, p.sz, p.bg);
	}
	//build buckets of points of same color
	let buck1 = groupByProperty(points1, 'bg');

	let pCenter = { x: 200, y: 200 };
	drawCircleOnCanvas(cv1, pCenter.x, pCenter.y, 20, 'black');

	let result = findClosePairs(buck1[0], 200, 200, 10);
	console.log('result', result);
	for (const pair of result) {
		let [p1, p2] = [pair[0], pair[1]];
		let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];
		let pixels = getLinePixels(x1, y1, x2, y2);
		drawLine(cv1, x1, y1, x2, y2, 2); console.log('pixels', pixels); return;

	}
	return;

	for (const pts of buck1) {
		for (let i = 0; i < pts.length - 1; i++) {
			for (let j = i + 1; j < pts.length; j++) {
				let [p1, p2] = [pts[i], pts[j]];
				let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];
				let pixels = getLinePixels(x1, y1, x2, y2);
				drawLine(cv1, x1, y1, x2, y2, 2); console.log('pixels', pixels); return;
			}
		}
		return;
	}
}
async function test8_bufferZone() {
	let d = clearFlex();
	let [w, h, n, neach, rand] = [500, 500, 49, 7, .8];
	let [d1, cv1] = mArea(30, d, { w, h, bg: '#eee', position: 'relative' });
	let [d2, cv2] = mArea(30, d, { w, h, bg: '#ddd', position: 'relative' });
	let clist = { "Red": "#E63946", "Green": "#06D6A0", "Blue": "#118AB2", "Cyan": "#0F4C75", "Magenta": "#D81159", "Yellow": "#FFD166", "Orange": "#F4A261", "Purple": "#9D4EDD", "Pink": "#FF80AB", "Brown": "#8D6E63", "Lime": "#A7FF83", "Indigo": "#3A0CA3", "Violet": "#B5838D", "Gold": "#F5C518", "Teal": "#008080" };
	clist = Object.values(clist);
	let points1 = generateRandomPointsRect(n, w, h, rand);
	let points2 = generateRandomPointsRound(n, w, h, rand);
	let colors = generateRepeatedColors(n, neach, clist);
	arrShuffle(colors);
	for (let i = 0; i < n; i++) {
		points1[i].bg = points2[i].bg = colors[i];
		points1[i].sz = points2[i].sz = 20;
	}
	//drawPoints(d1, points1);
	for (const p of points1) {
		drawCircleOnCanvas(cv1, p.x, p.y, p.sz / 2, p.bg);
	}
	drawPoints(d2, points2);

	//build buckets of points of same color
	let buck1 = groupByProperty(points1, 'bg');
	let buck2 = groupByProperty(points2, 'bg');

	let pCenter = { x: 200, y: 200 };
	drawCircleOnCanvas(cv1, pCenter.x, pCenter.y, 20, 'black');

	let result = findClosePairs(buck1[0], 200, 200, 10);
	console.log('result', result);
	for (const pair of result) {
		let [p1, p2] = [pair[0], pair[1]];
		let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];
		let pixels = getLinePixels(x1, y1, x2, y2);
		drawLine(cv1, x1, y1, x2, y2, 2); console.log('pixels', pixels); return;

	}
	return;

	for (const pts of buck1) {
		for (let i = 0; i < pts.length - 1; i++) {
			for (let j = i + 1; j < pts.length; j++) {
				let [p1, p2] = [pts[i], pts[j]];
				let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];
				let pixels = getLinePixels(x1, y1, x2, y2);
				drawLine(cv1, x1, y1, x2, y2, 2); console.log('pixels', pixels); return;
			}
		}
		return;
	}
}
async function test7() {
	let d = clearFlex();
	let [w, h, n, neach, rand] = [500, 500, 49, 7, .8];
	let d1 = mDom(d, { w, h, bg: '#eee', position: 'relative' });
	let d2 = mDom(d, { w, h, bg: '#ddd', position: 'relative' });
	let clist = { "Red": "#E63946", "Green": "#06D6A0", "Blue": "#118AB2", "Cyan": "#0F4C75", "Magenta": "#D81159", "Yellow": "#FFD166", "Orange": "#F4A261", "Purple": "#9D4EDD", "Pink": "#FF80AB", "Brown": "#8D6E63", "Lime": "#A7FF83", "Indigo": "#3A0CA3", "Violet": "#B5838D", "Gold": "#F5C518", "Teal": "#008080" };
	clist = Object.values(clist);
	let points1 = generateRandomPointsRect(n, w, h, rand);
	let points2 = generateRandomPointsRound(n, w, h, rand);
	let colors = generateRepeatedColors(n, neach, clist);
	arrShuffle(colors);
	for (let i = 0; i < n; i++) {
		points1[i].bg = points2[i].bg = colors[i];
		points1[i].sz = points2[i].sz = 20;
	}
	drawPoints(d1, points1);
	drawPoints(d2, points2);
}
function test0_starter() {
	let [w, h, n] = [800, 800, 2];
	mStyle(document.body, { padding: 0, margin: 10 });
	mStyle('container', { position: 'relative', w, h, bg: '#eee' });
}
async function test6() {
	test0_starter();
	let dParent = mBy('container');
	let [w, h, n, neach] = [mGetStyle(dParent, 'w'), mGetStyle(dParent, 'h'), 49, 7];
	let clist = { "Red": "#E63946", "Green": "#06D6A0", "Blue": "#118AB2", "Cyan": "#0F4C75", "Magenta": "#D81159", "Yellow": "#FFD166", "Orange": "#F4A261", "Purple": "#9D4EDD", "Pink": "#FF80AB", "Brown": "#8D6E63", "Lime": "#A7FF83", "Indigo": "#3A0CA3", "Violet": "#B5838D", "Gold": "#F5C518", "Teal": "#008080" };
	clist = Object.values(clist)
	let points = generateRandomPointsRect(n, w, h, .8);
	let colors = generateRepeatedColors(n, neach, clist);
	arrShuffle(colors)
	for (let i = 0; i < n; i++) {
		points[i].bg = colors[i];
		points[i].sz = 20;
	}
	drawPoints(dParent, points);
}
async function test5() {
	test0_starter();
	let dParent = mBy('container');
	let [w, h] = [mGetStyle(dParent, 'w'), mGetStyle(dParent, 'h')];
	let points = generateRandomPointsRect(25, w, h, .8);
	drawPoints(dParent, points);
}
async function test4() {
	test0_starter();
	let dParent = mBy('container');
	let [w, h] = [mGetStyle(dParent, 'w'), mGetStyle(dParent, 'h')];
	let points = generateRandomPoints(25, w, h);
	drawPoints(dParent, points);
}
async function test3() {
	let [w, h] = [400, 300];
	let dParent = mDom('container', { bg: '#ddd', w, h });
	let points = generateRandomPoints(25, w, h);
	drawPoints(dParent, points);
}
async function test2() {
	DA.circles = placeCirclesRandom('container', 70, 20, 'green', .15);
}
async function test1() {
	DA.circles = placeCircles('container', 25, 20, 'green');
}
async function test0() {
	let c = placeCircle('container', 5, 5, 10, 'red'); console.log(c, getCenter(c.div));
}
