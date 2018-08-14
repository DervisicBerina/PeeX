function expensesCtrl($scope, $http, toastr) {
    console.log("adsdsa");
    $scope.myExpenses = [];
    var refresh = function () {
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
        console.log(response.data);
    })

    $scope.add = function () {
        $http.post('/expenses', $scope.expense).then(function successCallback(response) {

            $scope.expense = response.data;
            console.log($scope.expense);
            toastr.success("Successfully added!");
        });

        $scope.close();
        refresh();
    }
    refresh();
    $scope.deleteExpense = function (id) {
        console.log(id);
        $http.delete('/expenses/' + id).then(function (response) {
            refresh();
            toastr.error('Deleted expense');
        });

    };
    $scope.editExpense = function (id) {
        console.log(id);
        $http.get('/expenses/' + id).then(function (response) {
            $scope.expense = response;
        });
    };
    $scope.update = function () {
        console.log($scope.expense._id);
        $http.put('/expenses/' + $scope.expense._id, $scope.expense).then(function (response) {
            $scope.expense.name = ''
            $scope.expense.cost = ''
            $scope.expense.type = ''
            $scope.expense.date = ''
            // refresh();
        });
    };
}