var app = angular.module("exercise", [])

	.controller("exercise", function ($scope, $interval, SendRequests) {

		$scope.x = 1;
		$scope.vidTime = -1;
		function runLoop(id, vidTime) {
			$interval(function () {
				SendRequests.all(id, function (data) {
					$scope.x = data + 1;
				});

				console.log("interval");
			}, 1000);
		}
		
	//	runLoop($scope.x);
	
		$scope.toggleButton = function () {
			$scope.toggle = $scope.toggle ? false : true;
			console.log($scope.vid1);
			
			// SendRequests.update($scope.vid1,$scope.vidTime, function (data) {
				// console.log("sendRequest.update");
			// });
		}

	})
	/**
	 * A simple example service that returns some data.
	 */
	.factory('SendRequests', ['$http', function ($http) {
				// Might use a resource here that returns a JSON arrayhttp://54.77.223.232/
				return {
					update : function (id,time,action, callback) {
						// Simple index lookup
						var uri = "http://54.77.223.232:9000/api/things?id="+id+"&time="+time+"&action="+action;
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
					create : function (id, callback) {
					// Simple index lookup
					var uri = "http://54.77.223.232:9000/api/things?id="+id;
					$http.post(uri).
					success(function (data, status, headers, config) {
						console.log("/api/notifications cs  received");
						console.log(data);
						callback(data);
					}).
					error(function (data, status, headers, config) {
						console.log("/api/notifications cs error: ");
					});		
					},
					fake : function (id, callback) {
					console.log(id);
					callback(2);
					}

				}
			}
		])

	.directive("myVideoManip", function ( SendRequests) {
		linkFn = function (scope, element, attrs) {
			var playVideo;
			var animateDown,
			animateRight,
			vid1,
			button2;
			vid1 = angular.element(element.children()[0]);
			button2 = angular.element(element.children()[1]);
			button3 = angular.element(element.children()[2]);

			playVideo = function () {
				// select video 1 and play it
				//amgular.element('#video1').play();
				console.log("button click");
				vid1[0].play();
			}
			
			pauseVideo = function () {
				// select video 1 and play it
				//amgular.element('#video1').play();
				console.log("button click");
				vid1[0].pause();
			}
			
			videoIsPlaying = function () {
				// select video 1 and play it
				//amgular.element('#video1').play();
				console.log("video play");
				scope.action = "play"
				scope.$apply();
				videoChange();

			}
			
			videoIsPaused = function () {
				// select video 1 and play it
				//amgular.element('#video1').play();
				console.log("video play");
				scope.action = "pause"
				scope.$apply();
				videoChange();

			}
			
			
			videoChange = function () {
				// select video 1 and play it
				//amgular.element('#video1').play();
				
				console.log("videoChange"+scope.action);
				scope.vidTime = vid1[0].currentTime;
				var time  = vid1[0].currentTime;
				var id = vid1[0].id;
				console.log(scope.vidTime);
				SendRequests.update(id,time,scope.action, function (data) {
				console.log("sendRequest.create"+scope.vid1);
			});
				scope.toggleButton();
				scope.$apply();
			}

			$(vid1).on('pause', videoIsPaused);
			$(vid1).on('play', videoIsPlaying);
			$(button2).on('click', playVideo);
			$(button3).on('click', pauseVideo);
			scope.vid1 = $(vid1)[0].id;
			SendRequests.create(scope.vid1, function (data) {
				console.log("sendRequest.create"+scope.vid1);
			});

		}
		return {
			restrict : 'E',
			link : linkFn,
			scope : false
		};
	});