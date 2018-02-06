/*
* @Author: Lear
* @Date:   2017-09-15 11:23:26
* @Last Modified by:   Lear
* @Last Modified time: 2017-09-15 13:19:33
*/

'use strict';
require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide 		= require('page/common/nav-side/index.js');
var _tool 			= require('util/tools.js');
var _user 			= require('service/user-service.js');

//page逻辑部分
var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'user-pass-update'
		});
	},
	//全局监听一个事件,通过事件冒泡
	//点击提交按钮后的动作
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				password 		: $.trim($('#password').val()),
				passwordNew 		: $.trim($('#password-new').val()),
				passwordConfirm 	: $.trim($('#password-confirm').val())
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				//更改用户信息
				_user.updatePassword({
					passwordOld : userInfo.password,
					passwordNew : userInfo.passwordNew
				},function(res,msg){
					_tool.successTips(msg);
					window.location.href = './user-center.html';
				},function(){
					_tool.errorTips(errMsg);
				});
			}
			else{
				_tool.errorTips(validateResult.msg);
			}
		});
	},
	//验证字段信息
	validateForm : function(formData){
		var result = {
			status : false,
			msg : ''
		};
		//验证密码是否为空
		if(!_tool.validate(formData.password,'require')){
			result.msg = '原密码不能为空';
			return result;
		}
		//新密码长度
		if(!formData.passwordNew || formData.passwordNew.length < 6){
			result.msg = '新密码长度不得少于6位';
			return result;
		}
		//验证两次密码是否一致
		if(formData.passwordNew !== formData.passwordConfirm){
			result.msg = '两次输入密码不一致';
			return result;
		}
		//通过验证,返回正确提示
		result.status = true;
		result.msg = '验证通过';
		return result;
	} 
};
$(function(){
	page.init();
});