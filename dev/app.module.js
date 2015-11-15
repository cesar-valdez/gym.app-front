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