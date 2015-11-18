(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('PagosAdminController', PagosAdminController);

	PagosAdminController.$inject = ["$state","$scope","PagosServiceAdmin"];

	function PagosAdminController($state, $scope, PagosServiceAdmin){
		console.log("PagosAdmin controller");

		$scope.Pagos = [];

		var fechaActual = new Date();

		//getPagos
		PagosServiceAdmin.getPagos().then(
			function(response){
			console.log(response)
			$scope.pagos = response;

			for(var i=0; i < response.length; i++){
				console.log($scope.pagos[i].PagosFechaPago)
				if(new Date($scope.pagos[i].PagosFechaPago) <= fechaActual){
					$scope.pagos[i].fechaVencida = true;
					$scope.pagos[i].PagosEstado = "No Pagado";
				}
			}

		}).catch(function(err){
			console.log(err)
		});

	}

})();