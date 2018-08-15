function expensesCtrl($scope, $http, toastr) {
    console.log("adsdsa");

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
        $http.get('/expenses').then(function (response) {
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

    $http.get('/category').then(function (response) {
        $scope.categoryList = response.data;
    })

    $scope.add = function () {
        $scope.expense.type = $scope.selectedCategory.category;

        $http.post('/expenses', $scope.expense).then(function successCallback(response) {
            $scope.expense = response.data;
            toastr.success("Successfully added!");
        });

        $scope.close();
        $scope.loadExpenses();
    }

    $scope.deleteExpense = function (id) {
        $http.delete('/expenses/' + id).then(function (response) {
            $scope.refresh();
            toastr.error('Deleted expense');
        }
        );
    };

    $scope.editExpense = function (id) {
        $http.get('/expenses/' + id).then(function (response) {
            $scope.expense = response.data;
        });
    };
    $scope.update = function () {
        $http.put('/expenses/' + $scope.expense._id, $scope.expense).then(function (response) {
            $scope.refresh();
            toastr.info("Expenses updated!");
        });
    };

    $scope.loadExpenses();

}