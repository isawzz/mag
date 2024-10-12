
function myLayout(container) {
	let topDiv = mDom(container, { bg: 'lightblue', padding: 10 }, { html: "Top div - grows with content." });
	topDiv.style.gridArea = 'top';

	let leftDiv = mDom(container, { overy: 'auto', w: 60, transition: 'width 0.5s ease', bg: 'lightgray', padding: 10 });
	leftDiv.style.gridArea = 'left';

	let menuSymbol = mDom(leftDiv, { cursor: 'pointer', fz: 24 }, { html: getMenuSymbol() });

	let rightDiv = mDom(container, { overy: 'scroll', bg: 'lightgreen', padding: 10 }, { html: "Right content area with scrollable content." });
	rightDiv.style.gridArea = 'right';

	mStyle(container, { display: 'grid', gridCols: 'auto 1fr', gridRows: 'auto 1fr', dir: 'column', h: '100vh' });
	container.style.gridTemplateAreas = `
			'top top'
			'left right'
	`;

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