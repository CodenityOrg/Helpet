var gopostmodal = document.getElementById('start-post');
var modalpostbody = document.getElementById('modal-post');
var modalpostclose = document.getElementById('close-post');

gopostmodal.addEventListener('click',function(){
    modalpostbody.classList.toggle('showpost');
    setTimeout(function(){


        var map = new google.maps.Map(document.getElementById('mapPost'), {
            center: {lat: -18.0228643,lng:-70.317588},
            zoom: 11
        });


        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            //infoWindow.setPosition(pos);
            var marker = new google.maps.Marker({
              position: pos,
              map: map,
              draggable:true
            });
            google.maps.event.addListener(marker, 'click', function(){
                var markerLatLng = marker.getPosition();
                console.log(markerLatLng);
                debugger;
                // document.getElementById("latitude").value=markerLatLng.lat;
                // document.getElementById("longitude").value=markerLatLng.lng;
            });

            //infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

    },1000)

})

modalpostclose.addEventListener('click',function(){
    modalpostbody.classList.toggle('showpost');
});
