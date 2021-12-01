const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(14);

	const program = input.split('\n');

	let mask;
	const mem = Array(36).fill(0);

	for (const instruction of program) {
		if (instruction.startsWith('mask = ')) {
			mask = instruction.slice('mask = '.length);
		} else {
			const match = /mem\[(\d+)] = (\d+)/.exec(instruction);
			const [addr, value] = [Number(match[1]), Number(match[2])];
			const valueStr = value.toString(2).padStart(36, '0');
			let maskedValueStr = '';
			for (let i = 0; i < mask.length; ++i) {
				if (mask[i] === 'X') {
					maskedValueStr += valueStr[i];
				} else {
					maskedValueStr += mask[i];
				}
			}
			mem[addr] = Number.parseInt(maskedValueStr, 2);
		}
	}
	console.log('Answer: ' + mem.reduce((acc, cur) => acc + cur));
}
