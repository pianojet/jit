var jitapp = angular.module("jitapp", ['ngRoute', 'ngSanitize']);

jitapp.config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/profile/calendar',
        {
            controller: 'CalendarController',
            templateUrl: '/views/templates/calendar.partial.html'
        })
        .when('/profile/week',
        {
            controller: 'WeekController',
            templateUrl: '/views/templates/week.partial.html'
        })
        .when('/profile/day',
        {
            controller: 'DayController',
            templateUrl: '/views/templates/day.partial.html'
        })
        //.when('/logout', {controller: 'LogoutController'})
        .otherwise({ redirectTo: '/'});
        $locationProvider.html5Mode(true);
}]);

jitapp.directive('dynamiccalendar', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamiccalendar, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});

// jitapp.controller('LogoutController', function($location) {
//     Session.clear();
//     $location.path('/logout');
// });

jitapp.controller('NavController', function($scope, $location){
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };    
});

jitapp.controller('CalendarController', function($scope){
    var cal = new Calendar();
    cal.generateHTML();
    $scope.calendar_html = cal.getHTML();

});

jitapp.controller('WeekController', function($scope){

});

jitapp.controller('DayController', function($scope){

});

// function NavController($scope, $location) {
//     $scope.isActive = function (viewLocation) { 
//         return viewLocation === $location.path();
//     };    
// }

// function CalendarController($scope) {

// }

// function WeekController($scope) {
    
// }

// function DayController($scope) {
    
// }

// var controllers = {};

// controllers.NavController = function($scope) {
//     // $scope.isActive = function (viewLocation) { 
//     //     return viewLocation === $location.path();
//     // };
// };

// controllers.CalendarController = function($scope) {
// };

// controllers.WeekController = function($scope) {
// };

// controllers.DayController = function($scope) {
// };

// jitapp.controller(controllers);


