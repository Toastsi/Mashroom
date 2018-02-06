/*
* @Author: Lear
* @Date:   2017-09-14 14:32:39
* @Last Modified by:   Lear
* @Last Modified time: 2017-09-19 04:39:29
*/

'use strict';

var _tool = require('util/tools.js');

var _product = {
	//获取商品列表
	getProductList : function(listParam,resolve,reject){
		_tool.request({
			url 	: _tool.getServerUrl('/product/list.do'),
			data 	: listParam,
			success : resolve,
			error 	: reject
		});
	},
	//获取商品详细信息
	getProductDetail : function(productId,resolve,reject){
		_tool.request({
			url 	: _tool.getServerUrl('/product/detail.do'),
			data 	: {
				productId : productId
			},
			success : resolve,
			error 	: reject
		});
	}
}
module.exports = _product;