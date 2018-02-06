/*
* @Author: Lear
* @Date:   2017-09-14 21:58:17
* @Last Modified by:   Lear
* @Last Modified time: 2017-09-15 13:07:13
*/

'use strict';
require('./index.css');
var _tool = require('util/tools.js');
var templateIndex = require('./index.string');
//侧边导航
var navSide = {
	option : {
		name : '',
		navList : [
			{ name : 'user-center',desc : '个人中心',href : './user-center.html'},
			{ name : 'order-list',desc : '我的订单',href : './order-list.html'},
			{ name : 'user-pass-update',desc : '修改密码',href : './user-pass-update.html'},
			{ name : 'about',desc : '关于我的米米优客',href : './about.html'}
		],
	},
	init : function(option){
		//合并选项  将option合并入this.option,若是不想this.option发生改版,在this.option前加一个{},即可
		$.extend(this.option,option);
		this.renderNav();
	},
	//渲染导航菜单
	renderNav : function(){
		//计算active数据
		for(var i = 0,iLength = this.option.navList.length; i<iLength; i++){
			if(this.option.navList[i].name === this.option.name){
				this.option.navList[i].isActive = true;
			}
		};
		//渲染list数据
		var navHtml = _tool.renderHtml(templateIndex, {
			navList : this.option.navList
		});
		//把html放入容器
		$('.nav-side').html(navHtml);
	}
};

module.exports = navSide;
