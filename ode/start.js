onload = start;

async function start() { TESTING = true; await prelims(); await test176_lacunaTest(); } //async function start() { TESTING = true; await prelims(); }async function start() { TESTING = true; await test155(); }

async function test176_lacunaTest() {
  let [w, h, sz, margin, padding, n, neach] = [600, 600, 20, 20, 20, 25, 5];
  DA.sz = sz;
  let points = ['0_0','90_90','0_90','90_0']; // 
  points = lacunaGenerateFenPoints(n, neach, w-sz, h-sz); console.log(jsCopy(points));

  let d = clearDiv();
  let dParent = DA.dParent = mDom(d, { w, h, margin, padding, position:'relative', bg: '#eee' }, { id: 'dCanvas' });
  for(const p of points){
    let p1 = pointFromFenRaw(p); 
    p1 = pointAddMargin(p1,padding);
    p1.sz=sz;
    p1 = drawPoint(dParent, p1);
    console.log(p1);
  };
}
async function test175_lacunaTest() {
  let [w, h, sz, margin, n, neach] = [600, 600, 20, 30, 100, 5];
  DA.sz = sz;
  let points = lacunaGenerateFenPoints(n, neach, w-2*margin-sz/2, h-2*margin-sz/2); console.log(jsCopy(points));

  let d = clearDiv();
  let dParent = DA.dParent = mDom(d, { w, h, bg: '#eee', round:true }, { id: 'dCanvas' });
  for(const p of points){
    let p1 = pointFromFenRaw(p); 
    p1 = pointAddMargin(p1,margin);
    p1 = drawPoint(dParent, p1);
    console.log(p1);
  };
}
async function test174_lacunaTest() {
  let [w, h, sz, margin, n, neach] = [800, 800, 30, 30, 70, 7];
  DA.sz = sz;
  let points = DA.points = lacunaGeneratePointsMargin(w, h, margin, n, neach, sz, .6); //console.log(jsCopy(points[0]));
  let d = clearDiv();
  let dParent = DA.dParent = mDom(d, { w, h, position: 'absolute', left: 100, top: 50, bg: '#eee' }, { id: 'dCanvas' });
  Items = lacunaDrawPoints(dParent, points); //console.log(Items)
  DA.meeples = [];

  let result = findIsolatedPairs(points, sz / 2); //sz*1.2); console.log(result);
  let pairs = result.isolatedPairs;

  let pair = pairs[0]; console.log(pair)

  //drawInteractiveLine(pair[0],pair[1]);

  let lines = []; DA.lines = lines;
  pairs.map(x => lines.push(drawInteractiveLine(x[0], x[1], rColor(),1)));
  document.onmousemove = onMouseMoveLine;
}
async function test173_lacuna() {
  // DA.gamename = 'lacuna';
  // await onclickStartGame();
  //localStorage.clear();
  // await showGames();
  // let players={};
  // for(const name of [getUname(),'felix','amanda']){
  //   players[name]=jsCopy(Serverdata.users[name]);
  //   players.playmode = 'human';
  // }
  // let options = {gamemode:'multi',numPoints:70,numColors:10,numMeeples:9};
  // let gamename = 'lacuna';
  // await startGame(gamename, players, options);
  //await startGame('lacuna',{mimi:''});
}
async function test172_lacunaTest() {
  let [w, h, sz, margin, n, neach] = [800, 800, 30, 30, 70, 7];
  DA.sz = sz;
  let points = DA.points = lacunaGeneratePointsMargin(w, h, margin, n, neach, sz, .6); //console.log(jsCopy(points[0]));
  let d = clearDiv();
  let dParent = DA.dParent = mDom(d, { w, h, position: 'absolute', left: margin, top: margin, bg: '#eee' }, { id: 'dCanvas' });
  Items = lacunaDrawPoints(dParent, points); //console.log(Items)
  DA.meeples = [];

  let result = findIsolatedPairs(points, sz / 2); //sz*1.2); console.log(result);
  let pairs = result.isolatedPairs;

  let pair = pairs[0]; console.log(pair)

  //drawInteractiveLine(pair[0],pair[1]);

  let lines = []; DA.lines = lines;
  pairs.map(x => lines.push(drawInteractiveLine(x[0], x[1], rColor(),1)));
  document.onmousemove = onMouseMoveLine;
}
async function test171_blank() {
  //how do I start a game?
}
async function test170_crazu() {
  //let d=clearFlex();
  //let canvas = mCanvas
  let colors = { "Red": "#E63946", "Green": "#06D6A0", "Blue": "#118AB2", "Cyan": "#0F4C75", "Magenta": "#D81159", "Yellow": "#FFD166", "Orange": "#F4A261", "Purple": "#9D4EDD", "Pink": "#FF80AB", "Brown": "#8D6E63", "Lime": "#A7FF83", "Indigo": "#3A0CA3", "Violet": "#B5838D", "Gold": "#F5C518", "Teal": "#008080" };


}
async function test162_asklist() {
  let [word, num] = ['insects', 200];
  let o = await mPostRoute('ask_list', { word, num });
  console.log(o);
  let d = clearFlex();
  showYaml(o, `list of ${num} ${pluralOf(word)}`, d);
}
async function test161_sortlist() {
  let x = await mGetYaml('../y/lists.yaml');
  for (const k in x) {
    let list = x[k].map(x => normalizeString(x));
    list = arrRemoveDuplicates(list)
    arrSort(list);
    x[k] = list;
  }
  let y = await mPostYaml(x, '../y/lists.yaml'); console.log(y)
}
async function test160_asklist() {
  let [word, num] = ['animal', 10];
  let res = await mPostRoute('ask_list', { word, num });
  console.log(res);
  return;
  let d = clearFlex();
  let prompt = 'list of 300 animals';
  let o = await askOpenaiListOf('animal', 300); console.log(o);
  //let o = await askOpenai(prompt);
  showYaml(o, prompt, d);
}
async function test159_askword() {
  let d = clearFlex();
  let w = 'python';
  let o = await askOpenaiKeyword(w, 'animal'); console.log(o);
  showYaml(o, w, d);
}
async function test159() {
  //let result = await mGather(null,{},{content:{word:'',category:''},type:'multi'});
  let result = { word: 'python', category: 'animal' };
  console.log(result);
  let prompt = pYamlDetails(result.word, result.category); //'list of 100 very different documentary subjects?';
  let answer = await askOpenaiYaml(prompt, 'yaml');
  console.log(typeof (answer), answer); //,o, typeof(o))
  if (answer.includes('```')) answer = stringBeforeLast(stringAfter(answer, '\n'), '\n');
  console.log(answer, typeof (answer));

  let o = jsyaml.load(answer); console.log('o', o, typeof o);


}
async function test158_ask() {
  let prompt = 'list of 100 very different documentary subjects?';
  let answer = await askOpenai(prompt);
  let d = clearFlex(); //return;
  mDom(d, {}, { tag: 'h1', html: prompt });
  mDom(d, {}, { tag: 'pre', html: answer });
}
async function test157_gpt() {
  let d = clearFlex(); //return;
  const prompt = 'list of 100 very different documentary subjects?';
  let answer = await mPostRoute('ask', { prompt });
  console.log(answer);
  let dTable = mDom(d, { bg: 'white', fg: 'black' });
  mDom(dTable, {}, { tag: 'h1', html: prompt });
  mDom(dTable, {}, { tag: 'pre', html: answer });
}
async function test156_wiki() {
  let d = clearFlex()
  const keyword = 'how far away is the sun from the earth?';
  try {
    const para = await askWiki(keyword);
    let dTable = mDom(d, { bg: 'white', fg: 'black' });
    mDom(d, {}, { tag: 'h1', html: para.title });
    mDom(d, {}, { html: para.extract });
    console.log(para, typeof para);
  } catch (error) {
    console.error('Error:', error);
  }
}
async function test155() { await prelims(); }

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
      <div id="dLeft" class="h100 over0 translow nav">
      </div>
      <div id="dMain"></div>
      <div id="dRight" class="h100 over0 translow"></div>
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



