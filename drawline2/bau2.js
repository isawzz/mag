
function getLinePixels1(x1, y1, x2, y2) {
	[x1,y2,x2,y2]=[x1,y2,x2,y2].map(x=>Math.round(x));//ensure termination!
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
function getEquidistantPoints(p1, p2, d=10) {
	const points = [];
	const dx = p2.x1 - p1.x1;
	const dy = p2.y1 - p1.y1;
	const distance = Math.sqrt(dx * dx + dy * dy);
	const numPoints = Math.floor(distance / d);

	for (let i = 0; i <= numPoints; i++) {
			const t = i / numPoints;
			const x = p1.x1 + t * dx;
			const y = p1.y1 + t * dy;
			points.push({ x, y });
	}

	return points;
}




