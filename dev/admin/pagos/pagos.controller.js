(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('PagosAdminController', PagosAdminController);

	PagosAdminController.$inject = ["$state","$scope","PagosServiceAdmin", "HelpersFactory", "constant"];

	function PagosAdminController($state, $scope, PagosServiceAdmin, HelpersFactory, constants){
		console.log("PagosAdmin controller");

		$scope.pagosC = [];
		var helper=HelpersFactory;
		var fechaActual = new Date();

		//getPagos
		PagosServiceAdmin
			.getPagos()
			.then(function(response){
				console.log(response)
				$scope.pagosC = response;

				for(var i=0; i < response.length; i++){
					console.log($scope.pagosC[i].PagosFechaPago)
					if(new Date($scope.pagosC[i].PagosFechaPago) <= fechaActual){
						$scope.pagosC[i].fechaVencida = true;
						$scope.pagosC[i].PagosEstado = "No Pagado";
					}
				}
				//en modificar le pago salga la fecha con formato date
				for(var i=0; i<response.length; i++){
					$scope.pagosC[i].PagosFechaPagado = new Date($scope.pagosC[i].PagosFechaPagado);
				}

		}).catch(function(err){
			console.log(err)
		});

	}

})();