(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteInstructoresAdminController', DeleteInstructoresAdminController);

	DeleteInstructoresAdminController.$inject = ["$state","$scope","InstructoresService" , "HelpersFactory", "constant"];

	function DeleteInstructoresAdminController($state, $scope, InstructoresService, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		$scope.instructorDuplicado = angular.copy($scope.delInstructor);
			$scope.deleteInstructor=function(){
				InstructoresService
					.deleteInstructores($scope.instructorDuplicado)
					.then(function(response){
						//cerrar popup
						helper.popupClose();
						$state.reload();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();
