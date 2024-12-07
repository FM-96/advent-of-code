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
	const [id, left, top, wide, tall] = match.slice(1).map(e => Number(e));

	// columns
	for (let i = left; i < left + wide; ++i) {
		if (fabric[i] === undefined) {
			// create column
			fabric[i] = [];
		}
		const column = fabric[i];
		// rows
		for (let j = top; j < top + tall; ++j) {
			if (column[j] === undefined) {
				// create cell
				column[j] = [];
			}
			column[j].push(id);
		}
	}
}

const overlappingClaims = new Set();
for (const column of fabric) {
	if (Array.isArray(column)) {
		for (const cell of column) {
			if (Array.isArray(cell) && cell.length > 1) {
				cell.forEach(e => overlappingClaims.add(e));
			}
		}
	}
}

for (let i = 1; i < claims.length + 1; ++i) {
	if (!overlappingClaims.has(i)) {
		console.log(`Output:\n${i}`);
		return;
	}
}
