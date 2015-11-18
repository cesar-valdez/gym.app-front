(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetInstructoresAdminController', SetInstructoresAdminController);

	SetInstructoresAdminController.$inject = ["$state","$scope","InstructoresServiceAdmin" , "HelpersFactory", "constant"];

	function SetInstructoresAdminController($state, $scope, InstructoresServiceAdmin, HelpersFactory, constants){
		$scope.instructorDuplicado = angular.copy($scope.editInstructor);
		
		var helper=HelpersFactory;
		
			$scope.EditarInstructor=function(){
				InstructoresServiceAdmin
					.setInstructores($scope.instructorDuplicado)
					.then(function(response){
						$scope.editInstructor = response;
						//cerrar popup
						helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();