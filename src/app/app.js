angular
    .module('angularBase',[
        'templates',
        'ui.router',
        'ui.router.state',
        'ngMaterial',
        'ngAria',
        'ngMdIcons'
    ])
    .config(appConfig);

function appConfig ($stateProvider, $urlRouterProvider, $mdThemingProvider){
    $stateProvider.state('hello', {
        url: '/hello',
        templateUrl: 'app/hello/hello.tpl.html',
        controller: 'helloCtrl'
    });

    $urlRouterProvider.otherwise('/hello');

    var customPrimary = {
        '50': '#bbd9ed',
        '100': '#a7cde8',
        '200': '#93c2e3',
        '300': '#7eb7de',
        '400': '#6aabd8',
        '500': '#56a0d3',
        '600': '#4295ce',
        '700': '#3388c3',
        '800': '#2e7aaf',
        '900': '#286c9b',
        'A100': '#cfe4f3',
        'A200': '#e4f0f8',
        'A400': '#f8fbfd',
        'A700': '#235e86',
        'contrastDefaultColor': 'light'
    };
    $mdThemingProvider
        .definePalette('customPrimary', 
                        customPrimary);

    var customAccent = {
        '50': '#c5df90',
        '100': '#bad97c',
        '200': '#b0d368',
        '300': '#a6cd55',
        '400': '#9bc841',
        '500': '#8eb936',
        '600': '#7fa530',
        '700': '#70922a',
        '800': '#617e25',
        '900': '#516a1f',
        'A100': '#cfe4a4',
        'A200': '#d9eab7',
        'A400': '#e4f0cb',
        'A700': '#425619'
    };
    $mdThemingProvider
        .definePalette('customAccent', 
                        customAccent);

    var customWarn = {
        '50': '#f6bb99',
        '100': '#f4ac81',
        '200': '#f19c6a',
        '300': '#ef8d53',
        '400': '#ed7d3b',
        '500': '#eb6e24',
        '600': '#e16115',
        '700': '#ca5712',
        '800': '#b24c10',
        '900': '#9b420e',
        'A100': '#f8cbb0',
        'A200': '#fadac8',
        'A400': '#fceadf',
        'A700': '#83380c'
    };
    $mdThemingProvider
        .definePalette('customWarn', 
                        customWarn);

    var customBackground = {
        '50': '#ffffff',
        '100': '#ffffff',
        '200': '#ffffff',
        '300': '#ffffff',
        '400': '#fbfbfb',
        '500': '#eee',
        '600': '#e1e1e1',
        '700': '#d4d4d4',
        '800': '#c8c8c8',
        '900': '#bbbbbb',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#aeaeae'
    };
    $mdThemingProvider
        .definePalette('customBackground', 
                        customBackground);

   $mdThemingProvider.theme('default')
       .primaryPalette('customPrimary')
       .accentPalette('customAccent')
       .warnPalette('customWarn')
       .backgroundPalette('customBackground');
}