var meanDashboard = angular.module('meanDashboard', ['ngRoute']);

meanDashboard.config(function ($routeProvider, $locationProvider, $httpProvider) {

  var checkLoggedin = function($q, $timeout, $http, $location, $rootScope){
    var deferred = $q.defer();
    //check login
    $http.get('/loggedin').success(function(user){
      // Authenticated user
      if (user !== '0') {
        console.log(user)
        deferred.resolve();
        $rootScope.user = user
      } else {
        //not logged in
        deferred.reject();
        console.log("not logged in")
        $location.url('/');
      }
    });
    return deferred.promise;
  };

  $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          // do something on success
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('/login');
          return $q.reject(response);
        }
      };
    });


  $routeProvider
    .when('/', {
      templateUrl: '/templates/home_login.html',

      // resolve: {
      //   loggedin: checkLoggedin
      // }
    })
    .when('/register', {
      templateUrl: 'templates/register.html',
      controller: 'AppCtrl',

      resolve: {
        loggedin: checkLoggedin
      }
    })
    .when('/profile', {
      templateUrl: 'templates/profile.html',
      controller: 'AppCtrl',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .when('/one', {
      template: '<h1>This is page one!</h1>',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .otherwise({redirectTo: '/'});
});

meanDashboard.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // if(next.requireLogin) {
      //   if (AuthService.isLoggedIn() === false) {
      //     $location.path('/')
      //     $route.reload();
      //   }
      // }
  });
});
