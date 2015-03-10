angular.module('SenTracker')
    .controller('LegislationsDetailCtrl', function($scope, $rootScope, $location, API) {
        var legislation_id = $location.path().split('/').pop();

        API.getLegislationById(legislation_id).success(function(data) {
            $scope.legislation = data["legislation"];
            $scope.votes = data["votes"];
            $scope.senators = data["senators"];
        });
    }
);
