function getCapitals(){
	let capitals=[];
	for(const s of M.capital){
		if (s.includes(' - ')) capitals.push(stringBefore(s,'-').trim());
		else capitals.push(stringBefore(s,' ').trim());
	}
	M.capitals = capitals;
}
function getServerurl(port=3000) {
  let type = detectSessionType();
  let server = type == 'vps' ? 'https://server.vidulusludorum.com' : `http://localhost:${port}`;
  return server;
}
async function mGetRoute(route, o = {}, port=3000) {
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