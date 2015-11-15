(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('RetosAgregarAdminController', RetosAgregarAdminController);

	RetosAgregarAdminController.$inject = ["$state","$scope","RetosService", "HelpersFactory", "constant"];

	function RetosAgregarAdminController($state, $scope, RetosService, HelpersFactory, constants){
		console.log("RetosAgregarAdmin controller");
		
		var helper = HelpersFactory;

		//addReto
		$scope.reto={};
		//imagen por default
		$scope.reto.imgReto=constants.imgDefault;

		//AddReto
		$scope.addRetos=function(){
			$scope.reto.no_registro = "1";
			RetosService
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