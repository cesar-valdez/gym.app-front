(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetInstructoresAdminController', SetInstructoresAdminController);

	SetInstructoresAdminController.$inject = ["$state","$scope","InstructoresService" , "HelpersFactory", "constant"];

	function SetInstructoresAdminController($state, $scope, InstructoresService, HelpersFactory, constants){
		$scope.instructorDuplicado = angular.copy($scope.editInstructor);
		var helper=HelpersFactory;
			$scope.EditarInstructor=function(){
				InstructoresService
					.setInstructores($scope.instructorDuplicado)
					.then(function(response){
						$scope.editInstructor = response;
						//agregar uno mas al areglo y pueda utilizar el get
						//cerrar popup
						helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();