const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(8);

	const instructions = input.split('\n');

	let acc = 0;
	const visitedInstructions = new Set();

	let i = 0;
	for (;;) {
		if (visitedInstructions.has(i)) {
			console.log('Answer: ' + acc);
			return;
		}
		visitedInstructions.add(i);

		const instruction = instructions[i];
		const [op, arg] = instruction.split(' ');
		switch (op) {
			case 'acc': {
				acc += Number(arg);
				i++;
				break;
			}
			case 'jmp': {
				i += Number(arg);
				break;
			}
			case 'nop': {
				i++;
			}
		}
	}
}
