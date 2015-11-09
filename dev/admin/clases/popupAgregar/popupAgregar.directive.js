(function(){
	angular.module('gymApp.Admin')
	.directive('clasesAgregar', clasesAgregar)
	function clasesAgregar(){
		return{
			restrict:'E',
			templateUrl: './admin/clases/popupAgregar/popupAgregar.html'
		}
	}

})();