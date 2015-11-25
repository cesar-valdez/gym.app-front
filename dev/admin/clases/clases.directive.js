(function(){
	angular.module('gymApp.Admin')
	.directive('clasesAgregar', clasesAgregar)
	.directive('clasesModificar', clasesModificar)
	.directive('clasesEliminar', clasesEliminar)
	.directive('clasesVer', clasesVer)
	.directive('clasesLista', clasesLista)

	function clasesAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/clases/popupAgregar/popupAgregar.html',
			controller: 'ClasesAgregarAdminController'
		}
	}

	function clasesModificar(){
		return{
			restrict:'E',
			scope:{
				editClase : '='
			},
			templateUrl: './admin/clases/popupModificar/popupModificar.html',
			controller: 'ClasesModificarAdminController'
		}
	}

	function clasesEliminar(){
		return{
			restrict:'E',
			scope:{
				delClase : '='
			},
			templateUrl: './admin/clases/popupEliminar/popupEliminar.html',
			controller: 'DeleteClasesAdminController'
		}
	}

	function clasesVer(){
		return{
			restrict:'E',
			templateUrl: './admin/clases/popupVer/popupVer.html'
		}
	}

	function clasesLista(){
		return{
			restrict:'E',
			scope:{
				clase : '='
			},
			templateUrl: './admin/clases/popupLista/popupLista.html',
			controller: 'ClasesListaAdminController'
		}
	}


})();