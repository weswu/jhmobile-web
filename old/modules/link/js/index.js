'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/link/update/:id', {
		templateUrl : 'modules/link/view.html'
	}).when('/link/add', {
		templateUrl : 'modules/link/add.html'
	})
} ]);

app.controller("linkCtrl", [
		"$scope",
		"$rootScope",
		"$location",
		"$http",
		"API_END_POINT",
		function($scope, $rootScope, $location, $http, API_END_POINT) {
			var datas = {
				page : 1,
				data : [],
				busy : false
			}
			$scope.linkList = [];
			$scope.loadMore = function() {
				if (datas.busy)
					return;
				datas.busy = true;
				$http.get(API_END_POINT + 'link/list?page=' + datas.page)
						.success(function(data) {
							var result = data.attributes.data;
							for ( var i = 0; i < result.length; i++) {
								result[i].state = "0";
								$scope.linkList.push(result[i]);
							}
							datas.page = data.attributes.page + 1;
							datas.busy = false;
						}).error(function(data) {
						});

				$scope.show = function(link) {
					// 1显示
					link.state == 0 ? link.state = 1 : link.state = 0;
				};

				$scope.linkUpdate = function(id) {
					$location.path('/link/update/' + id);
				};
				$scope.addL = function(id) {
					$location.path('/link/add');
				};

				// 删除
				$scope.linkDelete = function(id) {
					if (window.confirm('确认删除吗？')) {
						for ( var i = 0; i < $scope.linkList.length; i++) {
							if ($scope.linkList[i].linkId == id) {
								$scope.linkList.splice(i, 1);
								$http['delete'](API_END_POINT + 'link/detail/'
										+ id);
							}
						}
					}
				};

			};
		} ]);

// 修改
app
		.controller(
				"linkIdCtrl",
				[
						"$scope",
						"$routeParams",
						"$rootScope",
						"$location",
						"$http",
						"API_END_POINT",
						function($scope, $routeParams, $rootScope, $location,
								$http, API_END_POINT) {
							var linkId = $routeParams.id;
							$scope.link_ = [];
							$http
									.get(
											API_END_POINT + 'link/updateList/'
													+ linkId)
									.success(function(data) {
										$scope.link = data.attributes.data;
										link_ = data.attributes.data;
									}).error(function(data) {
									});

							$scope.update = function(link) {
								if ((link.name + "").trim() === ""
										|| link.name == null) {
									alert("链接名称不能为空");
									return;
								}
								if ((link.url + "").trim() === ""
										|| link.url == null) {
									alert("链接地址不能为空");
									return;
								}
								var RegUrl = new RegExp();
								RegUrl
										.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
								if (!RegUrl.test(link.url)) {
									alert("链接格式不正确");
									return;
								}
								$http.put(
										API_END_POINT + 'link/detail/'
												+ link.linkId + '?name='
												+ link.name + '&url='
												+ link.url).success(
										function(data) {
											alert("修改成功");
											window.history.go(-1);
										}).error(function(data) {
									window.history.go(-1);
								});
							};
						} ]);

app
		.controller(
				"addLinkCtrl",
				[
						"$scope",
						"$routeParams",
						"$rootScope",
						"$location",
						"$http",
						"API_END_POINT",
						function($scope, $routeParams, $rootScope, $location,
								$http, API_END_POINT) {
							$scope.addLink = function(name, url) {
								if ((name + "").trim() === "" || name == null) {
									alert("链接名称不能为空");
									return;
								}
								if ((url + "").trim() === "" || url == null) {
									alert("链接地址不能为空");
									return;
								}
								var RegUrl = new RegExp();
								RegUrl
										.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
								if (!RegUrl.test(url)) {
									alert("链接格式不正确");
									return;
								}
								$http.post(
										API_END_POINT + 'link/detail?name='
												+ name + '&url=' + url)
										.success(function(data) {
											alert("添加成功");
											window.history.go(-1);
										}).error(function(data) {
											window.history.go(-1);
										});
							};
						} ]);
