const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(6);

	const groups = input.split('\n\n');

	let sum = 0;
	for (const group of groups) {
		const yesQuestions = new Set();

		const personQuestions = group.replace(/\n/g, '').split('');

		for (const personQuestion of personQuestions) {
			yesQuestions.add(personQuestion);
		}
		sum += yesQuestions.size;
	}

	console.log('Answer: ' + sum);
}
