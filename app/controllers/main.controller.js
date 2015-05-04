(function() {
  angular
    .module('happy-tweets', ['twitterKey'])
    .controller('mainController', mainController);

  function mainController(TwitterFactory) {
    vm = this;
    
    TwitterFactory.getTweets();
  }
})();