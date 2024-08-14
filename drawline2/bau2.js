
async function alertOnPointClickPairHandler(ev) {
	let [dParent, di] = [DA.info.dParent, DA.info.di];

	dParent.onmousemove = null;
	dParent.onclick = null;

	const rect = dParent.getBoundingClientRect();
	const mouseX = ev.clientX - rect.left;
	const mouseY = ev.clientY - rect.top;

	let [xs, ys] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
	let mx1 = xs.lower;
	let mx2 = xs.higher;
	let my1 = ys.lower;
	let my2 = ys.higher;


	if (mx1 - 2 <= mouseX && mouseX <= mx2 && my1 - 2 <= mouseY && mouseY <= my2) {
		DA.mousePoint = { x: mouseX, y: mouseY };
		key = getXYKey(mx1, my1);
		let entry = lookup(di, [key]);
		if (entry) {

			DA.pairInfo = entry;

			if (entry.length == 1) {
				//remove the pair in entry
				stopAnimatingPairs();
				DA.selectedPairIds = entry[0].split(',');
				console.log(`pair ${entry[0]} is removed`);
				lacunaRemovePair(entry[0]);
			} else {
				DA.selectedPairIds = [];
				lacunaSelectPair(entry);
			}
		}
	}
}
function lacunaSelectPair(pairs) {
	showMessage('select the pair you want to keep');
	let divs = document.querySelectorAll('.pulseInfinite'); //console.log(divs)
	for (const div of Array.from(divs)) {
		mStyle(div, { cursor: 'pointer' })
		div.onclick = ev => lacunaSelectPoint(div, divs);
	}
	// let result = mGather(null, {}, { content: entry, type: 'checkList' });
	// console.log('result', result);
	//stopAnimatingPairs();

}
function lacunaSelectPoint(div, divs) {
	console.log(div.id);
	let id = div.id;
	addIf(DA.selectedPairIds, id);
	let poss = DA.pairInfo.filter(x => x.includes(id));
	assertion(poss.length >= 1, 'no pair selected')
	if (poss.length == 1) {
		lacunaRemovePair(poss[0]);
	} else if (DA.selectedPairIds.length == 2) {
		lacunaRemovePair(DA.selectedPairIds.join(','));
	} else {
		//remove all divs from divs that are not in poss
		for(const pair of divs){
			if (!poss.includes(pair)){
				let ids = pair.split(',');
				ids.map()

				removeInPlace(divs,ids);
			}
		}

		poss.map(x=>removeInPlace(divs,x));
		lacunaSelectPairs(divs);
		let notIncluded = divs.filter(x => !poss.some(y => y.includes(x.id)));
		notIncluded.map(x => mClassRemove(x, 'pulseInfinite'));
		mClassRemove(div, 'pulseInfinite');
		let included = divs.filter(x => poss.some(y => y.includes(x.id)));
		for (const div of Array.from(divs)) {

		}
		//let user choose which pair to keep!
		showMessage('select the pair you want to keep');
		//console.log(`user will choose pair from`, entry);
		for (const div of Array.from(divs)) {
			mStyle(div, { cursor: 'pointer' })
			div.onclick = ev => lacunaSelectPoint(div, divs);
		}
	}
}




