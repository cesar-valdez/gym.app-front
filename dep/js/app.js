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

	function popupClose(){
		return {
			restrict:'A',
			link: function(scope, elem, attrs){

					console.log(elem);
				elem.bind('click', function(e){
					//console.log('da click');
					//console.log(e.target);
					//
					console.log( e.target != this)
					if(e.target != this && !angular.element(e.target).hasClass('popup-close')) return

					elem.remove();
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
},{"./admin.module":7,"./clases/_clases":8,"./inicio/_inicio":16,"./instructores/_instructores":22,"./pagos/_pagos":28,"./retos/_retos":34}],7:[function(require,module,exports){
(function(){

	angular.module('gymApp.Admin', []);

})();
},{}],8:[function(require,module,exports){
require('./clases.controller');
require('./clases.service');
require('./popupAgregar/popupAgregar.controller');
require('./popupAgregar/popupAgregar.directive');
require('./popupModificar/popupModificar.directive');
require('./popupEliminar/popupEliminar.directive');
require('./popupVer/popupVer.directive');
},{"./clases.controller":9,"./clases.service":10,"./popupAgregar/popupAgregar.controller":11,"./popupAgregar/popupAgregar.directive":12,"./popupEliminar/popupEliminar.directive":13,"./popupModificar/popupModificar.directive":14,"./popupVer/popupVer.directive":15}],9:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('ClasesAdminController', ClasesAdminController);

	ClasesAdminController.$inject = ["$state","$scope","ClasesService", "InstructoresService", "HelpersFactory", "constant"];

	function ClasesAdminController($state, $scope, ClasesService, InstructoresService, HelpersFactory, constants){
		console.log("ClasesAdmin controller");

		$scope.clases = [];

		//getClases
		ClasesService
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

	.service('ClasesService', ClasesService)

	ClasesService.$inject=['$q','$http','constant'];

	function ClasesService($q,$http, constants){

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
			});
			return deferred.promise;
		}





		//return de los metodos
		return{
			getClases: getClases,
			addClases: addClases
		};

	}

})();
},{}],11:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('ClasesAgregarAdminController', ClasesAgregarAdminController);

	ClasesAgregarAdminController.$inject = ["$state","$scope","ClasesService", "InstructoresService", "HelpersFactory", "constant"];

	function ClasesAgregarAdminController($state, $scope, ClasesService, InstructoresService, HelpersFactory, constants){
		console.log("ClasesAgregarAdmin controller");

		//getinstructor, para mostrar todos los instructores en el campo 
		$scope.instructores = [];
		var helper = HelpersFactory;

		InstructoresService
			.getInstructores()
			.then(function(response){
				$scope.instructores = response;

		}).catch(function(err){
			console.log(err)
		});


		//addClase
		$scope.clase={};
		//imagen por default
		$scope.clase.imgClase=constants.imgDefault;

		//AddClase
		$scope.addClases=function(){
			$scope.clase.no_registro = "1";
			var d = ["Lunes", "Martes", "Miercoles", "Jueves","Viernes", "Sabado", "Domingo"];
			//var insertExitoso = false;
			var days =[];
			for(var i = 0; i <=7; i++){
				//console.log($scope.dias)
				if($scope.clase.dias[i] == true){
					//console.log(d[i]);
					days.push(d[i]);
				}

			}
			$scope.clase.dias = days;
			console.log($scope.clase)
			ClasesService
				.addClases($scope.clase)
				.then(function(res){

					console.log("res");
					console.log(res);

					var todoBien=true;

					var mensaje = "";
					for(i = 0; i < res.length; i++){
						if(res.estatus == 'error'){
							mensaje+= "Ya existe una clase para el día: " + res.dia + " y la hora: " + res.hora;
							mensaje+=" ------------ "
						}
					}
						//console.log(mensaje)
					//insertar clases



					for(var i=0; i < res.length; i++){
						if(res[i].estatus == "success"){
							var clasesInsertar = angular.copy($scope.clase)
							delete clasesInsertar.dias;
							clasesInsertar.dia = res[i].dia;
							$scope.clases.push(clasesInsertar);
						}
					}

						helper.popupClose();
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
},{}],12:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('clasesAgregar', clasesAgregar)
	function clasesAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/clases/popupAgregar/popupAgregar.html',
			controller: 'ClasesAgregarAdminController'
		}
	}

})();
},{}],13:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('clasesEliminar', clasesEliminar)
	function clasesEliminar(){
		return{
			restrict:'E',
			templateUrl: './admin/clases/popupEliminar/popupEliminar.html'
		}
	}

})();
},{}],14:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('clasesModificar', clasesModificar)
	function clasesModificar(){
		return{
			restrict:'E',
			templateUrl: './admin/clases/popupModificar/popupModificar.html'
		}
	}

})();
},{}],15:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('clasesVer', clasesVer)
	function clasesVer(){
		return{
			restrict:'E',
			templateUrl: './admin/clases/popupVer/popupVer.html'
		}
	}

})();
},{}],16:[function(require,module,exports){
require('./inicio.service');
require('./inicio.controller');
require('./popupAgregar/popupAgregar.directive');
require('./popupEditar/popupEditar.directive');
require('./popupEliminar/popupEliminar.directive');
},{"./inicio.controller":17,"./inicio.service":18,"./popupAgregar/popupAgregar.directive":19,"./popupEditar/popupEditar.directive":20,"./popupEliminar/popupEliminar.directive":21}],17:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('InicioAdminController', InicioAdminController);

	InicioAdminController.$inject = ["$state","$scope","InicioService"];

	function InicioAdminController($state, $scope, InicioService){
		console.log("InicioAdmin controller");

		$scope.banners = [];

		//getBanner
		InicioService.getBanner().then(
			function(response){
			console.log(response)
			$scope.banners = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],18:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')

	.service('InicioService', InicioService)

	InicioService.$inject=['$q','$http','constant'];

	function InicioService($q,$http, constants){

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





		//return de los metodos
		return{
			getBanner: getBanner
		};

	}

})();
},{}],19:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('inicioAgregar', inicioAgregar)
	function inicioAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/inicio/popupAgregar/popupAgregar.html'
		}
	}

})();
},{}],20:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('inicioEditar', inicioEditar)
	function inicioEditar(){
		return{
			restrict:'E',
			templateUrl: './admin/inicio/popupEditar/popupEditar.html'
		}
	}

})();
},{}],21:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('inicioEliminar', inicioEliminar)
	function inicioEliminar(){
		return{
			restrict:'E',
			templateUrl: './admin/inicio/popupEliminar/popupEliminar.html'
		}
	}

})();
},{}],22:[function(require,module,exports){
require('./instructores.controller');
require('./instructores.service');
require('./instructores.directive');
require('./popupModificar/popupModificar.controller');
require('./popupEliminar/popupEliminar.controller');


},{"./instructores.controller":23,"./instructores.directive":24,"./instructores.service":25,"./popupEliminar/popupEliminar.controller":26,"./popupModificar/popupModificar.controller":27}],23:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('InstructoresAdminController', InstructoresAdminController);

	InstructoresAdminController.$inject = ["$state","$scope","InstructoresService" , "HelpersFactory", "constant"];

	function InstructoresAdminController($state, $scope, InstructoresService, HelpersFactory, constants){
		console.log("InstructoresAdmin controller");
		
		$scope.instructores = [];
		var helper=HelpersFactory;


		//getinstructor
		InstructoresService
			.getInstructores()
			.then(function(response){
				console.log(response)
				$scope.instructores = response;

		}).catch(function(err){
			console.log(err)
		});



			//addInstructor
			$scope.instructor={};
			//imagen por default
			$scope.instructor.imgInstructor=constants.imgDefault;

			$scope.addInstructor=function(){
				InstructoresService
					.addInstructores($scope.instructor)
					.then(function(response){
						console.log("response")
						console.log(response)
						//agregar uno mas al areglo y pueda utilizar el get
						$scope.instructores.push(response);
						//cerrar popup
						helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();
},{}],24:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('instructoresAgregar', instructoresAgregar)	
	.directive('instructoresModificar', instructoresModificar)
	.directive('instructoresEliminar', instructoresEliminar)
	.directive('instructoresVer', instructoresVer)

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
				delInstructor : '='
			},
			templateUrl: './admin/instructores/popupEliminar/popupEliminar.html',
			controller: 'DeleteInstructoresAdminController',
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

	function instructoresAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/instructores/popupAgregar/popupAgregar.html',
			controller: "InstructoresAdminController"
		}
	}

})();
},{}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteInstructoresAdminController', DeleteInstructoresAdminController);

	DeleteInstructoresAdminController.$inject = ["$state","$scope","InstructoresService" , "HelpersFactory", "constant"];

	function DeleteInstructoresAdminController($state, $scope, InstructoresService, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		$scope.instructorDuplicado = angular.copy($scope.delInstructor);
			$scope.deleteInstructor=function(){
				InstructoresService
					.deleteInstructores($scope.instructorDuplicado)
					.then(function(response){
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

},{}],27:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetInstructoresAdminController', SetInstructoresAdminController);

	SetInstructoresAdminController.$inject = ["$state","$scope","InstructoresService" , "HelpersFactory", "constant"];

	function SetInstructoresAdminController($state, $scope, InstructoresService, HelpersFactory, constants){
		$scope.instructorDuplicado = angular.copy($scope.editInstructor);
		var helper=HelpersFactory;
			$scope.EditarInstructor=function(){
				InstructoresService
					.setInstructores($scope.instructorDuplicado)
					.then(function(response){
						$scope.editInstructor = response;
						//agregar uno mas al areglo y pueda utilizar el get
						//cerrar popup
						helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();
},{}],28:[function(require,module,exports){
require('./pagos.controller');
require('./pagos.service');
require('./popupAgregar/popupAgregar.directive');
require('./popupModificar/popupModificar.directive');
require('./popupEliminar/popupEliminar.directive');
},{"./pagos.controller":29,"./pagos.service":30,"./popupAgregar/popupAgregar.directive":31,"./popupEliminar/popupEliminar.directive":32,"./popupModificar/popupModificar.directive":33}],29:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('PagosAdminController', PagosAdminController);

	PagosAdminController.$inject = ["$state","$scope","PagosService"];

	function PagosAdminController($state, $scope, PagosService){
		console.log("PagosAdmin controller");

		$scope.Pagos = [];

		//getPagos
		PagosService.getPagos().then(
			function(response){
			console.log(response)
			$scope.pagos = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],30:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')

	.service('PagosService', PagosService)

	PagosService.$inject=['$q','$http','constant'];

	function PagosService($q,$http, constants){

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





		//return de los metodos
		return{
			getPagos: getPagos
		};

	}

})();
},{}],31:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('pagosAgregar', pagosAgregar)
	function pagosAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/pagos/popupAgregar/popupAgregar.html'
		}
	}

})();
},{}],32:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('pagosEliminar', pagosEliminar)
	function pagosEliminar(){
		return{
			restrict:'E',
			templateUrl: './admin/pagos/popupEliminar/popupEliminar.html'
		}
	}

})();
},{}],33:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('pagosModificar', pagosModificar)
	function pagosModificar(){
		return{
			restrict:'E',
			templateUrl: './admin/pagos/popupModificar/popupModificar.html'
		}
	}

})();
},{}],34:[function(require,module,exports){
require('./retos.controller');
require('./retos.service');
require('./popupAgregar/popupAgregar.controller');
require('./popupAgregar/popupAgregar.directive');
require('./popupModificar/popupModificar.directive');
require('./popupEliminar/popupEliminar.directive');
require('./popupVer/popupVer.directive');
},{"./popupAgregar/popupAgregar.controller":35,"./popupAgregar/popupAgregar.directive":36,"./popupEliminar/popupEliminar.directive":37,"./popupModificar/popupModificar.directive":38,"./popupVer/popupVer.directive":39,"./retos.controller":40,"./retos.service":41}],35:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('RetosAgregarAdminController', RetosAgregarAdminController);

	RetosAgregarAdminController.$inject = ["$state","$scope","RetosService", "HelpersFactory", "constant"];

	function RetosAgregarAdminController($state, $scope, RetosService, HelpersFactory, constants){
		console.log("RetosAgregarAdmin controller");
		
		var helper = HelpersFactory;

		//addReto
		$scope.reto={};
		//imagen por default
		$scope.reto.imgReto=constants.imgDefault;

		//AddReto
		$scope.addRetos=function(){
			$scope.reto.no_registro = "1";
			RetosService
				.addRetos($scope.reto)
				.then(function(res){
					console.log(res);
					//agregar uno mas al areglo y pueda utilizar el get
					$scope.retos.push(res);
					//cerrar popup
					helper.popupClose();
				})
				.catch(function(err){
					console.log(err)
				});
		}


	}

})();
},{}],36:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('retosAgregar', retosAgregar)
	function retosAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/retos/popupAgregar/popupAgregar.html',
			controller: 'RetosAgregarAdminController'
		}
	}

})();
},{}],37:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('retosEliminar', retosEliminar)
	function retosEliminar(){
		return{
			restrict:'E',
			templateUrl: './admin/retos/popupEliminar/popupEliminar.html'
		}
	}

})();
},{}],38:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('retosModificar', retosModificar)
	function retosModificar(){
		return{
			restrict:'E',
			templateUrl: './admin/retos/popupModificar/popupModificar.html'
		}
	}

})();
},{}],39:[function(require,module,exports){
(function(){
	angular.module('gymApp.Admin')
	.directive('retosVer', retosVer)
	function retosVer(){
		return{
			restrict:'E',
			templateUrl: './admin/retos/popupVer/popupVer.html'
		}
	}

})();
},{}],40:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('RetosAdminController', RetosAdminController);

	RetosAdminController.$inject = ["$state","$scope","RetosService"];

	function RetosAdminController($state, $scope, RetosService){
		console.log("RetosAdmin controller");

		$scope.retos = [];

		//getRetos
		RetosService.getRetos().then(
			function(response){
			console.log(response)
			$scope.retos = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],41:[function(require,module,exports){
/*(function(){
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





		//return de los metodos
		return{
			getRetos: getRetos,
			addRetos: addRetos
		};

	}

})();*/
},{}],42:[function(require,module,exports){
(function(){
	//appTec - modulo principal (aplicacion)
	//modulo de rutas - ui-router
	angular.module('gymApp', [
		'ui.router',
		'angular-carousel',
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
							templateUrl: 'usuario/perfil/perfil.html'
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
},{}],43:[function(require,module,exports){
(function () {

angular
    .module('gymApp.constants',[])
    .constant('constant', {
        webService: 'http://localhost:8080/gym.app/back/index.php/', 
        imgDefault: 'http://localhost:8080/gym.app/back/imagenes/default.jpg'
    });

})();
},{}],44:[function(require,module,exports){
//manda a llamar a la libreria jquery
require('./app.module');
require('./constants');
require('./login/_login');
require('./_helpers/_helpers');
require('./admin/_admin');
require('./usuario/_usuario');

},{"./_helpers/_helpers":1,"./admin/_admin":6,"./app.module":42,"./constants":43,"./login/_login":45,"./usuario/_usuario":49}],45:[function(require,module,exports){
require('./login.module');
require('./login.controller');
require('./login.service');

},{"./login.controller":46,"./login.module":47,"./login.service":48}],46:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Login')
	.controller('LoginController', LoginController);

	LoginController.$inject = ["$state","$scope","LoginService"];

	function LoginController($state, $scope, LoginService){
		console.log("Login controller");
		$scope.usuario = {};

		$scope.addUsuario=function(){
			LoginService
				.login($scope.usuario)
				.then(function(data){
					if(data.tipoUsuario=="admin")
					{
						$state.go('admin.inicio')
					}
					else{
						if(data.tipoUsuario=="usuario")
						{
							$state.go('usuario.inicio')
						}
						else
						{
							alert('Usuario no registrado')
						}
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
},{}],47:[function(require,module,exports){
(function(){

	angular.module('gymApp.Login', []);

})();
},{}],48:[function(require,module,exports){
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
			
			$http.post(constants.webService + 'login', usuario)
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
},{}],49:[function(require,module,exports){
require('./usuario.module');
require('./inicio/_inicio');
require('./clases/_clases');
require('./retos/_retos');
require('./instructores/_instructores');
require('./pagos/_pagos');
require('./perfil/_perfil');
},{"./clases/_clases":50,"./inicio/_inicio":55,"./instructores/_instructores":58,"./pagos/_pagos":61,"./perfil/_perfil":63,"./retos/_retos":66,"./usuario.module":71}],50:[function(require,module,exports){
require('./clases.controller');
require('./popupDetalle/popupDetalle.directive');
require('./popupAgendar/popupAgendar.directive');
require('./clases.service');
},{"./clases.controller":51,"./clases.service":52,"./popupAgendar/popupAgendar.directive":53,"./popupDetalle/popupDetalle.directive":54}],51:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('ClasesController', ClasesController);

	ClasesController.$inject = ["$state","$scope","ClasesService"];

	function ClasesController($state, $scope, ClasesService){
		console.log("Clases controller");
		
		$scope.clases = [];

		//getClases
		ClasesService.getClases().then(
			function(response){
			console.log(response)
			$scope.clases = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],52:[function(require,module,exports){
/*(function(){
	angular.module('gymApp.Usuario')

	.service('ClasesService', ClasesService)

	ClasesService.$inject=['$q','$http','constant'];

	function ClasesService($q,$http, constants){

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





		//return de los metodos
		return{
			getClases: getClases
		};

	}

})();*/
},{}],53:[function(require,module,exports){
(function(){
	angular.module('gymApp.Usuario')
	.directive('claseAgendar', claseAgendar)
	function claseAgendar(){
		return{
			restrict:'E',
			templateUrl: './usuario/clases/popupAgendar/popupAgendar.html'
		}
	}

})();
},{}],54:[function(require,module,exports){
(function(){
	angular.module('gymApp.Usuario')
	.directive('claseDetalle', claseDetalle)
	function claseDetalle(){
		return{
			restrict:'E',
			templateUrl: './usuario/clases/popupDetalle/popupDetalle.html'
		}
	}

})();

},{}],55:[function(require,module,exports){
require('./inicio.service');
require('./inicio.controller');
},{"./inicio.controller":56,"./inicio.service":57}],56:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('InicioController', InicioController);

	InicioController.$inject = ["$state","$scope","InicioService"];

	function InicioController($state, $scope, InicioService){
		console.log("Inicio controller");

		$scope.banners = [];

		//getBanner
		InicioService.getBanner().then(
			function(response){
			console.log(response)
			$scope.banners = response;
			console.log(response);
		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],57:[function(require,module,exports){
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
},{}],58:[function(require,module,exports){
require('./instructores.controller');
require('./popupInformacion/popupInformacion.directive');
},{"./instructores.controller":59,"./popupInformacion/popupInformacion.directive":60}],59:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('InstructoresController', InstructoresController);

	InstructoresController.$inject = ["$state","$scope","InstructoresService"];

	function InstructoresController($state, $scope, InstructoresService){
		console.log("Instructores controller");
		
		$scope.instructores = [];
		//getInstructor
		InstructoresService.getInstructores().then(
			function(response){
			console.log(response)
			$scope.instructores = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
require('./pagos.controller');
},{"./pagos.controller":62}],62:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('PagosController', PagosController);

	PagosController.$inject = ["$state","$scope","PagosService"];

	function PagosController($state, $scope, PagosService){
		console.log("Pagos controller");

		$scope.Pagos = [];

		//getPagos
		PagosService.getPagos().then(
			function(response){
			console.log(response)
			$scope.pagos = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],63:[function(require,module,exports){
require('./perfil.controller');
require('./popupModificar/popupModificar.directive');

},{"./perfil.controller":64,"./popupModificar/popupModificar.directive":65}],64:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('PerfilController', PerfilController);

	function PerfilController(){
		console.log("Perfil controller");
	}

})();
},{}],65:[function(require,module,exports){
(function(){
	angular.module('gymApp.Usuario')
	.directive('perfilModificar', perfilModificar)
	function perfilModificar(){
		return{
			restrict:'E',
			templateUrl: './usuario/perfil/popupModificar/popupModificar.html'
		}
	}

})();
},{}],66:[function(require,module,exports){
require('./retos.module');
require('./retos.service');
require('./retos.controller');
require('./popupVer/popupVer.directive');
},{"./popupVer/popupVer.directive":67,"./retos.controller":68,"./retos.module":69,"./retos.service":70}],67:[function(require,module,exports){
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
},{}],68:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Retos')
	.controller('RetosController', RetosController);

	RetosController.$inject = ["$state","$scope","RetosService"];

	function RetosController($state, $scope, RetosService){
		console.log("Retos Controller");
		$scope.retos = [];

		//gerREtos
		RetosService.getRetos().then(
			function(response){
			console.log(response)
			$scope.retos = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();

},{}],69:[function(require,module,exports){
(function(){

	angular.module('gymApp.Retos', []);

})();
},{}],70:[function(require,module,exports){
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
},{}],71:[function(require,module,exports){
(function(){

	angular.module('gymApp.Usuario', []);

})();
},{}]},{},[44]);
