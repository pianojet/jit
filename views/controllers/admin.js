var jitapp_admin = angular.module("jitapp_admin", ['ngRoute']);

jitapp.config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/user',
        {
            controller: 'UserController',
            templateUrl: '/views/templates/user.partial.html'
        })
        .otherwise({ redirectTo: '/'});
        $locationProvider.html5Mode(true);
}]);