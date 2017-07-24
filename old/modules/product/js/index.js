'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/product/list', {
		templateUrl : 'modules/product/product.html'
	}).when('/product/update/:id', {
		templateUrl : 'modules/product/view.html'
	}).when('/product/category', {
		templateUrl : 'modules/product/category.html'
	}).when('/productC/add', {
		templateUrl : 'modules/product/category_add.html'
	}).when('/product_add', {
		templateUrl : 'modules/product/product_add.html'
	})
} ]);
app.controller("ProductCtrl",["$scope","$rootScope","$location","$http","API_END_POINT",
	function($scope, $rootScope, $location, $http,API_END_POINT) {
		$scope.productVersions = 'false';
		var datas = {
					page : 1,
					data : [],
					busy : false
		}
		$scope.productList = [];
		$scope.productSelect = 'false';
		$scope.loadMore = function() {
								// 搜索
			$scope.search = function(pName,name,count) {
									if (pName !=0 && count == 0) {
										if (pName == null) {
											pName = 0;
										}
										$scope.productList = [];
										datas.page = 1;
										datas.busy = false;
										$http.get(API_END_POINT
																+ 'product/list?page=0'
																+ '&category='
																+ pName)
												.success(
														function(data) {
															var result = data.attributes.data;
															//name 改变span内容
															$(".app_nav_txt").html(name+"<span class='font_14'>("+data.attributes.count+")</span>");
															for ( var i = 0; i < result.length; i++) {
																$scope.productList
																		.push(result[i]);
															}
															datas.page = data.attributes.page + 1;
															datas.busy = false;
														}).error(
														function(data) {
														});
									} else if (pName !=0 ){
										if ((pName + "").trim() === ""
												|| pName == null) {
											alert("产品名称不能为空");
										$(".search-mask").show();
                                            $(".search_style").show();
											return;
										}
										$scope.pName = pName;
										if (count == '1') {
											$scope.productList = [];
											datas.page = 1;
											datas.busy = false;
										}
										$("body").css({
											overflow : "scroll"
										});
										$http.get(API_END_POINT
																+ 'product/list?page=0'
																+ '&name='
																+ pName)
												.success(
														function(data) {
															//name 改变span内容
															$(".app_nav_txt").html($scope.pName+"<span class='font_14'>("+data.attributes.count+")</span>");
															var result = data.attributes.data;
															for ( var i = 0; i < result.length; i++) {
																$scope.productList
																		.push(result[i]);
															}
															if(data.attributes.versions=='电商版'){
																$scope.productVersions = 'true';
															}
															datas.page = data.attributes.page + 1;
															datas.busy = false;
														}).error(
														function(data) {
														});
									}
									if(pName ==0){
										location.reload();
									}else{
										$scope.flagProduct='false';
									}
								}
								if($scope.flagProduct !='false'){
									if (datas.busy)
										return;
									datas.busy = true;
									if ($scope.pName
											&& ($scope.pName + "").trim() !== "") {
										$scope.search($scope.pName, 2);
										return;
									}
									$http.get(API_END_POINT
															+ 'product/list?page='
															+ datas.page)
											.success(
													function(data) {
														$(".app_nav_txt").html("全部产品<span class='font_14'>("+data.attributes.count+")</span>");
														var result = data.attributes.data;
														for ( var i = 0; i < result.length; i++) {
															if ((result[i].price + "")
																	.trim() === ""
																	|| result[i].price == null) {
																result[i].price = 0;
															} else {
																result[i].price = result[i].price;
															};
															result[i].picPath=$rootScope.picUrl(result[i].picPath,5);
															$scope.productList.push(result[i]);
														}
														if(data.attributes.versions=='电商版'){
															$scope.productVersions = 'true';
														}
														datas.page = data.attributes.page + 1;
														datas.busy = false;
													}).error(function(data) {
											});
								}
								//显示隐藏
								$scope.productIsDisplay=function(product) {
									product.isdisplay= product.isdisplay === '1' ? '0'
											: '1';
									$http.put(API_END_POINT + 'product/detail/'
											+ product.productId
											+ '?isdisplay='
											+ product.isdisplay);
								}
								
								// 上架 下架
								$scope.productIsMarketable = function(product) {
									product.ismarketable = product.ismarketable === '01' ? '00'
											: '01';
									$http.put(API_END_POINT + 'product/detail/'
											+ product.productId
											+ '?ismarketable='
											+ product.ismarketable);
								};
								$scope.show = function(product) {
									product.showSub = product.showSub === '1' ? '0'
											: '1';
								};
								// 删除
								$scope.productDelete = function(id) {
									if (window.confirm('确认删除吗？')) {
										for ( var i = 0; i < $scope.productList.length; i++) {
											if ($scope.productList[i].productId == id) {
												$scope.productList.splice(i, 1);
												$http['delete'](API_END_POINT
														+ 'product/detail/'
														+ id);
											}
										}
									}
								};
		};
							// 顶部分类查看
		$scope.productSl = function(productSelect) {
								productSelect == 'true' ? $scope.productSelect = 'false'
										: $scope.productSelect = 'true';
								if ($scope.productSelect == 'false') {
									$("body").css({
										overflow : "scroll"
									});
                                     $(".app-content").css({
                                        position:"static"
                                    });
								} else {
									$("body").css({
										overflow : "hidden"
									});
                                    $(".app-content").css({
                                        position:"fixed",
                                        width:"100%"
                                    })
                                }
		};
		//分类查看
		$scope.cat = [];
		$http.get(API_END_POINT + 'product/updateList?categ=1')
			.success(function(data) {
												var categoryList = data.attributes.categoryList;
												if (categoryList.length > 0) {
													for ( var i = 0; i < categoryList.length; i++) {
														$scope.cat.push(categoryList[i]);
													}
												}
			}).error(function(data) {
			});


		$scope.add = function() {
			$location.path('/product_add');
		};
							
							$scope.productUpdate = function(id) {
								$location.path('/product/update/' + id);
							};
							// 分类管理
							$scope.productCategory = function() {
								$location.path('/product/category');
							};
							//product页面事件
                            $(".input-small").focus(function(){
                                $(".app_footer").hide();
                            });
                            $(".input-small").blur(function(){
                                $(".app_footer").show();
                            });
                            $(".search-mask").click(function(){
                                $(".search-mask").hide();
                                $(".search_style").hide();
                            });
                            $(".button-search").click(function(){
                                $(".input-small").focus();
                                $(".search-mask").show();
                                $(".search_style").show();
                            });
                            $(".search-product").click(function(){
                                $(".search-mask").hide();
                                $(".search_style").hide();
                            })

}]);

// 修改
app.controller("productIdCtrl",["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",
	function($scope, $routeParams, $rootScope, $location,$http, API_END_POINT) {
	var vm = $scope.vm = {};
	$scope.loading_text="加载中";
	var productId = $routeParams.id;
    $scope.productVersions = 'false';
	$http.get(API_END_POINT+ 'product/updateList?id=' + productId)
    .success(function(data) {
			$scope.product = data.attributes.data;
			if(data.attributes.versions=='电商版'){
				$scope.productVersions = 'true';
			}
			var categoryList = data.attributes.categoryList;
			$scope.categoryList = categoryList;
			if (categoryList.length > 0) {
				for ( var i = 0; i < categoryList.length; i++) {
					if (categoryList[i].categoryId === $scope.product.category) {
						$scope.categorySelect = categoryList[i].categoryId;
					}
				}
			}
		}).error(function(data) {
    });
							
		$scope.update = function(categoryId) {
			if ($scope.product.name == null
					|| $scope.product.name + "" === ""
					|| $scope.product.weight === ""
					|| $scope.product.price === ""
					||$scope.product.marketprice === ""
					|| $scope.product.store === "") {
				alert("不能有空值");
				return;
			};
			if (categoryId == null) {
				categoryId = 0;
			}
			if($scope.product.prodtype == null|| $scope.product.prodtype + "" === ""){
				$scope.product.prodtype="";
			}
			if($scope.product.picPath != null && $scope.product.attachmentId != null){
				if($scope.product.productimageliststore === 'null' || $scope.product.productimageliststore === null){
					$scope.product.productimageliststore = JSON.stringify([{id:$scope.product.attachmentId,sourceProductImagePath:$scope.product.picPath}]);
				}else{
					var server_pic_list = JSON.parse($scope.product.productimageliststore);
					server_pic_list[0].id=$scope.product.attachmentId;
					server_pic_list[0].sourceProductImagePath=$scope.product.picPath;
					$scope.product.productimageliststore = JSON.stringify(server_pic_list);
				}
			}
			$http.put(API_END_POINT + 'product/detail/'
							+ $scope.product.productId + '?name='
							+ $scope.product.name 
							+ '&prodtype='+ $scope.product.prodtype
							+ '&categoryId=' + categoryId
							+ '&picPath=' + $scope.product.picPath
							+ '&weight=' + $scope.product.weight
							+ '&productimageliststore=' + $scope.product.productimageliststore
							+ '&weightunit='+ $scope.product.weightunit 
							+ '&price='+ $scope.product.price
							+ '&marketprice='+ $scope.product.marketprice
							+ '&store=' +$scope.product.store
							+ '&all=' + 1).success(
					function(data) {
						alert("修改成功");
						window.history.go(-1);
					}).error(function(data) {
				window.history.go(-1);
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
	          $scope.product.picPath=data.result.attributes.data;
	          $scope.product.attachmentId=data.result.attributes.attId;
	          $('.fileupload').attr('src','http://img.jihui88.com/'+$scope.product.picPath)
	        },
	        fail: function(e,data){
	        	  $('.loading_click').click();
	        }
		});													
}]);
//新增
app.controller("productAddCtrl",["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",
	function($scope, $routeParams, $rootScope, $location,$http, API_END_POINT) {
	$scope.categoryList = [];
	$scope.result_ = [];
	$http.get(API_END_POINT + 'product/categoryManage')
		.success(function(data) {
			var result = data.attributes.categoryList;
			for ( var i = 0; i < result.length; i++) {
				$scope.categoryList.push(result[i]);
			}
			angular.copy($scope.categoryList,$scope.result_);
		}).error(function(data) {
	});
	$scope.product={
			prodtype:'',
			picPath:'',
			weight:0,
			categoryId:0,
			weightunit:'kg',
			marketprice:0,
			price:0,
			store:0
	};
	 $scope.loading_text="加载中";
    				
	 $scope.add = function(product,categoryId) {
			if ($scope.product.name == null || $scope.product.name + "" === "") {
				alert("产品名称不能为空");
				return;
			};
			if (categoryId == null) {
				alert("请选择分类");
				return;
			}
			$scope.loading=true;$scope.$apply();
			$http.post(API_END_POINT + 'product/detail?name=' + $scope.product.name 
							+ '&prodtype='+ $scope.product.prodtype
							+ '&categoryId=' + categoryId
							+ '&picPath=' + $scope.product.picPath
							+ '&weight=' + $scope.product.weight
							+ '&weightunit='+ $scope.product.weightunit 
							+ '&price='+ $scope.product.price
							+ '&marketprice='+ $scope.product.marketprice
							+ '&store=' +$scope.product.store
							+ '&all=' + 1).success(
					function(data) {
						alert("发布成功");
						window.history.go(-1);
					}).error(function(data) {
				window.history.go(-1);
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
	          $scope.product.picPath=data.result.attributes.data;
	          $scope.product.attachmentId=data.result.attributes.attId;
	          $('.fileupload').attr('src','http://img.jihui88.com/'+$scope.product.picPath)
	        },
	        fail: function(e,data){
	        	  $('.loading_click').click();
	        }
		});													
}]);

app.controller("productCCtrl",["$scope","$rootScope","$location","$http","API_END_POINT",
						function($scope, $rootScope, $location, $http,API_END_POINT) {
							$scope.categoryList = [];
							$scope.result_ = [];
							$http.get(API_END_POINT + 'product/categoryManage')
									.success(function(data) {
												var result = data.attributes.categoryList;
												for ( var i = 0; i < result.length; i++) {
													$scope.categoryList
															.push(result[i]);
												}
												angular.copy(
														$scope.categoryList,
														$scope.result_);
											}).error(function(data) {
									});

							// 新增
							$scope.addCategory = function() {
								$location.path('/productC/add');
							};
							// 修改
							$scope.productUpdate = function(categoryList) {
								var list = "";
								var count = 0;
								for ( var i = 0; i < categoryList.length; i++) {
									if (categoryList[i].name != $scope.result_[i].name) {
										if ((categoryList[i].name + "").trim() === ""
												|| categoryList[i].name == null) {
											alert("分类名称不能为空");
											return;
										}
										if (count == 0) {
											list += "id="
													+ categoryList[i].categoryId
													+ ",name="
													+ categoryList[i].name;
											++count;
										} else {
											list += ";id="
													+ categoryList[i].categoryId
													+ ",name="
													+ categoryList[i].name;
										}
									}
								}
								$http.put(
										API_END_POINT + 'category/update?list='
												+ list).success(function(data) {
									if (!data.success) {
										alert(data.msg);
										return;
									}
									alert("修改成功");
								});
							};
							// 删除
							$scope.categoryDel = function(id) {
								if (window.confirm('确认删除吗？')) {
									for ( var i = 0; i < $scope.categoryList.length; i++) {
										if ($scope.categoryList[i].categoryId == id) {
											var index = i;
											$http['delete']
													(
															API_END_POINT
																	+ 'category/detail/'
																	+ id
																	+ "?type=10")
													.success(
															function(data) {
																if (!data.success) {
																	alert(data.msg);
																	return;
																} else {
																	$scope.categoryList
																			.splice(
																					index,
																					1);
																	categoryList = $scope.categoryList;
																	$scope.result_ = $scope.categoryList;
																}
															});
										}
									}
								}
							};
						} ]);

// 分类添加
app.controller("addpCategoryCtrl", [
		"$scope",
		"$rootScope",
		"$location",
		"$http",
		"API_END_POINT",
		function($scope, $rootScope, $location, $http, API_END_POINT) {
			$scope.cat = [];
			$http.get(API_END_POINT + 'category/rank?type=10').success(
					function(data) {
						var result1 = data.attributes.categoryList1;
						for ( var i = 0; i < result1.length; i++) {
							$scope.cat.push(result1[i]);
						}
					}).error(function(data) {
			});
			// 新增
			$scope.saveProdect = function(belongId, name) {
				if ((name + "").trim() === "" || name == null) {
					alert("分类名称不能为空");
					return;
				}
				;
				if (belongId == null) {
					belongId = "0";
				}
				$http.post(
						API_END_POINT + 'category/detail?belongId=' + belongId
								+ '&name=' + name + '&type=10').success(
						function(data) {
							if (!data.success) {
								alert(data.msg);
							} else {
								alert("新增成功");
							}
							window.history.go(-1);
						}).error(function(data) {
					window.history.go(-1);
				});
			};
		} ]);