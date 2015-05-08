(function() {
  angular
    .module('happy-tweets')
    .controller('mainController', mainController);

  function mainController(TwitterFactory, MapFactory) {
    vm = this;
    
    TwitterFactory.getTweets();

    vm.map = MapFactory.getStaticMap();

  }
})();
