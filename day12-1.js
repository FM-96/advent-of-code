const getInput = require('./getInput.js');

main();

async function main() {
	const input = await getInput(12);

	const instructions = input.split('\n');

	const pos = {
		x: 0,
		y: 0,
		d: 0, // direction: 0 = east, increases clockwise
	};

	for (const instruction of instructions) {
		let [, action, value] = /(.)(\d+)/.exec(instruction);
		value = Number(value);

		if (action === 'N') {
			pos.y += value;
		} else if (action === 'S') {
			pos.y -= value;
		} else if (action === 'E') {
			pos.x += value;
		} else if (action === 'W') {
			pos.x -= value;
		} else if (action === 'L') {
			pos.d = ((pos.d - (value / 90)) + 4) % 4;
		} else if (action === 'R') {
			pos.d = ((pos.d + (value / 90)) + 4) % 4;
		} else if (action === 'F') {
			if (pos.d === 0) {
				pos.x += value;
			} else if (pos.d === 1) {
				pos.y -= value;
			} else if (pos.d === 2) {
				pos.x -= value;
			} else if (pos.d === 3) {
				pos.y += value;
			}
		}
	}

	const distance = Math.abs(pos.x) + Math.abs(pos.y);

	console.log('Answer: ' + distance);
}
