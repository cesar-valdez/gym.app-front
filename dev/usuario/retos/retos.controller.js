(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Retos')
	.controller('RetosController', RetosController);

	RetosController.$inject = ["$state","$scope","RetosServiceAdmin"];

	function RetosController($state, $scope, RetosServiceAdmin){
		console.log("Retos Controller");
		$scope.retos = [];

		//gerREtos
		RetosServiceAdmin.getRetos().then(
			function(response){
			console.log(response)
			$scope.retos = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();
