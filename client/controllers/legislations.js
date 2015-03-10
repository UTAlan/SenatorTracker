angular.module('SenTracker')
    .controller('LegislationsCtrl', function($scope, $rootScope, API) {
        API.getLegislations().success(function(data) {
            $scope.legislations = data["legislations"];
            $scope.votes = data["votes"];
            $scope.senators = data["senators"];
        });
/*
        $scope.like = function() {
            $scope.hasLiked = true;
            API.likeMedia(mediaId).error(function(data) {
                sweetAlert('Error', data.message, 'error');
            });
        };
*/
    }
);
