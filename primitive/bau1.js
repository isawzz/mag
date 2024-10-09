

function insertDivs(container) {
	// Create the top div
	const topDiv = document.createElement('div');
	topDiv.style.backgroundColor = 'lightblue'; // Optional styling
	topDiv.style.padding = '10px';
	topDiv.textContent = "Top div - height is auto, grows with content.";
	
	// Create the bottom div
	const bottomDiv = document.createElement('div');
	bottomDiv.style.backgroundColor = 'lightgreen'; // Optional styling
	bottomDiv.style.padding = '10px';
	bottomDiv.style.overflowY = 'scroll';
	bottomDiv.textContent = "Bottom div - scrollable if content overflows.";
	
	// Add some content to the bottom div to demonstrate scrolling
	for (let i = 0; i < 20; i++) {
			const p = document.createElement('p');
			p.textContent = `Scrollable content ${i + 1}`;
			bottomDiv.appendChild(p);
	}

	// Apply CSS to the container to use Grid layout
	container.style.display = 'grid';
	container.style.gridTemplateRows = 'auto 1fr'; // Top div auto, bottom div fills the remaining space
	container.style.height = '100%'; // Ensure container has height constraint
	
	// Append the divs to the container
	container.appendChild(topDiv);
	container.appendChild(bottomDiv);

	return [topDiv,bottomDiv]
}


