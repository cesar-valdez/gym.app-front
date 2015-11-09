(function(){
	angular.module('gymApp.Admin')
	.directive('retosModificar', retosModificar)
	function retosModificar(){
		return{
			restrict:'E',
			templateUrl: './admin/retos/popupModificar/popupModificar.html'
		}
	}

})();