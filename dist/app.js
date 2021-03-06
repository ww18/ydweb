'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _awilix = require('awilix');

var _awilixKoa = require('awilix-koa');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _errorHandler = require('./middwares/errorHandler.js');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
//ioc的控制反转的容器
const container = (0, _awilix.createContainer)();
//每次请求new
app.use((0, _awilixKoa.scopePerRequest)(container));
//装载所有的models到controller，完成利用切面注入
container.loadModules([__dirname + '/models/*.js'], {
	formatName: 'camelCase',
	resolverOptions: {
		lifetime: _awilix.Lifetime.SCOPED
	}
});

_log4js2.default.configure({
	appenders: { cheese: { type: 'file', filename: './dist/logs/yd.log' } },
	categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = _log4js2.default.getLogger('cheese');
//错误处理中心
_errorHandler2.default.error(app, logger);
//集中处理所有的路由
app.use((0, _awilixKoa.loadControllers)(__dirname + '/controllers/*.js', { cwd: __dirname }));
//controllerInit.getAllrouters(app, router);
//静态资源管理
app.use((0, _koaStatic2.default)(_config2.default.staticDir));

app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
	root: _config2.default.viewDir,
	autoescape: true,
	cache: 'memory', // disable, set to false
	varControls: ["[[", "]]"],
	ext: 'html'
}));

app.listen(_config2.default.port, () => {
	console.log(`ydweb listening on ${_config2.default.port}`);
});