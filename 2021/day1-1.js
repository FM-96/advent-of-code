const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(2021, 1);

	const measurements = input.split('\n').map(e => Number(e));

	let increases = 0;
	for (let i = 1; i < measurements.length; ++i) {
		if (measurements[i] > measurements[i - 1]) {
			increases++;
		}
	}
	console.log('Answer: ' + increases);
}
