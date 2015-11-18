(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteBannerAdminController', DeleteBannerAdminController);

	DeleteBannerAdminController.$inject = ["$state","$scope","InicioServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteBannerAdminController($state, $scope, InicioServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		$scope.bannerDuplicado = angular.copy($scope.delBanner);
			
			$scope.eliminarBanner=function(){
				InicioServiceAdmin
					.deleteBanner($scope.bannerDuplicado)
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
