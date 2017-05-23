'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/sincerity', {
		templateUrl : 'modules/sincerity/sincerity.html'
	}).when('/beian',{
		templateUrl : 'modules/sincerity/beian.html'
	}).when('/red_shield',{
		templateUrl : 'modules/sincerity/red_shield.html'
	}).when('/miit',{
		templateUrl : 'modules/sincerity/miit.html'
	}).when('/police_record',{
		templateUrl : 'modules/sincerity/police_record.html'
	})
}]);

app.controller("SincerityCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
  
}])

app.controller("BeianCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
	
}])


app.controller("RedShieldCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {

	$http.get(API_END_POINT + 'profile/detail')
		.success(function(data) {
			var result = data.attributes.data;
			$scope.user=result.user;
			$scope.enterprise=result.enterprise;
			$scope.principal=result.principal;
			$scope.bind=result.bind;
			$scope.webinfo=result.webinfo;
			$scope.emergency=result.emergency;
		})
		.error(function(data) {
			
		});
	
	
	$scope.update = function() {
		$.ajax({
      type: "post",
			url: API_END_POINT+'profile/detail/all',
      data: {
        model: JSON.stringify({
  				user:$scope.user,
  				enterprise:$scope.enterprise,
  				principal:$scope.principal,
  				bind:$scope.bind,
  				webinfo:$scope.webinfo,
  				emergency:$scope.emergency
        })
			},
      success: function(data){
  			var result = data.attributes.data;
  			if(result){
        	$scope.principal=result.principal;
        	$scope.emergency=result.emergency;
        	$scope.bind=result.bind;
        	$scope.webinfo=result.webinfo;
  				
  			}
  	    alert("操作成功");
      },
      error: function(a){
  	    alert("保存失败");
      }
		})
	}

	$scope.navigationPage = function() {
			$.ajax({
				type : "get",
				async : true,
				url : "http://www.jihui88.com/rest/static1/"
						+ $scope.name + "/publish?type=page",
				dataType : "jsonp",
				jsonp : "callback",
				jsonpCallback : "flightHandler",
				success: function(data){
					
				}
			})
	}
}])


app.controller("MiitCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
  $scope.enterpriseType=[
    {text: '军队', value: '04'},
    {text: '政府机关', value: '05'},
    {text: '事业单位', value: '03'},
    {text: '企业', value: '01'},
    {text: '个人', value: '00'},
    {text: '个体经营', value: '02'},
    {text: '社会团体', value: '06'},
    {text: '民办非企业', value: '07'},
    {text: '基金会', value: '08'},
    {text: '律师事务所', value: '09'}
  ];
  $scope.enterpriseCertType=[
    {text: '统一社会信用代码证', value: '00'},
    {text: '营业执照证书', value: '01'},
    {text: '组织机构代码证', value: '02'},
    {text: '其他', value: '03'}
  ];  
  
	$http.get(API_END_POINT + 'profile/detail')
	.success(function(data) {
		var result = data.attributes.data;
		$scope.user=result.user;
		$scope.enterprise=result.enterprise;
		$scope.principal=result.principal;
		$scope.bind=result.bind;
		$scope.webinfo=result.webinfo;
		$scope.emergency=result.emergency;
	})
	.error(function(data) {
		
	});


$scope.update = function() {
	$.ajax({
    type: "post",
		url: API_END_POINT+'profile/detail/all',
    data: {
      model: JSON.stringify({
				user:$scope.user,
				enterprise:$scope.enterprise,
				principal:$scope.principal,
				bind:$scope.bind,
				webinfo:$scope.webinfo,
				emergency:$scope.emergency
      })
		},
    success: function(data){
			var result = data.attributes.data;
			if(result){
      	$scope.principal=result.principal;
      	$scope.emergency=result.emergency;
      	$scope.bind=result.bind;
      	$scope.webinfo=result.webinfo;
				
			}
	    alert("操作成功");
    },
    error: function(a){
	    alert("保存失败");
    }
	})
}
	
	
}])


app.controller("PoliceRecordCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
  $scope.enterpriseType=[
    {text: '军队', value: '04'},
    {text: '政府机关', value: '05'},
    {text: '事业单位', value: '03'},
    {text: '企业', value: '01'},
    {text: '个人', value: '00'},
    {text: '个体经营', value: '02'},
    {text: '社会团体', value: '06'},
    {text: '民办非企业', value: '07'},
    {text: '基金会', value: '08'},
    {text: '律师事务所', value: '09'}
  ];
  $scope.enterpriseCertType=[
    {text: '统一社会信用代码证', value: '00'},
    {text: '营业执照证书', value: '01'},
    {text: '组织机构代码证', value: '02'},
    {text: '其他', value: '03'}
  ];

  $scope.isIcp=[
    {text: '是', value: '01'},
    {text: '否', value: '02'}
  ];  
  $scope.principalCertType=[
{text: '居民身份证', value: '01'},
{text: '临时居民身份证', value: '02'},
{text: '军官证', value: '03'},
{text: '学生证', value: '04'},
{text: '机动车驾驶证', value: '05'},
{text: '外交护照', value: '06'},
{text: '公务护照', value: '07'},
{text: '因公普通护照', value: '08'},
{text: '普通护照', value: '09'},
{text: '入出境通行证', value: '10'},
{text: '香港特别行政区护照', value: '11'},
{text: '澳门特别行政区护照', value: '12'},
{text: '其他证件', value: '13'},
{text: '居住证', value: '14'}
];	 
  
  // 第三
  $scope.webinfoIspBoundSelect=[
     {text: '境内', value: '01'},
     {text: '境外', value: '02'}
  ];  
  $scope.webinfoIspNameSelect=[
	  {text: '上海有孚计算机网络有限公司', value: '01'}
	];  
  $scope.webinfoIspTypeSelect=[
 	  {text: '租赁虚拟空间', value: '01'}
	];  
  $scope.webinfoDomainBoundSelect=[
	{text: '境内', value: '01'},
	{text: '境外', value: '02'}
	];  
  $scope.webinfoDomainNameSelect=[
   	{text: '租赁虚拟空间', value: '01'}
	];                           
  $scope.siteServiceTypeRadio=[
{text: 'www服务', value: '00'},
{text: 'wap服务', value: '01'},
{text: '博客个人空间', value: '02'},
{text: '论坛BBS', value: '03'},
{text: '聊天室', value: '04'},
{text: '社交网站', value: '05'},
{text: '电子邮件', value: '06'},
{text: '即时通讯', value: '07'},
{text: '搜索引擎', value: '08'},
{text: '网络新闻', value: '09'},
{text: '网络音乐', value: '10'},
{text: '网络文字', value: '11'},
{text: '网络音视频', value: '12'},
{text: '网络游戏', value: '13'},
{text: '网络下载', value: '14'},
{text: 'app服务', value: '15'},
{text: '云计算', value: '16'},
{text: '供求信息发布', value: '17'},
{text: '旅游预订', value: '18'},
{text: '移动应用商店', value: '19'},
{text: '第三方支付', value: '20'},
{text: '网上银行', value: '21'},
{text: '财经服务', value: '22'},
{text: '网络购物', value: '23'},
{text: '云存储', value: '24'},
{text: 'FTP下载', value: '25'},
{text: 'P2P金融', value: '26'}                                  
	];  
  
  
//enterprise.siteServiceType
       
$scope.siteServiceTypeClick = function ($event) {
	
	var list=$("input[name='siteServiceType']");

  for(var i=0; i<list.length; i++){
      if(list[i].checked)
      	$scope.enterprise.siteServiceType=list[i].value
  }
};
  
  
$http.get(API_END_POINT + 'profile/detail')
	.success(function(data) {
		var result = data.attributes.data;
		$scope.user=result.user;
		$scope.enterprise=result.enterprise;
		$scope.principal=result.principal;
		$scope.bind=result.bind;
		$scope.webinfo=result.webinfo;
		$scope.emergency=result.emergency;
		
		if(!$scope.webinfo.ispBound){$scope.webinfo.ispBound='01'}
		if(!$scope.webinfo.ispName){$scope.webinfo.ispName='01'}
		if(!$scope.webinfo.ispType){$scope.webinfo.ispType='01'}
		if(!$scope.webinfo.domainBound){$scope.webinfo.domainBound='01'}
		if(!$scope.webinfo.domainName){$scope.webinfo.domainName='01'}
	})
	.error(function(data) {
		
	});


$scope.update = function() {
	$.ajax({
    type: "post",
		url: API_END_POINT+'profile/detail/all',
    data: {
      model: JSON.stringify({
				user:$scope.user,
				enterprise:$scope.enterprise,
				principal:$scope.principal,
				bind:$scope.bind,
				webinfo:$scope.webinfo,
				emergency:$scope.emergency
      })
		},
    success: function(data){
			var result = data.attributes.data;
			if(result){
      	$scope.principal=result.principal;
      	$scope.emergency=result.emergency;
      	$scope.bind=result.bind;
      	$scope.webinfo=result.webinfo;
				
			}
	    alert("操作成功");
    },
    error: function(a){
	    alert("保存失败");
    }
	})
}
	
}])