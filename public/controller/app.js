(function() {

	'use strict';

	var app = angular.module('app', []);


	app.controller('GetDateCtrl', ['$scope', '$timeout', function($scope, $timeout) {

		var myTimeout = function() {
			$scope.datetime = format(new Date());
			$timeout(myTimeout, 1000);
		};
		$timeout(myTimeout, 0);

	}]);


	app.controller('DesignCtrl', ['$scope', '$timeout', function($scope, $timeout) {

		/**
		 * all of data of plan which has been designed
		 * @type {Array}
		 */
		$scope.designedTimeList = [];

		/**
		 * all of the data of exist plan's time
		 * @type {Array}
		 */
		var existTimeList = [];

		/**
		 * the step of refresh time
		 * @type {Number}
		 */
		var refreshTime = 5;

		/**
		 * check the real time,call itself back 
		 *  and refresh the binded select option in the page every 5 minutes
		 * @return {fromList}
		 */
		var myTimeout = function() {
			var datetime = new Date();

			var fromMinutes = datetime.getMinutes();

			var fromHours = fromMinutes > refreshTime ? datetime.getHours() + 1 : datetime.getHours();
			for (var hour = fromHours, i = 0, fromList = [], amOrPm; i< 24; i++, hour++) {
				hour = hour % 24;
				hour = hour < 10 ? '0' + hour : hour;
				amOrPm = (hour >11) ? 'pm' : 'am';
				fromList.push(hour + ' ' + amOrPm);
			}

			$scope.fromList = filter(fromList, existTimeList);

			$timeout(myTimeout, 1000 * 60 * refreshTime);
		};
		$timeout(myTimeout, 0);


		// Begin : time of duration


		/**
		 * generate the minutes and bind it with select option in the front-end page automaticly
		 * @param  {step}
		 * @return {$scope.durationList}
		 */
		(function(step){
			var	i 	= 	step,
				temp
			;

			$scope.durationList = [];
			for ( i ; i< 60; i += step) {
				temp = i < 10 ? '0' + i : i;

				$scope.durationList.push(temp + ' min');
			}
			return $scope.durationList;

		})(refreshTime);


		/**
		 * when you click the save button in the front-end page ,
		 * the value in the form will push into the array which keep user the data
		 * @param {string} [from] [the date when plan start]
		 * @param {string} [duration] [how long did the plan maintain]
		 * @param {string} [theme] [the topic of the plan]
		 * @param {string} [plan] [the content of the plan]
		 * @param {string} [status] [the status of the plan]
		 */
		$scope.save = function() {
			$scope.designedTimeList.push({
				from: $scope.fromTime,
				duration: $scope.durationTime,
				theme: $scope.theme,
				plan: $scope.plan,
				status: '0'
			});
			existTimeList.push($scope.fromTime);

			$timeout(myTimeout, 0);
			$timeout(checkTime, 0);

			$scope.fromTime = '';
			$scope.durationTime = '';
			$scope.theme = '';
			$scope.plan = '';
		};

		/**
		 * check the plan is from time and duration , and if the relation between the real time and plan time changed , 
		 * change the status real-time 
		 * @param {Date} [hour/minute] [real time]
		 * @param {Date} [existHour/existMinute] [plan's time]
		 */
		var checkTime = function() {
			var date 	= new Date(),
				hour 	= date.getHours(),
				minute  = date.getMinutes(),
				temp,
				existHour,
				existMinute
			;

			while ($scope.designedTimeList.length) {

				$scope.designedTimeList.map(function(ele){

					temp = ele.from.slice(0, 2);
					existHour = +temp;

					temp = ele.duration.slice(0, 2);
					existMinute = +temp;

					if (existHour == hour && existMinute >= minute) {
						$scope.designedTimeList[0].status = '1';
					} else if (existHour < hour || (existHour == hour && existMinute < minute)) {
						$scope.designedTimeList[0].status = '-1';
					}

				});
				break;
			}
			$timeout(checkTime, 1000 * 60 * refreshTime);
		};
		$timeout(checkTime, 0);


		/**
		 * when you click the cancel button , the exist hour or minute will destroy ,
		 * and you can pick the destroy time again from the form .
		 * @param  {String} [time] [plan's from time which be destroyed]
		 */
		$scope.cancel = function(time) {
				remove(existTimeList, time);
				$timeout(myTimeout, 0);
				removeDesigned($scope.designedTimeList, time);
		};

	}]);

	var removeDesigned = function(sou, tar) {
		sou.map(function(ele, index) {
			if (ele.from === tar) {
				sou.splice(index, 1);
			}
		});
		return sou;
	};

	var remove = function(sou, tar) {
		var index = sou.indexOf(tar);
		sou.splice(index, 1);
		return sou;
	};

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