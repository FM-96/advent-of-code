const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-4.txt'), 'utf8').trim();
const [min, max] = data.split('-').map(e => Number(e));

let matches = 0;

for (let i = min; i < max; ++i) {
	const digits = String(i).split('').map(e => Number(e));
	let decrease = false;
	for (let j = 1; j < digits.length; ++j) {
		decrease = digits[j - 1] > digits[j];
		if (decrease) {
			break;
		}
	}
	if (decrease) {
		continue;
	}
	let double = false;
	for (let j = 1; j < digits.length; ++j) {
		double = double || digits[j - 1] === digits[j];
		if (double) {
			for (let k = j + 1; k <= digits.length; ++k) {
				if (digits[j] === digits[k]) {
					double = false;
				} else {
					j = k - 1;
					break;
				}
			}
		}
		if (double) {
			break;
		}
	}
	if (double) {
		matches++;
	}
}

console.log(`Result:\n${matches}`);
