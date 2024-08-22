
function generateHotspotsNOY(dParent, pointPairs, sz = 20, color = 'red') {
	//let t = getNow();
	let hotspots = [];
	let linesByPair = {};
	for (const pair of pointPairs) {
		let ids = pair.map(x => x.id); //split(',');
		let key = ids.join(',');
		let [pStart, pEnd] = [Items[ids[0]], Items[ids[1]]]; //console.log(pStart.x,pEnd.x)
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
			//console.log(p)

		}
		linesByPair[key] = line;
		//line.map(x=>hotspots.push({p1:ids[0],p2:ids[1],p:x));
	}
	//t = showTimeSince(t, 'lines')

	// console.log('hotspots',hotspots);
	DA.hotspots = drawPoints(dParent, hotspots);
	hotspots.map(x => mStyle(x.div, { opacity: 0 }))
	//console.log(DA.hotspots);
	//t = showTimeSince(t, 'line drawing')

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
				// p1.bg='blue';mStyle(p1.div,{bg:'blue'});
				// p2.bg='blue';mStyle(p2.div,{bg:'blue'});
			}
		}
	}
	//console.log('perf',hotspots.length,c1,c2,c3,c4,c5,'durch:',c6);
	//t = showTimeSince(t, `distanceBetweenPoints N=${hotspots.length}`)
	return [hotspots, linesByPair];
}
function generateHotspots(dParent, pointPairs, sz = 20, color = 'red') {
	let t = getNow();
	let hotspots = [];
	let linesByPair = {};
	for (const pair of pointPairs) {
		let ids = pair.map(x => x.id); //split(',');
		let key = ids.join(',');
		let [pStart, pEnd] = [Items[ids[0]], Items[ids[1]]]; //console.log(pStart.x,pEnd.x)
		let line = getEquidistantPoints(pStart, pEnd, sz / 2);
		for (const p of line) {
			p.bg = color;
			p.sz = sz;
			p.start = ids[0];
			p.end = ids[1];
			p.startX = pStart.x;
			p.endX = pEnd.x;
			p.startY = pStart.y;
			p.endY = pEnd.y;
			p.id = getUID();
			p.pairs = [key];
			hotspots.push(p);
			//console.log(p)

		}
		linesByPair[key] = line;
		//line.map(x=>hotspots.push({p1:ids[0],p2:ids[1],p:x));
	}
	//t = showTimeSince(t, 'lines')

	// console.log('hotspots',hotspots);
	DA.hotspots = drawPoints(dParent, hotspots);
	if (color == 'transparent') hotspots.map(x => mStyle(x.div, { opacity: 0 }))
	//console.log(DA.hotspots);
	//t = showTimeSince(t, 'line drawing')

	let [c1, c2, c3, c4, c5, c6] = [0, 0, 0, 0, 0, 0];
	for (const p1 of hotspots) {
		assertion(p1.startX <= p1.endX, "NOT SORTED!!!!!")
		for (const p2 of hotspots) {
			if (p1 == p2) { c3++; continue; }
			if (p1.startX > p2.endX) { c1++; continue; }
			if (p2.startX > p1.endX) { c2++; continue; }
			if (p1.start == p2.start && p1.end == p2.end) { c4++; continue; }
			if (p1.start == p2.end && p1.end == p2.start) { c5++; continue; }

			let miny1 = Math.min(p1.startY, p1.endY);
			let maxy1 = Math.max(p1.startY, p1.endY);
			let miny2 = Math.min(p2.startY, p2.endY);
			let maxy2 = Math.max(p2.startY, p2.endY);

			if (miny1 > maxy2 || miny2 > maxy1) { c5++; continue; }

			c6++;
			let dist = getDistanceBetweenPoints(p1, p2);
			if (dist < sz / 3) {
				let newlist = new Set(p1.pairs.concat(p2.pairs));
				p1.pairs = Array.from(newlist);
				p2.pairs = Array.from(newlist);
				if (color != 'transparent') {
					p1.bg = 'blue'; mStyle(p1.div, { bg: 'blue' });
					p2.bg = 'blue'; mStyle(p2.div, { bg: 'blue' });
				}
			}
		}
	}
	//console.log('perf',hotspots.length,c1,c2,c3,c4,c5,'durch:',c6);
	//t = showTimeSince(t, `distanceBetweenPoints N=${hotspots.length}`)
	return [hotspots, linesByPair];
}
function getDistanceBetweenPoints(p1, p2) {
	if (isString(p1)) p1 = Items[p1];
	if (isString(p2)) p2 = Items[p2];
	return getDistanceBetweenCenters(p1.div, p2.div);
}
function getDistanceBetweenCenters(div1, div2) {
	const rect1 = div1.getBoundingClientRect();
	const rect2 = div2.getBoundingClientRect();

	const centerX1 = rect1.left + rect1.width / 2;
	const centerY1 = rect1.top + rect1.height / 2;

	const centerX2 = rect2.left + rect2.width / 2;
	const centerY2 = rect2.top + rect2.height / 2;

	const dx = centerX2 - centerX1;
	const dy = centerY2 - centerY1;

	return Math.sqrt(dx * dx + dy * dy);
}
function getLinePixels1(x1, y1, x2, y2) {
	[x1, y2, x2, y2] = [x1, y2, x2, y2].map(x => Math.round(x));//ensure termination!
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
function getEquidistantPoints(p1, p2, d = 10, includeEnds = false) {
	const points = [];
	const dx = p2.x - p1.x;
	const dy = p2.y - p1.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	const numPoints = Math.floor(distance / d);

	let istart = includeEnds ? 0 : 1;
	let iend = includeEnds ? numPoints : numPoints - 1;
	for (let i = istart; i <= iend; i++) {
		const t = i / numPoints;
		const x = p1.x + t * dx;
		const y = p1.y + t * dy;
		points.push({ x, y });
	}

	return points;
}
function lacunaHighlightEndpoints(ev, p) {
	//console.log('___click',p.x,p.y);
	//console.log(p.pairs);
	if (!DA.hotspotsActive) return;
	for (const pair of p.pairs) {
		//highlight the end points corresponding to this pair
		let [pStart, pEnd] = pair.split(',').map(x => mBy(x));
		mClass(pStart, 'pulseFastInfinite');
		mClass(pEnd, 'pulseFastInfinite');
		//pStart.div.onclick = ev => lacunaSelectPair(ev, p.pairs, pStart)
		//pEnd.div.onclick = ev => lacunaSelectPair(ev, p.pairs, pEnd)
	}
}
function lacunaUnHighlightEndpoints(ev, p) {
	//console.log('___click',p.x,p.y);
	//console.log(p.pairs);
	if (!DA.hotspotsActive) return;
	for (const pair of p.pairs) {
		//highlight the end points corresponding to this pair
		let [pstart, pend] = pair.split(',').map(x => mBy(x));
		mClassRemove(pstart, 'pulseFastInfinite');
		mClassRemove(pend, 'pulseFastInfinite');
	}
}
function laDrawPoints(d, points, w, h, sz) {
	mClear(d); mStyle(d, { margin: rNumber(10, 50) });
	let [dParent, cv] = mArea(0, d, { w, h, bg: '#eee' }); //mDom(d, { w, h, position: 'absolute', left: dx, top: dy, bg: 'yellow' });
	Items = drawPoints(dParent, points); //console.log(Items)
	let info = DA.info = { dParent, cv, w, h, sz, points };
	return points;
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
		for (const pix of pixels) {
			allPixels.push(pix);
			let key = getPixelKey(pix);
			let l = lookup(di, [key]);
			lookupAddIfToList(di, [key], `${p1.id},${p2.id}`)
		}
		drawLineOnCanvas(cv, x1, y1, x2, y2, 2);
	}
	let di1 = DA.info.di = clusterize(di, 10);	//console.log(Object.keys(di1).length); //return;
	dParent.onmousemove = alertOnPointHoverPairHandler;
	dParent.onclick = alertOnPointClickPairHandler;
}




