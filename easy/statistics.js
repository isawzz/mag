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
function factorial(x) {
  if (x === 0 || x === 1) {
    return 1;
  }
  return x * factorial(x - 1);
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
function normalExpectedValue(mean) {
  return mean; // The expected value (mean) is simply the mean of the distribution
}
function normalVariance(stdDev) {
  return Math.pow(stdDev, 2); // Variance is the square of the standard deviation
}

