const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(11);

	let changed;
	let state = input;
	do {
		const layout = state.split('\n');
		let newState = '';

		for (let rowIndex = 0; rowIndex < layout.length; ++rowIndex) {
			const row = layout[rowIndex];
			for (let colIndex = 0; colIndex < row.length; ++colIndex) {
				const position = row[colIndex];
				if (position === 'L') {
					if (getOccupiedNeighbours(layout, rowIndex, colIndex) === 0) {
						newState += '#';
					} else {
						newState += 'L';
					}
				} else if (position === '#') {
					if (getOccupiedNeighbours(layout, rowIndex, colIndex) >= 5) {
						newState += 'L';
					} else {
						newState += '#';
					}
				} else {
					newState += '.';
				}
			}
			if (rowIndex !== layout.length - 1) {
				newState += '\n';
			}
		}

		changed = state !== newState;
		state = newState;
	} while (changed);

	console.log('Answer: ' + state.split('').filter(e => e === '#').length);
}

function getOccupiedNeighbours(layout, rowIndex, colIndex) {
	const directions = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];
	let occupied = 0;
	for (const direction of directions) {
		let r = rowIndex;
		let c = colIndex;
		let visible;
		do {
			r += direction[0];
			c += direction[1];
			visible = layout[r]?.[c];
		} while (visible === '.');
		if (visible === '#') {
			occupied++;
		}
	}
	return occupied;
}
