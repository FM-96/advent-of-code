const startTime = Date.now();
const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-10.txt'), 'utf8').trim();

const lines = data.split('\n');

const regex = /position=<(.+), (.+)> velocity=<(.+), (.+)>/;
const points = [];

for (const line of lines) {
	const match = regex.exec(line);
	points.push({
		position: {
			x: Number(match[1].trim()),
			y: Number(match[2].trim()),
		},
		velocity: {
			x: Number(match[3].trim()),
			y: Number(match[4].trim()),
		},
	});
}

class Field {
	constructor() {
		this._maxX = Number.NEGATIVE_INFINITY;
		this._maxY = Number.NEGATIVE_INFINITY;
		this._minX = Number.POSITIVE_INFINITY;
		this._minY = Number.POSITIVE_INFINITY;
		this._points = new Set();
	}

	add(x, y) {
		this._maxX = Math.max(this._maxX, x);
		this._maxY = Math.max(this._maxY, y);
		this._minX = Math.min(this._minX, x);
		this._minY = Math.min(this._minY, y);
		this._points.add(`${x},${y}`);
	}

	draw() {
		let output = '';
		for (let y = this._minY; y <= this._maxY; ++y) {
			for (let x = this._minX; x <= this._maxX; ++x) {
				output += this._points.has(`${x},${y}`) ? '#' : '.';
			}
			output += '\n';
		}
		return output.slice(0, -1);
	}

	get height() {
		return (this._maxY + 1) - this._minY;
	}

	get width() {
		return (this._maxX + 1) - this._minX;
	}
}

let time = 0;
let field;

for (;;) {
	field = new Field();
	for (const point of points) {
		field.add(point.position.x, point.position.y);
		point.position.x += point.velocity.x;
		point.position.y += point.velocity.y;
	}
	if (field.height === 10) {
		console.log(`Output Part 1:\n${field.draw()}\nOutput Part 2:\n${time}`);
		console.log(`${Date.now() - startTime} ms`);
		break;
	}
	time++;
}
