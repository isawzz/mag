

function animateEndpointsOfActivatedLines() {

  function potentialSelectedPoint(p, l) {
    let d = iDiv(p);
    mClass(d, 'pulseFastInfinite');
    d.style.zIndex = 1000;
    mStyle(d, { cursor: 'pointer' });
    d.onclick = ev => lacunaSelectPointNeu(p, l);
    addIf(B.endPoints, p.id);
  }
  for (const l of B.lines) {
    iDiv(l).style.zIndex = 0;
  }
  for (const l of B.linesActivated) {
    B.possiblePairs.push(l);
    potentialSelectedPoint(l.p1, l);
    potentialSelectedPoint(l.p2, l);
  }
}
function divideRectangleIntoGrid(w, h, n) {
  let bestRows = 1;
  let bestCols = n;
  let bestAspectRatio = Infinity;
  for (let rows = 1; rows <= n; rows++) {
    const cols = Math.ceil(n / rows);
    const cellWidth = w / cols;
    const cellHeight = h / rows;
    const aspectRatio = Math.abs(cellWidth / cellHeight - 1);
    if (aspectRatio < bestAspectRatio) {
      bestAspectRatio = aspectRatio;
      bestRows = rows;
      bestCols = cols;
    }
  }
  return { rows: bestRows, cols: bestCols };
}
function generateGridPoints(n, w, h) {
  const points = [];
  let [x, y] = [0, 0];
  //space n points evenly within rectangle w x h
  let { rows, cols } = divideRectangleIntoGrid(w, h, n);
  let [xSpacing, ySpacing] = [w / (cols - 1), h / (rows - 1)];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      x = j * xSpacing;
      y = i * ySpacing;
      points.push({ x: Math.round(x), y: Math.round(y) });
      if (points.length >= n) return points;
    }
  }
  return points;
}
function lacunaGenerateFenPoints(n, nColors, w = 1000, h = 1000, rand = .8) {
  //let pts = generateGridPoints(n, w, h);
  let pts = generateRandomPointsRound(n, w, h, rand);
  return pts.map(p => `${p.x}_${p.y}_${rChoose(range(nColors))}`); //.join(' ');
}
function onMouseMoveLine(ev) {
  let d = mBy('dCanvas'); //ev.target;
  let b = mGetStyle(d, 'border-width'); //console.log(b);
  const mouseX = ev.clientX - d.offsetLeft - b;
  const mouseY = ev.clientY + 2 - d.offsetTop - b;

  B.lines.forEach(line => {
    const x1 = parseFloat(iDiv(line).dataset.x1);
    const y1 = parseFloat(iDiv(line).dataset.y1);
    const x2 = parseFloat(iDiv(line).dataset.x2);
    const y2 = parseFloat(iDiv(line).dataset.y2);
    const thickness = B.triggerThreshold; // parseFloat(line.dataset.thickness);

    // Calculate the perpendicular distance from the mouse to the line segment
    const distance = pointToLineDistance(mouseX, mouseY, x1, y1, x2, y2);

    if (distance <= thickness / 2) {
      mStyle(iDiv(line), { opacity: 1, bg: 'red' });
      //line.style.backgroundColor = 'red'; // Change color on hover
    } else {
      mStyle(iDiv(line), { opacity: .1, bg: 'white' });
      // line.style.backgroundColor = 'white'; // Reset color when not hovered
    }
  });

}
async function placeYourMeeple(ev) {
  //console.log('placeYourMeeple',B.counter++);//,ev.target);
  let d = mBy('dCanvas');
  document.onclick = null;
  d.onmousemove = null;
  let sz = rChoose(range(10, 40)); //10;
  let b = mGetStyle(d, 'border-width'); //console.log(b);
  let p = mGetStyle(d, 'padding'); console.log(p);
  x = ev.clientX - d.offsetLeft - b - sz;
  y = ev.clientY - d.offsetTop - b - sz;
  // let pMeeple = { x: x - sz / 2, y: y - sz / 2, sz, bg: 'black', border: getPlayerProp('color'), id: getUID(), owner: getUname() };
  let pMeeple = { x, y, sz, bg: 'red', border: 'gold', id: getUID(), owner: 'hallo' };
  // fen.meeples.push(jsCopy(pMeeple));//**** */
  drawMeeple(d, pMeeple);
  lookupAddToList(B, ['meeples'], pMeeple);
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
    animateEndpointsOfActivatedLines();
  }
}




