const getInput = require('./getInput.js');

main();

async function main() {
	const input = await getInput(12);

	const instructions = input.split('\n');

	const shipPos = {
		x: 0,
		y: 0,
	};
	let waypointPos = {
		x: 10,
		y: 1,
	};

	for (const instruction of instructions) {
		let [, action, value] = /(.)(\d+)/.exec(instruction);
		value = Number(value);

		if (action === 'N') {
			waypointPos.y += value;
		} else if (action === 'S') {
			waypointPos.y -= value;
		} else if (action === 'E') {
			waypointPos.x += value;
		} else if (action === 'W') {
			waypointPos.x -= value;
		} else if (action === 'L') {
			const clockwiseRotations = ((4 - (value / 90))) % 4;
			waypointPos = rotateClockwise(waypointPos, clockwiseRotations);
		} else if (action === 'R') {
			const clockwiseRotations = ((4 + (value / 90))) % 4;
			waypointPos = rotateClockwise(waypointPos, clockwiseRotations);
		} else if (action === 'F') {
			shipPos.x += waypointPos.x * value;
			shipPos.y += waypointPos.y * value;
		}
	}

	const distance = Math.abs(shipPos.x) + Math.abs(shipPos.y);

	console.log('Answer: ' + distance);
}

function rotateClockwise(coords, times) {
	let pos = {
		x: coords.x,
		y: coords.y,
	};
	for (let i = 0; i < times; ++i) {
		const newPos = {
			x: pos.y,
			y: -pos.x,
		};
		pos = newPos;
	}
	return pos;
}
