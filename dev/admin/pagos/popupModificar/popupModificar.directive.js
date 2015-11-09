(function(){
	angular.module('gymApp.Admin')
	.directive('pagosModificar', pagosModificar)
	function pagosModificar(){
		return{
			restrict:'E',
			templateUrl: './admin/pagos/popupModificar/popupModificar.html'
		}
	}

})();