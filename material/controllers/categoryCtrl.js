function categoryCtrl($scope, $http, toastr, AuthenticationService) {
    AuthenticationService.guardCustomerAuthenticated();
    $scope.categoryList = [];
    $scope.addButtonVisible = false;
    $scope.hideAddButton = function () {
        $scope.addButtonVisible = false;
    }
    $scope.showAddButton = function () {
        $scope.addButtonVisible = true;
    }
    $scope.open = function () {
        $scope.visible = false;
        $scope.visible = $scope.visible = true;
    }

    $scope.close = function () {
        $scope.visible = true;
        $scope.visible = $scope.visible = false;
    }

    var refresh = function () {
        var headers = { headers: { 'token': AuthenticationService.getToken() } };
        $http.get('/category', headers).then(function (response) {
            $scope.categoryList = response.data;
        });
    }
    refresh();
    
    $scope.categoryName;
    $scope.newCategory = { category: '' };
    $scope.submit = true;
    $scope.submit = function () {
        var headers = { headers: { 'token': AuthenticationService.getToken() } }
        $scope.newCategory.category = $scope.categoryName;
        $http.post('/category', $scope.newCategory, headers).then(function successCallback(response) {
            toastr.success("Successfully added");
        }, function errorCallback(response) {
            alert("error");
        });
        $scope.close();
        refresh();

    }
    $scope.deleteCategory = function (id) {
        var headers = { headers: { 'token': AuthenticationService.getToken() } }
        $http.delete('/category/' + id, headers).then(function (response) {
            refresh();
            toastr.error('Deleted category');
        }
        );
    };

    $scope.editCategory = function (id) {
        var headers = { headers: { 'token': AuthenticationService.getToken() } }
        $http.get('/category/' + id, headers).then(function (response) {
            $scope.categoryName = response.data;
        });
    };
    $scope.update = function () {
        var headers = { headers: { 'token': AuthenticationService.getToken() } }
        $http.put('/category/' + $scope.category._id, $scope.category, headers).then(function (response) {
            refresh();
            toastr.info("category updated!");
        });
    };
refresh();
}