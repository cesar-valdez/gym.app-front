(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetPagosAdminController', SetPagosAdminController);

	SetPagosAdminController.$inject = ["$state","$scope","PagosServiceAdmin" , "HelpersFactory", "constant"];

	function SetPagosAdminController($state, $scope, PagosServiceAdmin, HelpersFactory, constants){
		$scope.pagoDuplicado = angular.copy($scope.editPago);
		var helper=HelpersFactory;

		$scope.EditarPago=function(){

			var pago = {};
			pago.id_pago = $scope.pagoDuplicado.PagosId;
			pago.fechaPago = $scope.pagoDuplicado.PagosFechaPago;
			pago.fechaPagado = $scope.pagoDuplicado.PagosFechaPagado;
			pago.estadoPagado = $scope.pagoDuplicado.PagosEstado;
			pago.montoPagado = $scope.pagoDuplicado.PagosMonto;
			pago.no_registro = $scope.pagoDuplicado.ClientesRegistro;

			PagosServiceAdmin
				.setPagos(pago)
				.then(function(response){
					$scope.editPago = response;
					//cerrar popup
					helper.popupClose();
					$state.reload();
				})
				.catch(function(err){
						console.log(err)
				});
		}
		
	}

})();