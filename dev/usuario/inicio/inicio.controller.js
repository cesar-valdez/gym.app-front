(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('InicioController', InicioController);

	InicioController.$inject = ["$state","$scope","InicioServiceAdmin", "ClientesServiceAdmin", 'UsuarioFactory'];

	function InicioController($state, $scope, InicioServiceAdmin, ClientesServiceAdmin, UsuarioFactory){
		console.log("Inicio controller");
		var usuario = UsuarioFactory.getInfo();
		$scope.banners = [];
		$scope.c = {};

		//getBanner
		InicioServiceAdmin
			.getBanner()
			.then(function(response){
				console.log(response)
				$scope.banners = response;
				console.log(response);
			}).catch(function(err){
				console.log(err)
		});


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