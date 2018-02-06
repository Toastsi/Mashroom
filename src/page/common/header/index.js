/*
* @Author: Lear
* @Date:   2017-09-14 20:57:17
* @Last Modified by:   Lear
* @Last Modified time: 2017-09-18 15:15:17
*/

'use strict';
require('./index.css');
var _tool = require('util/tools.js');
//通用页面头部
var header = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	//回填信息
	onLoad : function(){
		var keyword = _tool.getUrlParam('keyword');
		//keyword存在,则回填输入框
		if(keyword){
			$('#search-input').val(keyword);
		};
	},
	bindEvent : function(){
		var _this = this;
		//点击搜索按钮以后,做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		//输入回车后,做搜索提交
		$('#search-input').keyup(function(e){
			//13为回车键keyCode
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
	},
	//搜索的提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		//如果提交时有keyword,正常跳转到list页
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}
		//如果keyword为空,直接返回首页
		else{
			_tool.goHome();
		}
	}
};

//若header不需要对外输出(方法都是内部的,并不需要外部调用)
//module.exports = header.init();

//直接调用
header.init();