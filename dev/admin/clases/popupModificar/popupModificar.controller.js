(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('ClasesModificarAdminController', ClasesModificarAdminController);

	ClasesModificarAdminController.$inject = ["$compile", "$state","$scope","ClasesServiceAdmin", "InstructoresServiceAdmin", "HelpersFactory", "constant"];

	function ClasesModificarAdminController($compile, $state, $scope, ClasesServiceAdmin, InstructoresServiceAdmin, HelpersFactory, constants){
		console.log("ClasesModificarAdmin controller");

		//getinstructor, para mostrar todos los instructores en el campo 
		$scope.instructores = [];
		var helper = HelpersFactory;

		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');


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

						//validacion con mensaje error y ok
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						//cerrar popup
						//helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
		



	}

})();