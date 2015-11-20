(function(){
	angular.module('gymApp.Usuario')
	.directive('perfilModificar', perfilModificar)
	

	function perfilModificar(){
		return{
			restrict:'E',
			scope: {
				usuario: "="
			},
			templateUrl: './usuario/perfil/popupModificar/popupModificar.html',
			controller: 'ModificarPerfilController'
		}
	}

})();