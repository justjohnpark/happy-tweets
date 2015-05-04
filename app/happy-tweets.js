angular.module('happy-tweets', ['ui.router']);
angular.module('happy-tweets').config(Configuration);

function Configuration($stateProvider, $urlRouterProvider) {  
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "../partials/map.html"
    });
  $urlRouterProvider.otherwise("/");
}