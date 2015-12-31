(function() {

'use strict';

angular
  .module('meanDashboard')
  .controller('RegisterCtrl', RegisterCtrl);

  function RegisterCtrl($scope, $location, AuthService, $http) {

    $scope.registerForm = {}
    $scope.register = function () {

      $scope.error = false;
      $scope.disabled = true;

      AuthService.register($scope.registerForm)
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });
    };

  };

})();
