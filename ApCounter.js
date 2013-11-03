var apc = function () {

	};

apc.prototype = {
	personsAp: {},
	relicts: {
		// crown
		186000054: 2400,
		186000053: 4800,
		186000052: 7200,
		186000051: 9600,
		// goblets
		186000058: 1200,
		186000057: 2400,
		186000056: 3600,
		186000055: 4800,
		//  seals
		186000062: 600,
		186000061: 1200,
		186000060: 1800,
		186000059: 2400,
		// icons
		186000066: 300,
		186000065: 600,
		186000064: 900,
		186000063: 1200
	},
	addPersonRelict: function (personName, relictId) {
		this.addPersonAp(personName, this.getRelictPoints(relictId));
	},

	addPersonAp: function (personId, points) {
		this.personsAp[personId] = this.getPersonAp(personId) + points;
	},

	getRelictPoints: function (relictId) {
		return this.relicts[relictId];
	},

	getPersonAp: function (personId) {
		return this.personsAp[personId] || 0;
	},

	setPersonAp: function (personId, points) {
		this[personId] = points;
	},

	showPlayersScore: function () {
		var players = [],
			formatedString = '';
		for (var player in this.personsAp) {
			formatedString = player + ' : ' + this.personsAp[player];
			players.push(formatedString);
		}
		return	players.join(', ');
	}

};

module.exports = apc;