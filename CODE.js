
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
