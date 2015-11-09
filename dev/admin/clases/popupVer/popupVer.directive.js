(function(){
	angular.module('gymApp.Admin')
	.directive('clasesVer', clasesVer)
	function clasesVer(){
		return{
			restrict:'E',
			templateUrl: './admin/clases/popupVer/popupVer.html'
		}
	}

})();