
function filterColorsByFunc(colors, func) {
	let filteredColors = [];
	for (let color of colors) {
		if (func(color)) {
			filteredColors.push(color);
		}
	}
	return filteredColors;
}
function sortColorsByFunc(colors, func) {
	return colors.sort(func);
}
function mapColorsByFunc(colors, func) {
	let mappedColors = [];
	for (let color of colors) {
		mappedColors.push(func(color));
	}
	return mappedColors;
}

