angular.module('app', ['ngStorage', 'ngRoute', 'ngResource'])  

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/index.html',
            controller: 'BaseController'
        })

        .when('/Senators', {
            templateUrl: '/senators.html',
            controller: 'SenatorController'
        })

        .when('/Senators/:id', {
            templateUrl: '/senatorDetails.html',
            controller: 'SenatorDetailCtrl'
        })

        .when('/signin', {
            templateUrl: 'partials/signin.html',
            controller: 'HomeCtrl'
        })
        
        .when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'HomeCtrl'
        })
        
        .when('/me', {
            templateUrl: 'partials/me.html',
            controller: 'HomeCtrl'
        })
        
        .otherwise({
            redirectTo: '/'
        });
}]);
