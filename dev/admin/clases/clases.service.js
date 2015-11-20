(function(){
	angular.module('gymApp.Admin')

	.service('ClasesServiceAdmin', ClasesServiceAdmin)

	ClasesServiceAdmin.$inject=['$q','$http','constant'];

	function ClasesServiceAdmin($q,$http, constants){

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
			}) ;
			return deferred.promise;
		}



		function setClases(clase){
			var deferred = $q.defer();
			var clase = angular.fromJson(clase);

			$http.put(constants.webService + 'putClases', clase)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function deleteClases(clase){
			var deferred = $q.defer();
			var clase = angular.fromJson(clase);
			$http.delete(constants.webService + 'deleteClases', {data: clase})
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
			addClases: addClases,
			setClases: setClases,
			deleteClases: deleteClases
		};

	}

})();