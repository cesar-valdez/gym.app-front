(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetPagosAdminController', SetPagosAdminController);

	SetPagosAdminController.$inject = ["$compile", "$state","$scope","PagosServiceAdmin" , "HelpersFactory", "constant"];

	function SetPagosAdminController($compile, $state, $scope, PagosServiceAdmin, HelpersFactory, constants){
		$scope.pagoDuplicado = angular.copy($scope.editPago);
		var helper=HelpersFactory;

		$scope.EditarPago=function(){

			//validacion con mensaje ok y error
			var body = angular.element(document).find('body');

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

					if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}

					$scope.editPago = response;
					//cerrar popup
					//helper.popupClose();
					//$state.reload();
				})
				.catch(function(err){
						console.log(err)
				});
		}
		
	}

})();