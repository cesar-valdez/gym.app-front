(function(){
	angular.module('gymApp.Admin')

	.service('ClientesServiceAdmin', ClientesServiceAdmin)

	ClientesServiceAdmin.$inject=['$q','$http','constant'];

	function ClientesServiceAdmin($q,$http, constants){

		//getClientes para mostarlos en el admin
		function getClientes(){
			var deferred = $q.defer();
			
			$http.get(constants.webService + 'getClientes')
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		//getCliente para mostrar al usuario
		function getCliente(noRegistro){
			var deferred = $q.defer();
			
			$http.get(constants.webService + 'getCliente/'+noRegistro)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}


		function setClientes(cliente){
			var deferred = $q.defer();
			var cliente = angular.fromJson(cliente);
			$http.put(constants.webService + 'putClientes', cliente)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function deleteClientes(cliente){
			var deferred = $q.defer();
			var cliente = angular.fromJson(cliente);
			$http.delete(constants.webService + 'deleteClientes', {data: cliente})
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function deleteUsuarios(usuario){
			var deferred = $q.defer();
			var usuario = angular.fromJson(usuario);
			$http.delete(constants.webService + 'deleteUsuarios', {data: usuario})
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}


		/* addRetos(reto){
			var deferred = $q.defer();
			var reto = angular.fromJson(reto);
			$http.post(constants.webService + 'addRetos', reto)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}
		}*/



		//return de los metodos
		return{
			getClientes: getClientes,
			getCliente: getCliente,
			setClientes: setClientes,
			deleteClientes: deleteClientes,
			deleteUsuarios: deleteUsuarios
		};

	}

})();