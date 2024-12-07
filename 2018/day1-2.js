const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-1.txt'), 'utf8');
const changes = data.split('\n').filter(e => e !== '').map(e => Number(e));

const seenFrequencies = new Set([0]);
let frequency = 0;

for (;;) {
	for (const change of changes) {
		frequency += change;
		if (seenFrequencies.has(frequency)) {
			console.log(`Output:\n${frequency}`);
			return;
		}
		seenFrequencies.add(frequency);
	}
}
