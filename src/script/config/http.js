//利用angular修饰器修改post请求为get请求

'use strict';
angular.module('app').config(['$provide',function($provide){
	//利用$provide下的decorator()修饰器修改post请求
	//$http为被修改的请求 $delegate指代被修改的请求
	$provide.decorator('$http',['$delegate','$q',function($delegate,$q){
		$delegate.post = function(url,data,config){
			var def = $q.defer();//创建一个延迟加载对象
			$delegate.get(url).then(function(resq){
				def.resolve(resq);
			}).catch(function(err){
				def.reject(err)
			})

			return {
				success : function(cb){
					def.promise.then(cb);
				},
				error : function(cb){
					def.promise.cat(null,cb);
				}
			}
		}
		return $delegate;
	}])
}])
