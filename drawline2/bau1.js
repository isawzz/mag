

function sortByLeastX(olist) {
	return olist.sort((a, b) => {
			// Find the minimum x value in each pair
			const minX_A = Math.min(a.xStart, a[1].x);
			const minX_B = Math.min(b[0].x, b[1].x);

			// Sort by the minimum x value
			return minX_A - minX_B;
	});
}
function checkHotspots(ev){
	let [x,y]=[ev.clientX, ev.clientY];
	let els=allElementsFromPoint(x,y);
	console.log('elements',els);

	for(const elem of els){
		let id=elem.id;
		if (isdef())
	}

}
function showTimeSince(t,msg='now'){
	let tNew=getNow();
	let ms=tNew-t;
	console.log(msg+':',ms);
	return tNew;
}










function placeMaxerlHere(ev) {
	if (!DA.hotspotsActive) return;
	DA.hotspotsActive = false;

	let p = null, d = null, x = 0, y = 0;
	evNoBubble(ev);
	if (isdef(DA.hot[ev.target.id])) {
		p = DA.hot[ev.target.id];
		d = p.div.parentNode;
		x = ev.clientX - d.offsetLeft - DA.sz / 2;;
		y = ev.clientY - d.offsetTop - DA.sz / 2;;
	} else {
		d = ev.target;
		x = ev.clientX - d.offsetLeft - DA.sz / 2;
		y = ev.clientY - d.offsetTop - DA.sz / 2;
	}

	console.log('placeMaxerlHere:', x, y)
	if (isdef(Items[d.id])) {
		p = Items[d.id];
		d = d.parentNode;
		x -= d.OffsetLeft;
		y -= d.OffsetTop;
	}
	console.log('set maxerl:', x, y, d)
	drawPoints(d, [{ x, y, sz: 20, bg: 'red', id: getUID() }]);

	let eps = Array.from(document.getElementsByClassName('pulseFastInfinite')); console.log(eps);

	if (isEmpty(eps)) return;
	//showMessage('click on an endpoint');
	for(const ep of eps) {
		ep.onclick = ev => lacunaSelectPoint(ep, eps);
		//mClassRemove(ep, 'pulseFastInfinite');
		//mStyle(ep,{border:'5px solid red'});
		//mClass(ep,'cursorGrab');
		ep.style.cursor='grab';
		//mStyle(ep, {cursor:'hand !important'});
		console.log('ep',ep)
	}
	//hier muss alle pulseFastInfinite entfernt werden.
	//eps.map(x=>mClassRemove(x, 'pulseFastInfinite'));

	//jetzt muessen die mouse events deactivated werden!


}
function lacunaSelectPoint(div, divs) {
	console.log('click!!!',div.id);
	let id = div.id;
	let list = lookupAddIfToList(DA,['selectedPairIds'],id); console.log(list);
	if (list.length == 2) {
		lacunaRemovePair(list.join(','));
	} else {
		console.log('select another point')
	}
}
function lacunaRemovePair(pair) {
	let { dParent, cv, w, h, sz, points } = DA.info;

	let ids = pair.split(',');
	for (const id of ids) {
		let o = Items[id];//remove the div
		o.div.remove();
		points = points.filter(x => x.id != id);//remove from points
		delete Items[id];//remove from items
	}

	mRemove(cv);
	mRemove(dParent);

	lacunaPresent1(points, w, h, sz);
}

function mist(){
	addIf(DA.selectedPairIds, id);
	let poss = DA.pairInfo.filter(x => x.includes(id));
	assertion(poss.length >= 1, 'no pair selected')
	if (poss.length == 1) {
		lacunaRemovePair(poss[0]);
	} else if (DA.selectedPairIds.length == 2) {
		lacunaRemovePair(DA.selectedPairIds.join(','));
	} else {
		//console.log(divs)
		divs.map(x=>mClassRemove(x, 'pulseFastInfinite'));
		possids = [];
		for(const pair of poss){
			possids = possids.concat(pair.split(','));
		}
		possids.map(x=>mClass(x, 'pulseFastInfinite'));
		mRemoveClass(div, 'pulseFastInfinite');
		lacunaSelectPair(poss);
	}
}

function lacunaSelectPair(ev,pdiv,divs) {
	//showMessage('select the pair you want to keep');
	//let divs = Array.from(document.querySelectorAll('.pulseFastInfinite')); //console.log(divs)
	for (const div of divs) {
		mStyle(div, { cursor: 'pointer' })
		div.onclick = ev => lacunaSelectPoint(div, divs);
	}
}


