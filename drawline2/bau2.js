var counter = 0;
function drawFullLine(o1, o2, height, color) {
	let [p1,p2]=[o1.center,o2.center];
	const line = document.createElement('div');// mDom(d);
	
	// Calculate the distance and angle between the points
	const distance = Math.hypot(p2.x - p1.x, p2.y - p1.y);
	const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

	// Style the line
	line.style.position = 'absolute';
	line.style.transformOrigin = '0 0';
	line.style.transform = `rotate(${angle}deg)`;
	line.style.height = `${height}px`; //'2px';
	//line.style.border = 'solid black 11px';
	line.style.width = `${distance}px`;
	line.style.backgroundColor = color;
	line.style.left = `${p1.x}px`;
	line.style.top = `${p1.y}px`;
	line.setAttribute('endpoints',`${o1.div.id},${o2.div.id}`);

	// Add mouseover event
	line.addEventListener('mouseover', () => {
			// line.style.backgroundColor = 'red';
			console.log('mouseover',counter++);
			let endpoints = line.getAttribute('endpoints');//console.log(endpoints);
			let ep=endpoints.split(',');
			//console.log(ep);
			for(let i=0;i<ep.length;i++){
				let id=ep[i];
				mStyle(id,{rounding:0});
				//mBy(ep[i]).style.backgroundColor = 'red';
			}
	});

	line.addEventListener('mouseout', () => {
		console.log('OUT',counter++);
		let endpoints = line.getAttribute('endpoints');//console.log(endpoints);
		let ep=endpoints.split(',');
		//console.log(ep);
		for(let i=0;i<ep.length;i++){
			let id=ep[i];
			mStyle(id,{rounding:'50%'});
			//mBy(id).style.backgroundColor = Items[id].bg;

		}
		// line.style.backgroundColor = color;
	});

	// Append the line to the body or a specific container
	document.body.appendChild(line);

	return line;
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


