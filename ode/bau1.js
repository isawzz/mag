
async function placeYourMeeple(ev) {
  //console.log('placeYourMeeple',B.counter++);//,ev.target);
	let d = mBy('dCanvas');
	document.onclick = null;
	d.onmousemove = null;

  let sz = 20;
	x = ev.clientX - d.offsetLeft - d.parentNode.offsetLeft;
	y = ev.clientY - d.offsetTop - d.parentNode.offsetTop;
	// let pMeeple = { x: x - sz / 2, y: y - sz / 2, sz, bg: 'black', border: getPlayerProp('color'), id: getUID(), owner: getUname() };
	let pMeeple = { x: x - sz / 2, y: y - sz / 2, sz, bg: 'black', border: 'gold', id: getUID(), owner: 'hallo' };
	// fen.meeples.push(jsCopy(pMeeple));//**** */
	showMeeple(d, pMeeple);
	B.meeples.push(pMeeple); //console.log('B.meeples', B.meeples);


  let linesActivated = B.linesActivated = getActivatedLines(B.lines);
  console.log('linesActivated', linesActivated);
  B.selectedPoints = [];
	B.endPoints = [];
  B.possiblePairs = [];

  if (linesActivated.length == 1) {
    //grab these points and finish move
    B.selectedPoints.push(linesActivated[0].p1.id);
    B.selectedPoints.push(linesActivated[0].p2.id);
		let res = await lacunaMoveComplete(B.selectedPoints); console.log('res',res);
  }else{
		animateEndpointsOfActivatedLines(linesActivated);
	}




}















