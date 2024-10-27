



async function onclickRecipeType(ev) {
	hToggleClassMenu(ev); mClear('dTable');
	let name = ev.target.innerHTML; console.log(name);
	let key = normalizeString(name); console.log(key);
	let dTable = mBy('dTable'); mStyle('dTable', { padding: 10, display: 'flex', wrap: 'true', acontent: 'start', gap: 10 });
	let list = M.recipes.recipes[key]; console.log(list);
	for (const k of list) {
		if (nundef(M.recipes[k])) continue;
		let o = M.recipes[k]; console.log(o);
		let path = `../easy/recipes/${k}/${o.image}`;
		let d = mDom(dTable, { bg: 'orange', fg: 'contrast', padding: 10, margin: 3 }, { tag: 'div', html: `${fromNormalized(k)}<br>` });
		mDom(d, { padding: 10, margin: 3, h: 200 }, { tag: 'img', src: path });
		d.onclick = onclickRecipe;

	}

	//soll jedes recipe ein file haben?
	//oder soll es ein yaml file sein?
	//soll snacks dann nachher eine liste von files haben?


}
async function onclickRecipe(ev) {
	//console.log(ev);
	let name = ev.target.innerHTML; console.log(name);
	let key = normalizeString(name); console.log(key);
	let recipe = M.recipes[key]; console.log(recipe);
	let dTable = mBy('dTable'); mClear('dTable');
	mStyle('dTable', { padding: 10, display: 'flex', wrap: 'true', acontent: 'start', gap: 10 });
	for (const t of recipe.text) {
		if (t.includes('.jpg') || t.includes('.png')) {
			let d = mDom(dTable, { bg: 'orange', fg: 'contrast', padding: 10, margin: 3 }, { tag: 'img', src: `../easy/recipes/name/${t}` });
			d.onclick = onclickImage;
		} else {
			let d = mDom(dTable, { bg: 'orange', fg: 'contrast', padding: 10, margin: 3 }, { tag: 'div', html: `${t}` });
			d.onclick = onclickIngredient;
		}
	}
	let d = mDom(dTable, { bg: 'orange', fg: 'contrast', padding: 10, margin: 3 }, { tag: 'div', html: `${k}` });
	d.onclick = onclickIngredient;
}

