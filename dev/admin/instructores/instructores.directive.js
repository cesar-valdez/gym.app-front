(function(){
	angular.module('gymApp.Admin')
	.directive('instructoresAgregar', instructoresAgregar)	
	.directive('instructoresModificar', instructoresModificar)
	.directive('instructoresEliminar', instructoresEliminar)
	.directive('instructoresVer', instructoresVer)

	function instructoresAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/instructores/popupAgregar/popupAgregar.html',
			controller: "AddInstructoresAdminController"
		}
	}

	function instructoresModificar(){
		return{
			restrict:'E',
			scope:{
				editInstructor : '='
			},
			templateUrl: './admin/instructores/popupModificar/popupModificar.html',
			controller: 'SetInstructoresAdminController'
		}
	}

	function instructoresVer(){
		return{
			restrict:'E',
			templateUrl: './admin/instructores/popupVer/popupVer.html'
		}
	}

	function instructoresEliminar(){
		return{
			restrict:'E',
			scope:{
				delInstructor : '=',
				instructores : '='
			},
			templateUrl: './admin/instructores/popupEliminar/popupEliminar.html',
			controller: 'DeleteInstructoresAdminController',
		}
	}



})();