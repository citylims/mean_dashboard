(function() {

'use strict';

angular
  .module('meanDashboard')
  .controller('DashboardCtrl', DashboardCtrl);

  function DashboardCtrl($scope, $location, AuthService, $http) {

    $scope.logout = function () {
      localStorage.removeItem("user")
      AuthService.logout().then(function () {
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

    $scope.getSeed = function() {
      $http.get("/api/seed").success(function(data) {
        console.log(data)
      }).error(function(err){
        console.log(err)
      })
    }

    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchName   = '';     // set the default search/filter term

    $scope.records = [
      { name: 'Austin', email: 'austin@email.com', rating: 2 },
      { name: 'Philly', email: 'philly@email.com', rating: 4 },
      { name: 'Armaan', email: 'armaan@email.com', rating: 7 },
      { name: 'Dae', email: 'dae@email.com', rating: 6 }
    ];

  }
})()
