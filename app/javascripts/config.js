(function() {
  'use strict';

  angular
    .module('InfiniteGarden')
    .config(router)
    .run(run);

  router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function router($stateProvider, $urlRouterProvider, $locationProvider) {
    // default route
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/javascripts/home/home.html',
        controller: 'Home',
        controllerAs: 'home'
      })
      .state('community', {
        url: '/community',
        templateUrl: 'javascripts/home/home.html',
        controller: 'Community',
        controllerAs: 'community'
      });

      $locationProvider.html5Mode(true);
  }

  function run($http, $rootScope, $window) {
    // add JWT token as default auth header
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

    //update active nav on state change, unused for now
    // $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
    //   $rootScope.activeNav = toState.data.activeNav;
    // });
  }

  // manually bootstrap angular after the JWT token is retrieved from the stateProvider
  $(function() {
    //get JWT token from stateProvider
    $.get('/app/token', token => {
      window.jwtToken = token;

      angular.bootstrap(document, ['InfiniteGarden']);
    });
  });
})();
