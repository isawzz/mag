
async function onclickRecipe(ev){
	hToggleClassMenu(ev); mClear('dTable');
	let name=ev.target.innerHTML; console.log(name);
	let key = normalizeString(name); console.log(key);
	let recipe = M.recipes[key]; console.log(recipe);	
	let dTable = mBy('dTable'); mStyle('dTable',{padding:10, display:'flex',wrap:'true',acontent:'start',gap:10});



}
