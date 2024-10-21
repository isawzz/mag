
function calculateStatistics(values) {
	const mean = values.reduce((sum, value) => sum + value, 0) / values.length;

	const sortedValues = [...values].sort((a, b) => a - b);
	console.log(sortedValues);
	let spannweite = sortedValues[sortedValues.length - 1] - sortedValues[0];
	const mid = Math.floor(sortedValues.length / 2);
	const median = sortedValues.length % 2 === 0 ?
		(sortedValues[mid - 1] + sortedValues[mid]) / 2 :
		sortedValues[mid];

	const frequencyMap = {};
	let maxFreq = 0;
	let mode = [];

	values.forEach(value => {
		frequencyMap[value] = (frequencyMap[value] || 0) + 1;
		if (frequencyMap[value] > maxFreq) {
			maxFreq = frequencyMap[value];
			mode = [value];
		} else if (frequencyMap[value] === maxFreq) {
			mode.push(value);
		}
	});
	mode = [...new Set(mode)];

	const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length;
	const standardDeviation = Math.sqrt(variance);

	return {
		spannweite,
		mean: mean,
		median: median,
		mode: mode,
		variance: variance,
		standardDeviation: standardDeviation
	};
}
function replaceCommasWithDots(inputString) {
	return inputString.replace(/,/g, '.');
}
function formatFloatToDecimal(num,n=3) {
	// Convert the number to a float and limit to 4 decimal places
	return parseFloat(num.toFixed(n));
}

