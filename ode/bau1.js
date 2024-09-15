
function drawPointStar(p1, d, sz) {
  let starSizes = [1, .5, 1, 1, 1, .3, 1, .6, 1]; //,.3,.2,.25,.4,.2,.1,.2,.1,1];
  let itype = p1.type % starSizes.length; //console.log('itype',itype);
  p1.sz = sz = 20 * starSizes[itype]; //console.log('sz',sz);
  let img = p1.div = cloneImage(M.starImages[itype], d, p1.x, p1.y, sz, sz);
  img.id = p1.id = `p${p1.x}_${p1.y}`;

}
async function placeYourMeeple(ev) {
  //console.log('placeYourMeeple',B.counter++);//,ev.target);
  let d = mBy('dCanvas');
 // document.onclick = null;
  d.onmousemove = null;
  let sz = rChoose(range(10,40)); //10;
  x = ev.pageX; //clientX;
  y = ev.clientY;
  // x = ev.clientX - sz / 2 - d.offsetLeft - d.parentNode.offsetLeft;
  // y = ev.clientY - sz / 2 - d.offsetTop - d.parentNode.offsetTop;
  // x = ev.clientX - sz / 2;// - d.offsetLeft - d.parentNode.offsetLeft;
  // y = ev.clientY - sz / 2;// - d.offsetTop - d.parentNode.offsetTop;
  // let pMeeple = { x: x - sz / 2, y: y - sz / 2, sz, bg: 'black', border: getPlayerProp('color'), id: getUID(), owner: getUname() };
  let pMeeple = { x, y, sz, bg: 'red', border: 'gold', id: getUID(), owner: 'hallo' };
  // fen.meeples.push(jsCopy(pMeeple));//**** */
  drawMeeple(d, pMeeple);
  lookupAddToList(B,['meeples'],pMeeple);
  let linesActivated = B.linesActivated = getActivatedLines(B.lines);
  console.log('linesActivated', linesActivated);
  B.selectedPoints = [];
  B.endPoints = [];
  B.possiblePairs = [];
  if (linesActivated.length == 1) {
    //grab these points and finish move
    B.selectedPoints.push(linesActivated[0].p1.id);
    B.selectedPoints.push(linesActivated[0].p2.id);
    let res = await lacunaMoveComplete(B.selectedPoints); console.log('res', res);
  } else {
    animateEndpointsOfActivatedLines(linesActivated);
  }
}
function drawMeeple(dParent, p) {
  //console.log(pMeeple.owner)
  // lacunaDrawPoints(d, [pMeeple], false);
  let addLabel = true;
  let html = isdef(p.owner) && addLabel ? p.owner[0].toUpperCase() : ''; //p.id.substring(1) : ''
  let d1 = p.div = mDom(dParent, { fz: p.sz * .75, left: p.x + p.sz / 2, top: p.y + p.sz / 2, w: p.sz, h: p.sz, position: 'absolute', bg: p.bg, fg: 'contrast' }, { html, id: p.id });
  mCenterCenterFlex(d1);

  d1.style.cursor = 'default';
  //if (isdef(p.border)) mStyle(d1, { outline: `solid ${p.border} 4px` });

  // let rect = getRect(d1);
  // p.cx = p.x + p.sz / 2; p.cy = p.y + p.sz / 2;
  // p.xPage = rect.x; p.yPage = rect.y;
  // p.cxPage = rect.x + p.sz / 2; p.cyPage = rect.y + p.sz / 2;

  // let color = getPlayerProp('color',pMeeple.owner); //console.log('color', color)
  // let letter = pMeeple.owner[0].toUpperCase();

  // mStyle(iDiv(pMeeple), { border: `${color} 5px solid` });
  // iDiv(pMeeple).innerHTML = letter;
}















