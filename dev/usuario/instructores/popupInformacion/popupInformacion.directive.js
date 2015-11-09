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
