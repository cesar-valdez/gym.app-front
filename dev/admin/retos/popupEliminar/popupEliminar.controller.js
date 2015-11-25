(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteRetosAdminController', DeleteRetosAdminController);

	DeleteRetosAdminController.$inject = ["$compile", "$state","$scope","RetosServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteRetosAdminController($compile, $state, $scope, RetosServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');

		$scope.retoDuplicado = angular.copy($scope.delReto);
			$scope.deleteReto=function(){
				RetosServiceAdmin
					.deleteRetos($scope.retoDuplicado)
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
						
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();
