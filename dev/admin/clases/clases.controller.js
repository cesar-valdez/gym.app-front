(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('ClasesAdminController', ClasesAdminController);

	ClasesAdminController.$inject = ["$state","$scope","ClasesService", "InstructoresService", "HelpersFactory", "constant"];

	function ClasesAdminController($state, $scope, ClasesService, InstructoresService, HelpersFactory, constants){
		console.log("ClasesAdmin controller");

		$scope.clases = [];

		//getClases
		ClasesService
			.getClases()
			.then(function(response){
				console.log(response)
				$scope.clases = response;
		}).catch(function(err){
			console.log(err)
		});
		
	}

})();