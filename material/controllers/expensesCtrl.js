function expensesCtrl($scope,$http,toastr){
    console.log("adsdsa");
    $scope.myExpenses = [];
var refresh = function(){
   $http.get('/expenses').then(function(response){
       $scope.myExpenses = response.data;
  });
}
$scope.open = function () {
    $scope.visible = false;
    $scope.visible = $scope.visible = true;
}

$scope.close = function () {
    $scope.visible = true;
    $scope.visible = $scope.visible = false;
}

$scope.add = function(){
 $http.post('/expenses', $scope.expense).then(function successCallback(response) {
     $scope.expense = response.data;
     console.log($scope.expense);
        
        toastr.success("Successfully added");
        // window.location.reload();
        // pozovi categoryCtrk.reloadCategories
    });

    $scope.close();
   refresh();
}
refresh();

}