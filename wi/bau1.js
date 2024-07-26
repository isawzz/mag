
function getBanner() {
	mByClass('wpb-name');
}

function getImages(s) {
	let parts = s.split('<img');
	let list = [];
	for (const p of parts) {
		//console.log(p);
		//console.log(list)
		let url = stringAfter(p, 'src="');
		url = stringBefore(url, '"');


		list.push(url);
	}
	return list;
}

function getShortInfo(s){
	let parts = s.split('class="mw-body-content"');
	assertion(parts.length == 2,s)
	console.log(parts);
}
async function processGenerateCitiesYaml(letter){
	let kcities=Object.keys(M.cities);
	let kpages=Object.values(M.pageTitles);
	console.log('cities',kcities.length,'pages',kpages.length);

	let di={};
	let keys = kcities.filter(x=>x[0].toUpperCase() == letter); 
	//console.log(keys);// return;
	for(const city of keys){
		console.log(city)
		let nc=normalizeString(city);
		for(const k in M.pageTitles){
			if (['file_','category_','talk_','user_'].some(x=>k.startsWith(x))) continue;
			let title=M.pageTitles[k];
			//let nt=normalizeString(title);
			let twords=toWords(title);
			let cwords=toWords(city);
			if (cwords.some(x=>!twords.includes(x))) continue;
			di[k]={city,title};
			console.log('yes');
			//else if (nt.includes(nc)) di[k]={city,title,needkeys:true};
		}
		//break;
	}
	downloadAsYaml(di,`included_${letter}`);
}
async function processCityData(city) {
	let data = await mGetRoute('city', { city });
	if (!data) { setRandomCity(); data = 'Try again!'; }

	//mBy('preResult').innerText = data;

	//let doc = mCreateFrom(data);
	//mAppend('dMain',doc);
	console.log(typeof data);

	getShortInfo(data)

	let o = DA.bdata[city.toLowerCase()] = {};

	let d = mBy('dMain'); mClear(d);

	let s = stringAfter(data, '<h1 class="wpb-name">');
	let title = stringBefore(s, '</h1>'); o.title = title;
	mDom(d, {}, { html: `<h1>${title}</h1>` });

	let weg = stringBefore(s, '<img');
	let html = '<img' + stringBefore(stringAfter(s, '<img'), '</a>');
	mDom(d, {}, { html });
	let rest = stringAfter(s, '</a>');
	o.banner = stringAfter(html, 'src="');
	o.banner = stringBefore(o.banner, '"');

	o.pics = getImages(rest);

	console.log('*** THE END ***')

	console.log(o);


	for (const url of o.pics) {
		if (url.startsWith('//upload')) mDom(d, {}, { tag: 'img', src: url });
	}
	//mBy('preResult').innerText = rest;

}





