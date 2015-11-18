(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetRetosAdminController', SetRetosAdminController);

	SetRetosAdminController.$inject = ["$state","$scope","RetosServiceAdmin" , "HelpersFactory", "constant"];

	function SetRetosAdminController($state, $scope, RetosServiceAdmin, HelpersFactory, constants){

		$scope.retoDuplicado = angular.copy($scope.editReto);
		var helper=HelpersFactory;
		
			$scope.EditarReto=function(){
				RetosServiceAdmin
					.setRetos($scope.retoDuplicado)
					.then(function(response){
						$scope.editReto = response;
						//cerrar popup
						helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();