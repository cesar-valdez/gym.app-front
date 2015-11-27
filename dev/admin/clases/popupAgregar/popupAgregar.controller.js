(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('ClasesAgregarAdminController', ClasesAgregarAdminController);

	ClasesAgregarAdminController.$inject = ["$compile", "$state","$scope","ClasesServiceAdmin", "InstructoresServiceAdmin", "HelpersFactory", "constant"];

	function ClasesAgregarAdminController($compile, $state, $scope, ClasesServiceAdmin, InstructoresServiceAdmin, HelpersFactory, constants){

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


		//addClase
		$scope.clase={};
		//imagen por default
		$scope.clase.imgClase=constants.imgDefaultClase;

		//AddClase
		$scope.addClases=function(){
			$scope.clase.no_registro = "12";
			var d = ["Lunes", "Martes", "Miercoles", "Jueves","Viernes", "Sabado", "Domingo"];
			//var insertExitoso = false;
			var days =[];
			for(var i = 0; i <=7; i++){
				if($scope.clase.dias[i] == true){
					days.push(d[i]);
				}

			}
			$scope.clase.dias = days;
			ClasesServiceAdmin
				.addClases($scope.clase)
				.then(function(res){

					if(res.estatus == 'ok'){
							helper.popupClose();
							body.append($compile("<mensaje-ok ok='"+ res.msj +"'></mensaje-ok>")($scope));
							//$state.reload();
						} else {
							helper.popupClose();
							body.append($compile("<mensaje-error error='"+ res.msj +"'></mensaje-error>")($scope));
						}

					var todoBien=true;

					var mensaje = "";
					for(i = 0; i < res.length; i++){
						if(res.estatus == 'error'){
							mensaje+= "Ya existe una clase para el día: " + res.dia + " y la hora: " + res.hora;
							mensaje+=" ------------ "
						}
					}
					//insertar clases
					for(var i=0; i < res.length; i++){
						if(res[i].estatus == "success"){
							var clasesInsertar = angular.copy($scope.clase)
							delete clasesInsertar.dias;
							clasesInsertar.dia = res[i].dia;
							$scope.clases.push(clasesInsertar);
						}
					}

						//helper.popupClose();
						//reload para que el popup no cierre pero los  campos queden en blanco
						//$state.reload();

					/*if(todoBien){
					}*/
				})
				.catch(function(err){
					console.log(err)
				});
		}


	}

})();