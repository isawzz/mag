async function lacunaSelectPointME(ev) {
	let [fen,players,pl]=[T.fen,T.players,T.players[getUname()]]
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
			await lacunaMoveCompletedME(B.selectedPoints);
		}
	} else {
		assertion(B.selectedPoints.length == 2, "WTF2!!!!!!!!!!!!!");
		await lacunaMoveCompletedME(B.selectedPoints);
	}
}
async function lacunaMoveCompletedME(idlist) {
	let [fen,players,me,table]=[T.fen,T.players,T.players[getUname()],T]
	B.endPoints.map(x => lacunaUnselectable(x));
	showMessage("________Move completed, removing", idlist);
	assertion(idlist.length == 2 || idlist.length == 0, `WTF3!!! ${idlist.length}`);
	if (idlist.length == 2) {
		// let p1 = B.diPoints[idlist[0]];
		// let p2 = B.diPoints[idlist[1]];
		// delete B.diPoints[p1.id];
		// delete B.diPoints[p2.id];
		// mRemove(p1.div);
		// mRemove(p2.div);
		// B.points = B.points.filter(x => x.id != p1.id && x.id != p2.id);
		// fen.points = fen.points.filter(x => x.id != p1.id && x.id != p2.id);
		fen.points = fen.points.filter(x => x.id != idlist[0] && x.id != idlist[1]);

		//console.log('add flowers to fen', p1,p2);
		let flower = lacunaColorName(B.diPoints[idlist[0]].bg);
		let n=lookup(me, ['flowers',flower]);
		lookupSetOverride(me, ['flowers',flower], n?n+2:2);
	}

	table.turn=[arrNext(table.plorder,getUname())]; console.log('turn changed to',table.turn);
	let o = { id:table.id, name:me, step:table.step+1, table };
	let res = await mPostRoute('table', o); console.log(res);


}
