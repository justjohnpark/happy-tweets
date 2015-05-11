(function() {
  angular
    .module('happy-tweets')
    .factory('TwitterFactory', TwitterFactory);

  function TwitterFactory(consumerKey, consumerSecret, $q) {
    var factory = {};
    factory.tweets = [{},{}];
    factory.processed = [{},{}];
      
    factory.getTweets = function(set) {
      var cb = new Codebird;
      cb.setConsumerKey(consumerKey, consumerSecret);
      var deferred = $q.defer();

      var params = { q: "happy", geocode: "40.047506,-98.477500,1000mi", count: 15 };
      cb.__call(
          "search_tweets",
          params,
          function (reply) {
            factory.tweets[set] = reply.statuses;
            console.log(reply.statuses);
            return deferred.resolve(reply.statuses);
          }
      );
      return deferred.promise;
    }

    factory.splitTweets = function(set) {
      var tweetsLength = factory.tweets[set].length;
      var tweetsCoordinate;
      for (var i=0; i<tweetsLength; i++) {
        if (factory.tweets[set][i]["geo"] !== null) {
          var first = Math.floor(factory.tweets[set][i]["geo"]["coordinates"][0] * 10000) / 10000;
          var second =  Math.floor(factory.tweets[set][i]["geo"]["coordinates"][1] * 10000) / 10000;
          tweetsCoordinate = first + "," + second;
          factory.processed[set][tweetsCoordinate] = factory.tweets[set][i]["text"];
        }
      }
      console.log(factory.processed[set]);
    }

    return factory;
  }
})();