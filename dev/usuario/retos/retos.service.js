(function(){
	angular.module('gymApp.Retos')

	.service('RetosService', RetosService)

	RetosService.$inject=['$q','$http','constant'];

	function RetosService($q,$http, constants){

		console.log("carga")
		
		function getRetos(){
			console.log("ii")
			var deferred = $q.defer();
			
			$http.get(constants.webService + 'getRetos')
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function addRetos(reto){
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





		//return de los metodos
		return{
			getRetos: getRetos,
			addRetos: addRetos
		};

	}

})();