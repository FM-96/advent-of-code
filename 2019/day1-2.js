const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-1.txt'), 'utf8').trim();
const moduleFuels = data.split('\n').map(e => {
	let moduleFuel = Math.floor(Number(e) / 3) - 2;
	let addedFuel = moduleFuel;
	let neededFuel = Math.floor(addedFuel / 3) - 2;

	do {
		addedFuel = neededFuel;
		moduleFuel += neededFuel;
	} while ((neededFuel = Math.floor(addedFuel / 3) - 2) > 0);

	return moduleFuel;
});

let totalFuel = 0;

for (const moduleFuel of moduleFuels) {
	totalFuel += Number(moduleFuel);
}

console.log(`Result:\n${totalFuel}`);
