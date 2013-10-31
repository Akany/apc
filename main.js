var FileListener = require('./FileListener'),
	ApcParser = require('./ApcParser'),
	ApCounter = require('./ApCounter'),
	exec = require('child_process').exec,
	fileListener = new FileListener({
		fileName: 'chat.log'
	}),
	apcParser = new ApcParser(),
	apc = new ApCounter();

fileListener.on('data', function (data) {
	apcParser.parse(data);
});

apcParser.on('relict', function (playerName, relictId) {
	apc.addPersonRelict(playerName, relictId);
	console.log(apc.showPlayersScore());
	exec('echo ' + apc.showPlayersScore() + ' | clip');
});
