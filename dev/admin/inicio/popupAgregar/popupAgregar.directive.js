(function(){
	angular.module('gymApp.Admin')
	.directive('inicioAgregar', inicioAgregar)
	function inicioAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/inicio/popupAgregar/popupAgregar.html'
		}
	}

})();