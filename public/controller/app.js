(function() {

	var app = angular.module('app', []);


	app.controller('GetDateCtrl', function($scope, $timeout) {

		var myTimeout = function() {
			$scope.datetime = format(new Date());
			$timeout(myTimeout, 1000);
		};
		$timeout(myTimeout, 0);

	});


	app.controller('DesignCtrl', function($scope, $timeout) {

		$scope.designedTimeList = [];
		var existTimeList = [];

		var myTimeout = function() {
			var datetime = new Date();

			// Begin: time of from
			var fromMinutes = datetime.getMinutes();
			var fromHours = fromMinutes > 10 ? datetime.getHours() + 1 : datetime.getHours();
			for (var hour = fromHours, i = 0, fromList = [], amOrPm; i < 24; i++, hour++) {
				hour = hour % 24;
				amOrPm = (hour > 11) ? 'pm' : 'am';
				fromList.push(hour + ' ' + amOrPm);
			}

			$scope.fromList = filter(fromList,existTimeList);

			// End: time of from

			$timeout(myTimeout, 1000 * 60 * 10);
		};

		$timeout(myTimeout, 0);

		// Begin : time of duration

		for (var durationMinutes = 5,i = durationMinutes , min, durationList = []; i < 60; i += 5) {
			min = i + ' min';
			durationList.push(min);
		}
		$scope.durationList = durationList;
		// End : time of duration


		// Begin : function save
		$scope.save = function() {
			$scope.designedTimeList.push({
				// username: 'william',
				from: $scope.fromTime,
				duration: $scope.durationTime,
				theme: $scope.theme,
				plan: $scope.plan
			});
			existTimeList.push($scope.fromTime);
			$timeout(myTimeout, 0);

			$scope.fromTime = '';
			$scope.durationTime = '';
			$scope.theme = '';
			$scope.plan = '';
			console.log($scope.designedTimeList);
		};
		// End : function save



	});

	var filter = function(sou, tar) {

		var result = [];

		sou.map(function(s) {

			if (tar.indexOf(s) < 0) {
				result.push(s);
			}
		});

		return result;

	};


	var format = function(date) {

		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();

		var hour = date.getHours();
		var minute = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
		//var minute = date.getMinutes();
		var second = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
		//var second = date.getSeconds();

		return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
	};

}());