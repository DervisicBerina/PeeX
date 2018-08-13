function expensesCtrl($scope,$http){
    $scope.categoryList = [];
   $http.get('/category').then(function(response){
       $scope.categoryList = response.data;
   }) 
   
} 