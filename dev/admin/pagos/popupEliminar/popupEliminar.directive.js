(function(){
	angular.module('gymApp.Admin')
	.directive('pagosEliminar', pagosEliminar)
	function pagosEliminar(){
		return{
			restrict:'E',
			templateUrl: './admin/pagos/popupEliminar/popupEliminar.html'
		}
	}

})();