
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


window.addEventListener("scroll", function() {
    var navbar = document.getElementsByClassName('navbar--inicio')[0];
    if (navbar) {
        if (this.scrollY == 0) {
            navbar.className = 'navbar navbar--inicio';
        }
        if (this.scrollY > 0) {
            navbar.className += ' z-depth-1';
        }
    }
}, false);

function showSnackBar(message, type) {
    const snackbar = document.getElementById("snackbar");
    snackbar.innerHTML = message;
    if (type) {
        if (type === "danger") {
            snackbar.style.background = "rgb(232, 78, 78)";
        }
    }
    snackbar.className = "show";
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}