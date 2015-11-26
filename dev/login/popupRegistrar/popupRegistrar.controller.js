(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Login')
	.controller('LoginRegistrarController', LoginRegistrarController);

	LoginRegistrarController.$inject = ['$compile', "$state","$scope","LoginService", "InstructoresServiceAdmin", "HelpersFactory", "constant"];

	function LoginRegistrarController($compile, $state, $scope, LoginService, InstructoresServiceAdmin, HelpersFactory, constants){
		console.log("LoginRegistrar controller");

		$scope.newUsuario={};
		var helper = HelpersFactory;
		//imagen por default
		$scope.newUsuario.imgCliente=constants.imgDefault;
		$scope.newUsuario.tipoUsuario = "usuario";


		var body =angular.element(document).find('body');
		$scope.registrar = function(formValid){
			/*var usuario = {
				"nombre":"jorge",
				"apellido":"Avalos",
				"imgCliente":"http://localhost:8080/gym.app/front/dep/img/reto4.jpg",
				"celular":"8443454345",
				"peso":"60kg",
				"estatura":"1.60m",
				"edad":"25",
				"domicilio":"Calle n",
				"correo":"ram@hotmail.com",
				"password":"ram",
				"tipoUsuario": "usuario"
			}*/
			if(formValid){
				LoginService
					.addUsuario($scope.newUsuario)
					//.addUsuario(usuario)
					.then(function(data){
						console.log(data)
						if(data.estatus == 'ok'){
							body.append($compile("<mensaje-ok ok='" + data.msj + "'></mensaje-ok>")($scope));
							helper.popupClose();
						} else {
							body.append($compile("<mensaje-error error='" + data.msj + "'></mensaje-error>")($scope));
						}
					})
					.catch(function(err){
						console.log(err)
					})
			}
		}

	}

})();