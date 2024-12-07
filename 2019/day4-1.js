const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-4.txt'), 'utf8').trim();
const [min, max] = data.split('-').map(e => Number(e));

let matches = 0;

for (let i = min; i < max; ++i) {
	const digits = String(i).split('').map(e => Number(e));
	let double = false, decrease = false;
	for (let j = 1; j < digits.length; ++j) {
		double = double || digits[j - 1] === digits[j];
		decrease = digits[j - 1] > digits[j];
		if (decrease) {
			break;
		}
	}
	if (double && !decrease) {
		matches++;
	}
}

console.log(`Result:\n${matches}`);
