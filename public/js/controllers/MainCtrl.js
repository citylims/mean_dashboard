app.controller('MainCtrl', function ($scope, $location, AuthService, $http ) {

    $scope.loginForm = {}
    $scope.registerForm = {}
    // $scope.user = JSON.parse(localStorage)
    // console.log(user);
    console.log(localStorage)

    $scope.$on('refresh-activity', function() {
    })

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;
      

      // call login from service
      AuthService.login($scope.loginForm)

        // handle success
        .then(function () {
          var email = $scope.loginForm.userName
          $location.path('/dashboard');
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

    // $scope.register = function () {
    //
    //   // initial values
    //   $scope.error = false;
    //   $scope.disabled = true;
    //
    //   // call register from service
    //   AuthService.register($scope.registerForm.username, $scope.registerForm.password)
    //     // handle success
    //     .then(function () {
    //       $location.path('/login');
    //       $scope.disabled = false;
    //       $scope.registerForm = {};
    //     })
    //     // handle error
    //     .catch(function () {
    //       $scope.error = true;
    //       $scope.errorMessage = "Something went wrong!";
    //       $scope.disabled = false;
    //       $scope.registerForm = {};
    //     });
    //
    // };






    // init()


});
