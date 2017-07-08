'use strict';
//value方法声明全局变量dict  run方法初始化全局变量
angular.module('app').value('dict',{}).run(['$http','dict',function($http,dict){
	$http.get('data/city.json').then(function(resq){
		dict.city = resq.data;
	});
	$http.get('data/salary.json').then(function(resq){
		dict.salary = resq.data;
	});
	$http.get('data/scale.json').then(function(resq){
		dict.scale = resq.data;
	});
}])