(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('PagosController', PagosController);

	PagosController.$inject = ["$state","$scope","PagosService"];

	function PagosController($state, $scope, PagosService){
		console.log("Pagos controller");

		$scope.Pagos = [];

		//getPagos
		PagosService.getPagos().then(
			function(response){
			console.log(response)
			$scope.pagos = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();