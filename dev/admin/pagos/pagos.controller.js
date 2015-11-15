(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('PagosAdminController', PagosAdminController);

	PagosAdminController.$inject = ["$state","$scope","PagosService"];

	function PagosAdminController($state, $scope, PagosService){
		console.log("PagosAdmin controller");

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