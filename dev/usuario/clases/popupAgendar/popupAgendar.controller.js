(function() {

	//modulo al qe pertenece modificar
	angular.module('gymApp.Usuario')
	.controller('AgendarClaseController', AgendarClaseController);

	AgendarClaseController.$inject = ["$state","$scope","ClasesServiceAdmin", "InstructoresServiceAdmin", "HelpersFactory", "constant", "UsuarioFactory"];

	function AgendarClaseController($state, $scope, ClasesServiceAdmin, InstructoresServiceAdmin, HelpersFactory, constants, UsuarioFactory){
		console.log("AgendarClaseAdmin controller");
		var usuarioActual = UsuarioFactory.getInfo();

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

		//copiar los datos
		$scope.claseDup = angular.copy($scope.agendarClase);
		console.log($scope.claseDup)
		//$scope.claseDuplicado.newHora = $scope.agregarClase.hora;

		$scope.agendar=function(){
			
			var clase = {};
			clase.diaAg = $scope.claseDup.dia;
			clase.horaAg = $scope.claseDup.hora;
			clase.claseAg = $scope.claseDup.clase;
			clase.imgClaseAg = $scope.claseDup.imgClase;
			clase.horaDuracionAg = $scope.claseDup.horaDuracion;
			clase.minDuracionAg = $scope.claseDup.minDuracion;
			clase.id_instructor = $scope.claseDup.id_instructor;
			clase.no_registro = usuarioActual.no_registro;
				
				ClasesServiceAdmin
					.AgendarClase(clase)
					.then(function(response){
						console.log(response)
						//$scope.editClase.hora = response.newHora;
						//cerrar popup
						helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
		



	}

})();