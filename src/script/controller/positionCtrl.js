'use strict';
angular.module('app').controller('positionCtrl',['$scope','$http','$state','$q','cache','$log',function($scope,$http,$state,$q,cache,$log){
	//cache.put('city','帝都');
	$scope.isLogin = !!cache.get('name');
    $scope.message = $scope.isLogin?'投个简历':'去登录';
	function getPosition(){
		var def = $q.defer();
		$http.get('data/position.json?id='+$state.params.id).then(function(resq){
				$scope.position = resq.data;
				if(resq.posted) {
       				 $scope.message = '已投递';
      			  }
				def.resolve(resq.data);
			}).catch(function(err){
				def.reject(err);
			});
			return def.promise;
	};
	function getCompany(id){
		$http.get('data/company.json?id='+id).then(function(resq){
			$scope.company = resq.data;
		})
	};
	getPosition().then(function(obj){
		getCompany(obj.companyId);
	});
	$scope.go = function() {
    if($scope.message !== '已投递') {
      if($scope.isLogin) {
        $http.post('data/handle.json', {
          id: $scope.position.id
        }).success(function(resq) {
          $scope.message = '已投递';
        });
      } else {
        $state.go('login');
      }
    }
  }
}])