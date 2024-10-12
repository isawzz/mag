
function createLayout(container) {
	// Create the top div (auto height)
	const topDiv = document.createElement('div');
	topDiv.style.gridArea = 'top';
	topDiv.style.backgroundColor = 'lightblue';
	topDiv.style.padding = '10px';
	topDiv.textContent = "Top div - stays on top.";

	// Create the left (sidebar) div
	const leftDiv = document.createElement('div');
	leftDiv.style.gridArea = 'left';
	leftDiv.style.backgroundColor = 'lightgray';
	leftDiv.style.transition = 'width 0.5s ease'; // Smooth transition for open/close
	leftDiv.style.overflowY = 'auto';
	leftDiv.style.width = '60px'; // Initial width of the sidebar (collapsed)
	leftDiv.style.padding = '10px';

	// Add the 'menu' symbol to the sidebar
	const menuSymbol = document.createElement('div');
	menuSymbol.textContent = "☰"; // Menu symbol (three lines)
	menuSymbol.style.cursor = 'pointer';
	menuSymbol.style.fontSize = '24px';
	leftDiv.appendChild(menuSymbol);

	// Create the right div (main content area)
	const rightDiv = document.createElement('div');
	rightDiv.style.gridArea = 'right';
	rightDiv.style.backgroundColor = 'lightgreen';
	rightDiv.style.overflowY = 'scroll'; // Scrollbar for overflow content
	rightDiv.style.padding = '10px';

	// Example content for rightDiv
	const content = document.createElement('div');
	content.textContent = "This is the main content area. It will shrink when the sidebar opens.";
	rightDiv.appendChild(content);

	// Apply grid layout to the container
	container.style.display = 'grid';
	container.style.gridTemplateColumns = 'auto 1fr'; // Sidebar auto width, content takes the rest
	container.style.gridTemplateRows = 'auto 1fr'; // Top auto height, content takes the rest
	container.style.gridTemplateAreas = `
			'top top'
			'left right'
	`;
	container.style.height = '100vh'; // Full viewport height

	// Append top, left, and right divs to the container
	container.appendChild(topDiv);
	container.appendChild(leftDiv);
	container.appendChild(rightDiv);

	// Toggle sidebar open/close on menu symbol click
	let sidebarOpen = false;
	menuSymbol.addEventListener('click', () => {
		if (sidebarOpen) {
			leftDiv.style.width = '60px'; // Collapse the sidebar
		} else {
			leftDiv.style.width = '200px'; // Expand the sidebar
		}
		sidebarOpen = !sidebarOpen;
	});

	return [topDiv, leftDiv, rightDiv, menuSymbol];
}



