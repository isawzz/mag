
async function onclickFMuVar(ev) {
	let xlist = getValuesFromInput('inp_x');
	let ylist = getValuesFromInput('inp_y');

	let cdfResult = calculateCDF(xlist,ylist); console.log(cdfResult);
	mBy('res_F').innerHTML = cdfResult.map(x=>x.cumulativeProbability).join(' ');

	// let mu = calculateExpectedValue(xlist,ylist); console.log(mu);

	let res = calculateStatistics(xlist, ylist); console.log(res)
	mBy('res_mu').innerHTML = res.mu;
	mBy('res_var').innerHTML = res.v;
	mBy('res_stdev').innerHTML = res.stdev;
	mBy('res_mean').innerHTML = res.mean;
	mBy('res_median').innerHTML = res.median;
	mBy('res_mode').innerHTML = res.mode.join(' ');

}	
