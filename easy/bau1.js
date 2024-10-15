
function mHomeLogo(d,key,handler){
	let ui=mKey(key,d,{fz:30,cursor:'pointer'},{onclick:handler});
	//ui.onclick=handler;
	return ui;
}
function mKey(imgKey, d, styles = {}, opts = {}) {
  let o = lookup(M.superdi, [imgKey]);
  let src;
  if (nundef(o) && imgKey.includes('.')) src = imgKey;
  else if (isdef(o) && isdef(opts.prefer)) src = valf(o[opts.prefer], o.img);
  else if (isdef(o)) src = valf(o.img, o.photo)
  if (nundef(src)) src = rChoose(M.allImages).path;
  let [w, h] = mSizeSuccession(styles, 40);
  addKeys({ w, h }, styles)
	addKeys({ tag: 'img', src }, opts)
  let img = mDom(d, styles, opts);
  return img;
}
function mLink(d,text,handler,kennzahl=0){
	let ui=mDom(d, {className:'a',fg:colorDark(M.appSettings.bg,90),maleft:12,deco:'none',rounding:10,hpadding:10,vpadding:4}, {tag:'a', html:text, href:'#', onclick:handler, kennzahl});

	return ui;
}
async function onclickDay(ev){
	console.log('day!',ev.target.getAttribute('kennzahl'));
	//
}
async function onclickHome(ev){
	console.log('home!')
}
