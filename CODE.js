function _generateGridPoints(n,w,h){
	const points = [];
	let { rows, cols } = divideRectangleIntoGrid(w, h * .8, n);
	const xSpacing = w / (cols + 1);
	const ySpacing = h / (rows + 1); //console.log(xSpacing, ySpacing);
	let dmin = 10;
	let x, y, xfix, yfix, xlast = -dmin, ylast = -dmin;
	for (let i = 0; i < rows; i++) {
		yfix = (i + .75) * ySpacing;
		for (let j = 0; j < cols; j++) {
			xfix = (j + .75) * xSpacing;
			if (points.length < n) {
				let dx = rand * (Math.random() - 0.5) * xSpacing; if (coin()) dx = -dx;
				let dy = rand * (Math.random() - 0.5) * ySpacing; if (coin()) dy = -dy;
				x = xfix + dx; if (x > xlast && x - xlast < dmin) x += dmin;
				y = yfix + dy; if (y > ylast && y - ylast < dmin) y += dmin;
				xlast = x;
				points.push({ x: Math.round(x), y: Math.round(y) });
			}
			ylast = y
		}
	}
	return points;
}
function drawInteractiveLine0(p1, p2, color = 'black', thickness = 10) {
	const line = document.createElement('div');
	const offs = thickness / 2;
	//let [x1, y1, x2, y2] = [p1.cxPage, p1.cyPage, p2.cxPage, p2.cyPage];
	let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];

	const distance = Math.hypot(x2 - x1, y2 - y1);
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

	// Style the line
	line.className = 'line1';
	line.style.width = `${distance}px`;
	line.style.height = `${thickness}px`;
	line.style.transform = `rotate(${angle}deg)`;
	line.style.left = `${x1}px`;
	line.style.top = `${y1 - offs}px`;
	line.style.backgroundColor = color;
	line.style.opacity = .5;

	// Store line data
	line.dataset.x1 = x1;
	line.dataset.y1 = y1;
	line.dataset.x2 = x2;
	line.dataset.y2 = y2;
	line.dataset.thickness = thickness;

	// Append the line to the body
	document.body.appendChild(line);
	return line;
	//lines.push(line); // Store the line for later reference
}

function generateStar(dParent,x,y){
	let html = `<svg width="100" height="100">
			<polygon points="50 0 86.6 50 100 0 75 35 50 70.7 25 35 0 0" fill="yellow" />
		</svg>`;
	let d=mDom(dParent,{w:100,h:100,pos:'absolute',left:x,top:y},{html});
	return html;
}
function numTranslate(n, newmax, newmin = 0, oldmax = 1000, oldmin = 0) { return Math.round(newmin + (newmax - newmin) * (n - oldmin) / (oldmax - oldmin)); }

function pointFromFen(pfen,dParent,margin){
  //a fen point is 'x_y_type_owner'
  //result should be {x,y,type,owner,div,sz,bg} x on page,y on page,owner may be null
  let rect=getRect(dParent); 
  let [w,h,xoff,yoff] = [rect.w,rect.h,rect.x,rect.y];console.log(w,h,xoff,yoff)
  console.log(pfen)
  const [x, y, type, owner] = pfen.split('_').map(val => isNaN(val) ? val : parseInt(val, 10));
  const p = {
      x: Math.round((x / 1000) * w + xoff+margin), // Convert x to page coordinates
      y: Math.round((y / 1000) * h + yoff+margin), // Convert y to page coordinates
      type,
      owner: owner === 'null' ? null : owner, // Handle null owner
      div: null, // Placeholder for the div element
      sz: 20, //Math.max(10,Math.round(20/1000 * Math.min(w,h))), // Default size (can be adjusted)
      bg: rColor(),//'black' // Default background color (can be adjusted)
  };
  console.log(p)
  p.div=mDom(dParent,{position:'absolute',w:p.sz,h:p.sz,left:p.x - p.sz / 2,top:p.y - p.sz / 2,bg:p.bg},{'data-type':p.type});
  return p;
}

function pointFromFen(fen, w, h, margin, dParent) {
  // Split the FEN string into components
  const [x, y, type, owner] = fen.split('_').map(val => isNaN(val) ? val : parseInt(val, 10));

  // Create a point object with page coordinates
  const p = {
      x: Math.round((x / 1000) * w) + margin, // Convert x to page coordinates
      y: Math.round((y / 1000) * h) + margin, // Convert y to page coordinates
      type,
      owner: owner === 'null' ? null : owner, // Handle null owner
      div: null, // Placeholder for the div element
      sz: 10, // Default size (can be adjusted)
      bg: 'black' // Default background color (can be adjusted)
  };

  // Create the div element representing the point
  let d=mDom(dParent,{position:'absolute',w:p.sz,h:p.sz,left:p.x - p.sz / 2,top:p.y - p.sz / 2,bg:p.bg},{'data-type':p.type});
  // point.div = document.createElement('div');
  // point.div.style.position = 'absolute';
  // point.div.style.width = `${point.sz}px`;
  // point.div.style.height = `${point.sz}px`;
  // point.div.style.left = `${point.x - point.sz / 2}px`; // Center the point div
  // point.div.style.top = `${point.y - point.sz / 2}px`; // Center the point div
  // point.div.style.backgroundColor = point.bg;
  // point.div.setAttribute('data-type', point.type); // Store the type as a data attribute
  // // Append the point div to the parent div
  // dParent.appendChild(point.div);

  return p;
}
async function showInstructionStandard(table, instruction) {
  let myTurn = isMyTurn(table);
  if (!myTurn) staticTitle(table); else animatedTitle();
  if (nundef(instruction)) return;
  let styleInstruction = { hmin:42, display: 'flex', 'justify-content': 'center', 'align-items': 'center' };
  let dinst = mBy('dInstruction');
  if (nundef(dinst)) return;
  mClear(dinst);
  let html;
  if (myTurn) {
    styleInstruction.maleft = -30;
    html = `
        ${getWaitingHtml()}
        <span style="color:red;font-weight:bold;max-height:25px">You</span>
        &nbsp;${instruction};
        `;
  } else { html = `waiting for: ${getTurnPlayers(table)}` }
  mDom(dinst, styleInstruction, { html });
}
async function showInstructionCompact(table, instruction) {
  let myTurn = isMyTurn(table);
  if (!myTurn) staticTitle(table); else animatedTitle();
  if (nundef(instruction)) return;
  let styleInstruction = { hmin:42, display: 'flex', 'justify-content': 'center', 'align-items': 'center' };
  let dinst = mBy('dInstruction');
  if (nundef(dinst)) return;
  mClear(dinst);
  let html;
  if (myTurn) {
    styleInstruction.maleft = -30;
    html = `
        ${getWaitingHtml()}
        <span style="color:red;font-weight:bold;max-height:25px">You</span>
        &nbsp;${instruction};
        `;
  } else { html = `waiting for: ${getTurnPlayers(table)}` }
  mDom(dinst, styleInstruction, { html });
}

async function updateTestButtonsPlayers(table) {
	if (nundef(table)) table = T;
	assertion(table, "NOT TABLE IN updateTestButtonsPlayers")
	let d = mBy('dExtraRight'); mClear(d); //mFlexWrap(d);
	let me = getUname();
	let names = table.playerNames; //addIf(names,'mimi');
	//addIf(names,me);
	let dplayers = mDom(d);
	for (const name of names) {
		let idname = getButtonCaptionName(name);
		let b = UI[idname] = mButton(name, async () => await switchToUser(name), dplayers, { maleft: 4, hpadding: 3, wmin: 50, className: 'button' });
		if (me == name) mStyle(b, { bg: 'red', fg: 'white' });
	}

	if (!table.playerNames.includes(me)) return;

	//mLinebreak(d)
	// let dSwitches=mDom(d,{wmin:200,display:'flex',gap:20,justify:'end',align:'center'});
	// let dbotswitch = mDom(dSwitches, { align: 'right', patop: 6, gap: 6 }, { html: 'BOT' }); mFlexLine(dbotswitch, 'end')
	// let oSwitch = mSwitch(dbotswitch, {}, { id: 'bot', val: amIHuman(table) ? '' : 'checked' });
	// oSwitch.inp.onchange = onchangeBotSwitch;

	// let dautoswitch = mDom(dSwitches, { align: 'right', patop: 10, gap: 6 }, { html: 'AUTO' }); mFlexLine(dautoswitch, 'end')
	// let oSwitch1 = mSwitch(dautoswitch, {}, { id: 'auto', val: DA.autoSwitch===true?'checked':'' });
	// let inp1 = oSwitch1.inp;
	// oSwitch1.inp.onchange = onchangeAutoSwitch;

}

async function showTable(id) {
  let me = getUname();
  let table = await mGetRoute('table', { id });  //console.log('table',table)
  if (!table) { showMessage('table deleted!'); return await showTables('showTable'); }
  let func = DA.funcs[table.game];
  T = table;
  clearMain();
  let d = mBy('dExtraLeft');
  d.innerHTML = `<h2>${getGameProp('friendly').toUpperCase()}: ${table.friendly} (${table.step})</h2>`; // title
  let items = func.present(table);
  func.stats(table);
  if (table.status == 'over') { showGameover(table, 'dTitle'); return; }
  assertion(table.status == 'started', `showTable status ERROR ${table.status}`);
  await updateTestButtonsPlayers(table);
  func.activate(table, items);
}

function instructionUpdate() {
}
function lacuna() {
	function setup(table) {
		let fen = {};

		// table.options.numMeeples = 1;
		// table.options.numPoints = 10;
		// table.options.numColors = 2;

		//console.log(table.options)
		let [w, h, sz, n, neach] = [fen.w, fen.h, fen.sz, fen.n, fen.neach] = [900, 700, 20, table.options.numPoints, table.options.numPoints / table.options.numColors];
		//console.log(n, neach);
		fen.points = lacunaGeneratePoints(w, h, n, neach, sz, .6, true); //console.log(jsCopy(points[0]));

		fen.colorsInUse = Array.from(new Set(fen.points.map(x=>x.bg))); console.log('colorsUsed',fen.colorsInUse)
		for (const name in table.players) {
			let pl = table.players[name];
			pl.score = 0;
			pl.positions = [];
			pl.flowers = {};
			for(const c of fen.colorsInUse){
				pl.flowers[c]=0;
			}
		}

		fen.meeples = [];
		table.plorder = jsCopy(table.playerNames);
		table.turn = [rChoose(table.playerNames)];

		

		return fen;
	}

	function stats(table) {
		let [me, players] = [getUname(), table.players];
		let style = { patop: 8, mabottom: 20, wmin: 80, bg: 'beige', fg: 'contrast' };
		let player_stat_items = uiTypePlayerStats(table, me, 'dStats', 'colflex', style)
		for (const plname in players) {
			let pl = players[plname];
			let item = player_stat_items[plname];
			if (pl.playmode == 'bot') { mStyle(item.img, { rounding: 0 }); }
			let d = iDiv(item); mCenterFlex(d); mLinebreak(d); mIfNotRelative(d);

			
			for(const c in pl.flowers){
				let n=pl.flowers[c];
				playerStatCount(c, n, d); //, {}, {id:`stat_${plname}_score`});	
			}

			
			if (table.turn.includes(plname)) { mDom(d, { position: 'absolute', left: -3, top: 0 }, { html: getWaitingHtml() }); }
		}

	}

	function present(table) {
		B={};
		let dTable = presentBgaRoundTable();
		let fen = table.fen;
		let [w, h, sz, n, neach, points, meeples] = [fen.w, fen.h, fen.sz, fen.n, fen.neach, jsCopy(fen.points), jsCopy(fen.meeples)];
		let padding = 20;
		mStyle(dTable, { bg: 'midnight_purple', position: 'relative', padding, wmin: w + 2 * padding, hmin: h + 2 * padding });
		let dParent = B.dParent = mDom(dTable, { w, h, position: 'absolute', left: 2 * padding, top: 2 * padding }, { id: 'dCanvas' });
		B.points = points; //console.log(points);
		B.sz = sz;
		B.diPoints = lacunaDrawPoints(dParent, points);
		B.meeples = meeples;
		B.diMeeples = lacunaDrawPoints(dParent, meeples);
		//meeples.map(x=>showMeeple(dParent,x));
		return B.points;
	}

	async function activate(table, items) {
		//console.log('activate', table, items);
		await instructionStandard(table, 'must place a meeple'); //browser tab and instruction if any
		if (!isMyTurn(table)) return;
		setTimeout(() => lacunaStartMove(), 10);
	}

	return { setup, present, stats, activate };
}

function drawLine1(p1,p2) {
	// Calculate the distance between the two points (line length)
	let [x1,y1,x2,y2]=[p1.cxPage,p1.cyPage,p2.cxPage,p2.cyPage];
	const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

	// Calculate the angle between the two points
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

	// Create the line div
	const line = document.createElement('div');
	line.className = 'line';
	line.style.height = `${length}px`;
	line.style.transform = `rotate(${angle}deg)`;
	
	// Position the line to be centered on the endpoints
	line.style.left = `${x1}px`;
	line.style.top = `${y1}px`;
	
	// Append the line to the body
	document.body.appendChild(line);

	return line;
}
function onMouseMoveLine1(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  DA.lines.forEach(line => {
    const rect = line.getBoundingClientRect();
    if (
      mouseX >= rect.left && mouseX <= rect.right &&
      mouseY >= rect.top && mouseY <= rect.bottom
    ) {
      line.style.backgroundColor = 'red'; // Change color on hover
    } else {
      line.style.backgroundColor = 'black'; // Reset color when not hovered
    }
  });
}

function pointLineDistance1(px, py, ax, ay, bx, by) {
	const A = px - ax;
	const B = py - ay;
	const C = bx - ax;
	const D = by - ay;
	const dot = A * C + B * D;
	const len_sq = C * C + D * D;
	let param = (len_sq !== 0) ? dot / len_sq : -1;
	let xx, yy;
	if (param < 0) {
		xx = ax;
		yy = ay;
	} else if (param > 1) {
		xx = bx;
		yy = by;
	} else {
		xx = ax + param * C;
		yy = ay + param * D;
	}
	const dx = px - xx;
	const dy = py - yy;
	return Math.sqrt(dx * dx + dy * dy);
}
function pointToLineDistance2(x, y, x1, y1, x2, y2) {
	const numerator = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1);
	const denominator = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);
	const distance = numerator / denominator;
	return distance;
}

function drawInteractiveLine0(p1, p2, color = 'black') {
	const line = document.createElement('div');
	let thickness = 10; let offs = thickness / 2;
	let [x1, y1, x2, y2] = [p1.cxPage, p1.cyPage, p2.cxPage, p2.cyPage];

	const distance = Math.hypot(x2 - x1, y2 - y1);
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
	line.style.position = 'absolute';
	line.style.transformOrigin = '0 0';
	line.style.transform = `rotate(${angle}deg)`;
	line.style.height = '2px';
	line.style.outline = 'solid red 11px';
	line.style.width = `${distance}px`;
	line.style.backgroundColor = color;
	line.style.left = `${x1}px`;
	line.style.top = `${y1}px`;

	line.addEventListener('mouseover', () => { line.style.backgroundColor = 'red'; });
	line.addEventListener('mouseout', () => { line.style.backgroundColor = color; });

	document.body.appendChild(line);
	return line;
}
function drawInteractiveLine1(p1, p2, color = 'black') {
	const line = document.createElement('div');
	const thickness = 20; // Set the line thickness (height) to 20px
	const offs = thickness / 2; 
	let [x1, y1, x2, y2] = [p1.cxPage, p1.cyPage, p2.cxPage, p2.cyPage];

	const distance = Math.hypot(x2 - x1, y2 - y1);
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

	// Style the line
	line.style.position = 'absolute';
	line.style.transformOrigin = '0 50%';  // Rotate around the center of the thickness
	line.style.transform = `rotate(${angle}deg)`;
	line.style.height = `${thickness}px`;
	line.style.width = `${distance}px`;
	line.style.backgroundColor = color;

	// Position the line so that it's centered on its original location
	line.style.left = `${x1}px`;
	line.style.top = `${y1 - offs}px`;  // Adjust top by half of thickness

	// Interactive color change
	line.addEventListener('mouseover', () => { line.style.backgroundColor = 'red'; });
	line.addEventListener('mouseout', () => { line.style.backgroundColor = color; });

	// Append the line to the body
	document.body.appendChild(line);
	return line;
}
function drawInteractiveLine2(p1, p2, color = 'black') {
	const line = document.createElement('div');
	const thickness = 20; // Set the line thickness (height) to 20px
	const offs = thickness / 2; 
	let [x1, y1, x2, y2] = [p1.cxPage, p1.cyPage, p2.cxPage, p2.cyPage];

	const distance = Math.hypot(x2 - x1, y2 - y1);
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

	// Style the line
	line.style.position = 'absolute';
	line.style.transformOrigin = '0 50%';  // Rotate around the center of the thickness
	line.style.transform = `rotate(${angle}deg)`;
	line.style.height = `${thickness}px`;
	line.style.width = `${distance}px`;
	line.style.backgroundColor = color;

	// Position the line so that it's centered on its original location
	line.style.left = `${x1}px`;
	line.style.top = `${y1 - offs}px`;  // Adjust top by half of thickness

	document.body.appendChild(line);
	return line;
}
function drawInteractiveLine00(p1, p2, color='black') {
	const line = document.createElement('div');
	let thickness = 10; let offs = thickness/2;
	let [x1,y1,x2,y2]=[p1.cxPage,p1.cyPage,p2.cxPage,p2.cyPage];
	// let [x1,y1,x2,y2]=[p1.cxPage-offs,p1.cyPage-offs,p2.cxPage-offs,p2.cyPage-offs];
	// let [x1,y1,x2,y2]=[p1.cxPage,p1.cyPage-offs,p2.cxPage,p2.cyPage-offs];

	const distance = Math.hypot(x2 - x1, y2 - y1);
	const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
	line.style.position = 'absolute';
	line.style.transformOrigin = '0 0';
	line.style.transform = `rotate(${angle}deg)`;
	line.style.height = '2px';
	line.style.outline = 'solid red 11px';
	line.style.width = `${distance}px`;
	line.style.backgroundColor = color;
	line.style.left = `${x1}px`;
	line.style.top = `${y1}px`;

	line.addEventListener('mouseover', () => {		line.style.backgroundColor = 'red';	});
	line.addEventListener('mouseout', () => {		line.style.backgroundColor = color;	});

	document.body.appendChild(line);
	return line;
}


//#region lacuna NOT in game
function lacunaMakeSelectable() {
	for (const id of B.endPoints) {
		let div = mBy(id);
		mClass(div, 'selectable')
		div.onclick = ev => lacunaSelectPoint(ev);
	}
}
function lacunaMoveCompleted(idlist) {
	B.endPoints.map(x => lacunaUnselectable(x));
	showMessage("Move completed, removing", idlist);
	if (idlist.length == 2) {
		let p1 = B.diPoints[idlist[0]];
		let p2 = B.diPoints[idlist[1]];
		delete B.diPoints[p1.id];
		delete B.diPoints[p2.id];
		mRemove(p1.div);
		mRemove(p2.div);
		B.points = B.points.filter(x => x.id != p1.id && x.id != p2.id);
	}
	//remove hotspots 
	for (const p of B.hotspotList) { mRemove(p.div); }
	let ch = arrChildren(B.dParent); console.log('ch', ch.length, 'points', B.points.length);
	B.selectedPoints = [];
	B.dParent.onclick = lacunaStartMove;
}
function lacunaSelectPoint(ev) {
	let id = evToId(ev);
	let p = B.diPoints[id];
	console.log('selecting point', p.id);
	lookupAddIfToList(B, ['selectedPoints'], id); console.log(B.selectedPoints.length)
	assertion(B.selectedPoints.length >= 1, "WTF");
	if (B.selectedPoints.length == 1) {
		let eps = [];
		console.log('possiblePairs', B.possiblePairs);
		for (const pair of B.possiblePairs.map(x => x.split(',').map(x => B.diPoints[x]))) {
			let p1 = pair[0];
			let p2 = pair[1];
			if (p1.id != id && p2.id != id) continue;
			if (p1.id == id) addIf(eps, p2.id); else addIf(eps, p1.id);
		}
		let unselect = B.endPoints.filter(x => !eps.includes(x));
		unselect.map(x => lacunaUnselectable(x));
		B.endPoints = eps; console.log('endPoints remaining', B.endPoints);
		if (B.endPoints.length < 2) {
			B.selectedPoints.push(B.endPoints[0]);
			lacunaMoveCompleted(B.selectedPoints);
		}
	} else {
		assertion(B.selectedPoints.length == 2, "WTF2!!!!!!!!!!!!!");
		lacunaMoveCompleted(B.selectedPoints);
	}
}
function placeYourMeeple(ev) {
	stopPulsing();
	d = mBy('dCanvas');
	d.onmousemove = null;
	d.onclick = null;
	for (const p of B.hotspotList) {
		mStyle(p.div, { z: 0 })
	}
	for (const p of B.points) {
		p.div.style.zIndex = 1000;
	}
	let sz = 20;
	x = ev.clientX - d.offsetLeft - d.parentNode.offsetLeft;
	y = ev.clientY - d.offsetTop - d.parentNode.offsetTop;
	let color = getPlayerProp('color'); console.log('color', color)
	let pMeeple = { x: x - sz / 2, y: y - sz / 2, sz, bg: 'black', id: getUID() };
	lacunaDrawPoints(d, [pMeeple], false);
	mStyle(iDiv(pMeeple), { border: `${color} 5px solid` })
	B.meeples.push(pMeeple); console.log('B.meeples', B.meeples);

	//TODO: if only 2 points are selectable, just grab them and finish move!
	if (B.endPoints.length == 0) {
		//finish move without grabbing any flowers
		lacunaMoveCompleted([]);

	} else if (B.endPoints.length == 2) {
		//grab those flowers and finish move
		B.selectedPoints.push(B.endPoints[0]);
		B.selectedPoints.push(B.endPoints[1]);
		lacunaMoveCompleted(B.selectedPoints);

	} else lacunaMakeSelectable();
}

//#endregion

//#region lacuna_unused
function _drawPoints(dParent, points) {
	return points.map(p => placeCircle(dParent, p.x, p.y, valf(p.sz, 20), valf(p.bg, rColor())));
}
function alertOnPointClick(elem, di, threshold = 2) {
	elem.addEventListener('click', (ev) => {
		const rect = elem.getBoundingClientRect();
		const mouseX = ev.clientX - rect.left;
		const mouseY = ev.clientY - rect.top;
		let [xs, ys] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
		let mx1 = xs.lower;
		let mx2 = xs.higher;
		let my1 = ys.lower;
		let my2 = ys.higher;
		stopAnimatingPoints();
		if (mx1 - 2 <= mouseX && mouseX <= mx2 && my1 - 2 <= mouseY && mouseY <= my2) {
			B.mousePoint = { x: mouseX, y: mouseY };
			key = getXYKey(mx1, my1);
			let entry = lookup(di, [key]);
			if (entry) {
				B.pairInfo = entry;
				console.log(`Mouse over point (${mx1} (${mouseX}),${my1} (${mouseY}))`, entry);
				for (const id of entry) {
					mClass(id, ani)
				}
			}
		}
	});
}
function alertOnPointClickPair(elem, di, threshold = 2) {
	elem.addEventListener('click', (ev) => {
		const rect = elem.getBoundingClientRect();
		const mouseX = ev.clientX - rect.left;
		const mouseY = ev.clientY - rect.top;
		let [xs, ys] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
		let mx1 = xs.lower;
		let mx2 = xs.higher;
		let my1 = ys.lower;
		let my2 = ys.higher;
		stopAnimatingPairs();
		if (mx1 - 2 <= mouseX && mouseX <= mx2 && my1 - 2 <= mouseY && mouseY <= my2) {
			B.mousePoint = { x: mouseX, y: mouseY };
			key = getXYKey(mx1, my1);
			let entry = lookup(di, [key]);
			if (entry) {
				B.pairInfo = entry;
				if (entry.length == 1) {
					console.log(`pair ${entry[0]} is removed`);
					lacunaRemovePair(entry[0]);
				} else {
					console.log(`user will choose pair from`, entry);
				}
			}
		}
	});
}
async function alertOnPointClickPairHandler(ev) {
	let [dParent, di] = [B.info.dParent, B.info.di];
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
		B.mousePoint = { x: mouseX, y: mouseY };
		key = getXYKey(mx1, my1);
		let entry = lookup(di, [key]);
		if (entry) {
			B.pairInfo = entry;
			if (entry.length == 1) {
				stopAnimatingPairs();
				B.selectedPairIds = entry[0].split(',');
				console.log(`pair ${entry[0]} is removed`);
				lacunaRemovePair(entry[0]);
			} else {
				B.selectedPairIds = [];
				lacunaSelectPair(entry);
			}
		}
	}
}
function alertOnPointHover(elem, di, threshold = 2) {
	elem.addEventListener('mousemove', (ev) => {
		const rect = elem.getBoundingClientRect();
		const mouseX = ev.clientX - rect.left;
		const mouseY = ev.clientY - rect.top;
		let [xs, ys] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
		let mx1 = xs.lower;
		let mx2 = xs.higher;
		let my1 = ys.lower;
		let my2 = ys.higher;
		stopAnimatingPoints();
		if (mx1 - 2 <= mouseX && mouseX <= mx2 && my1 - 2 <= mouseY && mouseY <= my2) {
			B.mousePoint = { x: mouseX, y: mouseY };
			key = getXYKey(mx1, my1);
			let entry = lookup(di, [key]);
			if (entry) {
				startAnimatingPoints(entry)
			}
		}
	});
}
function alertOnPointHoverPair(elem, di, threshold = 2) {
	elem.addEventListener('mousemove', (ev) => {
		const rect = elem.getBoundingClientRect();
		const mouseX = ev.clientX - rect.left;
		const mouseY = ev.clientY - rect.top;
		let [xs, ys] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
		let mx1 = xs.lower;
		let mx2 = xs.higher;
		let my1 = ys.lower;
		let my2 = ys.higher;
		stopAnimatingPairs();
		if (mx1 - 2 <= mouseX && mouseX <= mx2 && my1 - 2 <= mouseY && mouseY <= my2) {
			B.mousePoint = { x: mouseX, y: mouseY };
			key = getXYKey(mx1, my1);
			let entry = lookup(di, [key]);
			if (entry) {
				startAnimatingPairs(entry)
			}
		}
	});
}
function alertOnPointHoverPairHandler(ev) {
	let [dParent, di] = [B.info.dParent, B.info.di];
	const rect = dParent.getBoundingClientRect();
	const mouseX = ev.clientX - rect.left;
	const mouseY = ev.clientY - rect.top;
	let [xs, ys] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
	let mx1 = xs.lower;
	let mx2 = xs.higher;
	let my1 = ys.lower;
	let my2 = ys.higher;
	stopAnimatingPairs();
	if (mx1 - 10 <= mouseX && mouseX <= mx2 + 5 && my1 - 10 <= mouseY && mouseY <= my2 + 5) {
		B.mousePoint = { x: mouseX, y: mouseY };
		key = getXYKey(mx1, my1);
		let entry = lookup(di, [key]);
		if (entry) {
			startAnimatingPairs(entry)
		}
	}
}
function filterIsolatedPairs(pairs, blockers, threshold = 10) {
	console.log(pairs, blockers);
	let newPairs = [];
	for (const pair of pairs) {
		const [ax, ay] = [pair[0].x, pair[0].y];
		const [bx, by] = [pair[1].x, pair[1].y];
		let isIsolated = true;
		for (const blocker of blockers) {
			const [px, py] = [blocker.x, blocker.y];
			const distance = pointToLineDistance(px, py, ax, ay, bx, by);
			if (distance < threshold) {
				isIsolated = false;
				break;
			}
		}
		if (isIsolated) {
			newPairs.push(pair);
		}
	}
	return newPairs;
	const isolatedPairs = [], obstaclePairs = [];
	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			if (nodes[i].bg != nodes[j].bg) continue;
			const [ax, ay] = [nodes[i].x, nodes[i].y];
			const [bx, by] = [nodes[j].x, nodes[j].y];
			let isIsolated = true;
			for (let k = 0; k < nodes.length; k++) {
				if (k === i || k === j) continue;
				const [px, py] = [nodes[k].x, nodes[k].y];
				const distance = pointLineDistance(px, py, ax, ay, bx, by);
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
function findClosePairs(points, x, y, threshold = 3) {
	function pointLineDistance(px, py, ax, ay, bx, by) {
		const A = px - ax;
		const B = py - ay;
		const C = bx - ax;
		const D = by - ay;
		const dot = A * C + B * D;
		const len_sq = C * C + D * D;
		let param = (len_sq !== 0) ? dot / len_sq : -1;
		let xx, yy;
		if (param < 0) {
			xx = ax;
			yy = ay;
		} else if (param > 1) {
			xx = bx;
			yy = by;
		} else {
			xx = ax + param * C;
			yy = ay + param * D;
		}
		const dx = px - xx;
		const dy = py - yy;
		return Math.sqrt(dx * dx + dy * dy);
	}
	const closePairs = [];
	for (let i = 0; i < points.length; i++) {
		for (let j = i + 1; j < points.length; j++) {
			const [ax, ay] = [points[i].x, points[i].y];
			const [bx, by] = [points[j].x, points[j].y];
			const distance = pointLineDistance(x, y, ax, ay, bx, by);
			if (distance < threshold) {
				closePairs.push([points[i], points[j]]);
			}
		}
	}
	return closePairs;
}
function findIsolatedPairs(nodes, threshold = 3) {
	function _pointLineDistance(px, py, ax, ay, bx, by) {
		const A = px - ax;
		const B = py - ay;
		const C = bx - ax;
		const D = by - ay;
		const dot = A * C + B * D;
		const len_sq = C * C + D * D;
		let param = (len_sq !== 0) ? dot / len_sq : -1;
		let xx, yy;
		if (param < 0) {
			xx = ax;
			yy = ay;
		} else if (param > 1) {
			xx = bx;
			yy = by;
		} else {
			xx = ax + param * C;
			yy = ay + param * D;
		}
		const dx = px - xx;
		const dy = py - yy;
		return Math.sqrt(dx * dx + dy * dy);
	}
	const isolatedPairs = [], obstaclePairs = [];
	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			if (nodes[i].bg != nodes[j].bg) continue;
			const [ax, ay] = [nodes[i].x, nodes[i].y];
			const [bx, by] = [nodes[j].x, nodes[j].y];
			let isIsolated = true;
			for (let k = 0; k < nodes.length; k++) {
				if (k === i || k === j) continue;
				const [px, py] = [nodes[k].x, nodes[k].y];
				const distance = pointLineDistance(px, py, ax, ay, bx, by);
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
function generateHotspotsNOY(dParent, pointPairs, sz = 20, color = 'red') {
	let hotspots = [];
	let linesByPair = {};
	for (const pair of pointPairs) {
		let ids = pair.map(x => x.id);
		let key = ids.join(',');
		let [pStart, pEnd] = [Items[ids[0]], Items[ids[1]]];
		let line = getEquidistantPoints(pStart, pEnd, sz / 2);
		for (const p of line) {
			p.bg = color;
			p.sz = sz;
			p.start = ids[0];
			p.end = ids[1];
			p.startX = pStart.x;
			p.endX = pEnd.x;
			p.id = getUID();
			p.pairs = [key];
			hotspots.push(p);
		}
		linesByPair[key] = line;
	}
	B.hotspots = lacunaDrawPoints(dParent, hotspots);
	hotspots.map(x => mStyle(x.div, { opacity: 0 }))
	let [c1, c2, c3, c4, c5, c6] = [0, 0, 0, 0, 0, 0];
	for (const p1 of hotspots) {
		assertion(p1.startX <= p1.endX, "NOT SORTED!!!!!")
		for (const p2 of hotspots) {
			if (p1 == p2) { c3++; continue; }
			if (p1.startX > p2.endX) { c1++; continue; }
			if (p2.startX > p1.endX) { c2++; continue; }
			if (p1.start == p2.start && p1.end == p2.end) { c4++; continue; }
			if (p1.start == p2.end && p1.end == p2.start) { c5++; continue; }
			c6++;
			let dist = getDistanceBetweenPoints(p1, p2);
			if (dist < sz / 3) {
				let newlist = new Set(p1.pairs.concat(p2.pairs));
				p1.pairs = Array.from(newlist);
				p2.pairs = Array.from(newlist);
			}
		}
	}
	return [hotspots, linesByPair];
}
function lacunaCalculate() {
	let { dParent, cv, w, h, sz, points } = B.info;
	let result = findIsolatedPairs(points, sz);
	let pixelsByPair = [];
	let di = {};
	let allPixels = [];
	for (const pair of result.isolatedPairs) {
		let [p1, p2] = [pair[0], pair[1]];
		let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];
		[x1, y1, x2, y2] = [x1, y1, x2, y2].map(x => x + sz / 2);
		let pixels = getLinePixels(x1, y1, x2, y2);
		for (const pix of pixels) {
			allPixels.push(pix);
			let key = getPixelKey(pix);
			let l = lookup(di, [key]);
			lookupAddIfToList(di, [key], `${p1.id},${p2.id}`)
		}
	}
	let di1 = B.info.di = clusterize(di);
	dParent.onmousemove = alertOnPointHoverPairHandler;
	dParent.onclick = alertOnPointClickPairHandler;
}
function lacunaCircles(w = 800, h = 400, n = 49, neach = 7, sz = 10) {
	let d = clearFlex();
	let rand = .8;
	let [d1, cv] = mArea(30, d, { w, h, bg: '#eee', position: 'relative' });
	let clist = lacunaColors();
	let points = generateRandomPointsRect(n, w, h, rand);
	let colors = generateRepeatedColors(n, neach, clist); arrShuffle(colors);
	for (let i = 0; i < n; i++) { points[i].bg = colors[i]; points[i].sz = sz; }
	for (const p of points) { drawCircleOnCanvas(cv, p.x, p.y, p.sz, p.bg); }
	return { d, cv, points };
}
function lacunaCirclesDiv(w = 800, h = 400, n = 49, neach = 7, sz = 10) {
	let d = clearFlex();
	let rand = .8;
	let [d1, cv] = mArea(30, d, { w, h, bg: '#eee', position: 'relative' });
	cv.remove();
	let clist = lacunaColors();
	let points = generateRandomPointsRect(n, w, h, rand);
	let colors = generateRepeatedColors(n, neach, clist); arrShuffle(colors);
	for (let i = 0; i < n; i++) { points[i].bg = colors[i]; points[i].sz = sz; }
	points = points.map(p => drawCircleOnDiv(d1, p.x, p.y, p.sz, p.bg));
	return { d, points };
}
function lacunaPresent() {
	let d = clearDiv();
	let [w, h, sz] = [900, 400, 20];
	let [dParent, cv] = mArea(10, d, { w, h, bg: '#eee' }); //mDom(d, { w, h, position: 'absolute', left: dx, top: dy, bg: 'yellow' });
	let points = mLacunaCirles(dParent, 49, 7, sz, .6);
	Items = drawPoints(dParent, points);
	DA.info = { dParent, cv, w, h, sz, points };
	lacunaCalculate();
}
function lacunaSelectPair(ev, pdiv, divs) {
	for (const div of divs) {
		mStyle(div, { cursor: 'pointer' })
		div.onclick = ev => lacunaSelectPoint(div, divs);
	}
}
function startAnimatingPairs(pairlist) {
	let ani = 'pulseFastInfinite'
	B.pairInfo = pairlist;
	for (const pair of pairlist) {
		let ids = pair.split(',');
		for (const id of ids) {
			let o = Items[id];
			mClass(id, ani)
		}
	}
}
function startAnimatingPoints(idlist) {
	let ani = 'pulseFastInfinite'
	B.pairInfo = idlist;
	for (const id of idlist) {
		mClass(id, ani)
	}
}
function stopAnimatingPairs() {
	let ani = 'pulseFastInfinite'
	if (nundef(B.pairInfo)) B.pairInfo = [];
	for (const p of B.pairInfo) {
		let ids = p.split(',');
		for (const id of ids) {
			let o = Items[id];
			if (nundef(o)) continue;
			mClassRemove(id, ani)
		}
	}
}
function stopAnimatingPoints() {
	let ani = 'pulseFastInfinite'
	if (nundef(B.pairInfo)) B.pairInfo = [];
	for (const p of B.pairInfo) {
		let o = Items[p]; console.log(o);
		mClassRemove(p, ani)
	}
}
//#_endregion

//#region ode anfang von lacuna

function placeCircles(canvas, n) {
	// // Example usage
	// const canvas = document.getElementById('canvas');
	// placeCircles(canvas, 20);

	const ctx = canvas.getContext('2d');
	const width = canvas.width;
	const height = canvas.height;

	const rows = Math.floor(Math.sqrt(n));
	const cols = Math.ceil(n / rows);

	const cellWidth = width / cols;
	const cellHeight = height / rows;

	const radius = Math.min(cellWidth, cellHeight) / 5;

	ctx.clearRect(0, 0, width, height);

	for (let i = 0; i < n; i++) {
		const row = Math.floor(i / cols);
		const col = i % cols;

		const x = col * cellWidth + (Math.random() * (cellWidth - 2 * radius) + radius);
		const y = row * cellHeight + (Math.random() * (cellHeight - 2 * radius) + radius);

		drawCircleOnCanvas(ctx, x, y, radius);
	}
}
function drawCircleOnCanvas(ctx, x, y, radius) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fillStyle = 'blue';
	ctx.fill();
	ctx.stroke();
}
function mCanvas(dParent, styles = {}, bstyles = {}, play = null, pause = null, origin = 'tl') {
  let cv = mCreate('canvas');
  mAppend(toElem(dParent), cv);
  addKeys({ w: 500, h: 500, bg: '#222', rounding: 10 }, styles);
  mStyle(cv, styles);
  let [w, h] = [cv.width, cv.height] = [styles.w, styles.h];
	return cv;
}

function siebenVonJederFarbe() {
	let colors = {
		"Red": "#E63946",
		"Green": "#06D6A0",
		"Blue": "#118AB2",
		"Cyan": "#0F4C75",
		"Magenta": "#D81159",
		"Yellow": "#FFD166",
		"Orange": "#F4A261",
		"Purple": "#9D4EDD",
		"Pink": "#FF80AB",
		"Brown": "#8D6E63",
		"Lime": "#A7FF83",
		"Indigo": "#3A0CA3",
		"Violet": "#B5838D",
		"Gold": "#F5C518",
		"Teal": "#008080"
	}
	let list = [];
	for (const c of rChoose(Object.values(colors), 7)) {
		for (const i of range(7)) list.push(c);
	}
	arrShuffle(list);

	return list;
}

function rPositions(width,height, n) {
	const rows = Math.floor(Math.sqrt(n));
	const cols = Math.ceil(n / rows);
	const cellWidth = width / cols;
	const cellHeight = height / rows;
	const radius = Math.min(cellWidth, cellHeight) / 5;

	let list=[];
	for (let i = 0; i < n; i++) {
		const row = Math.floor(i / cols);
		const col = i % cols;
		const x = col * cellWidth + (Math.random() * (cellWidth - 2 * radius) + radius);
		const y = row * cellHeight + (Math.random() * (cellHeight - 2 * radius) + radius);
		list.push({x,y});
	}
	return {list,radius};
}

function placeCircles1(container, n) {
	const width = container.clientWidth;
	const height = container.clientHeight;
	const radius = Math.min(width, height) / 2;

	const circleRadius = 10; // Radius of the circles to be placed
	const minDistance = circleRadius * 3; // Minimum distance between circles
	const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Approx. 137.5 degrees in radians

	// Clear existing circles
	while (container.firstChild) {
			container.removeChild(container.firstChild);
	}

	const circles = [];

	// Generate points with slight randomness for more varied distribution
	for (let i = 0; i < n; i++) {
			let valid = false;
			let x, y;

			while (!valid) {
					const angle = i * goldenAngle + (Math.random() - 0.5) * goldenAngle * 0.2;
					const distance = radius * Math.sqrt(i / n) + (Math.random() - 0.5) * radius * 0.1;

					x = radius + distance * Math.cos(angle);
					y = radius + distance * Math.sin(angle);

					valid = true;
					for (const circle of circles) {
							const dx = circle.x - x;
							const dy = circle.y - y;
							if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
									valid = false;
									break;
							}
					}
			}

			circles.push({ x, y });

			// Create and position the circle
			const circle = document.createElement('div');
			circle.classList.add('circle');
			circle.style.width = `${circleRadius * 2}px`;
			circle.style.height = `${circleRadius * 2}px`;
			circle.style.left = `${x - circleRadius}px`;
			circle.style.top = `${y - circleRadius}px`;
			container.appendChild(circle);
	}
}

function placeCircles1(container, n) {
	const width = container.clientWidth;
	const height = container.clientHeight;
	const radiusX = width / 2;
	const radiusY = height / 2;

	const circleRadius = 10; // Radius of the circles to be placed
	const minDistance = circleRadius * 2; // Minimum distance between circles
	const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Approx. 137.5 degrees in radians

	// Clear existing circles
	while (container.firstChild) {
			container.removeChild(container.firstChild);
	}

	const circles = [];

	// Generate points with slight randomness for more varied distribution
	for (let i = 0; i < n; i++) {
			let valid = false;
			let x, y;

			while (!valid) {
					const angle = i * goldenAngle + (Math.random() - 0.5) * goldenAngle * 0.2;
					const distance = Math.sqrt(i / n);

					// Calculate x and y within the ellipse
					x = radiusX + distance * radiusX * Math.cos(angle);
					y = radiusY + distance * radiusY * Math.sin(angle);

					valid = true;
					for (const circle of circles) {
							const dx = circle.x - x;
							const dy = circle.y - y;
							if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
									valid = false;
									break;
							}
					}
			}

			circles.push({ x, y });

			// Create and position the circle
			const circle = document.createElement('div');
			circle.classList.add('circle');
			circle.style.width = `${circleRadius * 2}px`;
			circle.style.height = `${circleRadius * 2}px`;
			circle.style.left = `${x - circleRadius}px`;
			circle.style.top = `${y - circleRadius}px`;
			container.appendChild(circle);
	}
}


//#endregion

//#region bau4 von august 24 24




function arrSort(arr) {
  return arr.sort((a, b) => {
    // Convert both elements to strings for comparison
    const aStr = a.toString();
    const bStr = b.toString();

    // Use localeCompare to handle string comparison
    return aStr.localeCompare(bStr, undefined, { numeric: true });
  });
}
async function mPostYaml(o,path){
	return await mPostRoute('postYaml',{o,path});
}
function trimToAlphanum(str,allow_=true) {
  return str.replace(/^[^a-zA-Z0-9_]+|[^a-zA-Z0-9_]+$/g, '');
}
function normalizeString(s, sep = '_', keep = []) {
  s = s.toLowerCase().trim();
  let res = '';
  for (let i = 0; i < s.length; i++) { if (isAlphaNum(s[i]) || keep.includes(s[i])) res += s[i]; else if (last(res)!=sep) res += sep; }
  return res;
}
function replaceAllSpecialCharsFromList(str, list, sBy, removeConsecutive=true) { 
	for(const sSub of list){
		str=replaceAllSpecialChars(str,sSub,sBy);
	}
	if (removeConsecutive){
		let sresult='';
		while(str.length>0){
			let sSub=str.substring(0,sBy.length);
			str = stringAfter(str,sSub);
			if (sSub == sBy && sresult.endsWith(sBy)) continue;
			sresult += sSub;
			if (str.length<sBy.length) {sresult+=str;break;}
		}
		str=sresult;
	}
	return str;
}
function superTrim(s){
	// Remove all tab or newline characters and trim spaces
	s = s.replace(/[\t\n]/g, ' ').trim();

	// Replace multiple consecutive spaces with a single space
	s = s.replace(/\s\s+/g, ' ');

	// Remove the last semicolon if present
	if (s.endsWith(';')) {
		s = s.slice(0, -1);
	}

}
function extractWords(s, allowed) {
	let specialChars = getSeparators(allowed);
	let parts = splitAtAnyOf(s, specialChars.join('')).map(x => x.trim());
	return parts.filter(x => !isEmpty(x));
}
function getSeparators(allowed) {
	let specialChars = toLetters(' ,-.!?;:');
	if (isdef(allowed)) specialChars = arrMinus(specialChars, toLetters(allowed));
	return specialChars;
}

function toListEntry(s,sep = '_', keep = []) {
	let nogo3=['and'];


}

async function askWiki(query) {
	if (isEmpty(query)) return 'NO QUERY!';
	let response = await mGetRoute('wiki', { question: query });
	return response;
}
async function askHuggingFace(question) {
	//gratis: hugging_face
	if (isEmpty(question)) return 'NO QUESTION!';
	let response = await mGetRoute('fetch_answer', { question });
	return lookup(response, ['answer']) ?? 'ERROR';
}
async function askOpenai(prompt) {
	if (nundef(prompt)) prompt = 'list of 100 very different documentary subjects?';
	let answer = await mPostRoute('ask', { prompt });
	return answer;
}
async function askOpenaiKeyword(word, category = null) {
	if (!category) category = 'def';
	let res = await mPostRoute('ask_details', { word, category });
	return res;
	// if (nundef(word)) return; //prompt = 'list of 100 very different documentary subjects?';
	// //let prompt = pYamlDetails(word,category); =>app.js
	// let answer = await mPostRoute('ask', { prompt });
	// if (answer.includes('```')) answer = stringBeforeLast(stringAfter(answer,'\n'),'\n');
	// let o= jsyaml.load(answer);//console.log('o',o,typeof o);
	// return o;
}
async function askOpenaiListOf(word, num = 100) {
	let res = await mPostRoute('ask_list', { word, num });
	return res;
	// if (nundef(word)) return; //prompt = 'list of 100 very different documentary subjects?';
	// //let prompt = pYamlDetails(word,category); =>app.js
	// let answer = await mPostRoute('ask', { prompt });
	// if (answer.includes('```')) answer = stringBeforeLast(stringAfter(answer,'\n'),'\n');
	// let o= jsyaml.load(answer);//console.log('o',o,typeof o);
	// return o;
}
function pListOf(what) { return 'list of 100 ' + what.toLowerCase(); }
function pYamlDetails(keyword, type, props) {
	if (nundef(props)) {
		switch (type) {
			case 'animal': props = 'class, color, food, habitat, lifespan, name, offsprings, reproduction, size, species, weight'; break;
			case 'location': props = 'population, size, longitude, latitude'; break;
			default: props = 'definition, synonyms, antonyms, german, spanish, french'; break;
		}
	}
	let p = `information about ${keyword}, formatted as yaml object with the following properties: `;
	p += props + '.';
	p += `property values should if possible contain numeric information in scientific (European) metrics.`
	return p;
}
function showYaml(o, title, dParent, styles = {}, opts = {}) {
	o = toFlatObject(o);
	//return showObject(o, null, dParent, styles, addKeys({ title }, opts));
	let d = mDom(dParent,styles,opts); 
	mDom(d, {}, { tag: 'h2', html: title }); 
	let keys = Object.keys(o); 
	let grid = mGrid(keys.length,2,d,{rounding:8,padding:4,bg:'#eee',wmax:500},{wcols:'auto'});
	let cellStyles = {hpadding:4};
	if (isList(o)){
		arrSort(o);
		o.map((x,i)=>{mDom(grid,{fg:'red',align:'right'},{html:i});mDom(grid,{maleft:10},{html:x});});
	}else if (isDict(o)){
		keys.sort();
		for(const k of keys){
			mDom(grid,{fg:'red',align:'right'},{html:k})
			mDom(grid,{maleft:10},{html:o[k]});
		}
	}
	return d;
	// mDom(d, {}, { tag:'pre', html: o });

}
function recFlatten(o) {
	if (isLiteral(o)) return o;
	else if (isList(o)) return o.map(x => recFlatten(x)).join(', ');
	else if (isDict(o)) {
		let valist = [];
		for (const k in o) { let val1 = recFlatten(o[k]); valist.push(`${k}: ${val1}`); }
		return valist.join(', ');
	}
}
function toFlatObject(o) {
	if (isString(o)) return { details: o };
	for (const k in o) { let val = o[k]; o[k] = recFlatten(val); }
	return o;
}
function trimQuotes(str) { return str.replace(/^['"`]+|['"`]+$/g, ''); }



//#endregion

function mist(){
	addIf(DA.selectedPairIds, id);
	let poss = DA.pairInfo.filter(x => x.includes(id));
	assertion(poss.length >= 1, 'no pair selected')
	if (poss.length == 1) {
		lacunaRemovePair(poss[0]);
	} else if (DA.selectedPairIds.length == 2) {
		lacunaRemovePair(DA.selectedPairIds.join(','));
	} else {
		//console.log(divs)
		divs.map(x=>mClassRemove(x, 'pulseFastInfinite'));
		possids = [];
		for(const pair of poss){
			possids = possids.concat(pair.split(','));
		}
		possids.map(x=>mClass(x, 'pulseFastInfinite'));
		mRemoveClass(div, 'pulseFastInfinite');
		lacunaSelectPair(poss);
	}
}
function sortByLeastX(olist) {
	return olist.sort((a, b) => {
			// Find the minimum x value in each pair
			const minX_A = Math.min(a.xStart, a[1].x);
			const minX_B = Math.min(b[0].x, b[1].x);

			// Sort by the minimum x value
			return minX_A - minX_B;
	});
}
function lacunaSelectPair(ev, pairs, p) {
	//console.log('___click',p);
	//console.log(p.pairs);
	//p is a start or end point that has been clicked
	//pairs is the list of pairs that are currently highlighted

	//if p is included in more than 1 pair of pairs, select the corresponding other endpoints
	let poss = pairs.filter(x => x.includes(p.id));
	if (poss.length > 1) {
		let ids = [];
		for (const pair of poss) {
			let [pstart, pend] = pair.split(',').map(x => mBy(x));
			mClassRemove(pstart, 'pulseFastInfinite');
			mClassRemove(pend, 'pulseFastInfinite');
			ids = ids.concat(pair.split(','));
		}
		ids = ids.filter(x => x != p.id);
		ids.map(x => mClass(mBy(x), 'pulseFastInfinite'));
		return;
	}

	//if p is included in only 1 pair of pairs, select it and remove both points and the line between

	
	for (const pair of p.pairs) {
		//highlight the end points corresponding to this pair
		let [pstart, pend] = pair.split(',').map(x => mBy(x));
		mClass(pstart, 'pulseFastInfinite');
		mClass(pend, 'pulseFastInfinite');
	}
}
function mist(){
	for(const k in linesByPair){
		let line=linesByPair[k];
		let allOtherPairs=Object.keys(linesByPair).filter(x=>x!==k);
		for(let i=0;i<line.length-1;i++){
			//compare this point to all points of all other lines
			let p1=line[i];
			for(const kOther of allOtherPairs){
				for(const p2 of kOther){
					let dist=getDistanceBetweenPoints(p1,p2);
					console.log(p1,p2,dist);
					if (dist<sz){
						p1.bg='blue';mStyle(p1.div,{bg:'blue'});
						p2.bg='blue';mStyle(p2.div,{bg:'blue'});
						addIf(p2.pairs,k);
						addIf()
						//for(const 1addIf(p1.pairs,p2.id);
						//p1.pairs.push()
					}
				}
			}
		}
	}

}
function lacunaPresent1(points, w, h, sz) {

	let d = clearDiv();
	let [dParent, cv] = mArea(10, d, { w, h, bg: '#eee' }); //mDom(d, { w, h, position: 'absolute', left: dx, top: dy, bg: 'yellow' });
	Items = drawPoints(dParent, points); //console.log(Items)

	let info = DA.info = { dParent, cv, w, h, sz, points };

	let result = findIsolatedPairs(points, sz); //console.log(result);
	let di = {};
	let allPixels = [];
	for (const pair of result.isolatedPairs) {
		let [p1, p2] = [pair[0], pair[1]];
		let [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];
		[x1, y1, x2, y2] = [x1, y1, x2, y2].map(x => x + sz / 2);
		let pixels = getLinePixels(x1, y1, x2, y2); //console.log('pixels', pixels);
		//pixelsByPair.push({ x1, y1, x2, y2, p1, p2, pixels }); //console.log('pixels', pixels);

		for (const pix of pixels) {
			allPixels.push(pix);
			let key = getPixelKey(pix);
			let l = lookup(di, [key]);
			lookupAddIfToList(di, [key], `${p1.id},${p2.id}`)
			//lookupAddIfToList(di, [key], p2.id)
			//if (l) console.log(pix.x,pix.y,lookup(di, [key]));
		}

		drawLineOnCanvas(cv, x1, y1, x2, y2, 2);
	}

	//console.log(Object.keys(di).length);
	let di1 = DA.info.di = clusterize(di,10);
	//console.log(Object.keys(di1).length); //return;

	//console.log(di);
	dParent.onmousemove = alertOnPointHoverPairHandler;
	dParent.onclick = alertOnPointClickPairHandler;
	// alertOnPointHoverPair(dParent, di1);
	// alertOnPointClickPair(dParent, di1);

}

function lacunaRemovePair(pair) {
	let { dParent, cv, w, h, sz, points } = DA.info;

	let ids = pair.split(',');
	for (const id of ids) {
		let o = Items[id];//remove the div
		o.div.remove();
		points = points.filter(x => x.id != id);//remove from points
		delete Items[id];//remove from items
	}

	mRemove(cv);
	mRemove(dParent);

	lacunaPresent1(points, w, h, sz);
	return;

	let canvas = cv; //clear DA.info.cv ctx
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//stopAnimatingPairs();

	for (const id in Items) {
		let d = mBy(id);
		mClassRemove(d, 'pulseInfinite');
		mStyle(d, { cursor: 'default' });
		d.onclick = null;
	}

	lacunaPresent1();
}
function _alertOnPointHover(canvas, points, threshold = 2) {
	canvas.addEventListener('mousemove', (ev) => {
		const rect = canvas.getBoundingClientRect();
		const mouseX = ev.clientX - rect.left;
		const mouseY = ev.clientY - rect.top;

		for (let i = 0; i < points.length; i++) {
			const point = points[i];
			const dx = mouseX - point.x;
			const dy = mouseY - point.y;

			// Check if the mouse is within the threshold distance of the point
			if (Math.sqrt(dx * dx + dy * dy) < threshold) {
				console.log(`Mouse over point (${point.x}, ${point.y})`);
				//break;  // Stop checking other points after finding a match
			}
		}
	});
}
async function _fetchAndPrintDetails(titles) {

	//let titles = Object.keys(Session.locs).map(x=>Session.locs[x].title);//["New York City", "London", "Tokyo", "Paris", "Berlin", "Sydney", "Moscow", "Beijing", "Rio de Janeiro", "Cape Town"];
	if (nundef(titles)) titles = ["New York City", "London", "Tokyo", "Paris", "Berlin", "Sydney", "Moscow", "Beijing", "Rio de Janeiro", "Cape Town"];
	titles = arrTake(titles, 10);
	//console.log(titles); return;

	const details = await getPageDetails(titles);
	return details;
	//console.log(details); return;
	if (details) {
		//console.log(details);
		details.forEach(detail => {
			console.log(detail); return;
			// console.log(`Title: ${detail.title}`);
			// console.log(`Is City: ${detail.isCity}`);
			// console.log(`Status: ${detail.status}`);
			// console.log(`Extract: ${detail.extract}`);
			console.log('--------------------');
		});
	}
}
function _mArea(padding, dParent, styles = {}, opts = {}) {
	addKeys({ padding, wbox: true, position: 'relative' }, styles)
	let d0 = mDom(dParent, styles);
	let d = mDom(d0, { w100: true, h100: true, box: true, position: 'relative' }, opts);
	let [w, h] = [mGetStyle(d, 'w'), mGetStyle(d, 'h')];
	let cv = mDom(d, { position: 'absolute', top: 0, left: 0, w100: true, h100: true }, { tag: 'canvas', id: 'canvas1', width: w, height: h })
	return [d, cv];
}
function alertOnPointHover(elem, di, threshold = 2) {
	elem.addEventListener('mousemove', (ev) => {
		const rect = elem.getBoundingClientRect();
		const mouseX = ev.clientX - rect.left;
		const mouseY = ev.clientY - rect.top;

		// let key = getXYKey(mouseX, mouseY);

		let [{ mx1, mx2 }, { my1, my2 }] = [roundToNearestMultiples(mouseX, 10), roundToNearestMultiples(mouseY, 10)];
		for (const x of range(mx1, mx2)) {
			for (const y of range(my1, my2)) {
				key = getXYKey(x, y);
				let entry = lookup(di, [key]);
				if (entry) {
					console.log(`Mouse over point (${mouseX}, ${mouseY})`, entry);
				}
			}
		}


		// for (const x in di) {
		// 	for (const y in di[x]) {
		// 		const point = { x, y };
		// 		const dx = mouseX - point.x;
		// 		const dy = mouseY - point.y;

		// 		// Check if the mouse is within the threshold distance of the point
		// 		if (Math.sqrt(dx * dx + dy * dy) < threshold) {
		// 			console.log(`Mouse over point (${point.x}, ${point.y})`);
		// 			//break;  // Stop checking other points after finding a match
		// 		}
		// 	}
		// }
	});
}
function lacunaRemovePair(pair) {
	let ids = pair.split(',');
	for (const id of ids) {

		//remove the div
		let o = Items[id];
		o.div.remove();

		//remove from points
		DA.info.points = DA.info.points.filter(x => x.id != id);


		//remove from items
		delete Items[id];


	}
	//delete event handlers from dParent
	DA.info.dParent.onclick = null;
	DA.info.dParent.onmousemove = null;

	//clear DA.info.cv ctx
	let canvas = DA.info.cv;
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	lacunaCalculate();

	// DA.entry=[];
	// //recalculate lines
	// let {dParent,cv,w,h,sz,points}=DA.info;

	// points = points.filter(x=>!ids.includes(x.id));
	// DA.points = points;
	// lacunaCalculate(dParent,cv,w,h,sz,points);

	// console.log('points', points);

}
function nodejs() {
	app.get('/cityweb_BROKEN', async (req, res) => {
		let { city } = req.query;
		let norm = normalizeString(city);

		let web = lookup(Session, ['web', norm]);
		if (web) return res.json(web);

		console.log('==> get city', city);
		const result = await getFromWebPage(city);
		lookupSet(Session, ['web', norm], result);
		res.json(result);
	});
	app.get('/cityweb0/:city/first200lines', async (req, res) => {
		const city = req.params.city;
		const first200Lines = await getFromWebPage(city);

		if (first200Lines) {
			res.send(first200Lines);
		} else {
			res.status(404).json({ message: 'City not found or error fetching data' });
		}
	});

}
