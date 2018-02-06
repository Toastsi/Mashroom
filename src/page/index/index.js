/*
* @Author: Lear
* @Date:   2017-09-13 13:30:45
* @Last Modified by:   Lear
* @Last Modified time: 2017-09-17 16:47:24
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
require('util/slider/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./banner.string');
var _tool = require('util/tools.js');

$(function(){

	//渲染banner的html
	var bannerHtml = _tool.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	//初始化banner
	var $slider = $('.banner').unslider({
		dots: true
	});
	// < >按钮操作的事件绑定
	$('.banner-con .banner-arrow').click(function(){
		var forward = $(this).hasClass('prev') ? 'prev' : 'next';
		$slider.data('unslider')[forward]();
	});
});


//定义一个变量_tool,将请求的tools.js文件赋予给它
// var _tool = require('util/tools.js');

//调用util/tools.js文件里定义的request()方法
// _tool.request({
// 	url : '/product/list.do?keyword=1',
// 	success : function(res){
// 		console.log(res);
// 	},
// 	error : function(errMsg){
// 		console.log(errMsg);
// 	}
// });

//console.log(_tool.getUrlParam('test'));

// var html = '<div>{{data}}</div>';
// var data = {
// 	data : 123
// }

// console.log(_tool.renderHtml(html,data));