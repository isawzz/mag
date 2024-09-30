
function mPage(styles={},opts={}) { 
	let d1 = mDom(document.body, { hline: 0, margin: 0 }, { html: '&nbsp;' }); 
	addKeys({w:'100vw',h:'100vh',hline:'normal'},styles);
	return mDom(d1, styles, opts);
}
