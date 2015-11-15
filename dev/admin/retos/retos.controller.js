(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('RetosAdminController', RetosAdminController);

	RetosAdminController.$inject = ["$state","$scope","RetosService"];

	function RetosAdminController($state, $scope, RetosService){
		console.log("RetosAdmin controller");

		$scope.retos = [];

		//getRetos
		RetosService.getRetos().then(
			function(response){
			console.log(response)
			$scope.retos = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();