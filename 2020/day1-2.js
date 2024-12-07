const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(2020, 1);

	const entries = input.split('\n').map(e => Number(e));

	for (let i = 0; i < entries.length; ++i) {
		for (let j = i + 1; j < entries.length; ++j) {
			for (let k = j + 1; k < entries.length; ++k) {
				if (entries[i] + entries[j] + entries[k] === 2020) {
					console.log('Answer: ' + (entries[i] * entries[j] * entries[k]));
					return;
				}
			}
		}
	}
}
