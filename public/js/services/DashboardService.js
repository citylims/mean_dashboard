(function() {
  'use strict';

  angular
    .module('meanDashboard')
    .factory('DashboardService', DashboardService);

  DashboardService.$inject = ['$q', '$http', '$timeout'];

  function DashboardService($q, $http, $timeout) {

    return {
      seed: seed
    }

    function seed() {
      return $http.get('/api/seed')
    }

  }
})();
