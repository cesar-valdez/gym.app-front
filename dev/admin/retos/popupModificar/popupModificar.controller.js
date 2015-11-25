(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetRetosAdminController', SetRetosAdminController);

	SetRetosAdminController.$inject = ["$compile", "$state","$scope","RetosServiceAdmin" , "HelpersFactory", "constant"];

	function SetRetosAdminController($compile, $state, $scope, RetosServiceAdmin, HelpersFactory, constants){

		$scope.retoDuplicado = angular.copy($scope.editReto);
		var helper=HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');
		
			$scope.EditarReto=function(){
				RetosServiceAdmin
					.setRetos($scope.retoDuplicado)
					.then(function(response){
						$scope.editReto = response;
						
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