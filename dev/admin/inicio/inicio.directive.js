(function(){
	angular.module('gymApp.Admin')
	.directive('inicioAgregar', inicioAgregar)
	.directive('inicioEditar', inicioEditar)
	.directive('inicioEliminar', inicioEliminar)

	function inicioAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/inicio/popupAgregar/popupAgregar.html',
			controller: 'BannerAgregarAdminController'
		}
	}

	function inicioEditar(){
		return{
			restrict:'E',
			scope:{
				editBanner : '='
			},
			templateUrl: './admin/inicio/popupEditar/popupEditar.html',
			controller: 'SetBannerAdminController'
		}
	}

	function inicioEliminar(){
		return{
			restrict:'E',
			scope:{
				delBanner : '='
			},
			templateUrl: './admin/inicio/popupEliminar/popupEliminar.html',
			controller: 'DeleteBannerAdminController'
		}
	}


})();