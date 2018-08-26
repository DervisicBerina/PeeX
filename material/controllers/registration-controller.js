function RegistrationController($scope, $http, toastr, $location) {
  $scope.add_user = function () {
    $http.post('/register', $scope.user).then(function (data) {
      console.log(data.status);
      if (data.status == 202) {
        toastr.info("Use another email");
      } else {
        // $scope.users_list = [];
        $scope.user = null;
        toastr.success("You are successfully registered! Please Login!", "Registration Successfull!");
        $location.url('/login');
        // $scope.users_list.push(data);
      }
    });
  }
}