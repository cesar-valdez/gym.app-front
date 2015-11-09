(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Login')
	.controller('LoginController', LoginController);

	LoginController.$inject = ["$state","$scope","LoginService"];

	function LoginController($state, $scope, LoginService){
		console.log("Login controller");
		$scope.usuario = {};

		$scope.addUsuario=function(){
			LoginService
				.login($scope.usuario)
				.then(function(data){
					if(data.tipoUsuario=="admin")
					{
						$state.go('admin.inicio')
					}
					else{
						if(data.tipoUsuario=="usuario")
						{
							$state.go('usuario.inicio')
						}
						else
						{
							alert('Usuario no registrado')
						}
					} 
				})
				.catch(function(error){
					console.log(error);
				});
		}
		/*LoginService.obtenerUsuarios().then
			(function(data){
				$scope.usuarios=data;
				console.log(data);
		}).catch(function(error){
			$scope.usuarios=error;
		});*/
	}

})();