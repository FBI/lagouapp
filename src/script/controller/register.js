'use strict';
angular.module('app').controller('registerCtrl',['$scope','$http','$interval','$state',function($scope,$http,$interval,$state){
	$scope.submit = function(){
		 $http.post('data/regist.json',$scope.user).success(function(resq){
      		$state.go('login');
    	});
	}
	var count = 60;
	$scope.send = function(){
		$http.get('data/code.json').then(function(resq){
			if( 1 == resq.data.state ){
				$scope.time = count + 's';
				var time = $interval(function(){
					if ( count <= 0 ) {
						$interval.cancel(time);
						$scope.time = '';
						return;
					}else {
						count --;
						$scope.time = count + 's';
					}	
				},1000)
			}
		})
	}
}])