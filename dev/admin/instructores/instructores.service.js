(function(){
	angular.module('gymApp.Admin')

	.service('InstructoresService', InstructoresService)

	InstructoresService.$inject=['$q','$http','constant'];

	function InstructoresService($q,$http, constants){

		function instructores(){
			var deferred = $q.defer();
			
			$http.get(constants.webService + 'getInstructores')
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
			instructores: instructores
		};

	}

})();