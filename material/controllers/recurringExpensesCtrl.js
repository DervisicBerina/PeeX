app.controller('recurringExpensesCtrl', function($scope,$http,toastr){
    $scope.categoryList = [];
    $scope.categoryType;
    $scope.categoryName;
    $scope.newCategory = {category:'', type:''};
    $http.get('/category').then(function(response){
        $scope.categoryList = response.data;
        console.log(response.data);
    }) 
    $scope.submit = true;
    $scope.submit = function() {
        $scope.newCategory.category = $scope.categoryName;
        $scope.newCategory.type = $scope.categoryType.type;
        $http.post('/category', $scope.newCategory).then(function successCallback(response){
            console.log("added");
            console.log(response);
           toastr.success("added");
           
        },function errorCallback(response) {
            alert("error");
          });
       
      }
});
app.filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});