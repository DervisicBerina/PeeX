function RegistrationController($scope, $http, toastr, $location) {
  console.log("Hello from Registration Controller");

  $scope.add_user = function () {
    $http.post('/register', $scope.user).then(function (data) {
      if (data.status == 202) {
        toastr.error("Use another email");

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