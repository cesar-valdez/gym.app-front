(function(){
	angular.module('gymApp.Admin')
	.directive('retosVer', retosVer)
	function retosVer(){
		return{
			restrict:'E',
			templateUrl: './admin/retos/popupVer/popupVer.html'
		}
	}

})();