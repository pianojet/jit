var jitapp = angular.module("jitapp", []);

var controllers = {};

controllers.NavController = function($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}

controllers.CalendarController = function($scope) {
}

controllers.WeekController = function($scope) {
}

controllers.DayController = function($scope) {
}

jitapp.controller(controllers);

jitapp.config(function($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: 'CalendarController',
            templateUrl: 'calendar.partial.html'
        })
        .when('/week',
        {
            controller: 'WeekController',
            templateUrl: 'week.partial.html'
        }
        .when('/day',
        {
            controller: 'DayController',
            templateUrl: 'day.partial.html'
        }
        .otherwise({ redirectTo: '/'})
});
