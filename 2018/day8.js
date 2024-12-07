const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-8.txt'), 'utf8').trim();

const numbers = data.split(' ').map(e => Number(e));

class Node {
	constructor(numberArr) {
		this._children = [];
		this._metadata = [];

		if (numberArr) {
			const amountChildren = numberArr[0];
			const amountMetadata = numberArr[1];
			let offset = 2;
			for (let i = 0; i < amountChildren; ++i) {
				const childNode = new Node(numberArr.slice(offset));
				offset += childNode.length;
				this._children.push(childNode);
			}
			this._metadata.push(...numberArr.slice(offset, offset + amountMetadata));
		}
	}

	get length() {
		let length = 2;
		this._children.forEach(e => {
			length += e.length;
		});
		length += this._metadata.length;
		return length;
	}

	get metadataSum() {
		let sum = 0;
		this._children.forEach(e => {
			sum += e.metadataSum;
		});
		this._metadata.forEach(e => {
			sum += e;
		});
		return sum;
	}

	get value() {
		if (this._children.length === 0) {
			return this._metadata.reduce((prev, cur) => prev + cur);
		}
		let value = 0;
		this._metadata.forEach(e => {
			const child = this._children[e - 1];
			if (child) {
				value += child.value;
			}
		});
		return value;
	}
}

const root = new Node(numbers);

console.log(`Output Part 1:\n${root.metadataSum}`);
console.log(`Output Part 2:\n${root.value}`);
