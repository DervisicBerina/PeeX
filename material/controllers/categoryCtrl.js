app.controller('categoryCtrl',function($scope,$http){
    $scope.categoryList = [];
   $http.get('/category').then(function(response){
       $scope.categoryList = response.data;
   }) 
});
app.controller('nonrecuringCategoryCtrl',function($scope,$http){
    $scope.categoryList = [];
   $http.get('/category/nonrecurringType').then(function(response){
       $scope.categoryList = response.data;
   }) 
});
app.controller('nonrecuringCategoryCtrl',function($scope,$http){
    $scope.categoryList = [];
   $http.get('/category').then(function(response){
       $scope.categoryList = response.data;
   }) 
});
app.controller('typeCtrl',function($scope,$http){
$scope.addCategory = function(){
    console.log($scope.category);
    $http.post('/category',$scope.category).success(function(response){
        console.log(response);
    });
}
})
