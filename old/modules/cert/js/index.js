'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/cert', {
		templateUrl : 'modules/cert/cert.html'
	}).when('/cert/add', {
		templateUrl : 'modules/cert/add.html'
	}).when('/cert/:id', {
		templateUrl : 'modules/cert/add.html'
	})
} ]);

app.controller("CertCtrl", ["$scope","$rootScope","$location","$http","API_END_POINT",
	function($scope, $rootScope, $location, $http, API_END_POINT) {
	    var page = 1,busy =false;
	    $scope.certList = [];
	    $scope.categoryId = '';$scope.text = '全部';
	  	var CategoryList2 = [
			                 	  {text: '基本证书', value: '01'},
			                 	  {text: '税务登记证', value: '07'},
			                 	  {text: '荣誉证书', value: '04'},
			                 	  {text: '营业执照', value: '06'},
			                 	  {text: '组织机构代码证', value: '08'},
			                 	  {text: '实地认证', value: '09'},
			                 	  {text: '其它证书', value: '05'}
			                 	  ];
	    
	    $scope.loadMore = function() {
			if (busy)return;
			busy = true;
			$scope.search($scope.categoryId, $scope.text, page);
		};
		
		$scope.search = function(categoryId, text,number,name) {	
			if(categoryId != 0){$scope.categoryId = categoryId;$scope.text = text};
			$scope.name = name || '';
			page = number;	$(".search-mask").hide()
			if(page === 1){ $scope.certList = [];}
		    $http.get(API_END_POINT + 'cert/list?page=' + page+ '&pageSize=15&type=' + $scope.categoryId + '&name=' + $scope.name)
			    .success(function(data) {
					//name 改变标题
					$(".app_nav_txt").html($scope.text+"<span class='font_14'>("+data.attributes.count+")</span>");
					var result = data.attributes.data;
					if(result.length === 0){
						busy = true;
					}else{
						for ( var i = 0; i < result.length; i++) {
							result[i].attaPic=$rootScope.picUrl(result[i].attaPic,5);
							var type=result[i].type;
							for(var j=0; j<CategoryList2.length; j++){
								if(type === CategoryList2[j].value){result[i].type= CategoryList2[j].text}
							}
							$scope.certList.push(result[i]);
						}
						page = data.attributes.page + 1;
						busy = false;
					}
					
				})
			.error(function(data) {});
		}
		

		$scope.update = function(id) {
			$location.path('/cert/' + id);
		};
		
		$scope.addL = function(id) {
			$location.path('/cert/add');
		};

		// 删除
		$scope.certDelete = function(id) {
			if (window.confirm('确认删除吗？')) {
				for ( var i = 0; i < $scope.certList.length; i++) {
					if ($scope.certList[i].certificateId == id) {
						$scope.certList.splice(i, 1);
						$http['delete'](API_END_POINT + 'cert/detail/'+ id);
					}
				}
			}
		};
		$(".button-search.icon-sousuo").click(function() {
			$(".search-mask").show();
		})
		$(".search-mask").click(function() {
			$(".search-mask").hide()
		});
		$scope.show = function(cert) {
			cert.showSub = cert.showSub === '1' ? '0' : '1';
		};
		
	                  

		$scope.CategoryList = [
			                 	  {text: '全部', value: ''},
			                 	  {text: '基本证书', value: '01'},
			                 	  {text: '税务登记证', value: '07'},
			                 	  {text: '荣誉证书', value: '04'},
			                 	  {text: '营业执照', value: '06'},
			                 	  {text: '组织机构代码证', value: '08'},
			                 	  {text: '实地认证', value: '09'},
			                 	  {text: '其它证书', value: '05'}
			                 	  ];
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
		
		} 
]);



app.controller("addCertCtrl",["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",
						function($scope, $routeParams, $rootScope, $location,$http, API_END_POINT) {
	$scope.categoryList = [
		 {text: '基本证书', value: '01'},
		 {text: '税务登记证', value: '07'},
		 {text: '荣誉证书', value: '04'},
		 {text: '营业执照', value: '06'},
		 {text: '组织机构代码证', value: '08'},
		 {text: '实地认证', value: '09'},
		 {text: '其它证书', value: '05'}
	];
	$scope.pageTitle="证书添加";
	$scope.cert= {
			attaPic:'upload/j/j2/jihui88/picture/2015/04/01/72041ac7-51fa-4163-906d-8b576955d29e_5.jpg',
			type: '01'
	}
	
							$scope.addCert = function(name, type, organize) {
								if ((name + "").trim() === "" || name == null) {
									alert("证书名称不能为空");
									return;
								}
								if ((type + "").trim() === "" || type == null) {
									alert("证书分类不能为空");
									return;
								}
								if ((organize + "").trim() === "" || organize == null) {
									alert("发证机构不能为空");
									return;
								}
								if (($scope.cert.attaPic + "").trim() === "" || $scope.cert.attaPic == null) {
									alert("图片未上传");
									return;
								}
								if($routeParams.id && $routeParams.id.length > 1){
									$http.put(API_END_POINT + 'cert/detail/'+ $routeParams.id +'?name=' + name + '&type=' + type + '&organize=' + organize + '&attId='+ $scope.cert.attachmentId)
									.success(function(data) {
										alert("修改成功");
										window.history.go(-1);
									}).error(function(data) {
										window.history.go(-1);
									});
								}else{
									$http.post(API_END_POINT + 'cert/detail?name=' + name + '&type=' + type + '&organize=' + organize + '&attId='+ $scope.cert.attachmentId)
									.success(function(data) {
										alert("添加成功");
										window.history.go(-1);
									}).error(function(data) {
										window.history.go(-1);
									});
								}
							};
							
							if($routeParams.id && $routeParams.id.length > 1){
								$scope.pageTitle="证书修改";
								$http.get(API_END_POINT+ 'cert/'+ $routeParams.id)
								.success(function(data) {
								    	$scope.cert = data.attributes.data;
										}).error(function(data) {
								});			
							}		
							
			$('.fileupload').click(function(){
				$('#fileupload').click();
			})				
			$('#fileupload').fileupload({
			    url: API_END_POINT + 'album/fileupload',
			    sequentialUploads: true,
			    add: function (e, data) {
			        data.submit();$('.loading_click').click();
			    },
		        done: function (e, data) {
		          $('.loading_click').click();
		          $scope.cert.attaPic=data.result.attributes.data;
		          $scope.cert.attachmentId=data.result.attributes.attId;
		          $('.fileupload').attr('src','http://img.jihui88.com/'+$scope.cert.attaPic)
		        },
		        fail: function(e,data){
		        	  $('.loading_click').click();
		        }
			});
							
		} 
]);
