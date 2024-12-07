const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-3.txt'), 'utf8').trim();

const wires = data.split('\n').map(e => e.split(','));

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
