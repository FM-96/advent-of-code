const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-5.txt'), 'utf8');

let polymer = data.trim();

for (let i = 0; i < polymer.length - 1; ++i) {
	if (polymer[i] !== polymer[i + 1] && polymer[i].toLowerCase() === polymer[i + 1].toLowerCase()) {
		polymer = polymer.slice(0, i) + polymer.slice(i + 2);
		i = Math.max(i - 1, 0); // backtrack one to check for new reaction
		i--; // prevent loop counter incrementing
	}
}

console.log(`Output:\n${polymer.length}`);
