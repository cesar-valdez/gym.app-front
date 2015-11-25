(function(){
	angular.module('gymApp.Admin')
	.directive('pagosAgregar', pagosAgregar)
	.directive('pagosModificar', pagosModificar)
	.directive('pagosEliminar', pagosEliminar)

	function pagosAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/pagos/popupAgregar/popupAgregar.html',
			controller: 'PagosAgregarAdminController'
		}
	}

	function pagosModificar(){
		return{
			restrict:'E',
			scope:{
				editPago: '='
			},
			templateUrl: './admin/pagos/popupModificar/popupModificar.html',
			controller: 'SetPagosAdminController'
		}
	}

	function pagosEliminar(){
		return{
			restrict:'E',
			scope:{
				delPago: '='
			},
			templateUrl: './admin/pagos/popupEliminar/popupEliminar.html',
			controller: 'DeletePagosAdminController'
		}
	}


})();