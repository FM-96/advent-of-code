const startTime = Date.now();
const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-12.txt'), 'utf8').trim();

const spreadInstructionsArr = data.split('\n\n')[1].split('\n');
const spreadInstructions = new Map();

for (const instruction of spreadInstructionsArr) {
	const parts = instruction.split(' => ');
	spreadInstructions.set(parts[0], parts[1]);
}

const initialState = data.split('\n\n')[0].slice(15);

let state = '.....' + initialState + '.....';
let startIndex = -5;

let time;
for (time = 1; time <= 20; ++time) {
	let newState = '..';
	for (let i = 2; i < state.length - 2; ++i) {
		newState += spreadInstructions.get(state.slice(i - 2, i + 3));
	}
	state = newState;
	state = state.replace(/\.*$/, '.....');
	let leadingDots = 0;
	for (let i = 0; i < state.length; ++i) {
		if (state[i] !== '.') {
			break;
		}
		leadingDots++;
	}
	state = state.replace(/^\.*/, '.....');
	startIndex += leadingDots - 5;
}

const potSum = state.split('').reduce((prev, cur, i) => (cur === '#' ? prev + startIndex + i : prev), 0);

console.log(`Output:\n${potSum}`);
console.log(`${Date.now() - startTime} ms`);
