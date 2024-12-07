const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-7.txt'), 'utf8').trim();

const instructions = data.split('\n');

const regex = /Step (.) must be finished before step (.) can begin/;

const requirements = new Map();

for (const instruction of instructions) {
	const match = regex.exec(instruction);
	const [, requirement, stepId] = match;
	const step = requirements.get(stepId) || {stepId, prerequisites: [], duration: duration(stepId)};
	step.prerequisites.push(match[1]);
	requirements.set(stepId, step);
	const requiredStep = requirements.get(requirement) || {stepId: requirement, prerequisites: [], duration: duration(requirement)};
	requirements.set(requirement, requiredStep);
}

const NUMBER_OF_WORKERS = 5;

const workers = [];
for (let i = 0; i < NUMBER_OF_WORKERS; ++i) {
	workers.push({
		workingOn: '',
		finished: 0,
	});
}

let time = 0;

for (;;) {
	for (const worker of workers) {
		if (worker.finished <= time) {
			requirements.delete(worker.workingOn);
			for (const [key, value] of requirements.entries()) {
				if (value.prerequisites.includes(worker.workingOn)) {
					value.prerequisites.splice(value.prerequisites.indexOf(worker.workingOn), 1);
					requirements.set(key, value);
				}
			}
			worker.workingOn = '.';
			worker.finished = null;
		}
	}
	const ready = Array.from(requirements.values()).filter(e => e.prerequisites.length === 0);
	if (ready.length !== 0) {
		ready.sort();
		for (const idleWorker of workers.filter(e => e.finished === null)) {
			const nextStep = ready.shift();
			requirements.delete(nextStep.stepId);
			idleWorker.workingOn = nextStep.stepId;
			idleWorker.finished = time + nextStep.duration;
			if (ready.length === 0) {
				break;
			}
		}
	}
	console.log(`${time}\t${workers.map(e => `${e.workingOn}${e.finished ? ` (${e.finished})` : ''}`).join('\t')}\t${requirements.size}`);
	if (requirements.size === 0 && workers.filter(e => e.finished === null).length === NUMBER_OF_WORKERS) {
		break;
	}
	time++;
}

console.log(`Output:\n${time}`);

function duration(stepId) {
	// code point of 'A' === 65
	return stepId.codePointAt(0) - 4;
}
