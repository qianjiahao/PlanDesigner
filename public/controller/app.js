(function() {

	var app = angular.module('app', []);


	app.controller('GetDateCtrl', function($scope, $timeout) {

		var myTimeout = function() {

			$scope.datetime = format(new Date());

			$timeout(myTimeout, 1000);
		}

		$timeout(myTimeout, 1000);

	});


	app.controller('DesignCtrl', function($scope, $timeout) {

		var designedTimeList = [];

		var myTimeout = function() {

			var datetime = new Date();
			var amOrPm;
			

			// Begin: time of from
			var fromMinutes = datetime.getMinutes();

			var fromHours = fromMinutes > 10 ? datetime.getHours() + 1 : datetime.getHours();

			var fromList = [];

			for (var hour = fromHours, i = 0; i < 24; i++,hour++) {
				hour = hour%24;
				amOrPm = (hour > 11) ? 'pm' : 'am';
				fromList.push(hour+'-'+amOrPm);
			}
			console.log(fromList);

			$scope.fromList = fromList;
			// End: time of from

			console.log($scope.selected);

			$timeout(myTimeout, 1000 * 60 * 10);
		}


		$timeout(myTimeout, 1000);

		var duringMinutes = 5;
		var duringList = [];

		for(var i = duringMinutes;i<=60;i+=5){
			duringList.push(i);
		}

		$scope.duringList = duringList;

		$scope.save =function () {
			designedTimeList.push({
				from:$scope.selected
			});

			console.log(designedTimeList);
		}
		



	});


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
	}

	return app;

}());