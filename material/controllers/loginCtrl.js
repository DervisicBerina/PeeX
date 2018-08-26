function loginCtrl($scope, $http, toastr, $location) {
    $scope.check_login = function () {
        if (localStorage.getItem('user')) {
            return true;
        }
        return false;
    }
    $scope.login = function (credentials) {
        $http.post('/login', credentials).then(function (response) {
            if (typeof response.data.token != 'undefined') {
                localStorage.setItem('user', response.data);
                $location.url('dashboard/charts');

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
