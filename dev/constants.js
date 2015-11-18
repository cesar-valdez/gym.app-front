(function () {

angular
    .module('gymApp.constants',[])
    .constant('constant', {
        webService: 'http://localhost:8080/gym.app/back/index.php/', 
        imgDefault: 'http://localhost:8080/gym.app/back/imagenes/default.jpg',
        imgDefaultReto: 'http://localhost:8080/gym.app/back/imagenes/defaultReto.jpg',
        imgDefaultClase: 'http://localhost:8080/gym.app/back/imagenes/defaultClase.jpg',
         imgDefaultBanner: 'http://localhost:8080/gym.app/back/imagenes/defaultBanner.jpg'
    });

})();