import IndexController from './IndexController';
const controllerInit = {
	getAllrouters(app, router){
		app.use(router(_=>{
			_.get('/', IndexController.indexAction())
			
		}))

	}
}
export default controllerInit;
