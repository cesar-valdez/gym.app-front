(function(){
	angular.module('gymApp.Admin')
	.directive('instructoresVer', instructoresVer)
	function instructoresVer(){
		return{
			restrict:'E',
			templateUrl: './admin/instructores/popupVer/popupVer.html'
		}
	}

})();
