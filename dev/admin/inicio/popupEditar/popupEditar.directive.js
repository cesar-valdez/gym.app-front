(function(){
	angular.module('gymApp.Admin')
	.directive('inicioEditar', inicioEditar)
	function inicioEditar(){
		return{
			restrict:'E',
			templateUrl: './admin/inicio/popupEditar/popupEditar.html'
		}
	}

})();