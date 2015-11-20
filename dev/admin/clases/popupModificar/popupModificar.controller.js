(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('ClasesModificarAdminController', ClasesModificarAdminController);

	ClasesModificarAdminController.$inject = ["$state","$scope","ClasesServiceAdmin", "InstructoresServiceAdmin", "HelpersFactory", "constant"];

	function ClasesModificarAdminController($state, $scope, ClasesServiceAdmin, InstructoresServiceAdmin, HelpersFactory, constants){
		console.log("ClasesMOdificarAdmin controller");

		//getinstructor, para mostrar todos los instructores en el campo 
		$scope.instructores = [];
		var helper = HelpersFactory;

		InstructoresServiceAdmin
			.getInstructores()
			.then(function(response){
				$scope.instructores = response;

		}).catch(function(err){
			console.log(err)
		});


		$scope.claseDuplicado = angular.copy($scope.editClase);
		$scope.claseDuplicado.newHora = $scope.editClase.hora;

		$scope.setClase=function(){
			console.log($scope.claseDuplicado)
				ClasesServiceAdmin
					.setClases($scope.claseDuplicado)
					.then(function(response){
						console.log(response)
						$scope.editClase.hora = response.newHora;
						$scope.editClase = response;
						//cerrar popup
						helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
		



	}

})();