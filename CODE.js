
//#region ode anfang von lacuna
function placeCircles(canvas, n) {
	// // Example usage
	// const canvas = document.getElementById('canvas');
	// placeCircles(canvas, 20);

	const ctx = canvas.getContext('2d');
	const width = canvas.width;
	const height = canvas.height;

	const rows = Math.floor(Math.sqrt(n));
	const cols = Math.ceil(n / rows);

	const cellWidth = width / cols;
	const cellHeight = height / rows;

	const radius = Math.min(cellWidth, cellHeight) / 5;

	ctx.clearRect(0, 0, width, height);

	for (let i = 0; i < n; i++) {
		const row = Math.floor(i / cols);
		const col = i % cols;

		const x = col * cellWidth + (Math.random() * (cellWidth - 2 * radius) + radius);
		const y = row * cellHeight + (Math.random() * (cellHeight - 2 * radius) + radius);

		drawCircleOnCanvas(ctx, x, y, radius);
	}
}
function drawCircleOnCanvas(ctx, x, y, radius) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fillStyle = 'blue';
	ctx.fill();
	ctx.stroke();
}
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

function placeCircles1(container, n) {
	const width = container.clientWidth;
	const height = container.clientHeight;
	const radius = Math.min(width, height) / 2;

	const circleRadius = 10; // Radius of the circles to be placed
	const minDistance = circleRadius * 3; // Minimum distance between circles
	const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Approx. 137.5 degrees in radians

	// Clear existing circles
	while (container.firstChild) {
			container.removeChild(container.firstChild);
	}

	const circles = [];

	// Generate points with slight randomness for more varied distribution
	for (let i = 0; i < n; i++) {
			let valid = false;
			let x, y;

			while (!valid) {
					const angle = i * goldenAngle + (Math.random() - 0.5) * goldenAngle * 0.2;
					const distance = radius * Math.sqrt(i / n) + (Math.random() - 0.5) * radius * 0.1;

					x = radius + distance * Math.cos(angle);
					y = radius + distance * Math.sin(angle);

					valid = true;
					for (const circle of circles) {
							const dx = circle.x - x;
							const dy = circle.y - y;
							if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
									valid = false;
									break;
							}
					}
			}

			circles.push({ x, y });

			// Create and position the circle
			const circle = document.createElement('div');
			circle.classList.add('circle');
			circle.style.width = `${circleRadius * 2}px`;
			circle.style.height = `${circleRadius * 2}px`;
			circle.style.left = `${x - circleRadius}px`;
			circle.style.top = `${y - circleRadius}px`;
			container.appendChild(circle);
	}
}

function placeCircles1(container, n) {
	const width = container.clientWidth;
	const height = container.clientHeight;
	const radiusX = width / 2;
	const radiusY = height / 2;

	const circleRadius = 10; // Radius of the circles to be placed
	const minDistance = circleRadius * 2; // Minimum distance between circles
	const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Approx. 137.5 degrees in radians

	// Clear existing circles
	while (container.firstChild) {
			container.removeChild(container.firstChild);
	}

	const circles = [];

	// Generate points with slight randomness for more varied distribution
	for (let i = 0; i < n; i++) {
			let valid = false;
			let x, y;

			while (!valid) {
					const angle = i * goldenAngle + (Math.random() - 0.5) * goldenAngle * 0.2;
					const distance = Math.sqrt(i / n);

					// Calculate x and y within the ellipse
					x = radiusX + distance * radiusX * Math.cos(angle);
					y = radiusY + distance * radiusY * Math.sin(angle);

					valid = true;
					for (const circle of circles) {
							const dx = circle.x - x;
							const dy = circle.y - y;
							if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
									valid = false;
									break;
							}
					}
			}

			circles.push({ x, y });

			// Create and position the circle
			const circle = document.createElement('div');
			circle.classList.add('circle');
			circle.style.width = `${circleRadius * 2}px`;
			circle.style.height = `${circleRadius * 2}px`;
			circle.style.left = `${x - circleRadius}px`;
			circle.style.top = `${y - circleRadius}px`;
			container.appendChild(circle);
	}
}


//#endregion

//#region bau4 von august 24 24




function arrSort(arr) {
  return arr.sort((a, b) => {
    // Convert both elements to strings for comparison
    const aStr = a.toString();
    const bStr = b.toString();

    // Use localeCompare to handle string comparison
    return aStr.localeCompare(bStr, undefined, { numeric: true });
  });
}
async function mPostYaml(o,path){
	return await mPostRoute('postYaml',{o,path});
}
function trimToAlphanum(str,allow_=true) {
  return str.replace(/^[^a-zA-Z0-9_]+|[^a-zA-Z0-9_]+$/g, '');
}
function normalizeString(s, sep = '_', keep = []) {
  s = s.toLowerCase().trim();
  let res = '';
  for (let i = 0; i < s.length; i++) { if (isAlphaNum(s[i]) || keep.includes(s[i])) res += s[i]; else if (last(res)!=sep) res += sep; }
  return res;
}
function replaceAllSpecialCharsFromList(str, list, sBy, removeConsecutive=true) { 
	for(const sSub of list){
		str=replaceAllSpecialChars(str,sSub,sBy);
	}
	if (removeConsecutive){
		let sresult='';
		while(str.length>0){
			let sSub=str.substring(0,sBy.length);
			str = stringAfter(str,sSub);
			if (sSub == sBy && sresult.endsWith(sBy)) continue;
			sresult += sSub;
			if (str.length<sBy.length) {sresult+=str;break;}
		}
		str=sresult;
	}
	return str;
}
function superTrim(s){
	// Remove all tab or newline characters and trim spaces
	s = s.replace(/[\t\n]/g, ' ').trim();

	// Replace multiple consecutive spaces with a single space
	s = s.replace(/\s\s+/g, ' ');

	// Remove the last semicolon if present
	if (s.endsWith(';')) {
		s = s.slice(0, -1);
	}

}
function extractWords(s, allowed) {
	let specialChars = getSeparators(allowed);
	let parts = splitAtAnyOf(s, specialChars.join('')).map(x => x.trim());
	return parts.filter(x => !isEmpty(x));
}
function getSeparators(allowed) {
	let specialChars = toLetters(' ,-.!?;:');
	if (isdef(allowed)) specialChars = arrMinus(specialChars, toLetters(allowed));
	return specialChars;
}

function toListEntry(s,sep = '_', keep = []) {
	let nogo3=['and'];


}

async function askWiki(query) {
	if (isEmpty(query)) return 'NO QUERY!';
	let response = await mGetRoute('wiki', { question: query });
	return response;
}
async function askHuggingFace(question) {
	//gratis: hugging_face
	if (isEmpty(question)) return 'NO QUESTION!';
	let response = await mGetRoute('fetch_answer', { question });
	return lookup(response, ['answer']) ?? 'ERROR';
}
async function askOpenai(prompt) {
	if (nundef(prompt)) prompt = 'list of 100 very different documentary subjects?';
	let answer = await mPostRoute('ask', { prompt });
	return answer;
}
async function askOpenaiKeyword(word, category = null) {
	if (!category) category = 'def';
	let res = await mPostRoute('ask_details', { word, category });
	return res;
	// if (nundef(word)) return; //prompt = 'list of 100 very different documentary subjects?';
	// //let prompt = pYamlDetails(word,category); =>app.js
	// let answer = await mPostRoute('ask', { prompt });
	// if (answer.includes('```')) answer = stringBeforeLast(stringAfter(answer,'\n'),'\n');
	// let o= jsyaml.load(answer);//console.log('o',o,typeof o);
	// return o;
}
async function askOpenaiListOf(word, num = 100) {
	let res = await mPostRoute('ask_list', { word, num });
	return res;
	// if (nundef(word)) return; //prompt = 'list of 100 very different documentary subjects?';
	// //let prompt = pYamlDetails(word,category); =>app.js
	// let answer = await mPostRoute('ask', { prompt });
	// if (answer.includes('```')) answer = stringBeforeLast(stringAfter(answer,'\n'),'\n');
	// let o= jsyaml.load(answer);//console.log('o',o,typeof o);
	// return o;
}
function pListOf(what) { return 'list of 100 ' + what.toLowerCase(); }
function pYamlDetails(keyword, type, props) {
	if (nundef(props)) {
		switch (type) {
			case 'animal': props = 'class, color, food, habitat, lifespan, name, offsprings, reproduction, size, species, weight'; break;
			case 'location': props = 'population, size, longitude, latitude'; break;
			default: props = 'definition, synonyms, antonyms, german, spanish, french'; break;
		}
	}
	let p = `information about ${keyword}, formatted as yaml object with the following properties: `;
	p += props + '.';
	p += `property values should if possible contain numeric information in scientific (European) metrics.`
	return p;
}
function showYaml(o, title, dParent, styles = {}, opts = {}) {
	o = toFlatObject(o);
	//return showObject(o, null, dParent, styles, addKeys({ title }, opts));
	let d = mDom(dParent,styles,opts); 
	mDom(d, {}, { tag: 'h2', html: title }); 
	let keys = Object.keys(o); 
	let grid = mGrid(keys.length,2,d,{rounding:8,padding:4,bg:'#eee',wmax:500},{wcols:'auto'});
	let cellStyles = {hpadding:4};
	if (isList(o)){
		arrSort(o);
		o.map((x,i)=>{mDom(grid,{fg:'red',align:'right'},{html:i});mDom(grid,{maleft:10},{html:x});});
	}else if (isDict(o)){
		keys.sort();
		for(const k of keys){
			mDom(grid,{fg:'red',align:'right'},{html:k})
			mDom(grid,{maleft:10},{html:o[k]});
		}
	}
	return d;
	// mDom(d, {}, { tag:'pre', html: o });

}
function recFlatten(o) {
	if (isLiteral(o)) return o;
	else if (isList(o)) return o.map(x => recFlatten(x)).join(', ');
	else if (isDict(o)) {
		let valist = [];
		for (const k in o) { let val1 = recFlatten(o[k]); valist.push(`${k}: ${val1}`); }
		return valist.join(', ');
	}
}
function toFlatObject(o) {
	if (isString(o)) return { details: o };
	for (const k in o) { let val = o[k]; o[k] = recFlatten(val); }
	return o;
}
function trimQuotes(str) { return str.replace(/^['"`]+|['"`]+$/g, ''); }



//#endregion

function mist(){
	addIf(DA.selectedPairIds, id);
	let poss = DA.pairInfo.filter(x => x.includes(id));
	assertion(poss.length >= 1, 'no pair selected')
	if (poss.length == 1) {
		lacunaRemovePair(poss[0]);
	} else if (DA.selectedPairIds.length == 2) {
		lacunaRemovePair(DA.selectedPairIds.join(','));
	} else {
		//console.log(divs)
		divs.map(x=>mClassRemove(x, 'pulseFastInfinite'));
		possids = [];
		for(const pair of poss){
			possids = possids.concat(pair.split(','));
		}
		possids.map(x=>mClass(x, 'pulseFastInfinite'));
		mRemoveClass(div, 'pulseFastInfinite');
		lacunaSelectPair(poss);
	}
}
function sortByLeastX(olist) {
	return olist.sort((a, b) => {
			// Find the minimum x value in each pair
			const minX_A = Math.min(a.xStart, a[1].x);
			const minX_B = Math.min(b[0].x, b[1].x);

			// Sort by the minimum x value
			return minX_A - minX_B;
	});
}
function lacunaSelectPair(ev, pairs, p) {
	//console.log('___click',p);
	//console.log(p.pairs);
	//p is a start or end point that has been clicked
	//pairs is the list of pairs that are currently highlighted

	//if p is included in more than 1 pair of pairs, select the corresponding other endpoints
	let poss = pairs.filter(x => x.includes(p.id));
	if (poss.length > 1) {
		let ids = [];
		for (const pair of poss) {
			let [pstart, pend] = pair.split(',').map(x => mBy(x));
			mClassRemove(pstart, 'pulseFastInfinite');
			mClassRemove(pend, 'pulseFastInfinite');
			ids = ids.concat(pair.split(','));
		}
		ids = ids.filter(x => x != p.id);
		ids.map(x => mClass(mBy(x), 'pulseFastInfinite'));
		return;
	}

	//if p is included in only 1 pair of pairs, select it and remove both points and the line between

	
	for (const pair of p.pairs) {
		//highlight the end points corresponding to this pair
		let [pstart, pend] = pair.split(',').map(x => mBy(x));
		mClass(pstart, 'pulseFastInfinite');
		mClass(pend, 'pulseFastInfinite');
	}
}
function mist(){
	for(const k in linesByPair){
		let line=linesByPair[k];
		let allOtherPairs=Object.keys(linesByPair).filter(x=>x!==k);
		for(let i=0;i<line.length-1;i++){
			//compare this point to all points of all other lines
			let p1=line[i];
			for(const kOther of allOtherPairs){
				for(const p2 of kOther){
					let dist=getDistanceBetweenPoints(p1,p2);
					console.log(p1,p2,dist);
					if (dist<sz){
						p1.bg='blue';mStyle(p1.div,{bg:'blue'});
						p2.bg='blue';mStyle(p2.div,{bg:'blue'});
						addIf(p2.pairs,k);
						addIf()
						//for(const 1addIf(p1.pairs,p2.id);
						//p1.pairs.push()
					}
				}
			}
		}
	}

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
