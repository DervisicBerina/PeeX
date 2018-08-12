app.controller('expensesCtrl',function($scope,$http){
    $scope.myExpenses = [];
   $http.get('/expenses').then(function(response){
       $scope.myExpenses = response.data;
   }) 
}); 