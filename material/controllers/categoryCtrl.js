app.controller('categoryCtrl',function($scope,$http){
    $scope.categoryList = [];
   $http.get('/category').then(function(response){
       $scope.categoryList = response.data;
   }) 
   $scope.open = function () {
    $scope.visible = false;
    $scope.visible = $scope.visible = true;
  }

  $scope.close = function () {
    $scope.visible = true;
    $scope.visible = $scope.visible = false;
  }
  $scope.categoryList = [];
    // $scope.categoryType;
    $scope.categoryName;
    $scope.newCategory = {category:'', type:''};

    $http.get('/category').then(function(response){
        $scope.categoryList = response.data;
        console.log(response.data);
    })
    $scope.submit = true;

   

    $scope.submit = function() {
        $scope.newCategory.category = $scope.categoryName;
        // $scope.newCategory.type = $scope.categoryType.type;
        $http.post('/category', $scope.newCategory).then(function successCallback(response){
            console.log("added");
            console.log(response);
            window.location.reload();// pozovi categoryCtrk.reloadCategories
           toastr.success("added");
        },function errorCallback(response) {
            alert("error");
          });
       
         
    }
});
// app.controller('nonrecuringCategoryCtrl',function($scope,$http){
//     $scope.categoryList = [];
//    $http.get('/category/nonrecurringType').then(function(response){
//        $scope.categoryList = response.data;
//    }) 
// });
// app.controller('nonrecuringCategoryCtrl',function($scope,$http){
//     $scope.categoryList = [];
//    $http.get('/category').then(function(response){
//        $scope.categoryList = response.data;
//    }) 
// });
// app.controller('typeCtrl',function($scope,$http){
// $scope.addCategory = function(){
//     console.log($scope.category);
//     $http.post('/category',$scope.category).success(function(response){
//         console.log(response);
//     });
// }
// })
