
function clearDiv(styles = {}) {
	addKeys({padding:0,margin:0,position:'relative'},styles);
	let d0=document.body; 
	d0.innerHTML='';
	mStyle(d0,styles);
  return d0;
}
