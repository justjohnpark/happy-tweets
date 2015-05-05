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

/* 
Get Tweets (Async)
Evaluate Tweets

another artificial change for web branch


Tweet, User Location, Happiness Index
*/ 