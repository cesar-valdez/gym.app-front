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