const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-1.txt'), 'utf8');
const changes = data.split('\n').filter(e => e !== '').map(e => Number(e));

let frequency = 0;

for (const change of changes) {
	frequency += Number(change);
}

console.log(`Output:\n${frequency}`);
