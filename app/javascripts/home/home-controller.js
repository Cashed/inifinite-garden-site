(function() {
  'use strict';

  angular
    .module('InfiniteGarden')
    .controller('Home', Home);

  Home.$inject = ['$scope', '$window', 'UserService', 'PictureService'];

  function Home($scope, $window, UserService, PictureService) {
    const vm = this;

    vm.getData = function() {
      PictureService.addPicture($window.data).then((data) => {
        console.log('in home contr ' + data);
      });
    }

    UserService.getCurrent().then(user => {
      vm.user = user[0];
    });

  }
})();
