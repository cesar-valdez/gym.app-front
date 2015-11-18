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




		//return de los metodos
		return{
			getPagos: getPagos,
			pagoExistente: pagoExistente,
			addPago: addPago
		};

	}

})();