(function(){
	angular.module('gymApp.Admin')
	.directive('instructoresAgregar', instructoresAgregar)
	function instructoresAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/instructores/popupAgregar/popupAgregar.html'
		}
	}

})();