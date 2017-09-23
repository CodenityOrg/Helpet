const PostView = (function(){
    "use strict";

    const renderList = function () {
        const cardsContainer = document.getElementById("tab-perdidos");
        const cardBodyTemplate = 
            '<div class="tarjeta__titulo">'+
                '<img class="user-image" src="img/perfil.png" alt="foto de perfil">' +
                '<span class"user-name">Alvaro M</span>'+
            '</div>'+
            '<div class="tarjeta__imagen">' +
                '<img class="pet-image" src="http://cdne.elshow.pe/thumbs/uploads/articles/images/facebook-conoce-el-caso-de-wes-PNG_1000x563.png" alt="perrito perdido">' +
            '</div>'+
            '<div class="tarjeta__descripcion">'+
                '<p class="description descripcion">Este perrito lo encontré en la calle cerca a mi casa, espero que encuentre a su dueño.</p>'+
                '<p class="address direccion">Avenida 11 cuadra 4</p>'+
                '<div class="features caracteristicas">' +
                    '<p>Características</p>' +
                    '<span class="caracteristica">pelo negro</span>' +
                    '<span class="caracteristica">oreja cortada</span>' +
                    '<span class="caracteristica">raza pequeña</span>' +
                '</div>' +
            '</div>';
    
        const genCardTemplate = function(){
            var template = document.createElement("div");
            template.className = "tarjeta tarjeta--perrito-perdido";
            template.innerHTML = cardBodyTemplate;
            return template;
        }
    
        fetch("/posts")
            .then(res => res.json())
            .then((posts) => {
                for (let i = 0,post; post = posts[i]; i++) {
                    const postItem = genCardTemplate();
                    postItem.getElementsByClassName("user-name")[0].innerHTML = post.user.name;
                    postItem.getElementsByClassName("pet-image")[0].src = post.image;
                    postItem.getElementsByClassName("description")[0].innerHTML = post.description;
                    postItem.getElementsByClassName("address")[0].innerHTML = post.address;
    
                    var features = post.features;
                    for (var j = 0,feature; feature = features[j]; j++) {
    
                        var featureItem = document.createElement('span');
                        featureItem.innerHTML = feature.name;
                        postItem.getElementsByClassName("features")[0].appendChild(featureItem);
                    }
                }
            })
    }

    const create = function(form, data){
        const formData = new FormData(form);
        
        formData.append("features", data.features);
        formData.append("latitude", data.latitude);
        formData.append("longitude", data.longitude);

        fetch("post",{
            method: "POST",
            body: formData,
            credentials: "same-origin"
        }).then(response => {

        });
    }

    const createPostsTabView = () => {
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

    const savePreference = () => {
        // var photos = getPhotos();
        // data.append('photo', photos);
        // data.append('feature', formdata.feature.value);
        // data.append('latitude', formdata.latitude.value);
        // data.append('longitude', formdata.longitude.value);
        // data.append('distance', formdata.distance.value);
        // data.append('type', formdata.type.value);
    
        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', 'user/preference', true);
        // xhr.onload = function () {
    
        //   console.log("BUSQUEDA GUARDADA");
        // };
        // xhr.send(data);
    }

    return {
        create,
        renderList
    }

})
