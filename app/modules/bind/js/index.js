'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/bind', {
		templateUrl : 'modules/bind/bind.html'
	}).when('/bind/add', {
		templateUrl : 'modules/bind/add.html'
	})
} ]);

app.controller("BindCtrl", ["$scope","$rootScope","$location","$http","API_END_POINT",
		function($scope, $rootScope, $location, $http, API_END_POINT) {
			var datas = {
				page : 1,
				data : [],
				busy : false
			}
			$scope.bindList = [];
			$scope.loadMore = function() {
				if (datas.busy) return;
				datas.busy = true;
				$http.get(API_END_POINT + 'bind/list?page=' + datas.page)
						.success(function(data) {
							var result = data.attributes.data;
							for ( var i = 0; i < result.length; i++) {
								var state=result[i].state;
								if(state === '00'){result[i].state='未审核'}
								else if(state === '01'){result[i].state='已审核'}
								else if(state === '02'){result[i].state='审核不通过';result[i].color='red';}
								else{result[i].state='未审核';}
								
								var type=result[i].type;
								if(type === 'D'){result[i].type='域名'}
								else if(type === 'A'){result[i].type='地址'}
								else if(type === 'I'){result[i].type='图片';}
								else if(type === 'M'){result[i].type='手机';}
								
								$scope.bindList.push(result[i]);
							}
							datas.page = data.attributes.page + 1;
							datas.busy = false;
						}).error(function(data) {
						});
				
				$scope.addL = function(id) {
					$location.path('/bind/add');
				};

				// 删除
				$scope.bindDelete = function(id) {
					if (window.confirm('确认删除吗？')) {
						for ( var i = 0; i < $scope.bindList.length; i++) {
							if ($scope.bindList[i].bindId == id) {
								$scope.bindList.splice(i, 1);
								$http['delete'](API_END_POINT + 'bind/detail/'+ id);
							}
						}
					}
				};

			};
		} ]);

app.controller("addBindCtrl",["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",
						function($scope, $routeParams, $rootScope, $location,
								$http, API_END_POINT) {
	                        $scope.bind= {type:'D'};
							$scope.addBind = function(address, icp,type) {
								if ((address + "").trim() === "" || address == null) {
									alert("域名名称不能为空");
									return;
								}
								if ((icp + "").trim() === "" || icp == null) {
									alert("icp备案号不能为空");
									return;
								}
								var RegUrl = new RegExp();
								RegUrl.compile("^[0-9a-zA-Z]+[0-9a-zA-Z\.-]*\.[a-zA-Z]{2,4}$");
								if (!RegUrl.test(address)) {
									alert("域名格式不正确");
									return;
								}
								$http.post(API_END_POINT + 'bind/detail?address=' + address + '&icp=' + icp + '&type=' + type)
										.success(function(data) {
											alert("添加成功");
											window.history.go(-1);
										}).error(function(data) {
											window.history.go(-1);
										});
							};
						}
]);
