(function(){
	angular.module('gymApp.Admin')
	.directive('instructoresEliminar', instructoresEliminar)
	function instructoresEliminar(){
		return{
			restrict:'E',
			templateUrl: './admin/instructores/popupEliminar/popupEliminar.html'
		}
	}

})();