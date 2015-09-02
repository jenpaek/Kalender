angular
    .module('angularBase',[
        'templates',
        'ui.router',
        'ui.router.state'
    ])
    .config(appConfig);

function appConfig ($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('hello', {
        url: '/hello',
        templateUrl: 'app/hello/hello.tpl.html',
        controller: 'helloCtrl',
        resolve: {
            resolveData: function(dataService){
                return dataService.getData();
            }
        }
    });
    $urlRouterProvider.otherwise('/hello');
}