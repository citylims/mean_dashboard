angular.module('meanDashboard').controller('AppCtrl',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService, $http) {

    // console.log(AuthService.getUserStatus());

    $scope.loginForm = {}

    $scope.user = {status: "NOT LOGGED IN"}


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
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

      $scope.user = {
        status: $scope.loginForm.userName + " is logged in"
      }
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

      console.log(AuthService.getUserStatus());

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/');
        });

        $scope.user = {
          status: "Logged out"
        }
    };


    $scope.getUsers = function() {
      AuthService.getUsers().then(function(data) {
        console.log(data);
        console.log("YEssir")
      }, function(err) {
        console.log(err);
      })
    }

}]);


//
// angular.module('meanDashboard').controller('logoutController',
//   ['$scope', '$location', 'AuthService',
//   function ($scope, $location, AuthService) {
//
//     $scope.logout = function () {
//
//       console.log(AuthService.getUserStatus());
//
//       // call logout from service
//       AuthService.logout()
//         .then(function () {
//           $location.path('/login');
//         });
//
//     };
//
// }]);
//
// angular.module('meanDashboard').controller('registerController',
//   ['$scope', '$location', 'AuthService',
//   function ($scope, $location, AuthService) {
//
//     // console.log(AuthService.getUserStatus());
//
//     $scope.register = function () {
//
//       // initial values
//       $scope.error = false;
//       $scope.disabled = true;
//
//       // call register from service
//       AuthService.register($scope.registerForm.username, $scope.registerForm.password)
//         // handle success
//         .then(function () {
//           $location.path('/login');
//           $scope.disabled = false;
//           $scope.registerForm = {};
//         })
//         // handle error
//         .catch(function () {
//           $scope.error = true;
//           $scope.errorMessage = "Something went wrong!";
//           $scope.disabled = false;
//           $scope.registerForm = {};
//         });
//
//     };
//
// }]);
