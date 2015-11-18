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

					//console.log(elem);
				elem.bind('click', function(e){
					//console.log('da click');
					//console.log(e.target);
					//
					//console.log( e.target != this)
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
require('./perfiles/_perfiles');
},{"./admin.module":7,"./clases/_clases":8,"./inicio/_inicio":16,"./instructores/_instructores":23,"./pagos/_pagos":30,"./perfiles/_perfiles":36,"./retos/_retos":40}],7:[function(require,module,exports){
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

	ClasesAgregarAdminController.$inject = ["$state","$scope","ClasesServiceAdmin", "InstructoresServiceAdmin", "HelpersFactory", "constant"];

	function ClasesAgregarAdminController($state, $scope, ClasesServiceAdmin, InstructoresServiceAdmin, HelpersFactory, constants){
		console.log("ClasesAgregarAdmin controller");

		//getinstructor, para mostrar todos los instructores en el campo 
		$scope.instructores = [];
		var helper = HelpersFactory;

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
			ClasesServiceAdmin
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
require('./inicio.directive');
require('./popupAgregar/popupAgregar.controller');
require('./popupEditar/popupEditar.controller');
require('./popupEliminar/popupEliminar.controller');
},{"./inicio.controller":17,"./inicio.directive":18,"./inicio.service":19,"./popupAgregar/popupAgregar.controller":20,"./popupEditar/popupEditar.controller":21,"./popupEliminar/popupEliminar.controller":22}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('BannerAgregarAdminController', BannerAgregarAdminController);

	BannerAgregarAdminController.$inject = ["$state","$scope","InicioServiceAdmin", "HelpersFactory", "constant"];

	function BannerAgregarAdminController($state, $scope, InicioServiceAdmin, HelpersFactory, constants){
		console.log("RetosAgregarAdmin controller");
		
		var helper = HelpersFactory;

		//addBanner
		$scope.bannerAgregar={};
		//imagen por default
		$scope.bannerAgregar.imgBanner=constants.imgDefaultBanner;

		//AddBanner
		$scope.addBanner=function(){
			InicioServiceAdmin
				.addBanner($scope.bannerAgregar)
				.then(function(res){
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
},{}],21:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetBannerAdminController', SetBannerAdminController);

	SetBannerAdminController.$inject = ["$state","$scope","InicioServiceAdmin" , "HelpersFactory", "constant"];

	function SetBannerAdminController($state, $scope, InicioServiceAdmin, HelpersFactory, constants){
		$scope.bannerDuplicado = angular.copy($scope.editBanner);
		
		var helper=HelpersFactory;
		
			$scope.EditarBanner=function(){
				InicioServiceAdmin
					.setBanner($scope.bannerDuplicado)
					.then(function(response){
						$scope.editBanner = response;
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
	.controller('DeleteBannerAdminController', DeleteBannerAdminController);

	DeleteBannerAdminController.$inject = ["$state","$scope","InicioServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteBannerAdminController($state, $scope, InicioServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		$scope.bannerDuplicado = angular.copy($scope.delBanner);
			
			$scope.eliminarBanner=function(){
				InicioServiceAdmin
					.deleteBanner($scope.bannerDuplicado)
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

},{}],23:[function(require,module,exports){
require('./instructores.controller');
require('./instructores.service');
require('./instructores.directive');
require('./popupAgregar/popupAgregar.controller');
require('./popupModificar/popupModificar.controller');
require('./popupEliminar/popupEliminar.controller');


},{"./instructores.controller":24,"./instructores.directive":25,"./instructores.service":26,"./popupAgregar/popupAgregar.controller":27,"./popupEliminar/popupEliminar.controller":28,"./popupModificar/popupModificar.controller":29}],24:[function(require,module,exports){
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
		
	}

})();
},{}],25:[function(require,module,exports){
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
				delInstructor : '='
			},
			templateUrl: './admin/instructores/popupEliminar/popupEliminar.html',
			controller: 'DeleteInstructoresAdminController',
		}
	}



})();
},{}],26:[function(require,module,exports){
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
},{}],27:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('AddInstructoresAdminController', AddInstructoresAdminController);

	AddInstructoresAdminController.$inject = ["$state","$scope","InstructoresServiceAdmin" , "HelpersFactory", "constant"];

	function AddInstructoresAdminController($state, $scope, InstructoresServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		$scope.instructor={};
		//imagen por default
		$scope.instructor.imgInstructor=constants.imgDefault;

		$scope.addInstructor=function(){
			InstructoresServiceAdmin
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
},{}],28:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteInstructoresAdminController', DeleteInstructoresAdminController);

	DeleteInstructoresAdminController.$inject = ["$state","$scope","InstructoresServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteInstructoresAdminController($state, $scope, InstructoresServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		$scope.instructorDuplicado = angular.copy($scope.delInstructor);
			$scope.deleteInstructor=function(){
				InstructoresServiceAdmin
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

},{}],29:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetInstructoresAdminController', SetInstructoresAdminController);

	SetInstructoresAdminController.$inject = ["$state","$scope","InstructoresServiceAdmin" , "HelpersFactory", "constant"];

	function SetInstructoresAdminController($state, $scope, InstructoresServiceAdmin, HelpersFactory, constants){
		$scope.instructorDuplicado = angular.copy($scope.editInstructor);
		
		var helper=HelpersFactory;
		
			$scope.EditarInstructor=function(){
				InstructoresServiceAdmin
					.setInstructores($scope.instructorDuplicado)
					.then(function(response){
						$scope.editInstructor = response;
						//cerrar popup
						helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();
},{}],30:[function(require,module,exports){
require('./pagos.controller');
require('./pagos.service');
require('./pagos.directive');
require('./popupAgregar/popupAgregar.controller');
require('./popupModificar/popupModificar.controller');
},{"./pagos.controller":31,"./pagos.directive":32,"./pagos.service":33,"./popupAgregar/popupAgregar.controller":34,"./popupModificar/popupModificar.controller":35}],31:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('PagosAdminController', PagosAdminController);

	PagosAdminController.$inject = ["$state","$scope","PagosServiceAdmin"];

	function PagosAdminController($state, $scope, PagosServiceAdmin){
		console.log("PagosAdmin controller");

		$scope.Pagos = [];

		var fechaActual = new Date();

		//getPagos
		PagosServiceAdmin.getPagos().then(
			function(response){
			console.log(response)
			$scope.pagos = response;

			for(var i=0; i < response.length; i++){
				console.log($scope.pagos[i].PagosFechaPago)
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
},{}],32:[function(require,module,exports){
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
				editPago : '='
			},
			templateUrl: './admin/pagos/popupModificar/popupModificar.html'
			//controller: 'SetPagosAdminController'
		}
	}

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
},{}],34:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('PagosAgregarAdminController', PagosAgregarAdminController);

	PagosAgregarAdminController.$inject = ["$state",'HelpersFactory', "$scope","PagosServiceAdmin", "ClientesServiceAdmin",'$filter'];

	function PagosAgregarAdminController($state,HelpersFactory,  $scope, PagosServiceAdmin, ClientesServiceAdmin,$filter){
		console.log("PagosAdmin controller");
		var helper = HelpersFactory;
		//seleccionar cliente en input
		$scope.selected = {};

		//getClientes
		ClientesServiceAdmin.getClientes().then(function(response){
			$scope.clientes = response;
		});



		//addPago
		$scope.newPago={};

		//AddPago
		$scope.addPagos=function(){
			//$scope.pago.no_registro = "1";
			$scope.newPago.no_registro = $scope.selected.no_registro;

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
							helper.popupClose();
							$state.reload();
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
},{}],35:[function(require,module,exports){

},{}],36:[function(require,module,exports){
require('./perfiles.controller');
require('./perfiles.service');
require('./perfiles.directive');
},{"./perfiles.controller":37,"./perfiles.directive":38,"./perfiles.service":39}],37:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],38:[function(require,module,exports){
arguments[4][35][0].apply(exports,arguments)
},{"dup":35}],39:[function(require,module,exports){
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
		}*/



		//return de los metodos
		return{
			getClientes: getClientes,
			getCliente: getCliente
		};

	}

})();
},{}],40:[function(require,module,exports){
require('./retos.controller');
require('./retos.service');
require('./retos.directive');
require('./popupAgregar/popupAgregar.controller');
require('./popupModificar/popupModificar.controller');
require('./popupEliminar/popupEliminar.controller');

},{"./popupAgregar/popupAgregar.controller":41,"./popupEliminar/popupEliminar.controller":42,"./popupModificar/popupModificar.controller":43,"./retos.controller":44,"./retos.directive":45,"./retos.service":46}],41:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('RetosAgregarAdminController', RetosAgregarAdminController);

	RetosAgregarAdminController.$inject = ["$state","$scope","RetosServiceAdmin", "HelpersFactory", "constant"];

	function RetosAgregarAdminController($state, $scope, RetosServiceAdmin, HelpersFactory, constants){
		console.log("RetosAgregarAdmin controller");
		
		var helper = HelpersFactory;

		//addReto
		$scope.reto={};
		//imagen por default
		$scope.reto.imgReto=constants.imgDefaultReto;

		//AddReto
		$scope.addRetos=function(){
			$scope.reto.no_registro = "1";

			$scope.reto.fechaPago = false;

			RetosServiceAdmin
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
},{}],42:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('DeleteRetosAdminController', DeleteRetosAdminController);

	DeleteRetosAdminController.$inject = ["$state","$scope","RetosServiceAdmin" , "HelpersFactory", "constant"];

	function DeleteRetosAdminController($state, $scope, RetosServiceAdmin, HelpersFactory, constants){
		
		var helper=HelpersFactory;

		$scope.retoDuplicado = angular.copy($scope.delReto);
			$scope.deleteReto=function(){
				RetosServiceAdmin
					.deleteRetos($scope.retoDuplicado)
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

},{}],43:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('SetRetosAdminController', SetRetosAdminController);

	SetRetosAdminController.$inject = ["$state","$scope","RetosServiceAdmin" , "HelpersFactory", "constant"];

	function SetRetosAdminController($state, $scope, RetosServiceAdmin, HelpersFactory, constants){

		$scope.retoDuplicado = angular.copy($scope.editReto);
		var helper=HelpersFactory;
		
			$scope.EditarReto=function(){
				RetosServiceAdmin
					.setRetos($scope.retoDuplicado)
					.then(function(response){
						$scope.editReto = response;
						//cerrar popup
						helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();
},{}],44:[function(require,module,exports){
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
},{}],45:[function(require,module,exports){
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
},{}],46:[function(require,module,exports){
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
},{}],47:[function(require,module,exports){
(function(){
	//appTec - modulo principal (aplicacion)
	//modulo de rutas - ui-router
	angular.module('gymApp', [
		'ui.router',
		'swxSessionStorage',
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
							controller: 'PerfilController'
							
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
},{}],48:[function(require,module,exports){
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
},{}],49:[function(require,module,exports){
//manda a llamar a la libreria jquery
require('./app.module');
require('./constants');
require('./login/_login');
require('./_helpers/_helpers');
require('./admin/_admin');
require('./usuario/_usuario');

},{"./_helpers/_helpers":1,"./admin/_admin":6,"./app.module":47,"./constants":48,"./login/_login":50,"./usuario/_usuario":56}],50:[function(require,module,exports){
require('./login.module');
require('./login.controller');
require('./login.service');
require('./login.directive');
require('./popupRegistrar/popupRegistrar.controller');

},{"./login.controller":51,"./login.directive":52,"./login.module":53,"./login.service":54,"./popupRegistrar/popupRegistrar.controller":55}],51:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Login')
	.controller('LoginController', LoginController);

	LoginController.$inject = ["$state","$scope","LoginService", "UsuarioFactory"];

	function LoginController($state, $scope, LoginService, UsuarioFactory){
		console.log("Login controller");
		$scope.usuario = {};
		var usuario = UsuarioFactory;

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
							}

						} else {
							console.log(data.msj)
						}
					} else {
						console.log(data.msj)
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
},{}],52:[function(require,module,exports){
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
},{}],53:[function(require,module,exports){
(function(){

	angular.module('gymApp.Login', []);

})();
},{}],54:[function(require,module,exports){
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
},{}],55:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Login')
	.controller('LoginRegistrarController', LoginRegistrarController);

	LoginRegistrarController.$inject = ["$state","$scope","LoginService", "InstructoresServiceAdmin", "HelpersFactory", "constant"];

	function LoginRegistrarController($state, $scope, LoginService, InstructoresServiceAdmin, HelpersFactory, constants){
		console.log("LoginRegistrar controller");

		$scope.registro={};
		var helper = HelpersFactory;
		//imagen por default
		$scope.registro.imgCliente=constants.imgDefault;

	}

})();
},{}],56:[function(require,module,exports){
require('./usuario.module');
require('./usuario.service');
require('./usuario.factory');
require('./inicio/_inicio');
require('./clases/_clases');
require('./retos/_retos');
require('./instructores/_instructores');
require('./pagos/_pagos');
require('./perfil/_perfil');
},{"./clases/_clases":57,"./inicio/_inicio":61,"./instructores/_instructores":63,"./pagos/_pagos":66,"./perfil/_perfil":68,"./retos/_retos":72,"./usuario.factory":76,"./usuario.module":77,"./usuario.service":78}],57:[function(require,module,exports){
require('./clases.controller');
require('./popupDetalle/popupDetalle.directive');
require('./popupAgendar/popupAgendar.directive');
},{"./clases.controller":58,"./popupAgendar/popupAgendar.directive":59,"./popupDetalle/popupDetalle.directive":60}],58:[function(require,module,exports){
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
},{}],59:[function(require,module,exports){
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
},{}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
require('./inicio.controller');
},{"./inicio.controller":62}],62:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('InicioController', InicioController);

	InicioController.$inject = ["$state","$scope","InicioServiceAdmin"];

	function InicioController($state, $scope, InicioServiceAdmin){
		console.log("Inicio controller");

		$scope.banners = [];

		//getBanner
		InicioServiceAdmin.getBanner().then(
			function(response){
			console.log(response)
			$scope.banners = response;
			console.log(response);
		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],63:[function(require,module,exports){
require('./instructores.controller');
require('./popupInformacion/popupInformacion.directive');
},{"./instructores.controller":64,"./popupInformacion/popupInformacion.directive":65}],64:[function(require,module,exports){
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
},{}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
require('./pagos.controller');
},{"./pagos.controller":67}],67:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('PagosController', PagosController);

	PagosController.$inject = ["$state","$scope","PagosServiceAdmin"];

	function PagosController($state, $scope, PagosServiceAdmin){
		console.log("Pagos controller");

		$scope.Pagos = [];

		//getPagos
		PagosServiceAdmin.getPagos().then(
			function(response){
			console.log(response)
			$scope.pagos = response;
		}).catch(function(err){
			console.log(err)
		});
	}

})();
},{}],68:[function(require,module,exports){
require('./perfil.controller');
require('./perfil.directive');
require('./popupModificar/popupModificar.controller');

},{"./perfil.controller":69,"./perfil.directive":70,"./popupModificar/popupModificar.controller":71}],69:[function(require,module,exports){
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
},{}],70:[function(require,module,exports){
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
},{}],71:[function(require,module,exports){
(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Usuario')
	.controller('ModificarPerfilController', ModificarPerfilController);

	ModificarPerfilController.$inject = ["$state","$scope","ClientesServiceAdmin", "InstructoresServiceAdmin", "HelpersFactory", "constant"];

	function ModificarPerfilController($state, $scope, ClientesServiceAdmin, InstructoresServiceAdmin, HelpersFactory, constants){
		console.log("ModificarPerfil controller");

		$scope.registro={};
		var helper = HelpersFactory;
		//imagen por default
		$scope.registro.imgCliente=constants.imgDefault;
		
	}

})();
},{}],72:[function(require,module,exports){
require('./retos.module');
require('./retos.controller');
require('./popupVer/popupVer.directive');
},{"./popupVer/popupVer.directive":73,"./retos.controller":74,"./retos.module":75}],73:[function(require,module,exports){
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
},{}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
(function(){

	angular.module('gymApp.Retos', []);

})();
},{}],76:[function(require,module,exports){
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
},{}],77:[function(require,module,exports){
(function(){

	angular.module('gymApp.Usuario', []);

})();
},{}],78:[function(require,module,exports){
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
},{}]},{},[49]);
