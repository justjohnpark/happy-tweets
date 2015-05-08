(function() {
  angular
    .module('happy-tweets')
    .controller('mainController', mainController);

  function mainController($scope, TwitterFactory, MapFactory) {
    vm = this;
    vm.coordinates = [];
    vm.extractCoordinates = extractCoordinates;
    
    TwitterFactory.getTweets().then(function() {
      TwitterFactory.splitTweets();
      vm.extractCoordinates();

    });

    function extractCoordinates() {
      for (coordinates in TwitterFactory.processed) {
        vm.coordinates.push(coordinates);
      }
      console.log(vm.coordinates);
    }

    // vm.map = MapFactory.getStaticMap();



  }
})();
