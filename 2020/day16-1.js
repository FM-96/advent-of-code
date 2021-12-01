const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(16);

	const [formatInput, , nearbyTicketsInput] = input.split('\n\n');

	const nearbyTickets = nearbyTicketsInput.split('\n').slice(1).map(e => e.split(',').map(f => Number(f)));

	const format = new Map();

	for (const formatLine of formatInput.split('\n')) {
		const [, name, values] = /(.+): (.+)/.exec(formatLine);
		const ranges = values.split(' or ');
		const valid = [];
		for (const range of ranges) {
			const [start, finish] = range.split('-').map(e => Number(e));
			for (let i = start; i <= finish; ++i) {
				valid.push(i);
			}
		}
		format.set(name, valid);
	}

	let errorRate = 0;
	for (const ticket of nearbyTickets) {
		for (const field of ticket) {
			let valid = false;
			for (const value of format.values()) {
				if (value.includes(field)) {
					valid = true;
					break;
				}
			}
			if (!valid) {
				errorRate += field;
			}
		}
	}

	console.log('Answer: ' + errorRate);
}
