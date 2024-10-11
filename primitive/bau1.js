

function mLayoutTopTable(container) {
	mStyle(container,{display:'grid',gridRows:'auto 1fr',h:'100%'});
	let topDiv = mDom(container); //,{padding:10,bg:'lightblue'},{html:'hallo'})
	let bottomDiv = mDom(container,{overy:'scroll'}); //,padding:10,bg:'lightgreen'},{html:'hallo'});
	return [topDiv,bottomDiv];
}


