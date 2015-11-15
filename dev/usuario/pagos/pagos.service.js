(function(){
	angular.module('gymApp.Usuario')

	.service('PagosService', PagosService)

	PagosService.$inject=['$q','$http','constant'];

	function PagosService($q,$http, constants){

		function getPagos(){
			var deferred = $q.defer();
			
			$http.get(constants.webService + 'getPagos')
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
			getPagos: getPagos
		};

	}

})();