
function arrNoDuplicates(arr) {	return [...new Set(arr)];}
function divInt(a, b) { return Math.trunc(a / b); }
function downloadAsCode(obj,fname) {
	function convertObjectToCode(obj) {
		if (typeof obj === 'object' && !Array.isArray(obj)) {
			const entries = Object.entries(obj)
				.map(([key, value]) => `${key}: ${convertObjectToCode(value)}`)
				.join(',\n');
			return `{\n${entries}\n}`;
		} else if (Array.isArray(obj)) {
			return `[${obj.map(convertObjectToCode).join(', ')}]`;
		} else if (typeof obj === 'string') {
			return `"${obj}"`;  // wrap strings in quotes
		} else {
			return obj;  // numbers, booleans, etc. don't need quotes
		}
	}
	// Convert the JS object to a code string with unquoted keys
	const objectAsCode = `const O = ${convertObjectToCode(obj)};`;

	// Create a blob with the code as text
	const blob = new Blob([objectAsCode], { type: 'text/javascript' });

	// Create a download link for the file
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = fname+'.js'; // Name of the file to be downloaded

	// Trigger the download
	document.body.appendChild(link);
	link.click();

	// Clean up by removing the link
	document.body.removeChild(link);
}



