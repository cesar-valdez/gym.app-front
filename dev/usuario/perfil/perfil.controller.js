(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('PerfilController', PerfilController);

	PerfilController.$inject = ["$state","$scope","ClientesServiceAdmin", "HelpersFactory", "constant", 'UsuarioFactory'];

	function PerfilController($state, $scope, ClientesServiceAdmin, HelpersFactory, constants, UsuarioFactory){
		console.log("Perfil controller");
		var usuario = UsuarioFactory.getInfo();
		$scope.c = {};
		var helper=HelpersFactory;


		//getClientes
		ClientesServiceAdmin
			.getCliente(usuario.no_registro)
			.then(function(response){
				console.log(response)
				$scope.c = response;
		}).catch(function(err){
			console.log(err)
		});

	}

})();