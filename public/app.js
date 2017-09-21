'use strict';

var smartHomeApp = angular.module('smartHomeApp', [
  'ngRoute',
  'smartHomeControllers',
  'loginControllers',
  'registerControllers',
  'profileControllers',
  'roomsControllers',
  'devicesControllers',
  'recipesControllers'
]);

smartHomeApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/home.html',
      controller: 'homeCtrl'
    }).when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'homeCtrl'
    }).when('/recipes', {
      templateUrl: 'partials/recipes.html',
      controller: 'homeCtrl'
    }).when('/devices', {
      templateUrl: 'partials/devices.html',
      controller: 'homeCtrl'
    }).when('/rooms', {
      templateUrl: 'partials/rooms.html',
      controller: 'homeCtrl'
    }).when('/messages', {
      templateUrl: 'partials/messages.html',
      controller: 'homeCtrl'
    }).when('/user', {
      templateUrl: 'partials/user.html',
      controller: 'homeCtrl'
    }).when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'homeCtrl'
    }).otherwise({
      templateUrl: 'partials/404.html',
      controller: 'homeCtrl'
    });
  $locationProvider.html5Mode(false).hashPrefix('!');
});

checkCookie();

function checkCookie() {
  var username = getCookie("username");
  if (username != "") {
      console.log("Je bent ingelogd als " + username);
  }
  else {
      console.log("Je bent niet ingelogd")
      window.location.href = "#!/login/"
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}