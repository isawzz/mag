
function lacunaColors() {
	let clist = { red: "#E63946", green: "#06D6A0", blue: "#118AB2", cyan: "#0F4C75", magenta: "#D81159", yellow: "#FFD166", orange: "#F4A261", purple: "#9D4EDD", pink: "#FF80AB", brown: "#8D6E63", lime: "#A7FF83", indigo: "#3A0CA3", violet: "#B5838D", gold: "#F5C518", teal: "#008080" };
	return Object.values(clist);
}
function lacunaCircles(w = 800, h = 400, n = 49, neach = 7, sz = 10) {
	let d = clearFlex();
	let rand = .8;
	let [d1, cv] = mArea(30, d, { w, h, bg: '#eee', position: 'relative' });
	let clist = lacunaColors();
	let points = generateRandomPointsRect(n, w, h, rand);
	let colors = generateRepeatedColors(n, neach, clist);	arrShuffle(colors);
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
	let colors = generateRepeatedColors(n, neach, clist);	arrShuffle(colors);
	for (let i = 0; i < n; i++) { points[i].bg = colors[i]; points[i].sz = sz; }
	points = points.map(p => drawCircleOnDiv(d1, p.x, p.y, p.sz, p.bg));
	//for (const p of points) { p.div = drawCircleOnDiv(d1, p.x, p.y, p.sz, p.bg); }
	return { d, points };
}
function mLacunaCirles(dParent,n=49,neach=7,sz=10,rand=.8) {
	let [w,h]=[mGetStyle(dParent,'w'),mGetStyle(dParent,'h')];
	let clist = lacunaColors();
	let points = generateRandomPointsRect(n, w, h, rand);
	let colors = generateRepeatedColors(n, neach, clist);	arrShuffle(colors);
	for (let i = 0; i < n; i++) { points[i].bg = colors[i]; points[i].sz = sz; }
	//points = points.map(p => drawCircleOnDiv(dParent, p.x, p.y, p.sz, p.bg));
	return points;
}



