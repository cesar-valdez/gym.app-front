(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./helpers.module');
require('./helpers.service');
require('./helpers.directive');
require('./helpers.factory');


},{"./helpers.directive":2,"./helpers.factory":3,"./helpers.module":4,"./helpers.service":5}],2:[function(require,module,exports){
(function(){
	angular.module('gymApp.Helpers')
	.directive('popupAdd', popupAdd)
	.directive('popupClose', popupClose)
	.directive('fileUpload', fileUpload)
	
	popupAdd.$inject=['$compile']
	
	function popupAdd($compile){
		return {
			restrict:'A',
			link: function(scope, elem, attrs){
				var body = angular.element(document).find('body');

				elem.bind('click', function(){

					console.log(attrs.popupAdd);
					body.append($compile(attrs.popupAdd)(scope))
				})
			
				/*$('#login, .popupForm-cancel').click(function(e){
					if(e.target !=this) return;
					$('login').remove();
				});*/
			}
		}
	}

	popupClose.$inject = ['$state'];
	function popupClose($state){
		return {
			restrict:'A',
			link: function(scope, elem, attrs){

					//console.log(elem);
				elem.bind('click', function(e){
					//console.log('da click');
					//console.log(e.target);
					//
					//console.log( e.target != this)
					if(e.target != this && !angular.element(e.target).hasClass('popup-close')) return

					elem.remove();
					$state.reload();
				})
			}
		}
	}

	fileUpload.$inject = ['HelpersService'];

		function fileUpload(HelpersService){
			return {
				restrict: 'A',
				scope:{
					fileUpload:'='
				},
				link: function(scope, element, attrs) {
					element.bind('change', function(){
						var file = element[0].files[0];
						HelpersService
							.upload(file)
							.then(function(response){
								scope.fileUpload = response.url;
							})
							.catch(function(response){
								console.log(response);
							});
					});
				}
			}
		}


})();


},{}],3:[function(require,module,exports){
(function(){
	angular.module('gymApp.Helpers')
	.factory('HelpersFactory', HelpersFactory);

	HelpersFactory.$inject = []

	function HelpersFactory(){

		var helperFactory = {};

		helperFactory.popupClose = function () {
			var body = angular.element(document).find('body');
			body.removeClass('popup-on');
			var popup = angular.element(document.querySelectorAll("[popup-close]"));
			popup[0].remove();
		};

		helperFactory.dateYYYYMMDD = function(date){
			var date = new Date(date);
			var day = date.getDate();
			var month = date.getMonth() + 1;
			var year = date.getFullYear();

			if(day < 10){
				day = '0' + day;
			}
			if(month < 10){
				month = '0' + month;
			}

			date = year + '-' + month + '-' + day;

			return date;
		}

		helperFactory.stringToDate = function(date){
			var date = new Date(date);
			var day = date.getDate() + 1;
			var month = date.getMonth() + 1;
			var year = date.getFullYear();
			date = year + '-' + month + '-' + day;

			return new Date(date);
		}

		helperFactory.getDay = function(date){
			var date = new Date(date);
			return date.getDate() + 1;
		}
		helperFactory.getMonth = function(date){
			var date = new Date(date);
			return date.getMonth() + 1;
		}

		helperFactory.getYear = function(date){
			var date = new Date(date);
			return date.getFullYear();
		}
		
		helperFactory.getNameMonth = function(date){
			var date = new Date(date);
			var month = date.getMonth();

			var nameMonths = [
				'Enero',
				'Febrero',
				'Marzo',
				'Abril',
				'Mayo',
				'Junio',
				'Julio',
				'Agosto',
				'Septiembre',
				'Octubre',
				'Noviembre',
				'Diciembre'
			]

			return nameMonths[month];
		}

		return helperFactory;
	}

})();
},{}],4:[function(require,module,exports){
(function(){

	angular.module('gymApp.Helpers', []);

})();
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
require('./admin.module');
require('./inicio/_inicio');
require('./clases/_clases');
require('./retos/_retos');
require('./instructores/_instructores');
require('./pagos/_pagos');
require('./perfiles/_perfiles');
},{"./admin.module":7,"./clases/_clases":8,"./inicio/_inicio":17,"./instructores/_instructores":24,"./pagos/_pagos":31,"./perfiles/_perfiles":38,"./retos/_retos":43}],7:[function(require,module,exports){
(function(){

	angular.module('gymApp.Admin', []);

})();
},{}],8:[function(require,module,exports){
require('./clases.controller');
require('./clases.service');
require('./clases.directive');
require('./popupAgregar/popupAgregar.controller');
require('./popupModificar/popupModificar.controller');
require('./popupEliminar/popupEliminar.controller');
require('./popupLista/popupLista.controller');
require('./popupLista/popupEliminarAgendado/popupEliminarAgendado.controller');
},{"./clases.controller":9,"./clases.directive":10,"./clases.service":11,"./popupAgregar/popupAgregar.controller":12,"./popupEliminar/popupEliminar.controller":13,"./popupLista/popupEliminarAgendado/popupEliminarAgendado.controller":14,"./popupLista/popupLista.controller":15,"./popupModificar/popupModificar.controller":16}],9:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('ClasesAdminController', ClasesAdminController);

	ClasesAdminController.$inject = ["$state","$scope","ClasesServiceAdmin", "HelpersFactory", "constant"];

	function ClasesAdminController($state, $scope, ClasesServiceAdmin, HelpersFactory, constants){
		console.log("ClasesAdmin controller");

		$scope.clases = [];

		//getClases
		ClasesServiceAdmin
			.getClases()
			.then(function(response){
				console.log(response)
				$scope.clases = response;
		}).catch(function(err){
			console.log(err)
		});
		
	}

})();
},{}],10:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('clasesAgregar', clasesAgregar)
	.directive('clasesModificar', clasesModificar)
	.directive('clasesEliminar', clasesEliminar)
	.directive('clasesVer', clasesVer)
	.directive('clasesLista', clasesLista)
	.directive('clasesEliminarAgendado', clasesEliminarAgendado)

	function clasesAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/clases/popupAgregar/popupAgregar.html',
			controller: 'ClasesAgregarAdminController'
		}
	}

	function clasesModificar(){
		return{
			restrict:'E',
			scope:{
				editClase : '='
			},
			templateUrl: './admin/clases/popupModificar/popupModificar.html',
			controller: 'ClasesModificarAdminController'
		}
	}

	function clasesEliminar(){
		return{
			restrict:'E',
			scope:{
				delClase : '='
			},
			templateUrl: './admin/clases/popupEliminar/popupEliminar.html',
			controller: 'DeleteClasesAdminController'
		}
	}

	function clasesVer(){
		return{
			restrict:'E',
			templateUrl: './admin/clases/popupVer/popupVer.html'
		}
	}

	function clasesLista(){
		return{
			restrict:'E',
			scope:{
				clase : '='
			},
			templateUrl: './admin/clases/popupLista/popupLista.html',
			controller: 'ClasesListaAdminController'
		}
	}

	function clasesEliminarAgendado(){
		return{
			restrict:'E',
			scope:{
				delAgendado : '='
			},
			templateUrl: './admin/clases/popupLista/popupEliminarAgendado/popupEliminarAgendado.html',
			controller: 'DeleteClienteAgendadoController'
		}
	}


})();
},{}],11:[function(require,module,exports){
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

		//para el popup de agendar clientes
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

		function EliminarClienteAgendado(agendado){
			var deferred = $q.defer();
			var agendado = angular.fromJson(agendado);
			$http.delete(constants.webService + 'EliminarClienteAgendado', {data: agendado})
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
			EliminarClienteAgendado: EliminarClienteAgendado,
			setClases: setClases,
			deleteClases: deleteClases
		};

	}

})();
},{}],12:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('ClasesAgregarAdminController', ClasesAgregarAdminController);

	ClasesAgregarAdminController.$inject = ["$compile", "$state","$scope","ClasesServiceAdmin", "InstructoresServiceAdmin", "HelpersFactory", "constant"];

	function ClasesAgregarAdminController($compile, $state, $scope, ClasesServiceAdmin, InstructoresServiceAdmin, HelpersFactory, constants){

		//getinstructor, para mostrar todos los instructores en el campo 
		$scope.instructores = [];
		var helper = HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');

		InstructoresServiceAdmin
			.getInstructores()
			.then(function(response){
				$scope.instructores = response;

		}).catch(function(err){
			console.log(err)
		});


		//addClase
		$scope.clase={};
		//imagen por default
		$scope.clase.imgClase=constants.imgDefaultClase;

		//AddClase
		$scope.addClases=function(){
			$scope.clase.no_registro = "12";
			var d = ["Lunes", "Martes", "Miercoles", "Jueves","Viernes", "Sabado", "Domingo"];
			//var insertExitoso = false;
			var days =[];
			for(var i = 0; i <=7; i++){
				if($scope.clase.dias[i] == true){
					days.push(d[i]);
				}

			}
			$scope.clase.dias = days;
			ClasesServiceAdmin
				.addClases($scope.clase)
				.then(function(res){

					if(res.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ res.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ res.msj +"'></mensaje-error>")($scope));
						}

					var todoBien=true;

					var mensaje = "";
					for(i = 0; i < res.length; i++){
						if(res.estatus == 'error'){
							mensaje+= "Ya existe una clase para el día: " + res.dia + " y la hora: " + res.hora;
							mensaje+=" ------------ "
						}
					}
					//insertar clases
					for(var i=0; i < res.length; i++){
						if(res[i].estatus == "success"){
							var clasesInsertar = angular.copy($scope.clase)
							delete clasesInsertar.dias;
							clasesInsertar.dia = res[i].dia;
							$scope.clases.push(clasesInsertar);
						}
					}

						//helper.popupClose();
						//reload para que el popup no cierre pero los  campos queden en blanco
						//$state.reload();

					/*if(todoBien){
					}*/
				})
				.catch(function(err){
					console.log(err)
				});
		}


	}

})();
},{}],13:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteClasesAdminController', DeleteClasesAdminController);

	DeleteClasesAdminController.$inject = ["$compile", "$state","$scope","ClasesServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteClasesAdminController($compile, $state, $scope, ClasesServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;


		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');

		$scope.claseDuplicado = angular.copy($scope.delClase);
		
			$scope.deleteClase=function(){
				ClasesServiceAdmin
					.deleteClases($scope.claseDuplicado)
					.then(function(response){

						//validacion con mensaje error y ok
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						//cerrar popup
						//helper.popupClose();
						//$state.reload();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();

},{}],14:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteClienteAgendadoController', DeleteClienteAgendadoController);

	DeleteClienteAgendadoController.$inject = ["$compile", "$state","$scope","ClasesServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteClienteAgendadoController($compile, $state, $scope, ClasesServiceAdmin, HelpersFactory, constants){
		

		var helper=HelpersFactory;
		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');


		$scope.agendadoDuplicado = angular.copy($scope.delAgendado);
			
			$scope.eliminarAgendado=function(){
				var cliente ={};
				cliente.no_registro = $scope.agendadoDuplicado.ClientesRegistro;
				cliente.horaAg = $scope.agendadoDuplicado.agendarclaseHora;
				cliente.diaAg = $scope.agendadoDuplicado.agendarclaseDia;

				ClasesServiceAdmin
					.EliminarClienteAgendado(cliente)
					.then(function(response){
						//validacion con mensaje error y ok
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
					//cerrar popup
					helper.popupClose();
						//$state.reload();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();

},{}],15:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('ClasesListaAdminController', ClasesListaAdminController);

	ClasesListaAdminController.$inject = ["$state","$scope","ClasesServiceAdmin", "HelpersFactory", "constant"];

	function ClasesListaAdminController($state, $scope, ClasesServiceAdmin, HelpersFactory, constants){
		console.log("ClasesListaAdmin controller", $scope.clase);

		$scope.listas = [];

		//getLista de clientes de cada Clase
		ClasesServiceAdmin
			.getAgendarClase($scope.clase.hora, $scope.clase.dia)
			.then(function(response){
				console.log(response)
				$scope.listas = response;

		}).catch(function(err){
			console.log(err)
		});
		
	}

})();
},{}],16:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('ClasesModificarAdminController', ClasesModificarAdminController);

	ClasesModificarAdminController.$inject = ["$compile", "$state","$scope","ClasesServiceAdmin", "InstructoresServiceAdmin", "HelpersFactory", "constant"];

	function ClasesModificarAdminController($compile, $state, $scope, ClasesServiceAdmin, InstructoresServiceAdmin, HelpersFactory, constants){
		console.log("ClasesModificarAdmin controller");

		//getinstructor, para mostrar todos los instructores en el campo 
		$scope.instructores = [];
		var helper = HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');


		InstructoresServiceAdmin
			.getInstructores()
			.then(function(response){
				$scope.instructores = response;

		}).catch(function(err){
			console.log(err)
		});


		$scope.claseDuplicado = angular.copy($scope.editClase);
		$scope.claseDuplicado.newHora = $scope.editClase.hora;

		$scope.setClase=function(){
			console.log($scope.claseDuplicado)
				ClasesServiceAdmin
					.setClases($scope.claseDuplicado)
					.then(function(response){
						console.log(response)
						$scope.editClase.hora = response.newHora;
						$scope.editClase = response;

						//validacion con mensaje error y ok
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						//cerrar popup
						//helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
		



	}

})();
},{}],17:[function(require,module,exports){
require('./inicio.service');
require('./inicio.controller');
require('./inicio.directive');
require('./popupAgregar/popupAgregar.controller');
require('./popupEditar/popupEditar.controller');
require('./popupEliminar/popupEliminar.controller');
},{"./inicio.controller":18,"./inicio.directive":19,"./inicio.service":20,"./popupAgregar/popupAgregar.controller":21,"./popupEditar/popupEditar.controller":22,"./popupEliminar/popupEliminar.controller":23}],18:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('InicioAdminController', InicioAdminController);

	InicioAdminController.$inject = ["$state","$scope","InicioServiceAdmin", "HelpersFactory", "constant"];

	function InicioAdminController($state, $scope, InicioServiceAdmin, HelpersFactory, constants){
		console.log("InicioAdmin controller");

		$scope.banners = [];
		var helper=HelpersFactory;


		//getBanner
		InicioServiceAdmin
			.getBanner()
			.then(function(response){
				console.log(response)
				$scope.banners = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],19:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('inicioAgregar', inicioAgregar)
	.directive('inicioEditar', inicioEditar)
	.directive('inicioEliminar', inicioEliminar)

	function inicioAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/inicio/popupAgregar/popupAgregar.html',
			controller: 'BannerAgregarAdminController'
		}
	}

	function inicioEditar(){
		return{
			restrict:'E',
			scope:{
				editBanner : '='
			},
			templateUrl: './admin/inicio/popupEditar/popupEditar.html',
			controller: 'SetBannerAdminController'
		}
	}

	function inicioEliminar(){
		return{
			restrict:'E',
			scope:{
				delBanner : '='
			},
			templateUrl: './admin/inicio/popupEliminar/popupEliminar.html',
			controller: 'DeleteBannerAdminController'
		}
	}


})();
},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('BannerAgregarAdminController', BannerAgregarAdminController);

	BannerAgregarAdminController.$inject = ["$compile","$state","$scope","InicioServiceAdmin", "HelpersFactory", "constant"];

	function BannerAgregarAdminController($compile, $state, $scope, InicioServiceAdmin, HelpersFactory, constants){
		console.log("RetosAgregarAdmin controller");
		
		var helper = HelpersFactory;
		//validar con mensaje de ok
		var body = angular.element(document).find('body');


		//addBanner
		$scope.bannerAgregar={};
		//imagen por default
		$scope.bannerAgregar.imgBanner=constants.imgDefaultBanner;

		//AddBanner
		$scope.addBanner=function(){
			InicioServiceAdmin
				.addBanner($scope.bannerAgregar)
				.then(function(res){
					//validacion con mensaje de ok
					if(res.estatus == 'ok'){
						helper.popupClose();
						body.append($compile("<mensaje-ok ok='"+ res.msj +"'></mensaje-ok>")($scope));
						//$state.reload();
					} else {
						helper.popupClose();
						body.append($compile("<mensaje-error error='"+ res.msj +"'></mensaje-error>")($scope));
					}
					console.log(res);
					//agregar uno mas al areglo y pueda utilizar el get
					$scope.banners.push(res);
					//cerrar popup
					helper.popupClose();
				})
				.catch(function(err){
					console.log(err)
				});
		}


	}

})();
},{}],22:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetBannerAdminController', SetBannerAdminController);

	SetBannerAdminController.$inject = ["$compile", "$state","$scope","InicioServiceAdmin" , "HelpersFactory", "constant"];

	function SetBannerAdminController($compile, $state, $scope, InicioServiceAdmin, HelpersFactory, constants){
		$scope.bannerDuplicado = angular.copy($scope.editBanner);
		
		var helper=HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');
		
			$scope.EditarBanner=function(){
				InicioServiceAdmin
					.setBanner($scope.bannerDuplicado)
					.then(function(response){
						$scope.editBanner = response;
						//validacion con mensaje error y ok
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						//cerrar popup
						//helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();
},{}],23:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteBannerAdminController', DeleteBannerAdminController);

	DeleteBannerAdminController.$inject = ["$compile", "$state","$scope","InicioServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteBannerAdminController($compile, $state, $scope, InicioServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;
		
		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');

		$scope.bannerDuplicado = angular.copy($scope.delBanner);
			
			$scope.eliminarBanner=function(){
				InicioServiceAdmin
					.deleteBanner($scope.bannerDuplicado)
					.then(function(response){

						//validacion con mensaje error y ok
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						//cerrar popup
						helper.popupClose();
						$state.reload();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();

},{}],24:[function(require,module,exports){
require('./instructores.controller');
require('./instructores.service');
require('./instructores.directive');
require('./popupAgregar/popupAgregar.controller');
require('./popupModificar/popupModificar.controller');
require('./popupEliminar/popupEliminar.controller');


},{"./instructores.controller":25,"./instructores.directive":26,"./instructores.service":27,"./popupAgregar/popupAgregar.controller":28,"./popupEliminar/popupEliminar.controller":29,"./popupModificar/popupModificar.controller":30}],25:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('InstructoresAdminController', InstructoresAdminController);

	InstructoresAdminController.$inject = ["$state","$scope","InstructoresServiceAdmin" , "HelpersFactory", "constant"];
	function InstructoresAdminController($state, $scope, InstructoresServiceAdmin, HelpersFactory, constants){
		console.log("InstructoresAdmin controller");
		
		$scope.instructores = [];
		var helper=HelpersFactory;


		//getinstructor
		InstructoresServiceAdmin
			.getInstructores()
			.then(function(response){
				console.log(response)
				$scope.instructores = response;

		}).catch(function(err){
			console.log(err)
		});
		$scope.$watch('instructores', function(v){
			if(v){
				
				console.log(v);
				$scope.instructores = v;
			}
		})
	}

})();
},{}],26:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('instructoresAgregar', instructoresAgregar)	
	.directive('instructoresModificar', instructoresModificar)
	.directive('instructoresEliminar', instructoresEliminar)
	.directive('instructoresVer', instructoresVer)

	function instructoresAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/instructores/popupAgregar/popupAgregar.html',
			controller: "AddInstructoresAdminController"
		}
	}

	function instructoresModificar(){
		return{
			restrict:'E',
			scope:{
				editInstructor : '='
			},
			templateUrl: './admin/instructores/popupModificar/popupModificar.html',
			controller: 'SetInstructoresAdminController'
		}
	}

	function instructoresVer(){
		return{
			restrict:'E',
			templateUrl: './admin/instructores/popupVer/popupVer.html'
		}
	}

	function instructoresEliminar(){
		return{
			restrict:'E',
			scope:{
				delInstructor : '=',
				instructores : '='
			},
			templateUrl: './admin/instructores/popupEliminar/popupEliminar.html',
			controller: 'DeleteInstructoresAdminController',
		}
	}



})();
},{}],27:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')

	.service('InstructoresServiceAdmin', InstructoresServiceAdmin)

	InstructoresServiceAdmin.$inject=['$q','$http','constant'];

	function InstructoresServiceAdmin($q,$http, constants){

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
},{}],28:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('AddInstructoresAdminController', AddInstructoresAdminController);

	AddInstructoresAdminController.$inject = ["$compile", "$state","$scope","InstructoresServiceAdmin" , "HelpersFactory", "constant"];

	function AddInstructoresAdminController($compile, $state, $scope, InstructoresServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');

		$scope.instructor={};
		//imagen por default
		$scope.instructor.imgInstructor=constants.imgDefault;

		$scope.addInstructor=function(){
			InstructoresServiceAdmin
				.addInstructores($scope.instructor)
				.then(function(response){
					if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
					//agregar uno mas al areglo y pueda utilizar el get
					$scope.instructores.push(response);
					//cerrar popup
					//helper.popupClose();
				})
				.catch(function(err){
						console.log(err)
				});
		}
	}

})();
},{}],29:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteInstructoresAdminController', DeleteInstructoresAdminController);

	DeleteInstructoresAdminController.$inject = ["$state","$scope", "$compile","InstructoresServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteInstructoresAdminController($state, $scope, $compile, InstructoresServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;
		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');


		$scope.instructorDuplicado = angular.copy($scope.delInstructor);
			$scope.deleteInstructor=function(){
				InstructoresServiceAdmin
					.deleteInstructores($scope.instructorDuplicado)
					.then(function(response){
						//validacion con mensaje error y ok
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						//cerrar popup
						//$state.reload();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();

},{}],30:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetInstructoresAdminController', SetInstructoresAdminController);

	SetInstructoresAdminController.$inject = ["$compile", "$state","$scope","InstructoresServiceAdmin" , "HelpersFactory", "constant"];

	function SetInstructoresAdminController($compile, $state, $scope, InstructoresServiceAdmin, HelpersFactory, constants){
		$scope.instructorDuplicado = angular.copy($scope.editInstructor);
		
		var helper=HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');

		
			$scope.EditarInstructor=function(){
				InstructoresServiceAdmin
					.setInstructores($scope.instructorDuplicado)
					.then(function(response){
						$scope.editInstructor = response;
						
						//validacion con mensaje error y ok
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						//cerrar popup
						//helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();
},{}],31:[function(require,module,exports){
require('./pagos.controller');
require('./pagos.service');
require('./pagos.directive');
require('./popupAgregar/popupAgregar.controller');
require('./popupModificar/popupModificar.controller');
require('./popupEliminar/popupEliminar.controller');
},{"./pagos.controller":32,"./pagos.directive":33,"./pagos.service":34,"./popupAgregar/popupAgregar.controller":35,"./popupEliminar/popupEliminar.controller":36,"./popupModificar/popupModificar.controller":37}],32:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('PagosAdminController', PagosAdminController);

	PagosAdminController.$inject = ["$state","$scope","PagosServiceAdmin", "HelpersFactory", "constant"];

	function PagosAdminController($state, $scope, PagosServiceAdmin, HelpersFactory, constants){
		console.log("PagosAdmin controller");

		$scope.pagosC = [];
		var helper=HelpersFactory;
		var fechaActual = new Date();

		//getPagos
		PagosServiceAdmin
			.getPagos()
			.then(function(response){
				console.log(response)
				$scope.pagosC = response;

				for(var i=0; i < response.length; i++){
					console.log($scope.pagosC[i].PagosFechaPago)
					if(new Date($scope.pagosC[i].PagosFechaPago) <= fechaActual){
						$scope.pagosC[i].fechaVencida = true;
						$scope.pagosC[i].PagosEstado = "No Pagado";
					}
				}
				//en modificar le pago salga la fecha con formato date
				for(var i=0; i<response.length; i++){
					$scope.pagosC[i].PagosFechaPagado = new Date($scope.pagosC[i].PagosFechaPagado);
				}

		}).catch(function(err){
			console.log(err)
		});

	}

})();
},{}],33:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('pagosAgregar', pagosAgregar)
	.directive('pagosModificar', pagosModificar)
	.directive('pagosEliminar', pagosEliminar)

	function pagosAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/pagos/popupAgregar/popupAgregar.html',
			controller: 'PagosAgregarAdminController'
		}
	}

	function pagosModificar(){
		return{
			restrict:'E',
			scope:{
				editPago: '='
			},
			templateUrl: './admin/pagos/popupModificar/popupModificar.html',
			controller: 'SetPagosAdminController'
		}
	}

	function pagosEliminar(){
		return{
			restrict:'E',
			scope:{
				delPago: '='
			},
			templateUrl: './admin/pagos/popupEliminar/popupEliminar.html',
			controller: 'DeletePagosAdminController'
		}
	}


})();
},{}],34:[function(require,module,exports){
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
},{}],35:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('PagosAgregarAdminController', PagosAgregarAdminController);

	PagosAgregarAdminController.$inject = ["$compile", "$state",'HelpersFactory', "$scope","PagosServiceAdmin", "ClientesServiceAdmin",'$filter'];

	function PagosAgregarAdminController($compile, $state,HelpersFactory,  $scope, PagosServiceAdmin, ClientesServiceAdmin,$filter){
		console.log("PagosAdmin controller");
		var helper = HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');

		//seleccionar cliente en input
		$scope.selected = {};

		//getClientes
		ClientesServiceAdmin
			.getClientes()
			.then(function(response){
				$scope.clientes = response;
		});



		//addPago
		$scope.newPago={};

		//AddPago
		$scope.addPagos=function(){
			//$scope.pago.no_registro = "1";
			$scope.newPago.no_registro = $scope.selected.ClientesNoRegistro;

			//Servicio para validar si es la primera vez que paga
			PagosServiceAdmin
				.pagoExistente($scope.newPago)
				.then(function(response){

					if(response.estatus){
						$scope.newPago.fechaPago = helper.stringToDate(response.fechaPago);
						$scope.newPago.fechaPago.setMonth($scope.newPago.fechaPago.getMonth() + 1);
						$scope.newPago.fechaPago = helper.dateYYYYMMDD($scope.newPago.fechaPago);
					}else{
						if(typeof $scope.newPago.fechaPagado != "undefined"){
							$scope.newPago.fechaPago = angular.copy($scope.newPago.fechaPagado);
							$scope.newPago.fechaPago.setMonth($scope.newPago.fechaPago.getMonth() + 1);
							$scope.newPago.fechaPago = helper.dateYYYYMMDD($scope.newPago.fechaPago);
						}
					}


					//Servicio de agregar pago
					PagosServiceAdmin
					.addPago($scope.newPago)
						.then(function(res){
							if(res.estatus == 'ok'){
									helper.popupClose();
									body.append($compile("<mensaje-ok ok='"+ res.msj +"'></mensaje-ok>")($scope));
									//$state.reload();
								} else {
									helper.popupClose();
									body.append($compile("<mensaje-error error='"+ res.msj +"'></mensaje-error>")($scope));
								}
							//helper.popupClose();
							//$state.reload();
					})
					.catch(function(err){
						console.log(err)
					});


				})
				.catch(function(err){
					console.log(err)
				});
		}

	}

})();
},{}],36:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeletePagosAdminController', DeletePagosAdminController);

	DeletePagosAdminController.$inject = ["$compile", "$state","$scope","PagosServiceAdmin" , "HelpersFactory", "constant"];

	function DeletePagosAdminController($compile, $state, $scope, PagosServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		$scope.pagoDuplicado = angular.copy($scope.delPago);
			$scope.deletePago=function(){

				//validacion con mensaje ok y error
				var body = angular.element(document).find('body');


				var pago = {};
				pago.id_pago = $scope.pagoDuplicado.PagosId;

				PagosServiceAdmin
					.deletePagos(pago)
					.then(function(response){
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						//cerrar popup
						//helper.popupClose();
						//$state.reload();
					})
					.catch(function(err){
							console.log(err)
					});
		}
	}

})();

},{}],37:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetPagosAdminController', SetPagosAdminController);

	SetPagosAdminController.$inject = ["$compile", "$state","$scope","PagosServiceAdmin" , "HelpersFactory", "constant"];

	function SetPagosAdminController($compile, $state, $scope, PagosServiceAdmin, HelpersFactory, constants){
		$scope.pagoDuplicado = angular.copy($scope.editPago);
		var helper=HelpersFactory;

		$scope.EditarPago=function(){

			//validacion con mensaje ok y error
			var body = angular.element(document).find('body');

			var pago = {};
			pago.id_pago = $scope.pagoDuplicado.PagosId;
			pago.fechaPago = $scope.pagoDuplicado.PagosFechaPago;
			pago.fechaPagado = $scope.pagoDuplicado.PagosFechaPagado;
			pago.estadoPagado = $scope.pagoDuplicado.PagosEstado;
			pago.montoPagado = $scope.pagoDuplicado.PagosMonto;
			pago.no_registro = $scope.pagoDuplicado.ClientesRegistro;

			PagosServiceAdmin
				.setPagos(pago)
				.then(function(response){

					if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}

					$scope.editPago = response;
					//cerrar popup
					//helper.popupClose();
					//$state.reload();
				})
				.catch(function(err){
						console.log(err)
				});
		}
		
	}

})();
},{}],38:[function(require,module,exports){
require('./perfiles.controller');
require('./perfiles.service');
require('./perfiles.directive');
require('./popupEliminar/popupEliminar.controller');
},{"./perfiles.controller":39,"./perfiles.directive":40,"./perfiles.service":41,"./popupEliminar/popupEliminar.controller":42}],39:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('PerfilesAdminController', PerfilesAdminController);

	PerfilesAdminController.$inject = ["$state","$scope","ClientesServiceAdmin" , "HelpersFactory", "constant"];
	
	function PerfilesAdminController($state, $scope, ClientesServiceAdmin, HelpersFactory, constants){
		console.log("PerfilesAdmin controller");


		$scope.clientes = [];
		var helper=HelpersFactory;

		var cliente = {};
			cliente.apellido = $scope.clientes.ClientesApellido;
			cliente.celular = $scope.clientes.ClientesCelular;
			cliente.correo = $scope.clientes.ClientesCorreo;
			cliente.domicilio = $scope.clientes.ClientesDomicilio;
			cliente.edad = $scope.clientes.ClientesEdad;
			cliente.estatura = $scope.clientes.ClientesEstatura;
			cliente.imgCliente = $scope.clientes.ClientesImgCliente;
			cliente.no_registro = $scope.clientes.ClientesNoRegistro;
			cliente.nombre = $scope.clientes.ClientesNombre;
			cliente.peso = $scope.clientes.ClientesPeso;
			cliente.correo = $scope.clientes.UsuariosCorreo;
			cliente.password = $scope.clientes.UsuariosPassword;
			cliente.tipoUsuario = $scope.clientes.UsuariosTipoUsuario;


		//getPerfil del cliente
		ClientesServiceAdmin
			.getClientes(cliente)
			.then(function(response){
				console.log(response)
				$scope.clientes = response;

		}).catch(function(err){
			console.log(err)
		});

		/*$scope.buscar = function(){
			$scope.filtro = $scope.search;
		}*/

	}

})();
},{}],40:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('perfilesEliminar', perfilesEliminar)
	.directive('perfilesVer', perfilesVer)

	function perfilesEliminar(){
		return{
			restrict:'E',
			scope:{
				delCliente : '='
			},
			templateUrl: './admin/perfiles/popupEliminar/popupEliminar.html',
			controller: 'DeleteClientesAdminController'
		}
	}

	function perfilesVer(){
		return{
			restrict:'E',
			templateUrl: './admin/perfiles/popupVer/popupVer.html'
		}
	}


})();
},{}],41:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')

	.service('ClientesServiceAdmin', ClientesServiceAdmin)

	ClientesServiceAdmin.$inject=['$q','$http','constant'];

	function ClientesServiceAdmin($q,$http, constants){

		//getClientes para mostarlos en el admin
		function getClientes(){
			var deferred = $q.defer();
			
			$http.get(constants.webService + 'getClientes')
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		//getCliente para mostrar al usuario
		function getCliente(noRegistro){
			var deferred = $q.defer();
			
			$http.get(constants.webService + 'getCliente/'+noRegistro)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}


		function setClientes(cliente){
			var deferred = $q.defer();
			var cliente = angular.fromJson(cliente);
			$http.put(constants.webService + 'putClientes', cliente)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function deleteClientes(cliente){
			var deferred = $q.defer();
			var cliente = angular.fromJson(cliente);
			$http.delete(constants.webService + 'deleteClientes', {data: cliente})
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function deleteUsuarios(usuario){
			var deferred = $q.defer();
			var usuario = angular.fromJson(usuario);
			$http.delete(constants.webService + 'deleteUsuarios', {data: usuario})
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}


		/* addRetos(reto){
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
		}*/



		//return de los metodos
		return{
			getClientes: getClientes,
			getCliente: getCliente,
			setClientes: setClientes,
			deleteClientes: deleteClientes,
			deleteUsuarios: deleteUsuarios
		};

	}

})();
},{}],42:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteClientesAdminController', DeleteClientesAdminController);

	DeleteClientesAdminController.$inject = ["$compile", "$state","$scope","ClientesServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteClientesAdminController($compile, $state, $scope, ClientesServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');


		$scope.clienteDuplicado = angular.copy($scope.delCliente);
			
			$scope.deleteCliente=function(){
				
				var usuario = {};
				usuario.correo = $scope.clienteDuplicado.UsuariosCorreo;

				ClientesServiceAdmin
					.deleteUsuarios(usuario)
					.then(function(response){

						//validacion con mensaje error y ok
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						//helper.popupClose();
						//$state.reload();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();

},{}],43:[function(require,module,exports){
require('./retos.controller');
require('./retos.service');
require('./retos.directive');
require('./popupAgregar/popupAgregar.controller');
require('./popupModificar/popupModificar.controller');
require('./popupEliminar/popupEliminar.controller');

},{"./popupAgregar/popupAgregar.controller":44,"./popupEliminar/popupEliminar.controller":45,"./popupModificar/popupModificar.controller":46,"./retos.controller":47,"./retos.directive":48,"./retos.service":49}],44:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('RetosAgregarAdminController', RetosAgregarAdminController);

	RetosAgregarAdminController.$inject = ["$compile", "$state","$scope","RetosServiceAdmin", "HelpersFactory", "constant"];

	function RetosAgregarAdminController($compile, $state, $scope, RetosServiceAdmin, HelpersFactory, constants){
		console.log("RetosAgregarAdmin controller");
		
		var helper = HelpersFactory;
		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');


		//addReto
		$scope.reto={};
		//imagen por default
		$scope.reto.imgReto=constants.imgDefaultReto;

		//AddReto
		$scope.addRetos=function(){
			$scope.reto.no_registro = "12";

			$scope.reto.fechaPago = false;

			RetosServiceAdmin
				.addRetos($scope.reto)
				.then(function(res){
					console.log(res);
					//agregar uno mas al areglo y pueda utilizar el get
					$scope.retos.push(res);

					//validacion con mensaje error y ok
					if(res.estatus == 'ok'){
						helper.popupClose();
						body.append($compile("<mensaje-ok ok='"+ res.msj +"'></mensaje-ok>")($scope));
						//$state.reload();
					} else {
						helper.popupClose();
						body.append($compile("<mensaje-error error='"+ res.msj +"'></mensaje-error>")($scope));
					}
					//cerrar popup
					//helper.popupClose();
				})
				.catch(function(err){
					console.log(err)
				});
		}


	}

})();
},{}],45:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteRetosAdminController', DeleteRetosAdminController);

	DeleteRetosAdminController.$inject = ["$compile", "$state","$scope","RetosServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteRetosAdminController($compile, $state, $scope, RetosServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');

		$scope.retoDuplicado = angular.copy($scope.delReto);
			$scope.deleteReto=function(){
				RetosServiceAdmin
					.deleteRetos($scope.retoDuplicado)
					.then(function(response){

						//validacion con mensaje error y ok
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();

},{}],46:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetRetosAdminController', SetRetosAdminController);

	SetRetosAdminController.$inject = ["$compile", "$state","$scope","RetosServiceAdmin" , "HelpersFactory", "constant"];

	function SetRetosAdminController($compile, $state, $scope, RetosServiceAdmin, HelpersFactory, constants){

		$scope.retoDuplicado = angular.copy($scope.editReto);
		var helper=HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');
		
			$scope.EditarReto=function(){
				RetosServiceAdmin
					.setRetos($scope.retoDuplicado)
					.then(function(response){
						$scope.editReto = response;
						
						//validacion con mensaje error y ok
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						//cerrar popup
						//helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();
},{}],47:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('RetosAdminController', RetosAdminController);

	RetosAdminController.$inject = ["$state","$scope","RetosServiceAdmin", "HelpersFactory", "constant"];

	function RetosAdminController($state, $scope, RetosServiceAdmin, HelpersFactory, constants){
		console.log("RetosAdmin controller");

		$scope.retos = [];
		var helper=HelpersFactory;

		//getRetos
		RetosServiceAdmin
			.getRetos()
			.then(function(response){
				console.log(response)
				$scope.retos = response;

				for(var i=0; i<response.length; i++){
					$scope.retos[i].fechaInicio = new Date($scope.retos[i].fechaInicio);
				}

		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],48:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('retosAgregar', retosAgregar)
	.directive('retosModificar', retosModificar)
	.directive('retosEliminar', retosEliminar)
	.directive('retosVer', retosVer)

	function retosAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/retos/popupAgregar/popupAgregar.html',
			controller: 'RetosAgregarAdminController'
		}
	}

	function retosModificar(){
		return{
			restrict:'E',
			scope:{
				editReto : '='
			},
			templateUrl: './admin/retos/popupModificar/popupModificar.html',
			controller: 'SetRetosAdminController'
		}
	}

	function retosVer(){
		return{
			restrict:'E',
			templateUrl: './admin/retos/popupVer/popupVer.html'
		}
	}

	function retosEliminar(){
		return{
			restrict:'E',
			scope:{
				delReto : '='
			},
			templateUrl: './admin/retos/popupEliminar/popupEliminar.html',
			controller: 'DeleteRetosAdminController'
		}
	}



})();
},{}],49:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')

	.service('RetosServiceAdmin', RetosServiceAdmin)

	RetosServiceAdmin.$inject=['$q','$http','constant'];

	function RetosServiceAdmin($q,$http, constants){

		
		function getRetos(){
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

		function setRetos(reto){
			var deferred = $q.defer();
			var reto = angular.fromJson(reto);
			$http.put(constants.webService + 'putRetos', reto)
			.success(function(response){
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function deleteRetos(reto){
			var deferred = $q.defer();
			var reto = angular.fromJson(reto);
			$http.delete(constants.webService + 'deleteRetos', {data: reto})
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
			addRetos: addRetos,
			setRetos: setRetos,
			deleteRetos: deleteRetos
		};

	}

})();
},{}],50:[function(require,module,exports){
(function(){
	//appTec - modulo principal (aplicacion)
	//modulo de rutas - ui-router
	angular.module('gymApp', [
		'ui.router',
		'swxSessionStorage',
		'angular-carousel',
		'gymApp.Error',
		'gymApp.Ok',
		'gymApp.constants',
		'gymApp.Helpers',
		'gymApp.Usuario',
		'gymApp.Admin',
		'gymApp.Login',
		'gymApp.Retos'
		])
	.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){ 
		$stateProvider
			.state('login', {
				url: '',
				templateUrl: './login/login.html',
				controller: 'LoginController'
			})
/*************************Usuario*************************************/
			.state('usuario', {
				asbtract: true,
				url: '/usuario',
				templateUrl: 'header/headerUsuario.html'
				})
				.state('usuario.inicio', {
					url: '/inicio',
					views:{
						"contentViews":{
							templateUrl: 'usuario/inicio/inicio.html',
							controller: 'InicioController'
						}
					}
				})
				.state('usuario.clases', {
					url: '/clases',
					views:{
						"contentViews":{
							templateUrl: 'usuario/clases/clases.html',
							controller: 'ClasesController'
						}
					}
				})
				.state('usuario.retos', {
					url: '/retos',
					views:{
						"contentViews":{
							templateUrl: 'usuario/retos/retos.html',
							controller: 'RetosController'
						}
					}
				})
				.state('usuario.instructores', {
					url: '/instructores',
					views:{
						"contentViews":{
							templateUrl: 'usuario/instructores/instructores.html',
							controller: 'InstructoresController'
						}
					}
				})
				.state('usuario.pagos', {
					url: '/pagos',
					views:{
						"contentViews":{
							templateUrl: 'usuario/pagos/pagos.html',
							controller: 'PagosController'
						}
					}
				})
				.state('usuario.perfil', {
					url: '/perfil',
					views:{
						"contentViews":{
							templateUrl: 'usuario/perfil/perfil.html',
							controller: 'PerfilController'
						}
					}
				})
/*************************Administrador***********************************/
			.state('admin', {
				asbtract: true,
				url: '/admin',
				templateUrl: 'header/headerAdmin.html'
				})
				.state('admin.inicio', {
					url: '/inicio',
					views:{
						"contentViews":{
							templateUrl: 'admin/inicio/inicio.html',
							controller: 'InicioAdminController'
						}
					}
				})
				.state('admin.clases', {
					url: '/clases',
					views:{
						"contentViews":{
							templateUrl: 'admin/clases/clases.html',
							controller: 'ClasesAdminController'
						}
					}
				})
				.state('admin.retos', {
					url: '/retos',
					views:{
						"contentViews":{
							templateUrl: 'admin/retos/retos.html',
							controller: 'RetosAdminController'
						}
					}
				})
				.state('admin.instructores', {
					url: '/instructores',
					views:{
						"contentViews":{
							templateUrl: 'admin/instructores/instructores.html',
							controller: 'InstructoresAdminController'
						}
					}
				})
				.state('admin.pagos', {
					url: '/pagos',
					views:{
						"contentViews":{
							templateUrl: 'admin/pagos/pagos.html',
							controller: 'PagosAdminController'
						}
					}
				})
				.state('admin.perfiles', {
					url: '/perfiles',
					views:{
						"contentViews":{
							templateUrl: 'admin/perfiles/perfiles.html',
							controller: 'PerfilesAdminController'
						}
					}
				})
		/*$stateProvider
			.state('pagosAdmin', {
				url: '/pagosAdmin',
				templateUrl: 'admin/pagos/pagos.html'
			})*/
	}])

	.run(['$rootScope','$state','$stateParams',
		function ($rootScope,$state,$stateParams) {
			$rootScope.$on('$stateChangeSuccess',
			  function(event, toState, toParams, fromState, fromParams) {
			    $state.current = toState;
			    $rootScope.seccionActual = toState;
			  }
			)
		}
	]);


})();
},{}],51:[function(require,module,exports){
(function () {

angular
    .module('gymApp.constants',[])
    .constant('constant', {
        webService: 'http://localhost:8080/gym.app/back/index.php/', 
        imgDefault: 'http://localhost:8080/gym.app/back/imagenes/default.jpg',
        imgDefaultReto: 'http://localhost:8080/gym.app/back/imagenes/defaultReto.jpg',
        imgDefaultClase: 'http://localhost:8080/gym.app/back/imagenes/defaultClase.jpg',
         imgDefaultBanner: 'http://localhost:8080/gym.app/back/imagenes/defaultBanner.jpg'
    });

})();
},{}],52:[function(require,module,exports){
//manda a llamar a la libreria jquery
require('./app.module');
require('./mensajeError/_error');
require('./mensajeOk/_ok');
require('./constants');
require('./login/_login');
require('./_helpers/_helpers');
require('./admin/_admin');
require('./usuario/_usuario');

},{"./_helpers/_helpers":1,"./admin/_admin":6,"./app.module":50,"./constants":51,"./login/_login":53,"./mensajeError/_error":60,"./mensajeOk/_ok":63,"./usuario/_usuario":66}],53:[function(require,module,exports){
require('./login.module');
require('./login.controller');
require('./login.service');
require('./login.directive');
require('./popupRegistrar/popupRegistrar.controller');
require ('./mapa')
},{"./login.controller":54,"./login.directive":55,"./login.module":56,"./login.service":57,"./mapa":58,"./popupRegistrar/popupRegistrar.controller":59}],54:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Login')
	.controller('LoginController', LoginController);

	LoginController.$inject = ["$compile","$state","$scope", "$timeout","LoginService", "UsuarioFactory"];

	function LoginController($compile, $state, $scope, $timeout, LoginService, UsuarioFactory){
		console.log("Login controller");
		$scope.usuario = {};
		var usuario = UsuarioFactory;

		var body =angular.element(document).find('body');
		console.log(usuario)

		$scope.addUsuario=function(){
			LoginService
				.login($scope.usuario)
				.then(function(data){
					if(data.estatus == 'ok'){
						if(data.usuario){
							if(data.tipoUsuario == 'admin'){
								$state.go('admin.inicio')
							} else {
					console.log(data);
								usuario.setInfo(data.usuario);
								$state.go('usuario.inicio')
								body.append($compile("<mensaje-ok ok='" + data.msj + "'></mensaje-ok>")($scope));
							}

						} else {
						console.log(data.msj)
						body.append($compile("<mensaje-error error='" + data.msj + "'></mensaje-error>")($scope));
						}
					} else {
						console.log(data.msj)
						body.append($compile("<mensaje-error error='" + data.msj + "'></mensaje-error>")($scope));
					}
				})
				.catch(function(error){
					console.log(error);
				});
		}
		/*LoginService.obtenerUsuarios().then
			(function(data){
				$scope.usuarios=data;
				console.log(data);
		}).catch(function(error){
			$scope.usuarios=error;
		});*/
	}

})();
},{}],55:[function(require,module,exports){
(function(){
	angular.module('gymApp.Login')
	.directive('loginRegistrar', loginRegistrar)

	function loginRegistrar(){
		return{
			restrict:'E',
			templateUrl: './login/popupRegistrar/popupRegistrar.html',
			controller: "LoginRegistrarController"
		}
	}

})();
},{}],56:[function(require,module,exports){
(function(){

	angular.module('gymApp.Login', []);

})();
},{}],57:[function(require,module,exports){
(function(){
	angular.module('gymApp.Login')

	.service('LoginService', LoginService)

	LoginService.$inject=['$q','$http','constant'];

	function LoginService($q,$http, constants){

		function login(usuario){
			var deferred = $q.defer();
			var usuario = angular.fromJson(usuario);
			
			$http.post(constants.webService + 'login', usuario)
			.success(function(response){
				
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function addUsuario(usuario){
			var deferred = $q.defer();
			var usuario = angular.fromJson(usuario);
			
			$http.post(constants.webService + 'clientes', usuario)
			.success(function(response){
				
				deferred.resolve(response)
			})
			.catch(function(err){
				deferred.reject(err)
			});
			return deferred.promise;
		}

		function addCliente(cliente){
			var deferred = $q.defer();
			var cliente = angular.fromJson(cliente);
			
			$http.post(constants.webService + 'login', cliente)
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
			login: login,
			addUsuario: addUsuario,
			addCliente: addCliente
		};


	}

})();
},{}],58:[function(require,module,exports){
(function(){
	console.log("mapa");
	/*var myLatlng = new google.maps.LatLng(25.379232, -100.978686);
	var mapOptions = {
		zoom: 14,
		center: myLatlng
	}
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var marker = new google.maps.Marker({
		position: myLatlng,
		title:"Hello World!"
	});

	// To add the marker to the map, call setMap();
	marker.setMap(map);*/
})();
},{}],59:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Login')
	.controller('LoginRegistrarController', LoginRegistrarController);

	LoginRegistrarController.$inject = ['$compile', "$state","$scope","LoginService", "InstructoresServiceAdmin", "HelpersFactory", "constant"];

	function LoginRegistrarController($compile, $state, $scope, LoginService, InstructoresServiceAdmin, HelpersFactory, constants){
		console.log("LoginRegistrar controller");

		$scope.newUsuario={};
		var helper = HelpersFactory;
		//imagen por default
		$scope.newUsuario.imgCliente=constants.imgDefault;
		$scope.newUsuario.tipoUsuario = "usuario";


		var body =angular.element(document).find('body');
		$scope.registrar = function(formValid){
			/*var usuario = {
				"nombre":"jorge",
				"apellido":"Avalos",
				"imgCliente":"http://localhost:8080/gym.app/front/dep/img/reto4.jpg",
				"celular":"8443454345",
				"peso":"60kg",
				"estatura":"1.60m",
				"edad":"25",
				"domicilio":"Calle n",
				"correo":"ram@hotmail.com",
				"password":"ram",
				"tipoUsuario": "usuario"
			}*/
			if(formValid){
				LoginService
					.addUsuario($scope.newUsuario)
					//.addUsuario(usuario)
					.then(function(data){
						console.log(data)
						if(data.estatus == 'ok'){
							body.append($compile("<mensaje-ok ok='" + data.msj + "'></mensaje-ok>")($scope));
							helper.popupClose();
						} else {
							body.append($compile("<mensaje-error error='" + data.msj + "'></mensaje-error>")($scope));
						}
					})
					.catch(function(err){
						console.log(err)
					})
			}
		}

	}

})();
},{}],60:[function(require,module,exports){
require('./error.module')
require('./error.directive')
},{"./error.directive":61,"./error.module":62}],61:[function(require,module,exports){
(function(){

	//modulo al qe pertenece
	angular.module('gymApp.Error')
	.directive('mensajeError', mensajeError)

	function mensajeError(){
		return{
			restrict: 'E',
			scope: {
				error: "@"
			},
			templateUrl:'./mensajeError/error.html'
		}
	}


})();
},{}],62:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Error', []);

	

})();
},{}],63:[function(require,module,exports){
require('./ok.module')
require('./ok.directive')
},{"./ok.directive":64,"./ok.module":65}],64:[function(require,module,exports){
(function(){

	//modulo al qe pertenece
	angular.module('gymApp.Ok')
	.directive('mensajeOk', mensajeOk)

	function mensajeOk(){
		return{
			restrict: 'E',
			scope: {
				ok: "@"
			},
			templateUrl:'./mensajeOk/ok.html'
		}
	}


})();
},{}],65:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Ok', []);

	

})();
},{}],66:[function(require,module,exports){
require('./usuario.module');
require('./usuario.service');
require('./usuario.factory');
require('./inicio/_inicio');
require('./clases/_clases');
require('./retos/_retos');
require('./instructores/_instructores');
require('./pagos/_pagos');
require('./perfil/_perfil');
},{"./clases/_clases":67,"./inicio/_inicio":71,"./instructores/_instructores":73,"./pagos/_pagos":76,"./perfil/_perfil":78,"./retos/_retos":82,"./usuario.factory":86,"./usuario.module":87,"./usuario.service":88}],67:[function(require,module,exports){
require('./clases.controller');
require('./clases.directive');
require('./popupAgendar/popupAgendar.controller');
},{"./clases.controller":68,"./clases.directive":69,"./popupAgendar/popupAgendar.controller":70}],68:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('ClasesController', ClasesController);

	ClasesController.$inject = ["$state","$scope","ClasesServiceAdmin"];

	function ClasesController($state, $scope, ClasesServiceAdmin){
		console.log("Clases controller");
		
		$scope.clases = [];

		//getClases
		ClasesServiceAdmin.getClases().then(
			function(response){
			console.log(response)
			$scope.clases = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],69:[function(require,module,exports){
(function(){
	angular.module('gymApp.Usuario')
	.directive('claseAgendar', claseAgendar)
	.directive('claseDetalle', claseDetalle)

	function claseAgendar(){
		return{
			restrict:'E',
			scope:{
				agendarClase : '='
			},
			templateUrl: './usuario/clases/popupAgendar/popupAgendar.html',
			controller: 'AgendarClaseController'
		}
	}

	function claseDetalle(){
		return{
			restrict:'E',
			templateUrl: './usuario/clases/popupDetalle/popupDetalle.html'
		}
	}

})();
},{}],70:[function(require,module,exports){
(function() {

	//modulo al qe pertenece modificar
	angular.module('gymApp.Usuario')
	.controller('AgendarClaseController', AgendarClaseController);

	AgendarClaseController.$inject = ["$compile", "$state","$scope","ClasesServiceAdmin", "InstructoresServiceAdmin", "HelpersFactory", "constant", "UsuarioFactory"];

	function AgendarClaseController($compile, $state, $scope, ClasesServiceAdmin, InstructoresServiceAdmin, HelpersFactory, constants, UsuarioFactory){
		console.log("AgendarClaseAdmin controller");
		var usuarioActual = UsuarioFactory.getInfo();

		//getinstructor, para mostrar todos los instructores en el campo 
		$scope.instructores = [];
		var helper = HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');

		InstructoresServiceAdmin
			.getInstructores()
			.then(function(response){
				$scope.instructores = response;

		}).catch(function(err){
			console.log(err)
		});

		//copiar los datos
		$scope.claseDup = angular.copy($scope.agendarClase);
		console.log($scope.claseDup)
		//$scope.claseDuplicado.newHora = $scope.agregarClase.hora;

		$scope.agendar=function(){
			
			var clase = {};
			clase.diaAg = $scope.claseDup.dia;
			clase.horaAg = $scope.claseDup.hora;
			clase.claseAg = $scope.claseDup.clase;
			clase.imgClaseAg = $scope.claseDup.imgClase;
			clase.horaDuracionAg = $scope.claseDup.horaDuracion;
			clase.minDuracionAg = $scope.claseDup.minDuracion;
			clase.id_instructor = $scope.claseDup.id_instructor;
			clase.no_registro = usuarioActual.no_registro;
				
				ClasesServiceAdmin
					.AgendarClase(clase)
					.then(function(response){
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						//$scope.editClase.hora = response.newHora;
						//cerrar popup
						//helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
		



	}

})();
},{}],71:[function(require,module,exports){
require('./inicio.controller');
},{"./inicio.controller":72}],72:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('InicioController', InicioController);

	InicioController.$inject = ["$state","$scope","InicioServiceAdmin", "ClientesServiceAdmin", 'UsuarioFactory'];

	function InicioController($state, $scope, InicioServiceAdmin, ClientesServiceAdmin, UsuarioFactory){
		console.log("Inicio controller");
		var usuario = UsuarioFactory.getInfo();
		$scope.banners = [];
		$scope.c = {};

		//getBanner
		InicioServiceAdmin
			.getBanner()
			.then(function(response){
				console.log(response)
				$scope.banners = response;
				console.log(response);
			}).catch(function(err){
				console.log(err)
		});


		//getClientes
		ClientesServiceAdmin
			.getCliente(usuario.no_registro)
			.then(function(response){
				console.log(response)
				$scope.c = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],73:[function(require,module,exports){
require('./instructores.controller');
require('./popupInformacion/popupInformacion.directive');
},{"./instructores.controller":74,"./popupInformacion/popupInformacion.directive":75}],74:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('InstructoresController', InstructoresController);

	InstructoresController.$inject = ["$state","$scope","InstructoresServiceAdmin"];

	function InstructoresController($state, $scope, InstructoresServiceAdmin){
		console.log("Instructores controller");
		
		$scope.instructores = [];
		//getInstructor
		InstructoresServiceAdmin.getInstructores().then(
			function(response){
			console.log(response)
			$scope.instructores = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],75:[function(require,module,exports){
(function(){
	angular.module('gymApp.Usuario')
	.directive('instructorInfo', instructorInfo)
	function instructorInfo(){
		return{
			restrict:'E',
			templateUrl: './usuario/instructores/popupInformacion/popupInformacion.html'
		}
	}

})();

},{}],76:[function(require,module,exports){
require('./pagos.controller');
},{"./pagos.controller":77}],77:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('PagosController', PagosController);

	PagosController.$inject = ["$state","$scope","PagosServiceAdmin", "UsuarioFactory"];

	function PagosController($state, $scope, PagosServiceAdmin, UsuarioFactory){
		console.log("Pagos controller");
		var usuario = UsuarioFactory.getInfo();
		$scope.pagos = {};
		var fechaActual = new Date();

		//getPagos
		PagosServiceAdmin
			.getPago(usuario.no_registro)
			.then(function(response){
				console.log(response)
				$scope.pagos = response;

				for(var i=0; i < response.length; i++){
					if(new Date($scope.pagos[i].PagosFechaPago) <= fechaActual){
						$scope.pagos[i].fechaVencida = true;
						$scope.pagos[i].PagosEstado = "No Pagado";
					}
				}


		}).catch(function(err){
			console.log(err)
		});


	}

})();
},{}],78:[function(require,module,exports){
require('./perfil.controller');
require('./perfil.directive');
require('./popupModificar/popupModificar.controller');

},{"./perfil.controller":79,"./perfil.directive":80,"./popupModificar/popupModificar.controller":81}],79:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('PerfilController', PerfilController);

	PerfilController.$inject = ["$state","$scope","ClientesServiceAdmin", "HelpersFactory", "constant", 'UsuarioFactory'];

	function PerfilController($state, $scope, ClientesServiceAdmin, HelpersFactory, constants, UsuarioFactory){
		console.log("Perfil controller");
		var usuario = UsuarioFactory.getInfo();
		$scope.c = {};
		var helper=HelpersFactory;


		//getClientes
		ClientesServiceAdmin
			.getCliente(usuario.no_registro)
			.then(function(response){
				console.log(response)
				$scope.c = response;
		}).catch(function(err){
			console.log(err)
		});

	}

})();
},{}],80:[function(require,module,exports){
(function(){
	angular.module('gymApp.Usuario')
	.directive('perfilModificar', perfilModificar)
	

	function perfilModificar(){
		return{
			restrict:'E',
			scope: {
				usuario: "="
			},
			templateUrl: './usuario/perfil/popupModificar/popupModificar.html',
			controller: 'ModificarPerfilController'
		}
	}

})();
},{}],81:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('ModificarPerfilController', ModificarPerfilController);

	ModificarPerfilController.$inject = ["$state","$scope","ClientesServiceAdmin", "InstructoresServiceAdmin", "HelpersFactory", "constant"];

	function ModificarPerfilController($state, $scope, ClientesServiceAdmin, InstructoresServiceAdmin, HelpersFactory, constants){
		console.log("ModificarPerfil controller");
		console.log($scope.usuario);

		$scope.usuarioUpdate=angular.copy($scope.usuario);
		var helper = HelpersFactory;

		$scope.SetCliente = function(){
			ClientesServiceAdmin
				.setClientes($scope.usuarioUpdate)
				.then(function(res){
					helper.popupClose();
					$state.reload();
				})
				.catch(function(err){
					console.log(err);
				})
		}
		//imagen por default
		//$scope.registro.imgCliente=constants.imgDefault;
		
	}

})();
},{}],82:[function(require,module,exports){
require('./retos.module');
require('./retos.controller');
require('./popupVer/popupVer.directive');
},{"./popupVer/popupVer.directive":83,"./retos.controller":84,"./retos.module":85}],83:[function(require,module,exports){
(function(){
	angular.module('gymApp.Usuario')
	.directive('retoVer', retoVer)
	function retoVer(){
		return{
			restrict:'E',
			templateUrl: './usuario/retos/popupVer/popupVer.html'
		}
	}

})();
},{}],84:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Retos')
	.controller('RetosController', RetosController);

	RetosController.$inject = ["$state","$scope","RetosServiceAdmin"];

	function RetosController($state, $scope, RetosServiceAdmin){
		console.log("Retos Controller");
		$scope.retos = [];

		//gerREtos
		RetosServiceAdmin.getRetos().then(
			function(response){
			console.log(response)
			$scope.retos = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();

},{}],85:[function(require,module,exports){
(function(){

	angular.module('gymApp.Retos', []);

})();
},{}],86:[function(require,module,exports){
(function(){
	angular
		.module('gymApp.Usuario')
		.factory('UsuarioFactory', UsuarioFactory);

		UsuarioFactory.$inject = ['$sessionStorage'];

		function UsuarioFactory($sessionStorage){
			var Usuario = {};

			Usuario.getInfo = function(){
				return $sessionStorage.get('Usuario') || undefined;
			}
			Usuario.setInfo = function(usuario){
				$sessionStorage.put('Usuario', usuario);
			}
			Usuario.logout = function(){
				$sessionStorage.empty();
			}
			return Usuario;
		}

})();
},{}],87:[function(require,module,exports){
(function(){

	angular.module('gymApp.Usuario', []);

})();
},{}],88:[function(require,module,exports){
/*(function(){
	angular.module('gymApp.Usuario')

	.service('ClientesService', ClientesService)

	ClientesService.$inject=['$q','$http','constant'];

	function ClientesService($q,$http, constants){

		function getClientes(){
			var deferred = $q.defer();
			
			$http.get(constants.webService + 'getClientes')
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
			getClientes: getClientes
		};

	}

})();*/
},{}]},{},[52]);
