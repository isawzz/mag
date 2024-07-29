
async function getInfo(title){
	let di=await mGetYaml(`../wikisaves/bytitle`);
	return di[title];
}
async function getChatGpt(title){
	let info=await getInfo(title);
	if (isCity(info)){
		let prompt=`for the City of ${title}, provide a yaml object with the following properties: country,longitude,latitude,population,language,climate,famous_for`;
		
	}
}