(function(){
	angular.module('gymApp.Helpers')
	.factory('HelpersFactory', HelpersFactory);

	HelpersFactory.$inject = []

	function HelpersFactory(){

		var helperFactory = {};

		helperFactory.popupClose = function () {
			var body = angular.element(document).find('body');
			body.removeClass('popup-on');
			var popup = angular.element(document.querySelectorAll("[popup-close]"));
			popup[0].remove();
		};

		helperFactory.dateYYYYMMDD = function(date){
			var date = new Date(date);
			var day = date.getDate();
			var month = date.getMonth() + 1;
			var year = date.getFullYear();

			if(day < 10){
				day = '0' + day;
			}
			if(month < 10){
				month = '0' + month;
			}

			date = year + '-' + month + '-' + day;

			return date;
		}

		helperFactory.stringToDate = function(date){
			var date = new Date(date);
			var day = date.getDate() + 1;
			var month = date.getMonth() + 1;
			var year = date.getFullYear();
			date = year + '-' + month + '-' + day;

			return new Date(date);
		}

		helperFactory.getDay = function(date){
			var date = new Date(date);
			return date.getDate() + 1;
		}
		helperFactory.getMonth = function(date){
			var date = new Date(date);
			return date.getMonth() + 1;
		}

		helperFactory.getYear = function(date){
			var date = new Date(date);
			return date.getFullYear();
		}
		
		helperFactory.getNameMonth = function(date){
			var date = new Date(date);
			var month = date.getMonth();

			var nameMonths = [
				'Enero',
				'Febrero',
				'Marzo',
				'Abril',
				'Mayo',
				'Junio',
				'Julio',
				'Agosto',
				'Septiembre',
				'Octubre',
				'Noviembre',
				'Diciembre'
			]

			return nameMonths[month];
		}

		return helperFactory;
	}

})();