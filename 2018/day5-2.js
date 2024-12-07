const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-5.txt'), 'utf8');

const polymer = data.trim();
let minLength = Number.MAX_VALUE;

const unitTypes = new Set(polymer.split('').map(e => e.toLowerCase()));

for (const unitType of unitTypes.values()) {
	let shortenedPolymer = polymer.replace(new RegExp(unitType, 'ig'), '');
	for (let i = 0; i < shortenedPolymer.length - 1; ++i) {
		if (shortenedPolymer[i] !== shortenedPolymer[i + 1] && shortenedPolymer[i].toLowerCase() === shortenedPolymer[i + 1].toLowerCase()) {
			shortenedPolymer = shortenedPolymer.slice(0, i) + shortenedPolymer.slice(i + 2);
			i = Math.max(i - 1, 0); // backtrack one to check for new reaction
			i--; // prevent loop counter incrementing
		}
	}
	minLength = Math.min(shortenedPolymer.length, minLength);
}

console.log(`Output:\n${minLength}`);
