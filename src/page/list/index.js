/*
* @Author: Lear
* @Date:   2017-09-18 15:05:55
* @Last Modified by:   Lear
* @Last Modified time: 2017-09-19 03:16:09
*/

'use strict';
require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _tool 			= require('util/tools.js');
var _product 		= require('service/product-service.js');
var templateIndex 	= require('./index.string');
var Pagination 		= require('util/pagination/index.js');

var page = {
	data : {
		listParam : {
			keyword : _tool.getUrlParam('keyword') || '',
			categoryId : _tool.getUrlParam('categoryId') || '',
			orderBy : _tool.getUrlParam('orderBy') || 'default',
			pageNum : _tool.getUrlParam('pageNum') || 1,
			pageSize : _tool.getUrlParam('pageSize') || 20
		}
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadList();
	},
	bindEvent : function(){
		var _this = this;
		//排序点击事件
		$('.sort-item').click(function(){
			var $this = $(this);
			//点击排序/价格排序按钮时,初始化列表页
			_this.data.listParam.pageNum = 1;
			//点击默认排序
			if($this.data('type') === 'default'){
				//已经是active样式
				if($this.hasClass('active')){
					return;
				}
				//其它
				else{
					$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
			}
			//点击价格排序
			else if($this.data('type') === 'price'){
				//active class的处理
				$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
				//升序 降序处理
				if(!$this.hasClass('asc')){
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				}
				else{
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}
			}
			//重新加载列表
			_this.loadList();
		});
	},
	//加载list数据
	loadList : function(){
		var _this = this,
			listHtml = '',
			listParam = this.data.listParam,
			$pListCon = $('.p-list-con');
		$pListCon.html('<div class="loading"></div>');
		//删除参数中不必要的字段
		listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
		//请求接口
		_product.getProductList(listParam,function(res){
			listHtml = _tool.renderHtml(templateIndex,{
				list : res.list
			});
			$pListCon.html(listHtml);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage : res.prePgae,
				hasNextPage : res.hasNextPage,
				nextPrev : res.nextPrev,
				pageNum : res.pageNum,
				pages : res.pages
			});
		},function(errMsg){
			_tool.errorTips(errMsg);
		});
	},
	//加载分页信息
	loadPagination : function(pageInfo){
		var _this = this;
		//封装组件有类和对象两种方式  类
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({},pageInfo,{
			container : $('.pagination'),
			//回调函数
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadList();
			}
		}));
	}
};
$(function(){
	page.init();
});