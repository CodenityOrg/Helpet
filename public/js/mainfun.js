document.getElementsByClassName("conteiner-post")[0].onresize = function(){
  console.log('Redimensionado')
}

File.prototype.convertToBase64 = function(callback){
    var reader = new FileReader();
    reader.onloadend = function (e) {
        callback(e.target.result, e.target.error);
    };
    reader.readAsDataURL(this);
};

document.getElementById("register-form").onsubmit=function(e){
    e.preventDefault();
    e.stopPropagation();
    registrar(this);
};

function registrar  (formdata) {
  var data = {
    'email': formdata.email.value,
    'password': formdata.password.value,
    'name': formdata.name.value,
    'lastname': formdata.lastname.value,
    'phone': formdata.phone.value
  };
  
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if(xhr.readyState == 4 && xhr.status === 200) {
          location.reload();
          console.log("ESTAS REGISTRADO");
      }
  };
      xhr.open('POST', 'http://localhost:3000/user', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data));
}


  document.getElementById("login-form").onsubmit=function(e){
    e.preventDefault();
    e.stopPropagation();
    login(this);
  };

function login  (formdata) {
  var data = {
      'email': formdata.email.value,
      'password': formdata.password.value
    };
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function (data) {
        if(xhr.readyState == 4 && xhr.status === 200) {
            localStorage.user_id=data.id;
            location.reload();
            console.log("ESTAS LOGUEADO");
        }
    };
      xhr.open('POST', 'http://localhost:3000/login', true);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.send(JSON.stringify(data));
}

// document.getElementById("preference-form").onsubmit=function(e){
//   e.preventDefault();
//   e.stoppropagation();
//   savePreference(this);
// };

function savePreference  (formdata) {

var data = new FormData();
    var photos=getPhotos();
    data.append('photo', photos);
    data.append('feature', formdata.feature.value);
    data.append('latitude', formdata.latitude.value);
    data.append('longitude', formdata.longitude.value);
    data.append('distance', formdata.distance.value);
    data.append('type', formdata.type.value);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'user/preference', true);
    xhr.onload = function () {

      console.log("BUSQUEDA GUARDADA");
    };
    xhr.send(data);
}

document.getElementById("post-form").onsubmit=function(e){
  e.preventDefault();
  e.stopPropagation();
  var file = document.getElementById("files").files[0];
  var formdata = this;
  this.file=leerImagen(file,function (photo) {

    var data = {
        'photo': photo,
        'feature': formdata.feature.value,
        'latitude': formdata.latitude.value,
        'longitude': formdata.longitude.value,
        'distance': formdata.distance.value,
        'type': formdata.type1.value
      };
      console.log(data);
      debugger;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if(xhr.readyState == 4 && xhr.status === 200) {
              location.reload();
              console.log("ESTAS REGISTRADO");
          }
        };
        xhr.open('POST', 'http://localhost:3000/post', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
  });
}

function leerImagen(file,cb) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    var output = document.getElementById('preview');
    output.src = reader.result;
    return cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };

}
function createPost  (formdata) {
  var type=formdata.type2.value;
  if (formdata.type1.value) {
    type=formdata.type1.value;
  }
  var data = {
      'photo': formdata.file.value,
      'feature': formdata.feature.value,
      'latitude': formdata.latitude.value,
      'longitude': formdata.longitude.value,
      'distance': formdata.distance.value,
      'type': type
    };
    console.log(data);
    debugger;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'post/create', true);
      xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status === 200) {
            location.reload();
            console.log("ESTAS REGISTRADO");
        }
      };
      xhr.open('POST', 'http://localhost:3000/post', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data));
}


function getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     return reader.result;
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}


function openInfoWindow(marker) {
    var markerLatLng = marker.getPosition();
    infoWindow.setContent([
        '&lt;b&gt;La posicion del marcador es:&lt;/b&gt;&lt;br/&gt;',
        markerLatLng.lat(),
        ', ',
        markerLatLng.lng(),
        '&lt;br/&gt;&lt;br/&gt;Arr&amp;aacute;strame y haz click para actualizar la posici&amp;oacute;n.'
    ].join(''));
    infoWindow.open(map, marker);
}
 
