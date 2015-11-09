(function(){
	angular.module('gymApp.Admin')
	.directive('clasesEliminar', clasesEliminar)
	function clasesEliminar(){
		return{
			restrict:'E',
			templateUrl: './admin/clases/popupEliminar/popupEliminar.html'
		}
	}

})();