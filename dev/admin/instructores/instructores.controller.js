(function() {

	//modulo al qe pertenece
	angular.module('gymApp.Admin')
	.controller('InstructoresAdminController', InstructoresAdminController);

	InstructoresAdminController.$inject = ["$state","$scope","InstructoresService" , "HelpersFactory", "constant"];

	function InstructoresAdminController($state, $scope, InstructoresService, HelpersFactory, constants){
		console.log("InstructoresAdmin controller");
		
		$scope.instructores = [];
		var helper=HelpersFactory;


		//getinstructor
		InstructoresService
			.getInstructores()
			.then(function(response){
				console.log(response)
				$scope.instructores = response;

		}).catch(function(err){
			console.log(err)
		});



			//addInstructor
			$scope.instructor={};
			//imagen por default
			$scope.instructor.imgInstructor=constants.imgDefault;

			$scope.addInstructor=function(){
				InstructoresService
					.addInstructores($scope.instructor)
					.then(function(response){
						console.log("response")
						console.log(response)
						//agregar uno mas al areglo y pueda utilizar el get
						$scope.instructores.push(response);
						//cerrar popup
						helper.popupClose();
					})
					.catch(function(err){
							console.log(err)
					});
			}
	}

})();