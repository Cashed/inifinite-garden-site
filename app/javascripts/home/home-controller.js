(function() {
  'use strict';

  angular
    .module('InfiniteGarden')
    .controller('Home', Home);

  Home.$inject = ['$scope', '$window', 'UserService', 'PictureService'];

  function Home($scope, $window, UserService, PictureService) {
    const vm = this;
    vm.data = $window.data;

    UserService.getCurrent().then(user => {
      vm.user = user[0];
    });

    PictureService.addPicture(vm.data).then((data) => {
      console.log('in home cont ' + data);
    });
  }
})();
