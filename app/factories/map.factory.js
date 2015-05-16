(function() {
  angular
    .module('happy-tweets')
    .factory('MapFactory', MapFactory);

  function MapFactory() {
    var factory = {};
    var key = 'key=AIzaSyAhDEj68yiSGbkrFQMOkDSnZNj8Dm5vzLg';
    var url = 'https://maps.googleapis.com/maps/api/staticmap?center=20,0&zoom=1&size=500x310&style=visibility:off&style=feature:water%7Cvisibility:on%7Ccolor:0x000000&style=feature:landscape%7Cvisibility:on%7Ccolor:0x08304b&style=feature:administrative%7Celement:geometry.stroke%7Cvisibility:on%7Ccolor:0x000000%7Cweight:1&markers=icon:http://i57.tinypic.com/23sg56u.png%7C224+West+20th+Street+NY%7C75+9th+Ave+NY%7C700+E+9th+St+NY';

    factory.getStaticMap = function(location){
      return (url + key);
    }



    return factory;
  }
})();
