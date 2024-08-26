
function lacuna() {
	function setup(table) {
		let fen = {};
		for (const name in table.players) {
			let pl = table.players[name];
			pl.score = 0;
			pl.positions = [];
			pl.flowers = [];
		}
		let [w, h, sz, margin, n, neach] = [fen.w, fen.h, fen.sz, fen.n, fen.neach] = [800, 800, 20, 49, 7];
		fen.points = lacunaGeneratePointsMargin(w, h, margin, n, neach, sz, .6); //console.log(jsCopy(points[0]));
		table.plorder = jsCopy(table.playerNames);
		table.turn = jsCopy(table.playerNames);
		return fen;
	}

	function stats(table) { }

	function present(table) {
		let dTable = presentStandardRoundTable(table);
		let fen = table.fen;
		let [w, h, sz, n, neach] = [fen.w, fen.h, fen.sz, fen.n, fen.neach];
		let padding = 50;
		mStyle(dTable, { position:'relative',padding, wmin: w+2*padding, hmin: h+2*padding });
		let dParent = DA.dParent = mDom(dTable, { w, h, position: 'absolute', left: 2*padding, top: 2*padding }, { id: 'dCanvas' });
		Items = drawPoints(dParent, fen.points); //console.log(Items)
		DA.meeples = [];
	
		// placeCircles1(dTable, 30)

		//let canvas = mCanvas(dTable,{w:650,h:500,bg:'#00000020'}); //mDom(dTable,{w:700,h:500},{tag:'canvas'});
		//placeCircles(canvas,70);


		return [];
	}

	async function activate(table, items) {
		await instructionStandard(table, 'may pick your initial cards'); //browser tab and instruction if any
		for (const item of items) {
			let d = iDiv(item);
			d.onclick = wsOnclickCard;
		}
	}
	return { setup, present, stats, activate };
}



