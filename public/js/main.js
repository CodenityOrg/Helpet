
function notificacionChrome(){
    document.addEventListener('DOMContentLoaded', function () {
      if (Notification.permission !== "granted")
        Notification.requestPermission();
    });
}

function notifyMe(title,body,openUrl) {
  if (!Notification) {
    //-alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification(title, {
      icon: './public/img/ico-logo.png',
      body: body,
    });

    notification.onclick = function () {
      window.open(openUrl);      
    };
  }
}

function abrirModal(idModal) {
    var modal = document.getElementById(idModal);
    var modalBox = modal.children[0];

    modalBox.className = modalBox.className.replace('cerrar-modal', 'abrir-modal');
    modal.className = modal.className.replace('cerrar-modal', 'abrir-modal');

    // quitar el scroll vertical al body
    document.body.style.overflow = "hidden";

}

function cerrarModal(btnCerrar) {
    var modal = btnCerrar.parentNode.parentNode.parentNode;
    var modalBox = btnCerrar.parentNode.parentNode;

    modal.className = modal.className.replace('abrir-modal', 'cerrar-modal');
    modalBox.className = modalBox.className.replace('abrir-modal', 'cerrar-modal');

    // mostrar el scroll al cerrar el modal
    document.body.style.overflow = "scroll";
}

/**
 * tabs de perridos perdidos y encontrados
 */
function mostrarTab(idTab) {
    if (idTab == 'perdidos') {
        var linkOcultar = document.getElementById('showTab-encontrados');
        var tabOcultar = document.getElementById('tab-encontrados');

    } else {
        var linkOcultar = document.getElementById('showTab-perdidos');
        var tabOcultar = document.getElementById('tab-perdidos');


    }

    var linkMostrar = document.getElementById('showTab-' + idTab);
    var tabMostrar = document.getElementById('tab-' + idTab);

    linkMostrar.className = 'tab-link active';
    tabMostrar.className = '';
    linkOcultar.className = 'tab-link';
    tabOcultar.className = 'oculto';
}

window.addEventListener("scroll", function() {
    if (this.scrollY == 0) {
        var navbar = document.getElementsByClassName('navbar--inicio')[0];
        navbar.className = 'navbar navbar--inicio';
    }
    if (this.scrollY > 0) {
        var navbar = document.getElementsByClassName('navbar--inicio')[0];
        navbar.className += ' z-depth-1';
    }
}, false);

function renderPostView() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(data) {
        if (xhr.readyState == 4 && xhr.status === 200) {
            document.getElementsByClassName("content")[0].innerHTML = xhr.responseText;
        }
    };
    xhr.open('GET', '/post/view', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
}

function renderListPostView() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(data) {
        if (xhr.readyState == 4 && xhr.status === 200) {
            document.getElementsByClassName("content")[0].innerHTML = xhr.responseText;
        }
    };
    xhr.open('GET', '/post/list/view', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send();
}

var newPostBtn = document.getElementById("new-post");
if (newPostBtn) {
    newPostBtn.onclick = function(e) {
        e.preventDefault();
        var stateObj = { post: "post" };
        history.pushState(stateObj, "post", "/publicacion");
        renderPostView();
        return false;
    }

}

document.addEventListener('DOMContentLoaded', function() {

    var fileInput = document.getElementById("file-image");
    var imgSelected = document.getElementById("img-selected");
    var addPhotoButton = document.getElementsByClassName("add-photo")[0];

    if(addPhotoButton){
        addPhotoButton.onclick = function(e) {
            fileInput.click();
        }    
    }


    if(fileInput){
        fileInput.onchange = function(e) {
            var reader = new FileReader();
            var file = this.files[0];
            reader.onload = function(e) {
                imgSelected.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }

});

window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 150);
});


// window.onpopstate = function(event) {
//     alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
// };
