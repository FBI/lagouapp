'use strict';

angular.module('app').directive('appTab',[function(){
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/tab.html',
		scope : {
			list : '=',//对该指令的调用者暴露一个接口list
			tabClick : '&'//绑定父作用域下的函数，以便通知该函数
		},
		link : function($scope){
			$scope.click = function(tab){
				$scope.selectId = tab.id;
				$scope.tabClick(tab);//通知父控制器该tab元素被点击了
			}
		}
	}
}])