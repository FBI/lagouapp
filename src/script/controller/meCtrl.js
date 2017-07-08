'use strict';
angular.module('app').controller('meCtrl',['$scope','cache','$state',function($scope,cache,$state){
	if( cache.get('name')){
		$scope.name = cache.get('name');
		$scope.image = cache.get('image');
	}
	$scope.logout = function(){
		cache.remove('name');
		cache.remove('image');
		cache.remove('id');
		$state.go('main');
	}
}])