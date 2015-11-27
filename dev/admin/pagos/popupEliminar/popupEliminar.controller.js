(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeletePagosAdminController', DeletePagosAdminController);

	DeletePagosAdminController.$inject = ["$compile", "$state","$scope","PagosServiceAdmin" , "HelpersFactory", "constant"];

	function DeletePagosAdminController($compile, $state, $scope, PagosServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		$scope.pagoDuplicado = angular.copy($scope.delPago);
			$scope.deletePago=function(){

				//validacion con mensaje ok y error
				var body = angular.element(document).find('body');


				var pago = {};
				pago.id_pago = $scope.pagoDuplicado.PagosId;

				PagosServiceAdmin
					.deletePagos(pago)
					.then(function(response){
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
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
