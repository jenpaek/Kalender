angular.module('angularBase',[
    'templates',
    'ui.router'
])
.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('hello', {
        url: '/hello',
        templateUrl: 'app/hello/hello.tpl.html',
        controller: 'helloCtrl'
    });
    $urlRouterProvider.otherwise('/hello');
});
