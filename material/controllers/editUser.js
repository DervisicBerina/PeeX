function editUser($scope, $http,AuthenticationService){
    
    AuthenticationService.guardCustomerAuthenticated();
    $scope.user = [];
    $scope.editUser = function (id) {
        var headers = { headers: { 'token': AuthenticationService.getToken() } }
        $http.get('/users/' + id, headers).then(function (response) {
            $scope.users = response.data;
        });
    };
    $scope.update = function () {
        var headers = { headers: { 'token': AuthenticationService.getToken() } }
        $http.put('/users/' + $scope.users._id, $scope.user, headers).then(function (response) {
            $scope.refresh();
            toastr.info("users updated!");
        });
    };
}
