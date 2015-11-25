(function(){
	angular.module('gymApp.Helpers')
	.directive('popupAdd', popupAdd)
	.directive('popupClose', popupClose)
	.directive('fileUpload', fileUpload)
	
	popupAdd.$inject=['$compile']
	
	function popupAdd($compile){
		return {
			restrict:'A',
			link: function(scope, elem, attrs){
				var body = angular.element(document).find('body');

				elem.bind('click', function(){

					console.log(attrs.popupAdd);
					body.append($compile(attrs.popupAdd)(scope))
				})
			
				/*$('#login, .popupForm-cancel').click(function(e){
					if(e.target !=this) return;
					$('login').remove();
				});*/
			}
		}
	}

	popupClose.$inject = ['$state'];
	function popupClose($state){
		return {
			restrict:'A',
			link: function(scope, elem, attrs){

					//console.log(elem);
				elem.bind('click', function(e){
					//console.log('da click');
					//console.log(e.target);
					//
					//console.log( e.target != this)
					if(e.target != this && !angular.element(e.target).hasClass('popup-close')) return

					elem.remove();
					$state.reload();
				})
			}
		}
	}

	fileUpload.$inject = ['HelpersService'];

		function fileUpload(HelpersService){
			return {
				restrict: 'A',
				scope:{
					fileUpload:'='
				},
				link: function(scope, element, attrs) {
					element.bind('change', function(){
						var file = element[0].files[0];
						HelpersService
							.upload(file)
							.then(function(response){
								scope.fileUpload = response.url;
							})
							.catch(function(response){
								console.log(response);
							});
					});
				}
			}
		}


})();

