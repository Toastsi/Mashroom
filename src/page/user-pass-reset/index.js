/*
* @Author: Lear
* @Date:   2017-09-13 21:44:08
* @Last Modified by:   Lear
* @Last Modified time: 2017-09-15 11:01:04
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _tool = require('util/tools.js');

//表单错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('');
	}
};
//page逻辑部分
var page = {
	data : {
		username : '',
		question : '',
		answer : '',
		token : ''
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadStepUsername();
	},
	bindEvent : function(){
		//this放入jQuery对象里,要先引用
		var _this = this;
		//登录按钮的点击
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			//输入用户名后下一步按钮的点击
			if(username){
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				},function(errMsg){
					formError.show(errMsg);
				});
			}
			//用户名不存在
			else{
				formError.show('请输入用户名');
			}
		});
		//输入密码提示问题答案中的按钮点击
		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			//密码提示问题答案存在
			if(answer){
				//检查密码提示问题的答案
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer : answer
				},function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();
				},function(errMsg){
					formError.show(errMsg);
				});
			}
			//用户名不存在
			else{
				formError.show('请输入密码提示问题的答案');
			}
		});
		//输入密码提示问题答案中的按钮点击
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			//密码提示问题答案存在
			if(password && password.length >= 6){
				//检查密码提示问题的答案
				_user.resetPassword({
					username : _this.data.username,
					passwordNew : password,
					forgetToken : _this.data.token
				},function(res){
					window.location.href = './result.html?type=pass-reset';
				},function(errMsg){
					formError.show(errMsg);
				});
			}
			//密码为空
			else{
				formError.show('请输入不少于6位的新密码');
			}
		});
	},
	//加载输入用户名的一步
	loadStepUsername : function(){
		$('.step-username').show();
	},
	//加载输入密码提示问题答案的一步
	loadStepQuestion : function(){
		//清除错误提示
		formError.hide();
		//清除上一步,做容器的切换
		$('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);
	},
	//加载输入新密码的一步
	loadStepPassword : function(){
		//清除错误提示
		formError.hide();
		//清除上一步,做容器的切换
		$('.step-question').hide().siblings('.step-password').show();
	},
};
$(function(){
	page.init();
});