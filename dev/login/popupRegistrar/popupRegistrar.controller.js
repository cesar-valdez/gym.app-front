(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Login')
	.controller('LoginRegistrarController', LoginRegistrarController);

	LoginRegistrarController.$inject = ["$state","$scope","LoginService", "InstructoresServiceAdmin", "HelpersFactory", "constant"];

	function LoginRegistrarController($state, $scope, LoginService, InstructoresServiceAdmin, HelpersFactory, constants){
		console.log("LoginRegistrar controller");

		$scope.registro={};
		var helper = HelpersFactory;
		//imagen por default
		$scope.registro.imgCliente=constants.imgDefault;

	}

})();