(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('BannerAgregarAdminController', BannerAgregarAdminController);

	BannerAgregarAdminController.$inject = ["$state","$scope","InicioServiceAdmin", "HelpersFactory", "constant"];

	function BannerAgregarAdminController($state, $scope, InicioServiceAdmin, HelpersFactory, constants){
		console.log("RetosAgregarAdmin controller");
		
		var helper = HelpersFactory;

		//addBanner
		$scope.bannerAgregar={};
		//imagen por default
		$scope.bannerAgregar.imgBanner=constants.imgDefaultBanner;

		//AddBanner
		$scope.addBanner=function(){
			InicioServiceAdmin
				.addBanner($scope.bannerAgregar)
				.then(function(res){
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