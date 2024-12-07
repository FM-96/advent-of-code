const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-5.txt'), 'utf8').trim();
const array = data.split(',').map(e => Number(e));

class IntcodeComputer {
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

	run(inputs) {
		let instructionPointer = 0;
		this.memory = this.array.slice();

		let output = 0;
		let lastInstruction;

		let increaseIP;

		loop:
		for (;;) {
			increaseIP = true;
			const [opCode, modes] = this._parseInstruction(this.memory[instructionPointer]);
			switch (opCode) {
				case 1:
					// add
					if (output !== 0) {
						console.log(`Test result ${output} after running ${lastInstruction}`);
					}
					this.memory[this.memory[instructionPointer + 3]] = this._getValue(this.memory[instructionPointer + 1], modes[0]) + this._getValue(this.memory[instructionPointer + 2], modes[1]);
					break;
				case 2:
					// multiply
					if (output !== 0) {
						console.log(`Test result ${output} after running ${lastInstruction}`);
					}
					this.memory[this.memory[instructionPointer + 3]] = this._getValue(this.memory[instructionPointer + 1], modes[0]) * this._getValue(this.memory[instructionPointer + 2], modes[1]);
					break;
				case 3:
					// input
					if (output !== 0) {
						console.log(`Test result ${output} after running ${lastInstruction}`);
					}
					this.memory[this.memory[instructionPointer + 1]] = inputs.pop();
					break;
				case 4:
					// output
					if (output !== 0) {
						console.log(`Test result ${output} after running ${lastInstruction}`);
					}
					output = this._getValue(this.memory[instructionPointer + 1], modes[0]);
					break;
				case 5:
					// jump-if-true
					if (output !== 0) {
						console.log(`Test result ${output} after running ${lastInstruction}`);
					}
					if (this._getValue(this.memory[instructionPointer + 1], modes[0]) !== 0) {
						instructionPointer = this._getValue(this.memory[instructionPointer + 2], modes[1]);
						increaseIP = false;
					}
					break;
				case 6:
					// jump-if-false
					if (output !== 0) {
						console.log(`Test result ${output} after running ${lastInstruction}`);
					}
					if (this._getValue(this.memory[instructionPointer + 1], modes[0]) === 0) {
						instructionPointer = this._getValue(this.memory[instructionPointer + 2], modes[1]);
						increaseIP = false;
					}
					break;
				case 7:
					// less-than
					if (output !== 0) {
						console.log(`Test result ${output} after running ${lastInstruction}`);
					}
					this.memory[this.memory[instructionPointer + 3]] = this._getValue(this.memory[instructionPointer + 1], modes[0]) < this._getValue(this.memory[instructionPointer + 2], modes[1]) ? 1 : 0;
					break;
				case 8:
					// equals
					if (output !== 0) {
						console.log(`Test result ${output} after running ${lastInstruction}`);
					}
					this.memory[this.memory[instructionPointer + 3]] = this._getValue(this.memory[instructionPointer + 1], modes[0]) === this._getValue(this.memory[instructionPointer + 2], modes[1]) ? 1 : 0;
					break;
				case 99:
					break loop;
				default:
					throw new Error(`Unknown op code ${this.memory[instructionPointer]} at position ${instructionPointer}`);
			}

			lastInstruction = this.memory[instructionPointer];

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

const computer = new IntcodeComputer(array);

const diagnosticCode = computer.run([5]);

console.log(`Result:\n${diagnosticCode}`);
