(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('InicioAdminController', InicioAdminController);

	InicioAdminController.$inject = ["$state","$scope","InicioServiceAdmin", "HelpersFactory", "constant"];

	function InicioAdminController($state, $scope, InicioServiceAdmin, HelpersFactory, constants){
		console.log("InicioAdmin controller");

		$scope.banners = [];
		var helper=HelpersFactory;


		//getBanner
		InicioServiceAdmin
			.getBanner()
			.then(function(response){
				console.log(response)
				$scope.banners = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();