(function(){
	angular.module('gymApp.Admin')
	.directive('retosAgregar', retosAgregar)
	function retosAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/retos/popupAgregar/popupAgregar.html'
		}
	}

})();