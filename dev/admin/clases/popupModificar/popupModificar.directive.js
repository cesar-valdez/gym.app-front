(function(){
	angular.module('gymApp.Admin')
	.directive('clasesModificar', clasesModificar)
	function clasesModificar(){
		return{
			restrict:'E',
			templateUrl: './admin/clases/popupModificar/popupModificar.html'
		}
	}

})();