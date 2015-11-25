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

		//servicio para mostrar todos los clientes que se agenda en una clase
		function getAgendarClase(hora, dia){
			var deferred = $q.defer();
			
			$http.get(constants.webService + 'getAgendarClase/'+hora + "/" + dia)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function AgendarClase(clase){
			var deferred = $q.defer();
			var clase = angular.fromJson(clase);
			var dias = angular.fromJson(clase.dias)
			clase.dias = dias;
			$http.post(constants.webService + 'AgendarClase', clase)
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
			AgendarClase: AgendarClase,
			getAgendarClase: getAgendarClase,
			setClases: setClases,
			deleteClases: deleteClases
		};

	}

})();