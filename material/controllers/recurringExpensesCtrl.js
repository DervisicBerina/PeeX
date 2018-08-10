app.controller('recurringExpensesCtrl', function($scope,$http){
    $scope.categoryList = [];
    $http.get('/category').then(function(response){
        debugger
        $scope.categoryList = response.data;
        console.log(response.data);
    }) 
   
})
