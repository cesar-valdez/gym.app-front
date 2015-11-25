(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('AddInstructoresAdminController', AddInstructoresAdminController);

	AddInstructoresAdminController.$inject = ["$compile", "$state","$scope","InstructoresServiceAdmin" , "HelpersFactory", "constant"];

	function AddInstructoresAdminController($compile, $state, $scope, InstructoresServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');

		$scope.instructor={};
		//imagen por default
		$scope.instructor.imgInstructor=constants.imgDefault;

		$scope.addInstructor=function(){
			InstructoresServiceAdmin
				.addInstructores($scope.instructor)
				.then(function(response){
					if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
					//agregar uno mas al areglo y pueda utilizar el get
					$scope.instructores.push(response);
					//cerrar popup
					//helper.popupClose();
				})
				.catch(function(err){
						console.log(err)
				});
		}
	}

})();