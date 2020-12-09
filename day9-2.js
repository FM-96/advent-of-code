const getInput = require('./getInput.js');

main();

async function main() {
	const input = await getInput(9);

	const numbers = input.split('\n').map(e => Number(e));

	const PREAMBLE_LENGTH = 25;

	let invalidNumber;

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
			invalidNumber = numbers[i];
			break;
		}
	}

	for (let i = 0; i < numbers.length; ++i) {
		let sum = numbers[i];
		for (let j = i + 1; j < numbers.length; ++j) {
			sum += numbers[j];

			if (sum === invalidNumber) {
				const range = numbers.slice(i, j + 1);
				const weakness = Math.min(...range) + Math.max(...range);
				console.log('Answer: ' + weakness);
				return;
			}

			if (sum > invalidNumber) {
				break;
			}
		}
	}
}
