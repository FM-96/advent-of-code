const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(2020, 2);

	const entries = input.split('\n');

	let valid = 0;
	for (const entry of entries) {
		const [policy, password] = entry.split(': ');
		const [, min, max, letter] = /(\d+)-(\d+) (.)/.exec(policy);

		const amount = password.split('').filter(e => e === letter).length;

		if (min <= amount && amount <= max) {
			valid++;
		}
	}
	console.log('Answer: ' + valid);
}
