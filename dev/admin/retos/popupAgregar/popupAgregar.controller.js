(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('RetosAgregarAdminController', RetosAgregarAdminController);

	RetosAgregarAdminController.$inject = ["$state","$scope","RetosServiceAdmin", "HelpersFactory", "constant"];

	function RetosAgregarAdminController($state, $scope, RetosServiceAdmin, HelpersFactory, constants){
		console.log("RetosAgregarAdmin controller");
		
		var helper = HelpersFactory;

		//addReto
		$scope.reto={};
		//imagen por default
		$scope.reto.imgReto=constants.imgDefaultReto;

		//AddReto
		$scope.addRetos=function(){
			$scope.reto.no_registro = "1";

			$scope.reto.fechaPago = false;

			RetosServiceAdmin
				.addRetos($scope.reto)
				.then(function(res){
					console.log(res);
					//agregar uno mas al areglo y pueda utilizar el get
					$scope.retos.push(res);
					//cerrar popup
					helper.popupClose();
				})
				.catch(function(err){
					console.log(err)
				});
		}


	}

})();