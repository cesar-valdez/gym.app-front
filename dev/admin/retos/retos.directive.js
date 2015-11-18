(function(){
	angular.module('gymApp.Admin')
	.directive('retosAgregar', retosAgregar)
	.directive('retosModificar', retosModificar)
	.directive('retosEliminar', retosEliminar)
	.directive('retosVer', retosVer)

	function retosAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/retos/popupAgregar/popupAgregar.html',
			controller: 'RetosAgregarAdminController'
		}
	}

	function retosModificar(){
		return{
			restrict:'E',
			scope:{
				editReto : '='
			},
			templateUrl: './admin/retos/popupModificar/popupModificar.html',
			controller: 'SetRetosAdminController'
		}
	}

	function retosVer(){
		return{
			restrict:'E',
			templateUrl: './admin/retos/popupVer/popupVer.html'
		}
	}

	function retosEliminar(){
		return{
			restrict:'E',
			scope:{
				delReto : '='
			},
			templateUrl: './admin/retos/popupEliminar/popupEliminar.html',
			controller: 'DeleteRetosAdminController'
		}
	}



})();