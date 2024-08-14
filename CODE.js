
function alertOnPointHover(elem, di, threshold = 2) {
	elem.addEventListener('mousemove', (ev) => {
		const rect = elem.getBoundingClientRect();
		const mouseX = ev.clientX - rect.left;
		const mouseY = ev.clientY - rect.top;

		// let key = getXYKey(mouseX, mouseY);

		let [{mx1,mx2},{my1,my2}]=[roundToNearestMultiples(mouseX,10),roundToNearestMultiples(mouseY,10)];
		for(const x of range(mx1,mx2)){
			for(const y of range(my1,my2)){
				key = getXYKey(x,y);
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
function _mArea(padding, dParent, styles = {}, opts = {}) {
	addKeys({ padding, wbox: true, position: 'relative' }, styles)
	let d0 = mDom(dParent, styles);
	let d = mDom(d0, { w100: true, h100: true, box: true, position: 'relative' }, opts);
	let [w, h] = [mGetStyle(d, 'w'), mGetStyle(d, 'h')];
	let cv = mDom(d, { position: 'absolute', top: 0, left: 0, w100: true, h100: true}, { tag: 'canvas', id: 'canvas1', width: w, height: h })
	return [d, cv];
}
function nodejs(){
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
async function _fetchAndPrintDetails(titles) {

	//let titles = Object.keys(Session.locs).map(x=>Session.locs[x].title);//["New York City", "London", "Tokyo", "Paris", "Berlin", "Sydney", "Moscow", "Beijing", "Rio de Janeiro", "Cape Town"];
	if (nundef(titles)) titles = ["New York City", "London", "Tokyo", "Paris", "Berlin", "Sydney", "Moscow", "Beijing", "Rio de Janeiro", "Cape Town"];
	titles = arrTake(titles,10);
	//console.log(titles); return;

	const details = await getPageDetails(titles);
	return details;
	//console.log(details); return;
	if (details) {
		//console.log(details);
		details.forEach(detail => {
			console.log(detail);return;
			// console.log(`Title: ${detail.title}`);
			// console.log(`Is City: ${detail.isCity}`);
			// console.log(`Status: ${detail.status}`);
			// console.log(`Extract: ${detail.extract}`);
			console.log('--------------------');
		});
	}
}
