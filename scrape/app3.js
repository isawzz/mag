const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

async function getFromWebPage(city) {
	const url = `https://en.wikivoyage.org/wiki/${encodeURIComponent(city)}`;
	try {
		const { data } = await axios.get(url);
		//const lines = data.split('\n').slice(0, 200).join('\n');
		return data;
	} catch (error) {
		console.error(`Error fetching the page for ${city}:`, error);
		return null;
	}
}

// Define a route to get the first 200 lines of a city's page
app.get('/citynew/:city/first200lines', async (req, res) => {
	const city = req.params.city;
	const first200Lines = await getFromWebPage(city);

	if (first200Lines) {
		res.send(first200Lines);
	} else {
		res.status(404).json({ message: 'City not found or error fetching data' });
	}
});
app.get('/city', async (req, res) => {
	const { city } = req.query;
	console.log('==> get city',city);
	const result = await getFromWebPage(city);
	res.json(result);
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
