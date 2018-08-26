var app = angular.module("PeeXApp", ['ui.router','toastr', 'pathgather.popeye']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('/', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: ('loginCtrl',loginCtrl)
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: ('registration-controller', RegistrationController)
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/dashboard.html',
            controller: ('logoutCtrl', logoutCtrl)
        })
        .state('dashboard.charts', {
            url: '/charts',
            templateUrl: 'views/dashboard/dashboardCharts.html',
            controller: ('dashboardCtrl', dashboardCtrl)
        })
        .state('dashboard.tables', {
            url: '/tables',
            templateUrl: 'views/dashboard/tables.html',
            controller:('expensesCtrl',expensesCtrl)
        })
        // .state('dashboard.user', {
        //     url: '/user',
        //     templateUrl: 'views/dashboard/user.html',
        //     controller: ('editUser',editUser)
        // })
        // .state('dashboard.recurringExpenses', {
        //     url: '/recurringExpenses',
        //     templateUrl: 'views/dashboard/recurringExpenses.html',
        //     controller: ('expensesCtrl',expensesCtrl)
        // })
        // .state('dashboard.addExpenses', {
        //     url: '/addExpenses',
        //     templateUrl: 'views/dashboard/addExpenses.html',
        //    controller: ('addExpensesCtrl',addExpensesCtrl)
        // })
        .state('dashboard.categoryList', {
            url: '/categoryList',
            templateUrl: 'views/dashboard/categoryList.html',
            controller: ('categoryCtrl',categoryCtrl)
        });
     
});

