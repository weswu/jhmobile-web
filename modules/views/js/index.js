'use strict';
app.controller("DialogCtrl", [ "$scope", "$rootScope", "$location", "$http","API_END_POINT",
    function($scope,$modalInstance,items) {
	 $scope.items = items;
     $scope.selected = {
         item : $scope.items[0]
     };
     $scope.ok = function(){  
         $modalInstance.close($scope.selected.item); //关闭并返回当前选项
     };
     $scope.cancel = function(){
         $modalInstance.dismiss('cancel'); // 退出
     }
	
    } 
]);