const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(2020, 15);

	const TARGET_NUMBER = 30000000;

	const numbers = input.split(',').map(e => Number(e));

	const lastUsedMap = new Map();

	for (let i = 0; i < numbers.length - 1; ++i) {
		lastUsedMap.set(numbers[i], i);
	}

	for (let i = numbers.length; i < TARGET_NUMBER; ++i) {
		const lastNumber = numbers[i - 1];
		if (!lastUsedMap.has(lastNumber)) {
			numbers[i] = 0;
		} else {
			const lastUsed = lastUsedMap.get(lastNumber);
			const age = (i - 1) - lastUsed;
			numbers[i] = age;
		}
		lastUsedMap.set(lastNumber, i - 1);
	}

	console.log('Answer: ' + numbers[TARGET_NUMBER - 1]);
}
