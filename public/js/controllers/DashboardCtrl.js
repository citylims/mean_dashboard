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

    function apiCall() {

    }

    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchFish   = '';     // set the default search/filter term

    // create the list of sushi rolls
    $scope.sushi = [
      { name: 'Austn', fish: 'austin@email.com', tastiness: 2 },
      { name: 'Philly', fish: 'philly@email.com', tastiness: 4 },
      { name: 'Armaan', fish: 'armaan@email.com', tastiness: 7 },
      { name: 'Dae', fish: 'dae@email.com', tastiness: 6 }
    ];

  }
})()
