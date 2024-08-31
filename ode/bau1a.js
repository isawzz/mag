
function findClosestMeeple(p){
	console.log('p', p);
	let fen = T.fen;
	let dist = 9999999;
	let closestMeeple = null;
	for (const meeple of fen.meeples) {
		console.log('meeple', meeple);
		let d = getDistanceBetweenCenters(mBy(p.id),mBy(meeple.id)); //getDistanceBetweenPoints(p, meeple);
		console.log('d', d);
		if (d < dist) {
			dist = d;
			closestMeeple = meeple;
		}
	}
	return closestMeeple;
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


