(function(){
	angular.module('gymApp.Admin')
	.directive('pagosAgregar', pagosAgregar)
	function pagosAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/pagos/popupAgregar/popupAgregar.html'
		}
	}

})();