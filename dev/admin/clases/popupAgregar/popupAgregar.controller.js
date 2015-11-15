(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('ClasesAgregarAdminController', ClasesAgregarAdminController);

	ClasesAgregarAdminController.$inject = ["$state","$scope","ClasesService", "InstructoresService", "HelpersFactory", "constant"];

	function ClasesAgregarAdminController($state, $scope, ClasesService, InstructoresService, HelpersFactory, constants){
		console.log("ClasesAgregarAdmin controller");

		//getinstructor, para mostrar todos los instructores en el campo 
		$scope.instructores = [];
		var helper = HelpersFactory;

		InstructoresService
			.getInstructores()
			.then(function(response){
				$scope.instructores = response;

		}).catch(function(err){
			console.log(err)
		});


		//addClase
		$scope.clase={};
		//imagen por default
		$scope.clase.imgClase=constants.imgDefault;

		//AddClase
		$scope.addClases=function(){
			$scope.clase.no_registro = "1";
			var d = ["Lunes", "Martes", "Miercoles", "Jueves","Viernes", "Sabado", "Domingo"];
			//var insertExitoso = false;
			var days =[];
			for(var i = 0; i <=7; i++){
				//console.log($scope.dias)
				if($scope.clase.dias[i] == true){
					//console.log(d[i]);
					days.push(d[i]);
				}

			}
			$scope.clase.dias = days;
			console.log($scope.clase)
			ClasesService
				.addClases($scope.clase)
				.then(function(res){

					console.log("res");
					console.log(res);

					var todoBien=true;

					var mensaje = "";
					for(i = 0; i < res.length; i++){
						if(res.estatus == 'error'){
							mensaje+= "Ya existe una clase para el día: " + res.dia + " y la hora: " + res.hora;
							mensaje+=" ------------ "
						}
					}
						//console.log(mensaje)
					//insertar clases



					for(var i=0; i < res.length; i++){
						if(res[i].estatus == "success"){
							var clasesInsertar = angular.copy($scope.clase)
							delete clasesInsertar.dias;
							clasesInsertar.dia = res[i].dia;
							$scope.clases.push(clasesInsertar);
						}
					}

						helper.popupClose();
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