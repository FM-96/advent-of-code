const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(2);

	const instructions = input.split('\n').map(e => e.split(' ').map(f => Number(f) || f));

	let pos = 0;
	let depth = 0;
	for (const instruction of instructions) {
		switch (instruction[0]) {
			case 'forward': {
				pos += instruction[1];
				break;
			}
			case 'down': {
				depth += instruction[1];
				break;
			}
			case 'up': {
				depth -= instruction[1];
				break;
			}
		}
	}
	console.log('Answer: ' + (pos * depth));
}
