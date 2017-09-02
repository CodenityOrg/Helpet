
document.getElementById("register-form").onsubmit = function(e){
    e.preventDefault();
    e.stopPropagation();
    
    register(this);
}

function register(formdata) {

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
            location = "/mapa";
        }
    };
    xhr.open('POST', '/user', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}
