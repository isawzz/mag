
function lacuna() {
	function setup(table) {
		let opts = table.options;

		opts = { numPoints: 10, numColors: 2, numMeeples: 1 };

		let n = opts.numPoints;
		let neach = opts.numPoints / opts.numColors;

		let points = lacunaGenerateFenPoints(n, neach, 1000, 1000); // 243_500_1_felix, (x,y E [0,1000] und type E [1,numColors] hat, ?owner)
		//es ist auch simpel, wenn ich die points auf ein extra layer am document mache, alle coords absolute

		let fen = { points }; console.log('points',points)

		for (const name in table.players) {
			let pl = table.players[name];
			pl.score = 0;
			pl.positions = [];
			pl.flowers = {};
			for (const c of range(opts.numColors)) { pl.flowers[c] = 0; }
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


			for (const c in pl.flowers) {
				let n = pl.flowers[c];
				playerStatCount(c, n, d); //, {}, {id:`stat_${plname}_score`});	
			}


			if (table.turn.includes(plname)) { mDom(d, { position: 'absolute', left: -3, top: 0 }, { html: getWaitingHtml() }); }
		}

	}

	function present(table) {
		let fen = table.fen; console.log(fen);

		console.log(table.fen,table.players); 
		B = {};
		let dTable = presentBgaRoundTable(); 

		B.points = lacunaPresentPoints(fen.points,dTable);
		// let rect=getRect(dTable); 
		// let [w,h,xoff,yoff] = [rect.w,rect.h,rect.x,rect.y];console.log(w,h,xoff,yoff)
		// let pdiv=mDom(dTable,{position:'absolute',w:10,h:10,left:100+xoff,top:100+yoff,bg:rColor(),round:true},{'data-type':1});

		// B.points = [];

		// for(const p of fen.points){
		// 	B.points.push(pointFromFen(p,dTable,20))
		// };
		
	}
	function muell(table){
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
		if (!isMyTurn(table)) return;
		//console.log('activate', table, items);
		setInstruction('must place a meeple'); //browser tab and instruction if any
		console.log('AAAAAAAAAAAAAAAA')
		return;
		setTimeout(() => lacunaStartMove(), 10);
	}

	return { setup, present, stats, activate, hasInstruction:true };
}















