
function lacuna() {
	function setup(table) {
		let fen = {};
		for (const name in table.players) {
			let pl = table.players[name];
			pl.score = 0;
			pl.positions = [];
			pl.flowers = [];
		}
		let [w, h, sz, n, neach] = [fen.w, fen.h, fen.sz, fen.n, fen.neach] = [900, 700, 20, table.options.numPoints, table.options.numPoints / table.options.numColors];
		console.log(n, neach);
		fen.points = lacunaGeneratePoints(w, h, n, neach, sz, .6, true); //console.log(jsCopy(points[0]));
		table.plorder = jsCopy(table.playerNames);
		table.turn = jsCopy(table.playerNames);
		return fen;
	}

	function stats(table) { }

	function present(table) {
		let dTable = presentStandardRoundTable(table);
		let fen = table.fen;
		let [w, h, sz, n, neach, points] = [fen.w, fen.h, fen.sz, fen.n, fen.neach, jsCopy(fen.points)];
		let padding = 20;
		mStyle(dTable, { position: 'relative', padding, wmin: w + 2 * padding, hmin: h + 2 * padding });
		let dParent = DA.dParent = mDom(dTable, { w, h, position: 'absolute', left: 2 * padding, top: 2 * padding }, { id: 'dCanvas' });
		DA.points = points;
		DA.sz = sz;
		Items = drawPoints(dParent, points); //console.log(Items)
		DA.meeples = [];

		lacunaStartMove();

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



