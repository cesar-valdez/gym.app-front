(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeletePagosAdminController', DeletePagosAdminController);

	DeletePagosAdminController.$inject = ["$state","$scope","PagosServiceAdmin" , "HelpersFactory", "constant"];

	function DeletePagosAdminController($state, $scope, PagosServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		$scope.pagoDuplicado = angular.copy($scope.delPago);
			$scope.deletePago=function(){

				var pago = {};
				pago.id_pago = $scope.pagoDuplicado.PagosId;

				PagosServiceAdmin
					.deletePagos(pago)
					.then(function(response){
						console.log(response)
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
