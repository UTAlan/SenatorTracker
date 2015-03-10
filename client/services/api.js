angular.module('SenTracker')
    .factory('API', function($http) {
        return {
            getLegislations: function() {
                return $http.get('http://localhost:3000/api/legislations');
            },
            getLegislationById: function(legislation_id) {
                return $http.get('http://localhost:3000/api/legislations/' + legislation_id);
            },
            getSenators: function() {
                return $http.get('http://localhost:3000/api/senators');
            },/*,
            getMediaById: function(id) {
                return $http.get('http://instagram-server.herokuapp.com/api/media/' + id);
            },
            likeMedia: function(id) {
                return $http.post('http://instagram-server.herokuapp.com/api/like', { mediaId: id });
            }*/
        }
    }
);
