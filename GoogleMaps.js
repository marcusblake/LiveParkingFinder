
var request = new XMLHttpRequest();
  request.open("GET", "../../Desktop/GoogleMaps/convertcsv.json", false);
  request.send(null)
  var file = JSON.parse(request.responseText);


var long=getLong();

function getLong(){
  var arr=[];
  for(var i=0;i<file.length;i++){
    arr[i]=file[i].FIELD1;
  }
  return arr;
}

var lat=getLat();

function getLat(){
  var arr=[];
  for(var i=0; i<file.length;i++){
    arr[i]=file[i].FIELD2;
  }
  return arr;
}



function initMap() {

  var myLatLng=new google.maps.LatLng(42.3514, -71.0554);
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.3514, lng: -71.0554},
    zoom: 25,
    mapTypeId: 'satellite'
  });

  var iconBase='https://maps.google.com/mapfiles/kml/shapes/';

  function features(latitude, longitude, int){
    this.latitude=latitude;
    this.longitutde=longitude;
    //this.position=new google.maps.LatLng(this.latitude, this.longitude);
    this.int=int;
  }



  function getLocations(){
    var arr=[];
    for(var i=0; i<lat.length;i++){
      arr[i]=new features(lat[i], long[i], i);
    }

    return arr;
  }
  var locations=getLocations();
  console.log(locations);

  var newmark, i;

  for(i=0; i< locations.length;i++){
    newMark=new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][0], locations[i][1]),
      icon: locations.type,
      map: map
    });
}


  var marker=new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello'
  });

  google.maps.event.addListener(marker, 'click', function(){

    alert('Would you like directions to this location?');

  });

  map.setTilt(40);

}
