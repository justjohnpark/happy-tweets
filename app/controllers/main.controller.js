(function() {
  angular
    .module('happy-tweets')
    .controller('mainController', mainController);

  function mainController($scope, $timeout, TwitterFactory) {
    vm = this;
    vm.coordinates = [[],[]];
    vm.markers = [[],[]];
    vm.initiate = initiate;
    vm.extractCoordinates = extractCoordinates;
    vm.addMarker = addMarker;
    vm.map;

    $scope.$on('mapInitialized', function(event, evtMap) {
      vm.map = evtMap;  
    }, 1000);

    vm.initiate(0);

    function initiate(set) {      
      TwitterFactory.getTweets().then(function() {
        TwitterFactory.splitTweets();
        vm.extractCoordinates(set);
        vm.addMarker(set);
      });
    }

    function extractCoordinates(set) {
      for (coordinates in TwitterFactory.processed) {
        var first = Number(coordinates.split(',')[0]);
        var second = Number(coordinates.split(',')[1]);
        vm.coordinates[set].push(new google.maps.LatLng(first, second));
      }
      console.log(vm.coordinates[set]);
    }

    var iterator = [[0],[0]];  
    var counter = [[0],[0]];

    function addMarker(set) {
      iterator[set] = 0;
      counter[set] = 0;
      if (vm.map !== undefined) {
        for (var i=0; i<vm.coordinates[set].length; i++) {
          $timeout(function() {
            // add a marker this way does not sync. marker with <marker> tag
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
              vm.coordinates[set] = [];
              vm.markers[set] = [];
            } else if (counter[set] === (vm.coordinates[set].length-5)) {
              vm.markers[set][counter[set]++].setMap(null); 
              if (set === 0) { vm.initiate(1); } 
              else { vm.initiate(0); }
            } else {
              vm.markers[set][counter[set]++].setMap(null); 
            }
          }, j * 2000);
        }
      }, 8000);
    }
  }
})();



