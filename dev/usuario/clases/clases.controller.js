(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('ClasesController', ClasesController);

	ClasesController.$inject = ["$state","$scope","ClasesServiceAdmin"];

	function ClasesController($state, $scope, ClasesServiceAdmin){
		console.log("Clases controller");
		
		$scope.clases = [];

		//getClases
		ClasesServiceAdmin.getClases().then(
			function(response){
			console.log(response)
			$scope.clases = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();