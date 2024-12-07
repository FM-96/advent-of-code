const got = require('got');

const fs = require('fs');
const path = require('path');

require('dotenv').config({path: path.resolve(__dirname, '.env')});

module.exports = async function (year, day) {
	const file = path.resolve(__dirname, 'inputs', `input-${year}-${day}.txt`);
	let input;

	try {
		input = fs.readFileSync(file, 'utf-8');
	} catch (err) {
		console.log(`Input file for day ${day} not found, downloading it...`);
	}
	if (input) {
		return input.trim();
	}

	input = await got(`https://adventofcode.com/${year}/day/${day}/input`, {
		headers: {
			Cookie: `session=${process.env.SESSION}`,
		},
	}).text();
	input = input.trim();

	fs.writeFileSync(file, input);

	return input;
};
