const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(2020, 6);

	const groups = input.split('\n\n');

	let sum = 0;
	for (const group of groups) {
		const yesQuestions = new Set();

		const persons = group.split('\n');

		for (let i = 0; i < persons.length; ++i) {
			const personQuestions = persons[i].split('');
			if (i === 0) {
				for (const personQuestion of personQuestions) {
					yesQuestions.add(personQuestion);
				}
			} else {
				for (const value of yesQuestions.values()) {
					if (!personQuestions.includes(value)) {
						yesQuestions.delete(value);
					}
				}
			}
		}
		sum += yesQuestions.size;
	}

	console.log('Answer: ' + sum);
}
