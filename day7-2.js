const getInput = require('./getInput.js');

main();

async function main() {
	const input = await getInput(7);

	const rules = input.split('\n');

	const ruleSet = new Map();

	for (const rule of rules) {
		const [, outer, innerStr] = /^(.+) bags? contain (.+)\.$/.exec(rule);
		const innerArr = innerStr.split(',').map(e => {
			if (e === 'no other bags') {
				return null;
			}
			const [, amount, color] = /(\d+) (.+) bags?/.exec(e);
			return {
				amount,
				color,
			};
		});
		ruleSet.set(outer, innerArr.filter(e => e));
	}

	const STARTING_COLOR = 'shiny gold';
	const bagsToCheck = new Set([{color: STARTING_COLOR}]);
	let requiredBags = 0;

	for (const value of bagsToCheck.values()) {
		const innerBags = ruleSet.get(value.color);
		for (const inner of innerBags) {
			requiredBags += Number(inner.amount);
			for (let i = 0; i < inner.amount; ++i) {
				bagsToCheck.add({color: inner.color});
			}
		}
		bagsToCheck.delete(value);
	}

	console.log('Answer: ' + requiredBags);
}
