const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-6.txt'), 'utf8').trim();

const coordinates = data.split('\n').map((e, i) => ({
	id: i,
	x: Number(e.split(', ')[0]),
	y: Number(e.split(', ')[1]),
}));

let maxX = 0, maxY = 0;

for (const coordinate of coordinates) {
	maxX = Math.max(maxX, coordinate.x);
	maxY = Math.max(maxY, coordinate.y);
}

const grid = [];

for (let i = 0; i <= maxX; ++i) {
	grid[i] = [];
	for (let j = 0; j <= maxY; ++j) {
		const point = {x: i, y: j};
		let totalDistance = 0;
		for (const coordinate of coordinates) {
			totalDistance += distance(point, coordinate);
			if (totalDistance >= 10000) {
				break;
			}
		}
		grid[i][j] = totalDistance < 10000;
	}
}

let regionSize = 0;

for (const row of grid) {
	for (const location of row) {
		regionSize += Number(location);
	}
}

console.log(`Output:\n${regionSize}`);

function distance(point1, point2) {
	return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}
