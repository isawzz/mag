

async function lacunaOnclick(ev) {
  //console.log('lacunaOnclick',DA.counter++);//,ev.target);
  let linesActivated = getActivatedLines(DA.lines);
  console.log('linesActivated', linesActivated);
  B.selectedPoints = [];

  if (linesActivated.length == 1) {
    //grab these points and finish move
    B.selectedPoints.push(linesActivated[0].p1);
    B.selectedPoints.push(linesActivated[0].p2);
  }
  animateEndpointsOfActivatedLines(linesActivated)


}
function animateEndpointsOfActivatedLines(lines){
  for(const l of lines) {potentialSelectedPoint(l.p1,l);potentialSelectedPoint(l.p2,l);}
}
function animatePoint(p){
  mClass(iDiv(p), 'pulseFastInfinite');
}
function potentialSelectedPoint(p,l){
  animatePoint(p);
  iDiv(p).onclick = lacunaSelectPointNeu(p,l)
}
async function lacunaSelectPointNeu(p,l) {
	//let [fen, players, pl] = [T.fen, T.players, T.players[getUname()]]
	let id = evToId(ev);
	let p1 = B.diPoints[id];
	//console.log('selecting point', p.id);
	lookupAddIfToList(B, ['selectedPoints'], id); //console.log(B.selectedPoints.length)
	assertion(B.selectedPoints.length >= 1, "WTF");
	if (B.selectedPoints.length == 1) {
		let eps = [];
		//console.log('possiblePairs', B.possiblePairs);
		for (const pair of B.possiblePairs.map(x => x.split(',').map(x => B.diPoints[x]))) {
			let p1 = pair[0];
			let p2 = pair[1];
			if (p1.id != id && p2.id != id) continue;
			if (p1.id == id) addIf(eps, p2.id); else addIf(eps, p1.id);
		}
		let unselect = B.endPoints.filter(x => !eps.includes(x));
		unselect.map(x => lacunaUnselectable(x));
		B.endPoints = eps; //console.log('endPoints remaining', B.endPoints);
		if (B.endPoints.length < 2) {
			B.selectedPoints.push(B.endPoints[0]);
			await lacunaMoveCompletedME(B.selectedPoints);
		}
	} else {
		assertion(B.selectedPoints.length == 2, "WTF2!!!!!!!!!!!!!");
		await lacunaMoveCompletedME(B.selectedPoints);
	}
}

async function placeYourMeepleGame(ev){
	let [fen,players,pl]=[T.fen,T.players,T.players[getUname()]]
	stopPulsing();
	d = mBy('dCanvas');
	d.onmousemove = null;
	d.onclick = null;
	for (const p of B.hotspotList) { mStyle(p.div, { z: 0 }) }
	for (const p of B.points) { p.div.style.zIndex = 1000; }
	let sz = 20;
	x = ev.clientX - d.offsetLeft - d.parentNode.offsetLeft;
	y = ev.clientY - d.offsetTop - d.parentNode.offsetTop;
	let pMeeple = { x: x - sz / 2, y: y - sz / 2, sz, bg: 'black', border:getPlayerProp('color'), id: getUID(), owner: getUname() };

	fen.meeples.push(jsCopy(pMeeple));//**** */

	showMeeple(d,pMeeple);
	B.meeples.push(pMeeple); //console.log('B.meeples', B.meeples);
	//TODO: if only 2 points are selectable, just grab them and finish move!
	if (B.endPoints.length == 0) {
		//finish move without grabbing any flowers
		await lacunaMoveCompletedME([]);

	} else if (B.endPoints.length == 2) {
		//grab those flowers and finish move
		B.selectedPoints.push(B.endPoints[0]);
		B.selectedPoints.push(B.endPoints[1]);
		await lacunaMoveCompletedME(B.selectedPoints);

	} else lacunaMakeSelectableME();
}

