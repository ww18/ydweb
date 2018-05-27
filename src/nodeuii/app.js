import Koa from 'koa';
import router  from 'koa-simple-router';
import controllerInit from './controllers/controllerInit.js';
import configure from './config';

const app = new Koa();
controllerInit.getAllrouters(app, router);

app.listen(configure.port,()=>{
	console.log(`ydweb listening on ${configure.port}`)
});





