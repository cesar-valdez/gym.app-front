(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Retos')
	.controller('RetosController', RetosController);

	RetosController.$inject = ["$state","$scope","RetosService"];

	function RetosController($state, $scope, RetosService){
		console.log("Retos Controller");
		$scope.retos = [];

		//gerREtos
		RetosService.getRetos().then(
			function(response){
			console.log(response)
			$scope.retos = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();
