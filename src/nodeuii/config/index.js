import  _ from 'lodash';
import path from 'path';

let config = {
	"viewDir": path.join(__dirname, '..','views/'),
	"staticDir": path.join(__dirname, '..','assets'),
	'env': process.env.NODE_ENV
}
//todo 增加了无用的代码，导致当前的逻辑过长，导致代码量大，hot-reload，对代码进行清洗
const init = ()=>{
	if(process.env.NODE_ENV == 'development'){
		const localConfig = {
			port: 8081
		}
		config = _.extend(config, localConfig);
	}
	if(process.env.NODE_ENV == 'production'){
		const proConfig = {
			port: 8081
		}
		config = _.extend(config, proConfig);
	}
	return config;
}
export default init();
