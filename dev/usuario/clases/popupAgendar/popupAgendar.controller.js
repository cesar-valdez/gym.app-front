(function() {

	//modulo al qe pertenece modificar
	angular.module('gymApp.Usuario')
	.controller('AgendarClaseController', AgendarClaseController);

	AgendarClaseController.$inject = ["$compile", "$state","$scope","ClasesServiceAdmin", "InstructoresServiceAdmin", "HelpersFactory", "constant", "UsuarioFactory"];

	function AgendarClaseController($compile, $state, $scope, ClasesServiceAdmin, InstructoresServiceAdmin, HelpersFactory, constants, UsuarioFactory){
		console.log("AgendarClaseAdmin controller");
		var usuarioActual = UsuarioFactory.getInfo();

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
						if(response.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ response.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ response.msj +"'></mensaje-error>")($scope));
						}
						//$scope.editClase.hora = response.newHora;
						//cerrar popup
						//helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
		



	}

})();