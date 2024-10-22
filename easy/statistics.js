function binomialCoefficient(n, k) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}
function binomialCoefficient(n, k) {
  // Take advantage of symmetry property: C(n, k) = C(n, n-k)
  if (k > n - k) {
    k = n - k;
  }

  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= (n - i);
    result /= (i + 1);
  }

  return result;
}
function binomialPdf(n, p, k) {
  if (k < 0 || k > n) {
    return 0;  // Binomial coefficient is 0 if k is out of range
  }
  
  const binomCoeff = binomialCoefficient(n, k);
  return binomCoeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
}
function binomialCdf(n, p, lb, ub) {
  let cumulativeProbability = 0;
  
  // Sum the probabilities from lb to ub
  for (let k = lb; k <= ub; k++) {
    cumulativeProbability += binomialPdf(n, p, k);
  }

  return cumulativeProbability;
}
function binomialVariance(n, p) {
  return n * p * (1 - p);
}
function binomialStd(n, p) {
  return Math.sqrt(binomialVariance(n, p));
}
function calculateCDF(xValues, probabilities) {
	if (xValues.length !== probabilities.length) {
			throw new Error("The lengths of xValues and probabilities must be equal.");
	}

	// First, ensure the probabilities sum to 1 (normalization)
	const totalProbability = probabilities.reduce((sum, prob) => sum + prob, 0);
	const normalizedProbabilities = probabilities.map(prob => prob / totalProbability);

	// Calculate the cumulative distribution
	let cumulativeSum = 0;
	const cdf = normalizedProbabilities.map((prob, index) => {
			cumulativeSum += prob;
			return {
					x: xValues[index],
					cumulativeProbability: cumulativeSum
			};
	});

	return cdf;
}
function calculateExpectedValue(xlist,ylist){
	let res = 0;
	for (let i = 0; i < xlist.length; i++) {
		res += xlist[i] * ylist[i];
	}
	return res;

}
function calculateMean(values) {
	// Mean
	const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
	return mean;
}
function calculateStatistics(xlist,ylist){
	//compute expected value
	let n=xlist.length;
	let mu = 0;
	for (let i = 0; i < n; i++) {
		mu += xlist[i] * ylist[i];
	}
	//console.log('res', mu);
	//compute variance
	let v = 0;
	for (let i = 0; i < n; i++) {
		v += ylist[i] * (xlist[i] - mu) ** 2;
	}
	//console.log('v', v);

	//compute standard deviation
	let stdev=Math.sqrt(v);
	//console.log('std', Math.sqrt(v));

	const mean = xlist.reduce((sum, value) => sum + value, 0) / xlist.length;

	// Median
	const sortedValues = [...xlist].sort((a, b) => a - b);
	const mid = Math.floor(sortedValues.length / 2);
	const median = sortedValues.length % 2 === 0 ? 
			(sortedValues[mid - 1] + sortedValues[mid]) / 2 : 
			sortedValues[mid];

	// Mode
	const frequencyMap = {};
	let maxFreq = 0;
	let mode = [];

	xlist.forEach(value => {
			frequencyMap[value] = (frequencyMap[value] || 0) + 1;
			if (frequencyMap[value] > maxFreq) {
					maxFreq = frequencyMap[value];
					mode = [value];
			} else if (frequencyMap[value] === maxFreq) {
					mode.push(value);
			}
	});
	mode = [...new Set(mode)]; // Remove duplicates if multiple modes


	return {mu,v,stdev,mean,median,mode};

}
function _calculateStatistics(values,mu) {
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
function erf(x) {
  // Constants for approximation
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  // Save the sign of x
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  // A&S formula 7.1.26
  const t = 1 / (1 + p * x);
  const y = ((((((a5 * t + a4) * t) + a3) * t + a2) * t) + a1) * t;

  return sign * (1 - y * Math.exp(-x * x));
}
function factorial(x) {
  if (x === 0 || x === 1) {
    return 1;
  }
  return x * factorial(x - 1);
}
function formatFloatToDecimal(num,n=3) {
	// Convert the number to a float and limit to 4 decimal places
	return parseFloat(num.toFixed(n));
}
function getValuesFromInput(id){
	let input = document.getElementById(id).value;
	input = replaceCommasWithDots(input);
	// let values = input.split(' ').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
	let values = input.split(' ').map(s => eval(s.trim())).map(num=>parseFloat(num)).filter(num => !isNaN(num));
	//values.sort();
	console.log(values);
	return values;

}
function minTrialsForSuccess(x, p) {
	// Convert x percentage to a decimal

	console.log(x,p);

	const xDecimal = x; // / 100;

	// Calculate the minimum number of trials
	const trials = Math.ceil(Math.log(1 - xDecimal) / Math.log(1 - p));

	return trials;
}
function normalPdf(x, mean, stdDev) {
  const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  return coefficient * Math.exp(exponent);
}
function normalCdf(x, mean, stdDev) {
  return 0.5 * (1 + erf((x - mean) / (stdDev * Math.sqrt(2))));
}
function normalExpectedValue(mean) {
  return mean; // The expected value (mean) is simply the mean of the distribution
}
function normalVariance(stdDev) {
  return Math.pow(stdDev, 2); // Variance is the square of the standard deviation
}
function replaceCommasWithDots(inputString) {
	return inputString.replace(/,/g, '.');
}

