const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-2.txt'), 'utf8');
const boxIds = data.split('\n').filter(e => e !== '');

let twoTimes = 0;
let threeTimes = 0;

for (const boxId of boxIds) {
	const letterMap = boxId.split('').reduce((prev, cur) => prev.set(cur, (prev.get(cur) || 0) + 1), new Map());
	let increaseTwo = false;
	let increaseThree = false;
	for (const v of letterMap.values()) {
		if (v === 2) {
			increaseTwo = true;
			if (increaseThree) {
				break;
			}
		} else if (v === 3) {
			increaseThree = true;
			if (increaseTwo) {
				break;
			}
		}
	}
	twoTimes += Number(increaseTwo);
	threeTimes += Number(increaseThree);
}

const checksum = twoTimes * threeTimes;

console.log(`Output:\n${checksum}`);
