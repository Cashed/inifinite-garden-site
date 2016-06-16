(function() {
  'use strict';

  angular
    .module('InfiniteGarden')
    .controller('Home', Home);

  Home.$inject = ['$scope', 'UserService'];

  function Home($scope, UserService) {
    const vm = this;

    UserService.getCurrent().then(user => {
      vm.user = user[0];
    });
  }
})();
