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