(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('PagosController', PagosController);

	PagosController.$inject = ["$state","$scope","PagosServiceAdmin"];

	function PagosController($state, $scope, PagosServiceAdmin){
		console.log("Pagos controller");

		$scope.Pagos = [];

		//getPagos
		PagosServiceAdmin.getPagos().then(
			function(response){
			console.log(response)
			$scope.pagos = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();