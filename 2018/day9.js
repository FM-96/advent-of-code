const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-9.txt'), 'utf8').trim();

const match = /(\d+) players; last marble is worth (\d+) points/.exec(data);
const players = Number(match[1]);
const marbles = Number(match[2]);

class Marble {
	constructor(value) {
		this._value = value;
		this._clockwise = this;
		this._counterclockwise = this;
	}

	add(value) {
		if (value % 23 === 0) {
			let removedMarble = this;
			for (let i = 0; i < 7; ++i) {
				removedMarble = removedMarble._counterclockwise;
			}
			const newCurrentMarble = removedMarble._clockwise;
			Marble.connect(removedMarble._counterclockwise, removedMarble._clockwise);
			return {points: value + removedMarble.value, current: newCurrentMarble};
		} else {
			const nextClockwise = this._clockwise;
			const nextNextClockwise = this._clockwise._clockwise;
			const newMarble = new Marble(value);
			Marble.connect(nextClockwise, newMarble);
			Marble.connect(newMarble, nextNextClockwise);
			return {points: 0, current: newMarble};
		}
	}

	get value() {
		return this._value;
	}

	static connect(marble1, marble2) {
		marble1._clockwise = marble2;
		marble2._counterclockwise = marble1;
	}

	static drawCircle(start, current) {
		let marble = start;
		const circle = [];
		do {
			circle.push(marble === current ? `(${marble.value})` : `${marble.value}`);
			marble = marble._clockwise;
		} while (marble !== start);
		return circle.join(' ');
	}
}

let currentMarble = new Marble(0);
const scores = new Map();

for (let activePlayer = 0, nextMarble = 1; nextMarble <= marbles; ++nextMarble, activePlayer = (activePlayer + 1) % players) {
	const {points, current} = currentMarble.add(nextMarble);
	currentMarble = current;
	if (points > 0) {
		scores.set(activePlayer, (scores.get(activePlayer) || 0) + points);
	}
}

let highestScore = Array.from(scores.values()).sort((a, b) => b - a)[0];

console.log(`Output Part 1:\n${highestScore}`);

currentMarble = new Marble(0);
scores.clear();

for (let activePlayer = 0, nextMarble = 1; nextMarble <= marbles * 100; ++nextMarble, activePlayer = (activePlayer + 1) % players) {
	const {points, current} = currentMarble.add(nextMarble);
	currentMarble = current;
	if (points > 0) {
		scores.set(activePlayer, (scores.get(activePlayer) || 0) + points);
	}
}

highestScore = Array.from(scores.values()).sort((a, b) => b - a)[0];

console.log(`Output Part 2:\n${highestScore}`);
