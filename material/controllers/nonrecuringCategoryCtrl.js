app.controller('nonrecuringCategoryCtrl',function($scope,$http){
    $scope.categoryList = [];
   $http.get('/category/nonrecurringType').then(function(response){
       $scope.categoryList = response.data;
   }) 
});
