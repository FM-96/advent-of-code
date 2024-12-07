const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-3.txt'), 'utf8').trim();

/* Answer: 1626 */

// const [wire1, wire2] = data.split('\n').map(e => e.split(','));
const wires = data.split('\n').map(e => e.split(','));

const intersections = [];

// const wire1Pos = {x: 0, y: 0};
// for (const wire1Section of wire1) {
// 	for (const wire2Section of wire2) {
// 		// TODO
// 	}
// }

class Wire {
	constructor(wirePath) {
		this.path = wirePath;
		this.pathStep = 0;
		this.pos = {x: 0, y: 0};
	}

	step() {
		const change = {from: {}, to: {}};
		change.from.x = this.pos.x;
		change.from.y = this.pos.y;

		const step = this.path[this.pathStep++];
		if (!step) {
			return null; // finished
		}

		let dx, dy;
		switch (step[0]) {
			case 'R':
				dx = 1;
				dy = 0;
				break;
			case 'U':
				dx = 0;
				dy = 1;
				break;
			case 'L':
				dx = -1;
				dy = 0;
				break;
			case 'D':
				dx = 0;
				dy = -1;
		}
		const amount = Number(step.slice(1));

		this.pos.x += dx * amount;
		this.pos.y += dy * amount;

		change.to.x = this.pos.x;
		change.to.y = this.pos.y;
		return change;
	}
}

const wire1 = new Wire(wires[0]);
const wire2 = new Wire(wires[1]);

let wire1Step, wire2Step;
while ((wire1Step = wire1.step()) !== null) {
	// TODO
	while ((wire2Step = wire2.step()) !== null) {
		// TODO
	}
}

function wire(arr) {
	let x = 0, y = 0;
	const positions = [];
	for (const e of arr) {
		let dx, dy;
		switch (e[0]) {
			case 'R':
				dx = 1;
				dy = 0;
				break;
			case 'U':
				dx = 0;
				dy = 1;
				break;
			case 'L':
				dx = -1;
				dy = 0;
				break;
			case 'D':
				dx = 0;
				dy = -1;
		}
		const amount = Number(e.slice(1));
		for (let i = 0; i < amount; ++i) {
			x += dx;
			y += dy;
			positions.push([x, y]);
		}
	}
	return positions;
}

const wirePos = wires.map(e => wire(e));

const overlaps = [];

for (let i = 0; i < wirePos[1].length; ++i) {
	if (wirePos[0].some(e => e[0] === wirePos[1][i][0] && e[1] === wirePos[1][i][1])) {
		overlaps.push(wirePos[1][i]);
	}
}

const closestDistance = overlaps.map(e => Math.abs(e[0]) + Math.abs(e[1])).sort()[0];

console.log(`Result:\n${closestDistance}`);
