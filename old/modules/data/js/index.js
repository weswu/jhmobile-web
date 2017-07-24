'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/data', {
		templateUrl : 'modules/data/data.html'
	}).when('/data_p_q',{
		templateUrl : 'modules/data/data_purchase_quantity.html'
	}).when('/data_p_a',{
		templateUrl : 'modules/data/data_purchase_amount.html'
	})
 } 
]);

app.controller("DataCtrl",["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",	
    function($scope, $routeParams, $rootScope, $location,$http, API_END_POINT) {
	   $scope.data = {
			totalAmount: 0
	   }
	   $http.get(API_END_POINT+'order/data').
       success(function(data){
       	$scope.data = data.attributes;
       	if( $scope.data.totalAmount == null ){
       		$scope.data.totalAmount = 0
       	}
       })
       $scope.pageClass="data";
}])

app.controller("DataACtrl",["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",	
    function($scope, $routeParams, $rootScope, $location,$http, API_END_POINT) {
	$scope.dx=0;
    $scope.dataList =[];
    var page = 1,busy =false;
    $scope.loadMore = function() {
		if (busy)return;
		busy = true;
		$scope.search(page);
	};
	$scope.search = function(number) {
		$http.get(API_END_POINT+'order/data/member_list?pageSize=5000&sort=2&page=' + number).
	    success(function(data){
	    	var result= data.attributes.data;
	    	if(result.length === 0){
				busy = true;
			}else{
				if(number === 1){$('.font_14').html('('+data.attributes.count+')')}
				for(var i=0; i<result.length;i++){
		    		$scope.dx+=1;
		    		if(!result[i].name){result[i].name=result[i].username}
		    		result[i].dx=$scope.dx;
		    		$scope.dataList.push(result[i]);
		    	}
				page = data.attributes.page + 1;
				busy = true;
			}
	    })
	};
	
    }
])
app.controller("DataQCtrl",["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",	
    function($scope, $routeParams, $rootScope, $location,$http, API_END_POINT) {
	$scope.dx=0;
    $scope.dataList =[];
    var page = 1,busy =false;
    $scope.loadMore = function() {
		if (busy)return;
		busy = true;
		$scope.search(page);
	};
	$scope.search = function(page) {
		$http.get(API_END_POINT+'order/data/member_list?pageSize=5000&sort=1&page=' + page).
	    success(function(data){
	    	var result= data.attributes.data;
	    	if(result.length === 0){
				busy = true;
			}else{
				if(page === 1){$('.font_14').html('('+data.attributes.count+')')}
				for(var i=0; i<result.length;i++){
		    		$scope.dx+=1;
		    		if(!result[i].name){result[i].name=result[i].username}
		    		result[i].dx=$scope.dx;
		    		$scope.dataList.push(result[i]);
		    	}
				page = data.attributes.page + 1;
				busy = true;
			}
	    })
	};
	
    }
])