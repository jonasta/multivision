angular.module('app').factory('mvAuth', function ($http, mvIdentity, $q) {
  return {
    authenticateUser(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username: username, password: password}).then(function (res) {
        if (res.data.success) {
          mvIdentity.currentUser = res.data.user;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },
    logoutUser() {
      var dfd = $q.defer();
      $http.post('/logout', {}).then(function(){
        mvIdentity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    }
  }
});