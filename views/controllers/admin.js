var jitapp_admin = angular.module("jitapp_admin", ['ngRoute']);

jitapp_admin.config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/admin/users',
        {
            controller: 'UserController',
            templateUrl: '/views/templates/user.partial.html'
        })
        .otherwise({ redirectTo: '/'});
        $locationProvider.html5Mode(true);
}]);

jitapp_admin.controller('NavController', function($scope, $location){
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };    
});

jitapp_admin.controller('UserController', function($scope, $http){
    $http.get('/api/users').success(function(data){
        $scope.user_list = data;
    });
});

