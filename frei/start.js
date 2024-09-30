onload = start;

async function start() { await test2(); } 

async function test2() {
	let dPage = mPage({bg:'lightblue'});
	mDom(dPage,{},{html:'hallo'}); return;
  let [w, h, margin, padding, border, sz] = [500, 500, 20, 30, 8, 50]; //25;
  let dParent = mDom(dPage, { w, h, bg: 'inherit', fg: 'contrast' },{html:'Hello!'}); //, { border: `${border}px solid #555`, wbox: true, position: 'relative', w, h, bg: '#242430', margin, padding }, { id: 'dCanvas' });
}
async function test1() {
  let d1 = mDom(document.body, { bg: 'red', hline: 0, margin: 0 }, { html: '&nbsp;' });
  let [w, h, margin, padding, border, sz] = [500, 500, 20, 30, 8, 50]; //25;
  let dParent = mDom(d1, { w, h, bg: 'inherit', fg: 'contrast' }); //, { border: `${border}px solid #555`, wbox: true, position: 'relative', w, h, bg: '#242430', margin, padding }, { id: 'dCanvas' });
  showStyles(dParent);
  let d = mDom(dParent, { w: sz, h: sz, margin }, { html: 'hallo' }); //default is bg=rgba(0,0,0,0) fg=rgb(0,0,0)
  showStyles(d);
}
async function test0(){
	await prelims();
}
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

