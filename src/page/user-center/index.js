/*
* @Author: Lear
* @Date:   2017-09-15 11:16:03
* @Last Modified by:   Lear
* @Last Modified time: 2017-09-15 12:02:44
*/

'use strict';
require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide 		= require('page/common/nav-side/index.js');
var _tool 			= require('util/tools.js');
var _user 			= require('service/user-service.js');
var templateIndex 	= require('./index.string');

//page逻辑部分
var page = {
	init : function(){
		this.onLoad();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'user-center'
		});
		//加载用户信息
		this.loadUserInfo();
	},
	//加载用户信息
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _tool.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_tool.errorTips(errMsg);
		});
	}
};
$(function(){
	page.init();
});