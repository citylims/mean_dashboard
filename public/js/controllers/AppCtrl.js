angular.module('meanDashboard').controller('AppCtrl',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService, $http ) {

    // console.log(AuthService.getUserStatus());

    $scope.loginForm = {}
    $scope.registerForm = {}
    // $scope.user = JSON.parse(localStorage)
    // console.log(user);
    $scope.navUser = ""
    console.log(localStorage)

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.userName, $scope.loginForm.password)

        // handle success
        .then(function () {
          var email = $scope.loginForm.userName
          $location.path('/profile');
          $scope.disabled = false;
          $scope.loginForm = {};
          var user = {
            email: email
          }
          console.log(user)
          localStorage.setItem("user", JSON.stringify(user))
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

    // init()


}]);
