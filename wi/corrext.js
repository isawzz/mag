
function getCapitals() {
  let capitals = [], countries = [];
  for (const s of M.capital) {
    if (s.includes(' - ')) {
      capitals.push(stringBefore(s, '-').trim());
      countries.push(stringAfter(s, '-').trim());
    } else {
      capitals.push(stringBefore(s, ' ').trim());
      countries.push(stringAfter(s, ' ').trim());
    }
  }
  M.capitals = capitals;
  M.countries = countries;
}
function getServerurl(port = 3000) {
	let type = detectSessionType();
	let server = type == 'vps' ? 'https://server.vidulusludorum.com' : `http://localhost:${port}`;
	return server;
}
async function mGetFiles(dir, port = 3000) {
	let server = getServerurl(port);
	let data = await mGetJsonCors(`${server}/filenames?directory=${dir}`);
	return data.files;
}
async function mGetRoute(route, o = {}, port = 3000) {
	let server = getServerurl(port);
	server += `/${route}?`;
	for (const k in o) { server += `${k}=${o[k]}&`; }
	const response = await fetch(server, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		mode: 'cors',
	});
	return tryJSONParse(await response.text());
}
