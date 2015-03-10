angular.module('SenTracker')
    .controller('SenatorsCtrl', function($scope, $rootScope, API) {
        API.getSenators().success(function(data) {
            $scope.senators = data;
        });
    }
);
