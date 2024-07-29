
function catsInclude(o){
	let list = Array.from(arguments).slice(1); 
	for(const cat of o.cats){
		if (list.some(x=>cat.includes(x))) return true;
	}
	return false;
}
function catsIncludeCaseInsensitive(o){
	let list = Array.from(arguments).slice(1); 
	for(const cat of o.cats){
		if (list.some(x=>cat.toLowerCase().includes(x))) return true;
	}
	return false;
}
function isCity(o){return catsInclude(o,'City','Huge city');}

function getPageList(di,func){
	let list=[];
	for(const k in di){
		let o= di[k];
		o.id=k;
		if (func(o)) list.push(o)
	}
	return list;
}
function showPageTitles(list){console.log(list.map(x=>x.title))}








