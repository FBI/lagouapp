'use strict';
angular.module('app',['ui.router','ngCookies','validation']);
'use strict';
//value方法声明全局变量dict  run方法初始化全局变量
angular.module('app').value('dict',{}).run(['$http','dict',function($http,dict){
	$http.get('data/city.json').then(function(resq){
		dict.city = resq.data;
	});
	$http.get('data/salary.json').then(function(resq){
		dict.salary = resq.data;
	});
	$http.get('data/scale.json').then(function(resq){
		dict.scale = resq.data;
	});
}])
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
'use strict';

angular.module('app').config(['$validationProvider',function($validationProvider){
	var expression = {
		phone: /^1[\d]{10}$/,
		password : function(value){
			var str = value + '';
			return value.length > 5;
		},
		required : function(value){
			return !!value;//不能为空
		}
	}

	var defaultMsg = {
		phone :{
			success : '',
			error : '手机号不合法!'
		},
		password : {
			success : '',
			error : '密码必须大于6位!'
		},
		required : {
			success : '',
			error : '不能为空！'
		}
	}

	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg)
}])
'use strict';

angular.module('app').directive('appCompany',[function(){
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/company.html',
		scope : {
			com : '='
		}
		
	}
}])
'use strict';

angular.module('app').directive('appFoot',[function(){
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/foot.html'
	}
}])
//编写指令对应的脚本
'use strict';
angular.module('app').directive('appHead',['cache',function(cache){
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/head.html',
		link : function($scope){
			$scope.name = cache.get('name');
		}
	}
}])
'use strict';
angular.module('app').directive('appHeadBar',[function(){
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/headBar.html',
		scope : {
			detail : '@'
		},
		link : function(scope){
			scope.back = function(){
				window.history.back();
			}
		}
	}
}])
'use strict';
angular.module('app').directive('appPositionClass',[function(){
	return {
		restrict:'A',
		replace: true,
		scope : {
			com : '='
		},
		templateUrl: 'view/template/positionClass.html',
		link : function($scope){
			//$scope.isActive = 0;
			$scope.showPositionList = function(index){
				$scope.positionList = $scope.com.positionClass[index].positionList;
				$scope.isActive = index;
			}
			$scope.$watch('com', function(newVal){
       			 if(newVal) $scope.showPositionList(0);
      		});
		}
	}
}])
'use strict';

angular.module('app').directive('appPositionInfo',['$http',function($http){
	return {
		restrict : 'A',
		replace : true,
		templateUrl : 'view/template/positionInfo.html',
		scope : {
			isActive : '=',
			isLogin : '=',
			pos : '='
		},
		link : function($scope){
			$scope.$watch('pos',function(newVal){
				if ( newVal ) {
					$scope.pos.select = $scope.pos.select || false;
					$scope.imgPath = $scope.pos.select ? 'image/star-active.png' : 'image/star.png'
				}
			})
			$scope.favorite = function(){
				$http.post('data/favorite.json',{
					id : $scope.pos.id,
					select : !$scope.pos.select
				}).success(function(resq){
					$scope.pos.select = !$scope.pos.select;
					$scope.imgPath = $scope.pos.select ? 'image/star-active.png' : 'image/star.png'
				})
			}
		}
	}
}])
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
'use strict';

angular.module('app').directive('appSheet',[function(){
	return {
		restrict : 'A',
		replace : true,
		scope : {
			list : '=',
			visible : '=',
			select : '&'
		},
		templateUrl : 'view/template/sheet.html'
	}
}])
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
'use strict';
angular.module('app').controller('companyCtrl', ['$http', '$state', '$scope', function($http, $state, $scope){
  $http.get('data/company.json?id='+$state.params.id).then(function(resq){
    $scope.company = resq.data;
  });
}]);

'use strict';
angular.module('app').controller('interestCtrl',['$scope','$http',function($scope,$http){
	$http.get('data/myFavorite.json').then(function(resq){
		$scope.list = resq.data;
	})
}])
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
'use strict';
angular.module('app').controller('mainCtrl',['$scope','$http',function($scope,$http){
	$http.get('/data/positionList.json').then(function(jsonObj){
		$scope.list = jsonObj.data
	})
}])
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
'use strict';
angular.module('app').controller('postCtrl',['$scope','$http',function($scope,$http){
	$scope.tabList = [
		{ id : 'all',name : '全部'},
		{ id : 'pass',name : '面试邀请'},
		{ id : 'fail',name : '不合适'}
	];
	$http.get('data/myPost.json').then(function(resq){
		$scope.positionList = resq.data;
	});
	$scope.filterObj = {};
	$scope.tClick = function(id,name){
		switch( id ){
			case 'all' :
			    delete $scope.filterObj.state;
			    break;
			case 'pass' :
			    $scope.filterObj.state = '1';
			    break;
			case 'fail' :
			    $scope.filterObj.state = '-1';
			    break;
			default :
		}
	}
}])
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
'use strict';

angular.module('app').controller('searchCtrl',['$scope','$http','dict',function($scope,$http,dict){
	$scope.name = '';
	$scope.search = function(){
			$http.get('data/positionList.json?name=' + $scope.name).then(function(resq){
			$scope.positionList = resq.data;
		})
	}
	$scope.search();
	$scope.sheet = {};
	$scope.tabList = [
		{id : 'city',name : '城市'},
		{id : 'salary',name : '薪水'},
		{id : 'scale',name : '规模'}
	];
	var tabId = '';
	$scope.filterObj = {};
	$scope.tClick = function(id,name){
		tabId = id;
		$scope.sheet.list = dict[id];
		$scope.sheet.visible = true;
	};
	$scope.sClick = function(id,name){
		if(id){
			angular.forEach($scope.tabList,function(item){
				if (item.id == tabId) {
					item.name = name;
				}
			});
			$scope.filterObj[tabId + 'Id'] = id;
		}else{
			delete $scope.filterObj[tabId + 'Id']
			angular.forEach($scope.tabList,function(item){
				if (item.id == tabId){
					switch(item.id){
						case 'city' :
						     item.name = '城市';
						     break;
						case 'salary' :
							 item.name = '薪水';
							 break;
					    case 'scale' :
					    	 item.name = '公司规模';
					    	 break;
					    default :
					}
				}
			})
		}
	}
}])
'use strict';
angular.module('app').service('cache',['$cookies',function($cookies){
	this.put = function(key,value){
		$cookies.put(key,value);
	};
	this.get = function(key){
		return $cookies.get(key);
	};
	this.remove = function(key){
		$cookies.remove(key);
	}
}])

/*angular.module('app').factory('cache',['$cookies',function($cookies){
	return {
		put : function(key,value){
			$cookies.put(key,value);
		},
		get : function(key){
			return $cookies.get(key);
		}
	}
}])*/