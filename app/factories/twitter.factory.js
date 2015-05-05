(function() {
  angular
    .module('happy-tweets')
    .factory('TwitterFactory', TwitterFactory);

  function TwitterFactory(consumerKey, consumerSecret, accessToken, accessSecret, bearerToken, $q) {
    var factory = {};
    factory.tweets = {};
      
    factory.getTweets = function() {
      var cb = new Codebird;
      cb.setConsumerKey(consumerKey, consumerSecret);
      cb.setToken(accessToken, accessSecret);
      cb.setBearerToken(bearerToken);
      var deferred = $q.defer();

      var params = { q: "happy", geocode: "42.3314,-83.0458,24901mi", count: 100 };
      cb.__call(
          "search_tweets",
          params,
          function (reply) {
            factory.tweets = reply.statuses;
            console.log(reply.statuses);
            return deferred.resolve(reply.statuses);
          }
      );
      return deferred.promise;
    }

    factory.analyzeTweets = function() {
      console.log(factory.tweets);
    }

    return factory;
  }
})();