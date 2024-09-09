
async function lacunaMoveComplete(idlist) {
	let [fen, players, me, table] = [T.fen, T.players, T.players[getUname()], T]
	B.endPoints.map(x => lacunaUnselectable(x));
	showMessage("________Move completed, removing", idlist);
	assertion(idlist.length == 2 || idlist.length == 0, `WTF3!!! ${idlist.length}`);
	if (idlist.length == 2) {
		fen.points = fen.points.filter(x => x.id != idlist[0] && x.id != idlist[1]);
		let color = B.diPoints[idlist[0]].bg; //console.log('color', color);
		let flower = lacunaColorName(color); //console.log('flower', flower);
		let n = lookup(me, ['flowers', color]);
		lookupSetOverride(me, ['flowers', color], n ? n + 2 : 2);
	}

	//table.turn=[arrNext(table.plorder,getUname())]; //console.log('turn changed to',table.turn);
	let nextPlayer = findPlayerWithMeeplesLeft(getUname()); console.log('nextPlayer', nextPlayer);
	if (nextPlayer) {
		table.turn = [nextPlayer];
		let o = { id: table.id, name: me, step: table.step + 1, table };
		let res = await mPostRoute('table', o); //console.log(res);
	} else await lacunaGameover();


}
