(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Login')
	.controller('LoginController', LoginController);

	LoginController.$inject = ["$compile","$state","$scope", "$timeout","LoginService", "UsuarioFactory"];

	function LoginController($compile, $state, $scope, $timeout, LoginService, UsuarioFactory){
		console.log("Login controller");
		$scope.usuario = {};
		var usuario = UsuarioFactory;

		var body =angular.element(document).find('body');
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
								body.append($compile("<mensaje-ok ok='" + data.msj + "'></mensaje-ok>")($scope));
							}

						} else {
						console.log(data.msj)
						body.append($compile("<mensaje-error error='" + data.msj + "'></mensaje-error>")($scope));
						}
					} else {
						console.log(data.msj)
						body.append($compile("<mensaje-error error='" + data.msj + "'></mensaje-error>")($scope));
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