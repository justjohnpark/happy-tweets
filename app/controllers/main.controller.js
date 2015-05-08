(function() {
  angular
    .module('happy-tweets')
    .controller('mainController', mainController);

  function mainController($scope, TwitterFactory, MapFactory) {
    vm = this;
    
    TwitterFactory.getTweets().then(function() {
      TwitterFactory.splitTweets();
    });

    // vm.map = MapFactory.getStaticMap();

    vm.coordinates = ["-33.890542, 151.274856","20.000, 20.000", "20.000, 0.000"]


  }
})();
