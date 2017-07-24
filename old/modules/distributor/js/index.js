'use strict';
app.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/distributor',{
		templateUrl:'modules/distributor/distributor_member.html'
	}).when('/distributor_data',{
		templateUrl:'modules/distributor/distributor_data.html'
	}).when('/distributor_bouns',{
		templateUrl:'modules/distributor/distributor_bouns.html'
	})
}]);

app.controller("DistributorCtrl",['$scope','$rootScope','$location','$http','API_END_POINT',
    function($scope,$rootScope,$location,$http,API_END_POINT){
     var enterpriseId=$rootScope.user.enterpriseId;
	  var page = 1;$scope.busy =false;
	    $scope.disList = [];
	    
	    $scope.loadMore = function() {
			if ($scope.busy)return;
			$scope.busy = true;
			$scope.search(page);
		};
		
		$scope.search = function(number) {	
			page = number;
			if(page === 1){ $scope.disList = [];}
			$.ajax({
		          type: "get",
		          async: false,
		          url: 'http://www.jihui88.com/wechat/cps/index.php/jihui_api/members/'+enterpriseId+'/'+page+'/4',
		          dataType: "jsonp",
		          jsonp: "callback",
		          jsonpCallback:enterpriseId,
		          success: function(json){
		        	  if(json.success){
		        		  var result = json.attributes.data;
			        		if(result.length === 0){
  			        			if(page == 1){$('.loadData').html('暂无数据');$('.loadData').show()}else{$('.loadData').remove()}
			        			scope.busy = true;
							}else{
								for ( var i = 0; i < result.length; i++) {
									$scope.disList.push(result[i]);
								}
								page = parseInt(json.attributes.page) + 1;
								$scope.busy = false;
								$scope.$apply();
								$('.chaxun').remove();
							}
		        	  }else{
		        		  $('.loadData').remove();
		        		  $('.chaxun').show();
		        	  }
		         }
		})
		}
}]);

app.controller("DistributorMemberCtrl",['$scope','$rootScope','$location','$http','API_END_POINT',
	function($scope,$rootScope,$location,$http,API_END_POINT){
		var enterpriseId=$rootScope.user.enterpriseId;
		$scope.page = 1;
		$scope.name ='';
		$scope.busy =false;
		$scope.disList = [];
		$scope.p={
				count:0,
				total:1
		}
			
		$scope.search = function(page,name,bol) {	
			$scope.busy =true;
			$scope.page = page;
			 $scope.name= name;
			 var end='/5';
			 if(name != ''){
				 end='/10/'+name;
				 }
  			$.ajax({
  		          type: "get",
  		          async: false,
  		          url: 'http://www.jihui88.com/wechat/cps/index.php/jihui_api/members/'+enterpriseId+'/'+$scope.page+end,
  		          dataType: "jsonp",
  		          jsonp: "callback",
  		          jsonpCallback:enterpriseId,
  		          success: function(json){
					  $scope.disList = [];
  		        	  if(json.success){
  		        		  var result = json.attributes.data;
  			        		if(result.length === 0){
  			        			$('.loadData').html('暂无数据');
  			        			$scope.busy = true;
  							}else{
  								for ( var i = 0; i < result.length; i++) {
  									$scope.disList.push(result[i]);
  								}
  								
  								if(!bol){
  									$scope.p.count=json.attributes.count;
  									if(name != ''){
  										 $scope.p.total=1;
  										 }else{
  											 $scope.p.total=Math.ceil(json.attributes.count/5);
  										 }
  	  								$scope.paginit();
  								}

  								$scope.busy = false;
  								$scope.$apply();
  								$('.chaxun').remove();
  							}
  		        	  }else{
  	  		        	  $scope.busy =false;
  		        		  $('.chaxun').show();
  		        	  }
  		         }
  		})
		}
		$scope.search($scope.page,$scope.name,false);
 		
		$scope.paginit= function(){
			//显示出的一共多少页
	  			var uljia=$("#uljia");
	  			$("#uljia").empty();
	  			for(var i=1;i<=$scope.p.total;i++)
	  			{
	  				var H="<li>"+i+"</li>";//添加一共多少页和点击事件
	  				uljia.append(H);
	  			}
	  			$("#xiye").html($scope.page)
	  		$("#uljia li").click(function(){
	  			var v=$(this).html();
	  			$scope.search(v,$scope.name,true);
	  			$("#xiye").html(v)
	  		})    
		}
  		        		
		//分页的显示与隐藏
  		$("#xifenye").click(function(a){
  			$("#xab").toggle();
  			$scope.scrolltop($scope.page);
  		})
  	//滚动条
  	  $scope.scrolltop = function(top) {	
  			var hei=25*top-25;
  			$("#xab").scrollTop(hei);
  		 }
  		
  	//分页的的上一页和下一页
		$scope.topclick = function() {	
  			if($scope.page > 1){
  				var v=$scope.page-1;
  				$scope.search(v,$scope.name,true);
	  			$("#xiye").html(v)
  			}
		}
		$scope.downclick = function() {	
  			if($scope.page < $scope.p.total){
  				var v=$scope.page+1;
  				$scope.search(v,$scope.name,true);
	  			$("#xiye").html(v)
  			}
		}
  		//分页的的首页和未页
  		$("#first").bind("click",function(){
  			if($scope.page != 1){
  				$scope.search(1,$scope.name,true);
	  			$("#xiye").html(1)
  			}
  		})
  		$("#last").bind("click",function(){
  			if($scope.page != $scope.p.total){
  				$scope.search($scope.p.total,$scope.name,true);
	  			$("#xiye").html($scope.p.total)
  			}
	  	})
}]);

app.controller("DistributorDataCtrl",['$scope','$rootScope','$location','$http','API_END_POINT',
                                  function($scope,$rootScope,$location,$http,API_END_POINT){
                              	  $(".dis-data-list dl.dl").click(function(e){
                                        $(this).children(".dis-data-display").show("slow");
                                        $(this).siblings().children(".dis-data-display").hide("slow");
                                        if($(this).attr('data-result') === 'false'){
                                        	$(this).attr('data-result','true');
                                        	$scope.search($(this).attr('data-id'));
                                        }
                                    });
                                   var enterpriseId=$rootScope.user.enterpriseId;
                              	    $scope.disList1 = [],$scope.disList2 = [],$scope.disList3 = [],$scope.disList4 = [],$scope.disList5 = [],
                              	    $scope.disList6 = [],$scope.disList7 = [],$scope.disList8 = [],$scope.disList9 = [];
                              	    
                              		$scope.search = function(number) {	
                              			$scope.disList
                              			$.ajax({
                              		          type: "get",
                              		          async: false,
                              		          url: 'http://www.jihui88.com/wechat/cps/index.php/jihui_api/ranking/'+enterpriseId+'/'+number,
                              		          dataType: "jsonp",
                              		          jsonp: "callback",
                              		          jsonpCallback:enterpriseId,
                              		          success: function(json){
                              		        	  if(json.success){
                              		        		  var result = json.attributes.data;
                              			        		if(result.length > 0){
                              			        			var a=parseInt(number);
                              			        					for ( var i = 0; i < result.length; i++) {
                              			        						result[i].dx=i+1;
                              			        						if(a ==1){$scope.disList1.push(result[i])};
                              			        						if(a ==2){$scope.disList2.push(result[i])};
                              			        						if(a ==3){$scope.disList3.push(result[i])};
                              			        						if(a ==4){$scope.disList4.push(result[i])};
                              			        						if(a ==5){$scope.disList5.push(result[i])};
                              			        						if(a ==6){$scope.disList6.push(result[i])};
                              			        						if(a ==7){$scope.disList7.push(result[i])};
                              			        						if(a ==8){$scope.disList8.push(result[i])};
                              			        						if(a ==9){$scope.disList9.push(result[i])};
                                      								}
                              								$scope.$apply();
                              							}
                              		        	  }
                              		         }
                              		})
       }
}]);

app.controller("DistributorBounsCtrl",['$scope','$rootScope','$location','$http','API_END_POINT',
    function($scope,$rootScope,$location,$http,API_END_POINT){
	  var enterpriseId=$rootScope.user.enterpriseId;
  	  var page = 1;$scope.busy =false;
  	    $scope.disList = [];
  	    
  	    $scope.loadMore = function() {
  			if ($scope.busy)return;
  			$scope.busy = true;
  			$scope.search(page);
  		};
  		
  		$scope.search = function(number) {	
  			page = number;
  			if(page === 1){ $scope.disList = []}
  			$.ajax({
  		          type: "get",
  		          async: false,
  		          url: 'http://www.jihui88.com/wechat/cps/index.php/jihui_api/bouns/'+enterpriseId+'/'+page+'/4',
  		          dataType: "jsonp",
  		          jsonp: "callback",
  		          jsonpCallback:enterpriseId,
  		          success: function(json){
  		        	  if(json.success){
  		        		  var result = json.attributes.data;
  			        		if(result.length === 0){
  			        			if(page == 1){$('.loadData').html('暂无数据');$('.loadData').show()}else{$('.loadData').remove()}
  			        			$scope.busy = true;
  							}else{
  								for ( var i = 0; i < result.length; i++) {
  									if(result[i].result_code == "SUCCESS"){
  										result[i].result_code = '发送成功'
  									}else{
  										result[i].result_code = '发送失败'
  									}
  									result[i].total_amount=parseFloat(result[i].total_amount)/100;
  									result[i].nickname=JSON.parse(result[i].userinfo).nickname
  									$scope.disList.push(result[i]);
  								}
  								page = parseInt(json.attributes.page) + 1;
  								$scope.busy = false;
  								$scope.$apply();
  								$('.chaxun').remove();
  							}
  		        	  }else{
		        		  $('.loadData').remove();
		        		  $('.chaxun').show();
		        	  }
  		         }
  		})
  		}
}]);