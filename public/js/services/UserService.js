(function() {
  'use strict';

  angular
    .module('meanDashboard')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$q', '$http', '$timeout'];

  function AuthService($q, $http, $timeout) {
    var user = null;

    return {
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
      getUsers: getUsers
    };

    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return user;
    }

    function login(data) {
      var deferred = $q.defer();

      $http.post('/user/login', data)
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();

      $http.get('/user/logout')
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      return deferred.promise;
    }

    function register(data) {
      var deferred = $q.defer();

      $http.post('/user/register', data)
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        .error(function (data) {
          deferred.reject();
        });

      return deferred.promise;
    }

    function getUsers() {
      return $http.get('/user')
    }

  }
})();
