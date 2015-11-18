/*(function(){
	angular.module('gymApp.Usuario')

	.service('ClientesService', ClientesService)

	ClientesService.$inject=['$q','$http','constant'];

	function ClientesService($q,$http, constants){

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





		//return de los metodos
		return{
			getClientes: getClientes
		};

	}

})();*/