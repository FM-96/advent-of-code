const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-7.txt'), 'utf8').trim();
const array = data.split(',').map(e => Number(e));

class IntcodeComputer_Generator {
	constructor(arr) {
		this.array = arr;
		this.memory = [];

		this.parameters = {
			'1': 3,
			'2': 3,
			'3': 1,
			'4': 1,
			'5': 2,
			'6': 2,
			'7': 3,
			'8': 3,
		};
	}

	* run() {
		let instructionPointer = 0;
		this.memory = this.array.slice();

		let output = 0;

		let increaseIP;

		loop:
		for (;;) {
			increaseIP = true;
			const [opCode, modes] = this._parseInstruction(this.memory[instructionPointer]);
			switch (opCode) {
				case 1:
					// add
					if (output !== 0) {
						yield output;
						output = 0;
					}
					this.memory[this.memory[instructionPointer + 3]] = this._getValue(this.memory[instructionPointer + 1], modes[0]) + this._getValue(this.memory[instructionPointer + 2], modes[1]);
					break;
				case 2:
					// multiply
					if (output !== 0) {
						yield output;
						output = 0;
					}
					this.memory[this.memory[instructionPointer + 3]] = this._getValue(this.memory[instructionPointer + 1], modes[0]) * this._getValue(this.memory[instructionPointer + 2], modes[1]);
					break;
				case 3:
					// input
					if (output !== 0) {
						yield output;
						output = 0;
					}
					this.memory[this.memory[instructionPointer + 1]] = yield 'input';
					break;
				case 4:
					// output
					if (output !== 0) {
						yield output;
						output = 0;
					}
					output = this._getValue(this.memory[instructionPointer + 1], modes[0]);
					break;
				case 5:
					// jump-if-true
					if (output !== 0) {
						yield output;
						output = 0;
					}
					if (this._getValue(this.memory[instructionPointer + 1], modes[0]) !== 0) {
						instructionPointer = this._getValue(this.memory[instructionPointer + 2], modes[1]);
						increaseIP = false;
					}
					break;
				case 6:
					// jump-if-false
					if (output !== 0) {
						yield output;
						output = 0;
					}
					if (this._getValue(this.memory[instructionPointer + 1], modes[0]) === 0) {
						instructionPointer = this._getValue(this.memory[instructionPointer + 2], modes[1]);
						increaseIP = false;
					}
					break;
				case 7:
					// less-than
					if (output !== 0) {
						yield output;
						output = 0;
					}
					this.memory[this.memory[instructionPointer + 3]] = this._getValue(this.memory[instructionPointer + 1], modes[0]) < this._getValue(this.memory[instructionPointer + 2], modes[1]) ? 1 : 0;
					break;
				case 8:
					// equals
					if (output !== 0) {
						yield output;
						output = 0;
					}
					this.memory[this.memory[instructionPointer + 3]] = this._getValue(this.memory[instructionPointer + 1], modes[0]) === this._getValue(this.memory[instructionPointer + 2], modes[1]) ? 1 : 0;
					break;
				case 99:
					break loop;
				default:
					throw new Error(`Unknown op code ${this.memory[instructionPointer]} at position ${instructionPointer}`);
			}

			instructionPointer += increaseIP && (this.parameters[opCode] + 1);
		}

		return output;
	}

	_parseInstruction(instruction) {
		const opCode = instruction % 100;
		let modes = String(instruction).slice(0, -2).split('').reverse().map(e => Number(e));
		if (modes.length < this.parameters[opCode]) {
			modes = modes.concat(Array(this.parameters[opCode] - modes.length).fill(0));
		}
		return [opCode, modes];
	}

	_getValue(parameter, mode) {
		switch (mode) {
			case 0:
				return this.memory[parameter];
			case 1:
				return parameter;
		}
	}
}

const outputs = [];

const perms = [];
getPermutations([4, 3, 2, 1, 0], 5);

// source: https://en.wikipedia.org/wiki/Heap%27s_algorithm
function getPermutations(arr, k) {
	if (k === 1) {
		perms.push(arr.slice());
	} else {
		// Generate permutations with kth unaltered
		// Initially k == length(A)
		getPermutations(arr, k - 1);

		// Generate permutations for kth swapped with each k-1 initial
		for (let i = 0; i < k - 1; i += 1) {
			// Swap choice dependent on parity of k (even or odd)
			if (k % 2 === 0) {
				// zero-indexed, the kth is at k-1
				const temp = arr[i];
				arr[i] = arr[k - 1];
				arr[k - 1] = temp;
			} else {
				const temp = arr[0];
				arr[0] = arr[k - 1];
				arr[k - 1] = temp;
			}
			getPermutations(arr, k - 1);
		}
	}
}

for (const perm of perms) {
	const amps = Array(5).fill().map(e => new IntcodeComputer_Generator(array).run());
	amps.map(e => e.next()); // start computation

	let output = {value: 0};
	for (let i = 0; i < perm.length; ++i) {
		// console.log(`amp ${i}: config value ${perm[i]}`);
		amps[i].next(perm[i]);
		// console.log(`amp ${i}: input ${output.value}`);
		output = amps[i].next(output.value);
		outputs.push(output.value);
	}
}

console.log(`Result:\n${outputs.sort((a, b) => b - a)[0]}`);
