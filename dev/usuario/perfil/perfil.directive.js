(function(){
	angular.module('gymApp.Usuario')
	.directive('perfilModificar', perfilModificar)
	

	function perfilModificar(){
		return{
			restrict:'E',
			templateUrl: './usuario/perfil/popupModificar/popupModificar.html'
		}
	}

})();