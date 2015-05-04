(function() {
  angular
    .module('happy-tweets')
    .factory('TwitterFactory', TwitterFactory);

  function TwitterFactory(consumerKey, consumerSecret, accessToken, accessSecret, bearerToken) {
    var factory = {};
      
    factory.getTweets = function() {
      var cb = new Codebird;
      cb.setConsumerKey(consumerKey, consumerSecret);
      cb.setToken(accessToken, accessSecret);
      cb.setBearerToken(bearerToken);

      var params = { "q": "happy" };
      cb.__call(
          // "search_tweets",
          // params,
          "statuses_homeTimeline",
          {},
          function (reply) {
            console.log(reply);
          }
          // true // this parameter required
      );
    }

    return factory;
  }
})();

