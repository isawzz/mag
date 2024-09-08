

function cloneImage(img, targetDiv, x=100, y=100, w=100, h=100) {
  const clonedImage = img.cloneNode();
  clonedImage.style.position = 'absolute';
  clonedImage.style.left = `${x-w/2}px`;
  clonedImage.style.top = `${y-h/2}px`;
  clonedImage.style.width = `${w}px`;
  clonedImage.style.height = `${h}px`;

  targetDiv.appendChild(clonedImage);
  return clonedImage;
}
function cropImage(imageUrl,d) {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    d.appendChild(canvas);
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    let isCropping = false;
    let startX, startY, endX, endY;

    canvas.addEventListener('mousedown', (e) => {
      isCropping = true;
      startX = e.offsetX;
      startY = e.offsetY;
    });

    canvas.addEventListener('mousemove', (e) => {
      if (isCropping) {
        endX = e.offsetX;
        endY = e.offsetY;
        drawCropRect();
      }
    });

    canvas.addEventListener('mouseup', (e) => {
      if (isCropping) {
        isCropping = false;
        cropImage();
      }
    });

    function drawCropRect() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(startX, startY, endX - startX, endY - startY);
    }

    function cropImage() {
      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = endX - startX;
      croppedCanvas.height = endY - startY;
      const croppedCtx = croppedCanvas.getContext('2d');
      croppedCtx.drawImage(img, startX, startY, endX - startX, endY - startY, 0, 0, endX - startX, endY - startY);

      const link = document.createElement('a');
      link.download = 'cropped_image.png';
      link.href = croppedCanvas.toDataURL('image/png');
      link.click();
    }
  };
  img.src = imageUrl;
}
function drawInteractiveLine(p1, p2, color = 'black', thickness = 10) {
	const offs = thickness / 2;
	//let [x1, y1, x2, y2] = [p1.cxPage, p1.cyPage, p2.cxPage, p2.cyPage];
	let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];

	const distance = Math.hypot(x2 - x1, y2 - y1);
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

	const line = mDom(document.body, { left:x1,top:y1-offs,bg:color,opacity:.1,className: 'line1', w: distance, h: thickness, transform: `rotate(${angle}deg)` })

	// Store line data
	line.dataset.x1 = x1;
	line.dataset.y1 = y1;
	line.dataset.x2 = x2;
	line.dataset.y2 = y2;
	line.dataset.thickness = thickness;

	return line;
}
function drawPoint(dParent, p, addLabel = true) {
  let html = isdef(p.owner) && addLabel ? p.owner[0].toUpperCase() : '';
  addKeys({ sz: 20, bg: rColor(), id:getUID() }, p);
  let d1 = p.div = mDom(dParent, { round: true, left: p.x, top: p.y, w: p.sz, h: p.sz, position: 'absolute', bg: p.bg, align: 'center', fg: 'contrast' }, { html, id: p.id });
  d1.style.cursor = 'default';
  if (isdef(p.border)) mStyle(d1, { outline: `solid ${p.border} 4px` });
  let rect = getRect(d1);
  p.cx = p.x + p.sz / 2; p.cy = p.y + p.sz / 2;
  p.xPage = rect.x; p.yPage = rect.y;
  p.cxPage = rect.x + p.sz / 2; p.cyPage = rect.y + p.sz / 2;
	return p;
}
function drawPointType(dParent, p, addLabel = true) {
  let html = isdef(p.owner) && addLabel ? p.owner[0].toUpperCase() : '';
  addKeys({ sz: 20, bg: rColor(), id:getUID() }, p);
  let d1 = p.div = mDom(dParent, { round: true, left: p.x, top: p.y, w: p.sz, h: p.sz, position: 'absolute', bg: p.bg, align: 'center', fg: 'contrast' }, { html, id: p.id });
  d1.style.cursor = 'default';
  if (isdef(p.border)) mStyle(d1, { outline: `solid ${p.border} 4px` });
  let rect = getRect(d1);
  p.cx = p.x + p.sz / 2; p.cy = p.y + p.sz / 2;
  p.xPage = rect.x; p.yPage = rect.y;
  p.cxPage = rect.x + p.sz / 2; p.cyPage = rect.y + p.sz / 2;
	return p;
}
function findIsolatedPairs(nodes, prop='bg',threshold = 3) {
	const isolatedPairs = [], obstaclePairs = [];
	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			if (nodes[i][prop] != nodes[j][prop]) continue;
			const [ax, ay] = [nodes[i].x, nodes[i].y];
			const [bx, by] = [nodes[j].x, nodes[j].y];
			let isIsolated = true;
			for (let k = 0; k < nodes.length; k++) {
				if (k === i || k === j) continue;
				const [px, py] = [nodes[k].x, nodes[k].y];
				const distance = pointToLineDistance(px, py, ax, ay, bx, by);
				if (distance < threshold) {
					isIsolated = false;
					break;
				}
			}
			let pair = nodes[i].x <= nodes[j].x ? [nodes[i], nodes[j]] : [nodes[j], nodes[i]]; //console.log(pair[0].x,pair[1].x);
			assertion(pair[0].x <= pair[1].x, "NOT SORTED!!!!!!!!!!!!!!!!");
			if (isIsolated) {
				isolatedPairs.push(pair);
			} else {
				obstaclePairs.push(pair);
			}
		}
	}
	return { isolatedPairs, obstaclePairs };
}
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
function getActivatedLines(lines) {
  let res = [];
  for (const l of lines) {
    let d=iDiv(l);
    let bg = mGetStyle(d,'bg');
    let opa = mGetStyle(d,'opacity'); //console.log(bg, opa);
    if (bg == 'red' || opa == 1) res.push(l);
  }
  return res;
}
function lacunaGenerateFenPoints(n,nColors,w=1000,h=1000,rand=.8){
	let pts=generateRandomPointsRound(n,w,h,rand);
	return pts.map(p=>`${p.x}_${p.y}_${rChoose(range(nColors))}`); //.join(' ');
}
function lacunaPresentPoints(points,d){
  let [w, h, sz, margin, padding] = [400, 400, 10, 10, 20];
  DA.sz = sz;
  let dParent = DA.dParent = mDom(d, { w, h, margin, padding, position:'relative', bg: '#eee' }, { id: 'dCanvas' });
  for(const p of points){
    let p1 = pointFromFenRaw(p); //console.log(p1);
    p1.x=mapRange(p1.x,0,1000, 0,w-sz); 
    p1.y=mapRange(p1.y, 0, 1000, 0, h-sz);
    p1 = pointAddMargin(p1,padding);
    p1.sz=sz;
    p1 = drawPoint(dParent, p1);
    //console.log(p1);
  }
}
function loadAndDivideImage(imageUrl,dParent) {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgWidthThird = img.width / 3;
    const imgHeightThird = img.height / 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const subCanvas = document.createElement('canvas');
        subCanvas.width = imgWidthThird;
        subCanvas.height = imgHeightThird;
        const subCtx = subCanvas.getContext('2d');
        subCtx.drawImage(img, i * imgWidthThird, j * imgHeightThird, imgWidthThird, imgHeightThird, 0, 0, imgWidthThird, imgHeightThird);

        // Do something with the subCanvas, e.g., add it to the DOM:
        dParent.appendChild(subCanvas);
      }
    }
  };
  img.src = imageUrl;
}
async function loadStarImages(){
  let list = range(1, 9).map(n => `../assets/icons/stars/blue${n}.png`);
  let starImages = await preloadImages(list); //console.log('starImages', starImages);
  M.starImages = starImages;
  return starImages;
}
function mapRange(value, inMin, inMax, outMin, outMax) {
  return Math.round((value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin);
}
function onMouseMoveLine(event){
  const mouseX = event.clientX;
  const mouseY = event.clientY+2;

  DA.lines.forEach(line => {
    const x1 = parseFloat(iDiv(line).dataset.x1);
    const y1 = parseFloat(iDiv(line).dataset.y1);
    const x2 = parseFloat(iDiv(line).dataset.x2);
    const y2 = parseFloat(iDiv(line).dataset.y2);
    const thickness = DA.triggerThreshold; // parseFloat(line.dataset.thickness);

    // Calculate the perpendicular distance from the mouse to the line segment
    const distance = pointToLineDistance(mouseX, mouseY, x1, y1, x2, y2);

    if (distance <= thickness / 2) {
			mStyle(iDiv(line),{opacity:1,bg:'red'});
      //line.style.backgroundColor = 'red'; // Change color on hover
    } else {
			mStyle(iDiv(line),{opacity:.1,bg:'white'});
      // line.style.backgroundColor = 'white'; // Reset color when not hovered
    }
  });

}
function pointAddMargin(p, margin) {
  return { x: p.x + margin, y: p.y + margin, type: p.type, owner: p.owner };
}
function pointFromFenRaw(pfen) {
  const [x, y, type, owner] = pfen.split('_').map(val => isNaN(val) ? val : parseInt(val, 10));
  return { x, y, type, owner: nundef(owner) ? null : owner };
}
function pointToFen(p) {
  //point is {x,y,type,owner,div,sz,bg} x on page,y on page,owner may be null
  //result should be 'x_y_type_owner' (x,y in 0,1000 range)


}
function pointToLineDistance(x, y, x1, y1, x2, y2) {
	const A = x - x1;
	const B = y - y1;
	const C = x2 - x1;
	const D = y2 - y1;

	const dot = A * C + B * D;
	const len_sq = C * C + D * D;
	const param = len_sq !== 0 ? dot / len_sq : -1;

	let xx, yy;

	if (param < 0) {
		xx = x1;
		yy = y1;
	} else if (param > 1) {
		xx = x2;
		yy = y2;
	} else {
		xx = x1 + param * C;
		yy = y1 + param * D;
	}

	const dx = x - xx;
	const dy = y - yy;
	return Math.sqrt(dx * dx + dy * dy);
}
async function preloadImages(imageUrls) {
  const promises = imageUrls.map(async (url) => {
    const img = new Image();
    return new Promise((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  });

  return await Promise.all(promises);
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















