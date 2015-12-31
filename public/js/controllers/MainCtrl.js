(function() {

'use strict';

angular
  .module('meanDashboard')
  .controller('MainCtrl', MainCtrl);

  function MainCtrl($scope, $location, AuthService, $http) {

    $scope.loginForm = {}
    $scope.registerForm = {}
    console.log(localStorage)

    $scope.$on('refresh-activity', function() {
      //check auth
    })

    $scope.login = function () {
      //put this in directive
      $scope.error = false;
      $scope.disabled = true;
      ///////////////////////
      AuthService.login($scope.loginForm)
        .then(function () {
          var email = $scope.loginForm.username
          $location.path('/dashboard');
          $scope.disabled = false;
          $scope.loginForm = {};
          var user = {
            email: email,
            admin: false
          }
          console.log(user)
          localStorage.setItem("user", JSON.stringify(user))
        })
        .catch(function () {
          $scope.error = true;
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };

  }
})();
