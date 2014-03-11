jetapp_admin.factory('userService', function($scope, $http) {
    var userService = {};
    userService.users = {};

    userService.getUsers = function () {
        $http.get('')
    };

});