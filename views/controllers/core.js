var jitapp = angular.module("jitapp", ['ngRoute', 'ngSanitize']);

jitapp.config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/profile/calendar/',
        {
            controller: 'CalendarController',
            templateUrl: '/views/templates/calendar.partial.html'
        })
        .when('/profile/week/',
        {
            controller: 'WeekController',
            templateUrl: '/views/templates/week.partial.html'
        })
        .when('/profile/day/:label/',
        {
            controller: 'DayController',
            templateUrl: '/views/templates/day.partial.html',
            resolve: {label: function ($route, dayService) { return dayService.load($route.current.params.label); }}

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
    cal_data = cal.getMonthData();
    $scope.month_name = cal_data['month_name'];
    //$scope.calendar_html = cal.getHTML();
    var calendar_html = '<table class="calendar-table">';
    calendar_html += '<tr>';
    cal_data['month_data_head'].forEach(function(day, index){
        calendar_html += '<td>'+day+'</td>';
    })
    calendar_html += "</tr>";
    cal_data['month_data'].forEach(function(e1, i1){
        calendar_html += "<tr>";
        e1.forEach(function(e2, i2){
            if (e2 != 'blank') calendar_html += '<td><a href="/profile/day/'+e2+'/">'+e2+'</a></td>';
            else calendar_html += '<td>-</td>';
        });
        calendar_html += "</tr>";
    });
    calendar_html += "</table>";
    $scope.calendar_html = calendar_html;

    //$scope['label_3_1_content'] = '<input type="text" ng-model="test" />{{test}}';
});

jitapp.controller('WeekController', function($scope){

});

jitapp.controller('DayController', function($scope, dayService){
    $scope.label = dayService.data.label;
});

jitapp.factory('dayService', function($q, $timeout){
    return {
        data: {},
        load: function(label) {
            var defer = $q.defer();
            var data = this.data;
            $timeout(function () {
                data.label = label;
                defer.resolve(data);
            }, 1000);            
            return defer.promise;
        }
    };
});
