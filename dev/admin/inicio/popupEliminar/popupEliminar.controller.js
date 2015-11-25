(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteBannerAdminController', DeleteBannerAdminController);

	DeleteBannerAdminController.$inject = ["$compile", "$state","$scope","InicioServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteBannerAdminController($compile, $state, $scope, InicioServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;
		
		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');

		$scope.bannerDuplicado = angular.copy($scope.delBanner);
			
			$scope.eliminarBanner=function(){
				InicioServiceAdmin
					.deleteBanner($scope.bannerDuplicado)
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
