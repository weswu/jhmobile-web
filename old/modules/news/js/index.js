'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/news/list', {
		templateUrl : 'modules/news/news.html'
	}).when('/news/update/:id', {
		templateUrl : 'modules/news/news_update.html'
	}).when('/news/add', {
		templateUrl : 'modules/news/add.html'
	}).when('/category/add', {
		templateUrl : 'modules/news/category_add.html'
	})
} ]);
app.controller("NewsCtrl", [
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
			$scope.newsList = [];
			$scope.newsSelect = "false";
			$scope.loadMore = function() {
				// 搜索
				$scope.search = function(title, name, count) {
					if (title != 0 && count == '0') {
						if (title == null) {
							title = 0;
						}
						$scope.newsList = [];
						datas.page = 1;
						datas.busy = false;
						$http.get(API_END_POINT + 'news/list?page=0'
										+ '&category=' + title).success(
								function(data) {
									if(data.success == false){location.reload();return false}
									var result = data.attributes.data;
									//name 改变span内容
									$(".app_nav_txt").html(name+"<span class='font_14'>("+data.attributes.count+")</span>");
									for ( var i = 0; i < result.length; i++) {
										$scope.newsList.push(result[i]);
									}
									datas.page = data.attributes.page + 1;
									datas.busy = false;
								}).error(function(data) {
						});
					} else if (title != 0) {
						if ((title + "").trim() === "" || title == null) {
							alert("标题不能为空");
							$(".search-mask").show();
							$(".search_style").removeClass("search");
                            $(".search-mask").show();
                            $(".search_style").show();
							return;
						}
						$scope.title = title;
						if (count == '1') {
							$scope.newsList = [];
							datas.page = 1;
							datas.busy = false;
						}
						$http.get(
								API_END_POINT + 'news/list?page=0' + '&title='
										+ title).success(function(data) {
							$(".app_nav_txt").html($scope.title+"<span class='font_14'>("+data.attributes.count+")</span>");
							var result = data.attributes.data;
							for ( var i = 0; i < result.length; i++) {
								$scope.newsList.push(result[i]);
							}
							datas.page = data.attributes.page + 1;
							datas.busy = false;
						}).error(function(data) {
						});
					}
					if (title == 0) {
						location.reload();
					} else {
						$scope.flagNews = 'false';
					}
				}
				if ($scope.flagNews != 'false') {
					if (datas.busy)
						return;
					datas.busy = true;
					if ($scope.title && ($scope.title + "").trim() !== "") {
						$scope.search($scope.title, 2);
						return;
					}
					$http.get(API_END_POINT + 'news/list?page=' + datas.page)
							.success(function(data) {
								var result = data.attributes.data;
								$(".app_nav_txt").html("全部新闻<span class='font_14'>("+data.attributes.count+")</span>");
								for ( var i = 0; i < result.length; i++) {
									$scope.newsList.push(result[i]);
								}
								datas.page = data.attributes.page + 1;
								datas.busy = false;
							}).error(function(data) {
							});
				}
				// 显示 隐藏
				$scope.newsDisplay = function(news) {
					news.display = news.display === '01' ? '02' : '01';
					$http.put(API_END_POINT + 'news/detail/' + news.newsId
							+ '?display=' + news.display);
				};
				// 顶置 未顶置
				$scope.newsTopnews = function(news) {
					news.topnews = news.topnews === '01' ? '02' : '01';
					$http.put(API_END_POINT + 'news/detail/' + news.newsId
							+ '?topnews=' + news.topnews);
				};
				$scope.show = function(news) {
					news.showSub = news.showSub === '1' ? '0' : '1';
				};
				// 删除
				$scope.newsDelete = function(id) {
					if (window.confirm('确认删除吗？')) {
						for ( var i = 0; i < $scope.newsList.length; i++) {
							if ($scope.newsList[i].newsId == id) {
								$scope.newsList.splice(i, 1);
								$http['delete'](API_END_POINT + 'news/detail/'
										+ id);
							}
						}
					}
				};
			};
			
			// 顶部分类查看
			$scope.newsSl = function(newsSelect) {
				newsSelect == 'true' ? $scope.newsSelect = 'false'
						: $scope.newsSelect = 'true';
				if ($scope.newsSelect == 'false') {
					$("body").css({
						overflow : "scroll"
					});
                    $(".app-content").css({
                        position:"static"
                    })
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
			//分类查询
			$scope.addCategory = [];
			$http.get(API_END_POINT + 'news/updateList?categ=1').success(
					function(data) {
						var result = data.attributes.categoryList;
						for ( var i = 0; i < result.length; i++) {
							$scope.addCategory.push(result[i]);
						}
					}).error(function(data) {
			});
			
			$scope.newsUpdate = function(id) {
				$location.path('/news/update/' + id);
			};
			// 分类管理
			$scope.addNews = function() {
				$location.path('/news/add');
			};
			// news页面事件
			$(".input-small").focus(function() {
				$(".app_footer").hide();
			});
			$(".input-small").blur(function() {
				$(".app_footer").show();
			});
			$(".search-mask").click(function() {
				$(".search_style").addClass("search");
			});
			$(".button-search").click(function() {
				$(".input-small").focus();
			});
			$(".search-product").click(function() {
				$(".search-mask").hide();
				$(".search_style").addClass("search");
			})
            //news页面事件
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
		} ]);
// 修改
app.controller("newsIdCtrl",["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",
	function($scope, $routeParams, $rootScope, $location,$http, API_END_POINT) {
	var newsId = $routeParams.newsId;
	$scope.categoryList_u = [];
	$http.get(API_END_POINT+ 'news/updateList?id='+ newsId)
									.success(function(data) {
												var news = data.attributes.data;
												$scope.newsId = news.newsId;
												$scope.newsTitle = news.title;
												$scope.origin = news.origin;
												$scope.author=news.author;
												$scope.content=news.content;
												var categoryList = data.attributes.categoryList;
												$scope.categoryList = categoryList;
												$scope.categoryList_u = categoryList;
												if (categoryList.length > 0) {
													for ( var i = 0; i < categoryList.length; i++) {
														if (categoryList[i].categoryId === news.category) {
															$scope.categorySelect = categoryList[i].categoryId;
														}
													}
												}
											}).error(function(data) {
	});
	$scope.editor=$("#xheditor").xheditor({skin:'nostyle',tools:'Blocktag,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,SelectAll,Removeformat,Table,Align,List,Outdent,Indent,Link,Unlink,Hr,Source,Fullscreen'});		

	$scope.update = function(id, newsTitle, categoryId,origin,author) {
								if ((newsTitle + "").trim() === ""
										|| newsTitle == null) {
									alert("标题不能为空");
									return;
								}
								if (categoryId == null) {
									categoryId = 0;
								}
								$http.post(
										API_END_POINT + 'news/update',{
											id:id,title:newsTitle,categoryId:categoryId,
											content:this.editor.getSource(),author:author,origin:origin
										})
										.success(function(data) {
											alert("修改成功");
											window.history.go(-1);
										}).error(function(data) {
											window.history.go(-1);
										});
	};				
}]);

app.controller("addNewsCtrl", ["$scope","$rootScope","$location","$http","API_END_POINT",
		function($scope, $rootScope, $location, $http, API_END_POINT) {
			// 查询分类
			$http.get(API_END_POINT + 'news/updateList?id=0').success(
					function(data) {
						var categoryList = data.attributes.categoryList;
						$scope.categoryList = categoryList;
						if (categoryList.length > 0) {
							$scope.categorySelect = categoryList[0].categoryId;
						}
					}).error(function(data) {
			});
			$scope.editor=$("#xheditor").xheditor({skin:'nostyle',tools:'Blocktag,Fontface,FontSize,Bold,Italic,Underline,Strikethrough,FontColor,BackColor,SelectAll,Removeformat,Table,Align,List,Outdent,Indent,Link,Unlink,Hr,Source,Fullscreen'});		

			$scope.saveNews = function(title, categoryId,author,origin) {
				var content=this.editor.getSource();
				if ((title + "").trim() === "" || title == null) {
					alert("新闻标题不能为空");
					return;
				}
				if ((content + "").trim() === "" || content == null) {
					alert("新闻内容不能为空");
					return;
				}
				$http.post(API_END_POINT + 'news/add',{
					title:title,categoryId:categoryId,content:content,author:author,origin:origin
				}).success(function(data) {
					alert("发布成功");
					window.history.go(-1);
				}).error(function(data) {
					window.history.go(-1);
				});
			};
		} ]);

app.controller("categoryCtrl",["$scope","$rootScope","$location","$http","API_END_POINT",
						function($scope, $rootScope, $location, $http,API_END_POINT) {
							$scope.categoryList = [];
							$scope.result_ = [];
							$http.get(API_END_POINT + 'news/categoryManage')
									.success(
											function(data) {
												var result = data.attributes.categoryList;
												for ( var i = 0; i < result.length; i++) {
													$scope.categoryList.push(result[i]);
												}
												angular.copy($scope.categoryList,$scope.result_);
											}).error(function(data) {
									});
							// 新增
							$scope.addCategory = function() {
								$location.path('/category/add');
							};
							// 修改
							$scope.categoryUpdate = function(categoryList) {
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
								$http.put(API_END_POINT + 'category/update?list=' + list).success(function(data) {
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
											$http['delete'](API_END_POINT
																	+ 'category/detail/'
																	+ id
																	+ "?type=11")
													.success(
															function(data) {
																if (!data.success) {
																	alert(data.msg);
																	return;
																} else {
																	$scope.categoryList.splice(index,1);
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
app.controller("addCategoryCtrl", [
		"$scope",
		"$rootScope",
		"$location",
		"$http",
		"API_END_POINT",
		function($scope, $rootScope, $location, $http, API_END_POINT) {
			$scope.addCategory = [];
			$http.get(API_END_POINT + 'category/rank/?type=11').success(
					function(data) {
						var result = data.attributes.categoryList1;
						for ( var i = 0; i < result.length; i++) {
							$scope.addCategory.push(result[i]);
						}
					}).error(function(data) {
			});

			// 新增
			$scope.add = function(belongId, name) {
				if ((name + "").trim() === "" || name == null) {
					alert("分类名称不能为空");
					return;
				}
				if (belongId == null) {
					belongId = "0";
				}
				$http.post(
						API_END_POINT + 'category/detail?belongId=' + belongId
								+ '&name=' + name + '&type=11').success(
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