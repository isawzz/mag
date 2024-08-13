
function clearDiv(styles = {}) {
	addKeys({padding:0,margin:0,position:'relative'},styles);
	let d0=document.body; 
	d0.innerHTML='';
	mStyle(d0,styles);
  return d0;
}
function drawCircleOnCanvas(canvas, cx, cy, sz, color) {
	const ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.arc(cx, cy, sz / 2, 0, 2 * Math.PI);
	ctx.fillStyle = color;
	ctx.fill();
}
function drawCircleOnDiv(dParent, cx, cy, sz, bg = 'red') {
	let o = { cx, cy, x: cx - sz / 2, y: cy - sz / 2, sz, bg };
	let [w, h] = [sz, sz];
	o.div = mDom(dParent, { w, h, position: 'absolute', round: true, x: cx - sz / 2, y: cy - sz / 2, bg });
	//o.div = mDom(dParent, { position: 'absolute', round: true, top: cx - sz / 2, left: cy - sz / 2, bg });
	//o.div = mDom(dParent, { position: 'absolute', round: true, top: 100, left: 0, w:sz, h:sz, bg });
	return o;
}
function drawEllipseOnCanvas(canvas, cx, cy, w, h, color = 'orange', stroke = 0, border = 'red') {
	const ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, 2 * Math.PI);
	if (stroke > 0) { ctx.strokeStyle = border; ctx.lineWidth = stroke; ctx.stroke(); }
	if (color) { ctx.fillStyle = color; ctx.fill(); }
}
function drawInteractiveLine(p1, p2) {
	const line = document.createElement('div');// mDom(d);

	// Calculate the distance and angle between the points
	const distance = Math.hypot(p2.x - p1.x, p2.y - p1.y);
	const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

	// Style the line
	line.style.position = 'absolute';
	line.style.transformOrigin = '0 0';
	line.style.transform = `rotate(${angle}deg)`;
	line.style.height = '2px';
	//line.style.border = 'solid black 11px';
	line.style.width = `${distance}px`;
	line.style.backgroundColor = 'black';
	line.style.left = `${p1.x}px`;
	line.style.top = `${p1.y}px`;

	// Add mouseover event
	line.addEventListener('mouseover', () => {
		line.style.backgroundColor = 'red';
	});

	line.addEventListener('mouseout', () => {
		line.style.backgroundColor = 'black';
	});

	// Append the line to the body or a specific container
	document.body.appendChild(line);

	return line;
}
function drawLineOnCanvas(canvas, x1, y1, x2, y2, stroke = 1) {
	const ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = '#000';
	ctx.lineWidth = stroke;
	ctx.stroke();
}
function _drawPoints(dParent, points) {
	return points.map(p => placeCircle(dParent, p.x, p.y, valf(p.sz, 20), valf(p.bg, rColor())));
}
function drawPoints(dParent,points){
	let items=[];
	//console.log('points',points);
	for(const p of points){
		let d1=p.div=mDom(dParent,{left:p.x,top:p.y,w:p.sz,h:p.sz,position:'absolute',bg:p.bg},{html:p.id,id:p.id});
		let p1=getRect(d1); p1.x+=p.sz/2;//p1.y+=sz/2; 
		p.center = p1;
		Items[p.id]=p;
	}
	return items;

}
function divideRectangleIntoGrid(w, h, n) {
	let bestRows = 1;
	let bestCols = n;
	let bestAspectRatio = Infinity;

	for (let rows = 1; rows <= n; rows++) {
		const cols = Math.ceil(n / rows);
		const cellWidth = w / cols;
		const cellHeight = h / rows;
		const aspectRatio = Math.abs(cellWidth / cellHeight - 1);

		if (aspectRatio < bestAspectRatio) {
			bestAspectRatio = aspectRatio;
			bestRows = rows;
			bestCols = cols;
		}
	}

	return { rows: bestRows, cols: bestCols };
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

			if (isIsolated) {
				isolatedPairs.push([nodes[i], nodes[j]]);
			} else {
				obstaclePairs.push([nodes[i], nodes[j]]);
			}
		}
	}

	return { isolatedPairs, obstaclePairs }; //return isolatedPairs;
}
function findPairsByProp(objects, prop) {
	const pairs = [];
	const groupedByProp = {};

	// Group objects by the specified property
	objects.forEach(obj => {
		const key = obj[prop];
		if (!groupedByProp[key]) {
			groupedByProp[key] = [];
		}
		groupedByProp[key].push(obj);
	});

	// Find all pairs within each group
	Object.values(groupedByProp).forEach(group => {
		for (let i = 0; i < group.length; i++) {
			for (let j = i + 1; j < group.length; j++) {
				pairs.push([group[i], group[j]]);
			}
		}
	});

	return pairs;
}
function generateRepeatedColors(n, repeat, colorList) {
	const colors = [];
	//console.log(colorList)
	let max = Math.ceil(n / repeat); //console.log(max)
	for (let i = 0; i < max; i++) {
		const color = colorList[i % colorList.length]; //console.log(color)
		for (let j = 0; j < repeat; j++) {
			colors.push(color);
		}
	}
	return colors;
}
function generateRandomPoints(n, w, h) {
	const points = [];
	for (let i = 0; i < n; i++) {
		points.push({ x: Math.random() * w, y: Math.random() * h });
	}
	return points;
}
function generateRandomPointsRound(n, w, h, rand = 0.8) {
	let [radx, rady] = [w / 2, h / 2];
	const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Approx. 137.5 degrees in radians
	const points = [];
	for (let i = 1; i < n + 1; i++) {
		const angle = i * goldenAngle + (Math.random() - 0.5) * goldenAngle * rand / 4;
		const distance = Math.sqrt(i / n);
		let x = radx + distance * radx * Math.cos(angle); // Calculate x and y within the ellipse
		let y = rady + distance * rady * Math.sin(angle);
		// points.push({ x, y });
		points.push({ x: Math.round(x), y: Math.round(y) });

	}
	return points;
}
function generateRandomPointsRect(n, w, h, rand = 0) {
	const points = [];
	let { rows, cols } = divideRectangleIntoGrid(w, h*.8, n);
	// const rows = Math.floor(Math.sqrt(n));
	// const cols = Math.ceil(n / rows);
	const xSpacing = w / (cols + 1);
	const ySpacing = h / (rows + 1); console.log(xSpacing, ySpacing);
	let dmin = 10;
	let x,y,xfix,yfix,xlast=-dmin,ylast=-dmin;
	for (let i = 0; i < rows; i++) {
		yfix = (i + .75) * ySpacing;
		for (let j = 0; j < cols; j++) {
			xfix = (j + .75) * xSpacing;
			if (points.length < n) {
				let dx = rand * (Math.random() - 0.5) * xSpacing; if (coin()) dx = -dx;
				let dy = rand * (Math.random() - 0.5) * ySpacing; if (coin()) dy = -dy;
				// const x = (j + 1) * xSpacing + dx;
				// const y = (i + 1) * ySpacing + dy;
				//console.log(dx,dy)
				// const x = (j + 1) * xSpacing;
				// const y = (i + 1) * ySpacing;
				// let [x,y]=[j*xSpacing,i*ySpacing]
				// const x = (j + .75) * xSpacing;
				// const y = (i + .75) * ySpacing;
				x=xfix+dx; if (x>xlast && x-xlast<dmin) x+=dmin;
				y=yfix+dy; if (y>ylast && y-ylast<dmin) y+=dmin;
				xlast=x;
				points.push({ x: Math.round(x), y: Math.round(y) });
			}
			ylast=y
		}
	}

	return points;
}
function generateRandomPointsRect(n, w, h, rand = 0) {
	const points = [];
	let { rows, cols } = divideRectangleIntoGrid(w, h, n);
	const xSpacing = w / (cols + 1);
	const ySpacing = h / (rows + 1); //console.log(xSpacing, ySpacing);
	// let dmin = 10;
	// let x,y,xfix,yfix,xlast=-dmin,ylast=-dmin;
	for (let i = 0; i < rows; i++) {
		// yfix = (i + .75) * ySpacing;
		for (let j = 0; j < cols; j++) {
			// xfix = (j + .75) * xSpacing;
			if (points.length < n) {
				let dx = rand * (Math.random() - 0.5) * xSpacing; if (coin()) dx = -dx;
				let dy = rand * (Math.random() - 0.5) * ySpacing; if (coin()) dy = -dy;
				// const x = (j + 1) * xSpacing + dx;
				// const y = (i + 1) * ySpacing + dy;
				//console.log(dx,dy)
				// const x = (j + 1) * xSpacing;
				// const y = (i + 1) * ySpacing;
				// let [x,y]=[j*xSpacing,i*ySpacing]
				const x = (j + .75) * xSpacing +dx;
				const y = (i + .75) * ySpacing +dy;
				// x=xfix+dx; if (x>xlast && x-xlast<dmin) x+=dmin;
				// y=yfix+dy; if (y>ylast && y-ylast<dmin) y+=dmin;
				// xlast=x;
				points.push({ x: Math.round(x), y: Math.round(y) });
			}
			// ylast=y
		}
	}

	return points;
}
function getCenter(elem, relto) {
	const rect = elem.getBoundingClientRect();
	if (nundef(relto)) relto = elem.parentNode;
	const containerRect = relto.getBoundingClientRect();
	return {
		x: rect.left - containerRect.left + rect.width / 2,
		y: rect.top - containerRect.top + rect.height / 2
	};
}
function getLinePixels(x1, y1, x2, y2) {
	const pixels = [];
	const dx = Math.abs(x2 - x1);
	const dy = Math.abs(y2 - y1);
	const sx = (x1 < x2) ? 1 : -1;
	const sy = (y1 < y2) ? 1 : -1;
	let err = dx - dy;

	while (true) {
		pixels.push({ x: x1, y: y1 });

		if (Math.round(x1) === Math.round(x2) && Math.round(y1) === Math.round(y2)) break;

		const e2 = 2 * err;
		if (e2 > -dy) {
			err -= dy;
			x1 += sx;
		}
		if (e2 < dx) {
			err += dx;
			y1 += sy;
		}
	}

	return pixels;
}
function groupByProperty(list, prop) {
	const groups = {};

	list.forEach(obj => {
		const key = obj[prop];
		if (!groups[key]) {
			groups[key] = [];
		}
		groups[key].push(obj);
	});

	return Object.values(groups);
}
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
function mArea(padding, dParent, styles = {}, opts = {}) {
	addKeys({ padding, wbox: true, position: 'relative' }, styles)
	let d0 = mDom(dParent, styles);
	let d = mDom(d0, { w100: true, h100: true, box: true, position: 'relative' }, opts);
	let [w, h] = [mGetStyle(d, 'w'), mGetStyle(d, 'h')];
	let cv = mDom(d, { position: 'absolute', top: 0, left: 0, w100: true, h100: true, 'pointer-events': 'none' }, { tag: 'canvas', id: 'canvas1', width: w, height: h })
	return [d, cv];
}
function mLacunaCirles(dParent,n=49,neach=7,sz=10,rand=.7) {
	let [w,h]=[mGetStyle(dParent,'w'),mGetStyle(dParent,'h')];
	let clist = lacunaColors();
	let points = generateRandomPointsRect(n, w, h, rand);
	let colors = generateRepeatedColors(n, neach, clist);	arrShuffle(colors);
	for (let i = 0; i < n; i++) { points[i].bg = colors[i]; points[i].sz = sz; points[i].id=getUID(); }
	//points = points.map(p => drawCircleOnDiv(dParent, p.x, p.y, p.sz, p.bg));
	return points;
}
function placeCircle(dParent, cx, cy, sz, bg = 'red') {
	let o = { cx, cy, sz };
	let [w, h] = [sz, sz];
	o.div = mDom(dParent, { w, h, position: 'absolute', round: true, x: cx - sz / 2, y: cy - sz / 2, bg });
	//o.div = mDom(dParent, { position: 'absolute', round: true, top: cx - sz / 2, left: cy - sz / 2, bg });
	//o.div = mDom(dParent, { position: 'absolute', round: true, top: 100, left: 0, w:sz, h:sz, bg });
	return o;
}
function placeCircles(dParent, n, sz, color) {
	//dParent = toElem(dParent);
	let [w, h] = [mGetStyle(dParent, 'w'), mGetStyle(dParent, 'h')];
	let [radx, rady] = [w / 2, h / 2];
	const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Approx. 137.5 degrees in radians
	const circles = [];
	for (let i = 0; i < n; i++) {
		const angle = i * goldenAngle;// + (Math.random() - 0.5) * goldenAngle * 0.2;
		const distance = Math.sqrt(i / n);
		let x = radx + distance * radx * Math.cos(angle); // Calculate x and y within the ellipse
		let y = rady + distance * rady * Math.sin(angle);
		let o = placeCircle(dParent, x, y, sz, color);
		circles.push(o);
	}
	return circles;
}
function placeCirclesRandom(dParent, n, sz, color, rand = 0.2) {
	//dParent = toElem(dParent);
	let [w, h] = [mGetStyle(dParent, 'w'), mGetStyle(dParent, 'h')];
	let [radx, rady] = [w / 2, h / 2];
	const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Approx. 137.5 degrees in radians
	const circles = [];
	for (let i = 0; i < n; i++) {
		const angle = i * goldenAngle + (Math.random() - 0.5) * goldenAngle * rand;
		const distance = Math.sqrt(i / n);
		let x = radx + distance * radx * Math.cos(angle); // Calculate x and y within the ellipse
		let y = rady + distance * rady * Math.sin(angle);
		let o = placeCircle(dParent, x, y, sz, color);
		circles.push(o);
	}
	return circles;
}
function testMouseMove(ev, pixelsByPair, ctx) {
	const mouseX = ev.clientX;
	const mouseY = ev.clientY;
	const highlightRadius = 5;
	let found = false;

	for (let i = 0; i < pixelsByPair.length; i++) {
		const pair = pixelsByPair[i];

		// Check if the mouse is over any pixel in the current pair's line
		for (let j = 0; j < pair.pixels.length; j++) {
			const pixel = pair.pixels[j];
			const dx = mouseX - pixel.x;
			const dy = mouseY - pixel.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < highlightRadius) {
				// Mouse is over the line, highlight the endpoints
				ctx.fillStyle = 'red';
				ctx.beginPath();
				ctx.arc(pair.x1, pair.y1, 5, 0, 2 * Math.PI);
				ctx.fill();

				ctx.beginPath();
				ctx.arc(pair.x2, pair.y2, 5, 0, 2 * Math.PI);
				ctx.fill();

				found = true;
				break;
			}
		}

		if (found) break;  // No need to check further pairs if one is already highlighted
	}

	if (!found) {
		// Clear the canvas if no line is being hovered
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}
}

