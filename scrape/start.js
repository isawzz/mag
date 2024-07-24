onload=start;

async function start() { await prelims(); await test0(); }

async function test0(){

	console.log(M.cities)
	mBy('inpCity').value = rChoose(M.capitals);
}

async function prelims(){
	await loadAssets();
	getCapitals();
	mBy('bGo').onclick = onclickGo;
	mBy('bNewCity').onclick = setRandomCity;
}
