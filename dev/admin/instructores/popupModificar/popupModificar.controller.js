(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetInstructoresAdminController', SetInstructoresAdminController);

	SetInstructoresAdminController.$inject = ["$compile", "$state","$scope","InstructoresServiceAdmin" , "HelpersFactory", "constant"];

	function SetInstructoresAdminController($compile, $state, $scope, InstructoresServiceAdmin, HelpersFactory, constants){
		$scope.instructorDuplicado = angular.copy($scope.editInstructor);
		
		var helper=HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');

		
			$scope.EditarInstructor=function(){
				InstructoresServiceAdmin
					.setInstructores($scope.instructorDuplicado)
					.then(function(response){
						$scope.editInstructor = response;
						
						//validacion con mensaje error y ok
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						//cerrar popup
						//helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();