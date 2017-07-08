'use strict';

angular.module('app').directive('appPositionList',['cache','$http',function(cache,$http){
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/positionList.html',
		scope : {
			data : '=',
			filterObj : '=',
			isFavorite : '='
		},
		link : function($scope){
			$scope.select = function(item){
				$http.post('data/favorite.json',{
					id : item.id,
					select : !item.select
				}).success(function(resq){
					item.select = !item.select;
				})
			}
		}
	}
}])