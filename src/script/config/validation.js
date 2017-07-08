'use strict';

angular.module('app').config(['$validationProvider',function($validationProvider){
	var expression = {
		phone: /^1[\d]{10}$/,
		password : function(value){
			var str = value + '';
			return value.length > 5;
		},
		required : function(value){
			return !!value;//不能为空
		}
	}

	var defaultMsg = {
		phone :{
			success : '',
			error : '手机号不合法!'
		},
		password : {
			success : '',
			error : '密码必须大于6位!'
		},
		required : {
			success : '',
			error : '不能为空！'
		}
	}

	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg)
}])