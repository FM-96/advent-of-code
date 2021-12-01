const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(10);

	const adapters = input.split('\n').map(e => Number(e));

	adapters.sort((a, b) => a - b);

	const differences = new Map();
	differences.set(3, 1); // your device's adapter

	for (let i = 0; i < adapters.length; ++i) {
		const difference = adapters[i] - (adapters[i - 1] || 0); // 0 = the outlet

		let currentValue = differences.get(difference);
		if (!currentValue) {
			currentValue = 0;
		}
		differences.set(difference, currentValue + 1);
	}

	console.log('Answer: ' + (differences.get(1) * differences.get(3)));
}
