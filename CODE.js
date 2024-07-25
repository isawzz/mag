function nodejs(){
	app.get('/cityweb_BROKEN', async (req, res) => {
		let { city } = req.query;
		let norm = normalizeString(city);
	
		let web = lookup(Session, ['web', norm]);
		if (web) return res.json(web);
	
		console.log('==> get city', city);
		const result = await getFromWebPage(city);
		lookupSet(Session, ['web', norm], result);
		res.json(result);
	});
	app.get('/cityweb0/:city/first200lines', async (req, res) => {
		const city = req.params.city;
		const first200Lines = await getFromWebPage(city);
	
		if (first200Lines) {
			res.send(first200Lines);
		} else {
			res.status(404).json({ message: 'City not found or error fetching data' });
		}
	});
	
}