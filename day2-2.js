const getInput = require('./getInput.js');

main();

async function main() {
	const input = await getInput(2);

	const entries = input.split('\n');

	let valid = 0;
	for (const entry of entries) {
		const [policy, password] = entry.split(': ');
		const [, pos1, pos2, letter] = /(\d+)-(\d+) (.)/.exec(policy);

		if ((password[pos1 - 1] === letter) + (password[pos2 - 1] === letter) === 1) {
			valid++;
		}
	}
	console.log('Answer: ' + valid);
}
