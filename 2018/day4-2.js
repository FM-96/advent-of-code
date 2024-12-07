const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-4.txt'), 'utf8');
const records = data.split('\n').filter(e => e !== '');

records.sort();

const shifts = records.reduce((prev, cur) => {
	if (cur.includes('begins shift')) {
		const newShift = [cur];
		prev.push(newShift);
	} else {
		prev[prev.length - 1].push(cur);
	}
	return prev;
}, []);

const guards = new Map();

for (const shift of shifts) {
	const guardId = Number(/#(\d+)/.exec(shift[0])[1]);
	const guard = guards.get(guardId) || {guardId, minutesAsleep: new Map()};

	let startTime;
	for (let i = 1; i < shift.length; ++i) {
		if (shift[i].includes('falls asleep')) {
			startTime = Number(/:(\d\d)]/.exec(shift[i])[1]);
		} else {
			const endTime = Number(/:(\d\d)]/.exec(shift[i])[1]);
			for (let j = startTime; j < endTime; ++j) {
				guard.minutesAsleep.set(j, (guard.minutesAsleep.get(j) || 0) + 1);
			}
		}
	}
	guards.set(guardId, guard);
}

let mostAsleepMinute, mostTimesAsleep = 0, mostAsleepGuard;
for (const guard of guards.values()) {
	for (const [minute, timesAsleep] of guard.minutesAsleep.entries()) {
		if (timesAsleep > mostTimesAsleep) {
			mostTimesAsleep = timesAsleep;
			mostAsleepMinute = minute;
			mostAsleepGuard = guard;
		}
	}
}

console.log(`${mostAsleepGuard.guardId} * ${mostAsleepMinute}`);
console.log(`Output:\n${mostAsleepGuard.guardId * mostAsleepMinute}`);
