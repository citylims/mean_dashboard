app.controller('RegisterCtrl', function ($scope, $location, AuthService, $http ) {
  $scope.logout = function () {
    // call logout from service
    AuthService.logout()
      .then(function () {
        $location.path('/');
      });


  };
})
