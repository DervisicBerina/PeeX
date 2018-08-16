function logoutCtrl($scope, AuthenticationService, $location) {
    $scope.logout = function () {
        AuthenticationService.deleteToken();
        $location.url('/login');
    }
}