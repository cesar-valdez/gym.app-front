(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('InicioController', InicioController);

	InicioController.$inject = ["$state","$scope","InicioServiceAdmin"];

	function InicioController($state, $scope, InicioServiceAdmin){
		console.log("Inicio controller");

		$scope.banners = [];

		//getBanner
		InicioServiceAdmin.getBanner().then(
			function(response){
			console.log(response)
			$scope.banners = response;
			console.log(response);
		}).catch(function(err){
			console.log(err)
		});
	}

})();