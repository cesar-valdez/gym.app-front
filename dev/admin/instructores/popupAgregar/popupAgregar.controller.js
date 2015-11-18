(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('AddInstructoresAdminController', AddInstructoresAdminController);

	AddInstructoresAdminController.$inject = ["$state","$scope","InstructoresServiceAdmin" , "HelpersFactory", "constant"];

	function AddInstructoresAdminController($state, $scope, InstructoresServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		$scope.instructor={};
		//imagen por default
		$scope.instructor.imgInstructor=constants.imgDefault;

		$scope.addInstructor=function(){
			InstructoresServiceAdmin
				.addInstructores($scope.instructor)
				.then(function(response){
					console.log("response")
					console.log(response)
					//agregar uno mas al areglo y pueda utilizar el get
					$scope.instructores.push(response);
					//cerrar popup
					helper.popupClose();
				})
				.catch(function(err){
						console.log(err)
				});
		}
	}

})();