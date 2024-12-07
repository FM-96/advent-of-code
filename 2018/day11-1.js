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
	for (let y = 1; y <= 298; ++y) {
		const powerSum =
			grid[x][y] + grid[x][y + 1] + grid[x][y + 2] +
			grid[x + 1][y] + grid[x + 1][y + 1] + grid[x + 1][y + 2] +
			grid[x + 2][y] + grid[x + 2][y + 1] + grid[x + 2][y + 2];
		if (powerSum > highestPower) {
			highestPower = powerSum;
			highestPowerPos = `${x},${y}`;
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
