function register($scope, $http) {

    var refresh = function () {
        $http.get('/users').then(function (response) {
            console.log("I got data");
            $scope.person;
        });
    }
    refresh();
    $scope.register = function () {
        console.log($scope.person);
        $http.post('/users', $scope.person).then(function (response) {
            console.log(response);
            refresh();
        });
    }
//     var app = angular.module('myApp', []);
// app.directive('myDirective', function() {
//   return {
//     require: ,
//     link: function(scope, element, attr, mCtrl) {
//       function myValidation(value) {
//         if (value.indexOf("e") > -1) {
//           mCtrl.$setValidity('charE', true);
//         } else {
//           mCtrl.$setValidity('charE', false);
//         }
//         return value;
//       }
//       mCtrl.$parsers.push(myValidation);
//     }
//   };
// });

}