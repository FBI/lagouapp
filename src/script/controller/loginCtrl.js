'use strict';
angular.module('app').controller('loginCtrl',['$scope','$http','$state','cache',function($scope,$http,$state,cache){
	$scope.submit = function(){
		$http.post('data/login.json',$scope.user).success(function(resq){
			//登录成功以后将id  image name存放到cookies里再跳转到主页面
			cache.put('id',resq.data.id);
			cache.put('image',resq.data.image);
			cache.put('name',resq.data.name);
			$state.go('main');
		})
	}
}])