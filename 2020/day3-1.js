const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(2020, 3);

	const map = input.split('\n');

	const bottom = map.length - 1;

	let trees = 0;
	const pos = {x: 0, y: 0};
	while (pos.y < bottom) {
		pos.x += 3;
		pos.y += 1;

		const row = map[pos.y];
		if (row[pos.x % row.length] === '#') {
			trees++;
		}
	}
	console.log('Answer: ' + trees);
}
