const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-1.txt'), 'utf8').trim();
const moduleFuels = data.split('\n').map(e => Math.floor(Number(e) / 3) - 2);

let totalFuel = 0;

for (const moduleFuel of moduleFuels) {
	totalFuel += Number(moduleFuel);
}

console.log(`Result:\n${totalFuel}`);
