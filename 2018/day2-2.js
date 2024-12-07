const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-2.txt'), 'utf8');
const boxIds = data.split('\n').filter(e => e !== '');

for (let i = 0; i < boxIds.length - 1; ++i) {
	nextPair:
	for (let j = i + 1; j < boxIds.length; ++j) {
		const id1 = boxIds[i];
		const id2 = boxIds[j];
		let differences = 0;
		for (let k = 0; k < id1.length; ++k) {
			if (id1[k] !== id2[k]) {
				differences++;
				if (differences > 1) {
					continue nextPair;
				}
			}
		}
		if (differences === 1) {
			let commonChars = '';
			for (let k = 0; k < id1.length; ++k) {
				if (id1[k] === id2[k]) {
					commonChars += id1[k];
				}
			}
			console.log(`Output:\n${commonChars}`);
		}
	}
}
