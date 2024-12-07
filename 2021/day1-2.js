const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(2021, 1);

	const measurements = input.split('\n').map(e => Number(e));

	let increases = 0;
	for (let i = 3; i < measurements.length; ++i) {
		if ((measurements[i] + measurements[i - 1] + measurements[i - 2]) > (measurements[i - 1] + measurements[i - 2] + measurements[i - 3])) {
			increases++;
		}
	}
	console.log('Answer: ' + increases);
}
