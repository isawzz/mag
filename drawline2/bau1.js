
function lacunaRemovePair(pair) {
	let ids = pair.split(',');
	for (const id of ids) {
		let o = Items[id];
		o.div.remove();
	}

	DA.entry=[];
	//recalculate lines
	let {dParent,cv,w,h,sz,points}=DA.info;

	points = points.filter(x=>!ids.includes(x.id));
	DA.points = points;
	lacunaCalculate(dParent,cv,w,h,sz,points);

	console.log('points', points);

}


