const getInput = require('./getInput.js');

main();

async function main() {
	const input = await getInput(9);

	const numbers = input.split('\n').map(e => Number(e));

	const PREAMBLE_LENGTH = 25;

	for (let i = PREAMBLE_LENGTH; i < numbers.length; ++i) {
		const preamble = new Set(numbers.slice(i - PREAMBLE_LENGTH, i));

		let isValid = false;

		validityCheck:
		for (const numberOne of preamble.values()) {
			for (const numberTwo of preamble.values()) {
				if (numberOne === numberTwo) {
					continue;
				}
				if (numbers[i] === numberOne + numberTwo) {
					isValid = true;
					break validityCheck;
				}
			}
		}

		if (!isValid) {
			console.log('Answer: ' + numbers[i]);
			return;
		}
	}
}
