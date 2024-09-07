
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

async function lacunaOnclick(ev) {
  console.log('lacunaOnclick',DA.counter++);//,ev.target);
  let linesActivated = getRedLines();
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
  for(const l of lines) {animatePoint(l.p1,l);animatePoint(l.p2,l);}
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

function getRedLines() {
  let res = [];
  for (const l of DA.lines) {
    let d=iDiv(l);
    let bg = mGetStyle(d,'bg');
    let opa = mGetStyle(d,'opacity'); console.log(bg, opa);
    if (bg == 'red' || opa == 1) res.push(l);
  }
  return res;
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

