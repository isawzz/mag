
async function onclickNormal(ev) {
	hToggleClassMenu(ev); mClear('dTable');

	let dTable = mBy('dTable'); mStyle('dTable',{padding:10, display:'flex',wrap:'true',acontent:'start',gap:10});

	let d1 = mDom(dTable, { display:'flex', dir: 'column', padding: 10, gap: 10, className:'input' });
	mDom(d1, {}, { html: 'Calculate normalPdf:' })
	let inputs = ['x', 'mean', 'stdev'];
	for (const name of inputs) {
		mInput(d1, { hpadding: 10, vpadding: 2 }, `inp_${name}`, `<Enter ${name}>`, 'input', 0, '', true, 'number');
	}
	mDom(d1, { hpadding: 10, vpadding: 2, className: 'input' }, { tag:'button', id: `b_pdf`, html: `GO!`, onclick: onclickNormalPdf });
	mDom(d1, {}, { html: 'Result:' })
	mDom(d1, { hpadding: 10, vpadding: 2, className: 'input' }, { id: `result_pdf`, html:'&nbsp;'});

	let d2 = mDom(dTable, { display:'flex', dir: 'column', padding: 10, gap: 10, className:'input' });
	mDom(d2, {}, { html: 'Calculate normalCdf:' })
	inputs = ['x', 'mean', 'from', 'to'];
	for (const name of inputs) {
		mInput(d2, { hpadding: 10, vpadding: 2 }, `inp_c${name}`, `<Enter ${name}>`, 'input', 0, '', true, 'number');
	}
	mDom(d2, { hpadding: 10, vpadding: 2, className: 'input' }, { tag:'button', id: `b_cdf`, html: `GO!`, onclick: onclickNormalCdf });
	mDom(d2, {}, { html: 'Result:' })
	mDom(d2, { hpadding: 10, vpadding: 2, className: 'input' }, { id: `result_cdf`, html:'&nbsp;'});

	let d3 = mDom(dTable, { display:'flex', dir: 'column', padding: 10, gap: 10, className:'input' });
	mDom(d3, {}, { html: 'normal Erwartungswert:' })
	inputs = ['n', 'p'];
	for (const name of inputs) {
		mInput(d3, { hpadding: 10, vpadding: 2 }, `inp_mu${name}`, `<Enter ${name}>`, 'input', 0, '', true, 'number');
	}
	mDom(d3, { hpadding: 10, vpadding: 2, className: 'input' }, { tag:'button', id: `b_mu`, html: `GO!`, onclick: onclickNormalMu });
	mDom(d3, {}, { html: 'Erwartungswert:' })
	mDom(d3, { hpadding: 10, vpadding: 2, className: 'input' }, { id: `result_mu`, html:'&nbsp;'});

	let d4 = mDom(dTable, { display:'flex', dir: 'column', padding: 10, gap: 10, className:'input' });
	mDom(d4, {}, { html: 'normal Varianz / Standardabweichung:' })
	inputs = ['n', 'p'];
	for (const name of inputs) {
		mInput(d4, { hpadding: 10, vpadding: 2 }, `inp_v${name}`, `<Enter ${name}>`, 'input', 0, '', true, 'number');
	}
	mDom(d4, { hpadding: 10, vpadding: 2, className: 'input' }, { tag:'button', id: `b_v`, html: `GO!`, onclick: onclickNormalVar});
	mDom(d4, {}, { html: 'Varianz:' })
	mDom(d4, { hpadding: 10, vpadding: 2, className: 'input' }, { id: `result_var`, html:'&nbsp;'});
	mDom(d4, {}, { html: 'Standardabweichung:' })
	mDom(d4, { hpadding: 10, vpadding: 2, className: 'input' }, { id: `result_stdev`, html:'&nbsp;'});

}
async function onclickNormalPdf(ev) {
	let x = +mBy('inp_x').value;
	let mean = +mBy('inp_mean').value;
	let stdev = +mBy('inp_stdev').value;
	let res = normalPdf(x, mean, stdev);
	mBy('result_pdf').innerHTML = res;
}
