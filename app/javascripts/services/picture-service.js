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
    service.addPicture = window.addPicture;
    service.updatePicture = updatePicture;
    service.deletePicture = deletePicture;

    return service;

    function getAllByUser(id) {
      return $http
        .get('/api/pictures/user/' + id)
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

    function deleteUser(id) {
      return $http
        .delete('/api/users' + id)
        .then(handleSuccess, handleError);
    }

    //helper functions

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(res) {
      return $q.reject(res.data);
    }
  }
})();
