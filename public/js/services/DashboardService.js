(function() {
  'use strict';

  angular
    .module('meanDashboard')
    .factory('DashboardService', DashboardService);

  DashboardService.$inject = ['$q', '$http'];

  function DashboardService($q, $http) {

    return {
      seed: seed
    }

    function seed() {
      return $http.get('/api/seed')
    }

  }
})();
