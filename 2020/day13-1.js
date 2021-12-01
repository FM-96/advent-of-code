const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(13);

	let [earliestDeparture, schedule] = input.split('\n');
	earliestDeparture = Number(earliestDeparture);

	const busIds = schedule.split(',').filter(e => e !== 'x').map(e => Number(e));

	let time = earliestDeparture;
	for (;;) {
		const bus = busIds.find(e => time % e === 0);
		if (!bus) {
			time++;
			continue;
		}

		console.log('Answer: ' + ((time - earliestDeparture) * bus));
		break;
	}
}
