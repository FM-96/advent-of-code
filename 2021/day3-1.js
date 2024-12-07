const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(2021, 3);

	const numbers = input.split('\n').map(e => e.trim());

	let gammaRate = '';
	for (let i = 0; i < numbers[0].length; ++i) {
		let ones = 0;
		let zeroes = 0;
		for (const number of numbers) {
			if (number[i] === '1') {
				ones++;
			}
			if (number[i] === '0') {
				zeroes++;
			}
		}
		gammaRate += (ones > zeroes) ? '1' : '0';
	}
	const epsilonRate = gammaRate.split('').map(e => (e === '0' ? '1' : '0')).join('');

	console.log('Answer: ' + (parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)));
}
