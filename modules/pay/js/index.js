'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/pay', {
	    templateUrl : 'modules/pay/pay.html'
	}).when('/pay_order', {
	    templateUrl : 'modules/pay/pay_order.html'
	}).when('/pay_detail', {
	    templateUrl : 'modules/pay/pay_detail.html'
	}).when('/pay_complete', {
	    templateUrl : 'modules/pay/pay_complete.html'
	})
} ]);


app.controller("PayDetailCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
    function($scope, $rootScope, $location, $http, API_END_POINT) {
	 $scope.pay={
			 time : '1',
			 price: 4700,
			 oprice: 4700
	 };
	 $scope.list=[];
	 $http.get(API_END_POINT+'/renew/list')
	 .success(function(data){
		var data = data.attributes.data;
		 for(var i=0; i<data.length; i++){
			 if(data[i].belongId == undefined){
				 data[i].btn="订购";
			 }else{
				 data[i].btn="提交订单";
			 }
			 $scope.list.push(data[i])
		 }
	 })
	 var userId=$rootScope.user.userId;
	 $scope.goPage = function(id){
		 $http.put(API_END_POINT+"/renewal/detail/"+id)
		 .success(function(data){
			 $rootScope.renew = data.attributes.data;
	         $location.path('/pay_order');
		 })
     }

    $scope.payTime =function(val){
    	$scope.pay.oprice= 4700*$('.payTime').val();
    	if($('.payTime').val() == 1){
    		$scope.pay.price= 4700*$('.payTime').val();
    	}else if($('.payTime').val() == 10){
    		$scope.pay.price= 4700*$('.payTime').val()*0.9;
    	}else{
    		$scope.pay.price= 4700*$('.payTime').val()*0.95;
    	}
    }
    
    
}]);


app.controller("PayOrderCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
    function($scope, $rootScope, $location, $http, API_END_POINT) {
	$scope.username=getCookieValue("username");
	console.log($rootScope.payOrder);
	$scope.renew = $rootScope.renew;
        $(".pay_order li ").click(function(){
            $(this).addClass("selected").siblings().removeClass("selected");
        })
        $('.app_pay_order').click(function(){
        	  if( $('.weixinform').hasClass('selected')){
                  $('#weixinform').submit();
                }
                if( $('.payform').hasClass('selected')){
                  $('#payform').submit();
                }
        })
        
 }]);





app.controller("PayCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
    function($scope, $rootScope, $location, $http, API_END_POINT) {
	    $scope.username=getCookieValue("username");
        $(".app_pay_list .app_pay_a ").click(function(){
            $(this).addClass("cur").siblings().removeClass("cur");
        });
        $(".app_pay_list a ").click(function(){
            var app_pay_num=$(".app_pay_list .cur span").html();
            Math(app_pay_num);
        });
        $("#app_pay_input").focus(function(){
            if($(this).val()==''){
                $("#app_pay_total_min").html('0元');
                $(".app_pay_total_tips").hide();
            }else{
                Math($(this).val());
            }
        });
        function Math(app_pay_num){
            var app_pay_total=app_pay_num*2580;
            if(app_pay_num>1){
                var app_pay_total_min=app_pay_total*0.9;
                $(".app_pay_total_tips").html('9折');
                $(".app_pay_total_tips").css("display","inline-block");
            }else if(app_pay_num==1) {
                var app_pay_total_min=app_pay_total*0.95;
                $(".app_pay_total_tips").html('9.5折');
                $(".app_pay_total_tips").css("display","inline-block");
            }else{
                var app_pay_total_min=0;
                $(".app_pay_total_tips").hide();
            }
            $("#app_pay_total_min").html(app_pay_total_min+'元');
        }
        $("#app_pay_input").keyup(function(){
            Math($(this).val());
        });
        
        $scope.gohome = function(){
        	$rootScope.payYear=
        	$location.path('/pay_order');
        }
    } ]);

