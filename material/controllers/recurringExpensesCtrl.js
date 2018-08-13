app.controller('recurringExpensesCtrl', function($scope,$http){
    $scope.categoryList = [];
    $http.get('/category').then(function(response){
        $scope.categoryList = response.data;
        console.log(response.data);
    }) 
    
    $scope.submit = function(launch_toast) {
        console.log($scope.category)
        $http.post('/category', $scope.category).then(function(response){
            console.log("added");
            console.log(response);
            var x = document.getElementById("toast")
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        },function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
       
            
        
      }
    
    
})
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