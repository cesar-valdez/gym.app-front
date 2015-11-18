(function(){
	angular.module('gymApp.Admin')

	.service('InicioServiceAdmin', InicioServiceAdmin)

	InicioServiceAdmin.$inject=['$q','$http','constant'];

	function InicioServiceAdmin($q,$http, constants){

		function getBanner(){
			var deferred = $q.defer();
			
			$http.get(constants.webService + 'getBanner')
			.success(function(response){
				deferred.resolve(response)
				console.log('mirar')
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

	function addBanner(banner){
		var deferred = $q.defer();
		var banner = angular.fromJson(banner);
		$http.post(constants.webService + 'addBanner', banner)
		.success(function(response){
			deferred.resolve(response)
		})
		.catch(function(err){
			deferred.reject(err)
		});
		return deferred.promise;
	}

	function setBanner(banner){
			var deferred = $q.defer();
			var banner = angular.fromJson(banner);
			$http.put(constants.webService + 'putBanner', banner)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}


	function deleteBanner(banner){
			var deferred = $q.defer();
			var banner = angular.fromJson(banner);
			$http.delete(constants.webService + 'deleteBanner', {data: banner})
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
			getBanner: getBanner,
			addBanner: addBanner,
			setBanner: setBanner,
			deleteBanner: deleteBanner
		};

	}

})();