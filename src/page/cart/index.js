/*
* @Author: Lear
* @Date:   2017-09-19 03:21:44
* @Last Modified by:   Lear
* @Last Modified time: 2017-09-21 09:10:54
*/

'use strict';

require('./index.css');
require('page/common/header/index.js');
var nav 			= require('page/common/nav/index.js');
var _tool 			= require('util/tools.js');
var _cart 			= require('service/cart-service.js');
var templateIndex 	= require('./index.string');

var page = {
	data : {

	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadCart();
	},
	bindEvent : function(){
		var _this = this;
		//商品选择/取消选择
		$(document).on('click','.cart-select',function(){
			var $this = $(this),
				productId = $this.parents('.cart-table').data('product-id');
			//选中状态
			if($this.is(':checked')){
				_cart.selectProduct(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			}
			//取消选中
			else{
				_cart.unselectProduct(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			}
		});
		//商品全择/取消全择
		$(document).on('click','.cart-select-all',function(){
			var $this = $(this);
			//全选
			if($this.is(':checked')){
				_cart.selectAllProduct(function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			}
			//取消全选
			else{
				_cart.unselectAllProduct(function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			}
		});
		//商品数量变化
		$(document).on('click','.count-btn',function(){
			var $this = $(this),
				$pCount = $this.siblings('.count-input'),
				currCount = parseInt($pCount.val()),
				type = $this.hasClass('plus') ? 'plus' : 'minus',
				productId = $this.parents('.cart-table').data('product-id'),
				minCount = 1,
				maxCount = parseInt($pCount.data('max')),
				newCount = 0;
			if(type === 'plus'){
				if(currCount >= maxCount){
					_tool.errTip('该商品数量已经达到上限');
					return;
				}
				newCount = currCount + 1;
			}
			else if(type === 'minus'){
				if(currCount <= minCount){
					return;
				}
				newCount = currCount - 1;
			}
			//更新商品数量
			_cart.updateProduct({
				productId : productId,
				count : newCount
			},function(res){
				_this.renderCart(res);
			},function(errMsg){
				_this.showCartError();
			});
		});
		//删除单个商品
		$(document).on('click','.cart-delete',function(){
			if(window.confirm('是否删除商品')){
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});
		//删除选中商品
		$(document).on('click','.delete-selected',function(){
			if(window.confirm('是否删除商品')){
				var arrProducts = [],
					$selectedItem = $('.cart-select:checked');
				//循环查找选中的product
				for(var i = 0,iLength = $selectedItem.length; i < iLength; i++){
					arrProducts.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
				}
				if(arrProducts.length){
					_this.deleteCartProduct(arrProducts.join(','));
				}
				else{
					_tool.errorTips('您还没有选中要删除的商品');
				}
			}
		});
		//提交购物车
		$(document).on('click','.btn-submit',function(){
			//总价大于0,点击提交
			if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
				window.location.href = './confirm.html';
			}else{
				_tool.errorTips('请选择商品后提交');
			}
		});
	},
	//加载购物车信息
	loadCart : function(){
		var _this = this;
		_cart.getCartList(function(res){
			_this.renderCart(res);
		},function(errMsg){
			_this.showCartError();
		})
	},
	//渲染购物车
	renderCart : function(data){
		this.filter(data);
		//缓存购物车信息
		this.data.cartInfo = data;
		//生成html
		var cartHtml = _tool.renderHtml(templateIndex,data);
		$('.page-wrap').html(cartHtml);
		//通知导航栏购物车数量更新
		nav.loadCartCount();
	},
	//删除指定商品,支持批量删除(productId用逗号分割)
	deleteCartProduct : function(productIds){
		var _this = this;
		_cart.deleteProduct(productIds,function(res){
			_this.renderCart(res);
		},function(){
			_this.showCartError();
		});
	},
	//数据匹配
	filter : function(data){
		data.notEmpty = !!data.cartProductVoList.length;
	},
	showCartError : function(){
		$('.page-wrap').html('<p class="errTip">购物车加载失败，请刷新后重试</p>');
	}
};
$(function(){
	page.init();
});