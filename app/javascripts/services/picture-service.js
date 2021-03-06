(function() {
  'use strict';

  angular
    .module('InfiniteGarden')
    .factory('PictureService', PictureService);

  PictureService.$inject = ['$http', '$q'];

  function PictureService($http, $q) {
    const service = {};

    service.getAll = getAllByUser;
    service.getById = getById;
    service.addPicture = addPicture;
    service.updatePicture = updatePicture;
    service.deletePicture = deletePicture;

    return service;

    function getAllByUser() {
      return $http
        .get('/api/pictures/user')
        .then(handleSuccess, handleError);
    }

    function getById(id) {
      return $http
        .get('/api/pictures/pic/' + id)
        .then(handleSuccess, handleError);
    }

    function addPicture(picture) {
      return $http
        .post('/api/pictures/add', picture)
        .then(handleSuccess, handleError);
    }

    function updatePicture(picture) {
      return $http
        .put('/api/pictures/update', picture)
        .then(handleSuccess, handleError);
    }

    function deletePicture(id) {
      return $http
        .delete('/api/pictures/delete' + id)
        .then(handleSuccess, handleError);
    }

    //helper functions

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(res) {
      console.log(res.data);
    }
  }
})();
