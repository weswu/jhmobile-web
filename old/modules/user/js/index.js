'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/map', {
	    templateUrl : 'modules/user/map.html'
	})
}]);
var autoLogin = 0;
function LoginCtrl($scope, $rootScope, $location, $http, API_END_POINT) {
	$scope.getUrlParam = function(name){
    var url = location.href; //获取url中"?"符后的字串    
    if (url.indexOf("?") != -1) {   
      var str = url.split('?')[1];   
      var strs = str.split("&");   
      for(var i = 0; i < strs.length; i ++) {   
        if(strs[i].split("=")[0]===name){
          return strs[i].split("=")[1]
        } 
      }   
    }   
  }
	if($scope.getUrlParam('b') && $scope.getUrlParam('a')){
		addCookie("username", $scope.getUrlParam('b'), 367*60*24, "/");
		addCookie("password", $scope.getUrlParam('a'), 367*60*24, "/");
	}
	
	$scope.user = {
		username : '',
		password : ''
	}
	if (getCookieValue("username") != null
			&& getCookieValue("username") + "" != ""
			&& getCookieValue("password") + "" != ""
			&& getCookieValue("password") != null) {
		$scope.user = {
			username : getCookieValue("username"),
			password : getCookieValue("password")
		}
	}

	if (autoLogin != 1 && getCookieValue("username") != null
			&& getCookieValue("username") + "" != ""
			&& getCookieValue("password") + "" != ""
			&& getCookieValue("password") != null) {
		$http.post(API_END_POINT + 'user/login', {
			username : getCookieValue("username"),
			password : getCookieValue("password")
		}, {
			withCredentials : true
		}).success(function(data) {
			if (data.success) {
				$scope.user = data.attributes.data;
				$rootScope.user = data.attributes.data;
				CONST.user= data.attributes.data;
				if($scope.getUrlParam('a')){
					location.href='http://app.jihui88.com/#/enterprise'
				}else{
					$location.path('/');
				}
			} else {
				alert(data.msg);
			}
		})
	}

	$scope.submit = function() {
		addCookie("username", $scope.user.username, 367*60*24, "/");
		addCookie("password", $scope.user.password, 367*60*24, "/");
		$http.post(API_END_POINT + 'user/login', {
			username : $scope.user.username,
			password : $scope.user.password
		}, {
			withCredentials : true
		}).success(function(data) {
			if (data.success) {
				$scope.user = data.attributes.data;
				$rootScope.user = data.attributes.data;
				$location.path('/');
			} else {
				alert(data.msg);
			}
		})
	}

  var browser = {
      versions: function () {
          var u = navigator.userAgent, app = navigator.appVersion;
          return {         //移动终端浏览器版本信息
              trident: u.indexOf('Trident') > -1, //IE内核
              presto: u.indexOf('Presto') > -1, //opera内核
              webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
              gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
              mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
              ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
              android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
              iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
              iPad: u.indexOf('iPad') > -1, //是否iPad
              webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
          };
      }(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
  if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
      var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
      if(browser.versions.android){
          $(function(){
              //$(".otherLogin li").css('display','block');
          });
      }
  } 
}
app.controller("EnterpriseCtrl",["$scope","$rootScope","$location","$http","API_END_POINT",
    function($scope, $rootScope, $location, $http,API_END_POINT) {
	$http.get(API_END_POINT + 'enterprise/detail')
	.success(function(data) {
		$scope.enterprise= data.attributes.data;
		$rootScope.enterprise= data.attributes.data;
	})
	.error(function(data) {
	});						
	// 提交
	$scope.enterpriseUpdate = function() {
		if (($scope.enterprise.name + "").trim() === "" || $scope.enterprise.name == null) {alert("公司名称不能为空");return;}					
		if (($scope.enterprise.mainBusiness + "").trim() === "" || $scope.enterprise.mainBusiness == null) {alert("主营产品不能为空");return;}						
		if (($scope.enterprise.legalPre + "").trim() === "" || $scope.enterprise.legalPre == null) {alert("法人代表不能为空");return;}			
		if (($scope.enterprise.staffSum + "").trim() === "" || $scope.enterprise.staffSum == null) {alert("员工数量不能为空");return;}						
		if ($scope.enterprise.businessType == null || ($scope.enterprise.businessType + "").trim() === ""
			|| $scope.enterprise.businessType == '05') {
			alert("请选择“经营模式”");
			return;
		}					
		$scope.loading=true;	
		$http.put(API_END_POINT+ 'enterprise/detail?name=' + $scope.enterprise.name
				+ '&logo=' + $scope.enterprise.logo
				+ '&icp=' + $scope.enterprise.icp
				+ "&mainBusiness=" + $scope.enterprise.mainBusiness
				+ "&legalPre=" + $scope.enterprise.legalPre
				+ "&staffSum=" + $scope.enterprise.staffSum
				+ "&businessType=" + $scope.enterprise.businessType
				+ "&annualTurnover=" + ($scope.enterprise.annualTurnover + "").trim()
				+ "&registeredCapital=" + ($scope.enterprise.registeredCapital + "").trim())
    .success(function(data) {
    	$scope.loading=false;	
	    alert("修改成功");
	    $rootScope.$back();
    }).error(function(data) {
    	$scope.loading=false;	
	    alert("修改失败");
	    $rootScope.$back();
    });
    };		
    
    $('.fileupload').click(function(){
		$('#fileupload').click();
	})				
	$('#fileupload').fileupload({
	    url: API_END_POINT + 'album/fileupload',
	    sequentialUploads: true,
	    add: function (e, data) {
	        data.submit();$('.loading_click').click();
	    },
        done: function (e, data) {
          $('.loading_click').click();
          $scope.enterprise.logo=data.result.attributes.data;
          $('.fileupload').attr('src','http://img.jihui88.com/'+$scope.enterprise.logo)
        },
        fail: function(e,data){
        	  $('.loading_click').click();
        }
	});
}]);

app.controller('UserCtrl',["$scope","$location","$http","API_END_POINT",function($scope,$location,$http,API_END_POINT){
	$http.get(API_END_POINT + 'user/detail')
	.success(function(data) {
		$scope.user = data.attributes.data;
	})
	.error(function(data) {
	});
	$scope.pageClass="pageClass";
	$scope.userUpdate =function(){
		if ($scope.user.name == null || ($scope.user.name + "").trim() === "") {
			alert("姓名不能为空");
			return;
		}
		if ($scope.user.position == null || ($scope.user.position + "").trim() === "") {
			alert("职务不能为空");
			return;
		}
		var isMobile = /^(?:13\d|15\d)\d{5}(\d{3}|\*{3})$/;
		var isPhone = /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
		var checkFax = /^(\d{3,4}-)?\d{7,8}$/;
		var checkEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

		if ($scope.user.phone == null || ($scope.user.phone + "").trim() === "") {
			alert("电话不能为空");
			return;
		}
		$http.put(API_END_POINT + 'user/detail'
				+'?sex=' + $scope.user.sex
				+ '&name=' + $scope.user.name
				+ '&position=' + $scope.user.position
				+ '&cellphone=' + $scope.user.cellphone
				+ '&phone=' + $scope.user.phone
				+ '&fax=' + $scope.user.fax
				+ '&address=' + $scope.user.address
				+ '&qq=' + $scope.user.qq
				+ '&msn=' + $scope.user.msn
				+ '&zipcode=' + $scope.user.zipcode
				+ '&url=' + $scope.user.url
				)
		.success(function(data) {
			alert("修改成功");
		})
		.error(function(data) {
		});
	}
	$scope.map= function(){
		$location.path('/map');
	}
}])
app.controller('MapCtrl',["$scope","$rootScope","$location","$http","API_END_POINT",function($scope,$rootScope,$location,$http,API_END_POINT){

  var ctx=this;
	$scope.initMap= function(){
    //创建Map实例
		ctx.map = new BMap.Map("container");
    var r = /^[a-zA-Z]+$/;
    if($scope.enterprise.mapaddress && !r.test($scope.enterprise.mapaddress)){
      this.point = new BMap.Point(parseFloat($scope.enterprise.mapaddress.split(',')[0]),$scope.enterprise.mapaddress.split(',')[1]);
    }else{
      this.point = new BMap.Point(120.229355,30.2145);
    }
    ctx.map.centerAndZoom(this.point,15);
    //添加鼠标滚动缩放
    ctx.map.enableScrollWheelZoom();
        
    //添加缩略图控件
    ctx.map.addControl(new BMap.OverviewMapControl({isOpen:false,anchor:BMAP_ANCHOR_BOTTOM_RIGHT}));
    //添加缩放平移控件
    ctx.map.addControl(new BMap.NavigationControl());
    //添加比例尺控件
    ctx.map.addControl(new BMap.ScaleControl());
        
    //设置标注的经纬度
    $scope.markerInit(this.point)
        
    //点击地图，获取经纬度坐标
    ctx.map.addEventListener("click",function(e){
      ctx.map.removeOverlay(ctx.marker);  
      $scope.markerInit(new BMap.Point(e.point.lng,e.point.lat))
      $scope.enterprise.mapaddress= e.point.lng+','+e.point.lat;
    });
        
  }
	
	$scope.markerInit= function(point){
		ctx.marker = new BMap.Marker(point);
		ctx.map.addOverlay(ctx.marker);
		ctx.marker.addEventListener("click",function(){
      var opts = {    
        width : 250,     // 信息窗口宽度    
        height: 80,     // 信息窗口高度    
        title : $scope.enterprise.name  // 信息窗口标题   
      }    
      var infoWindow = new BMap.InfoWindow('', opts);  // 创建信息窗口对象    
      this.openInfoWindow(infoWindow, ctx.map.getCenter());      // 打开信息窗口    
    });    
  }
	if(!$rootScope.enterprise){
		$http.get(API_END_POINT + 'enterprise/detail')
		.success(function(data) {
			$rootScope.enterprise= data.attributes.data;
			$scope.enterprise=$rootScope.enterprise;
			$scope.initMap()
		})
		.error(function(data) {
		});	
	}else{
		$scope.initMap()
	}

  $scope.map= function(e){//提交
		$rootScope.enterprise.mapaddress= $scope.enterprise.mapaddress;
		$scope.enterprise.mapType="app";
		$http({
			url: API_END_POINT+ 'enterprise/detail',
			method:'put',
			params:$scope.enterprise
		}).success(function(data){
	  		if(data.success){
	  	    alert("保存成功");
	  		}else{
	  	    alert(data.msg);
	  		}
		}).error(function(data){
		    alert("保存失败");
		});
  }

  $scope.search= function(e){//关键字搜索
    var keyword = $('#keyword').val();
    if(keyword == ''){alert('不能为空');return false}
    var local = new BMap.LocalSearch(this.map, {
      renderOptions:{map: this.map}
    });
    local.search(keyword);
  }

}])
