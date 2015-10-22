(function(){
	//appTec - modulo principal (aplicacion)
	//modulo de rutas - ui-router
	angular.module('gymApp', [
		'ui.router',
		'gymApp.Helpers',
		'gymApp.Usuario',
		'gymApp.Admin',
		'gymApp.Login'
		])
	.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){ 
	
		$stateProvider
			.state('login', {
				url: '',
				templateUrl: './login/login.html'
			})
		$stateProvider
			.state('inicio', {
				url: '/inicio',
				templateUrl: 'usuario/inicio/inicio.html'
			})
		$stateProvider
			.state('inicioAdmin', {
				url: '/inicioAdmin',
				templateUrl: 'admin/inicio/inicio.html'
			})
		$stateProvider
			.state('clases', {
				url: '/clases',
				templateUrl: 'usuario/clases/clases.html'
			})
		$stateProvider
			.state('clasesAdmin', {
				url: '/clasesAdmin',
				templateUrl: 'admin/clases/clases.html'
			})
		$stateProvider
			.state('retos', {
				url: '/retos',
				templateUrl: 'usuario/retos/retos.html'
			})
		$stateProvider
			.state('retosAdmin', {
				url: '/retosAdmin',
				templateUrl: 'admin/retos/retos.html'
			})
		$stateProvider
			.state('instructores', {
				url: '/instructores',
				templateUrl: 'usuario/instructores/instructores.html'
			})
		$stateProvider
			.state('instructoresAdmin', {
				url: '/instructoresAdmin',
				templateUrl: 'admin/instructores/instructores.html'
			})
		$stateProvider
			.state('pagos', {
				url: '/pagos',
				templateUrl: 'usuario/pagos/pagos.html'
			})
		$stateProvider
			.state('pagosAdmin', {
				url: '/pagosAdmin',
				templateUrl: 'admin/pagos/pagos.html'
			})
	}])


})();