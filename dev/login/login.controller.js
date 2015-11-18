(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Login')
	.controller('LoginController', LoginController);

	LoginController.$inject = ["$state","$scope","LoginService", "UsuarioFactory"];

	function LoginController($state, $scope, LoginService, UsuarioFactory){
		console.log("Login controller");
		$scope.usuario = {};
		var usuario = UsuarioFactory;

		console.log(usuario)

		$scope.addUsuario=function(){
			LoginService
				.login($scope.usuario)
				.then(function(data){
					if(data.estatus == 'ok'){
						if(data.usuario){
							if(data.tipoUsuario == 'admin'){
								$state.go('admin.inicio')
							} else {
					console.log(data);
								usuario.setInfo(data.usuario);
								$state.go('usuario.inicio')
							}

						} else {
							console.log(data.msj)
						}
					} else {
						console.log(data.msj)
					}
				})
				.catch(function(error){
					console.log(error);
				});
		}
		/*LoginService.obtenerUsuarios().then
			(function(data){
				$scope.usuarios=data;
				console.log(data);
		}).catch(function(error){
			$scope.usuarios=error;
		});*/
	}

})();