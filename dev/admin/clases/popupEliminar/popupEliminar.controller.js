(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteClasesAdminController', DeleteClasesAdminController);

	DeleteClasesAdminController.$inject = ["$compile", "$state","$scope","ClasesServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteClasesAdminController($compile, $state, $scope, ClasesServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;


		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');

		$scope.claseDuplicado = angular.copy($scope.delClase);
		
			$scope.deleteClase=function(){
				ClasesServiceAdmin
					.deleteClases($scope.claseDuplicado)
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
						//helper.popupClose();
						//$state.reload();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();
