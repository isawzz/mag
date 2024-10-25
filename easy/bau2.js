
async function loadYamlFile(url) {

  // let server = getServerurl(); console.log('server',server);
	let sessionType = detectSessionType(); console.log('sessionType', sessionType);
	if (sessionType == 'telecave') {
		url = `www.telecave.net/mag/y/m.txt`; //${url.substring(3)}`;
		url = `https://www.telecave.net/mag/y/m.txt`;
	}
	console.log("Loading YAML file from:", url);
	try {
			// Fetch the YAML file from the server
			const response = await fetch(url, { mode: 'no-cors' });
			if (!response.ok) {
					throw new Error(`Error fetching the file: ${response.statusText}`);
			}
			
			// Read the YAML content as text
			const yamlText = await response.text();
			
			// Parse YAML content into a JavaScript object
			const data = jsyaml.load(yamlText);
			
			console.log("YAML Data:", data);
			return data; // Return the parsed data if needed
	} catch (error) {
			console.error("Error loading YAML file:", error);
	}
}

async function fetchYamlFile() {
	const url = 'https://www.telecave.net/mag/easy/app.php'; // Update with your PHP file URL
	
	try {
			const response = await fetch(url);
			
			// Check for successful response
			if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			// Get text content of the response
			const yamlText = await response.text();
			
			// Parse the YAML text to a JavaScript object
			const data = jsyaml.load(yamlText);
			
			console.log("YAML Data:", data);
			return data;
	} catch (error) {
			console.error("Error fetching YAML file:", error);
	}
}

async function fetchYamlFiles(fileList) {
	// Create a comma-separated string from the file list array
	const filesParam = fileList.join(',');

	// Construct the URL with query parameters
	const url = `https://your-domain.com/serveYamlFiles.php?files=${encodeURIComponent(filesParam)}`;

	try {
			const response = await fetch(url);

			// Check for successful response
			if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
			}

			// Parse the JSON response
			const jsonData = await response.json();

			// Loop through each file's data and log it
			Object.keys(jsonData).forEach(fileName => {
					console.log(`Data from ${fileName}:`, jsonData[fileName]);
			});

			return jsonData; // Return the parsed data if needed
	} catch (error) {
			console.error("Error fetching YAML files:", error);
	}
}

