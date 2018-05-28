import IndexModel from '../models/IndexModel.js';
const indexController = {
	indexAction(){
		return async(ctx,next)=>{
			const indexModelInx = new IndexModel();
			const result = await indexModelInx.getData();
			ctx.body = await ctx.render('index',{data: result});
		}
	}
}
export default indexController;