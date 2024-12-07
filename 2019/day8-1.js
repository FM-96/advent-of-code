const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-8.txt'), 'utf8').trim();

const layerSize = 25 * 6;
const layers = data.length / layerSize;

const image = [];

for (let i = 0; i < layers; ++i) {
	image[i] = [];
	for (let j = 0; j < 6; ++j) {
		image[i][j] = data.substr((layerSize * i) + (25 * j), 25).split('');
	}
}

const index = image.map((e, i) => {
	let zeroes = 0;
	e.forEach(row => {
		zeroes += row.filter(digit => digit === '0').length;
	});
	return {
		layer: i,
		zeroes,
	};
}).sort((a, b) => a.zeroes - b.zeroes)[0].layer;
const targetLayer = image[index];

let ones = 0;
let twos = 0;
targetLayer.forEach(row => {
	ones += row.filter(digit => digit === '1').length;
	twos += row.filter(digit => digit === '2').length;
});
const result = ones * twos;

console.log(`Result:\n${result}`);
