
async function alertOnPointClickPairHandler(ev) {
	let [dParent, di] = [DA.info.dParent, DA.info.di];
	const rect = dParent.getBoundingClientRect();
	const mouseX = ev.clientX - rect.left;
	const mouseY = ev.clientY - rect.top;

	let [xs, ys] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
	let mx1 = xs.lower;
	let mx2 = xs.higher;
	let my1 = ys.lower;
	let my2 = ys.higher;

	let divs = document.querySelectorAll('.pulseInfinite'); console.log(divs)

	if (mx1 - 2 <= mouseX && mouseX <= mx2 && my1 - 2 <= mouseY && mouseY <= my2) {
		DA.mousePoint = { x: mouseX, y: mouseY };
		key = getXYKey(mx1, my1);
		let entry = lookup(di, [key]);
		if (entry) {

			DA.pairInfo = entry;

			if (entry.length == 1) {
				//remove the pair in entry
				stopAnimatingPairs();
				console.log(`pair ${entry[0]} is removed`);
				lacunaRemovePair(entry[0]);
			} else {
				//let user choose which pair to keep!
				console.log(`user will choose pair from`, entry);

				for(const div of Array.from(divs)){
					div.onclick = ev=>lacunaSelectPoint(div,divs);
				}
				// let result = mGather(null, {}, { content: entry, type: 'checkList' });
				// console.log('result', result);
				stopAnimatingPairs();
			}
		}
	}
}
function lacunaSelectPoint(div,divs){
	console.log(div.id)
}




