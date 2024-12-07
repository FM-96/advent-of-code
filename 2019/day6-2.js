const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input-6.txt'), 'utf8').trim();

const orbits = data.split('\n').map(e => e.split(')'));

class Location {
	constructor(name, center) {
		this.name = name;
		this.center = center;
		this.satellites = [];
	}

	populate(orbitData) {
		this.satellites = orbitData.filter(e => e[0] === this.name).map(e => new Location(e[1], this));
		this.satellites.forEach(e => e.populate(orbitData));
	}

	get totalOrbits() {
		return this.orbits + this.satellites.map(e => e.totalOrbits).reduce((prev, cur) => prev + cur, 0);
	}

	get orbits() {
		return this.center ? 1 + this.center.orbits : 0;
	}

	find(name) {
		if (this.name === name) {
			return this;
		}
		for (const satellite of this.satellites) {
			const found = satellite.find(name);
			if (found) {
				return found;
			}
		}
		return null;
	}

	get path() {
		return [this.name, ...(this.center ? this.center.path : [])];
	}
}

const com = new Location('COM', null);
com.populate(orbits);

const youPath = com.find('YOU').path;
const sanPath = com.find('SAN').path;

let minimumDistance;
for (let i = 1; i < youPath.length; ++i) {
	const index = sanPath.indexOf(youPath[i]);
	if (index !== -1) {
		minimumDistance = (i - 1) + (index - 1);
		break;
	}
}

console.log(`Result:\n${minimumDistance}`);
