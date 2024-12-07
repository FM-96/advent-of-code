const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-2.txt'), 'utf8').trim();
const array = data.split(',').map(e => Number(e));

let opPos = 0;

array[1] = 12;
array[2] = 2;

for (;;) {
	if (array[opPos] === 1) {
		// add
		array[array[opPos + 3]] = array[array[opPos + 1]] + array[array[opPos + 2]];
	} else if (array[opPos] === 2) {
		// multiply
		array[array[opPos + 3]] = array[array[opPos + 1]] * array[array[opPos + 2]];
	} else if (array[opPos] === 99) {
		break;
	} else {
		throw new Error(`Unknown op code ${array[opPos]} at position ${opPos}`);
	}
	opPos += 4;
}

console.log(`Result:\n${array[0]}`);
