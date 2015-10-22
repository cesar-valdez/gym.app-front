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