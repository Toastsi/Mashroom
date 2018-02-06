/*
* @Author: Lear
* @Date:   2017-09-14 14:32:39
* @Last Modified by:   Lear
* @Last Modified time: 2017-09-15 13:15:37
*/

'use strict';

var _tool = require('util/tools.js');

var _user = {
	//用户登录
	login : function(userInfo,resolve,reject){
		_tool.request({
			url 	: _tool.getServerUrl('/user/login.do'),
			data 	: userInfo,
			method 	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	//检查用户名
	checkUsername : function(username,resolve,reject){
		_tool.request({
			url 		: _tool.getServerUrl('/user/check_valid.do'),
			data 		: {
				type : 'username',
				str : username
			},
			method 		: 'POST',
			success 	: resolve,
			error 		: reject
		});
	},
	//用户注册
	register : function(userInfo,resolve,reject){
		_tool.request({
			url 	: _tool.getServerUrl('/user/register.do'),
			data 	: userInfo,
			method 	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	//检查登录状态
	checkLogin : function(resolve,reject){
		_tool.request({
			url 	: _tool.getServerUrl('/user/get_user_info.do'),
			method 	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	//获取用户密码提示问题
	getQuestion : function(username,resolve,reject){
		_tool.request({
			url 			: _tool.getServerUrl('/user/forget_get_question.do'),
			data 			: {
				username : username
			},
			method 			: 'POST',
			success 		: resolve,
			error 			: reject
		});
	},
	//检查密码提示问题答案
	checkAnswer : function(userInfo,resolve,reject){
		_tool.request({
			url 	: _tool.getServerUrl('/user/forget_check_answer.do'),
			data 	: userInfo,
			method 	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	resetPassword : function(userInfo,resolve,reject){
		_tool.request({
			url 	: _tool.getServerUrl('/user/forget_reset_password.do'),
			data 	: userInfo,
			method 	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	getUserInfo : function(resolve,reject){
		_tool.request({
			url 	: _tool.getServerUrl('/user/get_information.do'),
			method 	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	updateUserInfo : function(userInfo,resolve,reject){
		_tool.request({
			url 	: _tool.getServerUrl('/user/update_information.do'),
			data 	: userInfo,
			method 	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	//登录状态下更新密码
	updatePassword : function(userInfo,resolve,reject){
		_tool.request({
			url 	: _tool.getServerUrl('/user/reset_password.do'),
			data 	: userInfo,
			method 	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	//登出
	logout : function(resolve,reject){
		_tool.request({
			url 	: _tool.getServerUrl('/user/logout.do'),
			method 	: 'POST',
			success : resolve,
			error 	: reject
		});
	}
}
module.exports = _user;