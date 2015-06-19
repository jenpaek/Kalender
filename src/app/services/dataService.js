angular.module('angularBase')
.factory('dataService', function($http){
    var exports = {};

    exports.getData = function(){
        return $http.get('service/data');
    };

    return exports;
});
