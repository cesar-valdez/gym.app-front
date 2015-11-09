(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('InstructoresAdminController', InstructoresAdminController);

	InstructoresAdminController.$inject = ["$state","$scope","InstructoresService"];

	function InstructoresAdminController($state, $scope, InstructoresService){
		console.log("InstructoresAdmin controller");
		
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