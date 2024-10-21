


function calculateStatistics(values) {
	// Mean
	const mean = values.reduce((sum, value) => sum + value, 0) / values.length;

	// Median
	const sortedValues = [...values].sort((a, b) => a - b);
	const mid = Math.floor(sortedValues.length / 2);
	const median = sortedValues.length % 2 === 0 ? 
			(sortedValues[mid - 1] + sortedValues[mid]) / 2 : 
			sortedValues[mid];

	// Mode
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
	mode = [...new Set(mode)]; // Remove duplicates if multiple modes

	// Variance
	const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length;

	// Standard Deviation
	const standardDeviation = Math.sqrt(variance);

	return {
			mean: mean,
			median: median,
			mode: mode,
			variance: variance,
			standardDeviation: standardDeviation
	};
}


