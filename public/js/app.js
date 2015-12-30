var meanDashboard = angular.module('meanDashboard', ['ngRoute']);

meanDashboard.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/templates/home_login.html',
      requiredLogin: false
    })
    .when('/register', {
      templateUrl: 'templates/register.html',
      controller: 'AppCtrl',
      requireLogin: false
    })
    .when('/profile', {
      templateUrl: 'templates/profile.html',
      controller: 'AppCtrl',
      requireLogin: true
    })
    .when('/one', {
      template: '<h1>This is page one!</h1>',
      requireLogin: false
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>',
      requireLogin: true
    })
    .otherwise({redirectTo: '/'});
});

meanDashboard.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if(next.requireLogin) {
        if (AuthService.isLoggedIn() === false) {
          $location.path('/')
          $route.reload();
        }
      }
  });
});
