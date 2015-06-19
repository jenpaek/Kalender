angular.module('angularBase')
.controller('helloCtrl', function($scope, resolveData){
    $scope.data = resolveData.data;
});
