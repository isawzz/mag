
async function onclickGo() {
	let inp = mBy('inpCity');
	let city = inp.value;
	if (isEmpty(city)) { setRandomCity(); return; }

	if (city.length == 1){
		await processGenerateCitiesYaml(city.toUpperCase());
		return;
	}

	await processCityData(city);
}
function setRandomCity() { mBy('inpCity').value = rChoose(M.capitals); }


