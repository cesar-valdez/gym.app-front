(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('InstructoresController', InstructoresController);

	InstructoresController.$inject = ["$state","$scope","InstructoresServiceAdmin"];

	function InstructoresController($state, $scope, InstructoresServiceAdmin){
		console.log("Instructores controller");
		
		$scope.instructores = [];
		//getInstructor
		InstructoresServiceAdmin.getInstructores().then(
			function(response){
			console.log(response)
			$scope.instructores = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();