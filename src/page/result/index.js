/*
* @Author: Lear
* @Date:   2017-09-14 23:55:56
* @Last Modified by:   Lear
* @Last Modified time: 2017-09-15 00:47:12
*/

'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _tool = require('util/tools.js');

$(function(){
	var type = _tool.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success').show();
	//显示对应的提示元素
	$element.show();
});