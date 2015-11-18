(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetBannerAdminController', SetBannerAdminController);

	SetBannerAdminController.$inject = ["$state","$scope","InicioServiceAdmin" , "HelpersFactory", "constant"];

	function SetBannerAdminController($state, $scope, InicioServiceAdmin, HelpersFactory, constants){
		$scope.bannerDuplicado = angular.copy($scope.editBanner);
		
		var helper=HelpersFactory;
		
			$scope.EditarBanner=function(){
				InicioServiceAdmin
					.setBanner($scope.bannerDuplicado)
					.then(function(response){
						$scope.editBanner = response;
						//cerrar popup
						helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();