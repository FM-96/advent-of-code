const getInput = require('./getInput.js');

main();

async function main() {
	const input = await getInput(8);

	const instructions = input.split('\n');

	const changeableInstructionsIndexes = instructions.map((e, i) => ({e, i})).filter(e => !e.e.includes('acc')).map(e => e.i);

	let acc = 0;

	changingInstructions:
	for (const changeableInstructionIndex of changeableInstructionsIndexes) {
		const changedInstructions = instructions.slice();
		if (changedInstructions[changeableInstructionIndex].includes('nop')) {
			changedInstructions[changeableInstructionIndex] = changedInstructions[changeableInstructionIndex].replace('nop', 'jmp');
		} else if (changedInstructions[changeableInstructionIndex].includes('jmp')) {
			changedInstructions[changeableInstructionIndex] = changedInstructions[changeableInstructionIndex].replace('jmp', 'nop');
		}

		acc = 0;
		const visitedInstructions = new Set();

		let i = 0;
		for (;;) {
			if (visitedInstructions.has(i)) {
				continue changingInstructions;
			} else if (i >= changedInstructions.length) {
				break changingInstructions;
			}
			visitedInstructions.add(i);

			const instruction = changedInstructions[i];
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
	console.log('Answer: ' + acc);
}
