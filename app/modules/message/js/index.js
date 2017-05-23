'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/message/list', {
		templateUrl : 'modules/message/message.html'
	}).when('/message/detail/:id', {
		templateUrl : 'modules/message/detail.html'
	}).when('/message/bind', {
		templateUrl : 'modules/message/message_bind.html'
	})
} ]);

app.controller("MessageCtrl", ["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",
		function($scope, $routeParams, $rootScope, $location, $http,API_END_POINT) {
			var datas = {
				page : 1,
				data : [],
				busy : false
			}
			$scope.footerMessage=true;
			var recvState = $routeParams.recvState;
			$scope.messageList = [];
			// 查询留言
			$scope.loadMore = function() {
				if (datas.busy)
					return;
				datas.busy = true;
				$http.get(
						API_END_POINT + 'message/list?page=' + datas.page
								+ '&recvState=' + recvState).success(
						function(data) {
							var result = data.attributes.data;
							for ( var i = 0; i < result.length; i++) {
								$scope.messageList.push(result[i]);
							}
							datas.page = data.attributes.page + 1;
							datas.busy = false;
						}).error(function(data) {
				});

				
				var init=0;	
				//加载滑动删除事件
				$scope.messageDetail = function(id) {
					function prevent_default(e) {
						e.preventDefault();
					}

					function disable_scroll() {
						$(document).on('touchmove', prevent_default);
					}
					// 移动事件
					function enable_scroll() {
						$(document).unbind('touchmove', prevent_default)
					}

					var x;
					$('.message_list dl > a').on('touchstart', function(e) {
						console.log(e.originalEvent.pageX)
						$('.message_list dl > a').css('left', '0px')
						$(e.currentTarget).addClass('open')
						x = e.originalEvent.targetTouches[0].pageX
					}).on('touchmove', function(e) {
						var change = e.originalEvent.targetTouches[0].pageX - x
						change = Math.min(Math.max(-60, change), 0)
						e.currentTarget.style.left = change + 'px'
						if (change < -10)
							disable_scroll()
					}).on('touchend', function(e) {
						var left = parseInt(e.currentTarget.style.left)
						var new_left;
						if (left < -35) {
							init=0;
							new_left = '0px'
						} else {
							new_left = '-8rem';
						}
//						 e.currentTarget.style.left = new_left
//						$(e.currentTarget).animate({
//							left : new_left
//						}, 300)
						enable_scroll()
					});

					// 点删除后的隐藏
					$('.delete-btn').on(
							'touchend',
							function(e) {
									e.preventDefault();
									if(init==0){
										$(this).parents('dl').slideUp(
												'fast',
												function() {
													$http['delete'](API_END_POINT
															+ 'message/detail/' + id);
												}
												)
									}
									init=1;
							})
				};
				$scope.messageDetailId = function(id) {
					$location.path('message/detail/' + id);
				}
				
				
				
				// 一键已读
				// $scope.keyRead = function(){
				// $http.get(API_END_POINT +
				// 'message/keyRead').success(function(data) {
				// location.reload();
				// });
				// }
			};
            $(".message_list").hide();
            
            //绑定邮箱
            $scope.bind= function(){
            	$location.path('message/bind');
            }
           /* $scope.items = ['html5','jq','FE-演示平台'];
            $scope.open = function(size){  //打开模态 
                var modalInstance = $modal.open({
                    templateUrl : 'modules/views/dialog.html',  //指向上面创建的视图
                    controller : 'DialogCtrl',// 初始化模态范围
                    size : size, //大小配置
                    resolve : {
                        items : function(){
                            return $scope.items;
                        }
                    }
                })
                modalInstance.result.then(function(selectedItem){  
                    $scope.selected = selectedItem;
                },function(){
                    $log.info('Modal dismissed at: ' + new Date())
                })
            }*/
}]);

app.controller("messageIdCtrl", ["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",
                         		function($scope, $routeParams, $rootScope, $location, $http,API_END_POINT, $sce) {
			var messageId = $routeParams.messageId;
			$http.get(API_END_POINT + 'message/detail/' + messageId).success(
					function(data) {
						var result = data.attributes.data;
						if (data.attributes.up == '1') {
							$scope.dwon = 'true';
						}
						if (data.attributes.down == '1') {
							$scope.up = 'true';
						}
						$scope.message = result;
						if(result.content.indexOf('[{"value":"') > -1){
			                  var cList=JSON.parse(result.content);
			                  $scope.message.content='';
			                  $.each(cList, function(index,cItem){
			                    if(cList.length === 1 && cItem.type=== 'textarea'){//单一选项
			                    	$scope.message.content=cItem.value
			                    }else{
			                      if(cItem.label == '姓名'){
			                    	  $scope.message.fromName=cItem.wxNick || cItem.value
			                      }else{
			                        if(result.content === ''){
			                        	$scope.message.content=cItem.label+':'+cItem.value
			                        }else{
			                        	$scope.message.content=$scope.message.content+'&nbsp;&nbsp;'+cItem.label+':'+cItem.value
			                        }
			                      } 
			                    }
			                  });
			                }else{
			                	$scope.message.content =$sce.trustAsHtml(result.content);
			                }
					}).error(function(data) {

			});

			$scope.viewMessage = function(message, flage) {
				$http.get(
						API_END_POINT + 'message/detail/' + message.id
								+ "?flage=" + flage).success(function(data) {
					if (data.attributes.up == '1') {
						$scope.dwon = 'true';
					} else {
						$scope.dwon = 'false';
					}
					if (data.attributes.down == '1') {
						$scope.up = 'true';
					} else {
						$scope.up = 'false';
					}
					var result = data.attributes.data;
					$scope.message = result;

					$scope.message.content = $sce.trustAsHtml(result.content);
					
				}).error(function(data) {

				});
			}
}]);

app.controller('MessageBindCtrl',["$scope","$http","$location","API_END_POINT",function($scope,$http, $location,API_END_POINT){
	  $scope.bind= function(){
      	$location.path('message/list');
      }
	$http.get(API_END_POINT+'message/bind/detail').
	success(function(data){
		$scope.message = data.attributes.data[0];
		if($scope.message.state == null && $scope.message.state == undefined){
			$scope.message={
					state : '01'
			}
		}
	});
	$scope.addBind= function(message){
		var RegUrl = new RegExp();
		RegUrl.compile("^[a-zA-Z0-9_\.]+@[a-zA-Z0-9-]+[\.a-zA-Z]+$");
		if (!RegUrl.test(message.key)) {
			alert("Email格式不正确");
			return;
		}
		if($scope.message.id == null){
			$http.post(API_END_POINT+'message/bind/detail?state=' + message.state + '&key=' + message.key).
			success(function(data){
				alert("添加成功");
				window.history.go(-1);
			}).error(function(){
				window.history.go(-1);
			})
		}else{
			$http.put(API_END_POINT+'message/bind/detail/'+ $scope.message.enterpriseId +'?state=' + message.state + '&key=' + message.key).
			success(function(data){
				alert("修改成功");
				window.history.go(-1);
			}).error(function(){
				window.history.go(-1);
			})
		}
		
		
	}
}])