
function generateRandomPointsRound(n, w, h, rand = 0.8) {
	let [radx, rady] = [w / 2, h / 2];
	const goldenAngle = Math.PI * (3 - Math.sqrt(5));
	const points = [];
	for (let i = 1; i < n + 1; i++) {
		const angle = i * goldenAngle + (Math.random() - 0.5) * goldenAngle * rand / 4;
		const distance = Math.sqrt(i / n);
		let x = radx + distance * radx * Math.cos(angle);
		let y = rady + distance * rady * Math.sin(angle);
		points.push({ x: Math.round(x), y: Math.round(y) });
	}
	return points;
}
function mapRange(value, inMin, inMax, outMin, outMax) {
  return Math.round((value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin);
}
function numTranslate(n, newmax, newmin = 0, oldmax = 1000, oldmin = 0) { return Math.round(newmin + (newmax - newmin) * (n - oldmin) / (oldmax - oldmin)); }
function pointToFen(p) {
  //point is {x,y,type,owner,div,sz,bg} x on page,y on page,owner may be null
  //result should be 'x_y_type_owner' (x,y in 0,1000 range)


}

function prepInstruction(table) {
  if (isdef('dInstruction')) mRemove('dInstruction');

  let myTurn = isMyTurn(table);
  if (!myTurn) staticTitle(table); else animatedTitle();

  let d = mBy('dExtra');
  let style = { matop: 2, bg: 'white', fg: 'black', w100: true, box: true, display: 'flex', 'justify-content': 'center', 'align-items': 'center' };
  let dInst = mDom(d, style, { id: 'dInstruction' });

  let html;
  if (myTurn) {
    //mStyle(dInst,{maleft: -30});
    html = `
        ${getWaitingHtml(14)}
        <span style="color:red;font-weight:bold;max-height:25px">You</span>
        &nbsp;<span id='dInstructionText'></span>
        `;
  } else { html = `waiting for: ${getTurnPlayers(table)}` }
  dInst.innerHTML = html;
  //mDom(dInst, styleInstruction, { html });

  //mStyle(d,{weight:'bold'});
  // d.innerHTML = `<h2>${getGameProp('friendly').toUpperCase()}: ${table.friendly} (${table.step})</h2>`; // title
  //d.innerHTML = `${getGameProp('friendly').toUpperCase()}: ${table.friendly}`; // (${table.step})`; // title
}
function presentBgaRoundTable() {
  let d0 = mDom('dMain');
  let [dl, dr] = mColFlex(d0, [4, 1]);
  d = mDom(dl); mCenterFlex(d);
  if (nundef(mBy('dInstruction'))) mDom(d, { className: 'instruction' }, { id: 'dInstruction' }); mLinebreak(d); // instruction
  let minTableSize = 400;
  let dTable = mDom(d, { hmin: minTableSize, wmin: minTableSize, hmargin: 20, round: true, className: 'wood' }, { id: 'dTable' });
  mCenterCenter(dTable);
  let dstats = mDom(dr, {}, { id: 'dStats' });
  //mStyle(dstats,{display:'flex',direction:'rows'});
  return dTable;
}
function presentStandardBGA() {
  let dTable = mDom('dMain');
  mClass('dPage', 'wood');
  let [dOben, dOpenTable, dMiddle, dRechts] = tableLayoutMR(dTable); mFlexWrap(dOpenTable)
  mDom(dRechts, {}, { id: 'dStats' });
}
function presentStandardRoundTable() {
  d = mDom('dMain'); mCenterFlex(d);
  mDom(d, { className: 'instruction' }, { id: 'dInstruction' }); mLinebreak(d); // instruction
  mDom(d, {}, { id: 'dStats' }); mLinebreak(d);
  let minTableSize = 400;
  let dTable = mDom(d, { hmin: minTableSize, wmin: minTableSize, margin: 20, round: true, className: 'wood' }, { id: 'dTable' });
  mCenterCenter(dTable);
}
function setInstruction(s) { mBy('dInstructionText').innerHTML = s; }
function showTitle(title, dParent = 'dTitle') {
  mClear(dParent);
  return mDom(dParent, { maleft: 20 }, { tag: 'h1', html: title, classes: 'title' });
}
function showTitleGame(table) {

  let d = mBy('dExtraLeft');
  let html = `${getGameProp('friendly').toUpperCase()}: ${table.friendly}`;
  mDom(d, { maleft: 10, family: 'algerian' }, { html });
  //mStyle(d,{weight:'bold'});
  // d.innerHTML = `<h2>${getGameProp('friendly').toUpperCase()}: ${table.friendly} (${table.step})</h2>`; // title
  //d.innerHTML = `${getGameProp('friendly').toUpperCase()}: ${table.friendly}`; // (${table.step})`; // title
}









