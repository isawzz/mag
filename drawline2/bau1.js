

function placeYourMeeple(ev) {
	stopPulsing();
	//console.log(DA.endpoints);
	d = mBy('dCanvas');
	d.onmousemove = null;
	d.onclick = null;
	//remove all hotpoints!!!
	//console.log('hotpoints', DA.hotspotDict); //DA.hotpoints
	for (const p of DA.hotspotList) {
		mStyle(p.div, { z: 0 })
	}
	for (const p of DA.points) {
		//console.log('div',p.div);
		p.div.style.zIndex = 1000;
		//mStyle(p.div,{z:10});
	}

	x = ev.clientX - d.offsetLeft - DA.sz / 2;
	y = ev.clientY - d.offsetTop - DA.sz / 2;

	let pMeeple = { x, y, sz: 25, bg: 'red', id: getUID() };
	drawPoints(d, [pMeeple]);
	
	lacunaMakeSelectable();
}
function selectPoint(ev) {
	//console.log('hallo!!!!!!!!!!!!!!!!')
	let id = evToId(ev);
	let p = Items[id];
	console.log('selecting point', p.id);
	lookupAddIfToList(DA, ['selectedPoints'], id);

	assertion(DA.selectedPoints.length >= 1, "WTF");
	if (DA.selectedPoints.length == 1) {
		//make unselectable all endpoints that do not have this endpoint
		let eps = [];
		console.log('possiblePairs', DA.possiblePairs);
		for (const pair of DA.possiblePairs.map(x => x.split(',').map(x => Items[x]))) {
			let p1 = pair[0];
			let p2 = pair[1];
			if (p1.id != id && p2.id != id) continue;
			if (p1.id == id) addIf(eps, p2.id); else addIf(eps, p1.id);
		}

		let unselect = DA.endpoints.filter(x => !eps.includes(x));
		unselect.map(x => lacunaUnselectable(x));
		//eps contains the ids of the endpoints that are not selected but connected to selected point
		DA.endpoints = eps; console.log('endpoints remaining', DA.endpoints);
		if (DA.endpoints.length < 2) {
			DA.selectedPoints.push(DA.endpoints[0]);
			lacunaMoveCompleted(DA.selectedPoints);
		}
	} else {
		assertion(DA.selectedPoints.length == 2, "WTF2!!!!!!!!!!!!!");
		lacunaMoveCompleted(DA.selectedPoints);
	}
}
function lacunaMoveCompleted(idlist) {
	DA.endpoints.map(x => lacunaUnselectable(x));
	showMessage("Move completed, removing",idlist);
	let p1 = Items[idlist[0]];
	let p2 = Items[idlist[1]];
	delete Items[p1.id];
	delete Items[p2.id];
	mRemove(p1.div);
	mRemove(p2.div);
	DA.points = DA.points.filter(x => x.id != p1.id && x.id != p2.id);

	for (const p of DA.hotspotList) {
		mRemove(p.div);
	}

	let ch=arrChildren(DA.dParent);console.log('ch',ch.length,'points',DA.points.length);
	DA.dParent.onclick=lacunaStartMove;

}

function showTimeSince(t, msg = 'now') {
	let tNew = getNow();
	let ms = tNew - t;
	console.log(msg + ':', ms);
	return tNew;
}












function lacunaSelectPair(ev, pdiv, divs) {
	//showMessage('select the pair you want to keep');
	//let divs = Array.from(document.querySelectorAll('.pulseFastInfinite')); //console.log(divs)
	for (const div of divs) {
		mStyle(div, { cursor: 'pointer' })
		div.onclick = ev => lacunaSelectPoint(div, divs);
	}
}


