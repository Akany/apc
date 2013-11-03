var eventEmitter = require('events').EventEmitter,
	parser = function () {

	};

parser.prototype = {
	reg: /\s:\s(\S+).*\[item:(\d+)/,
	items: [
		'186000051', '186000052', '186000053', '186000054',
		'186000055', '186000056', '186000057', '186000058',
		'186000059', '186000060', '186000061', '186000062',
		'186000063', '186000064', '186000065', '186000066'
	],
	parse: function (data) {
		data.split('\n').forEach(this.parseDataChunk.bind(this));
	},

	parseDataChunk: function (chunk) {
		var match;
		if (match = chunk.match(this.reg)) {
			if (this.items.indexOf(match[2]) > -1) {
				this.emit('relict', match[1], match[2]);
			}
		}
	}
};

parser.prototype.__proto__ = eventEmitter.prototype;
module.exports = parser;