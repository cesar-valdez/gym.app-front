(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('PagosController', PagosController);

	PagosController.$inject = ["$state","$scope","PagosServiceAdmin", "UsuarioFactory"];

	function PagosController($state, $scope, PagosServiceAdmin, UsuarioFactory){
		console.log("Pagos controller");
		var usuario = UsuarioFactory.getInfo();
		$scope.pagos = {};
		var fechaActual = new Date();

		//getPagos
		PagosServiceAdmin
			.getPago(usuario.no_registro)
			.then(function(response){
				console.log(response)
				$scope.pagos = response;

				for(var i=0; i < response.length; i++){
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