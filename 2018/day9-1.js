const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-9.txt'), 'utf8').trim();

const match = /(\d+) players; last marble is worth (\d+) points/.exec(data);
const players = Number(match[1]);
const marbles = Number(match[2]);

const circle = [0];
let currentMarbleIndex = 0;
const scores = new Map();

// console.log(circle.map((e, i) => (currentMarbleIndex === i ? `(${e})` : `${e}`)).join(' '));

for (let activePlayer = 0, nextMarble = 1; nextMarble <= marbles; ++nextMarble, activePlayer = (activePlayer + 1) % players) {
	if (nextMarble % 23 === 0) {
		let activePlayerScore = scores.get(activePlayer) || 0;
		activePlayerScore += nextMarble;
		const removeIndex = (currentMarbleIndex - 7) % circle.length;
		activePlayerScore += circle.splice(removeIndex, 1)[0];
		currentMarbleIndex = removeIndex;
		scores.set(activePlayer, activePlayerScore);
	} else {
		const insertIndex = (currentMarbleIndex + 2) % circle.length;
		circle.splice(insertIndex, 0, nextMarble);
		currentMarbleIndex = insertIndex;
	}
	// console.log(circle.map((e, i) => (currentMarbleIndex === i ? `(${e})` : `${e}`)).join(' '));
}

const highestScore = Array.from(scores.values()).sort((a, b) => b - a)[0];

console.log(`Output:\n${highestScore}`);
