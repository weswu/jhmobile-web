'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/point', {
	    templateUrl : 'modules/point/point.html'
	}).when('/point_exchange', {
	    templateUrl : 'modules/point/point_exchange.html'
	}).when('/point_detail', {
	    templateUrl : 'modules/point/point_detail.html'
	}).when('/point_rule', {
	    templateUrl : 'modules/point/point_rule.html'
	}).when('/point/:id/:tab', {
	    templateUrl : 'modules/point/point_list.html'
	}).when('/point_ranking', {
	    templateUrl : 'modules/point/point_ranking.html'
	})
}]);


app.controller("PointCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {

	$scope.username=CONST.user.username;
	if($.isEmptyObject(CONST.enterprise)){
		$http.get(API_END_POINT + 'enterprise/detail')
		.success(function(data) {
			CONST.enterprise=data.attributes.data;
			$scope.enterName=CONST.enterprise.name
		}).error(function(data) {
			$scope.enterName=CONST.user.username;$scope.username='';
		});	
	}else{
		$scope.enterName=CONST.enterprise.name 
	}
	if($scope.enterName === null || $scope.enterName === ''){
		$scope.enterName=CONST.user.username;$scope.username='';
	}
  $scope.point=0;$scope.rank=0;
  $scope.phone=CONST.user.cellphone;
  
	$http.get(API_END_POINT + 'point/info').success(
		function(data) {
			if(data.msg==="未登陆"){$location.path('/login')}
			$scope.point=data.attributes.point || 0;	
			$scope.rank=data.attributes.rank || 0;	
			CONST.point={
					point:$scope.point,
					rank:$scope.rank
			}
		}).error(function(data) {
		});
	
	$scope.exchange = function(n){
		var val=100000;var id='';
		if(n ===1 ){val=500;id="Integralpro_00000000000000000201"}
		if(n ===2 ){val=1000;id="Integralpro_00000000000000000221"}
		if(n ===3 ){val=5000;id="Integralpro_00000000000000000081"}
		if(val > $scope.point){
			alert('您的积分不足,无法兑换')
		}else{
			var r=confirm("确定兑换")
		  if (r==true){
		  	$http.put(API_END_POINT + 'point_product/detail/'+id).success(
		  			function(data) {
		  				if(data.success){
		  					alert('兑换成功')
		  				}else{
		  					alert(data.msg)
		  				}
		  			}).error(function(data) {
	  					alert('兑换失败')
		  		});
		  }
		}
	}
	$scope.product = function(){
		alert('商品正在整理中…')
	}
	$scope.ranking = function(val){
		$location.path('/point_ranking');
	}
	
}]);


app.controller("PointDetailCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
	$scope.List = [];
	$scope.page = 1;
	$scope.busy = false;
	$scope.point = CONST.point.point;
	// 查询
	$scope.loadMore = function(orderSn) {
		if ($scope.busy) return;
		$scope.busy = true;
		$http.get(
			API_END_POINT + 'point/list?page=' + $scope.page).success(
			function(data) {
				if (data.attributes.data.length > 0) {
					$scope.List =data.attributes.data;
					$scope.page = data.attributes.page + 1;
					$scope.busy = false;
				}else{
					if($scope.page===1){$('.data-tip').html('请新增产品后再查看')}
					$('.data-tip').show()
				}

			}).error(function(data) {
			});

		$scope.rule = function(){
			$location.path('/point_rule');
		}   
	}	
}]);
app.controller("PointExchangeCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
	

	$scope.point = CONST.point.point;
	
	$scope.List = [];
	$scope.page = 1;
	$scope.busy = false;
	// 查询
	$scope.loadMore = function(orderSn) {
		if ($scope.busy) return;
		$scope.busy = true;
		$http.get(
			API_END_POINT + 'point/list?page=' + $scope.page + '&productId=1').success(
			function(data) {
				if (data.attributes.data.length > 0) {
					$scope.List =data.attributes.data;
					$scope.page = data.attributes.page + 1;
					$scope.busy = false;
				}else{
					if($scope.page===1){$('.data-tip').html('暂无消费记录')}
					$('.data-tip').show()
				}

			}).error(function(data) {
			});
		
	}	
	
	$scope.rule = function(){
		$location.path('/point_rule');
	}                                                           	 
}]);
app.controller("PointRuleCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
	$rootScope.rule={
			accountEditPoint: 0,
			productAddPoint: 0,
			productEditPoint: 0,
			newsAddPoint: 0,
			newsEditPoint: 0,
			publishPoint: 0,
			mounthRecordPoint: 0,
			advisePoint: 0,
			orderPoint: 0,
			posterPoint: 0
	}
	$http.get(API_END_POINT + 'point_rule/info').success(
			function(data) {
				$scope.rule=data.attributes.data;	
			}).error(function(data) {
			});                              	 
}]);
app.controller("PointListCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT","$routeParams",
	function($scope, $rootScope, $location, $http, API_END_POINT, $routeParams) {
	var vm = $scope.vm = {};
	$scope.point=$routeParams.id;
	vm.activeTab=$routeParams.tab;
	
	$scope.exchange = function(val){
		if(val > $scope.point){
			alert('您的积分不足,无法兑换')
		}else{
			alert('积分充足')
		}
	}
                                                                  	
}]);

app.controller("PointRankingCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
	$scope.point = CONST.point.point;
	$scope.rank = CONST.point.rank;
	$scope.compare = 0;
	$scope.rankingList=[];
	var page=1;

	$scope.loadMore = function() {
		$http.get(API_END_POINT + 'point/rank?page='+page+'&pageSize=10').success(
				function(data) {
					var re=data.attributes.data;
					if (re.length > 0) {
						for(var i=0; i<re.length; i++){
							$scope.rankingList.push(re[i]);
						}
					}else{
						$('.view-more').hide()
					}
					if($scope.rank !=0 && page == 1){
						$scope.compare=((data.attributes.count-$scope.rank)/data.attributes.count).toFixed(2)*100
					}
				}).error(function(data) {
				});                 
		
		
		
	}	
	$scope.loadMore();
	
	$scope.more = function(){
		page=page+1;
		$scope.loadMore();
	}
}]);



