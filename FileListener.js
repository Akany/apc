var fs = require('fs'),
	eventEmitter = require('events').EventEmitter,
	fl = function (config) {
		this.init(config);
	};

fl.prototype = {
	init: function (config) {
		this.setFileName(config.fileName);
		this.initStartPoint();
		this._clearTempData();
		this.start()
	},

	initStartPoint: function () {
		var me = this;
		fs.stat(this.fileName, function (error, stat) {
			me.setStartPoint(stat.size);
		});
	},

	_clearTempData: function () {
		this._tempData = ''
	},

	getFileName: function () {
		return this.fileName;
	},

	getStartPoint: function () {
		return this.startPoint;
	},

	getFileStreamConfig: function () {
		return {
			start: this.getStartPoint()
		};
	},

	start: function () {
		fs.watchFile(this.getFileName(), this.onWatchedFileChanged.bind(this));
	},

	setFileName: function (fileName) {
		this.fileName = fileName;
	},

	setStartPoint: function (startOffset) {
		this.startPoint = startOffset;
	},

	onWatchedFileChanged: function (event, file) {
		this.readNewData();
	},

	onEndData: function () {
		var startPoint = this.getStartPoint(),
			tempDataLength = this._tempData.length;
		this.setStartPoint(startPoint + tempDataLength);
		this.emit('data', this._tempData);
		this._clearTempData();
	},

	onDataChunk: function (chunk) {
		this._tempData += chunk;
	},

	readNewData: function () {
		var fileStreamConfig = this.getFileStreamConfig(),
			fileStream = fs.createReadStream(this.getFileName(), fileStreamConfig);
		fileStream.on('data', this.onDataChunk.bind(this));
		fileStream.on('end', this.onEndData.bind(this));
	}

};

fl.prototype.__proto__ = eventEmitter.prototype;
module.exports = fl;
