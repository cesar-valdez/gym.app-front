(function(){
	angular.module('gymApp.Usuario')
	.directive('claseAgendar', claseAgendar)
	function claseAgendar(){
		return{
			restrict:'E',
			templateUrl: './usuario/clases/popupAgendar/popupAgendar.html'
		}
	}

})();