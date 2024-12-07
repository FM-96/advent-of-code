const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-7.txt'), 'utf8').trim();

const instructions = data.split('\n');

const regex = /Step (.) must be finished before step (.) can begin/;

const requirements = new Map();

for (const instruction of instructions) {
	const match = regex.exec(instruction);
	const [, requirement, stepId] = match;
	const step = requirements.get(stepId) || {stepId, prerequisites: []};
	step.prerequisites.push(match[1]);
	requirements.set(stepId, step);
	const requiredStep = requirements.get(requirement) || {stepId: requirement, prerequisites: []};
	requirements.set(requirement, requiredStep);
}

let order = '';

while (requirements.size > 0) {
	const ready = Array.from(requirements.values()).filter(e => e.prerequisites.length === 0).map(e => e.stepId);
	ready.sort();
	requirements.delete(ready[0]);
	order += ready[0];
	for (const [key, value] of requirements.entries()) {
		if (value.prerequisites.includes(ready[0])) {
			value.prerequisites.splice(value.prerequisites.indexOf(ready[0]), 1);
			requirements.set(key, value);
		}
	}
}
console.log(`Output:\n${order}`);
