//import IndexModel from '../models/IndexModel.js';
//const indexController = {
//	indexAction(){
//		return async(ctx,next)=>{
//			const indexModelInx = new IndexModel();
//			const result = await indexModelInx.getData();
//			ctx.body = await ctx.render('index/pages/index',{data: result});
//		}
//	}
//}
//export default indexController;

import { route, GET, POST, before } from 'awilix-koa' // or `awilix-router-core`
@route('/')
@route('/index.html')
export default class IndexController {
	constructor({ indexModel }) {
		this.indexModel = indexModel
	}

	@GET()
	async getData(ctx) {
		const result = await this.indexModel.getData();
		ctx.body = await ctx.render('index/pages/index',{data: result});
	}
}
