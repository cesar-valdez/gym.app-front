(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('BannerAgregarAdminController', BannerAgregarAdminController);

	BannerAgregarAdminController.$inject = ["$compile","$state","$scope","InicioServiceAdmin", "HelpersFactory", "constant"];

	function BannerAgregarAdminController($compile, $state, $scope, InicioServiceAdmin, HelpersFactory, constants){
		console.log("RetosAgregarAdmin controller");
		
		var helper = HelpersFactory;
		//validar con mensaje de ok
		var body = angular.element(document).find('body');


		//addBanner
		$scope.bannerAgregar={};
		//imagen por default
		$scope.bannerAgregar.imgBanner=constants.imgDefaultBanner;

		//AddBanner
		$scope.addBanner=function(){
			InicioServiceAdmin
				.addBanner($scope.bannerAgregar)
				.then(function(res){
					//validacion con mensaje de ok
					if(res.estatus == 'ok'){
						helper.popupClose();
						body.append($compile("<mensaje-ok ok='"+ res.msj +"'></mensaje-ok>")($scope));
						//$state.reload();
					} else {
						helper.popupClose();
						body.append($compile("<mensaje-error error='"+ res.msj +"'></mensaje-error>")($scope));
					}
					console.log(res);
					//agregar uno mas al areglo y pueda utilizar el get
					$scope.banners.push(res);
					//cerrar popup
					helper.popupClose();
				})
				.catch(function(err){
					console.log(err)
				});
		}


	}

})();