const getInput = require('./getInput.js');

main();

async function main() {
	const input = await getInput(5);

	const passes = input.split('\n');

	let highestId = 0;
	for (const pass of passes) {
		const row = binaryPartitioning(pass.split('').slice(0, 7).map(e => e === 'B'));
		const col = binaryPartitioning(pass.split('').slice(7).map(e => e === 'R'));

		const seatId = (row * 8) + col;
		highestId = Math.max(highestId, seatId);
	}

	console.log('Answer: ' + highestId);
}

function binaryPartitioning(instructions) {
	let min = 0;
	let max = (2 ** instructions.length) - 1;

	for (const instruction of instructions) {
		const range = max - min + 1;
		if (instruction) { // true === upper half
			min += range / 2;
		} else { // false === lower half
			max -= range / 2;
		}
	}
	return min;
}
