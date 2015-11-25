(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetBannerAdminController', SetBannerAdminController);

	SetBannerAdminController.$inject = ["$compile", "$state","$scope","InicioServiceAdmin" , "HelpersFactory", "constant"];

	function SetBannerAdminController($compile, $state, $scope, InicioServiceAdmin, HelpersFactory, constants){
		$scope.bannerDuplicado = angular.copy($scope.editBanner);
		
		var helper=HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');
		
			$scope.EditarBanner=function(){
				InicioServiceAdmin
					.setBanner($scope.bannerDuplicado)
					.then(function(response){
						$scope.editBanner = response;
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
						//helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();