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
          
            // refresh();
            $scope.user.username = ''
            $scope.user.email = ''
            $scope.user.firstname = ''
            $scope.user.lastname = ''
            $scope.user.password = ''
        });
    };
}
