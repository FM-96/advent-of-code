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
		let closestCoordinate;
		let minDistance = Number.MAX_VALUE;
		let tied = false;
		for (const coordinate of coordinates) {
			const dist = distance(point, coordinate);
			if (dist < minDistance) {
				minDistance = dist;
				closestCoordinate = coordinate;
				tied = false;
			} else if (dist === minDistance) {
				tied = true;
			}
		}
		grid[i][j] = tied ? null : {coordId: closestCoordinate.id, inf: i === 0 || i === maxX || j === 0 || j === maxY};
	}
}

const sizes = new Map();

for (const row of grid) {
	for (const location of row) {
		if (location === null) {
			continue;
		}
		const coordinate = sizes.get(location.coordId) || {id: location.coordId, size: 0};
		if (coordinate.size === -1) {
			continue;
		}
		coordinate.size = location.inf ? -1 : coordinate.size + 1;
		sizes.set(location.coordId, coordinate);
	}
}

const largestArea = Array.from(sizes.values()).filter(e => e.size !== -1).sort((a, b) => b.size - a.size)[0].size;

console.log(`Output:\n${largestArea}`);

function distance(point1, point2) {
	return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}
