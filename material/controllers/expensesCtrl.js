function expensesCtrl($scope, $http, toastr, AuthenticationService) {

    AuthenticationService.guardCustomerAuthenticated();
    $scope.myExpenses = [];
    $scope.selectedCategory;
    $scope.expense;
    $scope.addButtonVisible = false;

    $scope.hideAddButton = function () {
        $scope.addButtonVisible = false;
    }
    $scope.showAddButton = function () {
        $scope.addButtonVisible = true;
    }
    $scope.refresh = function () {
        $scope.loadExpenses();
    }
    $scope.loadExpenses = function () {
        var headers = { headers: { 'token': AuthenticationService.getToken() } }
        $http.get('/expenses', headers).then(function (response) {
            $scope.myExpenses = response.data;
        });
    }

    $scope.open = function () {
        $scope.visible = false;
        $scope.visible = $scope.visible = true;
    }

    $scope.close = function () {
        $scope.visible = true;
        $scope.visible = $scope.visible = false;
    }
    $scope.loadCategories = function () {
        var headers = { headers: { 'token': AuthenticationService.getToken() } };
        $http.get('/category', headers).then(function (response) {
            $scope.categoryList = response.data;
        });
    }
    $scope.add = function () {
        $scope.expense.type = $scope.selectedCategory.category;
        $scope.expense.user_id = '5b75a69918cbf48fecc49d99';
        var headers = { headers: { 'token': AuthenticationService.getToken() } }
        $http.post('/expenses', $scope.expense, headers).then(function successCallback(response) {
            $scope.expense = {};
            toastr.success("Successfully added!");
        });

        $scope.close();
        $scope.loadExpenses();
    }

    $scope.deleteExpense = function (id) {
        var headers = { headers: { 'token': AuthenticationService.getToken() } }
        $http.delete('/expenses/' + id, headers).then(function (response) {
            $scope.refresh();
            toastr.error('Deleted expense');
        }
        );
    };

    $scope.editExpense = function (id) {
        var headers = { headers: { 'token': AuthenticationService.getToken() } }
        $http.get('/expenses/' + id, headers).then(function (response) {
            $scope.expense = response.data;
        });
    };
    $scope.update = function () {
        var headers = { headers: { 'token': AuthenticationService.getToken() } }
        $http.put('/expenses/' + $scope.expense._id, $scope.expense, headers).then(function (response) {
            $scope.refresh();
            toastr.info("Expenses updated!");
        });
    };

    $scope.loadExpenses();
    $scope.loadCategories();
}