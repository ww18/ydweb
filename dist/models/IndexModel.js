'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * @fileOverview 实现Index数据模型
 * @author ww 
 */

/**
 * IndexModel类，生成一段异步的数据
 * @class
 */
let IndexModel = class IndexModel {
	/**
 * @contractor
 * @param {string} app koa2上下文
 */
	constructor(app) {}
	/**
  * 获取数据的API
  * @return {Promise} 返回异步的处理结果
  *	@example
  * return new Promise
  * getData
  */
	getData() {
		return new Promise((resolve, reject) => {
			setTimeout(function () {
				resolve('hello IndexAction');
			}, 1000);
		});
	}

};
exports.default = IndexModel;