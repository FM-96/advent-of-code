const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-2.txt'), 'utf8').trim();
const array = data.split(',').map(e => Number(e));

class IntcodeComputer {
	constructor(arr) {
		this.array = arr;
	}

	run(noun, verb) {
		let instructionPointer = 0;
		const memory = this.array.slice();
		memory[1] = noun;
		memory[2] = verb;

		for (;;) {
			if (memory[instructionPointer] === 1) {
				// add
				memory[memory[instructionPointer + 3]] = memory[memory[instructionPointer + 1]] + memory[memory[instructionPointer + 2]];
			} else if (memory[instructionPointer] === 2) {
				// multiply
				memory[memory[instructionPointer + 3]] = memory[memory[instructionPointer + 1]] * memory[memory[instructionPointer + 2]];
			} else if (memory[instructionPointer] === 99) {
				break;
			} else {
				throw new Error(`Unknown op code ${memory[instructionPointer]} at position ${instructionPointer}`);
			}
			instructionPointer += 4;
		}

		return memory[0];
	}
}

const computer = new IntcodeComputer(array);
let result = -1;

outer:
for (let i = 0; i < 100; ++i) {
	for (let j = 0; j < 100; ++j) {
		const output = computer.run(i, j);
		if (output === 19690720) {
			result = (100 * i) + j;
			break outer;
		}
	}
}

console.log(`Result:\n${result}`);
