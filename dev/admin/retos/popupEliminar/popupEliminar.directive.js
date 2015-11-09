(function(){
	angular.module('gymApp.Admin')
	.directive('retosEliminar', retosEliminar)
	function retosEliminar(){
		return{
			restrict:'E',
			templateUrl: './admin/retos/popupEliminar/popupEliminar.html'
		}
	}

})();