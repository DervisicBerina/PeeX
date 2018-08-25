function dashboardCtrl($scope, $http){
    console.log("Initializing dashboard");
    //     <script>
    //     $(document).ready(function() {
    //         // Javascript method's body can be found in assets/js/demos.js
    //         md.initDashboardPageCharts();
    //     });
    // </script>
        md.initDashboardPageCharts();

        $scope.loadExpenses = function () {
            var headers = { headers: { 'token': AuthenticationService.getToken() } }
            $http.get('/expensesLastList', headers).then(function (response) {
                $scope.myExpenses = response.data;
            });
        }
}