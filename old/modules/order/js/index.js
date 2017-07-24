'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/order/list', {
		templateUrl : 'modules/order/order.html' // <!--所以订单-->
	}).when('/order/shipments', {
		templateUrl : 'modules/order/detail2.html'// <!--已付款订单详细页-->
	}).when('/order/sengding/:id', {
		templateUrl : 'modules/order/sending.html'// 发货
	}).when('/order/price/:id', {
		templateUrl : 'modules/order/update.html'// 修改价格
	}).when('/order/detail/:id', {
		templateUrl : 'modules/order/detail.html' // <!--查看详情-->
	}).when('/order/buyerPayment', {
		templateUrl : 'modules/order/buyerPayment.html' // <!--待付款-->
	}).when('/order/awaitS', {
		templateUrl : 'modules/order/awaitShipments.html' // <!--待发货-->
	}).when('/order/delivery', {
		templateUrl : 'modules/order/delivery.html' // <!--待收货-->
	}).when('/order/invalid', {
		templateUrl : 'modules/order/invalid.html' // <!--已作废-->
	}).when('/order/review', {
		templateUrl : 'modules/order/review.html' // <!--待评价-->
	}).when('/delivery_detail/:order', {
		templateUrl : 'modules/order/deliveryDetail.html' // <!--物流信息-->
	})
} ]);

// 全部
app.controller("orderCtrl", [
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
			$scope.orderList = [];
			var method = function(data, pic) {
				var result = data;
				for ( var i = 0; i < result.length; i++) {
					if (pic[i] != null) {
						result[i].memberId = pic[i];
					}
					if(result[i].orderStatus=='completed' &&result[i].all == "0"){
						result[i].orderStatusTxt = '已完成';
						if(result[i].paymentStatus == 'paid' && result[i].shippingStatus == 'shipped'){
							result[i].orderStatusTxt = '交易成功';
						}
					}else if (result[i].paymentStatus == 'paid') {
						result[i].orderStatusTxt = '已支付';
						if (result[i].shippingStatus == 'unshipped') {
							result[i].orderStatusTxt = '已付款';
						}
						if (result[i].shippingStatus == 'shipped') {
							if(result[i].all == "1"){
								result[i].orderStatusTxt = '待买家收货';
							}
						}
					} else if (result[i].paymentStatus == 'unpaid') {
						result[i].orderStatusTxt = '未付款';
					}
					// 显示去发货
					if (result[i].orderStatus != 'completed'
							&& result[i].orderStatus != 'invalid'
							&& result[i].paymentStatus == 'paid'
							&& result[i].shippingStatus == 'unshipped') {
						result[i].shippingStatus = 'true';
					} else {
						result[i].shippingStatus = 'false';
					}
					// 显示修改价格
					if (result[i].orderStatus == 'unprocessed'
							|| result[i].orderStatus == 'processed') {
						if (result[i].paymentStatus == 'unpaid'
								&& result[i].orderStatusInt != -1) {
							result[i].orderStatus = 'true';
							result[i].orderStatusTxt ='等待买家付款';
						}
					} else {
						result[i].orderStatus = 'false';
					}
					$scope.orderList.push(result[i]);
				}
				if (result.length > 0) {
					return $scope.orderList;
				}
			};
			// 查询
			$scope.orderSearch = function(orderSn) {
				$scope.orderList = [];
				datas.page = 1;
				datas.busy = false;
				var flage=0;
				if ((orderSn + "").trim() === "" || orderSn == null) {
					alert("条件不能为空");
                    $(".search-mask").show();
                    $(".search_style").removeClass("search");
                    $(".search-mask").show();
                    $(".search_style").show();
					return;
				}
				var re = /^[1-9]+[0-9]*]*$/;
				if(!re.test(orderSn)){
					//产品名称搜索
					flage=1;
				}
				$http.get(
						API_END_POINT + 'order/list?page=' + datas.page
								+ '&orderSn=' + orderSn+"&flage="+flage).success(
						function(data) {
							if (data.attributes.data.length > 0) {
								$scope.orderList = method(data.attributes.data,
										data.attributes.pic);
							}
							datas.page = data.attributes.page + 1;
							datas.busy = false;
						}).error(function(data) {
				});
			};
			$scope.loadMore = function() {
				if (datas.busy)
					return;
				datas.busy = true;
				$http.get(API_END_POINT + 'order/list?page=' + datas.page)
						.success(
								function(data) {
									if(data.attributes.grade !=null && data.attributes.grade!= '07'){
										$(".chaxun").css('display','block');
										return;
									}
									if (data.attributes.data.length > 0) {
										$scope.orderList = method(
												data.attributes.data,
												data.attributes.pic);
									}
									datas.page = data.attributes.page + 1;
									datas.busy = false;
									if(data.attributes.data.length == 0){
										datas.busy = true;
										if(data.attributes.page == 1){
											$scope.nodata=true;
										}
									}
								}).error(function(data) {
						});
				// 去发货
				$scope.shipments = function(id) {
					$location.path('order/sengding/' + id);
				};
				// 查看详情
				$scope.detail = function(id) {
					$location.path('order/detail/' + id);
				};
				// 修改价格
				$scope.price = function(id) {
					$location.path('order/price/' + id);
				};
				// 买家付款
				$scope.buyerPayment = function() {
					$location.path('order/buyerPayment/');
				};
				// 待发货
				$scope.awaitShipments = function() {
					$location.path('order/awaitS/');
				};
				// 待收货
				$scope.delivery = function() {
					$location.path('order/delivery/');
				};
				// 已作废
				$scope.invalid = function() {
					$location.path('order/invalid/');
				};
			};
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
		} ]);

// 买家付款
app.controller("buyerPaymentCtrl", [
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
			$scope.orderList = [];
			var method = function(data, pic) {
				var result = data;
				for ( var i = 0; i < result.length; i++) {
					if (pic[i] != null) {
						result[i].memberId = pic[i];
					}
					if (result[i].paymentStatus == 'paid') {
						result[i].orderStatusTxt = '已支付';
						if (result[i].shippingStatus == 'unshipped') {
							result[i].orderStatusTxt = '已付款';
						}
						if (result[i].shippingStatus == 'shipped') {
							result[i].orderStatusTxt = '已发货';
						}
					} else if (result[i].paymentStatus == 'unpaid') {
						result[i].orderStatusTxt = '未付款';
					}
					// 显示去发货
					if (result[i].orderStatus != 'completed'
							&& result[i].orderStatus != 'invalid'
							&& result[i].paymentStatus == 'paid'
							&& result[i].shippingStatus == 'unshipped') {
						result[i].shippingStatus = 'true';
					} else {
						result[i].shippingStatus = 'false';
					}
					// 显示修改价格
					if (result[i].orderStatus == 'unprocessed'
							|| result[i].orderStatus == 'processed') {
						if (result[i].paymentStatus == 'unpaid'
								&& result[i].orderStatusInt != -1) {
							result[i].orderStatus = 'true';
							result[i].orderStatusTxt ='等待买家付款';
						}
					} else {
						result[i].orderStatus = 'false';
					}
					$scope.orderList.push(result[i]);
				}
				if (result.length > 0) {
					return $scope.orderList;
				}
			}
			// 查询
			$scope.orderSearch = function(orderSn) {
				$scope.orderList = [];
				datas.page = 1;
				datas.busy = false;
				var flage=0
				if ((orderSn + "").trim() === "" || orderSn == null) {
					alert("条件不能为空");
                    $(".search-mask").show();
                    $(".search_style").removeClass("search");
                    $(".search-mask").show();
                    $(".search_style").show();
					return;
				}
				var re = /^[1-9]+[0-9]*]*$/;
				if(!re.test(orderSn)){
					//产品名称搜索
					flage=1;
				}
				$http.get(
						API_END_POINT + 'order/list?page=' + datas.page
								+ '&orderSn=' + orderSn +"&flag=0"+"&flage="+flage).success(
						function(data) {
							if (data.attributes.data.length > 0) {
								$scope.orderList = method(data.attributes.data,
										data.attributes.pic);
							}
							datas.page = data.attributes.page + 1;
							datas.busy = false;
						}).error(function(data) {
				});
			};
			$scope.loadMore = function() {
				if (datas.busy)
					return;
				datas.busy = true;
				$http.get(
						API_END_POINT + 'order/list?page=' + datas.page
								+ "&flag=0").success(
						function(data) {
							if(data.attributes.grade !=null && data.attributes.grade!= '07'){
								$(".chaxun").css('display','block');
								return;
							}
							if (data.attributes.data.length > 0) {
								$scope.orderList = method(data.attributes.data,
										data.attributes.pic);
							}
							datas.page = data.attributes.page + 1;
							datas.busy = false;
							if(data.attributes.data.length == 0){
								datas.busy = true;
								if(data.attributes.page == 1){
									$scope.nodata=true;
								}
							}
						}).error(function(data) {
				});
				// 全部
				$scope.oList = function() {
					$location.path('order/list/');
				};
				// 查看详情
				$scope.detail = function(id) {
					$location.path('order/detail/' + id);
				};
				// 修改价格
				$scope.price = function(id) {
					$location.path('order/price/' + id);
				};
				// 待发货
				$scope.awaitShipments = function() {
					$location.path('order/awaitS/');
				};
				// 待收货
				$scope.delivery = function() {
					$location.path('order/delivery/');
				};
				// 已作废
				$scope.invalid = function() {
					$location.path('order/invalid/');
				};
			};
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
		} ]);

// 待发货
app.controller("awaitShipmentsCtrl", [
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
			$scope.orderList = [];
			var method = function(data, pic) {
				var result = data;
				for ( var i = 0; i < result.length; i++) {
					if (pic[i] != null) {
						result[i].memberId = pic[i];
					}
					if (result[i].paymentStatus == 'paid') {
						result[i].orderStatusTxt = '已支付';
						if (result[i].shippingStatus == 'unshipped') {
							result[i].orderStatusTxt = '已付款';
						}
						if (result[i].shippingStatus == 'shipped') {
							result[i].orderStatusTxt = '已发货';
						}
					} else if (result[i].paymentStatus == 'unpaid') {
						result[i].orderStatusTxt = '未支付';
					}
					// 显示去发货
					if (result[i].orderStatus != 'completed'
							&& result[i].orderStatus != 'invalid'
							&& result[i].paymentStatus == 'paid'
							&& result[i].shippingStatus == 'unshipped') {
						result[i].shippingStatus = 'true';
					} else {
						result[i].shippingStatus = 'false';
					}
					$scope.orderList.push(result[i]);
				}
				if (result.length > 0) {
					return $scope.orderList;
				}
			}
			// 查询
			$scope.orderSearch = function(orderSn) {
				$scope.orderList = [];
				datas.page = 1;
				datas.busy = false;
				var flage=0;
				if ((orderSn + "").trim() === "" || orderSn == null) {
					alert("条件不能为空");
                    $(".search-mask").show();
                    $(".search_style").removeClass("search");
                    $(".search-mask").show();
                    $(".search_style").show();
					return;
				}
				var re = /^[1-9]+[0-9]*]*$/;
				if(!re.test(orderSn)){
					//产品名称搜索
					flage=1;
				}
				$http.get(
						API_END_POINT + 'order/list?page=' + datas.page
								+ '&orderSn=' + orderSn + "&flag=1"+"&flage="+flage).success(
						function(data) {
							if (data.attributes.data.length > 0) {
								$scope.orderList = method(data.attributes.data,
										data.attributes.pic);
							}
							datas.page = data.attributes.page + 1;
							datas.busy = false;
						}).error(function(data) {
				});
			};
			$scope.loadMore = function() {
				if (datas.busy)
					return;
				datas.busy = true;
				$http.get(
						API_END_POINT + 'order/list?page=' + datas.page
								+ "&flag=1").success(
						function(data) {
							if(data.attributes.grade !=null && data.attributes.grade!= '07'){
								$(".chaxun").css('display','block');
								return;
							}
							if (data.attributes.data.length > 0) {
								$scope.orderList = method(data.attributes.data,
										data.attributes.pic);
							}
							datas.page = data.attributes.page + 1;
							datas.busy = false;
							if(data.attributes.data.length == 0){
								datas.busy = true;
								if(data.attributes.page == 1){
									$scope.nodata=true;
								}
							}
						}).error(function(data) {
				});
				// 发货
				$scope.shipments = function(id) {
					$location.path('order/sengding/' + id);
				};
				// 全部
				$scope.oList = function() {
					$location.path('order/list/');
				};
				// 查看详情
				$scope.detail = function(id) {
					$location.path('order/detail/' + id);
				};
				// 买家
				$scope.buyerPayment = function() {
					$location.path('order/buyerPayment/');
				};
				// 待收货
				$scope.delivery = function() {
					$location.path('order/delivery/');
				};
				// 已作废
				$scope.invalid = function() {
					$location.path('order/invalid/');
				};
			};
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
		} ]);

// 待收货
app.controller("deliveryCtrl", [
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
			$scope.orderList = [];
			var method = function(data, pic) {
				var result = data;
				for ( var i = 0; i < result.length; i++) {
					if (pic[i] != null) {
						result[i].memberId = pic[i];
					}
					if (result[i].paymentStatus == 'paid') {
						result[i].orderStatusTxt = '已支付';
						if (result[i].shippingStatus == 'unshipped') {
							result[i].orderStatusTxt = '已付款';
						}
						if (result[i].shippingStatus == 'shipped' && result[i].all == "0") {
							result[i].orderStatusTxt = '交易完成';
						}else{
							result[i].orderStatusTxt = '待买家收货';
						}
					} else if (result[i].paymentStatus == 'unpaid') {
						result[i].orderStatusTxt = '未支付';
					}
					if (result[i].orderStatus != 'completed'
							&& result[i].orderStatus != 'invalid'
							&& result[i].paymentStatus == 'paid'
							&& result[i].shippingStatus == 'unshipped') {
						result[i].shippingStatus = 'true';
					} else {
						result[i].shippingStatus = 'false';
					}
					$scope.orderList.push(result[i]);
				}
				if (result.length > 0) {
					return $scope.orderList;
				}
			}
			// 查询
			$scope.orderSearch = function(orderSn) {
				$scope.orderList = [];
				datas.page = 1;
				datas.busy = false;
				var flage=0;
				if ((orderSn + "").trim() === "" || orderSn == null) {
					alert("条件不能为空");
                    $(".search-mask").show();
                    $(".search_style").removeClass("search");
                    $(".search-mask").show();
                    $(".search_style").show();
					return;
				}
				var re = /^[1-9]+[0-9]*]*$/;
				if(!re.test(orderSn)){
					//产品名称搜索
					flage=1;
				}
				$http.get(
						API_END_POINT + 'order/list?page=' + datas.page
								+ '&orderSn=' + orderSn + "&flag=2"+"&flage="+flage).success(
						function(data) {
							if (data.attributes.data.length > 0) {
								$scope.orderList = method(data.attributes.data,
										data.attributes.pic);
							}
							datas.page = data.attributes.page + 1;
							datas.busy = false;
						}).error(function(data) {
				});
			};
			$scope.loadMore = function() {
				if (datas.busy)
					return;
				datas.busy = true;
				$http.get(
						API_END_POINT + 'order/list?page=' + datas.page
								+ "&flag=2").success(
						function(data) {
							if(data.attributes.grade !=null && data.attributes.grade!= '07'){
								$(".chaxun").css('display','block');
								return;
							}
							if (data.attributes.data.length > 0) {
								$scope.orderList = method(data.attributes.data,
										data.attributes.pic);
							}
							datas.page = data.attributes.page + 1;
							datas.busy = false;
							if(data.attributes.data.length == 0){
								datas.busy = true;
								if(data.attributes.page == 1){
									$scope.nodata=true;
								}
							}
						}).error(function(data) {
				});
				// 全部
				$scope.oList = function() {
					$location.path('order/list/');
				};
				// 查看详情
				$scope.detail = function(id) {
					$location.path('order/detail/' + id);
				};
				// 查看物流
				$scope.deliveryD = function(o,e) {
					$location.path('delivery_detail/'+encodeURIComponent(JSON.stringify(o)));
					e.stopPropagation();
				};
				// 买家
				$scope.buyerPayment = function() {
					$location.path('order/buyerPayment/');
				};
				// 待发货
				$scope.awaitShipments = function() {
					$location.path('order/awaitS/');
				};
				// 已作废
				$scope.invalid = function() {
					$location.path('order/invalid/');
				};
			};
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
		} ]);

app
		.controller(
				"invalidCtrl",
				[
						"$scope",
						"$rootScope",
						"$location",
						"$http",
						"API_END_POINT",
						function($scope, $rootScope, $location, $http,
								API_END_POINT) {
							var datas = {
								page : 1,
								data : [],
								busy : false
							}
							$scope.orderList = [];
							var method = function(data) {
								var result = data;
								for ( var i = 0; i < result.length; i++) {
									if (result[i].orderStatus == 'invalid') {
										result[i].orderStatusTxt = '已作废';
									}
									$scope.orderList.push(result[i]);
								}
								if (result.length > 0) {
									return $scope.orderList;
								}
							}
							// 查询
							$scope.orderSearch = function(orderSn) {
								$scope.orderList = [];
								datas.page = 1;
								datas.busy = false;
								var flage=0;
								if ((orderSn + "").trim() === ""
										|| orderSn == null) {
									alert("条件不能为空");
									return;
								}
								var re = /^[1-9]+[0-9]*]*$/;
								if(!re.test(orderSn)){
									//产品名称搜索
									flage=1;
								}
								$http
										.get(
												API_END_POINT
														+ 'order/list?page='
														+ datas.page
														+ '&orderSn=' + orderSn
														+ "&flag=3"+"&flage="+flage)
										.success(
												function(data) {
													if (data.attributes.data.length > 0) {
														$scope.orderList = method(data.attributes.data);
													}
													datas.page = data.attributes.page + 1;
													datas.busy = false;
												}).error(function(data) {
										});
							};
							$scope.loadMore = function() {
								if (datas.busy)
									return;
								datas.busy = true;
								$http
										.get(
												API_END_POINT
														+ 'order/list?page='
														+ datas.page
														+ "&flag=3")
										.success(
												function(data) {
													if(data.attributes.grade !=null && data.attributes.grade!= '07'){
														$(".chaxun").css('display','block');
														return;
													}
													if (data.attributes.data.length > 0) {
														$scope.orderList = method(data.attributes.data);
													}
													datas.page = data.attributes.page + 1;
													datas.busy = false;
												}).error(function(data) {
										});
								// 全部
								$scope.oList = function() {
									$location.path('order/list/');
								};
								// 查看详情
								$scope.detail = function(id) {
									$location.path('order/detail/' + id);
								};
								// 买家
								$scope.buyerPayment = function() {
									$location.path('order/buyerPayment/');
								};
								// 待发货
								$scope.awaitShipments = function() {
									$location.path('order/awaitS/');
								};
								// 待收货
								$scope.delivery = function() {
									$location.path('order/delivery/');
								};
							};
						} ]);

// 查看详情
app.controller(
				"viewCtrl",
				[
						"$scope",
						"$routeParams",
						"$rootScope",
						"$location",
						"$http",
						"API_END_POINT",
						function($scope, $routeParams, $rootScope, $location,
								$http, API_END_POINT) {
							var orderId = $routeParams.id;
							$scope.productL = [];
							$scope.productL_ = [];
							$scope.payable = 0;
							// 修改价格
							$scope.pri = "false";
							// 付款
							$scope.shippingS = "false";
							// 发货时间
							$scope.receive = "false";
							// 去发货
							$scope.goReceive = "false";
							$scope.sPhone = 'false';
							$scope.sMobile = 'false';
							var state = function(orderStatus) {
								if (orderStatus == 'unprocessed') {
									return '未处理';
								} else if (orderStatus == 'processed') {
									return '已处理';
								} else if (orderStatus == 'completed') {
									return '已完成';
								} else {
									return '已作废';
								}
							}
							$http
									.get(
											API_END_POINT + 'order/listDetail/'
													+ orderId)
									.success(
											function(data) {
												var result = data.attributes.data;
												var product = data.attributes.product;
												var date = data.attributes.date;
												var paymentTime = data.attributes.paymentTime;
												var shippingTime = data.attributes.shippingTime;
												$scope.oId = data.attributes.oId;
												//应付款
												$scope.payable =data.attributes.totalAmount;
												// 付款时间和发货时间
												if (paymentTime != null) {
													$scope.paymentTime = paymentTime;
													$scope.shippingS = "true";
												}
												if (shippingTime != null) {
													$scope.shippingTime = shippingTime;
													$scope.receive = "true";
												}
												if (result.orderStatus == 'completed') {
													$scope.orderStatus = '已完成';
													if(result.paymentStatus == 'paid' && result.shippingStatus == 'shipped'){
														$scope.orderPrompt = '交易已成功';
													}else{
														$scope.orderPrompt = '交易已结束';
													}
												} else if (result.orderStatus == 'invalid') {
													$scope.orderStatus = '已作废';
												} else if (result.paymentStatus == 'unpaid') {
//													$scope.orderStatus = state(result.orderStatus);
													if (date == -1 || date == 0) {
														$scope.orderPrompt = '“付款”操作已自动关闭';
														$scope.orderStatus = '买家未付款';
													} else {
														$scope.pri = "true";
														$scope.orderStatus = '等待买家付款';
														$scope.orderPrompt = '买家还有'
																+ date
																+ '分钟来完成“付款”操作，逾期未完成，本交易将自动关闭';
													}
												} else if (result.paymentStatus == 'paid'&& result.shippingStatus == 'unshipped') {
													$scope.goReceive = "true";
//													$scope.orderStatus = state(result.orderStatus);
													$scope.orderStatus ='等待您发货';
													$scope.orderPrompt = '买家已付款，请您尽快发货。如果您无法发货，请及时与买家联系并说明情况';
													$scope.paymentTime = data.attributes.paymentTime;
												} else if (result.shippingStatus == 'shipped') {
													$scope.orderStatus = state(result.orderStatus);
													var dh = data.attributes.dayHour;
													if (dh != -1 && dh != 0) {
														$scope.orderPrompt = '买家还有'
																+ dh
																+ '来完成本次交易的“确认收货“';
														$scope.orderStatus='等待买家确认收货';
													} else if (dh == -1) {
														$scope.orderStatus='买家已确认收货';
														$scope.orderPrompt = '交易已成功';
													}
												}
												$scope.orderSn = result.orderSn;
												$scope.addTime = result.addTime;
												$scope.memo = result.memo;
												$scope.orderId = result.orderId;
												$scope.shipName = result.shipName;
												// 电话
												if (result.shipPhone != ''
														&& result.shipPhone != null) {
													$scope.shipPhone = result.shipPhone;
													$scope.sPhone = 'true';
												}
												if (result.shipMobile != ''
														&& result.shipMobile != null) {
													$scope.shipMobile = result.shipMobile;
													$scope.sMobile = 'true';
												}
												$scope.shipAddress = result.shipArea
														+ result.shipAddress;
												for ( var i = 0; i < product.length; i++) {
													$scope.productL
															.push(product[i]);
													angular.copy(
															$scope.productL,
															$scope.productL_);
												}
												$scope.updatePri = function(id) {
													$location
															.path('order/price/'
																	+ id);
												};
											}).error(function(data) {
									});
							// 去发货
							$scope.goShipments = function(id) {
								$location.path('order/sengding/' + id);
							};
						} ]);

// 去发货
app
		.controller(
				"sendingCtrl",
				[
						"$scope",
						"$routeParams",
						"$rootScope",
						"$location",
						"$http",
						"API_END_POINT",
						function($scope, $routeParams, $rootScope, $location,
								$http, API_END_POINT) {
							var orderId = $routeParams.id;
							$scope.express = [];
							$scope.sPhone = 'false';
							$scope.sMobile = 'false';
							$http
									.get(
											API_END_POINT + 'order/detail/'
													+ orderId)
									.success(
											function(data) {
												if(data.attributes.grade !=null && data.attributes.grade!= '07'){
													$(".chaxun").css('display','block');
													return;
												}
												var result = data.attributes.data;
												$scope.orders = result;
												$scope.shipName = result.shipName;
												result.shipPhone == null ? result.shipPhone = ''
														: result.shipPhone = result.shipPhone;
												result.shipMobile == null ? result.shipMobile = ''
														: result.shipMobile = result.shipMobile;
												$scope.shipPhone = result.shipPhone
														+ " "
														+ result.shipMobile;
												$scope.shipAddress = result.shipArea
														+ result.shipAddress;
												$scope.orderId = result.orderId;
												var express = data.attributes.middle;
												$scope.express = express;
												// 电话
												if (result.shipPhone != ''
														&& result.shipPhone != null) {
													$scope.shipPhone = result.shipPhone;
													$scope.sPhone = 'true';
												}
												if (result.shipMobile != ''
														&& result.shipMobile != null) {
													$scope.shipMobile = result.shipMobile;
													$scope.sMobile = 'true';
												}
												if (express.length > 0) {
													$scope.exp = express[0].com;
												}
											}).error(function(data) {
									});
							$scope.saveExpress = function(id, exp, cost,
									deliverySn) {
								if (exp == null || deliverySn == null
										|| deliverySn.trim() == ''
										|| cost == null || cost.trim() == '') {
									alert("内容不能为空");
									return;
								}
								if (cost < 0) {
									alert("运费不能小于0");
									return;
								}
								$http.put(
										API_END_POINT
												+ 'order/express?orderId=' + id
												+ '&com=' + exp
												+ '&deliverySn=' + deliverySn
												+ '&cost=' + cost).success(
										function(data) {
											alert(data.msg);
											window.history.back();
										}).error(function(data) {
									window.history.back();
								});
							}
						} ]);

// 修改价格
app.controller("priceCtrl", [
		"$scope",
		"$routeParams",
		"$rootScope",
		"$location",
		"$http",
		"API_END_POINT",
		function($scope, $routeParams, $rootScope, $location, $http,
				API_END_POINT) {
			var id = $routeParams.id;
			$scope.productList = [];
			$scope.productList_ = [];
			$scope.total=0;
			$http.get(API_END_POINT + 'order/priceDetail?orderId=' + id)
					.success(
							function(data) {
								var orderSn = data.attributes.orderSn;
								var deliveryFee = data.attributes.deliveryFee;
								var product = data.attributes.data;
								$scope.orderSn = orderSn;
								if (deliveryFee == null) {
									$scope.deliveryFee = 0;
								} else {
									$scope.deliveryFee = deliveryFee;
								}
								$scope.total=$scope.deliveryFee;
								for ( var i = 0; i < product.length; i++) {
									if(product[i].price>0){
										$scope.total+=product[i].price*product[i].productQuantity;
									}
									$scope.productList.push(product[i]);
									angular.copy($scope.productList,
											$scope.productList_);
								}
							}).error(function(data) {
					});
				
			$scope.updatePrice = function(deliveryFee, productList) {
				if ((deliveryFee + "").trim() === "" || deliveryFee == null) {
					alert("物流运费不能为空");
					return;
				}
				var list = "";
				var count = 0;
				for ( var i = 0; i < productList.length; i++) {
					if ((productList[i].price + "").trim() === ""
							|| productList[i].price == null) {
						alert("价格不能为空");
						return;
					}
					if (productList[i].price != $scope.productList_[i].price) {
						if (count == 0) {
							list += "id=" + productList[i].orderId + ",price="
									+ productList[i].price;
							++count;
						} else {
							list += ";id=" + productList[i].orderId + ",price="
									+ productList[i].price;
						}
					}
				};
				$http.put(
						API_END_POINT + 'order/update?list=' + list
								+ "&orderId=" + id + "&deliveryFee="
								+ deliveryFee+"&total="+$scope.total).success(function(data) {
					alert(data.msg);
					window.history.go(-1);
				}).error();
			}
			setTimeout(function(){
				//判断价格总计
				$("input").blur(function(){
					$scope.total =  $(".order_price_v2 input").val()*1;
					for(var i =0;i<$(".order_price_product_type").length;i++){
						$scope.total+=$(".order_price_product_fr input").eq(i).val()*$(".order_price_product_totel span").eq(i).text().substr(1);
					}
					$(".font_16.orange").html('<em class="font_14">￥</em>'+$scope.total+'元');
				});
			}, 3000 )
		} ]);

app.controller("deliveryDCtrl",["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",	
	function($scope, $routeParams, $rootScope, $location,$http, API_END_POINT) {
	var api="http://api.ickd.cn/?id=108377&secret=1d323e291b7778da812664d0386f7b11&type=json&ord=desc&encode=utf8&ver=2";
	$scope.o=JSON.parse($routeParams.order);
	$scope.list=[];
	$scope.status='在途中';
	$.ajax({
        type: 'get',
        url: api + "&com=" + $scope.o.com + "&nu=" + $scope.o.deliverySn,
        async: false,
        dataType: 'jsonp',
        success: function(result) {
          	if (result.status == '0') {
          		$('.tip').show();
        	} else { 
        		if(result.status == '2'){$scope.status='派送中'}
        		if(result.status == '3'){$scope.status='已签收'}
        		if(result.status == '4'){$scope.status='退回'}
        		if(result.status == '5'){$scope.status='其他问题'}
        		$scope.list=result.data;
        		$scope.$apply();
        		$('.de-list').eq(0).find('.de-item').addClass('active');
        		$('.de-list').eq(0).find('.time').addClass('active');
        	}
         
        }
      });
}])