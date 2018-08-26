function dashboardCtrl($scope, $http, AuthenticationService){
    AuthenticationService.guardCustomerAuthenticated();
    $scope.myExpenses = [];
    $scope.expense;
  
    console.log("Initializing dashboard");

    $scope.refresh = function () {
        $scope.loadExpenses();
    }
    $scope.loadExpenses = function () {
        var userId = AuthenticationService.getUserId();
        var headers = { headers: { 'token': AuthenticationService.getToken(),'user_id':userId } }
        $http.get('/expensesLastList', headers).then(function (response) {
            $scope.myExpenses = response.data;

        });
        $http.get('/sumExpenses',headers).then(function(response){
            $scope.sum = response.data.total;
        })
       
    }
    
        $scope.refresh();
}