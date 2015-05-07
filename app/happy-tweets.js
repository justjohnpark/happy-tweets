angular.module('happy-tweets', ['ui.router', 'twitterKey', 'ngMap']);
angular.module('happy-tweets').config(Configuration);

function Configuration($stateProvider, $urlRouterProvider) {  
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "../partials/map.html"
    });
  $urlRouterProvider.otherwise("/");
}