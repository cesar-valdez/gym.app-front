(function(){
	angular.module('gymApp.Admin')

	.service('ClasesService', ClasesService)

	ClasesService.$inject=['$q','$http','constant'];

	function ClasesService($q,$http, constants){

		function getClases(){
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

		function addClases(clase){
			var deferred = $q.defer();
			var clase = angular.fromJson(clase);
			var dias = angular.fromJson(clase.dias)
			clase.dias = dias;
			$http.post(constants.webService + 'addClases', clase)
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
			getClases: getClases,
			addClases: addClases
		};

	}

})();