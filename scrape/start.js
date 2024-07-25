onload = start;

async function start() { await prelims(); await test5_pagetitles(); }

async function test5_pagetitles(){
	let diTitles = M.pageTitles = await mGetYaml(`../y/pagetitles.yaml`);
	console.log(Object.values(diTitles)); //167843 titles in wikivoyage

	//which titles are also cities? how many of them?
	let incities=[];
	for(const c in M.cities){ 
		let norm=normalizeString(c);
		if (norm in diTitles){incities.push(c); }
	}
	console.log(incities); //6601 cities sind da

	//das ist perfekt!
	//von all denen hol ich jetzt die images
	//schauen wir ob die banners alle da sind
	let diPics = {};
	for(const c of incities){ //}.filter(x=>!x.includes(' '))){
		let html=await mGetRoute(`cityweb/${encodeURIComponent(c)}`); //'cityweb',{city:c});
		if (!html) continue;
		//console.log(typeof html,html); return;
		let norm = normalizeString(c);
		diPics[norm]=getImages(html.text);
		//break;
	}
	console.log('diPics',diPics);
	downloadAsYaml(diPics,'pics.yaml');
}
async function test4_big(){
	let dict = M.bigdata = await mGetYaml('../bigdata.yaml');
	
	let d=clearFlex();

	let city=rChoose(M.capitals);console.log(city)
	let s = dict[city];

	let dOben=mDom(d,{},{html:'info'})
	let dpre = mDom(d,{},{tag:'pre'});
	//console.log(dict)
	dpre.innerText=s;

	let title = firstAfter(s,'wpb-banner-image-panorama','wpb-name">','<');
	let d1=mDom(dOben,{},{html:title,tag:'h1'});
	console.log(title);

	let banner = firstAfter(s,'wpb-banner-image-panorama','src="','"');
	let img=mDom(dOben,{},{tag:'img',src:banner});
	console.log(banner);

	let rest = stringAfter(s,banner);
	let pics = getImages(rest).filter(x=>{let y=x.toLowerCase();return !['flag','.svg'].some(z=>y.includes(z));});
	for(const pic of pics){img=mDom(dOben,{},{tag:'img',src:pic});}
	console.log(pics);

	//let extract=

}

function firstAfter(s,sSub,start,end){
	let rest = stringAfter(s,sSub);
	return stringBetween(rest,start,end);
}

async function test3() {

	console.log(Object.keys(M.cities)); //return;
	let dict = {};
	for (const city in M.cities) { //arrTake(M.capitals,200)){

		let data;
		try {
			data = await mGetRoute('city', { city });
			if (!data) continue;
			dict[city] = data;
			getShortInfo(data)
		} catch {
			downloadAsYaml(dict, 'dict');
			return;
		}

	}

}
async function test2() {

	let bdata = await mGetYaml('../bigdata.yaml');
	for (const ci in bdata) {
		console.log(ci, bdata[ci].length);
	}
	console.log('number', Object.keys(bdata));
}

async function test1() {

	let dict = {};
	for (const city of arrTake(M.capitals, 200)) {
		let data = await mGetRoute('city', { city });
		if (!data) continue;
		dict[city] = data;
		getShortInfo(data)

	}
	downloadAsYaml(dict, 'dict');

}
async function test0() {

	//console.log(M.cities);
	setRandomCity();

	DA.bdata = {};

}

async function prelims() {
	await loadAssets();
	getCapitals();
	mBy('bGo').onclick = onclickGo;
	mBy('bNewCity').onclick = setRandomCity;
}
