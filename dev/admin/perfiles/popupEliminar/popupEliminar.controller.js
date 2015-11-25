(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteClientesAdminController', DeleteClientesAdminController);

	DeleteClientesAdminController.$inject = ["$compile", "$state","$scope","ClientesServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteClientesAdminController($compile, $state, $scope, ClientesServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');


		$scope.clienteDuplicado = angular.copy($scope.delCliente);
			
			$scope.deleteCliente=function(){
				
				var cliente = {};
				cliente.no_registro = $scope.clienteDuplicado.ClientesNoRegistro;

				ClientesServiceAdmin
					.deleteClientes(cliente)
					.then(function(response){

						//validacion con mensaje error y ok
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						//helper.popupClose();
						//$state.reload();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();
