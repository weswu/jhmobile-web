'use strict';
app.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/album',{
		templateUrl:'modules/album/album.html'
	})
}]);

app.controller("AlbumCtrl",['$scope','$rootScope','$location','$http','API_END_POINT','$tool',
     function($scope,$rootScope,$location,$http,API_END_POINT,$tool){
	 var page = 1;$scope.busy =false;
	    $scope.photoList = [];
	    $scope.categoryId = 'all';$scope.name = '全部相册';
	    $scope.loadMore = function() {
			if ($scope.busy)return;
			$scope.busy = true;
			$scope.search($scope.categoryId, $scope.name, page);
		};
		
		$scope.search = function(categoryId, name,number) {	// 搜索分类ID album/attr/list/all')
			$scope.categoryId = categoryId;
			$scope.name = name;
			page = number;
			if(page === 1){ $scope.photoList = [];}
		    $http.get(API_END_POINT + 'album/attr/list/' + $scope.categoryId+ '?page=' + page+ '&pageSize=15&sort=att_id' )
			    .success(function(data) {
					//name 改变标题
					$(".app_nav_txt").html($scope.name+"<span class='font_14'>("+data.attributes.count+")</span>");
					var result = data.attributes.data;
					if(result.length === 0){
		        		if(page == 1){$('.loadData').html('暂无数据');$('.loadData').show()}else{$('.loadData').remove()}
						$scope.busy = true;
					}else{
						for ( var i = 0; i < result.length; i++) {
							result[i].serverPath=$tool.picUrl(result[i].serverPath,5);
							$scope.photoList.push(result[i]);
						}
						page = data.attributes.page + 1;
						$scope.busy = false;
					}
				})
			.error(function(data) {});
		}
		
	    // 顶部分类查看
		$scope.category = false;
		$scope.selectCategory = function() {
			 $scope.category = !$scope.category;
			if ($scope.category) {
				$("body").css({overflow : "hidden"});
             $(".app-content").css({position:"fixed",width:"100%"})
			} else {
				$("body").css({overflow : "scroll"});
             $(".app-content").css({position:"static"})
			}
		};
		//分类查询
		$scope.CategoryList = [{albumId:'all',name: '全部相册'}];
		$http.get(API_END_POINT + 'album/list?pageSize=100').success(
		    function(data) {
		    	var result = data.attributes.data;
				for ( var i = 0; i < result.length; i++) {
					$scope.CategoryList.push(result[i]);
				}
			 }).error(function(data) {
		});
		
 }]);