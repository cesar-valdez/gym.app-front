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