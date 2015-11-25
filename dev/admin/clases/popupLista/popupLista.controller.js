(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('ClasesListaAdminController', ClasesListaAdminController);

	ClasesListaAdminController.$inject = ["$state","$scope","ClasesServiceAdmin", "HelpersFactory", "constant"];

	function ClasesListaAdminController($state, $scope, ClasesServiceAdmin, HelpersFactory, constants){
		console.log("ClasesListaAdmin controller", $scope.clase);

		$scope.listas = [];

		//getLista de clientes de cada Clase
		ClasesServiceAdmin
			.getAgendarClase($scope.clase.hora, $scope.clase.dia)
			.then(function(response){
				console.log(response)
				$scope.listas = response;

		}).catch(function(err){
			console.log(err)
		});
		
	}

})();