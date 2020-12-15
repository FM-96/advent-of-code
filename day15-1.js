const getInput = require('./getInput.js');

main();

async function main() {
	const input = await getInput(15);

	const TARGET_NUMBER = 2020;

	const numbers = input.split(',').map(e => Number(e));

	const usedNumbers = new Set(numbers.slice(0, -1));

	for (let i = numbers.length; i < TARGET_NUMBER; ++i) {
		const lastNumber = numbers[i - 1];
		if (!usedNumbers.has(lastNumber)) {
			numbers[i] = 0;
		} else {
			const lastUsed = numbers.lastIndexOf(lastNumber, i - 2);
			const age = (i - 1) - lastUsed;
			numbers[i] = age;
		}
		usedNumbers.add(lastNumber);
	}

	console.log('Answer: ' + numbers[TARGET_NUMBER - 1]);
}
