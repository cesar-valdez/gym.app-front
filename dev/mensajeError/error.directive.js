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