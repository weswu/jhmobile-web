'use strict';
app.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/serivepay',{
		templateUrl:'modules/feedback/service_pay.html'
	}).when('/mypay',{
		templateUrl:'modules/feedback/my_pay.html'
	}).when('/progress',{
		templateUrl:'modules/feedback/service_progress.html'
	}).when('/progress/:id/:title/:result/:desc', {
		templateUrl : 'modules/feedback/service_progress_detail.html'
	}).when('/receipt', {
		templateUrl : 'modules/feedback/receipt.html'
	}).when('/service_feedback', {
		templateUrl : 'modules/feedback/service_feedback.html'
	})
}]);

app.controller("FeedBackCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
		function($scope, $rootScope, $location, $http, API_END_POINT) {
			$scope.saveFeedBack = function(con) {
				if ((con + "").trim() === "" || con == null) {
					alert("内容不能为空");
					return;
				}
				$http.post(API_END_POINT + 'message/detail', {
					content : con
				}).success(function(data) {
					alert("感谢您的支持");
					location.reload();
				}).error(function(data) {
					$location.path('/');
				});
			};
			var datas = {
					page : 1,
					data : [],
					busy : false
				}
			$scope.messageList=[];
			//查询回复
			$scope.loadMore = function() {
				$http.get(API_END_POINT
								+ 'message/reply?page='
								+ datas.page)
				.success(function(data) {
					if(data.attributes.data.length>0){
						var result=data.attributes.data;
						$scope.messageShow=false;
						for ( var i = 0; i < result.length; i++) {
							$scope.messageList.push(result[i]);
						}
					}
					datas.page = data.attributes.page + 1;
					datas.busy = false;
				 }).error(function(data) {
				});
			}
		} ]);


app.controller("ServicePayCtrl", [ "$scope","$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
	
	if(!$rootScope.enterprise){
		$http.get(API_END_POINT + 'enterprise/detail')
		.success(function(data) {
			$rootScope.enterprise=data.attributes.data;
			$scope.company=data.attributes.data.name
		}).error(function(data) {
			$scope.company='';
		});	
	}else{
		$scope.company=$rootScope.enterprise.name
	}
	
	if(!$rootScope.user){
		setTimeout(function(){
			$scope.username=$rootScope.user.username;
		},100)
	}else{
		$scope.username=$rootScope.user.username;
	}
	//待缴费  so_payed_amount以付money   so_amount 总money
	$scope.waitPayList=[];
	$http.get(API_END_POINT + 'crm/receipt/list')
	.success(function(data) {
		if(!data.success){
			$('.loadData1').html('请在正常工作时间浏览噢<br/>周一到周五　8:00～17:30');return true;
		}
		var result = data.attributes.data;
		if(result.length === 0){
			$('.loadData1').html('暂无数据');
			return true;
		}else{
			$('.loadData1').hide();
		}
		for ( var i = 0; i < result.length; i++) {
			result[i].name='';
			result[i].price =result[i].so_amount - result[i].so_payed_amount;
			result[i].type='no';
			if(result[i].so_payed_amount >0 && result[i].price> 0){
				result[i].tip='部分支付';
				result[i].type='under';

			}
			if(result[i].price == 0) {
				result[i].tip='已支付';
				result[i].type='all';
			}
			for(var j=0; j<result[i].orderItemList.length; j++){
				if(result[i].name == ''){
					result[i].name+=result[i].orderItemList[j].prod_name;
				}else{
					result[i].name+='、'+result[i].orderItemList[j].prod_name;
				}
			}
			result[i].check = false;
			$scope.waitPayList.push(result[i]);
		}
	}).error(function(data) {
		$('.loadData1').html('请在正常工作时间浏览噢<br/>周一到周五　8:00～17:30');
	});	
	//历史缴费
	$scope.logPayList=[];
	$scope.logBol= false;
	$('.ul-line').click(function(){
		if($scope.vm.activeTab === 2 && !$scope.logBol){
			$scope.log();
		}
	});
	setTimeout(function(){
		if( !$scope.logBol){
			$scope.log();
		}
	},1500);
	$scope.log =function(){
		$scope.logBol= true;
		$http.get(API_END_POINT + 'crm/receipt/log')
		.success(function(data) {
			if(!data.success){
				$('.loadData2').html('请在正常工作时间浏览噢<br/>周一到周五　8:00～17:30');return true;
			}
			var result = data.attributes.data;
			if(result.length === 0){
				$('.loadData2').html('暂无数据');
				return true;
			}else{
				$('.loadData2').hide();
			}
			for ( var i = 0; i < result.length; i++) {
				result[i].name='';
				for(var j=0; j<result[i].orderItemList.length; j++){
					if(result[i].name == ''){
						result[i].name+=result[i].orderItemList[j].prod_name;
					}else{
						result[i].name+='、'+result[i].orderItemList[j].prod_name;
					}
				}
				$scope.logPayList.push(result[i]);
			}
		}).error(function(data) {
			$('.loadData2').html('请在正常工作时间浏览噢<br/>周一到周五　8:00～17:30');
		});	
	}
	
	
	
		$scope.totel=0;
		$scope.acriveLength=0;
		$scope.sum= function(wp,e){
			if(wp.check){
	    		$(e.currentTarget).find('i').removeClass('checked')
	    	}else{
	    		$(e.currentTarget).find('i').addClass('checked')
	    	}
			wp.check= !wp.check;
			$scope.totelsum();
		}
		$scope.totelsum= function(){
			$scope.totel=0;
			$scope.acriveLength=0;
			angular.forEach($scope.waitPayList, function(data){
				if(data.check){
					$scope.totel= accAdd($scope.totel,parseFloat(data.price));
					$scope.acriveLength+= 1;
				}
			});
		}
		$scope.toggleAll= function(){
			var bol;
			if($scope.acriveLength > $scope.waitPayList.length/2){
				bol=false;
			}else{
				bol=true;
			}
			angular.forEach($scope.waitPayList, function(data){
				data.check=bol;
			});
			$scope.totelsum();
		}


	    $scope.spay= function(){
	    	$rootScope.spay={totel:$scope.totel};
	    	if($scope.totel === 0){
	    		alert('请选择订单');
	    		return false;
	    	}
			$location.path('/mypay');
	   	}
	
	
		//计算浮点数
		 function accAdd(arg1, arg2) {
			      var r1, r2, m, c;
			      try {
			         r1 = arg1.toString().split(".")[1].length;
			     }
			     catch (e) {
			         r1 = 0;
			     }
			     try {
			         r2 = arg2.toString().split(".")[1].length;
			     }
			     catch (e) {
			         r2 = 0;
			     }
			     c = Math.abs(r1 - r2);
			     m = Math.pow(10, Math.max(r1, r2));
			     if (c > 0) {
			        var cm = Math.pow(10, c);
			         if (r1 > r2) {
			             arg1 = Number(arg1.toString().replace(".", ""));
			             arg2 = Number(arg2.toString().replace(".", "")) * cm;
			         } else {
			             arg1 = Number(arg1.toString().replace(".", "")) * cm;
			             arg2 = Number(arg2.toString().replace(".", ""));
			         }
			     } else {
			         arg1 = Number(arg1.toString().replace(".", ""));
			         arg2 = Number(arg2.toString().replace(".", ""));
			     }
			     return (arg1 + arg2) / m;
			 }
		
		 	//服务记录
			$scope.jList=[];
			$scope.jBol= false;
			setTimeout(function(){if( !$scope.jBol){$scope.journal();}},10000);
			$scope.journal =function(){
				$scope.jBol= true;
				$http.get(API_END_POINT + 'crm/feedback/journal')
				.success(function(data) {
					if(!data.success){
						$('.loadData3').html('请在正常工作时间浏览噢<br/>周一到周五　8:00～17:30');return true;
					}
					var result = data.attributes.data;
					if(result.length === 0){
						$('.loadData3').html('暂无数据');
						return true;
					}else{
						$('.loadData3').hide();
					}
					for ( var i = 0; i < result.length; i++) {
						$scope.jList.push(result[i]);
					}
				}).error(function(data) {
					$('.loadData3').html('请在正常工作时间浏览噢<br/>周一到周五　8:00～17:30');
				});	
			}	
		
}]);


app.controller("MyPayCtrl", [ "$scope","$rootScope", "API_END_POINT",
	function($scope, $rootScope,API_END_POINT) {
   	$scope.username=($rootScope.user && $rootScope.user.username)  || '';
   	$scope.sum=($rootScope.spay && $rootScope.spay.totel) || 0;
   	$scope.buyId='';
    $scope.pay= function(){
    	if($('.toggle').eq(2).hasClass('checked')){
    		alert('通联支付未开通...');
    		return false;
    	}
    	if($scope.buyId===0){
    		$('.pay-bg,.buyImg1').show()
    	}
    	if($scope.buyId===1){
    		$('.pay-bg,.buyImg2').show()
    	}
    	if($scope.buyId === ''){
    		alert('请选择支付方式');
    		return false;
    	}
   	}
    
    $scope.bgNone= function(){
    	$('.pay-bg,#buyImg').hide();
    	
    }
    $scope.selectPay= function(d,e){
    	if($(e.currentTarget.children).find('i').hasClass('checked')){
    		$(e.currentTarget.children).find('i').removeClass('checked');
   		 	$scope.buyId='';
    	}else{
    		$(e.currentTarget.children).find('i').addClass('checked');
    		 $scope.buyId=d;
    	}
    	for(var aa=0;aa<4;aa++){
    		if(aa!==d){
    			$('.toggle').eq(aa).removeClass('checked')
    		}
    	}
    	
    	if(d == 3){
    		$('.payUn').show();
    		$('.label-act-3').height('4.8rem');
    		$('.app_btn').hide();
    	}else{
    		$('.payUn').hide();
    		$('.label-act-3').height('2.5rem');
    		$('.app_btn').show();
    	}
   	}                      		
}]);

app.controller("ServiceProgressCtrl", [ "$scope","$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {  
	//正在服务
	$scope.list=[];
	$scope.LBol= false;
	$scope.fb =function(){
		$scope.LBol= true;
	$http.get(API_END_POINT + 'crm/feedback/list?sort=00')
	.success(function(data) {
		if(!data.success){
			$('.loadData1').html('请在正常工作时间浏览噢<br/>周一到周五　8:00～17:30');return true;
		}
		var result = data.attributes.data;
		if(result.length === 0){
			$('.loadData1').html('暂无数据');
			return true;
		}else{
			$('.loadData1').hide();
		}
		for ( var i = 0; i < result.length; i++) {
			$scope.list.push(result[i]);
		}
	}).error(function(data) {
		$('.loadData1').html('请在正常工作时间浏览噢<br/>周一到周五　8:00～17:30');
	});	
	}

	//历史缴费
	$scope.logList=[];
	$scope.logBol= false;
	setTimeout(function(){if( !$scope.logBol){$scope.log();}},3000);
	$scope.log =function(){
		$scope.logBol= true;
		$http.get(API_END_POINT + 'crm/feedback/list?sort=01')
		.success(function(data) {
			if(!data.success){
				$('.loadData2').html('请在正常工作时间浏览噢<br/>周一到周五　8:00～17:30');return true;
			}
			var result = data.attributes.data;
			if(result.length === 0){
				$('.loadData2').html('暂无数据');
				return true;
			}else{
				$('.loadData2').hide();
			}
			for ( var i = 0; i < result.length; i++) {
				$scope.logList.push(result[i]);
			}
		}).error(function(data) {
			$('.loadData2').html('请在正常工作时间浏览噢<br/>周一到周五　8:00～17:30');
		});	
	}

	$('.ul-line').click(function(){
		if($scope.vm.activeTab === 1 && !$scope.LBol){
			$scope.fb();
		}
		if($scope.vm.activeTab === 2 && !$scope.logBol){
			$scope.log();
		}
		if($scope.vm.activeTab === 3 && !$scope.jBol){
			$scope.journal();
		}
	});
	if(getCookieValue("fBack") ==='01'){
		$('.ul-line li').eq(0).removeClass('active')
		$scope.vm={activeTab:2};
		$scope.log();
	}else{
		$scope.vm={activeTab:1};
		$scope.fb();
	}
	
	if(!$rootScope.enterprise){
		$http.get(API_END_POINT + 'enterprise/detail')
		.success(function(data) {
			$rootScope.enterprise=data.attributes.data;
			$scope.company=data.attributes.data.name
		}).error(function(data) {
			$scope.company='';
		});	
	}else{
		$scope.company=$rootScope.enterprise.name
	}
	
	if(!$rootScope.user){
		setTimeout(function(){
			$scope.username=$rootScope.user.username;
		},100)
	}else{
		$scope.username=$rootScope.user.username;
	}
	
	//detail
	$scope.detail = function(id,title,result,desc,back) {
		addCookie("fBack", back, 5, "/");
		result=result||'暂无数据';
		var content='';
		if(desc.length==0){content='暂无数据';}
		for(var i=0;i<desc.length;i++){
			content+=desc[i]+"<br/>";
		}
		$location.path('/progress/' + id+'/'+encodeURIComponent(title)+'/'+encodeURIComponent(result)+'/'+encodeURIComponent(content));
	};

	$scope.back =function(){
		addCookie("fBack", '00', 5, "/");
		$location.path('/')
	}
	
	//服务反馈
 $scope.service_feekback = function(){
	 $location.path('/service_feedback')
 }
	
}]);
app.controller("ServiceProgressDCtrl", [ "$scope","$routeParams","$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $routeParams, $rootScope, $location, $http, API_END_POINT) {
	var id = $routeParams.id;
	$scope.title = $routeParams.title || '反馈详细';
	$scope.result = $routeParams.result === '暂无数据' ? '' : $routeParams.result;
	$scope.desc = $routeParams.desc;
	$scope.list=[];
	$http.get(API_END_POINT + 'crm/feedback/detail/'+id)
	.success(function(data) {
		if(!data.success){
			$('.loadData1').html('请在正常工作时间浏览噢<br/>周一到周五　8:00～17:30');return true;
		}
		var result = data.attributes.data;
		if(result.length === 0){
			$('.loadData1').html('暂无数据');return true;
		}else{
			$('.loadData1').hide();
        }
		for ( var i = 0; i < result.length; i++) {
				$scope.list.push(result[i]);
		}
		}).error(function(data) {
			$('.loadData1').html('请在正常工作时间浏览噢<br/>周一到周五　8:00～17:30');
		});	                               	
}]);

//开具发票 API_END_POINT + 'user/receiptDetail' 列表查询
app.controller("receiptCtrl", [ "$scope","$routeParams","$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $routeParams, $rootScope, $location, $http, API_END_POINT) {
	$scope.save = function(title, account, openAccount,tfn, address, phone, rests) {
		if ((title + "").trim() === "" || title == null) {
			alert("公司名称不能为空");
			return;
		}
		if ((account + "").trim() === ""  || account == null) {
			alert("银行帐号不能为空");
			return;
		} else {
			var reg = /^\d{19}$/g; // 以19位数字开头，以19位数字结尾
			if (!reg.test(account)) {
				alert("银行帐号格式错误，应该是19位数字！");
				return;
			}
		}
		if ((openAccount + "").trim() === "" || openAccount == null) {
			alert("开户银行不能为空");
			return;
		}
		if ((tfn + "").trim() === "" || tfn == null) {
			alert("税号不能为空");
			return;
		}
		if ((address + "").trim() === "" || address == null) {
			alert("公司地址不能为空");
			return;
		}
		if ((phone + "").trim() === "" || phone == null) {
			alert("公司电话不能为空");
			return;
		}
		if ((rests + "").trim() === "" || rests == null) {
			rests = "";
		} else {
			rests = rests;
		}
		$http.post(API_END_POINT + 'message/detail', {
					tit : title,
					content : account + ","
							+ openAccount + "," + tfn
							+ "," + address + ","
							+ phone + "," + rests
				}).success(function(data) {
			alert("添加成功");
			$location.path('/');
		}).error(function(data) {
			$location.path('/');
		});
	};
}]);
app.controller("ServiceFeedbackCtrl", [ "$scope","$rootScope", "$location", "$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
	$scope.loading = false;
	$scope.sf={
			card_no: CONST.user.username,
			fdbk_type:'2'
	};
	$scope.fList = [
	  {text:'购买', value:'1'},
	  {text:'服务', value:'2'},
	  {text:'投诉', value:'3'}, 
	  {text:'表扬', value:'4'}, 
	  {text:'建议', value:'5'}, 
	  {text:'其他', value:'0'}              
	];
	 $scope.add= function(f){//提交
		 	$scope.sf.fdbk_subject64+='[APP]';
			$scope.loading = true;
			$http({
				url: 'http://crmyun.jihui88.com:9500/api/jihuifeedback.php',
				method:'POST',
				data:$scope.sf,
				dataType:'jsonp',  
				jsonp:'callback', 
		    jsonpCallback: 'jsonpCallback'
			}).success(function(data){
					$scope.loading = false;
		  		if(data.status == 'SUCCESS'){
		  			$scope.addPoint();
		  		}else{
		  	    alert("发送失败");
		  		}
			}).error(function(data){
				$scope.loading = false;
	  		if(data.err_code === '用户不存在'){
	  			alert("请联系客服,账号未关联到机汇云");
	  		}else{
	  	    alert("发送失败");
	  		}
			});
	  }
	 $scope.addPoint= function(){
		 $http.post(API_END_POINT + 'message/detail', {
				content : "point",
				tit: 'point'
			}).success(function(data) {
			}).error(function(data) {
				$location.path('/');
			});
	    alert("反馈发送成功");
	    $scope.$back();
	 }
}]);