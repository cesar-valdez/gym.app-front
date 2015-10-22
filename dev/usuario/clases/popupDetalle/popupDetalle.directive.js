(function(){
	angular.module('gymApp.Usuario')
	.directive('claseDetalle', claseDetalle)
	function claseDetalle(){
		return{
			restrict:'E',
			templateUrl: './usuario/clases/popupDetalle/popupDetalle.html'
		}
	}

})();
