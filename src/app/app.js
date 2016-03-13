angular
    .module('angularBase',[
        'templates',
        'ui.router',
        'ui.router.state',
        'ngMaterial',
        'ngAria'
    ])
    .config(appConfig);

function appConfig ($stateProvider, $urlRouterProvider, $mdThemingProvider){
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'app/home/home.tpl.html',
        controller: 'homeCtrl',
        controllerAs: 'home',
    });

    $urlRouterProvider.otherwise('/home');

    var customPrimary = {
        '50': '#60d2ff',
        '100': '#47cbff',
        '200': '#2dc4ff',
        '300': '#14bdff',
        '400': '#00b3f9',
        '500': '#00a1e0',
        '600': '#008fc6',
        '700': '#007cad',
        '800': '#006a93',
        '900': '#00587a',
        'A100': '#7adaff',
        'A200': '#93e1ff',
        'A400': '#ade8ff',
        'A700': '#004560'
    };
    $mdThemingProvider
        .definePalette('customPrimary', 
                        customPrimary);

    var customAccent = {
        '50': '#ffdb74',
        '100': '#ffd45b',
        '200': '#ffcd41',
        '300': '#ffc728',
        '400': '#ffc00e',
        '500': '#f4b400',
        '600': '#daa100',
        '700': '#c18e00',
        '800': '#a77c00',
        '900': '#8e6900',
        'A100': '#ffe18e',
        'A200': '#ffe8a7',
        'A400': '#ffefc1',
        'A700': '#745600'
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
       .accentPalette('customAccent', {
            'default': '500'
       })
       .warnPalette('customWarn')
       .backgroundPalette('customBackground');
}