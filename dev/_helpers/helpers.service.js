(function(){
	angular.module('gymApp.Helpers')
	.service('HelpersService', HelpersService);

	HelpersService.$inject = ['$http','$q', 'constant'];

	function HelpersService($http, $q, constants){

		function upload(file){
			var deferred = $q.defer();

			var fd = new FormData();
			fd.append('file', file);

			$http
				.post(constants.webService + 'upload', fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				})
				.success(function(res) {
					//console.log(res);
					deferred.resolve(res);
				})
				.catch(function(res) {
					//console.log(res);
					deferred.reject(res);
				});

			return deferred.promise;
		}


		return {
			upload: upload
		}
	}

})();