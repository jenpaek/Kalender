angular
    .module('angularBase',[
        'templates',
        'ui.router',
        'ui.router.state',
        'ngMaterial',
        'ngAria'
    ])
    .config(appConfig);

function appConfig ($stateProvider, $urlRouterProvider){
    $stateProvider.state('hello', {
        url: '/hello',
        templateUrl: 'app/hello/hello.tpl.html',
        controller: 'helloCtrl'
    });

    $urlRouterProvider.otherwise('/hello');
}