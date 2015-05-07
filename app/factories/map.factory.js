(function() {
  angular
    .module('happy-tweets')
    .factory('MapFactory', MapFactory);

  function MapFactory() {
    var factory = {};
    var key = 'key=AIzaSyAhDEj68yiSGbkrFQMOkDSnZNj8Dm5vzLg';
    var url = 'https://maps.googleapis.com/maps/api/staticmap?center=20,0&zoom=1&size=500x310&maptype=satellite&';

    factory.getStaticMap = function(location){
      return (url + key);
    }

    return factory;
  }
})();


