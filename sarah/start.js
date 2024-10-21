onload = start;

async function start(){test0();}
async function test0(){
	document.getElementById('evaluateButton').addEventListener('click', () => {
		let input = document.getElementById('inputNumbers').value;
		input = replaceCommasWithDots(input);
		let values = input.split(' ').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
		values.sort();
		console.log(values)
	
		if (values.length === 0) {
			document.getElementById('result').innerHTML = "Please enter valid numbers.";
			return;
		}
	
		const stats = calculateStatistics(values);
		document.getElementById('result').innerHTML = `
					<strong>Results:</strong><br>
					Spannweite: ${formatFloatToDecimal(stats.spannweite,4)}<br>
					Mean: ${stats.mean}<br>
					Median: ${stats.median}<br>
					Mode: ${stats.mode}<br>
					Variance: ${stats.variance}<br>
					Standard Deviation: ${stats.standardDeviation}
			`;
	});
	}
