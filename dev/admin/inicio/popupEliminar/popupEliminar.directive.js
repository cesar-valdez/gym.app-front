(function(){
	angular.module('gymApp.Admin')
	.directive('inicioEliminar', inicioEliminar)
	function inicioEliminar(){
		return{
			restrict:'E',
			templateUrl: './admin/inicio/popupEliminar/popupEliminar.html'
		}
	}

})();