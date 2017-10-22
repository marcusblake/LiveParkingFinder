
var request = new XMLHttpRequest();
  request.open("GET", "../../Desktop/Hackathon/convertcsv.json", false);
  request.send(null)
  var file = JSON.parse(request.responseText);


var long=getLong();

function getLong(){
  var arr=[];
  for(var i=0;i<500;i++){
    arr[i]=file[i].FIELD1;
  }
  return arr;
}

var lat=getLat();

function getLat(){
  var arr=[];
  for(var i=0; i<500;i++){
    arr[i]=file[i].FIELD2;
  }
  return arr;
}


var map, infoWindow;
function initMap() {
  var objDate=new Date();
  var hours=objDate.getHours();
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('Your location');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  if(hours>=6 && hours<=18){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.3601, lng: -71.0589},
      zoom: 14,
      mapTypeId: 'terrain'
    });
  }

  else{
    map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.674, lng: -73.945},
          zoom: 14,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });
  }

  infoWindow = new google.maps.InfoWindow;



  var iconBase='https://maps.google.com/mapfiles/kml/shapes/';

  function features(latitude, longitude, int){
    this.position=new google.maps.LatLng(latitude, longitude);
  }



  function getLocations(){
    var arr=[];
    for(var i=0; i<lat.length;i++){
      arr[i]=new features(lat[i], long[i], i);
    }

    return arr;
  }

  var locations=getLocations();


  locations.forEach(function(location){
    var marker=new google.maps.Marker({
      position: location.position,
      icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
      map: map
    });
    google.maps.event.addListener(marker, 'click', function(){
      var ans=confirm("Would you like directions to this location?");
      if(ans==true){
        alert('Taking you to the parking location!');
      }
      else{
        alert("Okay. Routing aborted.")
      }
    });
  });

  map.setTilt(40);

}
