var app = angular.module("PeeXApp", ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('/', {
            url: '/login',
            templateUrl: 'views/login.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/dashboard.html'
        })
        .state('dashboard.charts', {
            url: '/charts',
            templateUrl: 'views/dashboard/dashboardCharts.html',
            controller: 'dashboardCtrl'
        })
        .state('dashboard.tables', {
            url: '/tables',
            templateUrl: 'views/dashboard/tables.html'
        })
        .state('dashboard.user', {
            url: '/user',
            templateUrl: 'views/dashboard/user.html'
        })
        .state('dashboard.recurringExpenses', {
            url: '/recurringExpenses',
            templateUrl: 'views/dashboard/recurringExpenses.html'
        })
        .state('dashboard.addExpenses', {
            url: '/addExpenses',
            templateUrl: 'views/dashboard/addExpenses.html'
        });
});