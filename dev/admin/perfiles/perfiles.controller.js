(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('PerfilesAdminController', PerfilesAdminController);

	PerfilesAdminController.$inject = ["$state","$scope","ClientesServiceAdmin" , "HelpersFactory", "constant"];
	
	function PerfilesAdminController($state, $scope, ClientesServiceAdmin, HelpersFactory, constants){
		console.log("PerfilesAdmin controller");


		$scope.clientes = [];
		var helper=HelpersFactory;

		var cliente = {};
			cliente.apellido = $scope.clientes.ClientesApellido;
			cliente.celular = $scope.clientes.ClientesCelular;
			cliente.correo = $scope.clientes.ClientesCorreo;
			cliente.domicilio = $scope.clientes.ClientesDomicilio;
			cliente.edad = $scope.clientes.ClientesEdad;
			cliente.estatura = $scope.clientes.ClientesEstatura;
			cliente.imgCliente = $scope.clientes.ClientesImgCliente;
			cliente.no_registro = $scope.clientes.ClientesNoRegistro;
			cliente.nombre = $scope.clientes.ClientesNombre;
			cliente.peso = $scope.clientes.ClientesPeso;
			cliente.correo = $scope.clientes.UsuariosCorreo;
			cliente.password = $scope.clientes.UsuariosPassword;
			cliente.tipoUsuario = $scope.clientes.UsuariosTipoUsuario;


		//getPerfil del cliente
		ClientesServiceAdmin
			.getClientes(cliente)
			.then(function(response){
				console.log(response)
				$scope.clientes = response;

		}).catch(function(err){
			console.log(err)
		});

		/*$scope.buscar = function(){
			$scope.filtro = $scope.search;
		}*/

	}

})();