(function(){
	angular.module('gymApp.Admin')

	.service('PagosServiceAdmin', PagosServiceAdmin)

	PagosServiceAdmin.$inject=['$q','$http','constant'];

	function PagosServiceAdmin($q,$http, constants){

		function getPagos(){
			var deferred = $q.defer();
			
			$http.get(constants.webService + 'getPagos')
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		//getPago para mostrar al usuario
		function getPago(noRegistro){
			var deferred = $q.defer();
			
			$http.get(constants.webService + 'getPago/'+noRegistro)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}


		//para comprobar si la fecha de pago que se insertara es por primera vez
		function pagoExistente(clienteId){
			var deferred = $q.defer();
			
			$http.post(constants.webService + 'pagoExistente',clienteId)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function addPago(pago){
			var deferred = $q.defer();
			
			$http.post(constants.webService + 'addPagos',pago)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function setPagos(pago){
			var deferred = $q.defer();
			var pago = angular.fromJson(pago);
			$http.put(constants.webService + 'putPagos', pago)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function deletePagos(pago){
			var deferred = $q.defer();
			var pago = angular.fromJson(pago);
			$http.delete(constants.webService + 'deletePagos', {data: pago})
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
			getPagos: getPagos,
			getPago: getPago,
			pagoExistente: pagoExistente,
			addPago: addPago,
			setPagos: setPagos,
			deletePagos: deletePagos
		};

	}

})();