'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/setting', {
		templateUrl : 'modules/setting/setting.html',
        controller: 'settingCtrl'
	}).when('/about',{
		templateUrl : 'modules/setting/about.html'
	}).when('/appLog',{
		templateUrl : 'modules/setting/app_log.html'
	}).when('/account',{
		templateUrl : 'modules/setting/account.html'
	}).when('/mobile',{
		templateUrl : 'modules/setting/mobile.html'
	}).when('/mobileBind',{
		templateUrl : 'modules/setting/mobileBind.html'
	}).when('/mobileVercode',{
		templateUrl : 'modules/setting/mobileVercode.html'
	}).when('/qq',{
		templateUrl : 'modules/setting/qq.html'
	}).when('/qqBind',{
		templateUrl : 'modules/setting/qqBind.html'
	}).when('/weixin',{
		templateUrl : 'modules/setting/weixin.html'
	}).when('/weixinBind',{
		templateUrl : 'modules/setting/weixinBind.html'
	}).when('/info',{
		templateUrl : 'modules/setting/info.html'
	}).when('/me',{
		templateUrl : 'modules/setting/me.html'
	})
} ]);

app.controller("infoCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {

		}]);
app.controller("meCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {

		}]);
app.controller("settingCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
		$scope.quit = function() {
			$rootScope.logout();
		}
		$scope.back = function() {
			$location.path('/');
		}
		$scope.name=CONST.user.username;
		$(function() {
			$("#app-update").click(function() {
				$(".index-mask").show();
				$(".index_update").show();
			});
			$(".index_update .icon-close").click(function() {
				$(".index-mask").hide();
				$(".index_update").hide();
			})
		});

		$scope.navigationPage = function() {
			if (getCookieValue("navigation") != null
					&& getCookieValue("navigation") + "" != "") {
				alert("5分钟内只可发布一次，请稍后再试");
			} else {
				$.ajax({
					type : "get",
					async : true,
					url : "http://www.jihui88.com/rest/static1/"
							+ $scope.name + "/publish?type=page",
					dataType : "jsonp",
					jsonp : "callback",
					jsonpCallback : "flightHandler",
				})
				// 保存cookie中。5分钟后才可以再次点击
				addCookie("navigation", "navPublish", 5, "/");
				alert("发布成功");
			}
		}
		$scope.categoryPage = function() {
			if (getCookieValue("category") != null
					&& getCookieValue("category") + "" != "") {
				alert("5分钟内只可发布一次，请稍后再试");
			} else {
				$.ajax({
					type : "get",
					async : true,
					url : "http://www.jihui88.com/rest/static1/"
							+ $scope.name + "/publish?type=category",
					dataType : "jsonp",
					jsonp : "callback",
					jsonpCallback : "flightHandler",
					success : function(json) {
						alert(json.success);
					}
				})
				addCookie("category", "catPublish", 5, "/");
				alert("发布成功");
			}
		}
		$scope.pcPage = function() {
			if (getCookieValue("pc") != null
					&& getCookieValue("pc") + "" != "") {
				alert("5分钟内只可发布一次，请稍后再试");
			} else {
				$.ajax({
					type : "get",
					async : true,
					url : "http://www.jihui88.com/rest/static1/"
							+ $scope.name + "/publish?type=detail",
					dataType : "jsonp",
					jsonp : "callback",
					jsonpCallback : "flightHandler",
					success : function(json) {
						alert(json.success);
					}
				})
				addCookie("pc", "pcPublish", 5, "/");
				alert("发布成功");
			}
		}
		$scope.mobilePage = function() {
			if (getCookieValue("mobile") != null
					&& getCookieValue("mobile") + "" != "") {
				alert("5分钟内只可发布一次，请稍后再试");
			} else {
				$.ajax({
					type : "get",
					async : true,
					url : "http://www.jihui88.com/rest/mobileStatic/"
							+ $scope.name + "/publish?type=page",
					dataType : "jsonp",
					jsonp : "callback",
					jsonpCallback : "flightHandler",
					success : function(json) {
						alert(json.success);
					}
				})
				addCookie("mobile", "mobilePublish", 5, "/");
				alert("发布成功");
			}
		}
}]);
app.controller("accountCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
		$scope.mobile=$rootScope.user.cellphone || '未绑定';
		$scope.weixin=$rootScope.user.weixin || '未绑定';
		$scope.qq=$rootScope.user.qq || '未绑定';
		$scope.email=$rootScope.user.email || '';
		$scope.back = function() {
			$location.path('/setting');
		}
    }
]);
/*手机绑定*/
app.controller("mobileCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
	$scope.show = function() {
		$('.btn-bind,.search-mask').show();
	}
	$scope.hide = function() {
		$('.btn-bind,.search-mask').hide();
	}
	$scope.bind = function() {
		alert('开发中');
    	$scope.mobile='未绑定';
		$('.btn-bind,.search-mask').hide();
	}
	$scope.updateMobile = function() {
		$location.path('/mobileBind');
	}
	$scope.mobile =$rootScope.user.cellphone || '未绑定';
	}
]);
app.controller("mobileBindCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
		$scope.show = function() {
			var t=/^1[3|4|5|7|8][0-9]\d{4,8}$/;
			if(t.test($('input[name=mobile]').val())){
				$location.path('/mobileVercode');
			}else{
				$('.wes-dialog,.search-mask').show();
			}
		}
		$scope.hide = function() {
			$('.wes-dialog,.search-mask').hide();
		}
		$scope.bind = function() {
			$('.wes-dialog,.search-mask').hide();
		}
	}
]);
app.controller("mobileVercodeCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
		$scope.show = function() {
			var t=/^1[3|4|5|7|8][0-9]\d{4,8}$/;
                               			if(t.test($('input[name=mobile]').val())){
                               				$location.path('/mobileVercode');
                               			}else{
                               				$('.wes-dialog,.search-mask').show();
                               			}
		}
		$scope.hide = function() {
            $('.wes-dialog,.search-mask').hide();
		}
		$scope.bind = function() {
			$('.wes-dialog,.search-mask').hide();
            window.history.go(-2);
		}
	}
]);
/*qq绑定*/
app.controller("qqCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
		$scope.show = function() {
            $('.btn-bind,.search-mask').show();
        }
        $scope.hide = function() {
        	$('.btn-bind,.search-mask').hide();
        }
        $scope.bind = function() {
        	//alert('开发中...');
        	$scope.qq='';
        	$('.btn-bind,.search-mask').hide();
        }
        $scope.qq = function() {
        	//alert('开发中...');
        	$location.path('/qqBind');
        }
		$scope.qq=$rootScope.user.qq || '未绑定';
    }
]);
app.controller("qqBindCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
	$scope.show = function() {
		$('.wes-dialog,.search-mask').show();
	}
	$scope.hide = function() {
		$('.wes-dialog,.search-mask').hide();
	}
	$scope.bind = function() {
		alert('开发中...');
		$('.wes-dialog,.search-mask').hide();
    	$location.path('/account');
	}
	}
]);
/*weixin绑定*/
app.controller("weixinCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
		$scope.show = function() {
            $('.btn-bind,.search-mask').show();
        }
        $scope.hide = function() {
        	$('.btn-bind,.search-mask').hide();
        }
        $scope.bind = function() {
        	//alert('开发中...');
        	$scope.weixin='';
        	$('.btn-bind,.search-mask').hide();
        }
        $scope.weixin = function() {
        	//alert('开发中...');
        	$location.path('/weixinBind');
        }
		$scope.weixin=$rootScope.user.weixin || '未绑定';
    }
]);
app.controller("weixinBindCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
	$scope.show = function() {
		$('.wes-dialog,.search-mask').show();
	}
	$scope.hide = function() {
		$('.wes-dialog,.search-mask').hide();
	}
	$scope.bind = function() {
		alert('开发中...');
		$('.wes-dialog,.search-mask').hide();
    	$location.path('/account');
	}
	}
]);
