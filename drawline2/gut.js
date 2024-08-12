
function mArea(padding, dParent, styles = {}, opts = {}) {
	addKeys({ padding, wbox: true }, styles)
	let d0 = mDom(dParent, styles);
	let d = mDom(d0, { w100: true, h100: true, box: true, position: 'relative' }, opts);
	let [w, h] = [mGetStyle(d, 'w'), mGetStyle(d, 'h')];
	let cv = mDom(d, { position: 'absolute', top: 0, left: 0, w100: true, h100: true, 'pointer-events': 'none' }, { tag: 'canvas', id: 'canvas1', width: w, height: h })
	return [d, cv];
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
function drawCircleOnCanvas(canvas, cx, cy, sz, color) {
	const ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.arc(cx, cy, sz / 2, 0, 2 * Math.PI);
	ctx.fillStyle = color;
	ctx.fill();
}
function drawEllipseOnCanvas(canvas, cx, cy, w, h, color = 'orange', stroke = 0, border = 'red') {
	const ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, 2 * Math.PI);
	if (stroke > 0) { ctx.strokeStyle = border; ctx.lineWidth = stroke; ctx.stroke(); }
	if (color) { ctx.fillStyle = color; ctx.fill(); }
}
function drawLine(canvas, x1, y1, x2, y2, stroke = 1) {
	const ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.strokeStyle = '#000';
	ctx.lineWidth = stroke;
	ctx.stroke();
}
function drawPoints(dParent, points) {
	return points.map(p => placeCircle(dParent, p.x, p.y, valf(p.sz, 20), valf(p.bg, rColor())));
}
function getCenter(elem) {
	const rect = elem.getBoundingClientRect();
	const containerRect = mBy('container').getBoundingClientRect();
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
	const rows = Math.floor(Math.sqrt(n));
	const cols = Math.ceil(n / rows);
	const xSpacing = w / (cols + 1);
	const ySpacing = h / (rows + 1);

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (points.length < n) {
				let dx = rand * (Math.random() - 0.5) * xSpacing; if (coin()) dx = -dx;
				let dy = rand * (Math.random() - 0.5) * ySpacing; if (coin()) dy = -dy;
				const x = (j + 1) * xSpacing + dx;
				const y = (i + 1) * ySpacing + dy;
				points.push({ x: Math.round(x), y: Math.round(y) });
			}
		}
	}

	return points;
}

