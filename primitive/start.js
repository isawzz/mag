onload = start;

async function start() { await test3(); }

async function test3() {
	loadColors(); console.log(M.colorNames);
	oceanLayout('dPage', 'skyblue');

	let dTable = mBy('dTable0');
	let [w,h]=[25,25];
	list = sortByMultipleProperties(M.colorList,'hue','sat','lightness');

	let cont=mDom(dTable, {display:'flex',wrap:true}, {});
	for(const o of list){
		mDom(cont, {bg:o.hex,fg:'contrast',padding:10,margin:3}, {tag:'div', html:o.name});
	}
}
async function testMist(){
	for(const b in M.dicolor){
		mDom(dTable,{},{tag:'h1',html:b});
		let cont=mDom(dTable, {display:'flex',wrap:true}, {});
		let keys = Object.keys(M.dicolor[b]); console.log(keys);
		let list = keys.map(x=>M.colorByName[x]); console.log(list[0])

		list = sortByMultipleProperties(list,'lightness','hue');
		for(const o of list){
			//console.log(o); return;
			//let color = M.dicolor[b][c];
			mDom(cont, {bg:o.hex,fg:'contrast',padding:10,margin:3}, {tag:'div', html:o.name});
		}
	}
}
async function test2() {
	loadColors();
	console.log(M.colorNames);
}
async function test1() {
	M.dicolor = await mGetYaml(`../assets/dicolor.yaml`);
	[M.colorList, M.colorByHex, M.colorByName] = getListAndDictsForDicolors();
	oceanLayout('dPage', 'skyblue');
	oceanLayout('dTable0', 'kobi', 1);
	oceanLayout('dTable1', 'deeppink', 2);//await prelims();
}
async function test0() {
	let d0 = mBy('dPage');
	mStyle(d0, { bg: 'skyblue' })
	let divNames = 'dTop dSidebar dTable'.split(' '); console.log('divNames', divNames);
	let palette = paletteTransWhiteBlack(divNames.length + 2).slice(1); //console.log(palette);
	for (const id of divNames) {
		let d = mBy(id);
		mStyle(d, { bg: palette.pop(), fg: 'contrast', family: 'opensans', wbox: true, padding: 10 }, { html: id });
	}
}

//#region TEMP
async function machConstsZuJsDicts_TEMP() {
	function convertColorsToObjAndSave(colors, fname) {
		const colorObject = {};

		// Iterate over the array to process each color and comment
		colors.forEach(color => {
			if (!isEmptyOrWhiteSpace(color)) {
				const hexCode = color.split(',')[0].trim(); // Extract the hex code
				console.log(color, typeof color)
				const comment = color.split('//')[1].trim(); // Extract the color name from the comment

				// Convert comment (color name) to lowercase and replace spaces with underscores
				const formattedKey = comment.toLowerCase().replace(/\s+/g, '_');

				// Add to the object
				colorObject[formattedKey] = hexCode;
			}
		});

		// Generate JS code string without quoted keys
		const objectAsCode = `const ${fname} = ${convertObjectToCode(colorObject)};`;

		// Create a blob with the JS code as text
		const blob = new Blob([objectAsCode], { type: 'text/javascript' });

		// Create a download link for the file
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = fname + '.js'; // File name

		// Trigger the download
		document.body.appendChild(link);
		link.click();

		// Clean up by removing the link
		document.body.removeChild(link);
	}
	// Helper function to convert an object to a string with unquoted keys
	function convertObjectToCode(obj) {
		const entries = Object.entries(obj)
			.map(([key, value]) => `${key}: ${value}`)
			.join(',\n');
		return `{\n${entries}\n}`;
	}
	let list = modernColors.split('\n'); console.log('list', list);

	convertColorsToObjAndSave(list, 'modernColors');
	convertColorsToObjAndSave(childrenRoomColors.split('\n'), 'childrenRoomColors');
	convertColorsToObjAndSave(vibrantColors.split('\n'), 'vibrantColors');
	convertColorsToObjAndSave(deepRichColors.split('\n'), 'deepRichColors');

}
async function machDieColorsAlsJs_TEMP() {
	M.dicolor = await mGetYaml(`../assets/dicolor.yaml`);

	// // Example usage:
	// const exampleObject = {
	// 	name: "John",
	// 	age: 30,
	// 	hobbies: ["coding", "reading"]
	// };

	// Call the function to save the object as code
	saveObjectAsCode(M.dicolor);
	// downloadAsJson(M.dicolor,'dicolor')
}
//#endregion

async function preprelims() {
	ColorThiefObject = new ColorThief();//console.log(ColorThiefObject);
	let t1 = performance.now();
	Serverdata = await mGetRoute('session'); //session ist: users,config,events
	let t2 = performance.now();
	await loadAssets();
	let textures = await mGetFiles(`../assets/textures`);
	M.textures = textures.map(x => `../assets/textures/${x}`); //console.log('textures',M.textures)
}
async function prelims() {
	await preprelims();
	let t4 = performance.now();
	sockInit();
	let t5 = performance.now();
	window.onkeydown = keyDownHandler;
	window.onkeyup = keyUpHandler;
	DA.funcs = { setgame: setgame(), lacuna: lacuna(), fishgame: fishgame(), button96: button96() }; //implemented games!
	for (const gname in Serverdata.config.games) {
		if (isdef(DA.funcs[gname])) continue;
		DA.funcs[gname] = defaultGameFunc();
	}

	let html = `
    <div style="position:fixed;width:100%;z-index:20000">
      <div id="dNav" class="nav p10"></div>
      <div id="dMessage" style='height:0px;padding-left:10px' class="transh"></div>
    </div>
    <div id="dBuffer" style="height:32px;width:100%" class="nav"></div>
    <div id="dExtra" class="p10hide nav"></div>
    <div id="dTitle"></div>
    <div id="dPage" style="display:grid;grid-template-columns: auto 1fr auto;">
      <div id="dLeft" class="mh100 over0 translow nav">
      </div>
      <div id="dMain"></div>
      <div id="dRight" class="mh100 over0 translow"></div>
    </div>
    <d id="dBottom"></d>
    
    `;
	document.body.innerHTML = html;
	UI.dTitle = mBy('dTitle');
	UI.commands = {};
	UI.nav = showNavbar(); //console.log(UI.nav)
	staticTitle();
	let cmd = UI.nav.commands.user = mCommand(UI.nav.elem, 'user'); //console.log(cmd)
	iDiv(cmd).classList.add('activeLink');
	await switchToUser(localStorage.getItem('username'), localStorage.getItem('menu'));
}

