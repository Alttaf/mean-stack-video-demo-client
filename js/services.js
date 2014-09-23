angular.module('videoDisplay.services', [])
.factory('SendRequests', ['$http', function ($http) {
		// Might use a resource here that returns a JSON arrayhttp://54.77.223.232/
		return {
			update : function (id, time, action, callback) {
				// Simple index lookup
				var uri = "http://54.77.223.232:9000/api/things?id=" + id + "&time=" + time + "&action=" + action;
				$http.get(uri).
				success(function (data, status, headers, config) {
					console.log("/api/things update received");
					//console.log(data);
					callback(data);
				}).
				error(function (data, status, headers, config) {
					console.log("/api/things update error: ");
				});
			},
			create : function (id, callback) {
				// Simple index lookup
				var uri = "http://54.77.223.232:9000/api/things?id=" + id;
				$http.post(uri).
				success(function (data, status, headers, config) {
					console.log("/api/things create cs  received");
					//console.log(data);
					callback(data);
				}).
				error(function (data, status, headers, config) {
					console.log("/api/things create cs error: ");
				});
			}

		}
	}
])