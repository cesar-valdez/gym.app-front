(function(){
	angular.module('gymApp.Admin')

	.service('InstructoresService', InstructoresService)

	InstructoresService.$inject=['$q','$http','constant'];

	function InstructoresService($q,$http, constants){

		function getInstructores(){
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

		function addInstructores(instructor){
			var deferred = $q.defer();
			var instructor = angular.fromJson(instructor);
			$http.post(constants.webService + 'addInstructores', instructor)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function setInstructores(instructor){
			var deferred = $q.defer();
			var instructor = angular.fromJson(instructor);
			$http.put(constants.webService + 'putInstructores', instructor)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function deleteInstructores(instructor){
			console.log("instructor")
			console.log(instructor)
			var deferred = $q.defer();
			var instructor = angular.fromJson(instructor);
			$http.delete(constants.webService + 'deleteInstructores', {data: instructor})
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		/*function deleteInstructores(instructor){
			var deferred = $q.defer();
			$http.delete(constants.webService + 'deleteInstructores/' + instructor)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}*/

		//return de los metodos
		return{
			getInstructores: getInstructores,
			addInstructores: addInstructores,
			setInstructores: setInstructores,
			deleteInstructores: deleteInstructores
		};

	}

})();