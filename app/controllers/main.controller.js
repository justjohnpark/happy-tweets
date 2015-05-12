(function() {
  angular
    .module('happy-tweets')
    .controller('mainController', mainController);

  function mainController($scope, $timeout, TwitterFactory) {
    vm = this;
    vm.coordinates = [[],[]];
    vm.tweetText = [[],[]];
    vm.markers = [[],[]];
    vm.initiate = initiate;
    vm.extractCoordinates = extractCoordinates;
    vm.addMarker = addMarker;
    vm.map;
    vm.output = "";

    $scope.$on('mapInitialized', function(event, evtMap) {
      vm.map = evtMap;  
    }, 1000);

    vm.initiate(0);

    function initiate(set) {   
      console.log("--");   
      console.log(set);   
      console.log("--");   
      TwitterFactory.getTweets(set).then(function() {
        TwitterFactory.splitTweets(set);
        vm.extractCoordinates(set);
        vm.addMarker(set);
      });
    }

    function extractCoordinates(set) {
      vm.coordinates[set] = [];
      for (coordinates in TwitterFactory.processed[set]) {
        var first = Number(coordinates.split(',')[0]);
        var second = Number(coordinates.split(',')[1]);
        vm.coordinates[set].push(new google.maps.LatLng(first, second));
        vm.tweetText[set].push(TwitterFactory.processed[set][coordinates]);
      }
      console.log(vm.coordinates[set]);
      // console.log(vm.tweetText[set]);
    } 

    var iterator = [[0],[0]];  
    var counter = [[0],[0]];

    function addMarker(set) {
      vm.markers[set] = [];
      vm.output = "";
      iterator[set] = 0;
      counter[set] = 0;
      if (vm.map !== undefined) {
        for (var i=0; i<vm.coordinates[set].length; i++) {
          $timeout(function() {
            vm.output = vm.tweetText[set][iterator[set]];
            var marker = new google.maps.Marker({
              position: vm.coordinates[set][iterator[set]++],
              map: vm.map,
              icon: "../images/smile.png",
              draggable: false,
              animation: google.maps.Animation.DROP
            });
            vm.markers[set].push(marker);
          }, i * 2000);
        }
      } else {
        $timeout((function() {
          return vm.addMarker();
        }), 500);
      }
      $timeout(function() {
        for (var j=0; j<vm.coordinates[set].length; j++) {
          $timeout(function() {
            if (counter[set] === (vm.coordinates[set].length-1)) {
              vm.markers[set][counter[set]].setMap(null);
            } else if (counter[set] === (vm.coordinates[set].length-7)) {
              vm.markers[set][counter[set]++].setMap(null); 
              if (set === 0) { vm.initiate(1); } 
              else { vm.initiate(0); }
            } else {
              vm.markers[set][counter[set]++].setMap(null); 
            }
          }, j * 2000);
        }
      }, 12000);
    }
  }
})();



