(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('InstructoresController', InstructoresController);

	InstructoresController.$inject = ["$state","$scope","InstructoresService"];

	function InstructoresController($state, $scope, InstructoresService){
		console.log("Instructores controller");
		
		$scope.instructores = [];

		InstructoresService.instructores().then(
			function(response){
			console.log(response)
			$scope.instructores = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();