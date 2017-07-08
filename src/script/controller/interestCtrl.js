'use strict';
angular.module('app').controller('interestCtrl',['$scope','$http',function($scope,$http){
	$http.get('data/myFavorite.json').then(function(resq){
		$scope.list = resq.data;
	})
}])