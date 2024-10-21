
function mLinkToggle(d, text, handler, init, kennzahl) {
	if (nundef(kennzahl)) kennzahl = getUID();
	let ui = mDom(d, { className: 'a', maleft: 12, deco: 'none', rounding: 10, hpadding: 10, vpadding: 4 }, { tag: 'a', html: text, href: '#', onclick: handler, kennzahl, val: init });

	return ui;
}
async function onclickBinomial(ev) {
	hToggleClassMenu(ev); mClear('dTable');

	let dTable = mBy('dTable'); mStyle('dTable',{padding:10, display:'flex',wrap:'true',acontent:'start',gap:10});

	let d1 = mDom(dTable, { display:'flex', dir: 'column', padding: 10, gap: 10, className:'input' });
	mDom(d1, {}, { html: 'Calculate binomialPdf:' })
	let inputs = ['n', 'p', 'k'];
	for (const name of inputs) {
		mInput(d1, { hpadding: 10, vpadding: 2 }, `inp_${name}`, `<Enter ${name}>`, 'input', 0, '', true, 'number');
	}
	mDom(d1, { hpadding: 10, vpadding: 2, className: 'input' }, { tag:'button', id: `b_pdf`, html: `GO!`, onclick: onclickBinomialPdf });
	mDom(d1, {}, { html: 'Result:' })
	mDom(d1, { hpadding: 10, vpadding: 2, className: 'input' }, { id: `result_pdf`, html:'&nbsp;'});

	let d2 = mDom(dTable, { display:'flex', dir: 'column', padding: 10, gap: 10, className:'input' });
	mDom(d2, {}, { html: 'Calculate binomialCdf:' })
	inputs = ['n', 'p', 'from', 'to'];
	for (const name of inputs) {
		mInput(d2, { hpadding: 10, vpadding: 2 }, `inp_c${name}`, `<Enter ${name}>`, 'input', 0, '', true, 'number');
	}
	mDom(d2, { hpadding: 10, vpadding: 2, className: 'input' }, { tag:'button', id: `b_cdf`, html: `GO!`, onclick: onclickBinomialCdf });
	mDom(d2, {}, { html: 'Result:' })
	mDom(d2, { hpadding: 10, vpadding: 2, className: 'input' }, { id: `result_cdf`, html:'&nbsp;'});

	let d3 = mDom(dTable, { display:'flex', dir: 'column', padding: 10, gap: 10, className:'input' });
	mDom(d3, {}, { html: 'binomial Erwartungswert:' })
	inputs = ['n', 'p'];
	for (const name of inputs) {
		mInput(d3, { hpadding: 10, vpadding: 2 }, `inp_mu${name}`, `<Enter ${name}>`, 'input', 0, '', true, 'number');
	}
	mDom(d3, { hpadding: 10, vpadding: 2, className: 'input' }, { tag:'button', id: `b_mu`, html: `GO!`, onclick: onclickBinomialMu });
	mDom(d3, {}, { html: 'Erwartungswert:' })
	mDom(d3, { hpadding: 10, vpadding: 2, className: 'input' }, { id: `result_mu`, html:'&nbsp;'});

	let d4 = mDom(dTable, { display:'flex', dir: 'column', padding: 10, gap: 10, className:'input' });
	mDom(d4, {}, { html: 'binomial Varianz / Standardabweichung:' })
	inputs = ['n', 'p'];
	for (const name of inputs) {
		mInput(d4, { hpadding: 10, vpadding: 2 }, `inp_v${name}`, `<Enter ${name}>`, 'input', 0, '', true, 'number');
	}
	mDom(d4, { hpadding: 10, vpadding: 2, className: 'input' }, { tag:'button', id: `b_v`, html: `GO!`, onclick: onclickBinomialVar});
	mDom(d4, {}, { html: 'Varianz:' })
	mDom(d4, { hpadding: 10, vpadding: 2, className: 'input' }, { id: `result_var`, html:'&nbsp;'});
	mDom(d4, {}, { html: 'Standardabweichung:' })
	mDom(d4, { hpadding: 10, vpadding: 2, className: 'input' }, { id: `result_stdev`, html:'&nbsp;'});

	let d5 = mDom(dTable, { display:'flex', dir: 'column', padding: 10, gap: 10, className:'input' });
	mDom(d5, {}, { html: 'Min trials for success with probability x:' })
	inputs = ['x', 'p'];
	for (const name of inputs) {
		mInput(d5, { hpadding: 10, vpadding: 2 }, `inp_mt${name}`, `<Enter ${name}>`, 'input', 0, '', true, 'number');
	}
	mDom(d5, { hpadding: 10, vpadding: 2, className: 'input' }, { tag:'button', id: `b_mt`, html: `GO!`, onclick: onclickBinomialMinTrials});
	mDom(d5, {}, { html: 'Result:' })
	mDom(d5, { hpadding: 10, vpadding: 2, className: 'input' }, { id: `result_mt`, html:'&nbsp;'});
}
async function onclickBinomialPdf(ev) {
	let n = +mBy('inp_n').value;
	let p = +mBy('inp_p').value;
	let k = +mBy('inp_k').value;
	let res = binomialPdf(n, p, k);
	mBy('result_pdf').innerHTML = res;
}
async function onclickBinomialCdf(ev) {
	let n = +mBy('inp_cn').value;
	let p = +mBy('inp_cp').value;
	let lb = +mBy('inp_cfrom').value;
	let ub = +mBy('inp_cto').value;
	let res = binomialCdf(n, p, lb, ub);
	mBy('result_cdf').innerHTML = res;
}
async function onclickBinomialMinTrials(ev) {
	let x = +mBy('inp_mtx').value;
	let p = +mBy('inp_mtp').value;
	let res = minTrialsForSuccess(x, p);
	mBy('result_mt').innerHTML = res;
}	
async function onclickBinomialMu(ev) {
	let n = +mBy('inp_mun').value;
	let p = +mBy('inp_mup').value;
	let res = n*p;
	mBy('result_mu').innerHTML = res;
}
async function onclickBinomialVar(ev) {
	let n = +mBy('inp_vn').value;
	let p = +mBy('inp_vp').value;
	let v = n*p*(1-p);
	mBy('result_var').innerHTML = v;
	mBy('result_stdev').innerHTML = Math.sqrt(v);
}
async function onclickCalc(ev) {
	let names = hPrepUi(ev, ` 'dSide dTable' `, 'auto 1fr', '1fr', 'classic_rose');
	mShadeLight(names)
	let dSide = mBy('dSide'); mStyle(dSide, { padding: 10, wbox: true });

	let dMenu = mDom('dSide', { display: 'flex', dir: 'column' }); //side menu

	let x = mLinkMenu(dMenu, 'Binomial', onclickBinomial, 'side');
	x = mLinkMenu(dMenu, 'Normal', onclickNormal, 'side');
	// mLinkMenu(dMenu, 'Binomial', onclickBinomial, 'side');
	// mLinkMenu(dMenu, 'Binomial', onclickBinomial, 'side');

	x.click();

}
async function onclickDay(ev) {
	let names = hPrepUi(ev, ` 'dVormittag'  'dNachmittag' `, '1fr', '1fr 1fr', 'dark_powder_blue');
	mShade(names)
}
async function onclickExample(ev) {
	let names = hPrepUi(ev, ` 'dSide dTable' `, 'auto 1fr', '1fr', 'light_green');
	mShadeLight(names)
	let dSide = mBy('dSide');
	mStyle(dSide, { padding: 10, wbox: true })
	mDom(dSide, {}, { html: 'TODO:' });
	mDom('dTable', {}, { html: 'dTable' });

	//on the sidebar, list steps such as 'Nil github', 'get up v', 'get dressed', 'cleanup f', 'LG github', 'email check', 'stretching', 'plan', 'tune violin', 'schradiek'
	let list = ['Nil github', 'get up v', 'get dressed', 'cleanup f', 'LG github', 'email check', 'stretching', 'plan', 'tune violin', 'schradiek'];
	for (const item of list) {
		mDom(dSide, { margin: 0 }, { tag: 'button', html: item, onclick: onclickExampleItem });
		mLinebreak(dSide, 3);
	}


}
async function onclickExampleItem(ev) {
	mClear('dTable');
	mDom('dTable', {}, { html: ev.target.innerHTML })
}
async function onclickGame(ev) {
	let names = hPrepUi(ev, ` 'dSide dTable' `, 'auto 1fr', '1fr', 'orange');
	mShadeLight(names)
}
async function onclickHome(ev) {
	let names = hPrepUi(ev, ` 'dSide dTable' `, 'auto 1fr', '1fr', 'skyblue');
	mShadeLight(names)
	mRemoveClass(ev.target, 'active'); //just set other top menu buttons inactive!
}
async function onclickZone(ev) {
	let names = hPrepUi(ev, ` 'dSide dTable' `, 'auto 1fr', '1fr', 'indigo');
	mShadeLight(names)
}
