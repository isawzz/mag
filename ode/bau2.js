
function drawPointType(dParent, p, addLabel = true) {
  let html = isdef(p.owner) && addLabel ? p.owner[0].toUpperCase() : '';
  addKeys({ sz: 20, bg: rColor(), id:getUID() }, p);
  let d1 = p.div = mDom(dParent, { round: true, left: p.x, top: p.y, w: p.sz, h: p.sz, position: 'absolute', bg: p.bg, align: 'center', fg: 'contrast' }, { html, id: p.id });
  d1.style.cursor = 'default';
  if (isdef(p.border)) mStyle(d1, { outline: `solid ${p.border} 4px` });
  let rect = getRect(d1);
  p.cx = p.x + p.sz / 2; p.cy = p.y + p.sz / 2;
  p.xPage = rect.x; p.yPage = rect.y;
  p.cxPage = rect.x + p.sz / 2; p.cyPage = rect.y + p.sz / 2;
	return p;
}
function generateStar(dParent,x,y){
	let html = `<svg width="100" height="100">
			<polygon points="50 0 86.6 50 100 0 75 35 50 70.7 25 35 0 0" fill="yellow" />
		</svg>`;
	let d=mDom(dParent,{w:100,h:100,pos:'absolute',left:x,top:y},{html});
	return html;
}



