'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let config = {
	"viewDir": _path2.default.join(__dirname, '..', 'views/'),
	"staticDir": _path2.default.join(__dirname, '..', 'assets'),
	'env': process.env.NODE_ENV
	//todo 增加了无用的代码，导致当前的逻辑过长，导致代码量大，hot-reload，对代码进行清洗
};const init = () => {
	if (process.env.NODE_ENV == 'development') {
		const localConfig = {
			port: 8081
		};
		config = _lodash2.default.extend(config, localConfig);
	}
	if (process.env.NODE_ENV == 'production') {
		const proConfig = {
			port: 8081
		};
		config = _lodash2.default.extend(config, proConfig);
	}
	return config;
};
exports.default = init();