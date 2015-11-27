(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteClienteAgendadoController', DeleteClienteAgendadoController);

	DeleteClienteAgendadoController.$inject = ["$compile", "$state","$scope","ClasesServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteClienteAgendadoController($compile, $state, $scope, ClasesServiceAdmin, HelpersFactory, constants){
		

		var helper=HelpersFactory;
		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');


		$scope.agendadoDuplicado = angular.copy($scope.delAgendado);
			
			$scope.eliminarAgendado=function(){
				var cliente ={};
				cliente.no_registro = $scope.agendadoDuplicado.ClientesRegistro;
				cliente.horaAg = $scope.agendadoDuplicado.agendarclaseHora;
				cliente.diaAg = $scope.agendadoDuplicado.agendarclaseDia;

				ClasesServiceAdmin
					.EliminarClienteAgendado(cliente)
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
					//cerrar popup
					helper.popupClose();
						//$state.reload();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();
