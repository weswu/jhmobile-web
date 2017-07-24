'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/log/list', {
		templateUrl : 'modules/log/log.html'
	})
} ]);
app.controller("LogCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
		function($scope, $rootScope, $location, $http, API_END_POINT) {
			//封闭datas
			var datas = {
				page:1,
				data:[],
				busy:false
			}
			$scope.logList = [];
			$scope.loadMore = function() {
				if (datas.busy) return;
			    datas.busy = true;
				// 查询所有log列表
				$http.get(API_END_POINT + 'log/list?page='+datas.page).success(function(data) {
					var result = data.attributes.data;
					for(var i=0;i<result.length;i++){
						if(result[i].location.indexOf("错误")>-1 || result[i].location.indexOf("未分配")>-1){
							result[i].location="";
						}
						$scope.logList.push(result[i]);
					}
					datas.page=data.attributes.page+1;
					datas.busy = false;
				}).error(function(data) {

				});
			  };
		} 
]);