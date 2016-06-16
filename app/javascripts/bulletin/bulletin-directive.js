(function() {
  'use strict';

  angular
    .module('bulletin', [])
    .directive('bulletin', bulletin);

  function bulletin() {
    return {
      restrict: 'E',
      scope: {
        user: '='
      },
      replace: true,
      templateUrl: 'app/javascripts/bulletin/bulletin.html'
    }
  }
})();
