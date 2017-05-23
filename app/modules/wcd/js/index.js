'use strict';
app.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/wcd',{
		templateUrl:'modules/wcd/my.html'
	}).when('/wcd_case',{
		templateUrl:'modules/wcd/case.html'
	}).when('/wcd_vip',{
		templateUrl:'modules/wcd/vip.html'
	}).when('/wcd_open/:id',{
		templateUrl:'modules/wcd/wcd_open.html'
	})
}]);

app.controller("WcdCtrl",['$scope','$rootScope','$location','$http','API_END_POINT',
    function($scope,$rootScope,$location,$http,API_END_POINT){
	$rootScope.wcd={};
	if($rootScope.user && ($rootScope.user.wcdMember == null || $rootScope.user.wcdMember !='01')){
		$('.tip').show();
		return false;
	}
	var page = 1;$scope.busy =false;$scope.busy2 =false;
	$scope.wcdList = [];
	    
	$scope.loadMore = function() {
			if ($scope.busy || $scope.busy2)return;
			$scope.busy = true;
			$scope.search($scope.categoryId, page);
	};
	$scope.search = function(categoryId,number) {	
			$scope.categoryId = categoryId;
			$scope.name = name;
			page = number;
			if(page === 1){ $scope.wcdList = [];}
		    $http.get(API_END_POINT + 'wcd/list?page=' + page+ '&pageSize=10' )
			    .success(function(data) {
					var result = data.attributes.data;
					$scope.busy = false;
					if(result.length === 0){
						if(page===1){
							$('.tip').show().html('暂无数据');
						}
						$scope.busy2 = true;return false;
					}else{
						for ( var i = 0; i < result.length; i++) {
							if(result[i].sharepic.indexOf('http') == -1){
								result[i].sharepic="http://wcd.jihui88.com"+result[i].sharepic;
							}
							$scope.wcdList.push(result[i]);
						}
						page = data.attributes.page + 1;
					}
					
				})
			.error(function(data) {});
		}
	$scope.shareClick =function(id){
		$('.item-'+id+' .shareQr').toggle()
	}
	$scope.open= function(id){
		$location.path('/wcd_open/'+id)
	}
}]);

app.controller("WcdCateCtrl",['$scope','$rootScope','$location','$http','API_END_POINT','$tool',
    function($scope,$rootScope,$location,$http,API_END_POINT,$tool){
	  var page = 1;$scope.busy =false;
	    $scope.wcdList = [];$scope.categoryId="";
	    
	    //加载
	    $scope.loadMore = function() {
			if ($scope.busy)return;
			$scope.busy = true;
			$scope.search($scope.categoryId, page);
		};
		//搜索
		$scope.search = function(categoryId,number) {	
			$scope.categoryId = categoryId;
			$scope.name = name;
			page = number;
			var url='&category_id=' +$scope.categoryId;
			if(page === 1){ $scope.wcdList = [];}
			if(categoryId === ''){ url=''}
		    $http.get(API_END_POINT + 'wcd/case?page=' + page+ '&pageSize=10'+url)
			    .success(function(data) {
					var result = data.attributes.data;
					if(result.length === 0){
						$scope.busy = true;
					}else{
						for ( var i = 0; i < result.length; i++) {
							if(page==1||page==2){
								result[i].views=$tool.num10000(result[i].views)
								result[i].mviews=$tool.num10000(result[i].mviews)
								result[i].rviews=$tool.num10000(result[i].rviews)
								}
							$scope.wcdList.push(result[i]);
						}
						page = data.attributes.page + 1;
						$scope.busy = false;
					}
					
				})
			.error(function(data) {});
		}
		
		//分类
		$scope.categoryList=[{id:'',name:'全部'}];
		$scope.cateData=function(){
			$http.get(API_END_POINT +'wcd/category').
			success(function(data){
					var result = data.attributes.data;
					for ( var i = 0; i < result.length; i++) {
						$scope.categoryList.push(result[i]);
					}
			 })
			.error(function(data) {})
		}

		$scope.hide = true;
		$scope.cataBool = true;
		$scope.categoryClick =function(){
			if($scope.cataBool){
				$scope.cateData();
				$scope.cataBool = false;
			}
			$scope.hide = !$scope.hide;
		}
		$scope.categoryActive=function(id){
			var target=$('.category-list a').eq(this.$index);
			target.addClass('active');
			target.siblings().removeClass('active');
			$scope.categoryClick();
			$scope.search(target.attr('data-id'), 1);
		}

		$scope.shareClick =function(id){
			$('.item-'+id+' .shareQr').toggle()
		}

		$scope.open= function(id){
			$location.path('/wcd_open/'+id)
		}
		
}]);

app.controller("WcdVipCtrl",['$scope','$rootScope','$location','$http','API_END_POINT',
    function($scope,$rootScope,$location,$http,API_END_POINT){
	var enterpriseId=$rootScope.user.enterpriseId;
	var endTime=($rootScope.userInfo && $rootScope.userInfo.endTime.length>8) || false;
	  var page = 1;$scope.busy =false;$scope.busy2 =false;
	    $scope.wcdList = [];
	    
	    //加载
	    $scope.loadMore = function() {
			if ($scope.busy || $scope.busy2)return;
	    	$scope.busy = true;
			$scope.search();
		};
		//搜索
		$scope.search = function() {	
		    $http.get(API_END_POINT + 'wcd/vip?page=' + page+ '&pageSize=10')
			    .success(function(data) {
					var result = data.attributes.data;$scope.busy = false;
					if(result.length === 0){$scope.busy2 = true;return false}
					if(result.length > 0){
						for ( var i = 0; i < result.length; i++) {
							$scope.wcdList.push(result[i]);
						}
						page = data.attributes.page + 1;
					}
					
				})
			.error(function(data) {});
		}
		$(function() {
			$(".index_update .icon-close").click(function() {
				$(".index-mask").hide();
				$(".index_update").hide();
				$scope.wcd={
					vip:'00',
					id:'00'
				};
				$scope.vipList=[];
			})
		});
		
		$scope.vipList=[];
		$scope.wcd={
			vip:'00',
			id:'00'
		};
	    $scope.vip = function(wcd) {
	    	/*if(endTime){
	    		alert('开通会员,可任意使用')
	    		return false;
	    	}*/
	    	if(wcd.showVip){
	    		if(wcd.seo_title.indexOf('双11') > -1||wcd.seo_title.indexOf('电脑网站开通上线啦') > -1||wcd.seo_title.indexOf('十月一国庆节企业祝福宣传模板') > -1){$rootScope.wcd.pageVip=true;}
	    		$location.path('/wcd_open/'+wcd.id)
	    		return false
	    	}
			$scope.wcd={
					vip:wcd.vip,
					id:wcd.id
				};
	    	if (wcd.vip === '01') {
	    		if(wcd.seo_title.indexOf('双11') > -1||wcd.seo_title.indexOf('电脑网站开通上线啦') > -1||wcd.seo_title.indexOf('十月一国庆节企业祝福宣传模板') > -1){
	    			$rootScope.wcd.pageVip=true;
	    		}else{
	    			$rootScope.wcd.pageVip=false;
	    		}
	            $.ajax({
	              type: 'get',
	              url: 'http://wcd.jihui88.com/rest/comm/wcd/copyp',
	              data: {
	            	enterpriseId:enterpriseId,
	                wcdId: wcd.id,
	                fields: JSON.stringify($scope.vipList)
	              },
	              dataType:'JSONP',
	              success: function(result) {
	                if (result.success) {
	                  if (result.attributes.shortage == true) {
	                	  if($scope.vipList.length>0){alert('请完善传单信息');return false}
	                    // 第一次提交,完善数据
	                	  $(".index-mask").show();$(".index_update").show();
	                	  
	                	  $scope.vipList=result.attributes.fields;
	                	  $scope.$apply();
	                  } else {
	                	  if(confirm("传单生成成功,确定查看"))
	                	  {
	                	  	var origin_id=result.attributes.data.origin_id;
	                		  $location.path('/wcd_open/'+result.attributes.data.wcdId);$scope.$apply();
	                	  }
	                  }
	                }else{
	      	    			$rootScope.wcd.pageVip=false;
	                	alert(result.msg)
	                }
	              },
	              error: function(){
	            	  alert('请求异常')
	              }
	            });
	          } else {
	            alert('请开通vip,才能使用')
	          }
		};
		
		$scope.vipSub = function(){
			$scope.vip($scope.wcd);
		}
		$scope.vipChange= function(i,v){
			$scope.vipList[i].value=v
		};
		$scope.vipImg = function(i){
			var i=i;
			$('#fileupload').click();
			$('#fileupload').fileupload({
			    url: API_END_POINT + 'album/fileupload',
			    sequentialUploads: true,
			    add: function (e, data) {
			        data.submit();$('.loading_click').click();
			    },
		        done: function (e, data) {
		          $('.loading_click').click();
		          $scope.vipList[i].value='http://img.jihui88.com/'+data.result.attributes.data;
		          $scope.$apply();
		        },
		        fail: function(e,data){
		        	  $('.loading_click').click();
		        }
			});
		}	

		$scope.shareClick =function(id){
			$('.item-'+id+' .shareQr').toggle()
		}
}]);

app.controller("WcdOpenCtrl",['$scope','$routeParams','$rootScope','$location','$http','API_END_POINT','$sce',
	function($scope,$routeParams,$rootScope,$location,$http,API_END_POINT,$sce){
	$scope.myURL= $sce.trustAsResourceUrl('http://www.jihui88.com/wcd/html/'+$routeParams.id+'.html?debug=01');
	$scope.pageVip=$rootScope.wcd && $rootScope.wcd.pageVip || false;
  var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
  if (ua.indexOf('iphone') > -1 && $scope.pageVip) {
  	var width=1334;
  	if(screen.width==='320' && screen.height==='480'){
  		width=960
  	}else if(screen.width==='320' && screen.height==='568'){
  		width=1136
  	}else if(screen.width==='375' && screen.height==='667'){
  		width=1334
  	}else if(screen.width==='414'){
  		width=1920
  	}
    $('head meta').last().attr('content',"width="+width+", initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui")
  }
  $scope.back= function(){ 
  	$rootScope.wcd.pageVip=false;
  	$('head meta').last().attr('content',"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui")
  	$scope.$back()
  }
  //$('.app-content').height($(window).height()-$('.app_nav').height())
}]);
