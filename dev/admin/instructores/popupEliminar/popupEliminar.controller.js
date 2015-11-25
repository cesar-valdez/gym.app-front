(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteInstructoresAdminController', DeleteInstructoresAdminController);

	DeleteInstructoresAdminController.$inject = ["$state","$scope", "$compile","InstructoresServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteInstructoresAdminController($state, $scope, $compile, InstructoresServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;
		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');


		$scope.instructorDuplicado = angular.copy($scope.delInstructor);
			$scope.deleteInstructor=function(){
				InstructoresServiceAdmin
					.deleteInstructores($scope.instructorDuplicado)
					.then(function(response){
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
						//$state.reload();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();
