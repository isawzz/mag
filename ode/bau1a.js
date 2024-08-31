
async function onsockTable(x) {
  console.log('SOCK::table', x); 
  let [msg, id, turn, isNew] = [x.msg, x.id, x.turn, x.isNew];
  let menu = getMenu();
  let me = getUname();
	console.log('menu',menu,'me',me,'turn',turn,'isNew',isNew)
  if (turn.includes(me) && menu == 'play') { Tid = id; await switchToMainMenu('table'); }
  else if (menu == 'table') await showTable(id);
  else if (menu == 'play') await showTables();
}
function unlockLengthyProcess(){
	try{
		if (DA.Interrupt === true && DA.LengthyProcessRunning === true) {
			DA.LengthyProcessRunning = false;  
			
			console.log('INTERRUPT!!!!!!!!!!!!!!!!!!!!!!');
			throw 1;
		}
	}
	catch(err){}
}
function lockForLengthyProcess(){
	DA.LengthyProcessRunning = true;
	console.log('LOCK!!!!!!!!!!!!!!!!!!!!!!');
}
function unlock(){
	DA.LengthyProcessRunning = false;
	console.log('UNLOCK!!!!!!!!!!!!!!!!!!!!!!');
}

function placeYourMeepleME(ev) {
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
	let pMeeple = { x: x - sz / 2, y: y - sz / 2, sz, bg: 'black', id: getUID(), owner: getUname() };

	fen.meeples.push(jsCopy(pMeeple));//**** */

	lacunaDrawPoints(d, [pMeeple], false);
	let color = getPlayerProp('color'); console.log('color', color)
	mStyle(iDiv(pMeeple), { border: `${color} 5px solid` })
	B.meeples.push(pMeeple); console.log('B.meeples', B.meeples);
	//TODO: if only 2 points are selectable, just grab them and finish move!
	if (B.endPoints.length == 0) {
		//finish move without grabbing any flowers
		lacunaMoveCompletedME([]);

	} else if (B.endPoints.length == 2) {
		//grab those flowers and finish move
		B.selectedPoints.push(B.endPoints[0]);
		B.selectedPoints.push(B.endPoints[1]);
		lacunaMoveCompletedME(B.selectedPoints);

	} else lacunaMakeSelectableME();
}
