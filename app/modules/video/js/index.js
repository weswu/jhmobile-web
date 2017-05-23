'use strict';

app.controller("VideoCtrl", [ "$scope", "$rootScope", "$location", "$http",
		"API_END_POINT",
		function($scope, $rootScope, $location, $http, API_END_POINT) {
            $(".video-list dl").click(function(){
                $(this).children(".video-display").show("slow");
                $(this).siblings().children(".video-display").hide("slow");
            });
		} 
]);