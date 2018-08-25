function dashboardCtrl($scope, $http, AuthenticationService){
    AuthenticationService.guardCustomerAuthenticated();
        $scope.loadExpenses = function () {
            var headers = { headers: { 'token': AuthenticationService.getToken() } }
            $http.get('/expensesLastList', headers).then(function (response) {
                $scope.myExpenses = response.data;
            });
        }
}