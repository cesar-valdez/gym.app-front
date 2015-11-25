(function(){
	angular.module('gymApp.Login')

	.service('LoginService', LoginService)

	LoginService.$inject=['$q','$http','constant'];

	function LoginService($q,$http, constants){

		function login(usuario){
			var deferred = $q.defer();
			var usuario = angular.fromJson(usuario);
			
			$http.post(constants.webService + 'login', usuario)
			.success(function(response){
				
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function addUsuario(usuario){
			var deferred = $q.defer();
			var usuario = angular.fromJson(usuario);
			
			$http.post(constants.webService + 'clientes', usuario)
			.success(function(response){
				
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function addCliente(cliente){
			var deferred = $q.defer();
			var cliente = angular.fromJson(cliente);
			
			$http.post(constants.webService + 'login', cliente)
			.success(function(response){
				
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}




		//return de los metodos
		return{
			login: login,
			addUsuario: addUsuario,
			addCliente: addCliente
		};


	}

})();