(function() {
  angular
    .module('happy-tweets')
    .factory('TwitterFactory', TwitterFactory);

  function TwitterFactory(consumerKey, consumerSecret, $q) {
    var factory = {};
    factory.tweets = [{},{}];
    factory.processed = [{},{}];
    factory.lastTweet;
    factory.firstTime = true;
      
    factory.getTweets = function(set) {
      var cb = new Codebird;
      cb.setConsumerKey(consumerKey, consumerSecret);
      var deferred = $q.defer();

      if (factory.firstTime === true) {
        var params = { q: "happy", geocode: "40.047506,-98.477500,2000mi", count: 30 };
        console.log("TWITTER HIT WITHOUT MAX_ID");
        factory.firstTime = false;
      } else {
        var params = { q: "happy", geocode: "40.047506,-98.477500,2000mi", count: 30, max_id: factory.lastTweet };
        console.log("TWITTER HIT WITH MAX_ID");
      }
      cb.__call(
          "search_tweets",
          params,
          function (reply) {
            factory.tweets[set] = reply.statuses;
            console.log(factory.tweets[set]);
            return deferred.resolve(reply.statuses);
          }
      );
      return deferred.promise;
    }

    factory.splitTweets = function(set) {
      var tweetsLength = factory.tweets[set].length;
      var tweetsCoordinate;
      factory.processed[set] = {};
      for (var i=0; i<tweetsLength; i++) {
        if (factory.tweets[set][i]["geo"] !== null) {
          var first = Math.floor(factory.tweets[set][i]["geo"]["coordinates"][0] * 10000) / 10000;
          var second =  Math.floor(factory.tweets[set][i]["geo"]["coordinates"][1] * 10000) / 10000;
          tweetsCoordinate = first + "," + second;
          factory.processed[set][tweetsCoordinate] = factory.tweets[set][i]["text"];
        }
        if (i === (tweetsLength - 1)) {
          factory.lastTweet = factory.tweets[set][i]["id"];
          console.log(factory.lastTweet);
        }
      }
      console.log(factory.processed[set]);
    }

    return factory;
  }
})();