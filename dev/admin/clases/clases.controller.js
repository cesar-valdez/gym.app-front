(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('ClasesAdminController', ClasesAdminController);

	ClasesAdminController.$inject = ["$state","$scope","ClasesServiceAdmin", "HelpersFactory", "constant"];

	function ClasesAdminController($state, $scope, ClasesServiceAdmin, HelpersFactory, constants){
		console.log("ClasesAdmin controller");

		$scope.clases = [];

		//getClases
		ClasesServiceAdmin
			.getClases()
			.then(function(response){
				console.log(response)
				$scope.clases = response;
		}).catch(function(err){
			console.log(err)
		});
		
	}

})();