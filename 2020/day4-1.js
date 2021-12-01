const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(4);

	const requiredFields = [
		'byr',
		'iyr',
		'eyr',
		'hgt',
		'hcl',
		'ecl',
		'pid',
	];

	const passports = input.split('\n\n');

	let valid = 0;
	for (const passport of passports) {
		const fields = passport.split(/ |\n/).map(e => e.split(':')[0]);
		if (requiredFields.every(e => fields.includes(e))) {
			valid++;
		}
	}

	console.log('Answer: ' + valid);
}
