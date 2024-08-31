
async function lacunaGameover() {
	showMessage('Game over');
	console.log('Game over');

	//for each point remaining on the board, calculate closest meeple
	let [fen,players] = [T.fen, T.players];
	
	for(const p of fen.points) {
		let closestMeeple = findClosestMeeple(p);
		if(closestMeeple) {
			console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
			let owner = closestMeeple.owner;
			players[owner].flowers[p.color] += 1;
			//draw a line between meeple and point
			let d=mBy(p.id);
			console.log('d',d);
			d.classList.add('pulseFastInfinite');
			mBy(p.id).innerHTML = owner[0].toUpperCase();

			//drawInteractiveLine(p, closestMeeple);
		}
		//break;
	}


	for(const plname of T.playerNames) {
		let pl = T.players[plname];
		for(const f in pl.flowers) pl.score += pl.flowers[f];
	}
	let table = T;
  table.winners = getPlayersWithMaxScore(table);
  table.status = 'over';
  table.turn = [];
  let id = table.id;
  let name = getUname();
  let step = table.step;
  let o = { id, name, step, table };
  //let res = await mPostRoute('table', o); //console.log(res);

}




