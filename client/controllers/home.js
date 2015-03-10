angular.module('SenTracker')
    .controller('HomeCtrl', function($scope, $window, $rootScope, $auth, API) {
        API.getLegislations().success(function(data) {
            $scope.legislations = data["legislations"];
            $scope.votes = data["votes"];
            $scope.senators = data["senators"];
        });

        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };
    }
);
