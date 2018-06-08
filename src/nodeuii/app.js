import Koa from 'koa';
import { createContainer,Lifetime, asClass, asValue} from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa';
import config from './config';
import log4js from 'log4js';
import errorHandler from './middwares/errorHandler.js';
import serve from 'koa-static';
import render from 'koa-swig';
import co from 'co';
const app = new Koa();
//ioc的控制反转的容器
const container = createContainer();
//每次请求new
app.use(scopePerRequest(container));
//装载所有的models到controller，完成利用切面注入
container.loadModules([__dirname + '/models/*.js'],{
	formatName: 'camelCase',
	resolverOptions:{
		lifetime: Lifetime.SCOPED
	}
})

log4js.configure({
	appenders: { cheese: { type: 'file', filename: './dist/logs/yd.log'} },
	categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');
//错误处理中心
errorHandler.error(app, logger);
//集中处理所有的路由
app.use(loadControllers(__dirname + '/controllers/*.js',{ cwd: __dirname}));
//controllerInit.getAllrouters(app, router);
//静态资源管理
app.use(serve(config.staticDir));

app.context.render = co.wrap(render({
	root: config.viewDir,
	autoescape: true,
	cache: 'memory', // disable, set to false
	varControls: ["[[","]]"],
	ext: 'html'
}));

app.listen(config.port,()=>{
	console.log(`ydweb listening on ${config.port}`)
});





