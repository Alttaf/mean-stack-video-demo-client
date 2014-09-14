var app = angular.module("exercise",[])

.controller("exercise",function($scope,$interval,SendRequests) {

$scope.x =1;
function runLoop(id) {
 $interval(function() {
	SendRequests.all(id, function(data){
	 $scope.x = data+1;
	});

 console.log("interval");
}

,1000);
}
runLoop($scope.x);
$scope.toggleButton = function(){
$scope.toggle = $scope.toggle?false:true;
}


})
/**
 * A simple example service that returns some data.
 */
.factory('SendRequests', ['$http', function ($http) {
    // Might use a resource here that returns a JSON arrayhttp://54.77.223.232/
    return {
	all	: function (id,callback){
        // Simple index lookup
        var uri = "http://54.77.223.232:9000/api/things";
        $http.get(uri).
        success(function (data, status, headers, config) {
          console.log("/api/notifications cs  received");        
          console.log(data);        
          callback(data);
        }).
        error(function (data, status, headers, config) {
          console.log("/api/notifications cs error: ");
        });
      },
	fake	: function (id,callback){
			console.log(id);
			callback(2);
		}
	
	}
}])
	
.directive("myVideoManip",function() {
linkFn = function(scope, element, attrs){
var playVideo;
var animateDown, animateRight, vid1, button2;
vid1 = angular.element(element.children()[0]);
button2 = angular.element(element.children()[1]);
playVideo = function (){
	// select video 1 and play it
	//amgular.element('#video1').play();
	console.log("button click");
	vid1[0].play();
	scope.toggleButton();
	scope.$apply();
}

        $(vid1).on('click', playVideo);
        $(button2).on('click', playVideo);
}
 return {
        restrict: 'E',
        link: linkFn,
		scope:false
    };
});
