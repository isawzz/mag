
function getBanner(){
	mByClass('wpb-name');
}
async function processCityData(city){
	let data = await mGetRoute('city', { city });
	if (!data) {
		setRandomCity()
		data = 'Try again!';
	}
	mBy('preResult').innerText = data;


}





