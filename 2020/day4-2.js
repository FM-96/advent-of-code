const getInput = require('../getInput.js');

main();

async function main() {
	const input = await getInput(4);

	const requiredFields = {
		'byr': (val) => val.length === 4 && 1920 <= val && val <= 2002,
		'iyr': (val) => val.length === 4 && 2010 <= val && val <= 2020,
		'eyr': (val) => val.length === 4 && 2020 <= val && val <= 2030,
		'hgt': (val) => {
			const match = /(\d+)(cm|in)/.exec(val);
			if (!match) {
				return false;
			}
			if (match[2] === 'cm') {
				return 150 <= match[1] && match[1] <= 193;
			} else if (match[2] === 'in') {
				return 59 <= match[1] && match[1] <= 76;
			}
		},
		'hcl': (val) => /#[0-9a-f]{6}/.test(val),
		'ecl': (val) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val),
		'pid': (val) => val.length === 9,
	};

	const passports = input.split('\n\n');

	let valid = 0;
	for (const passport of passports) {
		const fields = passport.split(/ |\n/).map(e => e.split(':'));
		let fieldInvalid = false;
		for (const requiredField in requiredFields) {
			const field = fields.find(e => e[0] === requiredField);
			if (!field || !requiredFields[requiredField](field[1])) {
				fieldInvalid = true;
				break;
			}
		}
		if (!fieldInvalid) {
			valid++;
		}
	}

	console.log('Answer: ' + valid);
}
