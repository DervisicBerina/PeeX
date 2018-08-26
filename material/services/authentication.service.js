app.service('AuthenticationService', function ($location) {
    this.getToken = function () {
        return localStorage.getItem('user').token;
    }
    this.getUserId = function () {
        return localStorage.getItem('user').user_id;
    }
    this.isCustomerLogedin = function () {
        if (this.getToken() !== null) {
            return true;
        }
        return false;
    }
    this.guardCustomerAuthenticated = function () {
        if (!this.isCustomerLogedin()) {
            $location.url('/login');
        }
    }
    this.deleteToken = function () {
        localStorage.removeItem('user');
    }
});
