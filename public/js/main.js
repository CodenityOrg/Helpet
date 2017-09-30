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
    if (this.scrollY == 0) {
        var navbar = document.getElementsByClassName('navbar--inicio')[0];
        navbar.className = 'navbar navbar--inicio';
    }
    if (this.scrollY > 0) {
        var navbar = document.getElementsByClassName('navbar--inicio')[0];
        navbar.className += ' z-depth-1';
    }
}, false);


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
