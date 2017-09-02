document.getElementById("form-login").onsubmit = function(e){
    e.preventDefault();
    e.stopPropagation();
    login(this);
}

function login(formdata) {
    var data = {
        "email": formdata.email.value,
        "password": formdata.password.value
    };
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (data) {
        if(xhr.readyState == 4 && xhr.status === 200) {
            location = "/mapa";
        }
    };
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));
}