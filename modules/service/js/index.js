'use strict';
app.config([ "$routeProvider", function($routeProvider) {
	$routeProvider.when('/sale',{
		templateUrl : 'modules/service/sale.html'
	}).when('/seo',{
		templateUrl : 'modules/service/seo.html'
	}).when('/friend',{
		templateUrl : 'modules/service/friend.html'
	}).when('/friend_rank',{
		templateUrl : 'modules/service/friend_rank.html'
	}).when('/poster',{
		templateUrl : 'modules/service/poster.html'
	}).when('/faq', {
		templateUrl : 'modules/service/faq.html'
	}).when('/faq1',{
		templateUrl : 'modules/service/faq/faq1.html'
	}).when('/faq2',{
		templateUrl : 'modules/service/faq/faq2.html'
	})
 } 
]);


app.controller("serviceCtrl",["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",	
    function($scope, $routeParams, $rootScope, $location,$http, API_END_POINT) {
	
    }
])
app.controller("friendCtrl",["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",	
	function($scope, $routeParams, $rootScope, $location,$http, API_END_POINT) {
	$scope.sf={
			card_no:$rootScope.user.username,
			fdbk_subject64:'朋友介绍[APP]',
			fdbk_type:'5'
	};
	$scope.pList0=[];$scope.pList1=[];$scope.pList2=[];$scope.pList3=[];
	
	$http.get(API_END_POINT + 'poster/list?pageSize=72')
	.success(function(data) {
		var result = data.attributes.data;
		for ( var i = 0; i < result.length; i++) {
			result[i].pic = 'http://img.jihui88.com/'+result[i].pic;
			if(result[i].posterCate === '0'){
				$scope.pList0.push(result[i]);
			}else if(result[i].posterCate === '1'){
				$scope.pList1.push(result[i]);
			}else if(result[i].posterCate === '2'){
				$scope.pList2.push(result[i]);
			}else if(result[i].posterCate === '3'){
				$scope.pList3.push(result[i]);
			}
		}
	}).error(function(data) {
	});
	
	
	$scope.submit= function(m){
		if(m == null){alert("请输入内容");return;}
		if ((m.name + "").trim() === "" || m.name == null) {
			alert("姓名不能为空");
			return;
		}
		if ((m.company + "").trim() === "" || m.company == null) {
			alert("公司名称不能为空");
			return;
		}
		if ((m.phone + "").trim() === "" || m.phone == null) {
			alert("电话不能为空");
			return;
		}
		if ((m.referee + "").trim() === "" || m.referee == null) {
			alert("推荐人不能为空");
			return;
		}
		$scope.sf.fdbk_intro1k= "姓名:"+m.name+"\n公司:"+m.company+"\n电话:"+m.phone+"\n推荐人:"+m.referee+"\n说明:"+m.content
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
	  	    alert("感谢推荐");
	  			$location.path('/');
	  		}else{
	  	    alert("发送失败");
	  		}
		}).error(function(data){
			$scope.loading = false;
  		if(data.err_code === '用户不存在'){
  			alert("请联系客服,关联到CRM机汇云");
  		}else{
  	    alert("发送失败");
  		}
		});
	}
	
	

  $('.extend_tab_li').click(function(){
      $(this).addClass('cur');
      $(this).siblings().removeClass('cur');
      $('.extend_div').eq($(this).index()).show();
      $('.extend_div').eq($(this).index()).siblings().hide();
  })	
	$scope.saveImg = function(p) {
		$.ajax({
      type: "post",
      url: "http://www.jihui88.net/qrcode_poster/api/poster",
      data: {
				pic: p.pic,
				qrcodeWidth: p.qrcodeWidth,
				qrcodeHeight: p.qrcodeHeight,
				username: 'ggggfj',
				qrcodeLeft: p.qrcodeLeft,
				qrcodeTop: p.qrcodeTop,
				posterId: p.posterId,
				qrcode: 'http://wcd.jihui88.com/rest/comm/qrbar/create?w='+p.qrcodeWidth+'&text=http://www.jihui88.com/member/reg_m.html?d='+$scope.sf.card_no
			},
      success: function(img){
    		p.pic='http://www.jihui88.net/qrcode_poster/posters/'+p.posterId+'.jpg'
    		$scope.$apply();
    		$scope.posterInit(p.pic);
    		$('.'+p.posterId+' .save_img').html('生成成功,截屏保存图片');
      },
      error: function(a,b,c,d){
    		p.pic='http://www.jihui88.net/qrcode_poster/posters/'+p.posterId+'.jpg'
    		$scope.$apply();
    		$scope.posterInit(p.pic);
    		$('.'+p.posterId+' .save_img').html('生成成功,截屏保存图片');
      }
		})
	};

	$scope.posterInit = function(img) {
		$('.posterInit img').attr('src',img);
		$('.app-page-friend').hide();
		$('.posterInit').show();
	}
  $('.posterInit').click(function(){
		$('.posterInit').hide();
		$('.app-page-friend').show();
  })	
  
	$scope.extendTmg = function(img) {
  	if(img.indexOf('http://img.jihui88.com') > -1){return false}
		$scope.posterInit(img);
	}
}])

app.controller("friendRankCtrl",["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",	
    function($scope, $routeParams, $rootScope, $location,$http, API_END_POINT) {
			$scope.username=$rootScope.user && $rootScope.user.username||'';
			$('#extend_rank').attr('src','http://www.jihui88.com/member/extend_rank.html?u='+$scope.username);
			$('#extend_rank').height($(window).height()-$('.app_nav').height()*1.4)
    }
])
app.controller("posterCtrl",["$scope","$routeParams","$rootScope","$location","$http","API_END_POINT",	
  function($scope, $routeParams, $rootScope, $location,$http, API_END_POINT) {
	$scope.getUrlParam = function(name){
    var url = location.href; //获取url中"?"符后的字串    
    if (url.indexOf("?") != -1) {   
      var str = url.split('?')[1];   
      var strs = str.split("&");   
      for(var i = 0; i < strs.length; i ++) {   
        if(strs[i].split("=")[0]===name){
          return strs[i].split("=")[1]
        } 
      }   
    }   
  }
	if($scope.getUrlParam('pic')){
		$('#poster').attr('src',$scope.getUrlParam('pic'))
	}else{
		$('#poster').attr('src','http://ojp4b9fwn.bkt.clouddn.com/%E8%B7%AF%E4%BA%BA%E5%A4%B4%E5%83%8F3.jpg')
	}
}])


