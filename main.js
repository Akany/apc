var FileListener = require('./FileListener'),
	fileListener = new FileListener({
		fileName: 'log.txt'
	});

fileListener.on('data', function (data) {
	console.log(data);
});
