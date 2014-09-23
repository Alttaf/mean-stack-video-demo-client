angular.module('videoDisplay.directives', [])
.directive("myVideoManip", function (SendRequests) {
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
			console.log("button play");
			vid1[0].play();
		}

		pauseVideo = function () {
			console.log("buttton pause");
			vid1[0].pause();
		}

		videoIsPlaying = function () {
			console.log("video play Event");
			scope.action = "play"
				scope.$apply();
			videoChange();

		}

		videoIsPaused = function () {
			console.log("video pause Event");
			scope.action = "pause"
				scope.$apply();
			videoChange();

		}

		videoChange = function () {
			scope.vidTime = vid1[0].currentTime;
			var time = vid1[0].currentTime;
			var id = vid1[0].id;
			// console.log(scope.vidTime);
			SendRequests.update(id, time, scope.action, function (data) {});
			scope.$apply();
		}
		// click handlers in the closure
		$(vid1).on('pause', videoIsPaused);
		$(vid1).on('play', videoIsPlaying);
		$(button2).on('click', playVideo);
		$(button3).on('click', pauseVideo);
		scope.vid1 = $(vid1)[0].id;
		SendRequests.create(scope.vid1, function (data) {});

	}
	return {
		restrict : 'E',
		link : linkFn,
		scope : false
	};
});
