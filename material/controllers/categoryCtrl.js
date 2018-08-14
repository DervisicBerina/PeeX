function categoryCtrl($scope, $http, toastr) {

    $scope.categoryList = [];
    var refresh = function () {
        $http.get('/category').then(function (response) {
            $scope.categoryList = response.data;
        });
    }
    refresh();
    $scope.open = function () {
        $scope.visible = false;
        $scope.visible = $scope.visible = true;
    }

    $scope.close = function () {
        $scope.visible = true;
        $scope.visible = $scope.visible = false;
    }

    $scope.categoryName;
    $scope.newCategory = { category: '' };
    $scope.submit = true;
    $scope.submit = function () {
        $scope.newCategory.category = $scope.categoryName;
        $http.post('/category', $scope.newCategory).then(function successCallback(response) {
            console.log("added");
            console.log(response);
            toastr.success("Successfully added");
            // window.location.reload();
            // pozovi categoryCtrk.reloadCategories
        }, function errorCallback(response) {
            alert("error");
        });
        $scope.close();
        refresh();

    }
}