angular.module('app').controller('navBarLoginCtrl', function ($scope, $http, $location, mvIdentity, mvNotifier, mvAuth) {
  $scope.identity = mvIdentity;
  $scope.signin = function (username, password) {
    mvAuth.authenticateUser(username, password).then(function (success) {
      if (success) {
        mvNotifier.notify("successfully logged in!")
      } else {
        mvNotifier.notify("fail to log in :(")
      }
    });
  }

  $scope.signout = function () {
    mvAuth.logoutUser().then(function () {
      $scope.username = "";
      $scope.password = "";
      mvNotifier.notify("successfully logged out!")
      $location.path('/');
    });
  }

});
