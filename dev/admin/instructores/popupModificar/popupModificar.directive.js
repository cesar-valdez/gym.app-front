(function(){
	angular.module('gymApp.Admin')
	.directive('instructoresModificar', instructoresModificar)
	function instructoresModificar(){
		return{
			restrict:'E',
			templateUrl: './admin/instructores/popupModificar/popupModificar.html'
		}
	}

})();