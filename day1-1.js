async function main() {
	const input = await require('./getInput.js')(1); // eslint-disable-line global-require

	const entries = input.split('\n').map(e => Number(e));

	for (let i = 0; i < entries.length; ++i) {
		for (let j = i + 1; j < entries.length; ++j) {
			if (entries[i] + entries[j] === 2020) {
				console.log('Answer: ' + (entries[i] * entries[j]));
				return;
			}
		}
	}
}

main();
