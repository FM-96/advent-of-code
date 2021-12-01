const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(1);

	const entries = input.split('\n').map(e => Number(e));

	for (let i = 0; i < entries.length; ++i) {
		for (let j = i + 1; j < entries.length; ++j) {
			if (entries[i] + entries[j] === 2020) {
				console.log('Answer: ' + (entries[i] * entries[j]));
				return;
			}
		}
	}
}
