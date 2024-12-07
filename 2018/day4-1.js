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
	const guard = guards.get(guardId) || {guardId, totalTimeAsleep: 0, minutesAsleep: new Map()};

	let startTime;
	for (let i = 1; i < shift.length; ++i) {
		if (shift[i].includes('falls asleep')) {
			startTime = Number(/:(\d\d)]/.exec(shift[i])[1]);
		} else {
			const endTime = Number(/:(\d\d)]/.exec(shift[i])[1]);
			guard.totalTimeAsleep += endTime - startTime;
			for (let j = startTime; j < endTime; ++j) {
				guard.minutesAsleep.set(j, (guard.minutesAsleep.get(j) || 0) + 1);
			}
		}
	}
	guards.set(guardId, guard);
}

const mostSleepingGuard = Array.from(guards.values()).sort((a, b) => b.totalTimeAsleep - a.totalTimeAsleep)[0];
const mostAsleepMinute = Array.from(mostSleepingGuard.minutesAsleep.entries()).sort((a, b) => b[1] - a[1])[0][0];

console.log(`${mostSleepingGuard.guardId} * ${mostAsleepMinute}`);
console.log(`Output:\n${mostSleepingGuard.guardId * mostAsleepMinute}`);
