
onload = start;
async function start() { await test17_simple(); }

async function test17_simple(){
	let d=clearDiv();
	let [w, h, dx, dy, sz] = [800, 400, 50, 120, 30];
	let dParent=mDom(d,{w,h,position:'absolute',left:dx,top:dy,bg:'yellow'});
	let points = mLacunaCirles(dParent,4,2,sz);

	for(const p of points){
		let d1=p.div=mDom(dParent,{left:p.x,top:p.y,w:p.sz,h:p.sz,position:'absolute',bg:p.bg},{id:getUID()});
		let p1=getRect(d1); p1.x+=sz/2;//p1.y+=sz/2; 
		p.center = p1;
		Items[d1.id]=p;
	}
	for(let i=0;i<points.length-1;i++){
		for(let j=i+1;j<points.length;j++){
			// let p1=//{x:x1,y:y1};
			// let p2=getRect(points[j].div); p2.x+=sz/2;p2.y+=sz/2 //{x:x2,y:y2};
			drawFullLine(points[i] , points[j], sz, 'black'); //getCenter(divs[i],dParent), getCenter(divs[j],dParent));
			console.log(points[i]);//return;
		}

	}
	//let result=findPairsByProp(points,'bg'); console.log(result); //return;
}
async function test16_simple(){
	let d=clearDiv();
	let [w, h, dx, dy, sz] = [800, 400, 50, 20, 30];
	let dParent=mDom(d,{w,h,position:'absolute',left:dx,top:dy,bg:'yellow'});
	let points = mLacunaCirles(dParent,4,2,sz);

	let divs = [];
	for(const p of points){
		let d1=mDom(dParent,{left:p.x,top:p.y,w:p.sz,h:p.sz,position:'absolute',bg:p.bg});
		divs.push(d1);
	}
	for(let i=0;i<divs.length-1;i++){
		for(let j=i+1;j<divs.length;j++){
			let p1=getRect(divs[i]); p1.x+=sz/2;p1.y+=sz/2//{x:x1,y:y1};
			let p2=getRect(divs[j]); p2.x+=sz/2;p2.y+=sz/2 //{x:x2,y:y2};
			drawInteractiveLine(dParent, p1 , p2); //getCenter(divs[i],dParent), getCenter(divs[j],dParent));
		}

	}
	//let result=findPairsByProp(points,'bg'); console.log(result); //return;
}
function muell(){
	let buck = groupByProperty(points, 'bg');	console.log(buck);
	let result=findPairsByProp(points,'bg'); console.log(result); //return;
	for (const pair of result) {
		let [p1, p2] = [pair[0], pair[1]];
		// let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];
		//let pixels = getLinePixels(x1, y1, x2, y2); //console.log('pixels', pixels);
		//pixelsByPair.push({x1,y1,x2,y2,p1,p2,pixels}); //console.log('pixels', pixels);
		drawInteractiveLine(d, getCenter(p1.div), getCenter(p2.div)); return;
	}
}
async function test15_simple(){
	let d=clearDiv();
	let [w, h] = [800, 400];
	let dParent=mDom(d,{w,h,position:'absolute',left:20,top:20,bg:'yellow'});
	let d1=mDom(dParent,{left:10,top:10,w:20,h:20,position:'absolute',bg:'red'});
	let d2=mDom(dParent,{left:100,top:100,w:20,h:20,position:'absolute',bg:'blue'});

	let p1=getCenter(d1,d),p2=getCenter(d2,d); //p1={x:0,y:0},p2={x:100,y:100};
	console.log(p1,p2);
	// Draw the interactive line
	drawInteractiveLine(dParent,p1, p2);
}

async function test14_simple(){
	let d0=document.body; d0.innerHTML='';mStyle(d0,{padding:0,margin:0,position:'relative'});

	//let d=mDiv(d0)
	//mIfNotRelative(d);
	let d=d0;
	let dParent=mDom(d,{w:400,h:400,position:'absolute',left:10,top:100});
	let d1=mDom(dParent,{left:0,top:0,w:20,h:20,position:'absolute',bg:'red'});
	let d2=mDom(dParent,{left:100,top:100,w:20,h:20,position:'absolute',bg:'blue'});

	let p1=getCenter(d1,d),p2=getCenter(d2,d); //p1={x:0,y:0},p2={x:100,y:100};
	console.log(p1,p2)
	// Draw the interactive line
	drawInteractiveLine(dParent,p1, p2);
}
async function test13_linediv() {
	let [w, h] = [800, 400];
	let { d, points } = lacunaCirclesDiv(w, h, 4, 2, 20);
	console.log(d);
	let result=findPairsByProp(points,'bg'); console.log(result); //return;
	//let pixelsByPair = [];
	for (const pair of result) {
		let [p1, p2] = [pair[0], pair[1]];
		let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];
		//let pixels = getLinePixels(x1, y1, x2, y2); //console.log('pixels', pixels);
		//pixelsByPair.push({x1,y1,x2,y2,p1,p2,pixels}); //console.log('pixels', pixels);
		drawInteractiveLine(d, p1,p2); 
	}
}

async function test12_lines() {
	let {d,cv,points,pixelsByPair,isolatedPairs,obstaclePairs} = await test11_lines();	
	console.log(pixelsByPair);

	//d.onmousemove=ev=>testMouseMove(ev, pixelsByPair);
}
async function test11_lines() {
	let [w, h] = [800, 400];
	let [x, y] = [w/2, h/2];
	let { d, cv, points } = lacunaCircles(w, h, 49, 7, 20);
	let result=findIsolatedPairs(points,10);
	//console.log(result);
	let pixelsByPair = [];
	for (const pair of result.isolatedPairs) {

		let [p1, p2] = [pair[0], pair[1]];
		let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];
		let pixels = getLinePixels(x1, y1, x2, y2); //console.log('pixels', pixels);
		pixelsByPair.push({x1,y1,x2,y2,p1,p2,pixels}); //console.log('pixels', pixels);
		drawLine(cv, x1, y1, x2, y2, 2); 
	}
	return {d,cv,points,pixelsByPair,isolatedPairs:result.isolatedPairs,obstaclePairs:result.obstaclePairs};
}
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
