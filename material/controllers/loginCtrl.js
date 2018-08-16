function loginCtrl($scope, $http, toastr, $location) {
    $scope.check_login = function () {
        if (localStorage.getItem('user')) {
            return true;

        }
        return false;
    }

    $scope.check_admin = function () {
        if (localStorage.getItem('type') == "admin") {
            return true;
        }
        return false;
    }

    $scope.login = function (credentials) {
        $http.post('/login', credentials).then(function (response) {
            if (typeof response.data.token != 'undefined') {
                $location.url('/charts');
                localStorage.setItem('user', response.data.token);
                localStorage.setItem('type', response.data.type);
                toastr.success('You are successfully logged in!', 'Login Success!');
                $location.url('/charts');

            }
            else if (response.data.user == false) {
                toastr.error('Login Error');
                $location.url('/login');
            }

        }
        ), function (response) {
            console.log(error);
        }
    }
}
