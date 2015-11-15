(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('ClasesController', ClasesController);

	ClasesController.$inject = ["$state","$scope","ClasesService"];

	function ClasesController($state, $scope, ClasesService){
		console.log("Clases controller");
		
		$scope.clases = [];

		//getClases
		ClasesService.getClases().then(
			function(response){
			console.log(response)
			$scope.clases = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();