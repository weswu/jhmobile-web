'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/member/list', {
		templateUrl : 'modules/member/member.html'
	})
} ]);
app.controller("MemberCtrl", ["$scope","$rootScope","$location","$http","API_END_POINT",
    function($scope, $rootScope, $location, $http, API_END_POINT) {

    var page = 1,busy =false,dx=0;
    $scope.name = '';
    $scope.memberList = [];	
    
	 $scope.loadMore = function() {
			if (busy)return;
			busy = true;
			$scope.search(page,$scope.name);
		};
		$scope.search = function(pageNum,name) {	
			var url='';
			if(name != undefined  && name != '' ){
				dx=0;
				url='&name=' + name
			}
			page =pageNum;
			 $scope.name=name;
			if(page === 1){ $scope.memberList = [];}
		    $http.get(API_END_POINT + 'member/list?page=' + page+ '&pageSize=16' +url)
			    .success(function(data) {
					if(data.attributes.grade !=null && data.attributes.grade!= '07'){
						$(".chaxun").css('display','block');
						return;
					}
					var result = data.attributes.data;
					if(result.length === 0){
						busy = true;
					}else{
						if(page === 1){$('.font_14').html('('+data.attributes.count+')')}
						for ( var i = 0; i < result.length; i++) {
							dx+=1;
							result[i].dx=dx;
							$scope.memberList.push(result[i]);
						}
						page = data.attributes.page + 1;
						busy = false;
					}
				})
			.error(function(data) {});
		}

}]);