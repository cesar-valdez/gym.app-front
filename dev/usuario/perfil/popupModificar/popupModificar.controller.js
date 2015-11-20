(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('ModificarPerfilController', ModificarPerfilController);

	ModificarPerfilController.$inject = ["$state","$scope","ClientesServiceAdmin", "InstructoresServiceAdmin", "HelpersFactory", "constant"];

	function ModificarPerfilController($state, $scope, ClientesServiceAdmin, InstructoresServiceAdmin, HelpersFactory, constants){
		console.log("ModificarPerfil controller");
		console.log($scope.usuario);

		$scope.usuarioUpdate=angular.copy($scope.usuario);
		var helper = HelpersFactory;

		$scope.SetCliente = function(){
			ClientesServiceAdmin
				.setClientes($scope.usuarioUpdate)
				.then(function(res){
					helper.popupClose();
					$state.reload();
				})
				.catch(function(err){
					console.log(err);
				})
		}
		//imagen por default
		//$scope.registro.imgCliente=constants.imgDefault;
		
	}

})();