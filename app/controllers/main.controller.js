(function() {
  angular
    .module('happy-tweets')
    .controller('mainController', mainController);

  function mainController($scope, $timeout, TwitterFactory) {
    vm = this;
    vm.coordinates = [];
    vm.markers = [];
    vm.extractCoordinates = extractCoordinates;
    vm.addMarker = addMarker;
    // vm.emptyTheNest = emptyTheNest;
    vm.map;

    $scope.$on('mapInitialized', function(event, evtMap) {
      vm.map = evtMap;  
    }, 1000);

    // while (vm.coordinates !== []) {
      TwitterFactory.getTweets().then(function() {
        TwitterFactory.splitTweets();
        vm.extractCoordinates();
        vm.addMarker();
      });
    // }

    function extractCoordinates() {
      for (coordinates in TwitterFactory.processed) {
        var first = Number(coordinates.split(',')[0]);
        var second = Number(coordinates.split(',')[1]);
        vm.coordinates.push(new google.maps.LatLng(first, second));
      }
      console.log(vm.coordinates);
    }

    var iterator = 0;  
    function addMarker() {
      if (vm.map !== undefined) {
        for (var i=0; i<vm.coordinates.length; i++) {

          $timeout(function() {
            // add a marker this way does not sync. marker with <marker> tag
            var marker = new google.maps.Marker({
              position: vm.coordinates[iterator++],
              map: vm.map,
              icon: "../images/smile.png",
              draggable: false,
              animation: google.maps.Animation.DROP
            });
            vm.markers.push(marker);
          }, i * 2000);
        }
      } else {
        $timeout((function() {
          return vm.addMarker();
        }), 500);
      }
      $timeout(function() {
        for (var j=0; j<vm.markers.length; j++) {
          // $timeout(function() {
            vm.markers[j].setMap(null);
          // }, j * 2000);
        }
      }, vm.coordinates.length * 2000);
    }

    // function emptyTheNest() {
    //   vm.coordinates = [];
    //   console.log("Nest Emptied!");
    // }

  }
})();



