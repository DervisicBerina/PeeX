function register($scope, $http) {

    var refresh = function () {
        $http.get('/users').then(function (response) {
            console.log("I got data");
            $scope.person;
        });
    }
    refresh();
    $scope.register = function () {
        console.log($scope.person);
        $http.post('/users', $scope.person).then(function (response) {
            console.log(response);
            refresh();
        });
    }

}