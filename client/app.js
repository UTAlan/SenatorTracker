angular.module('SenTracker', ['ngRoute', 'ngMessages', 'satellizer'])
    .config(function($routeProvider, $authProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/legislations', {
                templateUrl: 'views/legislations.html',
                controller: 'LegislationsCtrl'
            })
            .when('/legislations/:id', {
                templateUrl: 'views/legislationsDetail.html',
                controller: 'LegislationsDetailCtrl'
            })
            .when('/senators', {
                templateUrl: 'views/senators.html',
                controller: 'SenatorsCtrl'
            })
            .otherwise('/');

        $authProvider.loginUrl = 'http://localhost:3000/auth/login';
        $authProvider.signupUrl = 'http://localhost:3000/auth/signup';
    }
)
.run(function($rootScope, $window, $auth) {
    if ($auth.isAuthenticated()) {
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
    }
});
