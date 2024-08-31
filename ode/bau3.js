
async function showTable(id) {
	let me = getUname(); console.log('_________showTable', id)
	let table = await mGetRoute('table', { id });  //console.log('table',table)
	if (!table) { showMessage('table deleted!'); return await showTables('showTable'); }

	console.log('lengthy',DA.LengthyProcessRunning);
	DA.Interrupt = true;
	while (DA.LengthyProcessRunning === true){
		await mSleep(100);
	} 
	DA.Interrupt = false;
	console.log('____________showTable', table);

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










