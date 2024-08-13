
function alertOnPointHover(elem, di, threshold = 2) {
	elem.addEventListener('mousemove', (ev) => {
		const rect = elem.getBoundingClientRect();
		const mouseX = ev.clientX - rect.left;
		const mouseY = ev.clientY - rect.top;

		if (isdef(di[mouseX]) && isdef(di[mouseX][mouseY])) {
			console.log(`Mouse over point (${mouseX}, ${mouseY})`, di[mouseX][mouseY]);
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



