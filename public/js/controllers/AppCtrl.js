angular.module('meanDashboard').controller('AppCtrl',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService, $http) {

    // console.log(AuthService.getUserStatus());

    $scope.loginForm = {}
    $scope.registerForm = {}

    if (AuthService.isLoggedIn() === false) {
      $scope.status = false
    } else {
      $scope.status = true
    }



    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.userName, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/profile');
          $scope.disabled = false;
          $scope.loginForm = {};
          localStorage.setItem("status", true)
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

      // currentUser()
    };

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

    $scope.logout = function () {
      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/');
        });


    };


    $scope.getUsers = function() {
      AuthService.getUsers().then(function(data) {
        console.log(data);

      }, function(err) {
        console.log(err);
      })
    }

    var init = function() {
      var log = AuthService.isLoggedIn();
      console.log(log)
      $scope.logged
      if (log) {
        $scope.loggedIn = "Logged In"
      } else {
        $scope.loggedIn = "Logged Out"
      }
    }
    // init()


}]);
