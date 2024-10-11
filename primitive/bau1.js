
function mLayoutLeftMain(container,scroll=true) {
  mStyle(container, { display: 'grid', gridCols: 'auto 1fr', h: '100%' });
  let d1 = mDom(container,{transition:'all .5s ease',wmin:0,w:0},{html:getMenuSymbol()});
  let d2 = mDom(container); 
	if (scroll) mStyle(d2, { overflow: 'scroll' });
  return [d1, d2];
}
function mLayoutTopTable(container,scroll=true) {
  mStyle(container, { display: 'grid', gridRows: 'auto 1fr', h: '100%' });
  let d1 = mDom(container);
  let d2 = mDom(container); 
  if (scroll) mStyle(d2, { overflow: 'scroll' });
  return [d1, d2];
}
function mLayoutTopLeftTable(container,scroll=true) {
  mStyle(container, { display: 'grid', gridRows: 'auto 1fr', h: '100%' });
  let d1 = mDom(container);
  let drest = mDom(container,{ display: 'grid', gridCols: 'auto 1fr', h: '100%', w:'100%' }); 
	let d2 = mDom(drest);
	let d3 = mDom(drest);
  if (scroll) mStyle(d3, { overflow: 'scroll' });
  return [d1, d2, d3];
}


