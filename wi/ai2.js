const express = require("express");
const axios = require('axios');
const PORT = 3006;

const app = express();

async function getStarCities() {
    const URL = "https://en.wikivoyage.org/w/api.php";
    const PARAMS = {
        action: "query",
        format: "json",
        list: "categorymembers",
        cmtitle: "Category:Star_articles",
        cmlimit: 100
    };

    try {
        const response = await axios.get(URL, { params: PARAMS });
        const data = response.data;

        const starCities = data.query.categorymembers.map(member => ({
            title: member.title,
            pageid: member.pageid
        }));

        console.log(starCities);
        return starCities;
    } catch (error) {
        console.error('Error fetching star cities:', error);
    }
}

async function init() {
	getStarCities().catch(console.error);
	app.listen(PORT, () => { console.log(`Server running at http://localhost:${PORT}/`); });
}
init();


