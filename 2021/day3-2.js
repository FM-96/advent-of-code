const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(2021, 3);

	const numbers = input.split('\n').map(e => e.trim());

	let ogRating = numbers.slice();
	let csRating = numbers.slice();

	for (let i = 0; i < numbers[0].length; ++i) {
		if (ogRating.length > 1) {
			const ogBitCriteria = getBitCriteria(ogRating, i, 'most');
			ogRating = ogRating.filter(e => e[i] === ogBitCriteria);
		}
		if (csRating.length > 1) {
			const csBitCriteria = getBitCriteria(csRating, i, 'least');
			csRating = csRating.filter(e => e[i] === csBitCriteria);
		}
	}

	console.log('Answer: ' + (parseInt(ogRating[0], 2) * parseInt(csRating[0], 2)));
}

function getBitCriteria(arr, i, criteria) {
	let ones = 0;
	let zeroes = 0;
	for (const number of arr) {
		if (number[i] === '1') {
			ones++;
		}
		if (number[i] === '0') {
			zeroes++;
		}
	}
	if (criteria === 'most') {
		return (ones >= zeroes) ? '1' : '0';
	}
	if (criteria === 'least') {
		return (ones < zeroes) ? '1' : '0';
	}
}
