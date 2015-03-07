angular.module('app', ['ngRoute', 'ngResource'])

.controller('BaseController', ['$scope', 'SenatorInfo', function ($scope, SenatorInfo) {
    
}])

.controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', function($rootScope, $scope, $location, $localStorage, Main) {
    $scope.signin = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        }

        Main.signin(formData, function(res) {
            if (res.type == false) {
                alert(res.data)    
            } else {
                $localStorage.token = res.data.token;
                window.location = "/";    
            }
        }, function() {
            $rootScope.error = 'Failed to signin';
        })
    };

    $scope.signup = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        }

        Main.save(formData, function(res) {
            if (res.type == false) {
                alert(res.data)
            } else {
                $localStorage.token = res.data.token;
                window.location = "/"   
            }
        }, function() {
            $rootScope.error = 'Failed to signup';
        })
    };

    $scope.me = function() {
        Main.me(function(res) {
            $scope.myDetails = res;
        }, function() {
            $rootScope.error = 'Failed to fetch details';
        })
    };

    $scope.logout = function() {
        Main.logout(function() {
            window.location = "/"
        }, function() {
            alert("Failed to logout!");
        });
    };
    $scope.token = $localStorage.token;
}])

.controller('SenatorController', ['$scope', 'SenatorInfo', function ($scope, SenatorInfo) {
    var Senators = SenatorInfo[0];
    var Parties = SenatorInfo[1];
    var States = SenatorInfo[2];

    Senators.success(function(data) {
        $scope.senators = data;
    }).error(function(data, status) {
        console.log(data, status);
        $scope.senators = [];
    });

    $scope.selectedParty = null;

    Parties.success(function(data) {
        $scope.parties = data;
    }).error(function(data, status) {
        console.log(data, status);
        $scope.parties = [];
    });

    $scope.selectedState = null;

    States.success(function(data) {
        $scope.states = data;
    }).error(function(data, status) {
        console.log(data, status);
        $scope.states = [];
    });

    $scope.save = function(){
        if($scope.newSenator && $scope.newSenator.length >= 1) {
            var senator = new Senators({ name: { first: $scope.newSenator.firstName, last: $scope.newSenator.lastName } });

            senator.$save(function(){
                $scope.senators.push(senator);
                $scope.newSenator = '';
            });
        } /*else if($scope.newState && $scope.newState.length >= 1) {
            var state = new State({ name: $scope.newState.name });

            state.$save(function(){
                $scope.state.push(state);
                $scope.newState = '';
            });
        }*/
    }
}])

.controller('SenatorDetailCtrl', ['$scope', '$routeParams', 'Senators', function ($scope, $routeParams, Senators) {
    $scope.senators = Senators[$routeParams.id];
}]);