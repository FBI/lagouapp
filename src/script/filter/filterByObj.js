'use strict';

angular.module('app').filter('filterByObj',[function(){
	return function(list,obj){//obj 过滤对象
		var result = []
		angular.forEach(list,function(item){
			var isEqual = true;
			for(var k in obj){
				if(item[k]!=obj[k]){
					isEqual = false;
				}
			}
			if (isEqual) {
				this.push(item);
			}
		},result)
		return result;
	}
}])