(function(){
	angular.module('gymApp.Admin')
	.directive('perfilesEliminar', perfilesEliminar)
	.directive('perfilesVer', perfilesVer)

	function perfilesEliminar(){
		return{
			restrict:'E',
			scope:{
				delCliente : '='
			},
			templateUrl: './admin/perfiles/popupEliminar/popupEliminar.html',
			controller: 'DeleteClientesAdminController'
		}
	}

	function perfilesVer(){
		return{
			restrict:'E',
			templateUrl: './admin/perfiles/popupVer/popupVer.html'
		}
	}


})();