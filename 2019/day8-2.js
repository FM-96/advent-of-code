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

const finalImage = [];

for (let i = 0; i < 6; ++i) {
	finalImage[i] = [];
	for (let j = 0; j < 25; ++j) {
		let color;
		for (let k = 0; k < image.length; ++k) {
			if (image[k][i][j] !== '2') {
				color = image[k][i][j];
				break;
			}
		}
		finalImage[i][j] = color;
	}
}

const result = finalImage.map(e => e.join('')).join('\n').replace(/0/g, ' ');

console.log(`Result:\n${result}`);
