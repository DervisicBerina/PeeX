function dashboardCtrl($scope, $http, AuthenticationService){
    AuthenticationService.guardCustomerAuthenticated();
    $scope.myExpenses = [];
    $scope.expense;
    console.log("Initializing dashboard");
//     <script>
//     $(document).ready(function() {
//         // Javascript method's body can be found in assets/js/demos.js
//         md.initDashboardPageCharts();
//     });
// </script>
    // md.initDashboardPageCharts();
    
    $scope.refresh = function () {
        $scope.loadExpenses();
    }
    $scope.loadExpenses = function () {
        var headers = { headers: { 'token': AuthenticationService.getToken() } }
        $http.get('/expensesLastList', headers).then(function (response) {
            $scope.myExpenses = response.data;
        });
    }

        // $scope.loadExpenses = function () {
        //     var headers = { headers: { 'token': AuthenticationService.getToken() } }
        //     $http.get('/expensesLastList', headers).then(function (response) {
        //         $scope.myExpenses = response.data;
        //     });
        // }
        $scope.refresh();
}