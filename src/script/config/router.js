'use strict';
 //$stateProvider  路由的配置
 //$urlRouterProvider 实现跳转
 angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
 		$stateProvider.state('main',{//main 路由对应id
 			url : '/main',
 			templateUrl : 'view/main.html',
 			controller : 'mainCtrl'
 		}).state('position',{
 			url : '/position/:id',//根据不同的id展示不同的职位信息
 			templateUrl : 'view/position.html',
 			controller : 'positionCtrl'
 		}).state('company',{
 			url : '/company/:id',
 			templateUrl : 'view/company.html',
 			controller : 'companyCtrl'
 		}).state('search',{
 			url : '/search/',
 			templateUrl : 'view/search.html',
 			controller : 'searchCtrl'
 		}).state('login',{
 			url : '/login/',
 			templateUrl : 'view/login.html',
 			controller : 'loginCtrl'
 		}).state('register',{
 			url : '/register/',
 			templateUrl : 'view/register.html',
 			controller : 'registerCtrl'
 		}).state('post',{
 			url : '/post/',
 			templateUrl : 'view/post.html',
 			controller : 'postCtrl'
 		}).state('interest',{
 			url : '/interest/',
 			templateUrl : 'view/interest.html',
 			controller : 'interestCtrl'
 		}).state('me',{
 			url : '/me/',
 			templateUrl : 'view/me.html',
 			controller : 'meCtrl'
 		});
 		$urlRouterProvider.otherwise('main');
 }])