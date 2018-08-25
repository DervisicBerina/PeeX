function editUser($scope, $http){

    $scope.editUser = function (id) {
        console.log(id);
        $http.get('/users/' + id).then(function (response) {
            $scope.user = response;
        });
    };
    $scope.update = function () {
        console.log($scope.user._id);
        $http.put('/users/' + $scope.user._id, $scope.user).then(function (response) {
      
        });
    };
    $scope.editExpense = function (id) {
        var headers = { headers: { 'token': AuthenticationService.getToken() } }
        $http.get('/users/' + id, headers).then(function (response) {
            $scope.users = response.data;
        });
    };
    $scope.update = function () {
        var headers = { headers: { 'token': AuthenticationService.getToken() } }
        $http.put('/users/' + $scope.users._id, $scope.users, headers).then(function (response) {
            $scope.refresh();
            toastr.info("users updated!");
        });
    };
}
