
function lacuna() {
	function setup(table) {
		let fen = {};
		for (const name in table.players) {
			let pl = table.players[name];
			pl.score = 0;
			pl.positions = [];
			pl.flowers = {};
		}
		//console.log(table.options)
		let [w, h, sz, n, neach] = [fen.w, fen.h, fen.sz, fen.n, fen.neach] = [900, 700, 20, table.options.numPoints, table.options.numPoints / table.options.numColors];
		//console.log(n, neach);
		fen.points = lacunaGeneratePoints(w, h, n, neach, sz, .6, true); //console.log(jsCopy(points[0]));
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
			playerStatCount('star', pl.score, d); //, {}, {id:`stat_${plname}_score`});
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
		B.diPoints = lacunaDrawPoints(dParent, points, false);
		B.meeples = meeples;
		B.diMeeples = lacunaDrawPoints(dParent, meeples, false);
		meeples.map(x=>showMeeple(dParent,x));
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

function filterIsolatedPairs(pairs, blockers, threshold = 10) {
	//console.log(pairs, blockers);
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
}
function findIsolatedPairs(nodes, threshold = 3) {
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
function generateHotspots(dParent, pointPairs, sz = 20, color = 'red') {
	let t = getNow();
	let hotspots = [];
	let linesByPair = {};
	for (const pair of pointPairs) {

		unlockLengthyProcess();

		let ids = pair.map(x => x.id); //console.log(ids);
		let key = ids.join(',');
		let [pStart, pEnd] = [B.diPoints[ids[0]], B.diPoints[ids[1]]];
		let line = getEquidistantPoints(pStart, pEnd, sz / 2);
		for (const p of line) {
			p.bg = color;
			p.sz = sz;
			p.start = ids[0];
			p.end = ids[1];
			p.startX = pStart.x;
			p.endX = pEnd.x;
			p.startY = pStart.y;
			p.endY = pEnd.y;
			p.id = getUID();
			p.pairs = [key];
			hotspots.push(p);
		}
		linesByPair[key] = line;
	}
	t = showTimeSince(t); 
	let dihotspots = lacunaDrawPoints(dParent, hotspots);
	if (color == 'transparent') hotspots.map(x => mStyle(x.div, { opacity: 0 }))
	let [c1, c2, c3, c4, c5, c6] = [0, 0, 0, 0, 0, 0];
	for (const p1 of hotspots) {
		assertion(p1.startX <= p1.endX, "NOT SORTED!!!!!")
		for (const p2 of hotspots) {

			unlockLengthyProcess();
			
			if (p1 == p2) { c3++; continue; }
			if (p1.startX > p2.endX) { c1++; continue; }
			if (p2.startX > p1.endX) { c2++; continue; }
			if (p1.start == p2.start && p1.end == p2.end) { c4++; continue; }
			if (p1.start == p2.end && p1.end == p2.start) { c5++; continue; }
			let miny1 = Math.min(p1.startY, p1.endY);
			let maxy1 = Math.max(p1.startY, p1.endY);
			let miny2 = Math.min(p2.startY, p2.endY);
			let maxy2 = Math.max(p2.startY, p2.endY);
			if (miny1 > maxy2 || miny2 > maxy1) { c5++; continue; }
			c6++;
			let dist = getDistanceBetweenPoints(p1, p2);
			if (dist < sz / 3) {
				let newlist = new Set(p1.pairs.concat(p2.pairs));
				p1.pairs = Array.from(newlist);
				p2.pairs = Array.from(newlist);
				if (color != 'transparent') {
					p1.bg = 'blue'; mStyle(p1.div, { bg: 'blue' });
					p2.bg = 'blue'; mStyle(p2.div, { bg: 'blue' });
				}
			}
		}
	}
	t = showTimeSince(t); 
	return [hotspots, linesByPair];
}
function getDistanceBetweenPoints(p1, p2) {
	if (isString(p1)) p1 = B.diPoints[p1];
	if (isString(p2)) p2 = B.diPoints[p2];
	return getDistanceBetweenCenters(p1.div, p2.div);
}
function highlightHotspots(ev) {
	let [x, y] = [ev.clientX, ev.clientY];
	let els = allElementsFromPoint(x, y);
	let endPoints = [], possiblePairs = [];
	for (const elem of els) {
		let p = B.hotspotDict[elem.id]; //console.log(p)
		if (isdef(p)) {
			addIf(endPoints, p.start);
			addIf(endPoints, p.end);
			let pair = [p.start, p.end]; pair.sort();
			addIf(possiblePairs, pair.join(','));
		}
	}
	stopPulsing(endPoints);
	startPulsing(endPoints);
	B.endPoints = endPoints;
	B.selectedPoints = [];
	B.possiblePairs = possiblePairs;
}
function lacunaColor(name) {
	let clist = { red: "#E63946", green: "#06D6A0", blue: "#118AB2", cyan: "#0F4C75", magenta: "#D81159", yellow: "#FFD166", orange: "#F4A261", purple: "#9D4EDD", pink: "#FF80AB", brown: "#8D6E63", lime: "#A7FF83", indigo: "#3A0CA3", violet: "#B5838D", gold: "#F5C518", teal: "#008080" };
	return clist[name];
}
function lacunaColorName(val) {
	let clist = { red: "#E63946", green: "#06D6A0", blue: "#118AB2", cyan: "#0F4C75", magenta: "#D81159", yellow: "#FFD166", orange: "#F4A261", purple: "#9D4EDD", pink: "#FF80AB", brown: "#8D6E63", lime: "#A7FF83", indigo: "#3A0CA3", violet: "#B5838D", gold: "#F5C518", teal: "#008080" };
	for (const k in clist) {
		if (val == clist[k]) return k;
	}
	return 'unknown';
}
function lacunaColors() {
	let clist = { red: 'crimson', green: "#00ff00", blue: "#0000ff", cyan: "#00ffff", yellow: "#FFD166", pink: "#FF80AB", orange: "#F4A261", purple: "#9D4EDD", brown: "#8D6E63", lime: "#A7FF83", indigo: "#3A0CA3", violet: "#B5838D", gold: "#F5C518", teal: "#008080", magenta: "#D81159" };
	return Object.values(clist);
}
function lacunaDrawPoints(dParent, points, addLabel = true) {
	let items = [];
	for (const p of points) {
		let d1 = p.div = mDom(dParent, { round: true, left: p.x, top: p.y, w: p.sz, h: p.sz, position: 'absolute', bg: p.bg, align: 'center', fg: 'contrast' }, { html: addLabel ? p.id.substring(1) : '', id: p.id });
		d1.style.cursor = 'default';
		let rect = getRect(d1);
		p.cx = p.x + p.sz / 2; p.cy = p.y + p.sz / 2;
		p.xPage = rect.x; p.yPage = rect.y;
		p.cxPage = rect.x + p.sz / 2; p.cyPage = rect.y + p.sz / 2;
		items[p.id] = p;
	}
	return items;
}
function lacunaGeneratePoints(w, h, n = 49, neach = 7, sz = 10, rand = .7, round = false) {
	let clist = lacunaColors();
	let points = round ? generateRandomPointsRound(n, w, h, rand) : generateRandomPointsRect(n, w, h, rand);
	let colors = generateRepeatedColors(n, neach, clist); arrShuffle(colors);
	for (let i = 0; i < n; i++) { points[i].bg = colors[i]; points[i].sz = sz; points[i].id = getUID(); }
	return points;
}
function lacunaGeneratePointsMargin(w, h, margin, n = 49, neach = 7, sz = 10, rand = .7, round = false) {
	let points = lacunaGeneratePoints(w - 2 * margin, h - 2 * margin, n, neach, sz, rand, round);
	for (let i = 0; i < n; i++) { points[i].x += margin; points[i].y += margin; }
	return points;
}
function lacunaMakeSelectableME() {
	for (const id of B.endPoints) {
		let div = mBy(id);
		mClass(div, 'selectable')
		div.onclick = ev => lacunaSelectPointME(ev);
	}
}
function lacunaUnselectable(id) {
	let div = mBy(id); console.log('unselecting', id)
	mClassRemove(div, 'selectable');
	div.onclick = null;
}
function startPulsing(idlist) {
	idlist.map(x => B.diPoints[x].div.classList.add('pulseFastInfinite'));
}
function stopPulsing(idExcept = []) {
	let drem = document.querySelectorAll('.pulseFastInfinite');
	for (const d of drem) {
		if (idExcept.includes(d.id)) continue;
		d.classList.remove('pulseFastInfinite');
	}
}


