(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('RetosAgregarAdminController', RetosAgregarAdminController);

	RetosAgregarAdminController.$inject = ["$compile", "$state","$scope","RetosServiceAdmin", "HelpersFactory", "constant"];

	function RetosAgregarAdminController($compile, $state, $scope, RetosServiceAdmin, HelpersFactory, constants){
		console.log("RetosAgregarAdmin controller");
		
		var helper = HelpersFactory;
		//validacion con mensaje ok y error
		var body = angular.element(document).find('body');


		//addReto
		$scope.reto={};
		//imagen por default
		$scope.reto.imgReto=constants.imgDefaultReto;

		//AddReto
		$scope.addRetos=function(){
			$scope.reto.no_registro = "12";

			$scope.reto.fechaPago = false;

			RetosServiceAdmin
				.addRetos($scope.reto)
				.then(function(res){
					console.log(res);
					//agregar uno mas al areglo y pueda utilizar el get
					$scope.retos.push(res);

					//validacion con mensaje error y ok
					if(res.estatus == 'ok'){
						helper.popupClose();
						body.append($compile("<mensaje-ok ok='"+ res.msj +"'></mensaje-ok>")($scope));
						//$state.reload();
					} else {
						helper.popupClose();
						body.append($compile("<mensaje-error error='"+ res.msj +"'></mensaje-error>")($scope));
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