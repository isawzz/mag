
function crazu() {
	function setup(table) {
		let fen = {};
		for (const name in table.players) {
			let pl = table.players[name];
			pl.score = 0;
			pl.positions = [];
			pl.flowers = [];
		}
		fen.wbase=100;
		fen.hbase=70;
		let colorlist = siebenVonJederFarbe();
		let o = rPositions(fen.wbase,fen.hbase,colorlist.length);
		let flist=[];
		for(let i=0;i<colorlist.length;i++){
			flist.push({color:colorlist[i],x:o.list[i].x,y:o.list[i].y,r:o.radius});
		}
		fen.flowers = flist; //siebenVonJederFarbe(fen.wbase,fen.hbase);
		table.plorder = jsCopy(table.playerNames);
		table.turn = jsCopy(table.playerNames);
		return fen;
	}

	function stats(table) { }

	function present(table) {
		let dTable = presentStandardRoundTable(table);
		let fen = table.fen;
		mStyle(dTable, { padding: 50, wmin: 800, hmin: 600 });

		placeCircles1(dTable, 30)

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

		drawCircle(ctx, x, y, radius);
	}
}
function drawCircle(ctx, x, y, radius) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fillStyle = 'blue';
	ctx.fill();
	ctx.stroke();
}


