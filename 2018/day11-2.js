const startTime = Date.now();
const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-11.txt'), 'utf8').trim();

const serialNumber = Number(data);

const grid = [];

for (let x = 1; x <= 300; ++x) {
	grid[x] = [];
	for (let y = 1; y <= 300; ++y) {
		grid[x][y] = powerLevel(x, y);
	}
}

let highestPower = Number.NEGATIVE_INFINITY;
let highestPowerPos;

for (let x = 1; x <= 298; ++x) {
	console.log(x);
	for (let y = 1; y <= 298; ++y) {
		for (let size = 1; size <= 301 - Math.max(x, y); ++size) {
			let powerSum = 0;
			for (let i = 0; i < size; ++i) {
				for (let j = 0; j < size; ++j) {
					powerSum += grid[x + i][y + j];
				}
			}
			if (powerSum > highestPower) {
				highestPower = powerSum;
				highestPowerPos = `${x},${y},${size}`;
			}
		}
	}
}

console.log(`Output:\n${highestPowerPos}`);
console.log(`${Date.now() - startTime} ms`);

function powerLevel(x, y) {
	const rackId = x + 10;
	let power = ((rackId * y) + serialNumber) * rackId;
	power = String(power).length < 3 ? 0 : String(power).slice(-3, -2);
	power -= 5;
	return power;
}
