
onload=start;
function start(){

	

	// Example usage
	const circles = Array.from(document.querySelectorAll('.circle'));
	drawLinesBetweenCircles(circles, 'lineCanvas');
}
	



function placeCircles(container, n) {
	const width = container.clientWidth;
	const height = container.clientHeight;
	const radiusX = width / 2;
	const radiusY = height / 2;

	const circleRadius = Math.min(10, 10 * 40 / n); // Radius of the circles to be placed
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

		let o = { x, y, rad: circleRadius };

		// Create and position the circle
		const circle = document.createElement('div');
		circle.classList.add('circle');
		circle.style.width = `${circleRadius * 2}px`;
		circle.style.height = `${circleRadius * 2}px`;
		circle.style.left = `${x - circleRadius}px`;
		circle.style.top = `${y - circleRadius}px`;
		container.appendChild(circle);

		o.div = circle;
		circles.push(o);

	}
	return circles;
}


function getCenter(circle) {
	const rect = circle.getBoundingClientRect();
	const containerRect = mBy('container').getBoundingClientRect();
	return {
		x: rect.left - containerRect.left + rect.width / 2,
		y: rect.top - containerRect.top + rect.height / 2
	};
}

function isLineIntersectingCircle(x1, y1, x2, y2, circle, radius) {
	const distToCircle = distanceToLineSegment(x1, y1, x2, y2, circle.x, circle.y);
	return distToCircle < radius;
}

function distanceToLineSegment(x1, y1, x2, y2, px, py) {
	const lineLength = Math.hypot(x2 - x1, y2 - y1);
	if (lineLength === 0) return Math.hypot(px - x1, py - y1);

	const t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / Math.pow(lineLength, 2);
	const closestX = x1 + t * (x2 - x1);
	const closestY = y1 + t * (y2 - y1);

	return Math.hypot(px - closestX, py - closestY);
}

function isClearLine_NOPE(circle1, circle2) {
	const { x: x1, y: y1 } = getCenter(circle1);
	const { x: x2, y: y2 } = getCenter(circle2);
	const radius = parseInt(window.getComputedStyle(circle1).width) / 2;

	return !circles.some(circle => {
		if (circle === circle1 || circle === circle2) return false;
		const { x, y } = getCenter(circle);
		return isLineIntersectingCircle(x1, y1, x2, y2, { x, y }, radius);
	});
}
function isClearLine(circle1, circle2, circles) {
	const { x: x1, y: y1 } = getCenter(circle1);
	const { x: x2, y: y2 } = getCenter(circle2);
	const radius = parseInt(window.getComputedStyle(circle1).width) / 2;

	return !circles.some(circle => {
		if (circle === circle1 || circle === circle2) return false;
		const { x, y } = getCenter(circle);
		const circleRadius = parseInt(window.getComputedStyle(circle).width) / 2;
		return isLineIntersectingCircle(x1, y1, x2, y2, x, y, circleRadius);
	});
}
function drawLinesBetweenCircles(circles, canvasId) {
	const canvas = document.getElementById(canvasId);
	const ctx = canvas.getContext('2d');

	// Resize canvas to fit the container
	canvas.width = canvas.parentElement.clientWidth;
	canvas.height = canvas.parentElement.clientHeight;

	// Clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw lines between circles
	for (let i = 0; i < circles.length; i++) {
		for (let j = i + 1; j < circles.length; j++) {
			const circle1 = circles[i];
			const circle2 = circles[j];
			if (isClearLine(circle1, circle2,circles)) {
				const { x: x1, y: y1 } = getCenter(circle1);
				const { x: x2, y: y2 } = getCenter(circle2);

				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.strokeStyle = '#000';
				ctx.lineWidth = 2;
				ctx.stroke();
			}
		}
	}
}

