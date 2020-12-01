require('dotenv').config();

const got = require('got');

const fs = require('fs');

module.exports = async function (day) {
	const file = `./input-${day}.txt`;
	let input;

	try {
		input = fs.readFileSync(file, 'utf-8');
	} catch (err) {
		console.log(`Input file for day ${day} not found, downloading it...`);
	}
	if (input) {
		return input;
	}

	input = await got(`https://adventofcode.com/${process.env.YEAR}/day/${day}/input`, {
		headers: {
			Cookie: `session=${process.env.SESSION}`,
		},
	}).text();
	input = input.trim();

	fs.writeFileSync(file, input);

	return input;
};
