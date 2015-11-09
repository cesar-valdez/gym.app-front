(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('ClasesAdminController', ClasesAdminController);

	ClasesAdminController.$inject = ["$state","$scope","ClasesService"];

	function ClasesAdminController($state, $scope, ClasesService){
		console.log("ClasesAdmin controller");

		$scope.clases = [];

		ClasesService.clases().then(
			function(response){
			console.log(response)
			$scope.clases = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();