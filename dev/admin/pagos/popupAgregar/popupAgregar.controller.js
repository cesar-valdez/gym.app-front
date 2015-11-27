(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('PagosAgregarAdminController', PagosAgregarAdminController);

	PagosAgregarAdminController.$inject = ["$compile", "$state",'HelpersFactory', "$scope","PagosServiceAdmin", "ClientesServiceAdmin",'$filter'];

	function PagosAgregarAdminController($compile, $state,HelpersFactory,  $scope, PagosServiceAdmin, ClientesServiceAdmin,$filter){
		console.log("PagosAdmin controller");
		var helper = HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');

		//seleccionar cliente en input
		$scope.selected = {};

		//getClientes
		ClientesServiceAdmin
			.getClientes()
			.then(function(response){
				$scope.clientes = response;
		});



		//addPago
		$scope.newPago={};

		//AddPago
		$scope.addPagos=function(){
			//$scope.pago.no_registro = "1";
			$scope.newPago.no_registro = $scope.selected.ClientesNoRegistro;

			//Servicio para validar si es la primera vez que paga
			PagosServiceAdmin
				.pagoExistente($scope.newPago)
				.then(function(response){

					if(response.estatus){
						$scope.newPago.fechaPago = helper.stringToDate(response.fechaPago);
						$scope.newPago.fechaPago.setMonth($scope.newPago.fechaPago.getMonth() + 1);
						$scope.newPago.fechaPago = helper.dateYYYYMMDD($scope.newPago.fechaPago);
					}else{
						if(typeof $scope.newPago.fechaPagado != "undefined"){
							$scope.newPago.fechaPago = angular.copy($scope.newPago.fechaPagado);
							$scope.newPago.fechaPago.setMonth($scope.newPago.fechaPago.getMonth() + 1);
							$scope.newPago.fechaPago = helper.dateYYYYMMDD($scope.newPago.fechaPago);
						}
					}


					//Servicio de agregar pago
					PagosServiceAdmin
					.addPago($scope.newPago)
						.then(function(res){
							if(res.estatus == 'ok'){
									helper.popupClose();
									body.append($compile("<mensaje-ok ok='"+ res.msj +"'></mensaje-ok>")($scope));
									//$state.reload();
								} else {
									helper.popupClose();
									body.append($compile("<mensaje-error error='"+ res.msj +"'></mensaje-error>")($scope));
								}
							//helper.popupClose();
							//$state.reload();
					})
					.catch(function(err){
						console.log(err)
					});


				})
				.catch(function(err){
					console.log(err)
				});
		}

	}

})();