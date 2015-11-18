(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteRetosAdminController', DeleteRetosAdminController);

	DeleteRetosAdminController.$inject = ["$state","$scope","RetosServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteRetosAdminController($state, $scope, RetosServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		$scope.retoDuplicado = angular.copy($scope.delReto);
			$scope.deleteReto=function(){
				RetosServiceAdmin
					.deleteRetos($scope.retoDuplicado)
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
