'use strict';
var CONST = {
		HOST:'app.jihui88.com',
		user:{},
		enterprise:{}
};
if(location.href.indexOf('m1.jihui88.com') > -1){CONST.HOST='m1.jihui88.com'};
var app = angular.module('pageRoute',['ngRoute', 'ngAPI','infinite-scroll'])
    .constant('HOST',CONST.HOST).constant('API_END_POINT','http://'+CONST.HOST+'/rest/api/')
    .filter('state', function() {
	    var stateFilter = function(input) {
		    if (input === '01') {
		    	return 'Published';
	    	} else if (input === '00') {
		    	return 'Not published';
		    } else {
		    	return 'Undefined';
		    }
	    };
	    return stateFilter;
}).config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl : 'modules/main.html'
	}).when('/login', {
		templateUrl : 'modules/user/login.html'
	}).when('/video', {
        templateUrl : 'modules/video/video.html'
    }).when('/reg', {
        templateUrl : 'modules/user/reg.html'
    }).when('/user',{
		templateUrl: 'modules/user/user.html'
	}).when('/enterprise', {
        templateUrl : 'modules/user/view.html'
    }).when('/anli', {
        templateUrl : 'modules/wap_anli.html'
    }).when('/cnzz', {
        templateUrl : 'modules/cnzz.html'
    }).when('/my_wap', {
        templateUrl : 'modules/my_wap.html'
    }).when('/link/list', {
        templateUrl : 'modules/link/link.html'
    }).when('/link/add', {
        templateUrl : 'modules/link/add.html'
    }).when('/link/view', {
        templateUrl : 'modules/link/view.html'
    }).when('/info/list', {
        templateUrl : 'modules/info/list.html'
    }).when('/password', {
        templateUrl : 'modules/password.html'
    }).when('/views/list', {
		templateUrl : 'modules/views/views.html'
	}).when('/feedback', {
		templateUrl : 'modules/feedback/feedback.html'
	}).when('/main', {
		templateUrl : 'modules/main.html'
	}).when('/member/list', {
		templateUrl : 'modules/member/member.html'
	}).when('/message/list', {
		templateUrl : 'modules/message/message.html'
	}).when('/message/detail/:messageId', {
		templateUrl : 'modules/message/detail.html'
	}).when('/service', {
		templateUrl : 'modules/service/service.html'
	}).when('/product/list', {
		templateUrl : 'modules/product/product.html'
	}).when('/product/view', {
        templateUrl : 'modules/product/view.html'
    }).when('/product/category/list', {
		templateUrl : 'modules/product/category.html'
	}).when('/product/category/add', {
        templateUrl : 'modules/product/category_add.html'
    }).when('/news/category/list', {
		templateUrl : 'modules/news/category.html'
	}).when('/news/category/add', {
		templateUrl : 'modules/news/category_add.html'
	}).when('/news/list', {
		templateUrl : 'modules/news/news.html'
	}).when('/news/add', {
        templateUrl : 'modules/news/add.html'
    }).when('/news/update/:newsId', {
		templateUrl : 'modules/news/news_update.html'
	}).otherwise({
		redirectTo : '/'
	});
}).run(function($rootScope, $http, $location, API_END_POINT) {
	$rootScope.alerts = [];
	$rootScope.closeAlert = function(index) {
		$rootScope.alerts.splice(index, 1);
	};
	$rootScope.user = null;
	$rootScope.$back = function() { 
	    window.history.back();
	  };
	$rootScope.isLogin = function() {
		return $rootScope.user !== null;
	};
	$rootScope.checkLogin = function() {
		$rootScope.done = false;
		$http.get(API_END_POINT + 'user/info', {
			withCredentials : true
		}).success(function(data) {
			var user = data.attributes.data;
			if(user==null){
				if(location.hash != '#/reg'){
					$location.path('/login');
				}
			}
			$rootScope.user = user;
			$rootScope.done = true;
			CONST.user= user;
		}).error(function(data) {
			$rootScope.user = null;
			$location.path('/');
			$rootScope.done = true;
		});
	};
	$rootScope.logout = function() {
		autoLogin = 1;
		if ($rootScope.isLogin()) {
			$rootScope.done = false;
			$http.get(API_END_POINT + 'user/logout', {
				withCredentials : true
			}).success(function(data) {
				$rootScope.done = true;
				$rootScope.user = null;
				$rootScope.userInfo = null;
				$location.path('/login');
			});
		}
	};
	$rootScope.checkLogin();
	
	$rootScope.picUrl= function (src, zoom) {
		  if (angular.isString(src)) {
		    var type = src.substring(src.lastIndexOf(".") + 1, src.length);
		    var hasZoom = src.lastIndexOf('_') > 0 ? true : false;
		    return src.substring(0, src.lastIndexOf(hasZoom ? '_' : '.')) + "_" + zoom + "." + type;
		  }
	}

});
/**
 * 解决spring mvc接收不到angular的问题
 */
app.config(function($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;
 
            for (name in obj) {
                value = obj[name];
 
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                }
            }
 
            return query.length ? query.substr(0, query.length - 1) : query;
        };
 
        return angular.isObject(data) && String(data) !== '[object File]'  ? param(data)  : data;
    }];
});

//tool
app.factory('$tool',function(){
	return {
		picUrl:  function(src, n) {
		    if (angular.isString(src)) {
		        var type = src.substring(src.lastIndexOf(".") + 1, src.length);
		        var hasZoom = src.lastIndexOf('_') > 0 ? true : false;
		        return src.substring(0, src.lastIndexOf(hasZoom ? '_' : '.')) + "_" + n + "." + type;
		      }
	   },
	   num10000:  function(n) {
		   var num=parseInt(n)
		   if(n>=10000){
			    return (n/10000).toFixed(1)+'万'
		   }else{
			   return n
		   }
	   }
	}
})
app.factory('timestampMarker', ["$rootScope", function ($rootScope) {
    var timestampMarker = {
        request: function (config) {
            $rootScope.loading = true;
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function (response) {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    return timestampMarker;
}]);
//显示html代码  例如：服务进度
app.filter('htmlContent',['$sce', function($sce) {
	return function(input) {
		return $sce.trustAsHtml(input);
	}
}]);
//积分兑换字符串
app.filter('limitString',function() {
	return function(input,begin,end) {
		return input.substring(begin,input.length-end);
	}
});