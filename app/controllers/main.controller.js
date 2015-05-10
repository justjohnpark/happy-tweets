(function() {
  angular
    .module('happy-tweets')
    .controller('mainController', mainController);

  function mainController($scope, $timeout, TwitterFactory) {
    vm = this;
    vm.coordinates = [];
    vm.extractCoordinates = extractCoordinates;
    vm.addMarker = addMarker;

    TwitterFactory.getTweets().then(function() {
      TwitterFactory.splitTweets();
      vm.extractCoordinates();
      vm.addMarker();
    });

    function extractCoordinates() {
      for (coordinates in TwitterFactory.processed) {
        var first = Number(coordinates.split(',')[0]);
        var second = Number(coordinates.split(',')[1]);
        vm.coordinates.push(new google.maps.LatLng(first, second));
        // vm.coordinates.push(coordinates);
      }
      console.log(vm.coordinates);
    }

    var iterator = 0;  
    function addMarker() {
      // console.log($scope.map);
      $scope.$on('mapInitialized', function(event, args) {
        var map = args[0];
        console.log(map);
      }, 1000);

      if ($scope.map !== undefined) {
        console.log("yo");

        for (var i=0; i<vm.coordinates.length; i++) {

          //TRY TO PUT ALL THIS CODE IN HTML HEAD AND LOAD THE SCRIPTS IN THE HEAD AS WELL. EXACTLY LIKE MARKER-ANIMATIONS-ITERATIONS

          $timeout(function() {
            // add a marker this way does not sync. marker with <marker> tag
            new google.maps.Marker({
              position: vm.coordinates[iterator++],
              map: $scope.map,
              draggable: false,
              animation: google.maps.Animation.DROP
            });
          }, i * 2000);
        }
      } else {
        $timeout((function() {
          return vm.addMarker();
        }), 500);
      }
    }

    // vm.map = MapFactory.getStaticMap();

  }
})();

//setInterval

//other languages

//remove icons



