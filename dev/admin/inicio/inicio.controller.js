(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('InicioAdminController', InicioAdminController);

	InicioAdminController.$inject = ["$state","$scope","InicioService"];

	function InicioAdminController($state, $scope, InicioService){
		console.log("InicioAdmin controller");

		$scope.banners = [];

		//getBanner
		InicioService.getBanner().then(
			function(response){
			console.log(response)
			$scope.banners = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();