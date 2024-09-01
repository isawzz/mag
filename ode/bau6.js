

async function showTable(id) {
	let me = getUname(); //console.log('_________showTable', id)
	let table = await mGetRoute('table', { id });  //console.log('table',table)
	if (!table) { showMessage('table deleted!'); return await showTables('showTable'); }

	//if (DA.autoSwitch && table.turn.length > 0 && !table.turn.includes(me)) {await switchToUser(table.turn[0]); return;}

	DA.Interrupt = true; //console.log('lengthy',DA.LengthyProcessRunning);
	while (DA.LengthyProcessRunning === true) { await mSleep(100); }
	DA.Interrupt = false;
	//console.log('____________showTable', table);

	let func = DA.funcs[table.game];
	T = table;
	clearMain(); mClassRemove('dExtra', 'p10hide');	

	showTitleGame(table);
	if (func.hasInstruction) prepInstruction(table);

	let items = func.present(table);
	func.stats(table);
	if (table.status == 'over') { showGameover(table, 'dTitle'); return; }
	assertion(table.status == 'started', `showTable status ERROR ${table.status}`);
	await updateTestButtonsLogin(table.playerNames);
	func.activate(table, items);
}









