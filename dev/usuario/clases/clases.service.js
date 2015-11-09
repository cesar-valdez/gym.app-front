(function(){
	angular.module('gymApp.Usuario')

	.service('ClasesService', ClasesService)

	ClasesService.$inject=['$q','$http','constant'];

	function ClasesService($q,$http, constants){

		function clases(){
			var deferred = $q.defer();
			
			$http.get(constants.webService + 'getClases')
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
			clases: clases
		};

	}

})();