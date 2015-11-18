(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('RetosAdminController', RetosAdminController);

	RetosAdminController.$inject = ["$state","$scope","RetosServiceAdmin", "HelpersFactory", "constant"];

	function RetosAdminController($state, $scope, RetosServiceAdmin, HelpersFactory, constants){
		console.log("RetosAdmin controller");

		$scope.retos = [];
		var helper=HelpersFactory;

		//getRetos
		RetosServiceAdmin
			.getRetos()
			.then(function(response){
				console.log(response)
				$scope.retos = response;

				for(var i=0; i<response.length; i++){
					$scope.retos[i].fechaInicio = new Date($scope.retos[i].fechaInicio);
				}

		}).catch(function(err){
			console.log(err)
		});
	}

})();