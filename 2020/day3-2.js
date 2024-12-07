const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(2020, 3);

	const map = input.split('\n');

	const bottom = map.length - 1;

	const slopes = [
		{x: 1, y: 1},
		{x: 3, y: 1},
		{x: 5, y: 1},
		{x: 7, y: 1},
		{x: 1, y: 2},
	];

	const total = [];
	for (const slope of slopes) {
		let trees = 0;
		const pos = {x: 0, y: 0};
		while (pos.y < bottom) {
			pos.x += slope.x;
			pos.y += slope.y;

			const row = map[pos.y];
			if (row[pos.x % row.length] === '#') {
				trees++;
			}
		}
		total.push(trees);
	}
	console.log('Answer: ' + total.reduce((acc, cur) => acc * cur));
}
