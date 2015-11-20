(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteClasesAdminController', DeleteClasesAdminController);

	DeleteClasesAdminController.$inject = ["$state","$scope","ClasesServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteClasesAdminController($state, $scope, ClasesServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		$scope.claseDuplicado = angular.copy($scope.delClase);
		
			$scope.deleteClase=function(){
				ClasesServiceAdmin
					.deleteClases($scope.claseDuplicado)
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
