
function allElementsFromPoint(x, y) {
  var element, elements = [];
  var old_visibility = [];
  while (true) {
    element = document.elementFromPoint(x, y);
    if (!element || element === document.documentElement) {
      break;
    }
    elements.push(element);
    old_visibility.push(element.style.visibility);
    element.style.visibility = 'hidden';
  }
  for (var k = 0; k < elements.length; k++) {
    elements[k].style.visibility = old_visibility[k];
  }
  elements.reverse();
  return elements;
}
function allIntegers(s) {
  return s.match(/\d+\.\d+|\d+\b|\d+(?=\w)/g).map(v => {
    return +v;
  });
}

function arrSort(arr, caseSensitive=true) {
	return arr.sort((a, b) => {
		// Convert both elements to strings for comparison
		const aStr = a.toString();
		const bStr = b.toString();

		// Use localeCompare to handle string comparison
		return aStr.localeCompare(bStr, undefined, { numeric: true,sensitivity: caseSensitive ? 'case' : 'base' });
	});
}
async function askWiki(query) {
	if (isEmpty(query)) return 'NO QUERY!';
	let response = await mGetRoute('wiki', { question: query });
	return response;
}
async function askHuggingFace(question) {
	//gratis: hugging_face
	if (isEmpty(question)) return 'NO QUESTION!';
	let response = await mGetRoute('fetch_answer', { question });
	return lookup(response, ['answer']) ?? 'ERROR';
}
async function askOpenai(prompt) {
	if (nundef(prompt)) prompt = 'list of 100 very different documentary subjects?';
	let answer = await mPostRoute('ask', { prompt });
	return answer;
}
async function askOpenaiKeyword(word, category = null) {
	if (!category) category = 'def';
	let res = await mPostRoute('ask_details', { word, category });
	return res;
	// if (nundef(word)) return; //prompt = 'list of 100 very different documentary subjects?';
	// //let prompt = pYamlDetails(word,category); =>app.js
	// let answer = await mPostRoute('ask', { prompt });
	// if (answer.includes('```')) answer = stringBeforeLast(stringAfter(answer,'\n'),'\n');
	// let o= jsyaml.load(answer);//console.log('o',o,typeof o);
	// return o;
}
async function askOpenaiListOf(word, num = 100) {
	let res = await mPostRoute('ask_list', { word, num });
	return res;
	// if (nundef(word)) return; //prompt = 'list of 100 very different documentary subjects?';
	// //let prompt = pYamlDetails(word,category); =>app.js
	// let answer = await mPostRoute('ask', { prompt });
	// if (answer.includes('```')) answer = stringBeforeLast(stringAfter(answer,'\n'),'\n');
	// let o= jsyaml.load(answer);//console.log('o',o,typeof o);
	// return o;
}
async function mPostYaml(o, path) {
	return await mPostRoute('postYaml', { o, path });
}
function normalizeString(s, sep = '_', keep = []) {
	s = s.toLowerCase().trim();
	let res = '';
	for (let i = 0; i < s.length; i++) { if (isAlphaNum(s[i]) || keep.includes(s[i])) res += s[i]; else if (last(res) != sep) res += sep; }
	return res;
}
function pListOf(what) { return 'list of 100 ' + what.toLowerCase(); }

function pYamlDetails(keyword, type, props) {
	if (nundef(props)) {
		switch (type) {
			case 'animal': props = 'class, color, food, habitat, lifespan, name, offsprings, reproduction, size, species, weight'; break;
			case 'location': props = 'population, size, longitude, latitude'; break;
			default: props = 'definition, synonyms, antonyms, german, spanish, french'; break;
		}
	}
	let p = `information about ${keyword}, formatted as yaml object with the following properties: `;
	p += props + '.';
	p += `property values should if possible contain numeric information in scientific (European) metrics.`
	return p;
}
function recFlatten(o) {
	if (isLiteral(o)) return o;
	else if (isList(o)) return o.map(x => recFlatten(x)).join(', ');
	else if (isDict(o)) {
		let valist = [];
		for (const k in o) { let val1 = recFlatten(o[k]); valist.push(`${k}: ${val1}`); }
		return valist.join(', ');
	}
}
function showYaml(o, title, dParent, styles = {}, opts = {}) {
	o = toFlatObject(o);
	//return showObject(o, null, dParent, styles, addKeys({ title }, opts));
	let d = mDom(dParent, styles, opts);
	mDom(d, {}, { tag: 'h2', html: title });
	let keys = Object.keys(o);
	let grid = mGrid(keys.length, 2, d, { rounding: 8, padding: 4, bg: '#eee', wmax: 500 }, { wcols: 'auto' });
	let cellStyles = { hpadding: 4 };
	if (isList(o)) {
		arrSort(o);
		o.map((x, i) => { mDom(grid, { fg: 'red', align: 'right' }, { html: i }); mDom(grid, { maleft: 10 }, { html: x }); });
	} else if (isDict(o)) {
		keys.sort();
		for (const k of keys) {
			mDom(grid, { fg: 'red', align: 'right' }, { html: k })
			mDom(grid, { maleft: 10 }, { html: o[k] });
		}
	}
	return d;
	// mDom(d, {}, { tag:'pre', html: o });

}
function superTrim(s) {
	// Remove all tab or newline characters and trim spaces
	s = s.replace(/[\t\n]/g, ' ').trim();

	// Replace multiple consecutive spaces with a single space
	s = s.replace(/\s\s+/g, ' ');

	// Remove the last semicolon if present
	if (s.endsWith(';')) {
		s = s.slice(0, -1);
	}

}
function toFlatObject(o) {
	if (isString(o)) return { details: o };
	for (const k in o) { let val = o[k]; o[k] = recFlatten(val); }
	return o;
}
function trimToAlphanum(str, allow_ = true) {
	return str.replace(/^[^a-zA-Z0-9_]+|[^a-zA-Z0-9_]+$/g, '');
}
function trimQuotes(str) { return str.replace(/^['"`]+|['"`]+$/g, ''); }



