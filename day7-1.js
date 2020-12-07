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
			const [, color] = /\d+ (.+) bags?/.exec(e);
			return color;
		});
		ruleSet.set(outer, innerArr.filter(e => e));
	}

	const STARTING_COLOR = 'shiny gold';
	const possibleContainers = new Set();
	for (const [outer, inner] of ruleSet.entries()) {
		if (inner.includes(STARTING_COLOR)) {
			possibleContainers.add(outer);
		}
	}
	let foundNew = true;
	while (foundNew) {
		foundNew = false;

		for (const value of possibleContainers.values()) {
			for (const [outer, inner] of ruleSet.entries()) {
				if (inner.includes(value)) {
					if (!possibleContainers.has(outer)) {
						foundNew = true;
						possibleContainers.add(outer);
					}
				}
			}
		}
	}

	console.log('Answer: ' + possibleContainers.size);
}
