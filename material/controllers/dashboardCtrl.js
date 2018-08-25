function dashboardCtrl($scope, $http){

        $scope.loadExpenses = function () {
            var headers = { headers: { 'token': AuthenticationService.getToken() } }
            $http.get('/expensesLastList', headers).then(function (response) {
                $scope.myExpenses = response.data;
            });
        }
}