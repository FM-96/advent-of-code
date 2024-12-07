const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-3.txt'), 'utf8');
const claims = data.split('\n').filter(e => e !== '');

const claimRegex = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;

const fabric = [];

for (const claim of claims) {
	const match = claimRegex.exec(claim);
	if (!match) {
		throw new Error(`Claim "${claim}" does not match`);
	}
	const [left, top, wide, tall] = match.slice(2).map(e => Number(e));

	// columns
	for (let i = left; i < left + wide; ++i) {
		if (fabric[i] === undefined) {
			// create column
			fabric[i] = [];
		}
		const column = fabric[i];
		// rows
		for (let j = top; j < top + tall; ++j) {
			switch (column[j]) {
				case 1:
				case 2:
					column[j] = 2;
					break;
				default:
					column[j] = 1;
			}
		}
	}
}

let overlappingFields = 0;
for (const column of fabric) {
	if (Array.isArray(column)) {
		overlappingFields = column.reduce((prev, cur) => prev + Number(cur === 2), overlappingFields);
	}
}

console.log(`Output:\n${overlappingFields}`);
