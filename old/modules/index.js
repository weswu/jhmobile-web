'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/setting/setting', {
		templateUrl : 'modules/setting/setting.html'
	}).when('/wapAnli', {
		templateUrl : 'modules/wap_anli.html'
	}).when('/myWap/:path', {
		templateUrl : 'modules/my_wap.html'
	}).when('/upload', {
		templateUrl : 'modules/upload/upload.html'
	})
}]);

/** 添加设置cookie  1分钟**/
function addCookie(name, value, days, path) {
	var name = escape(name);
	var value = escape(value);
	var expires = new Date();
	expires.setTime(expires.getTime() + days * 60000);
	path = path == "" ? "" : ";path=" + path;
	var _expires = (typeof days) == "string" ? "" : ";expires="
			+ expires.toUTCString();
	document.cookie = name + "=" + value + _expires + path;
}

/** 获取cookie的值，根据cookie的键获取值* */
function getCookieValue(name) {
	var name = escape(name);
	var allcookies = document.cookie;
	name += "=";
	var pos = allcookies.indexOf(name);
	if (pos != -1) {
		var start = pos + name.length;
		var end = allcookies.indexOf(";", start);
		if (end == -1)
			end = allcookies.length;
		var value = allcookies.substring(start, end);
		return (value);
	} else {
		return "";
	}
}

var logId = 0;
var times = 0;
app.controller("passwordCtrl", ["$scope","$rootScope","$location","$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
    $scope.savePassword = function(oldPs, password, pw) {
				if (oldPs == null || (oldPs + "").trim() === ""
						|| (password + "").trim() === "" || password == null
						|| (pw + "").trim() === "" || pw == null) {
					alert("密码不能为空");
					return;
				}
				if (password.length < 6 || pw.length < 6) {
					alert("新密码长度至少6位");
					return;
				}
				if (password != pw) {
					alert("新密码两者不一致");
					return;
				}
				$http.post(
						API_END_POINT + 'user/detail/password?oldPs=' + oldPs
								+ "&newPs=" + password).success(function(data) {
					if (data.success) {
						alert(data.msg);
						$location.path('/');
					} else {
						alert(data.msg);
					}
				}).error(function(data) {
				});
			};
		}]);

// 首页
app.controller("mainCtrl", ["$scope","$rootScope","$location","$http","$window","API_END_POINT","$timeout",
	function($scope, $rootScope, $location, $http, $window, API_END_POINT,$timeout) {
	$('head title').html('全网营销，网站、手机网站、微网站、微商城、微传单等管理，机汇网');$scope.footerIndex=true;
	// 设置
	$scope.setting = function() {
		$location.path('/setting');
	}
	$http.get(API_END_POINT + 'order/home/list').
	success(function(data) {
		$scope.unpaid = data.attributes.unpaid;
		$scope.unshipped = data.attributes.unshipped;
		$scope.shipped = data.attributes.shipped;
		$scope.unread = data.attributes.unread;
		$rootScope.userInfo =data.attributes;
		if (data.attributes.name + "" != "") {
			$scope.mName = "true";
			$scope.name = data.attributes.name;
		}
		if (data.attributes.versions + "" != "") {
			$scope.mVersions = "true";
			$scope.versions = data.attributes.versions;
		}
		if (data.attributes.endTime + "" != "") {
			if (data.attributes.endTime == '0') {
				$scope.mEndTime = "false";
			} else {
				$scope.mEndTime = "true";
			}
			if (data.attributes.endTime == '1') {
				$scope.endTime = "已到期,请续费";
				$scope.endTimeTag=true;
			} else {
				$scope.endTime = data.attributes.endTime;
			}
		}
		if(!data.attributes.logo){
			$scope.logo = 'http://img.jihui88.com/upload/j/j2/jihui/picture/2015/12/04/cb46a5be-9960-4c96-a463-895e7948c415.png';
		}else{
			$scope.logo = 'http://img.jihui88.com/'+$rootScope.picUrl(data.attributes.logo,5);
			$rootScope.user.logo=$scope.logo;
		}
	 });
	//去手机网站
	$scope.weiWz = function() {
		$.get(API_END_POINT + 'user/minSite').success(
				function(data) {
					if (data.attributes.data != null
							&& data.attributes.data + "" != "") {
						location.href = "http://"
								+ data.attributes.data;
					} else {
						if (confirm('您还未开通手机网站，请联系客服开通~是否查看手机网站案例')) {
							$location.path('/wapAnli');
							$scope.$apply();
						}
					}
				});
	};
	//获取当前用户的logId
	$http.get(API_END_POINT + 'log/id').success(function(data) {
		logId = data.attributes.id;
	});
	//去支付
	$scope.goPage = function() {
		if($scope.endTimeTag){
			$location.path('/pay_detail');
		}
	};
	//关闭广告
	$scope.fClose = function() {
		$('.f39dsk,.f39dsk-close').hide();
	};
	$scope.is_weixin = function(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			$('.f39dsk,.f39dsk-close').show();
	 	} else {
			$('.f39dsk,.f39dsk-close').hide();
		}
	}
	$scope.is_weixin();
}]);

