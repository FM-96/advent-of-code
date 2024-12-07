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
}

const com = new Location('COM', null);
com.populate(orbits);

console.log(`Result:\n${com.totalOrbits}`);
