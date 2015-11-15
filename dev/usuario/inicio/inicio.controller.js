(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('InicioController', InicioController);

	InicioController.$inject = ["$state","$scope","InicioService"];

	function InicioController($state, $scope, InicioService){
		console.log("Inicio controller");

		$scope.banners = [];

		//getBanner
		InicioService.getBanner().then(
			function(response){
			console.log(response)
			$scope.banners = response;
			console.log(response);
		}).catch(function(err){
			console.log(err)
		});
	}

})();