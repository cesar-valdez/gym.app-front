(function(){
	angular
		.module('gymApp.Usuario')
		.factory('UsuarioFactory', UsuarioFactory);

		UsuarioFactory.$inject = ['$sessionStorage'];

		function UsuarioFactory($sessionStorage){
			var Usuario = {};

			Usuario.getInfo = function(){
				return $sessionStorage.get('Usuario') || undefined;
			}
			Usuario.setInfo = function(usuario){
				$sessionStorage.put('Usuario', usuario);
			}
			Usuario.logout = function(){
				$sessionStorage.empty();
			}
			return Usuario;
		}

})();