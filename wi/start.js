onload = start;

async function start() { await prelims(); await test7_pageIds(); }

async function test7_pageIds() {
	console.log('DONE! next: downloads => filenofile10-167!')
	max=168000; return;
	for(let i=117400;i<max;i+=100){
		let [di,nodi]=await sammelPages(i,100);
		downloadAsYaml(di,`file_${i}`);
		downloadAsYaml(nodi,`nofile_${i}`);
		//console.log(di,nodi);
	}
}
async function sammelPages(istart,inum){
	let di = {}, nodi={};
	max=168000;
	for (let id = istart; id < Math.min(istart + inum, max); id++) {
		let result = await mGetRoute(`pageInfo/${encodeURIComponent(id)}`);
		assertion(isdef(result),`problem page id ${id}`);
		let kpage = Object.keys(result)[0];
		let o = result[kpage];
		let cats = o.categories;
		if (isList(cats) && cats.some(x => x.title.includes('articles'))) {
				let entry = di[id] = { title:o.title, cats:cats.map(x=>stringAfter(x.title,':')) };
				console.log(`${id}:`,entry);
		}else {
			let ono={title:o.title};addKeys(o,ono);nodi[id]=ono;
		}
	}
	return [di,nodi]; //
	//downloadAsYaml(di,`file_${istart}`);
	//downloadAsYaml(nodi,`nofile_${istart}`);
}
async function test7_pageTitles() {
	//to each page title 
	//console.log(Object.keys(M.pageTitles).length);
	let vals = ['Vienna']; //
	//vals = Object.values(M.pageTitles); //'Vienna';
	let di = {}, nodi={};
	let istart = 0, inum = 20, keys = Object.keys(M.pageTitles);
	for (let i = istart; i < Math.min(istart + inum, keys.length); i++) {
		let k = keys[i];
		let title = M.pageTitles[k]; //title of arrTake(vals,20)){
		//console.log(title);return;
		if (isNumber(title)) continue;
		//console.log(encodeURIComponent(title));
		let result = await mGetRoute(`details/${encodeURIComponent(title)}`);
		let kpage = Object.keys(result)[0];
		let o = result[kpage];
		let cats = o.categories;
		if (isList(cats) && cats.some(x => x.title.includes('articles'))) {
				di[k] = { title, cats:cats.map(x=>stringAfter(x.title,':')) };
				console.log(`${i}:`,o);
				//return;
		}else nodi[k]={title,o};
		//console.log(cats); //return;

	}
	downloadAsYaml(di,`file_${istart}`);
	downloadAsYaml(nodi,`nofile_${istart}`);
}
async function test6_consolidateCityInfo() {
	let dir = '../y/cityinfo'
	let files = await mGetFiles(dir);
	console.log(files);
	let di = {};
	let star = [], usable = [], cities = [], goodcities = [];
	let status = [];
	for (const fname of files) {
		let odi = await mGetYaml(dir + '/' + fname);
		for (const k in odi) {
			let c = odi[k];
			di[k] = c;
			addIf(status, c.status);
			if (c.status == 'star') star.push(k)
			if (c.status == 'usable') usable.push(k)
			if (c.isCity) cities.push(k);
			if (c.isCity && c.status != 'unknown') goodcities.push(k)
		}
	}
	star.sort(); usable.sort(); cities.sort(); goodcities.sort();
	let newdi = sortDictionary(di)
	console.log('star', star)
	console.log('usable', usable)
	console.log('cities', cities)
	console.log('goodcities', goodcities);
	downloadAsYaml(newdi, 'di');
	downloadAsYaml({ star, usable, cities, goodcities }, 'lists');
}
async function test5_pagetitles3() {
	//await clearCityGood();
}
async function test5_pagetitles2() {
	//which titles are also cities? how many of them?
	let incities = {};
	for (const c in M.cities) {
		let norm = normalizeString(c);
		let title = diTitles[norm];
		if (nundef(title)) { console.log('NOT in titles', norm); continue; }
		incities[norm] = { cities_entry: c, voyage_entry: diTitles[norm] };
	}
	console.log(Object.keys(incities)); //6601 cities sind da
	//das ist perfekt!
	//von all denen hol ich jetzt die images
	//schauen wir ob die banners alle da sind
	let diPics = {};
	for (const norm in incities) { //}.filter(x=>!x.includes(' '))){
		let city = incities[norm].voyage_entry;
		console.log('city', city)
		let html = await mGetRoute(`cityweb/${encodeURIComponent(city)}`); //'cityweb',{city:c});
		if (!html) continue;
		//console.log(typeof html,html); return;
		diPics[norm] = getImages(html.text);
		//break;
	}
	console.log('diPics', diPics);
	downloadAsYaml(diPics, 'pics.yaml');
}


async function test6_pics() {
	let di = await mGetYaml('../y/pagepics.yaml');
	console.log(di.a_coruna);
	//return;
	let d = clearFlex({ bg: 'red' }); //mDom(d,{},{html:'hello'});
	let dinew = {}; let nogo = {};
	let keys = Object.keys(di); //['a_coruna'];
	keys = keys.filter(x => x.startsWith('a'));
	for (const k of keys) { //arrTake(keys,10)) {

		mDom(d, {}, { tag: 'h1', html: k });
		let list = di[k];
		dinew[k] = [];
		nogo[k] = [];
		let started = false;
		for (const url of list) {
			if (['commons', 'banner', '2560px'].some(x => url.toLowerCase().includes(x))) started = true;
			if (!started) { nogo[k].push(url); continue; }
			if (['gpx_', 'icon', '25px', '1x1', '50px', 'maps', 'load.php', '.svg', 'flag'].some(x => url.toLowerCase().includes(x))) continue;
			try {
				console.log(url)
				mDom(d, {}, { tag: 'img', src: url });
				dinew[k].push(url);
			} catch {
				console.log('NOT', k, url);
				nogo[k].push(url);
			}
		}
		mLinebreak(d);
	}
	console.log(dinew, nogo);
	downloadAsYaml(dinew, 'dinew');
	downloadAsYaml(nogo, 'nogo');
}
async function test5_pagetitles() {
	let diTitles = M.pageTitles = await mGetYaml(`../y/pagetitles.yaml`);
	console.log(Object.values(diTitles)); //167843 titles in wikivoyage

	//which titles are also cities? how many of them?
	let incities = {};
	for (const c in M.cities) {
		let norm = normalizeString(c);
		let title = diTitles[norm];
		if (nundef(title)) { console.log('NOT in titles', norm); continue; }
		incities[norm] = { cities_entry: c, voyage_entry: diTitles[norm] };
	}
	console.log(Object.keys(incities)); //6601 cities sind da
	//das ist perfekt!
	//von all denen hol ich jetzt die images
	//schauen wir ob die banners alle da sind
	let diPics = {};
	for (const norm in incities) { //}.filter(x=>!x.includes(' '))){
		let city = incities[norm].voyage_entry;
		console.log('city', city)
		let html = await mGetRoute(`cityweb/${encodeURIComponent(city)}`); //'cityweb',{city:c});
		if (!html) continue;
		//console.log(typeof html,html); return;
		diPics[norm] = getImages(html.text);
		//break;
	}
	console.log('diPics', diPics);
	downloadAsYaml(diPics, 'pics.yaml');
}
async function test4_big() {
	let dict = M.bigdata = await mGetYaml('../bigdata.yaml');

	let d = clearFlex();

	let city = rChoose(M.capitals); console.log(city)
	let s = dict[city];

	let dOben = mDom(d, {}, { html: 'info' })
	let dpre = mDom(d, {}, { tag: 'pre' });
	//console.log(dict)
	dpre.innerText = s;

	let title = firstAfter(s, 'wpb-banner-image-panorama', 'wpb-name">', '<');
	let d1 = mDom(dOben, {}, { html: title, tag: 'h1' });
	console.log(title);

	let banner = firstAfter(s, 'wpb-banner-image-panorama', 'src="', '"');
	let img = mDom(dOben, {}, { tag: 'img', src: banner });
	console.log(banner);

	let rest = stringAfter(s, banner);
	let pics = getImages(rest).filter(x => { let y = x.toLowerCase(); return !['flag', '.svg'].some(z => y.includes(z)); });
	for (const pic of pics) { img = mDom(dOben, {}, { tag: 'img', src: pic }); }
	console.log(pics);

	//let extract=

}

function firstAfter(s, sSub, start, end) {
	let rest = stringAfter(s, sSub);
	return stringBetween(rest, start, end);
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
	M.pageTitles = await mGetYaml(`../y/pagetitles.yaml`);
	getCapitals();
	mBy('bGo').onclick = onclickGo;
	mBy('bNewCity').onclick = setRandomCity;
}
