(function(){
	angular.module('gymApp.Usuario')

	.service('InicioService', InicioService)

	InicioService.$inject=['$q','$http','constant'];

	function InicioService($q,$http, constants){

		function getBanner(){
			var deferred = $q.defer();
			
			$http.get(constants.webService + 'getBanner')
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
			getBanner: getBanner
		};

	}

})();