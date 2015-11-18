(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('ModificarPerfilController', ModificarPerfilController);

	ModificarPerfilController.$inject = ["$state","$scope","ClientesServiceAdmin", "InstructoresServiceAdmin", "HelpersFactory", "constant"];

	function ModificarPerfilController($state, $scope, ClientesServiceAdmin, InstructoresServiceAdmin, HelpersFactory, constants){
		console.log("ModificarPerfil controller");

		$scope.registro={};
		var helper = HelpersFactory;
		//imagen por default
		$scope.registro.imgCliente=constants.imgDefault;
		
	}

})();