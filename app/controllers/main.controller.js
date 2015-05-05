(function() {
  angular
    .module('happy-tweets')
    .controller('mainController', mainController);

  function mainController(TwitterFactory) {
    vm = this;
    
    TwitterFactory.getTweets().then(function() {
      TwitterFactory.analyzeTweets()

    });

  }
})();
