(function() {
  'use strict';

  angular
    .module('InfiniteGarden')
    .factory('UserService', UserService);

  UserService.$inject = ['$http', '$q'];

  function UserService($http, $q) {
    const service = {};

    service.getCurrent = getCurrent;
    service.getAll = getAll;
    service.getById = getById;
    service.getByUsername = getByUsername;
    service.createUser = createUser;
    service.updateUser = updateUser;
    service.deleteUser = deleteUser;

    return service;

    function getCurrent() {
      return $http
        .get('/api/users/current')
        .then(handleSuccess, handleError);
    }

    function getAll() {
      return $http
        .get('/api/users')
        .then(handleSuccess, handleError);
    }

    function getById(id) {
      return $http
        .get('/api/users/id/' + id)
        .then(handleSuccess, handleError);
    }

    function getByUsername(username) {
      return $http
        .get('/api/users/name/' + username)
        .then(handleSuccess, handleError);
    }

    function createUser(user) {
      return $http
        .post('/api/users', user)
        .then(handleSuccess, handleError);
    }

    function updateUser(user) {
      return $http
        .put('/api/users' + user.id, user)
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
