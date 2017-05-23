'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/contact', {
		templateUrl : 'modules/contact/contact.html'
	}).when('/contact/add', {
		templateUrl : 'modules/contact/add.html'
	}).when('/contact/:id', {
		templateUrl : 'modules/contact/add.html'
	})
} ]);
app.controller("ContactCtrl", ["$scope","$rootScope","$location","$http","API_END_POINT",
                           	function($scope, $rootScope, $location, $http, API_END_POINT) {
    var page = 1,busy =false;
    $scope.contactList = [];
    $scope.name = '';
    
    $scope.loadMore = function() {
		if (busy)return;
		busy = true;
		$scope.search(page,$scope.name);
	};
	
	$scope.search = function(pageNum,name) {	
		var url='';
		if(name != undefined  && name != '' ){
			url='&name=' + name
		}
		page =pageNum;/*$(".search-mask").hide();*/
		 $scope.name=name;
		if(page === 1){ $scope.contactList = [];}
	    $http.get(API_END_POINT + 'contact/list?page=' + page+ '&pageSize=16' +url)
		    .success(function(data) {
				var result = data.attributes.data;
				if(result.length === 0){
					busy = true;
				}else{
					for ( var i = 0; i < result.length; i++) {
						$scope.contactList.push(result[i]);
					}
					page = data.attributes.page + 1;
					busy = false;
				}
			})
		.error(function(data) {});
	}
	
	//detail
	$scope.update = function(id) {
		$location.path('/contact/' + id);
	};
	$scope.addL = function(id) {
		$location.path('/contact/add');
	};

	// 删除
	$scope.contactDelete = function(id) {
		if (window.confirm('确认删除吗？')) {
			for ( var i = 0; i < $scope.contactList.length; i++) {
				if ($scope.contactList[i].enterpcontactId == id) {
					$scope.contactList.splice(i, 1);
					$http['delete'](API_END_POINT + 'contact/detail/'+ id);
				}
			}
		}
	};

	
/*	$(".button-search.icon-sousuo").click(function() {
		$(".search-mask").show();
	})
	$(".search-mask").click(function() {
		$(".search-mask").hide()
	});*/
}]);

app.controller("addContactCtrl",["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",
      						function($scope, $routeParams, $rootScope, $location,$http, API_END_POINT) {
     	$scope.contact = {sex: '01',fax: '', cellphone :'', url :'',email :''};
      	$scope.pageTitle="联系人添加";
      	if($routeParams.id && $routeParams.id.length > 1){
			$scope.pageTitle="联系人修改";
			$http.get(API_END_POINT+ 'contact/'+ $routeParams.id)
			.success(function(data) {
						$scope.contact= data.attributes.data;
					}).error(function(data) {
			});			
		}		
    	$scope.addContact = function(contact) {
				if ((contact.name + "").trim() === "" || contact.name == null) {
					alert("姓名不能为空");
					return;
				}
				if ((contact.position + "").trim() === "" || contact.position == null) {
					alert("职位不能为空");
					return;
				}
				if ((contact.phone + "").trim() === "" || contact.phone == null) {
					alert("电话不能为空");
					return;
				}
				if($routeParams.id && $routeParams.id.length > 1){
					$http.put(API_END_POINT + 'contact/detail/'+ $routeParams.id 
							+'?name=' + contact.name 
							+ '&position=' + contact.position
							+ '&phone=' + contact.phone
							+ '&sex='+ contact.sex
							+ '&fax=' + contact.fax
							+ '&cellphone=' + contact.cellphone
							+ '&url=' + contact.url
							+ '&email=' + contact.email)
					.success(function(data) {
						alert("修改成功");
						window.history.go(-1);
					}).error(function(data) {
						window.history.go(-1);
					});
				}else{
					$http.post(API_END_POINT + 'contact/detail?name=' + contact.name 
							+ '&position=' + contact.position
							+ '&phone=' + contact.phone
							+ '&sex='+contact.sex
							+ '&fax=' + contact.fax
							+ '&cellphone=' + contact.cellphone
							+ '&url=' + contact.url
							+ '&email='+contact.email)
					.success(function(data) {
						alert("添加成功");
						window.history.go(-1);
					}).error(function(data) {
						window.history.go(-1);
					});
				}
			};
}]);